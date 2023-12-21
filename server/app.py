from flask import Flask, request, jsonify
from models import CareerPath
from openai_api import generate_assessment_questions, grade_answers
from flask_cors import CORS
from database import initialize_db

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
initialize_db()

@app.get('/api/hello_world')
def hello_world():
    return "Hello World!"

@app.post('/store')
def store_data():
    data = request.json
    career_path = CareerPath(prompt=data['prompt'], response=data['response'])
    career_path.save()
    return jsonify({"message": "Data stored successfully"}), 200

@app.get('/results')
def get_data():
    latest_result = CareerPath.objects.order_by('-created_at').first()
    if latest_result:
        result_dict = latest_result.to_mongo().to_dict()
        return jsonify(result_dict), 200
    else:
        return jsonify({"message": "No data found"}), 404

@app.route('/api/initial-prompt', methods=['POST'])
def handle_initial_prompt():
    user_input = request.json.get('prompt')
    questions = generate_assessment_questions(user_input)
    print(questions)
    # Store questions in MongoDB (optional: if you want to save the generated questions)
    for question in questions:
        CareerPath(prompt=question, response="").save()
    return jsonify({"questions": questions}), 200

@app.route('/api/process-answers', methods=['POST'])
def process_answers():
    answers = request.json.get('answers')
    print(answers)
    # Grade the answers using the modified grading logic
    # TODO: Modify invocation of `grade_answers()` so it can take in 
    #       parameter for `questions` as illustrated by output of `generate_assessment_questions()`
    graded_scores = grade_answers(answers)
    print(graded_scores)

    
    # Create a skill graph data structure based on the graded scores
    skill_graph_data = {
        'labels': list(graded_scores.keys()),  # Assuming keys are the pillar names
        'datasets': [{
            'label': 'Skills',
            'data': list(graded_scores.values()),  # Assuming values are the graded scores
            'fill': True,
            'backgroundColor': 'rgba(54, 162, 235, 0.2)',
            'borderColor': 'rgb(54, 162, 235)',
            'pointBackgroundColor': 'rgb(54, 162, 235)',
            'pointBorderColor': '#fff',
            'pointHoverBackgroundColor': '#fff',
            'pointHoverBorderColor': 'rgb(54, 162, 235)'
        }]
    }

    return jsonify(skill_graph_data), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)



# @app.route('/api/generate_questions', methods=['POST', 'GET'])
# def generate_questions():
#     print("Generating questions")
#     try:
#         user_data = request.get_json()
#         print(f"\n\nHere's my user data: {user_data}\n\n")

#         user_input = user_data.get('userInput', '')
#         print(f"\nHere's the user input: {user_input}\n\n")
        
#         openai_response = generate_assessment_questions(user_input)
#         print(f"\n\nHere's the OpenAI response: {openai_response}\n\n")

#         # Extract the questions from the OpenAI response 
#         # questions = openai_response.get('choices')[0].get('message').get('content')
#         questions = openai_response
#         print(f"\n\nHere's are the questions: {questions}\n\n")

#         # Return the plan as a JSON response
#         return make_response(jsonify({'questions': questions}), 200)

#     except Exception as e:
#         return make_response(jsonify({'error': str(e)}), 401)
    

# @app.route('/api/generate_recommendation', methods=['POST'])
# def generate_recommendation():
#     print("Generating recommendation")
#     try:
#         user_data = request.get_json()
#         print(f"\n\nHere's my user data: {user_data}\n\n")

#         user_input = user_data.get('userInput', '')

#         # Call the OpenAI API with user input using the imported function
#         openai_response = make_openai_request(user_input)
#         print(f"\n\nHere's the OpenAI response: {openai_response}\n\n")

#         # Extract the plan from the OpenAI response 
#         recommendation = openai_response.get('choices')[0].get('message').get('content')
#         print(f"\n\nHere's the recommendation: {recommendation}\n\n")

#         # Return the plan as a JSON response
#         return jsonify({'recommendation': recommendation})

#     except Exception as e:
#         return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
