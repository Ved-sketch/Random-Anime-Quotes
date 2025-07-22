
const generateBtn = document.getElementById("generate-btn")
const quote = document.getElementById("main")
const characterAndAnime = document.getElementById("cite")
const characterImage = document.getElementById("character-image")

generateBtn.addEventListener('click', function () {
    fetch("https://api.animechan.io/v1/quotes/random")
        .then(response => response.json())
        .then(data => {
            quote.textContent = data.data.content;
            characterAndAnime.textContent = data.data.character.name + " ," + data.data.anime.name;
            fetchCharacterImage(data.data.character.name);
        });
})

function fetchCharacterImage(characterName){
    const query = `
        query ($name: String) {
            Character(search: $name) {
                name {
                    full
                }
                image {
                    large
                }
            }
        }
    `;

    const variables = {
        name: characterName
    };

    fetch('https://graphql.anilist.co/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('AniList API response:', data); // Debug log
            
            if (data.errors) {
                console.error('GraphQL errors:', data.errors);
                characterImage.src = "https://via.placeholder.com/150?text=No+Image";
                return;
            }
            
            const character = data.data?.Character;
            if (character && character.image && character.image.large) {
                characterImage.src = character.image.large;
                console.log('Image loaded:', character.image.large);
            } else {
                console.log('No character image found for:', characterName);
                characterImage.src = "https://via.placeholder.com/150?text=No+Image"; // Fallback
            }
        })
        .catch(error => {
            console.error('Error fetching character image:', error);
            characterImage.src = "https://via.placeholder.com/150?text=No+Image";
        });
}

