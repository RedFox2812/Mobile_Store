/* eslint-disable react/prop-types */
// import React, { useEffect } from "react";

import { useEffect } from "react";
import setShowChat from "../page/HomePage";
const ChatPage = (props) => {
  function sendMessage() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value;
    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user");
    userMessage.textContent = message;
    chatBody.appendChild(userMessage);

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
          const result = data.result;
          console.log(result);

          // Simulate bot response
          const botMessage = document.createElement("div");
          botMessage.classList.add("chat-message", "bot");
          botMessage.textContent = "DDA Store: " + result;
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
    <>
      <div className={`chat-container ${props.show ? "" : "hidden"}`}>
        <div className="chat-header">
          <p>Chat Tư Vấn</p>
          <i
            className="fa-solid fa-x"
            id="btn-close-chat"
            onClick={() => {
              setShowChat(false);
            }}
          ></i>
        </div>
        <div className="chat-body" id="chat-body">
          <div className="chat-message bot">
            DDA Store: Xin chào, tôi là bot chat của DDA Store
          </div>
        </div>
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
    </>
  );
};

export default ChatPage;
