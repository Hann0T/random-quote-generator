
function getInfo(api_url, callback) {
    fetch(api_url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error(new Error('Error:', error)))
}

function printInfo(API) {
    getInfo(API, (data) => {
        let randomNumber = Math.floor(Math.random() * (1600 - 0) + 0);
        text.innerHTML = data[randomNumber].text;
        author.innerHTML = data[randomNumber].author;
        console.log(randomNumber);
    })
}

const mainFunctionality = () => {
    const API = 'https://type.fit/api/quotes/';
    const text = document.getElementById('text');
    const author = document.getElementById('author');
    const buttonNewQuote = document.getElementById('newQuote');

    printInfo(API);

    buttonNewQuote.addEventListener('click', printInfo(API));

};

window.onload = () => {
    mainFunctionality();
};