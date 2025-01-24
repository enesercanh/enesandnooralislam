import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5HIRZMuegsvK48qkiCCQo_AfRuSfHTR0",
  authDomain: "enesandnoor.firebaseapp.com",
  projectId: "enesandnoor",
  storageBucket: "enesandnoor.firebasestorage.app",
  messagingSenderId: "612884012943",
  appId: "1:612884012943:web:566ca677c85340682e35fa",
  measurementId: "G-FJWE6YSH82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to Firestore collection
const messagesRef = collection(db, "messages");

// Function to display messages
function displayMessage(message) {
  const messagesContainer = document.getElementById("messagesContainer");
  const messageElement = document.createElement("div");
  messageElement.textContent = `${message.username}: ${message.text}`;
  messagesContainer.appendChild(messageElement);
}

// Fetch and display messages
function loadMessages() {
  const q = query(messagesRef, orderBy("timestamp"));
  onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    messages.forEach(displayMessage);
  });
}

// Send new message
async function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const messageText = messageInput.value.trim();

  if (messageText) {
    const message = {
      username: "Enes", // You can customize the username here
      text: messageText,
      timestamp: new Date()
    };

    try {
      await addDoc(messagesRef, message);
      messageInput.value = ""; // Clear input
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

// Event listener for the send button
document.getElementById("sendMessageButton").addEventListener("click", sendMessage);

// Load messages on page load
loadMessages();
