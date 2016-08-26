//----
// Variables
//----
var weatherIcons = {
    'clear sky': '☀️',
    'hot': '☀️',
    'few clouds': '🌤',
    'scattered clouds': '🌥',
    'broken clouds': '☁️',
    'overcast clouds': '☁️',
    'shower rain': '🌧',
    'light rain': '🌧',
    'rain': '🌧',
    'light intensity drizzle': '🌧',
    'drizzle': '🌧',
    'heavy intensity drizzle': '🌧',
    'light intensity drizzle rain': '🌧',
    'drizzle rain': '🌧',
    'heavy intensity drizzle rain': '🌧',
    'shower rain and drizzle': '🌧',
    'heavy shower rain and drizzle': '🌧',
    'shower drizzle': '🌧',
    'moderate rain': '🌧',
    'heavy intensity rain': '🌧',
    'very heavy rain': '🌧',
    'extreme rain': '🌧',
    'freezing rain': '🌧',
    'light intensity shower rain': '🌧',
    'heavy intensity shower rain': '🌧',
    'ragged shower rain': '🌧',
    'thunderstorm': '🌩',
    'thunderstorm with light rain': '🌩',
    'thunderstorm with rain': '🌩',
    'thunderstorm with heavy rain': '🌩',
    'light thunderstorm': '🌩',
    'heavy thunderstorm': '🌩',
    'ragged thunderstorm': '🌩',
    'thunderstorm with light drizzle': '🌩',
    'thunderstorm with drizzle': '🌩',
    'thunderstorm with heavy drizzle': '🌩',
    'snow': '🌨',
    'light snow': '🌨',
    'heavy snow': '🌨',
    'sleet': '🌨',
    'shower sleet': '🌨',
    'light rain and snow': '🌨',
    'rain and snow': '🌨',
    'light shower snow': '🌨',
    'shower snow': '🌨',
    'heavy shower snow': '🌨',
    'mist': '🌫',
    'smoke': '🌫',
    'sand, dust whirls': '🌫',
    'fog': '🌫',
    'sand': '🌫',
    'dust': '🌫',
    'volcanic ash': '🌫',
    'squalls': '🌫',
    'cold': '⛄️',
    'windy': '💨',
    'tornado': '🌪',
    'tropical storm': '🌪',
    'hurricane': '🌪',
    'hail': '🌨',
    'storm': '🌧',
    'violent storm': '🌧',
    'calm': '💨',
    'light breeze': '💨',
    'gentle breeze': '💨',
    'moderate breeze': '💨',
    'fresh breeze': '💨',
    'strong breeze': '💨',
    'high wind, near gale': '💨',
    'gale': '💨',
    'severe gale': '💨'
};

var weatherPhrases = {
    'clear sky': ["The sky is perfectly clear. Go out!", "With this sun you are going to burn in seconds", "The sun is shinning for you"],
    'few clouds': ["There are a few cloud in the sky so watch out!", "Maybe you should get an umbrella"],
    'scattered clouds': ['There are only a few clouds', 'It\'s not going to rain, don\'t worry'],
    'broken clouds': ['Grab your phone and snap this moment!', 'Take a photo now!'],
    'shower rain': ["It's starting to rain. Go home!", 'It\'s starting to rain but don\'t worry, it\'s nothing'],
    'light rain': ["It's starting to rain. Go home!", 'It\'s starting to rain but don\'t worry, it\'s nothing'],
    'rain': ["It's raining. Go home!", "Oh god, what a storm", "Noah must be near. What a flood!", "BRING THE ANIMALS NOAH!!!"],
    'thunderstorm': ["You should go home. The sky is angry", 'It\'s going to get real bad'],
    'snow': ["It's snowing, go grab your skies!", 'It\'s the perfect time to go skiing'],
    'mist': ["Don't take the car because you won't see anything", 'Do you see anything?']
};
var temperature_scales = ["F", "C"];

//-------
// Functions
//-------
function setWeatherData(lat, log, weatherIcons, callback) {
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?lat=' + lat + '&lon=' + log + '&units=metric&APPID=8ee5138d46a0454c83b9e6a24eb6f31e', function(data) {
        // Set city name
        $('.weather__city').text(data.city.name + ', ' + data.city.country).attr('href', 'http://maps.google.com/?q=' + data.city.name);
        // Set weather state
        $('.weather__conditions').text(data.list[0].weather[0].description);
        // Set weather phrase
        $('.weather__phrase').text("\"" + weatherPhrases[data.list[0].weather[0].description][Math.floor(Math.random() * weatherPhrases[data.list[0].weather[0].description].length)] + "\"");
        // Set temperature color
        $('.temperature').addClass((Math.round(data.list[0].main.temp) < 15) ? 'temperature_low' : 'temperature_high');
        // Set weather degrees
        $('.temperature__degrees').text(Math.round(data.list[0].main.temp));
        // Set weather icon
        $('.weather-resume__icon').text(weatherIcons[data.list[0].weather[0].description]);
        callback(); // Callback is used to display the weather card when the locating function is done.
    });
}
// Depending on scale, change the temperature from celsius to fahrenheit or reverse (true -> celsiusToFa, false -> faToCelsius)
function changeScale(degrees, scale) {
    return (scale == "F") ? degrees * 9 / 5 + 32 : (degrees - 32) * 5 / 9;
}

//-------
// Main script
//-------
$(document).ready(function() {
    $(".home__check-weather").click(function() {
        $(this).fadeOut(function() {
            $(".locating").fadeIn(300);
        });
        $(".home").fadeOut(function() {
            $(".locating").fadeIn(300);
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setWeatherData(position.coords.latitude, position.coords.longitude, weatherIcons, function() {
                    $(".locating").fadeOut(function() {
                        $(".weather").fadeIn();
                    });
                });
            });
        }
    });
    // Change scale of temperature
    $(".temperature__scale").click(function() {
        // Transform the degrees to a number
        var degrees = Number($(".temperature__degrees").text());
        var scale = ($(this).attr('data-scale') == "C") ? "F" : "C";
        // add the º if the scale is celsius
        var added = (scale == "C") ? "º" : "";
        $(".temperature__degrees").text(Math.round(changeScale(degrees, scale)));
        // Change attr scale
        $(".temperature__scale").text(added + scale);
        $(this).attr('data-scale', scale);
    });
});
