// https://quotes-react.netlify.app/

//get quotes from api
const quoteContainer = document.getElementById('container')

const quoteText = document.getElementById('quote')

const authorText = document.getElementById('author')

const twitterBtn = document.getElementById('twitter')

const newQuotebtn = document.getElementById('new-quote')

const loader = document.getElementById('loader');

let apiquotes = [];

function loading()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function complete()
{
    loader.hidden=true;
    quoteContainer.hidden=false;
}

function newquote() {
    loading();
    let ind= Math.floor(Math.random()*apiquotes.length);
    let quote=apiquotes[ind];
    if(quote.author!=null)
    {
        authorText.textContent = quote.author;

    }
    else{
        authorText.textContent = 'UnKnown';

    }

    if(quote.text.length>50)
    {
        quoteText.classList.add('long-quote');

    }
    else{
        quoteText.classList.remove('long-quote');

    }
    complete();
    quoteText.textContent = quote.text;

}




async function getquotes() {
    loading();
    const apiurl='https://type.fit/api/quotes';
    try{
        const response= await fetch(apiurl);
        apiquotes = await response.json();
        newquote();
    }
    catch (err){
        
    }
}



function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');

}

//event listener

newQuotebtn.addEventListener('click',newquote);
twitterBtn.addEventListener('click',tweetQuote);


//onload
getquotes();
