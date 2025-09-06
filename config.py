import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration class for the Bus ETA Tracker application"""
    
    # Google Maps API configuration
    GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')
    
    # Fast2SMS API configuration
    FAST2SMS_API_KEY = os.getenv('FAST2SMS_API_KEY')
    FAST2SMS_BASE_URL = 'https://www.fast2sms.com/dev/bulkV2'
    
    # Flask configuration
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key')
    
    # Validate required environment variables
    @classmethod
    def validate(cls):
        """Validate that all required environment variables are set"""
        required_vars = [
            ('GOOGLE_MAPS_API_KEY', cls.GOOGLE_MAPS_API_KEY),
            ('FAST2SMS_API_KEY', cls.FAST2SMS_API_KEY),
            ('FLASK_SECRET_KEY', cls.SECRET_KEY)
        ]
        
        missing_vars = [name for name, value in required_vars if not value]
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
    
    # Environment-based configuration
    @classmethod
    def is_development(cls):
        """Check if the application is running in development mode"""
        return os.getenv('FLASK_ENV') == 'development'
    
    @classmethod
    def is_production(cls):
        """Check if the application is running in production mode"""
        return os.getenv('FLASK_ENV') == 'production'

# Validate configuration on import
Config.validate()