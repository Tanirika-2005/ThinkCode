import requests
import logging
import time
from config import Config

class Fast2SMSSender:
    """Fast2SMS API client for sending SMS messages"""
    
    def __init__(self):
        """Initialize the Fast2SMS client with API key and base URL"""
        self.api_key = Config.FAST2SMS_API_KEY
        self.base_url = Config.FAST2SMS_BASE_URL
        
        if not self.api_key:
            raise ValueError("Fast2SMS API key is not configured")
    
    def send_sms(self, phone_number, message):
        """
        Send SMS using Fast2SMS API
        
        Args:
            phone_number (str): The recipient's phone number
            message (str): The message to send (max 160 characters)
            
        Returns:
            dict: Success status and details
        """
        try:
            # Prepare headers
            headers = {
                'authorization': self.api_key,
                'Content-Type': 'application/json'
            }
            
            # Prepare payload
            payload = {
                'route': 'v3',
                'sender_id': 'TXTIND',  # Default sender ID
                'message': message,
                'language': 'english',
                'flash': 0,
                'numbers': phone_number
            }
            
            # Make API request
            response = requests.post(
                self.base_url,
                json=payload,
                headers=headers,
                timeout=10
            )
            
            # Check if request was successful
            if response.status_code != 200:
                logging.error(f"Fast2SMS API request failed with status {response.status_code}")
                return {
                    'success': False,
                    'error': f'Fast2SMS API error: {response.status_code}',
                    'response': None
                }
            
            # Parse response
            response_data = response.json()
            
            # Check if SMS was sent successfully
            if response_data.get('return') == True:
                return {
                    'success': True,
                    'error': '',
                    'response': response_data
                }
            else:
                error_message = response_data.get('message', 'Unknown error')
                logging.error(f"Fast2SMS API returned error: {error_message}")
                return {
                    'success': False,
                    'error': f'Fast2SMS API error: {error_message}',
                    'response': response_data
                }
                
        except requests.exceptions.Timeout:
            logging.error("Fast2SMS API request timed out")
            return {
                'success': False,
                'error': 'Request to Fast2SMS API timed out',
                'response': None
            }
        except requests.exceptions.RequestException as e:
            logging.error(f"Fast2SMS API request error: {str(e)}")
            return {
                'success': False,
                'error': f'Fast2SMS API request error: {str(e)}',
                'response': None
            }
        except Exception as e:
            logging.error(f"Unexpected error in Fast2SMS client: {str(e)}")
            return {
                'success': False,
                'error': f'Unexpected error: {str(e)}',
                'response': None
            }
    
    def send_sms_with_retry(self, phone_number, message, max_retries=3):
        """
        Send SMS with retry logic for failed sends
        
        Args:
            phone_number (str): The recipient's phone number
            message (str): The message to send
            max_retries (int): Maximum number of retry attempts
            
        Returns:
            dict: Success status and details
        """
        for attempt in range(max_retries):
            result = self.send_sms(phone_number, message)
            
            if result['success']:
                return result
            
            # If not successful, log the attempt and wait before retrying
            logging.warning(f"SMS send attempt {attempt + 1} failed: {result['error']}")
            
            # Wait before retrying (exponential backoff)
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Wait 1, 2, 4 seconds
        
        # If all retries failed
        return {
            'success': False,
            'error': f'Failed to send SMS after {max_retries} attempts',
            'response': None
        }