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
    
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": 
                "Generate a set of 9 questions that assess skills in business, design, and engineering for product management. "
                "3 in each pillar with 1 easy, 1 medium, and 1 hard one for each pillar. "
                "The questions should not be answered in 1 to 10 scales"
                "The user's input is: {prompt}. "
                "Questions should be numbered clearly from 1 to 9"
                "Just provide the list, nothing else"
                """
                An example list  of questions should be structured EXACTLY as follows:

                Engineering - Easy: 1. Question body
                Engineering - Medium: 2. Question body
                Engineering - Hard: 3. Question body
                Design - Easy: 4. Question body
                Design - Medium: 5. Question body
                Design - Hard: 6. Question body
                Business - Easy: 7. Question body
                Business - Medium: 8. Question body
                Business - Hard: 9. Question body
                """
            }
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
    load_dotenv()
    api_key = os.getenv("OPEN_AI_API_KEY")
    if not api_key:
        raise ValueError("API key not found in .env file")

    endpoint = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    scores = {'Business': 0, 'Design': 0, 'Engineering': 0}
    weightings = {'Easy': 1, 'Medium': 1.5, 'Hard': 2}
    max_score_per_pillar = sum(weightings.values()) * 10  # Total possible score per pillar

    for answer in answers:
        # Extract the difficulty level and question number
        parts = answer['pillar'].split(': ')
        if len(parts) < 2:
            continue
        difficulty, question = parts[0], parts[1]
        question_num = int(question.split('.')[0])

        # Assign the pillar based on the question number
        pillar = 'Engineering' if 1 <= question_num <= 3 else 'Design' if 4 <= question_num <= 6 else 'Business'

        # Prepare data for grading API call
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "Grade the following answer on a scale from 1 to 10:"},
                {"role": "user", "content": f"{answer['pillar']}: {answer['text']}"}
            ],
            "temperature": 0.7,
            "max_tokens": 1024
        }

        # Make the grading API call
        response = requests.post(endpoint, json=data, headers=headers)
        if response.status_code == 200:
            score_text = response.json()['choices'][0]['message']['content'].strip()
            try:
                score = float(score_text)
            except ValueError:
                continue  # Skip if score is not a number
            weighted_score = score * weightings[difficulty]
            scores[pillar] += weighted_score
        else:
            raise Exception(f"API request failed with status code {response.status_code}: {response.text}")

    # Normalize the scores to a maximum of 100 for each pillar
    for pillar in scores:
        scores[pillar] = (scores[pillar] / max_score_per_pillar) * 100

    return scores




# # def make_openai_request(prompt):
# #     print(f"\n\nHere's the prompt: {prompt}\n\n")

# #     api_key = os.getenv("OPEN_AI_API_KEY")
# #     if not api_key:
# #         raise ValueError("API key not found in .env file")

# #     endpoint = "https://api.openai.com/v1/chat/completions"

# #     headers = {
# #         "Authorization": f"Bearer {api_key}",
# #         "Content-Type": "application/json"
# #     }

# #     data = {
# #         "model": "gpt-3.5-turbo",
# #         "messages": [
# #             {"role": "system", "content": "Give a personalized recommendation to get into prdocut management based on the user's prompt. Don't make it in step-by-step form. Give only one recommendations that is 3 to 5 sentences long"},
# #             {"role": "user", "content": prompt}
# #             ]
# #     }

# #     response = requests.post(endpoint, json=data, headers=headers)

# #     if response.status_code == 200:
# #         return response.json()
# #     else:
# #         raise Exception(f"API request failed with status code {response.status_code}: {response.text}")


# def generate_assessment_questions(prompt):
#     api_key = os.getenv("OPEN_AI_API_KEY")
#     if not api_key:
#         raise ValueError("API key not found in .env file")

#     endpoint = "https://api.openai.com/v1/chat/completions"

#     headers = {
#         "Authorization": f"Bearer {api_key}",
#         "Content-Type": "application/json"
#     }

#     # Define prompts for generating questions for each pillar
#     # prompts = [
#     #     f"{prompt} - Generate an easy engineering question for product management.",
#     #     f"{prompt} - Generate a medium engineering question for product management.",
#     #     f"{prompt} - Generate a hard engineering question for product management.",
#         # f"{prompt} - Generate an easy design question for product management.",
#         # f"{prompt} - Generate a medium design question for product management.",
#         # f"{prompt} - Generate a hard design question for product management.",
#         # f"{prompt} - Generate an easy business question for product management.",
#         # f"{prompt} - Generate a medium business question for product management.",
#         # f"{prompt} - Generate a hard business question for product management."
#     # ]

#     verbose_prompt = """
#     Generate a list of nine questions for product management with the following rules. 
#     The first three questions should be easy, medium, and hard, respectively, and focus on engineering.
#     The second three questions should be easy, medium, and hard, respectively, and focus on design.
#     The third three questions should be easy, medium, and hard, respectively, and focus on business.
#     Please number each question with a number between 1 and 9. Label each question with its difficulty level and type (either design, engineering or business) too.
#     Please also factor in user's input to the questions generated.
#     """

#     generated_questions = []

#     # for prompt in prompts:
#     data = {
#         "model": "gpt-3.5-turbo",
#         "messages": [
#             {"role": "system", "content": verbose_prompt}
#         ]
#     }

#     response = requests.post(endpoint, json=data, headers=headers)

#     if response.status_code == 200:
#         result = response.json()
#         # Extract the generated question from the response
#         question = result['choices'][0]['message']['content']
#         # NOTE: Here, we want to extract each generated question from the response text and 
#         #       convert it to a list of strings.
#         generated_questions.append(question)
#     else:
#         raise Exception(f"API request failed with status code {response.status_code}: {response.text}")

#     # return generated_questions
#     return result


