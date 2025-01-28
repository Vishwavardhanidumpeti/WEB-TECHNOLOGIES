// Define the AngularJS app
var app = angular.module('WeatherApp', []);

// Define the WeatherController
app.controller('WeatherController', function ($scope, $http) {
    const apiKey = '3cc9595b033c120f5f81cdfcbccf13d5'; // Your API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    $scope.getWeather = function () {
        $scope.error = null; // Clear previous errors
        $scope.weatherData = null; // Clear previous weather data

        if ($scope.cityName) {
            // Append country code for India ('IN')
            const url = `${apiUrl}?q=${$scope.cityName},IN&appid=${apiKey}&units=metric`;
            console.log('API Request URL:', url); // Log the API URL to verify

            // Make an HTTP GET request to the API
            $http.get(url)
                .then(function (response) {
                    console.log('API Response:', response); // Log the response to verify
                    $scope.weatherData = response.data; // Bind the response data to $scope
                })
                .catch(function (error) {
                    console.error('API Error:', error); // Log the error to debug
                    // Handle errors
                    if (error.status === 401) {
                        $scope.error = "Invalid API key.";
                    } else if (error.status === 404) {
                        $scope.error = "City not found in India.";
                    } else {
                        $scope.error = "An unexpected error occurred.";
                    }
                });
        } else {
            $scope.error = "Please enter a city name.";
        }
    };
});
