fetch("https://api.animechan.io/v1/quotes/random")
    .then(response => response.json())
    .then(data => console.log(data));