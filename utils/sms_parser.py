import re
import logging

def parse_sms_input(message_text):
    """
    Parse SMS input message to extract location and route number
    
    Args:
        message_text (str): The SMS message text
        
    Returns:
        dict: Parsed data with location, route, validity, and error message
    """
    try:
        # Remove extra whitespace and strip
        message_text = message_text.strip()
        
        if not message_text:
            return {
                'location': '',
                'route': '',
                'valid': False,
                'error': 'Invalid format. Send: Location RouteNumber'
            }
        
        # Handle formats:
        # "MG Road 23" -> location: "MG Road", route: "23"
        # "Central Station Route 45" -> location: "Central Station", route: "45"
        # "Bus Stop A R12" -> location: "Bus Stop A", route: "12"
        
        # Pattern 2: "Location Route RouteNumber" (e.g., "Central Station Route 45")
        pattern2 = re.match(r'^(.+?)\s+route\s+(\d+)$', message_text, re.IGNORECASE)
        if pattern2:
            location = pattern2.group(1).strip()
            route = pattern2.group(2)
            return {
                'location': location,
                'route': route,
                'valid': True,
                'error': ''
            }
        
        # Pattern 3: "Location RRouteNumber" (e.g., "Bus Stop A R12")
        pattern3 = re.match(r'^(.+?)\s+[rR](\d+)$', message_text)
        if pattern3:
            location = pattern3.group(1).strip()
            route = pattern3.group(2)
            return {
                'location': location,
                'route': route,
                'valid': True,
                'error': ''
            }
        
        # Pattern 1: "Location RouteNumber" (e.g., "MG Road 23")
        pattern1 = re.match(r'^(.+?)\s+(\d+)$', message_text)
        if pattern1:
            location = pattern1.group(1).strip()
            route = pattern1.group(2)
            return {
                'location': location,
                'route': route,
                'valid': True,
                'error': ''
            }
        
        # If no pattern matches
        return {
            'location': '',
            'route': '',
            'valid': False,
            'error': 'Invalid format. Send: Location RouteNumber'
        }
        
    except Exception as e:
        logging.error(f"Error parsing SMS input: {str(e)}")
        return {
            'location': '',
            'route': '',
            'valid': False,
            'error': 'Error processing your request. Please try again.'
        }

# Test cases
if __name__ == '__main__':
    # Test cases for various input formats
    test_cases = [
        "MG Road 23",
        "Central Station Route 45",
        "Bus Stop A R12",
        "Invalid Format",
        "",
        "   ",
        "Park Avenue Route 7",
        "Main Street R5"
    ]
    
    for test_case in test_cases:
        result = parse_sms_input(test_case)
        print(f"Input: '{test_case}' -> {result}")