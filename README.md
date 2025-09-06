# Bus Route ETA SMS Service

A Flask-based service that allows users to SMS their location and bus route number to get real-time ETA responses via SMS.

## Overall Architecture
User SMS → Webhook receives → Parse location & route → Google Maps API → Format response → Fast2SMS reply

## Features
- SMS webhook endpoint for receiving incoming messages
- SMS parsing for location and route number extraction
- Google Maps API integration for ETA calculation
- SMS response formatting
- Fast2SMS integration for sending replies
- Spam control to prevent excessive requests
- Comprehensive error handling and logging
- Health check endpoint
- Docker support for easy deployment

## Prerequisites
- Python 3.7+
- Google Maps API key
- Fast2SMS account and API key

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd bus-eta-sms-service
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```
   cp .env.example .env
   # Edit .env with your actual API keys and configuration
   ```

## Configuration

Create a `.env` file with the following variables:
- `GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `FAST2SMS_API_KEY`: Your Fast2SMS API key
- `FLASK_SECRET_KEY`: A secret key for Flask
- `FLASK_ENV`: Environment (development/production)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 5000)

## Usage

1. Start the development server:
   ```
   python app.py
   ```

2. For production, use Gunicorn:
   ```
   gunicorn --bind 0.0.0.0:5000 app:app
   ```

## API Endpoints

- `POST /webhook`: Webhook endpoint for incoming SMS
- `GET /health`: Health check endpoint

## SMS Format

Users should send SMS messages in one of these formats:
- "Location RouteNumber" (e.g., "MG Road 23")
- "Location Route RouteNumber" (e.g., "Central Station Route 45")
- "Location RRouteNumber" (e.g., "Bus Stop A R12")

## Example

Input: "MG Road Route 45"
Output: "Route 45 from MG Road: Next bus in 12 mins at 2:30 PM. Next: 2:50 PM"

## Deployment

The application can be deployed using Docker. See `Dockerfile` for details.

For cloud deployment, you can use platforms like Google Cloud Run, AWS ECS, or Heroku.

## License

MIT License