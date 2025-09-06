# Rural Bus ETA Tracker

A lightweight, hackathon-friendly solution for tracking rural bus ETAs using SMS (Fast2SMS) and Google Maps.

## Features

- FastAPI backend for handling HTTP requests
- SMS simulation endpoint for testing
- Integration with Fast2SMS for real SMS communication
- Google Maps API for ETA calculations
- Environment variable configuration

## Dependencies

- `fastapi`: Modern, fast web framework for building APIs with Python 3.7+
- `uvicorn`: ASGI server implementation for Python web applications
- `python-dotenv`: For loading environment variables from .env file
- `requests`: For making HTTP requests to external APIs

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Configure environment variables in `.env` file:
   - `FAST2SMS_API_KEY`: Your Fast2SMS API key
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API key

3. Run the server:
   ```
   python main.py
   ```

4. Access the API documentation at `http://localhost:8000/docs`

## Endpoints

### POST /simulate-sms

Simulates receiving an SMS with user number and bus route.

**Form Parameters:**
- `user_number` (required): Phone number of the user requesting ETA
- `bus_route` (required): The bus route for which ETA is requested

**Response:**
```json
{
  "message": "SMS received successfully",
  "user_number": "string",
  "bus_route": "string",
  "status": "processing"
}
```