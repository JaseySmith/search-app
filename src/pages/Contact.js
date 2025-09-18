import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faInstagram as faInstagramBrand } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
  
    const myForm = event.target;
    const formData = new FormData(myForm);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      
      setSubmitStatus('success');
      myForm.reset();
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
        <Header />
        <div id="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get In Touch</h1>
                    <p className="contact-subtitle">Have questions about haunted locations? Want to share your own paranormal experiences? We'd love to hear from you.</p>
                </div>
                
                <div className="contact-form-container">
                    <div className="form-header">
                        <h2>Send us a Message</h2>
                        <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>
                    
                    <form name="contact" method="post" onSubmit={handleSubmit} className="contact-form">
                        <input type="hidden" name="form-name" value="contact" />
                        
                        <div className="form-row">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="Your Name" 
                                    pattern="[A-Za-z ]+" 
                                    title="Only letters are allowed" 
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Your Email" 
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <textarea 
                                name="message" 
                                id="message" 
                                placeholder="Tell us about your paranormal experience or ask us anything..."
                                rows="6"
                                required
                            ></textarea>
                        </div>
                        
                        <button 
                            className="btn btn-primary submit-btn" 
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />
                                    Send Message
                                </>
                            )}
                        </button>
                        
                        {submitStatus === 'success' && (
                            <div className="form-status success">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>Thank you! Your message has been received. We'll get back to you soon.</span>
                            </div>
                        )}
                        
                        {submitStatus === 'error' && (
                            <div className="form-status error">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>Sorry, there was an error sending your message. Please try again.</span>
                            </div>
                        )}
                    </form>
                </div>
                
                <div className="contact-links">
                    <div className="contact-link">
                        <div className="link-icon instagram">
                            <FontAwesomeIcon icon={faInstagramBrand} />
                        </div>
                        <div className="link-content">
                            <h3>Follow Us</h3>
                            <p>@hauntedplaces</p>
                            <span>Share your paranormal experiences</span>
                        </div>
                    </div>
                    
                    <div className="contact-link">
                        <div className="link-icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <div className="link-content">
                            <h3>Report a Location</h3>
                            <p>reports@hauntedplaces.com</p>
                            <span>Submit new haunted locations</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Contact;