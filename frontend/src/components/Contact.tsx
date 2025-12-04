import React, { useEffect, useState } from 'react';
import './Contact.css';

interface ContactInfo {
  instagram: string;
  instagramUrl: string;
  email: string;
  phone: string;
  address: string;
  addressEn: string;
}

/**
 * Contact Component
 * Displays contact information and social media links
 */
const Contact: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/info');
        const data = await response.json();
        setContactInfo(data.contact);
      } catch (error) {
        console.error('Error fetching contact info:', error);
        // Fallback data
        setContactInfo({
          instagram: '@saejaedang',
          instagramUrl: 'https://www.instagram.com/saejaedang/',
          email: 'info@saejaedang.com',
          phone: '+82-2-1234-5678',
          address: '서울특별시 강남구',
          addressEn: 'Gangnam-gu, Seoul, South Korea'
        });
      }
    };

    fetchContactInfo();
  }, []);

  if (!contactInfo) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="section-title">Visit Us</h2>
        <p className="section-subtitle">방문과 문의를 환영합니다</p>

        <div className="contact-content">
          {/* Contact Information Cards */}
          <div className="contact-cards">
            <div className="contact-card">
              <div className="card-icon">📍</div>
              <h3 className="card-title">Location</h3>
              <p className="card-text">{contactInfo.address}</p>
              <p className="card-text-en">{contactInfo.addressEn}</p>
            </div>

            <div className="contact-card">
              <div className="card-icon">📞</div>
              <h3 className="card-title">Phone</h3>
              <p className="card-text">
                <a href={`tel:${contactInfo.phone}`} className="contact-link">
                  {contactInfo.phone}
                </a>
              </p>
            </div>

            <div className="contact-card">
              <div className="card-icon">✉️</div>
              <h3 className="card-title">Email</h3>
              <p className="card-text">
                <a href={`mailto:${contactInfo.email}`} className="contact-link">
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="social-section">
            <h3 className="social-title">Follow Us</h3>
            <p className="social-description">
              인스타그램에서 새로운 제품과 소식을 만나보세요
            </p>
            <div className="social-links">
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button instagram"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>{contactInfo.instagram}</span>
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="hours-section">
            <h3 className="hours-title">Business Hours</h3>
            <div className="hours-list">
              <div className="hours-item">
                <span className="hours-day">평일 (Mon-Fri)</span>
                <span className="hours-time">09:00 - 20:00</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">주말 (Sat-Sun)</span>
                <span className="hours-time">10:00 - 21:00</span>
              </div>
              <div className="hours-item special">
                <span className="hours-day">공휴일 (Holidays)</span>
                <span className="hours-time">문의 바랍니다</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2024 새재당 (SaeJaeDang). All rights reserved.
        </p>
        <p className="footer-text-small">
          Made with ❤️ and traditional Korean baking techniques
        </p>
      </footer>
    </section>
  );
};

export default Contact;
