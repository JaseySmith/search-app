import React, { useEffect, useState } from 'react';

const Overlay = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  // Form submission logic
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
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className="overlay"
    >
      <form onSubmit={handleSubmit}>
        <input type="text" id="name" name="name" placeholder="Name"></input>
        <input type="text" id="email" name="email" placeholder="Enter email"></input>
        <textarea name="message" id="message" placeholder="How may I help?"></textarea>
        <button className="btn" type="submit" name="submit" value="Send Message">{status}</button>
      </form>
      <span className="x" onClick={closeHandler}>
          &times;
      </span>
    </div>
  );
};

export default Overlay;