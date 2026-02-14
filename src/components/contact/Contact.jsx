import React from 'react'
import './contact.css'
import { FiMail } from 'react-icons/fi'
import { BsWhatsapp, BsYoutube, BsInstagram, BsTwitter } from 'react-icons/bs'

const Contact = () => {
    return (
        <section className='contact-section' id='contact'>
            <div className="contact-wrapper" data-aos="fade-up">
                <div className="section-header center-header" style={{ marginBottom: '0' }}>
                    <h2><span className="highlight-text">Contact Us</span></h2>
                    <p>Have questions? We're here to help.</p>
                </div>

                <h1 style={{ fontSize: '2rem', marginTop: '20px' }}>Keep in Touch</h1>
                <p>
                    Reach out to our support team for any inquiries regarding your account or trading activities.
                </p>

                <div className="contact-actions">
                    <a href='mailto:support@bellwethertrades.org' className="contact-btn">
                        <FiMail /> Email Support
                    </a>
                </div>


            </div>
        </section>
    )
}

export default Contact