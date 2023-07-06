from flask import Flask
from pymongo import MongoClient
import openai
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.
openai.api_key = os.getenv('OPENAI_KEY')

# Fill in your OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client['your_database']  # replace with your database name
collection = db['your_collection']  # replace with your collection name

class Code(Resource):
    def get(self):
        # Find the code snippets in the database (replace this with your actual query)
        document = collection.find_one()

        # Send the correct and incorrect code to ChatGPT to generate a hint
        prompt = f"The correct code is:\n{document['correct_code']}\nThe incorrect code is:\n{document['incorrect_code']}\nCan you give a hint on how to fix the incorrect code?"
        response = openai.Completion.create(engine="text-davinci-002", prompt=prompt, max_tokens=60)

        # Extract the hint from the GPT-3 response
        hint = response.choices[0].text.strip()

        # Return the hint and code snippets in the response
        return {
            'correct_code': document['correct_code'],
            'incorrect_code': document['incorrect_code'],
            'hint': hint,
        }

if __name__ == '__main__':
    app.run(debug=True)
