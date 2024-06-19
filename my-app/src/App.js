import { useEffect, useState } from 'react';
import React from 'react';
import './App.scss';
import colorArray from './colorsArray';

const quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {  

  //colors Array
  const [accentColors, setAccentColors] = useState('#282c34');

  const [quotesArray, setQuotesArray] = useState(null);
 
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parse = await response.json()
    setQuotesArray(parse.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDB)
  }, [quoteDB])
  

  const [quote, setQuote] = useState("When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.");
  const [author, setAuthor] = useState("Helen Keller");

  const [randomNumber, setRandomNumber] = useState(0);
  
  const generateRandomNumber = () => {
   let randomInteger = Math.floor(quotesArray.length * Math.random());
   setRandomNumber(randomInteger);
   //colors
   setAccentColors(colorArray[randomInteger]);

   setQuote(quotesArray[randomInteger].quote);
   setAuthor(quotesArray[randomInteger].author);
  };

  const handleSetRandomNumber = () => {
    generateRandomNumber();
    // You can optionally update the state with the randomNumber here
    // setQuote(randomNumber.toString()); // Example usage
  };

  return (
    <div className="App">
      <header className="App-header" style={
        {backgroundColor: accentColors}
      }>
        <div id='quote-box' style={
          {color: accentColors}
        }>
          
          <h1>Random Number: {randomNumber}</h1>
          <p id='text'>"{quote}"</p>
          <p id='author'>- {author}</p>
          <div className='tweetButton'>
            <a id='tweet-quote' href='twitter.com/intent/tweet'>Tweet Quote</a>
          </div>
          <button id='new-quote' onClick={handleSetRandomNumber} style={
          {backgroundColor: accentColors}}>Generate a Random Quote</button>
                                
        </div>       
      </header>
    </div>
  );
}

export default App;

