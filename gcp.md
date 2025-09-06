# Rural Bus ETA Tracker - GCP Development Log

## Project Overview
Building a rural bus ETA tracker using SMS (Fast2SMS + Google Maps) with Python FastAPI.

## Current Status
- [x] Created project skeleton with FastAPI, uvicorn, requests, and dotenv support
- [ ] Implement Fast2SMS integration
- [ ] Implement Google Maps API integration
- [ ] Add real ETA calculation logic
- [ ] Connect to actual SMS receiving mechanism
- [ ] Deploy to Google Cloud Platform

## Completed Tasks

### Task 1: Project Skeleton Creation
- Created main.py with FastAPI application
- Implemented /simulate-sms POST endpoint
- Added form field handling for user_number and bus_route
- Set up dependencies: fastapi, uvicorn, python-dotenv, requests
- Created requirements.txt, .env template, and README.md

## Next Tasks
1. Obtain Fast2SMS API key and Google Maps API key
2. Implement Fast2SMS integration for sending SMS
3. Implement Google Maps API integration for ETA calculation
4. Add business logic to calculate bus ETAs
5. Test with real SMS using Fast2SMS webhook
6. Deploy to Google Cloud Platform

## Environment Variables Needed
- FAST2SMS_API_KEY
- GOOGLE_MAPS_API_KEY

## API Endpoints
- POST /simulate-sms (form fields: user_number, bus_route)

## Notes
- Project is lightweight and hackathon-friendly
- Using Form data for SMS simulation
- All dependencies are pinned for reproducible builds