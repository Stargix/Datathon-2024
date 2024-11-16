from participant import load_participants
from rich import print
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas
import json
from flask import Flask, jsonify, request

df = pd.read_excel('datathon_participants_processed.xlsx')
def info_group(user_profile):

    item_profiles = df.iloc[1:, 2:].values

    similarities = cosine_similarity([user_profile], item_profiles)
    recommended_items = list(enumerate(similarities[0]))
    recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)

    top_4_items = recommended_items[:4]

    top_4_items_ids = [df.iloc[recommended_items[i][0] + 1, 0] for i in range(5)]
    items_caracteristicas = []

    for x in top_4_items_ids:
        item_caracteristicas = caracteriasticas(x)
        items_caracteristicas.append(item_caracteristicas)
    items_caracteristicas_json = json.dumps(items_caracteristicas, ensure_ascii=False, indent=4)
    return items_caracteristicas_json


app = Flask(__name__)

@app.route('/recommendations', methods=['GET'])
def get_recommendations():

    # User preferences (JSON)
    user_json = request.args.get('user-data')

    df_new_user = pd.DataFrame(user_json)

    user_profile = df.iloc[0, 2:].values
    
    return jsonify(info_group(user_profile))

if __name__ == '__main__':
    app.run(debug=True)

