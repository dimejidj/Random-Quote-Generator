const quoteText = document.querySelector("#disText");
const newQuote = document.querySelector("#quote-btn");
let quotesObj = "";
let quotesUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const quoteAut = document.querySelector("#disAut");

const colorsArr = [
  "#ff1a1a",
  "#ffd11a",
  "#cc66ff",
  "#1a75ff",
  "#4dffc3",
  "#79ff4d",
  "#a3a375",
  "#40bf80",
  "#b35900",
  "#cccc00",
  "#669999",
  "#cc3300",
  "#336600",
  "#000000"
];

const quotesData = function () {
  return fetch(quotesUrl)
    .then((response) => response.text())
    .then((data) => (quotesObj = JSON.parse(data)));
};

function getRandomQuotes() {
  return quotesObj.quotes[Math.floor(Math.random() * quotesObj.quotes.length)];
}

function getRandomColor() {
  return colorsArr[Math.floor(Math.random() * colorsArr.length)];
}

function getQuote() {
  let randomQuote = getRandomQuotes();
  const quote = randomQuote.quote;
  const author = randomQuote.author;
  const mainColor = getRandomColor();

  $(".quote-logo").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
  });

  $("body").animate({ "background-color": mainColor, color: mainColor }, 800);

  $("#container").animate({ "background-color": mainColor, opacity: 1 }, 800);

  $("button").animate({ "background-color": mainColor, opacity: 0.9 }, 800);

  $("#top-quote").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 800);
    $(quoteText).text(quote);
  });

  $("#auth").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 0.65 }, 800);
    $(quoteAut).text(`- ${author}`);
  });

  $('#tweet').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + quote + '" ' + author)
  );

  $('#tumblr').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(author) +
      '&content=' +
      encodeURIComponent(quote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );
  
}

$(document).ready(function () {
  quotesData().then(() => {
    getQuote();
  });

  $(newQuote).on("click", getQuote);
});
