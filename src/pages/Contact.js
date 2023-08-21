import React from 'react';
import { useState } from "react";
import Header from '../components/Header';

function Contact() {
  const [status, setStatus] = useState("Send Message");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Send Message");
    let result = await response.json();
    alert(result.status);
  };

  return (
    <div>
        <Header />
        <div id="contact">
            <h2>Contact Us</h2>
            <p className="text">Sed malesuada libero vel nulla eleifend gravida. Integer vitae tellus eros.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" placeholder="Name"></input>
                <input type="text" id="email" name="email" placeholder="Enter email"></input>
                <textarea name="message" id="message" placeholder="How may I help?"></textarea>
                <button className="btn" type="submit" name="submit" value="Send Message">{status}</button>
            </form>
        </div>
    </div>
  );
}

export default Contact;