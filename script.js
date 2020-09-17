const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled
}
//Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '24a91e105c734776bb8d5d1cd18eb483',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joje API
async function getJokes() {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text to speach
        tellMe(joke);
        //Diable button
        toggleButton();
    } catch (error) {
        console.log('Whoops', error);
    }
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);