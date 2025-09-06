import unittest
import sys
import os
from unittest.mock import patch, MagicMock

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from utils.sms_parser import parse_sms_input
from utils.response_formatter import format_eta_response
from utils.maps_client import GoogleMapsClient
from utils.sms_sender import Fast2SMSSender

class TestSMSParsing(unittest.TestCase):
    """Test cases for SMS input parsing"""
    
    def test_parse_sms_input_valid_format1(self):
        """Test parsing valid format: 'Location RouteNumber'"""
        result = parse_sms_input("MG Road 23")
        self.assertTrue(result['valid'])
        self.assertEqual(result['location'], "MG Road")
        self.assertEqual(result['route'], "23")
    
    def test_parse_sms_input_valid_format2(self):
        """Test parsing valid format: 'Location Route RouteNumber'"""
        result = parse_sms_input("Central Station Route 45")
        self.assertTrue(result['valid'])
        self.assertEqual(result['location'], "Central Station")
        self.assertEqual(result['route'], "45")
    
    def test_parse_sms_input_valid_format3(self):
        """Test parsing valid format: 'Location RRouteNumber'"""
        result = parse_sms_input("Bus Stop A R12")
        self.assertTrue(result['valid'])
        self.assertEqual(result['location'], "Bus Stop A")
        self.assertEqual(result['route'], "12")
    
    def test_parse_sms_input_invalid_format(self):
        """Test parsing invalid format"""
        result = parse_sms_input("Invalid Format")
        self.assertFalse(result['valid'])
        self.assertIn("Invalid format", result['error'])
    
    def test_parse_sms_input_empty_message(self):
        """Test parsing empty message"""
        result = parse_sms_input("")
        self.assertFalse(result['valid'])
        self.assertIn("Invalid format", result['error'])

class TestResponseFormatter(unittest.TestCase):
    """Test cases for ETA response formatting"""
    
    def test_format_eta_response_success(self):
        """Test formatting successful ETA response"""
        eta_data = {
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
        
        result = format_eta_response(eta_data, '23', 'MG Road')
        expected = "Route 23 from MG Road: Next bus in 12 mins at 2:30 PM. Next: 2:50 PM"
        self.assertEqual(result, expected)
    
    def test_format_eta_response_error(self):
        """Test formatting error response"""
        eta_data = {
            'success': False,
            'error': 'Route not found',
            'data': None
        }
        
        result = format_eta_response(eta_data, '99', 'Unknown Location')
        self.assertIn("Route not found", result)

class TestGoogleMapsClient(unittest.TestCase):
    """Test cases for Google Maps client"""
    
    @patch('utils.maps_client.requests.get')
    def test_get_bus_eta_success(self, mock_get):
        """Test successful ETA retrieval"""
        # Mock the API response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'status': 'OK',
            'routes': [{
                'legs': [{
                    'duration': {'value': 720, 'text': '12 mins'},
                    'departure_time': {'text': '2:30 PM'}
                }]
            }]
        }
        mock_get.return_value = mock_response
        
        # Create client and call method
        client = GoogleMapsClient()
        result = client.get_bus_eta("MG Road", "23")
        
        # Check results
        self.assertTrue(result['success'])
        self.assertEqual(result['data']['eta_minutes'], 12)
        self.assertEqual(result['data']['eta_text'], '12 mins')
    
    @patch('utils.maps_client.requests.get')
    def test_get_bus_eta_api_error(self, mock_get):
        """Test API error handling"""
        # Mock the API response
        mock_response = MagicMock()
        mock_response.status_code = 400
        mock_get.return_value = mock_response
        
        # Create client and call method
        client = GoogleMapsClient()
        result = client.get_bus_eta("MG Road", "23")
        
        # Check results
        self.assertFalse(result['success'])
        self.assertIn("Google Maps API error", result['error'])

class TestFast2SMSSender(unittest.TestCase):
    """Test cases for Fast2SMS sender"""
    
    @patch('utils.sms_sender.requests.post')
    def test_send_sms_success(self, mock_post):
        """Test successful SMS sending"""
        # Mock the API response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'return': True,
            'message': 'SMS sent successfully'
        }
        mock_post.return_value = mock_response
        
        # Create sender and call method
        sender = Fast2SMSSender()
        result = sender.send_sms("1234567890", "Test message")
        
        # Check results
        self.assertTrue(result['success'])
        self.assertEqual(result['response']['return'], True)
    
    @patch('utils.sms_sender.requests.post')
    def test_send_sms_api_error(self, mock_post):
        """Test API error handling"""
        # Mock the API response
        mock_response = MagicMock()
        mock_response.status_code = 400
        mock_post.return_value = mock_response
        
        # Create sender and call method
        sender = Fast2SMSSender()
        result = sender.send_sms("1234567890", "Test message")
        
        # Check results
        self.assertFalse(result['success'])
        self.assertIn("Fast2SMS API error", result['error'])

if __name__ == '__main__':
    unittest.main()