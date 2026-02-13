import React from 'react'
import './faq.css'
import { useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'
const Faq = () => {
    const [faqs, setFaqs] = useState([
        {
            id: 1,
            active: true,
            question: 'What is BELLWETHERTRADES?',
            answer: "BellwetherTrades is a professional copytrading platform that allows users to mirror real-time trades from seasoned, expert traders. It gives you access to global financial markets—like forex, stocks, indices, and crypto—using proven strategies such as scalping, swing trading, and trend following. It's a smart way to grow your portfolio without having to trade manually."
        },
        {
            id: 2,
            active: false,
            question: 'Where does the copytrading activity go into?',
            answer: "All trading activity on BellwetherTrades is executed by experienced traders in high-liquidity markets such as forex, cryptocurrencies, stock CFDs, and major indices. These markets are carefully selected for their volatility, trading volume, and potential for consistent profits. Our traders utilize advanced technical and fundamental analysis to generate steady returns."
        },
        {
            id: 3,
            active: false,
            question: 'What are the advantages of joining this platform?',
            answer: "When you join BellwetherTrades, your trades are automatically handled by trading professionals with years of real-market experience. They analyze trends, identify entry/exit points, and execute trades using strategies tailored to current market conditions. You gain all the benefits of expert-level trading without needing to lift a finger."
        },
        {
            id: 4,
            active: false,
            question: 'How do I withdraw my profit?',
            answer: "Withdrawing your profit is fast and user-friendly. Simply go to the withdrawal page, choose your preferred method, input the amount, paste your wallet address, and submit. Your wallet will be credited within approximately 30 minutes. Supported withdrawal methods include BTC, USDT, ETH, SOLANA, XRP, and DOGECOIN."
        },
        {
            id: 5,
            active: false,
            question: 'What cryptocurrencies can I use?',
            answer: "BellwetherTrades supports a variety of cryptocurrencies for deposits and withdrawals, including Bitcoin (BTC), Tether (USDT), Ethereum (ETH), Solana (SOL), Ripple (XRP), and Dogecoin (DOGE). More options will be added soon to serve you better."
        }

    ])

    const dropDown = (id) => {
        setFaqs(
            faqs.map(faq => faq.id === id ? { ...faq, active: !faq.active } : { ...faq, active: false }))
        console.log(faqs)
    }
    return (
        <div className='faq-section' id='faq'>
            <div className="faq-wrapper">
                <div className="why-choose-us-text-container faq-p">
                    <div className="header" data-aos="fade-up">
                        <span className="header-line"></span>
                        <h2>faq</h2>
                    </div>
                    <h1 data-aos="fade-up">frequently asked questions</h1>
                    {/* <p data-aos="fade-up">
                We’ve provided some information about BELLWETHERTRADES, BELLWETHERTRADES Plans, cryptocurrencies, and few other common questions you might want to ask. If you have any other questions, contact our live support system or email address.
                </p> */}
                </div>
            </div>
            <div className="faq-container">
                {
                    faqs.map(faq =>
                        <div className="faq-card" key={faq.id} data-aos="fade-up">
                            <div className="question-tab">
                                <h2>{`${faq.question}`}</h2>
                                <span className={`dropdown-btn ${faq.active && 'rotate'}`} onClick={() => {
                                    dropDown(faq.id)
                                }}>
                                    <HiOutlineChevronDown />
                                </span>
                            </div>

                            <div className={`answer-tab ${faq.active && 'drop'}`}>
                                <p>{faq.answer}</p>
                            </div>

                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Faq