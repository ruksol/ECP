// // pages/Home.js
// import React from 'react';

// function Home() {
//   return (
//     <div id="home">
//       <h1>Welcome to the Ethiopian Construction Industry Portal</h1>
//       <p>This is the home page of the portal.</p>
//     </div>
//   );
// }

// export default Home;

// pages/Home.js
import React, { useState } from 'react';
import '../styles/Home.css';

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      quote: 'The portal helped us find new project opportunities efficiently. Highly recommended!'
    },
    {
      id: 2,
      name: 'Jane Smith',
      quote: 'Incredible resource for staying updated with industry news and regulations.'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How can I list my construction project on the portal?',
      answer: 'You can list your construction project by registering as a member and filling out the project submission form.'
    },
    {
      id: 2,
      question: 'Is there a membership fee to access the portal?',
      answer: 'No, membership to the Ethiopian Construction Industry Portal is free for all users.'
    },
    {
      id: 3,
      question: 'How often is the industry news updated?',
      answer: 'Industry news is updated daily to keep you informed about the latest developments.'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Alice Johnson',
      position: 'Founder & CEO',
      bio: 'Alice Johnson is the visionary leader behind the Ethiopian Construction Industry Portal, bringing years of experience in construction and technology.'
    },
    {
      id: 2,
      name: 'Bob Smith',
      position: 'Chief Technology Officer',
      bio: 'Bob Smith oversees the technical development of the portal, ensuring a seamless user experience and cutting-edge features.'
    },
    {
      id: 3,
      name: 'Eve Williams',
      position: 'Head of Operations',
      bio: 'Eve Williams manages day-to-day operations, ensuring that the portal runs smoothly and efficiently.'
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Ethiopian Construction Industry Portal</h1>
        <p>Connecting you to the future of construction in Ethiopia</p>
      </header>
      <section className="home-section">
        <div className="section-content about-us">
          <h2>About Us</h2>
          <p>
            The Ethiopian Construction Industry Portal aims to centralize information, connect stakeholders, and drive innovation in construction across Ethiopia.
          </p>
          <div className="features">
            <h2>Key Features</h2>
            <ul>
              <li>Directory of construction companies, contractors, and suppliers</li>
              <li>Tender portal for searching, applying, and bidding on construction projects</li>
              <li>Industry news, market analysis, and research reports</li>
              <li>Guides, tools, and calculators for construction project management</li>
            </ul>
          </div>
        </div>
        <div className="testimonials">
          <h2>What Users Are Saying</h2>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="testimonial-quote">{testimonial.quote}</p>
              <p className="testimonial-author">- {testimonial.name}</p>
            </div>
          ))}
        </div>
        <div className="team">
          <h2>Our Team</h2>
          <div className="team-member-card">
            {teamMembers.map(member => (
              <div key={member.id} className="team-member-item">
                <h3>{member.name}</h3>
                <p>{member.position}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-card">
            {faqs.map(faq => (
              <div key={faq.id} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="contact">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div>
              <label htmlFor="name" className="contact-form-label">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="contact-form-input" />
            </div>
            <div>
              <label htmlFor="email" className="contact-form-label">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="contact-form-input" />
            </div>
            <div>
              <label htmlFor="message" className="contact-form-label">Message</label>
              <textarea id="message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required className="contact-form-textarea"></textarea>
            </div>
            <button type="submit" className="contact-form-button">Submit</button>
          </form>
        </div>
      </section>
      <footer className="home-footer">
        <p>&copy; 2024 Ethiopian Construction Industry Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
