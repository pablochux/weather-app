var weatherIcons = {
    'clear sky': '☀️',
    'few clouds': '🌤',
    'scattered clouds': '🌥',
    'broken clouds': '☁️',
    'shower rain': '🌧',
    'rain': '🌧',
    'thunderstorm': '🌩',
    'snow': '🌨',
    'mist': '🌫'
};
var weatherPhrases = {
    'clear sky': ["The sky is perfectly clear. Go out!", "With this sun you are going to be red in seconds"],
    'few clouds': [""],
    'scattered clouds': [""],
    'broken clouds':  [""],
    'shower rain': ["It's starting to rain. Go home!"],
    'rain': ["It's raining. Go home!", "Oh god, what a storm", "Noah must be near. What a flood!", "BRING THE ANIMALS NOAH!!!"],
    'thunderstorm': [""],
    'snow': [""],
    'mist': [""]
};
var phrases = ["It's fucking !",];
var temperature_scales = ["F", "C"];
function setWeatherData(lat, log, weatherIcons) {
	$.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?lat=' + lat + '&lon=' + log + '&units=metric&APPID=8ee5138d46a0454c83b9e6a24eb6f31e', function(data){
	    	console.log("Weather: " + data);
            // Set city name
	    	$('.weather-city a').text(data.city.name + ', ' + data.city.country).attr('href', 'http://maps.google.com/?q=' + data.city.name);
            // Set weather state
	    	$('.weather-conditions').text(data.list[0].weather[0].description);
            // Set weather degrees
            $('.temperature-degrees').text(Math.round(data.list[0].main.temp));
            // Set weather icon
            console.log(data.list[0].weather[0].description);
            console.log(weatherIcons[data.list[0].weather[0].description]);
            $('.weather-icon').text(weatherIcons[data.list[0].weather[0].description]);
	});
}
// Depending on flag, change the temperature from celsius to fahrenheit or reverse (true -> celsiusToFa, false -> faToCelsius)
function changeScale(degrees, scale){
    return (scale == "F") ? degrees * 9/5 + 32 : (degrees - 32) * 5/9;
}

$(document).ready(function(){
    $(".check-weather").click(function(){
        $(this).fadeOut(function(){$(".locating").fadeIn(300)});
        $(".home-page").fadeOut(function(){$(".locating").fadeIn(300)});
        console.log("Locating");
        if (navigator.geolocation) {
            console.log("Located");
            navigator.geolocation.getCurrentPosition(function(position) {
                setWeatherData(position.coords.latitude, position.coords.longitude, weatherIcons);
                console.log("Change to weather app");
                setTimeout(function(){
                    $(".locating").fadeOut(function(){$(".weather-container").fadeIn()});
                }, 1000);
           });
        }
    });
    // Change scale of temperature
    $(".temperature-scale").click(function(){
        // Transform the degrees to a number
        var degrees = Number($(".temperature-degrees").text());
        var scale = ($(this).attr('data-scale') == "C") ? "F" : "C";
        // add the º if the scale is celsius
        var added = (scale == "C") ? "º" : "";
        $(".temperature-degrees").text(Math.round(changeScale(degrees, scale)));
        // Change attr scale
        $(".temperature-scale").text(added + scale);
        $(this).attr('data-scale', scale);
    });
});