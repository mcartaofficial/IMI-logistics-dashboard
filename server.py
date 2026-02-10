"""
IMI Shipping & Freight - Flask Backend Server
Alternative to GitHub Pages for local/server deployment
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import json
from datetime import datetime
import os

# Import the optimizer
import sys
sys.path.append(os.path.dirname(__file__))

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Store uploaded files temporarily
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_from_directory('.', 'index.html')


@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        file_type = request.form.get('type')
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if file and file.filename.endswith(('.xlsx', '.xls')):
            filename = f"{file_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Parse the Excel file
            df = pd.read_excel(filepath)
            data = df.to_dict('records')
            
            return jsonify({
                'success': True,
                'filename': filename,
                'data': data
            })
        
        return jsonify({'error': 'Invalid file type'}), 400
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/optimize', methods=['POST'])
def optimize():
    """Run optimization with uploaded data"""
    try:
        data = request.json
        
        # Extract data
        coa_list = pd.DataFrame(data['coaList'])
        coa_rates = pd.DataFrame(data['coaRates'])
        fob_prices = pd.DataFrame(data['fobPrices'])
        shipment_schedule = pd.DataFrame(data['shipmentSchedule'])
        
        bunker_price = data.get('bunkerPrice', 400)
        adjustments = data.get('adjustments', {})
        
        # Import and run optimizer
        try:
            from optimizer import ShippingOptimizer
            
            optimizer = ShippingOptimizer()
            optimizer.load_data(coa_list, coa_rates, fob_prices, shipment_schedule)
            results = optimizer.build_optimization_model(bunker_price, adjustments)
            explanation = optimizer.get_detailed_explanation()
            
            return jsonify({
                'success': True,
                'results': results,
                'explanation': explanation
            })
            
        except ImportError:
            # If optimizer.py is not available, return a simple response
            return jsonify({
                'success': False,
                'error': 'Optimizer module not found. Using client-side optimization.'
            })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/gemini-explain', methods=['POST'])
def gemini_explain():
    """Get explanation from Gemini API"""
    try:
        data = request.json
        api_key = data.get('apiKey')
        context = data.get('context')
        
        if not api_key:
            return jsonify({'error': 'API key required'}), 400
        
        import requests
        
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
        
        result = response.json()
        
        if 'candidates' in result and len(result['candidates']) > 0:
            explanation = result['candidates'][0]['content']['parts'][0]['text']
            return jsonify({
                'success': True,
                'explanation': explanation
            })
        else:
            return jsonify({
                'success': False,
                'error': 'No response from Gemini'
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })


if __name__ == '__main__':
    print("""
    ╔════════════════════════════════════════════════════════════╗
    ║   IMI Shipping & Freight - Route Optimization Dashboard   ║
    ║                    Flask Backend Server                     ║
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
    
    app.run(debug=True, host='0.0.0.0', port=5000)
