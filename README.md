# 📱 Mobile Store - A Small E-Commerce Website with a Smart Chatbot 🤖

**Mobile Store** is a small-scale e-commerce website integrated with an intelligent chatbot that helps users quickly get answers to their product-related questions. The chatbot is built using a **Deep Neural Network (DNN)** model, and its accuracy depends on the diversity and clarity of the training dataset.

---

## 🚀 Setup & Run Guide

### 🛠️ Prerequisites

- Python 3.8+
- Node.js and npm
- Any modern web browser (Chrome, Firefox, etc.)

---

## ✅ Installation Steps

### 🔹 Step 1: Train the Chatbot Model

Run the following command in your terminal:

```bash
python mobile_store_project/backend/model_training.py
```

This script will train the DNN model for the chatbot.

➡️ **Note:** After training is completed, comment out the following two lines in the `model_training.py` file to avoid retraining every time:

```python
# model.fit(train_x, train_y, n_epoch=500, batch_size=3, show_metric=True)
# model.save("mobile_store_project/backend/model.tflearn")
```

---

### 🔹 Step 2: Start the Backend (API Server)

```bash
python mobile_store_project/backend/fetchAPI.py
```

---

### 🔹 Step 3: Install and Run the Frontend

```bash
cd mobile_store_project

# Install required packages (run only once)
npm install

# Run the website in development mode
npm run dev
```

---

## 🐞 Facing Issues?

🔧 Don’t worry! Check out the **FixBug.md** file for solutions to common setup and runtime problems.

---

## 📬 Thank You for Using Mobile Store!

If you find this project useful, give it a ⭐ on GitHub or feel free to contribute your ideas!

👉 **Note:** This project connects to MongoDB to support the training process. You can use the connection string below to explore the database structure for this small project:

```
mongodb+srv://lehaiduong:Duong12345@atlascluster.wuubbjn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster
```
