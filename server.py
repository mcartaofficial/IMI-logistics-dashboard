# The lines below are the initial setup for a specialized web application
"""
IMI Shipping & Freight - Flask Backend Server
Alternative to GitHub Pages for local/server deployment
"""

# Import the 'Flask' framework to create the web server and tools to handle web requests
from flask import Flask, request, jsonify, send_from_directory
# Import 'CORS' to allow this server to talk to web browsers safely
from flask_cors import CORS
# Import 'pandas' which is a powerful tool for reading and organizing data like spreadsheets
import pandas as pd
# Import 'json' to help the server read and write data in a standard web format
import json
# Import 'datetime' to let the server record the exact time and date of actions
from datetime import datetime
# Import 'os' to allow the server to interact with the computer's file folders
import os

# The next two lines tell the server where to look for the custom "optimizer" logic file
import sys
sys.path.append(os.path.dirname(__file__))

# Create the main application object and tell it to look in the current folder for files
app = Flask(__name__, static_folder='.', static_url_path='')
# Enable the security settings that allow the front-end website to talk to this back-end server
CORS(app)

# Define the name of the folder where uploaded Excel files will be stored
UPLOAD_FOLDER = 'uploads'
# Create that folder on the computer's hard drive if it doesn't already exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# Save this folder setting into the application's configuration memory
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Define what happens when someone visits the main website address (the "home" page)
@app.route('/')
def index():
    """Serve the main HTML page"""
    # Send the 'index.html' file (the visual website) to the user's browser
    return send_from_directory('.', 'index.html')


# Define a "POST" route to receive files sent from the user's computer to the server
@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads"""
    try:
        # Check if the user actually included a file in their request
        if 'file' not in request.files:
            # If no file is found, send back an error message and a '400' (bad request) code
            return jsonify({'error': 'No file provided'}), 400
        
        # Grab the file and the "type" label (like 'rates' or 'schedule') from the request
        file = request.files['file']
        file_type = request.form.get('type')
        
        # Check if the file has a blank name, which means nothing was actually selected
        if file.filename == '':
            # Return an error message if the file name is empty
            return jsonify({'error': 'No file selected'}), 400
        
        # Check if the file is a valid Excel spreadsheet format
        if file and file.filename.endswith(('.xlsx', '.xls')):
            # Create a unique name using the file type and current date/time to avoid overwriting
            filename = f"{file_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
            # Combine the folder path and the new filename to create a full save path
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            # Save the file onto the server's hard drive
            file.save(filepath)
            
            # Use the pandas tool to read the data inside the Excel spreadsheet
            df = pd.read_excel(filepath)
            # Convert the spreadsheet rows and columns into a list format the website can understand
            data = df.to_dict('records')
            
            # Send back a success message along with the spreadsheet data
            return jsonify({
                'success': True,
                'filename': filename,
                'data': data
            })
        
        # If the file wasn't an Excel sheet, send back an invalid type error
        return jsonify({'error': 'Invalid file type'}), 400
        
    # If anything goes wrong during this process, catch the error
    except Exception as e:
        # Send back the specific error message and a '500' (server error) code
        return jsonify({'error': str(e)}), 500


# Define a route to run the complex math that calculates the best shipping routes
@app.route('/optimize', methods=['POST'])
def optimize():
    """Run optimization with uploaded data"""
    try:
        # Get the data sent by the website in JSON format
        data = request.json
        
        # Convert the different lists of shipping info into structured tables (DataFrames)
        coa_list = pd.DataFrame(data['coaList'])
        coa_rates = pd.DataFrame(data['coaRates'])
        fob_prices = pd.DataFrame(data['fobPrices'])
        shipment_schedule = pd.DataFrame(data['shipmentSchedule'])
        
        # Get the current fuel (bunker) price, defaulting to 400 if not provided
        bunker_price = data.get('bunkerPrice', 400)
        # Get any special settings or manual adjustments the user entered
        adjustments = data.get('adjustments', {})
        
        # Try to use the "ShippingOptimizer" tool located in a separate file
        try:
            from optimizer import ShippingOptimizer
            
            # Initialize the calculator engine
            optimizer = ShippingOptimizer()
            # Feed the spreadsheet data into the calculator
            optimizer.load_data(coa_list, coa_rates, fob_prices, shipment_schedule)
            # Run the math model to find the cheapest routes based on fuel and settings
            results = optimizer.build_optimization_model(bunker_price, adjustments)
            # Get a written description of why these routes were chosen
            explanation = optimizer.get_detailed_explanation()
            
            # Send the final calculated results and explanation back to the website
            return jsonify({
                'success': True,
                'results': results,
                'explanation': explanation
            })
            
        # If the 'optimizer.py' file is missing from the server
        except ImportError:
            # Inform the website that it needs to perform its own simplified calculations
            return jsonify({
                'success': False,
                'error': 'Optimizer module not found. Using client-side optimization.'
            })
        
    # If the math or data processing fails
    except Exception as e:
        # Return the error details to the user
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# Define a route to send data to the Gemini AI for a professional analysis
@app.route('/gemini-explain', methods=['POST'])
def gemini_explain():
    """Get explanation from Gemini API"""
    try:
        # Get the input data (API key and shipping results)
        data = request.json
        api_key = data.get('apiKey')
        context = data.get('context')
        
        # Ensure the user provided a secret key to use the AI service
        if not api_key:
            # Return an error if the key is missing
            return jsonify({'error': 'API key required'}), 400
        
        # Import the 'requests' tool to send information to Google's AI servers
        import requests
        
        # Create a detailed set of instructions (a prompt) for the AI to follow
        prompt = f"""You are an expert shipping logistics analyst. Analyze this route optimization result and explain why this is the optimal solution. Be concise and professional.

Context:
- Total Cost: ${context['totalCost']:.2f}
- Number of Shipments: {context['numShipments']}
- Average Cost per Shipment: ${context['avgCost']:.2f}
- COA Usage: {json.dumps(context['coaUsage'])}
- Port Usage: {json.dumps(context['portUsage'])}

Explain in 3-4 paragraphs:
1. Why this solution minimizes costs
2. How the COA contracts are optimally utilized
3. Key insights about the port selection strategy
4. Any recommendations for cost savings"""

        # Send the prompt to Google's Gemini AI service over the internet
        response = requests.post(
            f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}',
            headers={'Content-Type': 'application/json'},
            json={
                'contents': [{
                    'parts': [{
                        'text': prompt
                    }]
                }]
            }
        )
        
        # Turn the response from the AI into a format the code can read
        result = response.json()
        
        # Check if the AI actually returned a valid answer
        if 'candidates' in result and len(result['candidates']) > 0:
            # Extract the written text generated by the AI
            explanation = result['candidates'][0]['content']['parts'][0]['text']
            # Send the AI's explanation back to the website
            return jsonify({
                'success': True,
                'explanation': explanation
            })
        else:
            # Return an error if the AI failed to generate a response
            return jsonify({
                'success': False,
                'error': 'No response from Gemini'
            }), 500
            
    # Handle any internet connection or AI processing errors
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# Define a simple "Health Check" route to see if the server is currently running
@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    # Return a status message and the current time
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })


# This is the starting point of the program when you run 'python server.py'
if __name__ == '__main__':
    # Print a decorative welcome message in the computer's command window
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║   IMI Shipping & Freight - Route Optimization Dashboard    ║
    ║                    Flask Backend Server                    ║
    ╚════════════════════════════════════════════════════════════╝
    
    Server starting on http://localhost:5000
    
    Open your browser and navigate to:
    → http://localhost:5000
    
    API Endpoints:
    → POST /upload          - Upload Excel files
    → POST /optimize        - Run optimization
    → POST /gemini-explain  - Get AI explanation
    → GET  /health          - Health check
    
    Press Ctrl+C to stop the server
    """)
    
    # Actually start the web server on port 5000 and enable 'debug' mode for development
    app.run(debug=True, host='0.0.0.0', port=5000)
