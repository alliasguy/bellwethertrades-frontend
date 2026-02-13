import React from 'react'
import Header from '../components/Header/Header'
import About from '../components/about/About'
import Footer from '../components/footer/Footer'
import Contact from '../components/contact/Contact'
const Policy = () => {
  return (
    <>

      <main className='policy-landpage'>
        <Header />

        <div className="policy-container">
          <div className="policy-text-container">
            <h2>Our Policy</h2>
            <p>
              Our company understands the importance of personal information of every participant. Cooperating with our company, you can be sure in privacy of your personal information and in its protection by our employees. Our employees protect the collected by them information from unauthorized access. We use a variety of technologies to reduce the risk of theft of accounts and receiving personal information of our investors.
            </p>

            <h3>"Personal information" includes such items as:</h3>
            <p>
              Name and Last Name of the investor
            </p>
            <p>
              Email of investor
            </p>
            <p>Contact address of investor</p>
            <p>
              Our company collects your personal information only with your consent and confidence in the security of your personal information on our project. Users should note, that the collection of personal information is only from adult. The rules of our company explain, how your information is collected and used. These rules apply only in our website. Information which is collected when you visit this site. This types of information are also the part of the personal information. Customer information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason whatsoever, without the consent of the customer, other than for the express purpose of delivering the purchased product or service requested by the customer. For your safety and protection, your credit card information is not stored on our servers. Our payment gateway provider, (insert providers name/s here), keeps this information encrypted and secure on your behalf. The email address you provide for order processing, may be used to send you information and updates pertaining to your account, in addition to periodic company news, updates, and/or related product or service information, etc. If you decide to opt-in to our mailing list, you will receive emails that may include company news, updates, related product or service information, promotions, etc. However, you may opt-out at any time by (please enter the opt-out or unsubscribe process here. This may be something like clicking the unsubscribe button at the bottom of your emails.
            </p>
            <h3>Information Storage</h3>
            <p>
              Saving of information is only in our company or its equipment. Personal information is stored in accordance with the rules of storage and disposal, which are set for archive of our company. To receive your personal information, contact direct with our employees.
            </p>
            <h3>
              Contact Information

            </h3>
            <p>
              bellwethertrades is glad to receive your comments concerning this "Privacy Policy". In case you think that bellwethertrades does not follow the rules and violate this Statement, contact us at bellwethertradesx@gmail.com We guarantee that we will take commercially reasonable efforts to discover and solve the problem.
            </p>
          </div>
        </div>
        <About />
        <Contact />

      </main>
      <Footer />
    </>
  )
}

export default Policy