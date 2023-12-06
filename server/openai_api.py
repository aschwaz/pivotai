import os
import requests
from dotenv import load_dotenv

load_dotenv()

def make_openai_request(prompt):
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
        "messages": [{"role": "system", "content": "You make a step by step plan for someone to transition into product management"},
                    {"role": "user", "content": prompt}]
    }

    response = requests.post(endpoint, json=data, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API request failed with status code {response.status_code}: {response.text}")

if __name__ == "__main__":
    prompt = input()
    result = make_openai_request(prompt)
    print(result)
