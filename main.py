from fastapi import FastAPI, Form
from dotenv import load_dotenv
import uvicorn
import os
import requests

# Load environment variables
load_dotenv()

app = FastAPI(title="Rural Bus ETA Tracker", description="SMS-based bus ETA tracking system using Fast2SMS and Google Maps")

@app.post("/simulate-sms", summary="Simulate SMS reception", description="Endpoint to simulate receiving an SMS with user number and bus route")
async def simulate_sms(user_number: str = Form(...), bus_route: str = Form(...)):
    """
    Simulate an SMS being received with user number and bus route
    
    - **user_number**: Phone number of the user requesting ETA
    - **bus_route**: The bus route for which ETA is requested
    """
    # This is where we would process the SMS request
    # For now, we'll just return the received data
    return {
        "message": "SMS received successfully",
        "user_number": user_number,
        "bus_route": bus_route,
        "status": "processing"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)