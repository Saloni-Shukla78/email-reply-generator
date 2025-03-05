from flask import Flask,request,jsonify
from transformers import pipeline
import atexit

app=Flask(__name__)

print ("Loading model...")

#tone detection model
tone_detector=pipeline("text-classification",model="SamLowe/roberta-base-go_emotions")

#email-reply generator model
# reply_generator=pipeline("text-generation",model="google/flan-t5-large",max_length=200)
# reply_generator = pipeline("text2text-generation", model="google/flan-t5-base", max_length=300)
reply_generator = pipeline(
    "text2text-generation",model="google/flan-t5-large",max_length=200,
    repetition_penalty=1.2,  # Helps prevent repeating phrases
    temperature=0.7,          # Makes responses more natural
    top_k=50,                 # Picks from top 50 words (reduces randomness)
    top_p=0.9                 # Nucleus sampling (avoids repetitive output)
)


print ("Model loaded")

# Tone Mapping based on detected labels
TONE_MAPPING = {
    "admiration": "Professional",
    "approval": "Professional",
    "amusement": "Funny",
    "gratitude": "Personal",
    "joy": "Personal",
    "anger": "Angry",
    "disappointment": "Neutral",
    "neutral": "Neutral",
    "sadness": "Apologetic",
    "optimism": "Encouraging"
}
def detect_tone(email_text):
    """Detect the tone of the email text."""
    result = tone_detector(email_text)
    print("Tone Detection Raw Output:", result)  # Debugging Output

    if not result or "label" not in result[0]:  # Check if result is valid
        return "Neutral"

    label = result[0]['label']
    detected_tone = TONE_MAPPING.get(label, "Neutral")
    print("Mapped Tone:", detected_tone)  # Debugging Output
    return detected_tone




def generate_reply(email_text, tone):
    prompt = (
        f"You are an AI assistant specialized in writing email replies. "
        f"Write a {tone.lower()} response that is polite, professional, and well-structured. "
        f"Ensure that your response directly addresses the sender's message.\n\n"
        f"Original Email:\n{email_text}\n\n"
        f"Your Reply:"
    )


    print("Generated Prompt for Model:\n", prompt)  # Debugging Output

    response = reply_generator(
        prompt, 
        max_length=200, 
        do_sample=True,  #  Enable sampling to use temperature & top_p
        temperature=0.7,  #  Controls randomness (higher = more diverse replies)
        top_k=50,  #  Filters to top 50 most probable next words
        top_p=0.9,  #  Nucleus sampling (only picks from most likely tokens)
        repetition_penalty=1.2  #  Avoids repetitive output
    )

    print("Model Raw Output:", response)  # Debugging Output

    return response[0]['generated_text']


@app.route("/generate-reply", methods=["POST"])

def reply_email():
    """API endpoint to process the email and return a reply."""
    data = request.get_json()
    email_text = data.get("email_text", "")

    if not email_text:
        return jsonify({"error": "No email text provided"}), 400

    # Detect tone
    tone = detect_tone(email_text)

    # Generate reply
    reply = generate_reply(email_text, tone)

    return jsonify({
        "detected_tone": tone,
        "reply": reply
    })

    # Cleanup function to run when the app exits
def cleanup():
    print("Cleaning up resources...")

atexit.register(cleanup)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=False)  