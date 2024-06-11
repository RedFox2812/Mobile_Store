import React, { useEffect } from "react";

const ChatPage = () => {
  function sendMessage() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value.trim();
    if (message) {
      fetch(
        `http://127.0.0.1:5000/execute_python_function?input=chatbot&data=${message}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const result = data["result"];
          console.log(result);
          const userMessage = document.createElement("div");
          userMessage.classList.add("chat-message", "user");
          userMessage.textContent = message;
          chatBody.appendChild(userMessage);
          // Simulate bot response
          const botMessage = document.createElement("div");
          botMessage.classList.add("chat-message", "bot");
          botMessage.textContent = "Mobile_store: " + result.response;
          chatBody.appendChild(botMessage);

          chatInput.value = "";
          chatBody.scrollTop = chatBody.scrollHeight;
        })
        .catch((error) =>
          console.error("There was a problem with the fetch operation:", error)
        );
    }
  }

  useEffect(() => {
    document
      .getElementById("chat-input")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          sendMessage();
        }
      });
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Tư Vấn</div>
      <div className="chat-body" id="chat-body"></div>
      <div className="chat-footer">
        <input type="text" id="chat-input" placeholder="Type a message..." />
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
