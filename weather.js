const weather = document.querySelector(".js-weather");

const API_KEY = "31c29bdb158360cd2b50192d0c863ba2";
const COORDS = 'coords';

function getWeather(lat, lng) {
    // Ajax : API 데이터 형식, html, css 등의 데이터를 서버와 주고받는 기술 중 하나.
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {     //fetch가 끝나고 나서 then 함수 작동됨.
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${Math.floor(temperature)}℃ @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,       //latitude: latitude,
        longitude       //longitude: longitude -> key와 value 이름을 같게 저장할 때는 이렇게 작성 가능
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    //navigator API
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
    
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();