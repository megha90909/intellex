# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS # This is crucial for connecting frontend and backend
import requests # Used to call the AI model's API

# Create a Flask application instance
app = Flask(__name__)
CORS(app) # Enable Cross-Origin Resource Sharing for your frontend

# This is the API endpoint that your frontend will call
@app.route('/api/generate-plan', methods=['POST'])
def generate_plan():
    # Get the user data sent from the frontend
    user_data = request.get_json()

    # Log the received data for debugging
    print("Received user data:", user_data)

    # In a real app, you would process the data here
    # For this example, we'll use a placeholder for the AI logic.

    try:
        # Example: Call an external AI API (like a food database or a large language model)
        # You would replace this with your actual AI integration code.
        # This example uses a simplified dummy response.
        
        # This is where your AI model would take user_data as input
        # and generate a personalized diet plan.
        
        # For a real implementation, you would make an API call like this:
        # ai_response = requests.post("https://api.your-ai-service.com/generate", json=user_data)
        # ai_response.raise_for_status() # Check for errors
        # diet_plan = ai_response.json()
        
        # Placeholder for the AI-generated diet plan
        diet_plan = {
            "breakfast": "Oatmeal with berries and nuts",
            "lunch": "Grilled chicken salad with quinoa",
            "dinner": "Baked salmon with roasted vegetables",
            "snacks": ["Apple slices with almond butter", "Greek yogurt"]
        }

        # Return the generated plan back to the frontend
        return jsonify(diet_plan), 200

    except Exception as e:
        # Handle any errors that occur during the process
        print(f"Error generating diet plan: {e}")
        return jsonify({"error": "Failed to generate plan"}), 500

# This part runs the server
if __name__ == '__main__':
    app.run(debug=True) # debug=True reloads the server automatically on code changes