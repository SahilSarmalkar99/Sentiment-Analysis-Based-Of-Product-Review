from flask import Flask , jsonify , request
from flask_cors import CORS
from tensorflow.keras.models import load_model
from text_proceesing import clean_text_list

model = load_model("model/sentiment_model.h5")

app = Flask(__name__)
CORS(app)

@app.route("/api", methods=["POST"])
def api():
    data = request.get_json()
    text = data.get("review")

    # preprocess
    x = clean_text_list(text)

    # prediction
    predict = model.predict(x)
    score = float(predict[0][0])   

    # decision
    label = "Positive Review" if score >= 0.5 else "Negative Review"

    return jsonify({
        "message": label,
        "score": score 
    })


if __name__ == "__main__":
    app.run(debug=True)