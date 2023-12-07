from flask import Flask, request, jsonify
from openai_api import make_openai_request 

app = Flask(__name__)

@app.get('/api')
def hello_world():
    return {"message": 'Hello World!'}

@app.post('/api/generate_questions')
def generate_questions():
    pass

@app.route('/api/generate_recommendation', methods=['POST'])
def generate_recommendation():
    print("Generating recommendation")
    try:
        user_data = request.get_json()
        print(f"\n\nHere's my user data: {user_data}\n\n")

        user_input = user_data.get('userInput', '')

        # Call the OpenAI API with user input using the imported function
        openai_response = make_openai_request(user_input)
        print(f"\n\nHere's the OpenAI response: {openai_response}\n\n")

        # Extract the plan from the OpenAI response 
        recommendation = openai_response.get('choices')[0].get('message').get('content')
        print(f"\n\nHere's the recommendation: {recommendation}\n\n")

        # Return the plan as a JSON response
        return jsonify({'recommendation': recommendation})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
