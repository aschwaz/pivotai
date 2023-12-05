# api_request.py

import os
import requests
from dotenv import load_dotenv

load_dotenv()

def make_openai_request(prompt):
    api_key = os.getenv("OPEN_AI_API_KEY")
    if not api_key:
        raise ValueError("API key not found in .env file")
    
    assistant_id = os.getenv("OPEN_AI_ASSISTANT_ID")

    endpoint = f"https://api.openai.com/v1/engines/gpt-3.5-turbo/completions"  # Use davinci-codex for assistant

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "prompt": prompt,
        "assistant": assistant_id  # Specify the assistant ID here
    }

    response = requests.post(endpoint, json=data, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API request failed with status code {response.status_code}: {response.text}")

if __name__ == "__main__":
    prompt = "Your prompt here"
    result = make_openai_request(prompt)
    print(result)
