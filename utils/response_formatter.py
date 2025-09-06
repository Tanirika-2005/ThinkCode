import logging
from datetime import datetime

def format_eta_response(eta_data, route, location):
    """
    Format ETA data into an SMS-ready response message
    
    Args:
        eta_data (dict): Parsed ETA data from Google Maps
        route (str): The bus route number
        location (str): The location/origin
        
    Returns:
        str: Formatted SMS message (max 160 characters)
    """
    try:
        # Check if we have successful ETA data
        if not eta_data.get('success', False) or not eta_data.get('data'):
            # Handle error cases
            if eta_data.get('error'):
                if 'not found' in eta_data['error'].lower():
                    return "Route not found. Check route number and try again."
                else:
                    return "Unable to fetch ETA. Please try again later."
            else:
                return "Unable to fetch ETA. Please try again later."
        
        # Extract data from eta_data
        data = eta_data['data']
        eta_text = data.get('eta_text', 'Unknown')
        departure_time = data.get('departure_time', 'Unknown')
        next_time = data.get('next_time', 'Unknown')
        
        # Format the response message
        # Format: "Route {route} from {location}: Next bus in {minutes} mins at {time}. Next: {next_time}"
        message = f"Route {route} from {location}: Next bus in {eta_text} at {departure_time}. Next: {next_time}"
        
        # Ensure message is within 160 characters
        if len(message) > 160:
            # Truncate if necessary
            message = message[:157] + "..."
        
        return message
        
    except Exception as e:
        logging.error(f"Error formatting ETA response: {str(e)}")
        return "Error processing your request. Please try again."

# Test the function
if __name__ == '__main__':
    # Test with sample data
    test_eta_data = {
        'success': True,
        'error': '',
        'data': {
            'eta_minutes': 12,
            'eta_text': '12 mins',
            'departure_time': '2:30 PM',
            'origin': 'MG Road',
            'destination': 'Downtown',
            'route_number': '23',
            'next_departure': '2:30 PM',
            'bus_stop_name': 'MG Road',
            'next_time': '2:50 PM'
        }
    }
    
    result = format_eta_response(test_eta_data, '23', 'MG Road')
    print(f"Formatted response: {result}")
    print(f"Length: {len(result)} characters")