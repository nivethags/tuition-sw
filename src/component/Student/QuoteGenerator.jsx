import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../style/QuoteGenerator.css';

const quotes = [
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Stay positive, work hard, make it happen.", author: "Unknown" }
];

const QuoteGenerator = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowQuote(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setShowQuote(true);
      }, 300);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote-container"> <div className="quote-card-wrapper">
        <AnimatePresence mode="wait">
          {showQuote && (
            <motion.div
              key={quoteIndex}
              className="quote-card"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="quote-mark">❝</span>
              <p className="quote-text">"{quotes[quoteIndex].text}"</p>
              <p className="quote-author">— {quotes[quoteIndex].author}</p>
              <span className="quote-mark right">❞</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      <div className="management-message">
        <h4 style={{fontSize:'17px'}}>ℹ️ Management Note</h4>
        <p style={{fontSize:'13px'}}>
          Please complete your attendance update by <strong>4:00 PM</strong>. Class schedule changes will be announced in your dashboard notifications.
        </p>
      </div>
    </div>
  );
};

export default QuoteGenerator;
