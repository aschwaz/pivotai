import os
import requests
from dotenv import load_dotenv

load_dotenv()

def make_openai_request(prompt):
    print(f"\n\nHere's the prompt: {prompt}\n\n")

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
            {"role": "system", "content": "Give a personalized recommendation to get into prdocut management based on the user's prompt. Don't make it in step-by-step form. Give only one recommendations that is 3 to 5 sentences long"},
            {"role": "user", "content": prompt}
            ]
    }

    response = requests.post(endpoint, json=data, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API request failed with status code {response.status_code}: {response.text}")


def generate_assessment_questions(prompt):
    api_key = os.getenv("OPEN_AI_API_KEY")
    if not api_key:
        raise ValueError("API key not found in .env file")

    endpoint = "https://api.openai.com/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    # Define prompts for generating questions for each pillar
    # prompts = [
    #     f"{prompt} - Generate an easy engineering question for product management.",
    #     f"{prompt} - Generate a medium engineering question for product management.",
    #     f"{prompt} - Generate a hard engineering question for product management.",
        # f"{prompt} - Generate an easy design question for product management.",
        # f"{prompt} - Generate a medium design question for product management.",
        # f"{prompt} - Generate a hard design question for product management.",
        # f"{prompt} - Generate an easy business question for product management.",
        # f"{prompt} - Generate a medium business question for product management.",
        # f"{prompt} - Generate a hard business question for product management."
    # ]

    verbose_prompt = """
    Generate a list of nine questions for product management with the following rules. 
    The first three questions should be easy, medium, and hard, respectively, and focus on engineering.
    The second three questions should be easy, medium, and hard, respectively, and focus on design.
    The third three questions should be easy, medium, and hard, respectively, and focus on business.
    Please number each question with a number between 1 and 9. Label each question with its difficulty level and type (either design, engineering or business) too.
    Please also factor in user's input to the questions generated.
    """

    generated_questions = []

    # for prompt in prompts:
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": verbose_prompt}
        ]
    }

    response = requests.post(endpoint, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        # Extract the generated question from the response
        question = result['choices'][0]['message']['content']
        # NOTE: Here, we want to extract each generated question from the response text and 
        #       convert it to a list of strings.
        generated_questions.append(question)
    else:
        raise Exception(f"API request failed with status code {response.status_code}: {response.text}")

    # return generated_questions
    return result


