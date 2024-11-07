import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const myForm = event.target;
    const formData = new FormData(myForm);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        alert("Thank you! Your message has been recieved.");
        myForm.reset();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
        <Header />
        <div id="contact">
            <h2>Contact Us</h2>
            <p className="text">We're delighted to hear from you. Please don't hesitate to reach out with any inquiries.</p>
            <form name="contact" method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact"></input>
                <div className="flex">
                  <input type="text" id="name" name="name" placeholder="Name" pattern="[A-Za-z ]+" title="Only letters are allowed" required></input>
                  <input type="text" id="email" name="email" placeholder="Enter email" required></input>
                </div>
                <textarea name="message" id="message" placeholder="How can we help?"></textarea>
                <button className="btn" type="submit" name="submit" value="Send Message">Send Message</button>
            </form>
        </div>
        <Footer />
    </div>
  );
}

export default Contact;