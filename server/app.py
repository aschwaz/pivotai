from flask import Flask, request, jsonify, make_response
from openai_api import make_openai_request, generate_assessment_questions 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri = "mongodb+srv://andrewschwartz525:<password>@cluster0.wbmprpy.mongodb.net/?retryWrites=true&w=majority"


app = Flask(__name__)

@app.get('/api')
def hello_world():
    return {"message": 'Hello World!'}

@app.route('/api/generate_questions', methods=['POST', 'GET'])
def generate_questions():
    print("Generating questions")
    try:
        user_data = request.get_json()
        print(f"\n\nHere's my user data: {user_data}\n\n")

        user_input = user_data.get('userInput', '')
        print(f"\nHere's the user input: {user_input}\n\n")
        
        openai_response = generate_assessment_questions(user_input)
        print(f"\n\nHere's the OpenAI response: {openai_response}\n\n")

        # Extract the questions from the OpenAI response 
        # questions = openai_response.get('choices')[0].get('message').get('content')
        questions = openai_response
        print(f"\n\nHere's are the questions: {questions}\n\n")

        # Return the plan as a JSON response
        return make_response(jsonify({'questions': questions}), 200)

    except Exception as e:
        return make_response(jsonify({'error': str(e)}), 401)


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
