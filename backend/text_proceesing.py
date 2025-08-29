from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import re
from tensorflow.keras.preprocessing.text import one_hot
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

stopword = set(stopwords.words("english"))
ps = PorterStemmer()
voc_size =500

def clean_text_list(text):
    text = str(text)
    review = re.sub("[^a-zA-Z0-9]", " ", text)
    review = review.lower()
    review = review.split()


    words = [ps.stem(word) for word in review if word not in stopword]
    cleaned = " ".join(words)

   
    onehot_repo = [one_hot(word, voc_size) for word in cleaned.split()]

   
    emb_doc = pad_sequences([onehot_repo], maxlen=900, padding="pre")

    return np.array(emb_doc)
