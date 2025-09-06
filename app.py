from flask import Flask, request, jsonify
import os
import logging
from config import Config
from utils.sms_parser import parse_sms_input
from utils.maps_client import GoogleMapsClient
from utils.response_formatter import format_eta_response
from utils.sms_sender import Fast2SMSSender

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Set up logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s %(module)s %(message)s'
    )
    
    # Initialize clients
    maps_client = GoogleMapsClient()
    sms_sender = Fast2SMSSender()
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({"status": "healthy"}), 200
    
    @app.route('/webhook', methods=['POST'])
    def webhook():
        """Webhook endpoint for incoming SMS"""
        try:
            # Parse webhook JSON for phone number and message text
            data = request.get_json()
            
            if not data:
                logging.error("No JSON data received in webhook")
                return jsonify({"error": "No data received"}), 400
            
            # Extract phone number and message text
            # Note: This is speculative as we don't have the exact webhook format
            phone_number = data.get("from", data.get("sender", ""))
            message_text = data.get("message", data.get("text", ""))
            
            if not phone_number or not message_text:
                logging.error("Missing phone number or message text in webhook data")
                # Send error response via SMS
                sms_sender.send_sms(phone_number, "Invalid format. Send: Location RouteNumber")
                return jsonify({"error": "Missing phone number or message"}), 400
            
            # Parse SMS input
            parsed_data = parse_sms_input(message_text)
            
            if not parsed_data['valid']:
                logging.error(f"Invalid SMS format: {parsed_data['error']}")
                # Send error response via SMS
                sms_sender.send_sms(phone_number, parsed_data['error'])
                return jsonify({"error": parsed_data['error']}), 400
            
            # Get ETA from Google Maps
            eta_data = maps_client.get_bus_eta(parsed_data['location'], parsed_data['route'])
            
            if not eta_data['success']:
                logging.error(f"Failed to get ETA: {eta_data['error']}")
                # Send error response via SMS
                sms_sender.send_sms(phone_number, "Unable to fetch ETA. Please try again later.")
                return jsonify({"error": "Failed to get ETA"}), 500
            
            # Format response
            response_message = format_eta_response(eta_data, parsed_data['route'], parsed_data['location'])
            
            # Send SMS response
            sms_result = sms_sender.send_sms(phone_number, response_message)
            
            if not sms_result['success']:
                logging.error(f"Failed to send SMS: {sms_result['error']}")
                return jsonify({"error": "Failed to send response SMS"}), 500
            
            return jsonify({
                "message": "SMS processed successfully",
                "phone_number": phone_number,
                "location": parsed_data['location'],
                "route": parsed_data['route'],
                "eta_data": eta_data
            }), 200
            
        except Exception as e:
            logging.error(f"Unexpected error in webhook: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(
        host=os.getenv('HOST', '0.0.0.0'),
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )