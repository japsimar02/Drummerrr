
var audio_volume = 0.6;

var image_url;
const api_call = () => {
    const URL = "https://api.unsplash.com/photos/random?query=band"
    fetch(URL, {
        headers: {
            'Authorization': 'Client-ID dt3L_cbQy7jzfCcThTn3T5NBREdzJBKN0CYTyrmNngU'
        }
    }).then(res => res.json())
        .then(res => {
            image_url = res.urls.small
            change_background(image_url)
        })
        .catch(error => console.log(error))
}

api_call()

const change_background = (image_src) => {
    let container_style = document.getElementsByClassName('container')[0].style
    let bg_color = getComputedStyle(document.documentElement).getPropertyValue("--background_low")

    container_style.background = `linear-gradient(300deg, ${bg_color}, ${bg_color}), url(${image_src})`
    container_style.backgroundSize = 'cover'
    container_style.backgroundPosition = 'center'

} 

const background_changer = document.getElementById("util-btn-background")
background_changer.addEventListener("click", () => {
    api_call()
})

const animate = (key) => {
    const currentKey = document.querySelector(`.${key}`)
    currentKey.classList.add('pressed')
    setTimeout(() => {
        currentKey.classList.remove('pressed')
    }, 250)
}

const playMusic = (path) => {
    const audio = new Audio(path);
    audio.volume = audio_volume;
    audio.play();
}

document.addEventListener("keypress", (event) => {
    const triggeredKey = event.key;
    makeSound(triggeredKey);
    animate(triggeredKey);
})

const theme1_bg = "#3a3a39";
const theme1_bg_low = "rgba(9, 25, 33, 0.8)";
const theme1_text = "#6ff495";

const theme2_bg = "#fdc975";
const theme2_bg_low = "rgba(239, 216, 136, 0.7)";
const theme2_text = "#271e49";

const change_theme = (theme) => {
    let root = document.documentElement
    if(theme === "theme_1"){
        root.style.setProperty('--background', theme1_bg)
        root.style.setProperty('--background_low', theme1_bg_low)
        root.style.setProperty('--text', theme1_text)
        change_background()
    }
    else{
        root.style.setProperty('--background', theme2_bg)
        root.style.setProperty('--background_low', theme2_bg_low)
        root.style.setProperty('--text', theme2_text)
        change_background()
    }
}

var current_theme = "theme_1"

const theme_changer = document.getElementById("util-btn-theme")
theme_changer.addEventListener("click", (e) => {
    theme_changer.classList.add("change_theme_pressed")
    setTimeout(() => {
        theme_changer.classList.remove("change_theme_pressed")
    }, 250)
    if(current_theme == "theme_1"){
        change_theme("theme_2")
        current_theme = "theme_2"
    }
    else{
        change_theme("theme_1")
        current_theme = "theme_1"
    }
})



const slider = document.getElementById("volume-slider")
slider.oninput = (event) => {
    audio_volume = event.target.value/100;
}

var auto_music_toggle;
var auto_music_on = false;

const auto_music = () => {
    const letters = ["w", "a", "s", "d", "j", "k", "l", "n", "m", "h", "g", "f", "q", "e", "r", "i", "b", "y"];
    auto_music_toggle = setInterval(() => {
        const currentKey = letters[Math.floor(Math.random() * letters.length)]
        makeSound(currentKey)
        animate(currentKey);
    }, 200)
    
}

const auto_music_btn = document.getElementById("util-btn-auto")
auto_music_btn.addEventListener("click", () => {
    if(auto_music_on){
        clearInterval(auto_music_toggle)
        auto_music_on = false;
        auto_music_btn.innerText = "Start Auto Music"
    }
    else{
        auto_music()
        auto_music_on = true;
        auto_music_btn.innerText = "Stop Auto Music"
        auto_music_btn.classList.remove("auto_music_on")
    }
})

const makeSound = (key) => {
    switch (key) {
        case "w":
            playMusic("sounds/sound1.wav");
            break;
        case "a":
            playMusic("sounds/sound2.wav");
            break;
        case "s":
            playMusic("sounds/sound3.wav");
            break;
        case "d":
            playMusic("sounds/sound4.wav");
            break;
        case "j":
            playMusic("sounds/sound5.wav");
            break;
        case "k":
            playMusic("sounds/sound6.wav");
            break;
        case "l":
            playMusic("sounds/sound7.wav");
            break;
        case "n":
            playMusic("sounds/sound8.wav");
            break;
        case "m":
            playMusic("sounds/sound9.wav");
            break;
        case "h":
            playMusic("sounds/sound10.wav");
            break;
        case "g":
            playMusic("sounds/sound11.wav");
            break;
        case "f":
            playMusic("sounds/sound12.wav");
            break;
        case "q":
            playMusic("sounds/sound13.wav");
            break;
        case "e":
            playMusic("sounds/sound14.wav");
            break;
        case "r":
            playMusic("sounds/sound15.wav");
            break;
        case "i":
            playMusic("sounds/sound16.wav");
            break;
        case "b":
            playMusic("sounds/sound17.wav");
            break;
        case "y":
            playMusic("sounds/sound18.wav");
            break;
        default: 
            console.log("wrong input");
    }
}

const handleDrumClick = (event) => {
    var innerHTML = event.target.innerHTML;
    animate(innerHTML);
    makeSound(innerHTML);
}

var drums = document.querySelectorAll(".drum")
for(let i=0; i<drums.length; i++){
    drums[i].addEventListener("click", handleDrumClick)
}