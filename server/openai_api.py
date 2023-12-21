import os
import requests
from dotenv import load_dotenv

load_dotenv()

def generate_assessment_questions(prompt):
    api_key = os.getenv("OPEN_AI_API_KEY")
    if not api_key:
        raise ValueError("API key not found in .env file")

    endpoint = "https://api.openai.com/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    question = {"""
                What’s your background? Where do you see yourself in product management?
                """}

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"""Generate a set of 9 questions that assess skills in business, design, and engineering for product management..
                3 in each pillar with 1 easy, 1 medium, and 1 hard one for each pillar. 
                The questions should not be answered in 1 to 10 scales
                The inital question being asked to the user is {question}
                The user's answer is: {prompt}. 
                Questions should be numbered clearly from 1 to 9
                Just provide the list, nothing else
                
                Your response list of questions should be structured EXACTLY, EXACTLY as follows:

                Engineering - Easy: 1. Question body, Engineering - Medium: 2. Question body, Engineering - Hard: 3. Question body, Design - Easy: 4. Question body, Design - Medium: 5. Question body, Design - Hard: 6. Question body, Business - Easy: 7. Question body, Business - Medium: 8. Question body, Business - Hard: 9. Question body
                """}
        ],
        "temperature": 0.7,
        "max_tokens": 1024
    }

    response = requests.post(endpoint, json=data, headers=headers)
    
    if response.status_code == 200:
        questions = response.json()['choices'][0]['message']['content'].strip().split("\n")
        return questions
    else:
        raise Exception(f"API request failed with status code {response.status_code}: {response.text}")



def grade_answers(answers):
    # Ensure API key is available
    api_key = os.getenv("OPEN_AI_API_KEY")
    if not api_key:
        raise ValueError("API key not found")

    # Prepare the endpoint and headers for the API call
    endpoint = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    # Initialize scores and weightings
    scores = {'Business': 0.0, 'Design': 0.0, 'Engineering': 0.0}
    weightings = {'Easy': 1, 'Medium': 1.5, 'Hard': 2}

    # Prepare the grading form
    grading_form = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Grade each of the following answers, each separated by a \n, on a scale from 1 to 10:"},
            {"role": "user", "content": ""}
        ],
        "temperature": 0.7,
        "max_tokens": 1024
    }

    # Aggregate answers into the grading form
    for answer in answers:
        print(answer)
        grading_form['messages'][1]['content'] += answer['text'] + "\n"

    # Make the grading API call
    response = requests.post(endpoint, json=grading_form, headers=headers)
    print(response)
    if response.status_code != 200:
        print("Error with the grading operation!")
        return {}

    # Extract and process the response
    grades = response.json()['choices'][0]['message']['content'].strip().split('\n')
    print("Grades: ", grades)

    # Assign scores based on grades and weightings
    for i, grade in enumerate(grades):
        try:
            score = float(grade)
        except ValueError:
            continue  

        domain = answers[i]['pillar'].split(' - ')[0].strip()
        difficulty = answers[i]['pillar'].split(' - ')[1].strip()

        weighted_score = score * weightings.get(difficulty, 1)  # Use a default of 1 for unknown difficulties
        scores[domain] += weighted_score

    # Normalize the scores
    for domain in scores:
        scores[domain] = min(100, scores[domain])  # Ensure scores don't exceed 100

    return scores











# def grade_answers(answers):
#     api_key = os.getenv("OPEN_AI_API_KEY")
#     if not api_key:
#         raise ValueError("API key not found in .env file")

#     endpoint = "https://api.openai.com/v1/chat/completions"
#     headers = {
#         "Authorization": f"Bearer {api_key}",
#         "Content-Type": "application/json"
#     }

#     scores = {'Business': 0.0, 'Design': 0.0, 'Engineering': 0.0}
#     weightings = {'Easy': 1, 'Medium': 1.5, 'Hard': 2}

#     grading_form = {
#             "model": "gpt-3.5-turbo",
#             "messages": [
#                 {"role": "system", "content": "Grade the following answers, each separated by a \n, on a scale from 1 to 10:"},
#                 {"role": "user", "content": ""}
#             ],
#             "temperature": 0.7,
#             "max_tokens": 1024
#         }

#     for answer in answers:
#         # Extract the pillar and difficulty from the question
#         answer_content, answer_field = answer['text'], answer['pillar']
#         parts = answer_field.split(' - ')
#         # if len(parts) != 2:
#         #     print(f"Invalid answer format: {answer}")
#         #     continue
#         pillar, difficulty = parts[0].strip(), parts[1].strip()
#         # NOTE: We need to send question data into this function so the following will work:
#         # print(f"Question: {question}")
#         print(f"Written Answer: {answer_content}")
#         print(f"Difficulty: {difficulty}")
#         print(f"Pillar: {pillar}")

#         # TODO: The rest of this process is currently being invoked one-by-one per each answer, 
#         #       resulting in nine distinctive OpenAI API calls. Instead, aggregate your `grading_form` 
#         #       into a single API call and return the results.
#         # Prepare data for grading API calL
#         grading_form['messages'][1]['content'] += answer_content + "\n"

#         print("Here's my aggregate data to grade from user-inputted responses.")
#         print(grading_form)

#     score = 0.0

#     # Make the grading API call
#     response = requests.post(endpoint, json=grading_form, headers=headers)
#     if response.status_code == 200:
#         score_text = response.json()['choices'][0]['message']['content'].strip()
#         try:
#             score = float(score_text)
#         except ValueError:
#             print("something went wrong with the grading operation!")  # Skip if score is not a number
#         weighted_score = score * weightings.get(difficulty, 1)  # Use a default of 1 for unknown difficulties
#         scores[pillar] += weighted_score

#     # Normalize the scores to a maximum of 100 for each pillar
#     for pillar in scores:
#         scores[pillar] = min(100, scores[pillar])  # Ensure scores don't exceed 100

#     return scores


