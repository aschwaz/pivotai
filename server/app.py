from flask import Flask, request, jsonify
from openai_api import make_openai_request 

app = Flask(__name__)

@app.get('/api')
def hello_world():
    return {"message": 'Hello World!'}

@app.route('/api/generate_plan', methods=['POST'])
def generate_plan():
    print("Generating plan")
    try:
        data = request.get_json()
        print(data)

        user_input = data.get('userInput', '')

        # Call the OpenAI API with user input using the imported function
        openai_response = make_openai_request(user_input)

        # Extract the plan from the OpenAI response (customize this part)
        plan = openai_response.get('choices')[0].get('message').get('content')

        # Return the plan as a JSON response
        return jsonify({'plan': plan})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
