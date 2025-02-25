# **DATA-MATCH**
Data-Match is the winning project of the Datathon FME 2024 AED Challenge, aimed at simplifying the process of team formation.


<p align="center" >
  <img src="https://cdn.dorahacks.io/static/files/19339be04057f7c2ad9066e4d4eae613.png" alt="Landing Page" width="100%">
</p>


# INTRODUCTION 🌍
Our tool uses basic Machine Learning techniques to match participants based on their skills, preferences, and compatibility, and it is designed to ensure that everyone has an enjoyable and productive experience during the Datathon.

The platform includes three main components:

- User-Friendly Form: Collects relevant participant data efficiently.
- Simple Matching Algorithm: Groups participants into compatible teams.
- Chatbot Assistant: Provides insights into team recommendations and answers user questions.

---

## EXECUTION 🧩

- Create: .env file with a groq LLAMA_APY_KEY
- Execute: content_based.py
- Open: /web/index.html

---

# THE DATASET 💾
Taking a look at the user database and applying **Dimensionality Reduction** techniques *(PCA)*, we can observe various user clusters. We can see that the individuals that are recommended by our system are from the same cluster as the original user, allowing us to see that they are similar users. 

<p align="center" >
  <img src="https://cdn.dorahacks.io/static/files/19339c429a47203ef3f28ac4f8380443.png" alt="Landing Page" width="100%">
</p>

Our tool also recommends groups of friends that have already applied together, where we can see that the user still matches with teammates from the same cluster.

<p align="center" >
  <img src="/img/visualizacion_equipos.png" alt="Landing Page" width="100%">
</p>

We can also take a look at the **Variance** of the users that our system recommends. As we can see on the folowing chart, the variances are very low, indicating that the users are, indeed, **very close** to each other. 

<p align="center" >
  <img src="https://cdn.dorahacks.io/static/files/19339ca30482a23cb9ef7ed4de78277a.png" alt="Landing Page" width="100%">
</p>

---

# THE MATCHING SYSTEM ✨
First, we process the data from the user database, selecting the most relevant variables based on match compatibility. Next, we standardize all the data to ensure that all values fall within the range of 0 to 1, balancing the weights across the variables. 

Once the data is standardized, we group users into teams, taking into account that some users have applied with friends. We then apply the cosine similarity function to analyze the distances between users in a multidimensional space using the content based filtering algorithm. Users are ranked by proximity, and we select a group of four suitable members. Additionally, we create a backup pool of similar users who can be considered if the initial match is unsuccessful.

---

# THE USER INTERFACE 💻
We’ve designed a **modern**, **intuitive** user interface with a strong focus on ease of use. 

To start, we’ve developed a **participant dashboard** that showcases relevant information, such as upcoming events, ensuring users have quick and easy access to key details.

<p align="center" >
  <img src="https://cdn.dorahacks.io/static/files/193399df869c32a5d0947be45c9bc3c8.png" alt="Landing Page" width="100%">
</p>


The registration form has been carefully structured to gather a large amount of relevant data while minimizing complexity. The form is divided into sections, making it easier and less time-consuming to complete. 

<p align="center" >
  <img src="https://cdn.dorahacks.io/static/files/19339a157b84b5657235cbe4992ae128.png" alt="Landing Page" width="100%">
</p>

Once registered, our **ML** matching system analyzes the data to identify the best team combinations, presenting the results to the user. 

<p align="center" >
  <img src="https://cdn.dorahacks.io/static/files/19339abc3abcc57955c64e4496db5c38.png" alt="Landing Page" width="100%">
</p>

Additionally, an **AI-Agent powered chatbot** is available to answer detailed questions about both individual participants and the team as a whole, ensuring transparency and explainability in our recommendations. 

<p align="center" >
  <img src="/img/foto1.png" alt="Landing Page" width="100%">
</p>

Users can save, swap, and adjust team members until they are satisfied.

<p align="center" >
  <img src="/img/foto2.png" alt="Landing Page" width="100%">
</p>

Once the perfect team is formed, joining is just a click away. 

<p align="center" >
  <img src="/img/foto3.png" alt="Landing Page" width="100%">
</p>

**Team building has never been simpler!** ☀️
