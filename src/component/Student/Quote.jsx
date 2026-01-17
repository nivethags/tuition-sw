import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../style/QuoteGenerator.css';

const colors = [
  '#490A3D', '#BD1550', '#E97F02', '#F8CA00', '#8A9B0F', '#69D2E7',
  '#FA6900', '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c',
  '#9b59b6', '#FB6964', '#342224', '#472E32', '#77B1A9', '#73A857'
];

const quotes = [
  ["You only live once, but if you do it right, once is enough.", "Mae West"],
  ["I am so clever that sometimes I don't understand a single word of what I am saying.", "Oscar Wilde"],
  ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", "Albert Einstein"],
  ["The most beautiful experience we can have is the mysterious.", "Albert Einstein"],
  ["It is our choices that show what we truly are, far more than our abilities.", "J.K. Rowling"],
  ["All men who have turned out worth anything have had the chief hand in their own education.", "Walter Scott"],
  ["Trust yourself. You know more than you think you do.", "Benjamin Spock"],
  ["No one can make you feel inferior without your consent.", "Eleanor Roosevelt"],
  ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson"],
  ["Explore. Dream. Discover.", "H. Jackson Brown Jr."]
];

const QuoteGenerator = () => {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(colors[0]);

  const generateNewQuote = () => {
    const newIndex = Math.floor(Math.random() * quotes.length);
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setIndex(newIndex);
    setColor(newColor);
  };

  useEffect(() => {
    generateNewQuote();
  }, []);

  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quotes[index][0]}" - ${quotes[index][1]}`
  )}`;

  return (
    <div className="container" style={{ backgroundColor: color, color: color }}>
      <div className="quotebox">
        <blockquote style={{ borderLeftColor: color }}>
          <i className="fa fa-quote-left quotemark"></i>
          <h2 id="quotetext" style={{ opacity: 1 }}>{quotes[index][0]}</h2>
          <footer id="quotesource" style={{ color }}>{quotes[index][1]}</footer>
        </blockquote>
        <div className="row">
          <div className="social-icons icon-rounded">
            <a href={tweetURL} target="_blank" rel="noopener noreferrer" title="Tweet this quote!">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
          <div className="quotebutton">
            <button className="btn btn-primary" onClick={generateNewQuote}>New Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
