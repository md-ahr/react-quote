import { useState, useEffect } from 'react';
import './App.scss';

function App() {

  const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99', '#77B1A9', '#73A857'];

  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({});
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    async function getQuotes() {
      const data = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      const qt = await data.json();
      setQuotes([...qt.quotes]);
      setQuote(qt.quotes[0]);
    }
    getQuotes();
  }, []);

  const changeQuote = () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const colorIndex = Math.floor(Math.random() * colors.length);
    setQuote(quotes[quoteIndex]);
    setColor(colors[colorIndex]);
  };

  return (
    <div id="wrapper" style={{ backgroundColor: color }}>
      <div id="quote-box" className="card text-center">
        <h1 id="text" className="mb-0" style={{ color: color }}>
          <i className="fas fa-quote-left me-2"></i>{quote.quote}
        </h1>
        <p id="author" className="text-end mb-0 mt-4" style={{ color: color }}>- {quote.author}</p>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <a href="https://twitter.com/intent/tweet" target="_top" id="tweet-quote"><i className="fab fa-twitter" style={{ backgroundColor: color }}></i></a>
          <button type="button" id="new-quote" className="btn btn-quote" onClick={changeQuote} style={{ backgroundColor: color }}>New Quote</button>
        </div>
      </div>
    </div>
  );

}

export default App;
