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
    prompts = [
        f"{prompt} - Generate an easy engineering question.",
        f"{prompt} - Generate a medium engineering question.",
        f"{prompt} - Generate a hard engineering question.",
        f"{prompt} - Generate an easy design question.",
        f"{prompt} - Generate a medium design question.",
        f"{prompt} - Generate a hard design question.",
        f"{prompt} - Generate an easy business question.",
        f"{prompt} - Generate a medium business question.",
        f"{prompt} - Generate a hard business question."
    ]

    generated_questions = []

    for prompt in prompts:
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": prompt}
            ]
        }

        response = requests.post(endpoint, json=data, headers=headers)

        if response.status_code == 200:
            result = response.json()
            # Extract the generated question from the response
            question = result['choices'][0]['message']['content']
            generated_questions.append(question)
        else:
            raise Exception(f"API request failed with status code {response.status_code}: {response.text}")

    return generated_questions


