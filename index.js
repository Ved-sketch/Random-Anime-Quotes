
const generateBtn = document.getElementById("generate-btn")
const quote = document.getElementById("main")
const characterAndAnime = document.getElementById("cite")

generateBtn.addEventListener('click', function () {
    fetch("https://api.animechan.io/v1/quotes/random")
        .then(response => response.json())
        .then(data => {
            quote.textContent = data.data.content;
            characterAndAnime.textContent = data.data.character.name + " ," + data.data.anime.name;
        });
})

