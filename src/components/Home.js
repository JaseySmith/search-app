import React from 'react';
import Background from './Background'

function Home() {
  return (
    <div>
        <div id="home" className="hero-section">
            <Background />
            <div className="container">
                <div className="hero-content">
                    <h1>Explore Scary Places Near You</h1>
                    <p className="hero-subtitle">Discover the world's largest database of haunted locations, abandoned places, and spine-chilling destinations</p>
                    <div className="hero-actions">
                        <a className="btn btn-primary" href="/Search">Start Exploring</a>
                        <a className="btn btn-secondary" href="#features">Learn More</a>
                    </div>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <section id="features" className="features-section">
            <div className="container">
                <h2>Why Choose Our Platform?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🗺️</div>
                        <h3>Interactive Maps</h3>
                        <p>Explore haunted locations with detailed interactive maps and satellite imagery</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Mobile Friendly</h3>
                        <p>Access our database anywhere with our fully responsive mobile interface</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌍</div>
                        <h3>Largest Database</h3>
                        <p>Access thousands of haunted locations worldwide, from famous landmarks to hidden gems</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📖</div>
                        <h3>Rich History</h3>
                        <p>Learn the dark history and stories behind each haunted location</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Advanced Search</h3>
                        <p>Filter by distance, type, and paranormal activity level to find exactly what you're looking for</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
            <div className="container">
                <h2>What Our Explorers Say</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-content">
                            <p>"This app helped me discover the most terrifying abandoned asylum just 20 minutes from my house. The detailed history was incredible!"</p>
                        </div>
                        <div className="testimonial-author">
                            <strong>Sarah M.</strong>
                            <span>Paranormal Enthusiast</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-content">
                            <p>"The interactive maps are amazing! I've planned entire road trips using this platform. Highly recommend for any horror fan."</p>
                        </div>
                        <div className="testimonial-author">
                            <strong>Mike R.</strong>
                            <span>Horror Blogger</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-content">
                            <p>"The community aspect is incredible! I've discovered so many hidden gems through other explorers' recommendations and shared experiences."</p>
                        </div>
                        <div className="testimonial-author">
                            <strong>Emma L.</strong>
                            <span>Ghost Hunter</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <h2>Ready to Explore the Unknown?</h2>
                    <p>Join thousands of brave explorers discovering the world's most haunted places</p>
                    <a className="btn btn-primary btn-large" href="/Search">Start Your Journey</a>
                </div>
            </div>
        </section>
    </div>
  );
}

export default Home;