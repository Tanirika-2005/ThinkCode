import requests
import logging
from config import Config
from datetime import datetime

class GoogleMapsClient:
    """Google Maps API client for fetching bus ETAs"""
    
    def __init__(self):
        """Initialize the Google Maps client with API key"""
        self.api_key = Config.GOOGLE_MAPS_API_KEY
        self.base_url = 'https://maps.googleapis.com/maps/api/directions/json'
        
        if not self.api_key:
            raise ValueError("Google Maps API key is not configured")
    
    def get_bus_eta(self, origin, route_number):
        """
        Get bus ETA using Google Maps Directions API
        
        Args:
            origin (str): The starting location
            route_number (str): The bus route number
            
        Returns:
            dict: Standardized ETA data with success status and error handling
        """
        try:
            # For a real implementation, you would map route numbers to actual destinations
            # For this example, we'll use a fixed destination based on route number
            destination_mapping = {
                '23': 'Downtown',
                '45': 'Airport',
                '12': 'Railway Station',
                '7': 'Shopping Mall',
                '5': 'University'
            }
            
            # Default destination if route number not found
            destination = destination_mapping.get(route_number, 'City Center')
            
            # Prepare API parameters
            params = {
                'origin': origin,
                'destination': destination,
                'mode': 'transit',
                'transit_mode': 'bus',
                'departure_time': 'now',
                'key': self.api_key
            }
            
            # Make API request
            response = requests.get(self.base_url, params=params, timeout=10)
            
            # Check if request was successful
            if response.status_code != 200:
                logging.error(f"Google Maps API request failed with status {response.status_code}")
                return {
                    'success': False,
                    'error': f'Google Maps API error: {response.status_code}',
                    'data': None
                }
            
            # Parse response
            data = response.json()
            
            # Check API response status
            if data.get('status') != 'OK':
                logging.error(f"Google Maps API returned status: {data.get('status')}")
                return {
                    'success': False,
                    'error': f'Google Maps API status: {data.get("status")}',
                    'data': None
                }
            
            # Extract ETA information
            routes = data.get('routes', [])
            if not routes:
                return {
                    'success': False,
                    'error': 'No routes found',
                    'data': None
                }
            
            # Get the first route
            route = routes[0]
            legs = route.get('legs', [])
            
            if not legs:
                return {
                    'success': False,
                    'error': 'No route legs found',
                    'data': None
                }
            
            # Get the first leg
            leg = legs[0]
            duration = leg.get('duration', {})
            duration_in_traffic = leg.get('duration_in_traffic', {})
            
            # Extract time information
            eta_minutes = duration.get('value', 0) // 60  # Convert seconds to minutes
            eta_text = duration.get('text', 'Unknown')
            
            # Get departure time if available
            departure_time = leg.get('departure_time', {}).get('text', 'Now')
            
            # For a real implementation, you would parse the transit details to get
            # information about specific bus stops and next departures
            # This is simplified for the example
            
            return {
                'success': True,
                'error': '',
                'data': {
                    'eta_minutes': eta_minutes,
                    'eta_text': eta_text,
                    'departure_time': departure_time,
                    'origin': origin,
                    'destination': destination,
                    'route_number': route_number,
                    'next_departure': departure_time,
                    'bus_stop_name': origin,  # In a real implementation, this would be the actual bus stop
                    'next_time': 'Unknown'  # In a real implementation, this would be the next bus time
                }
            }
            
        except requests.exceptions.Timeout:
            logging.error("Google Maps API request timed out")
            return {
                'success': False,
                'error': 'Request to Google Maps API timed out',
                'data': None
            }
        except requests.exceptions.RequestException as e:
            logging.error(f"Google Maps API request error: {str(e)}")
            return {
                'success': False,
                'error': f'Google Maps API request error: {str(e)}',
                'data': None
            }
        except Exception as e:
            logging.error(f"Unexpected error in Google Maps client: {str(e)}")
            return {
                'success': False,
                'error': f'Unexpected error: {str(e)}',
                'data': None
            }