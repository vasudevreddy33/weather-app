var wthrApp = angular.module("wthrApp", []);

wthrApp.controller("wthrCtrl", function($scope, $http) {
  var vm = $scope;
  vm.channelInfo = {
    heading: "Weather Forecast",
    subHeading: {
      name: "",
    }
  }

  $http.get("http://ip-api.com/json").success(function(data) {
    vm.lat = data.lat;
    vm.lon = data.lon;
    var apiK = "38e16b4e9488203605cc64f145e9c0f5";
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + vm.lat + "&lon=" + vm.lon + "&appid=" + apiK;

    $http.get(weatherUrl).success(function(data) {
      console.log(data);
      vm.description = data.weather[0].description;
      vm.speed = (2.237 * data.wind.speed).toFixed(1) + " mph";
      vm.name = data.name;
      vm.tempC = (data.main.temp - 273.15).toFixed(1) + " ℃";
      vm.tempF = (data.main.temp * (9 / 5) - 459.67).toFixed(1) + " ℉";

      switch (vm.description) {
        case 'clear sky':
          {
            vm.wthrImage = {
              "background": "url(http://cdn.rsvlts.com/wp-content/uploads/2016/06/1000w_q95.jpg)  no-repeat center fixed"
            };
            break;
          }
        case 'few clouds':
          {
            vm.wthrImage = {
              "background": "url(http://www.landschaftsfotos.at/Spaziergang%202010_07_31/DSC_3457.jpg)  no-repeat center fixed"
            };
            break;
          }
        case 'scattered clouds':
          {
            vm.wthrImage = {
              "background": "url(https://image.freepik.com/free-photo/scattered-clouds_1204-15.jpg)  no-repeat center fixed"
            };
            break;
          }
        case 'broken clouds':
          {
            vm.wthrImage = {
              "background": "url(http://danwrayphoto.com/wp-content/uploads/2014/06/WRA4814.jpg)  no-repeat center fixed"
            };
            break;
          }
        case 'shower rain':
          {
            vm.wthrImage = {
              "background": "url(https://i.ytimg.com/vi/vGXLco2s4lM/maxresdefault.jpg)  no-repeat center fixed"
            };
            break;
          }
        case 'rain':
          {
            vm.wthrImage = {
              "background": "url(https://s-media-cache-ak0.pinimg.com/originals/36/47/9d/36479d7d675bb231856f3f8f20fd2ec6.jpg)  no-repeat center fixed"
            };
            break;
          }
        case 'thunderstorm':
          {
            vm.wthrImage = {
              "background": "url(https://static1.squarespace.com/static/538738b1e4b09ebc9e38c299/t/538f782fe4b00d94e8c29c53/1401911789483/storm+road.jpg)  no-repeat center fixed"
            };
            break;
          }
        case 'snow':
          {
            vm.wthrImage = {
              "background": "url(http://forums.oausa.net/download/file.php?id=8054&sid=ce2688a9d7f32d6351aabee5a3fb9252)  no-repeat center fixed"
            };
            break;
          }
        case 'mist':
          {
            vm.wthrImage = {
              "background": "url(https://c1.staticflickr.com/9/8069/8199330238_f33f7735d8_b.jpg)  no-repeat center fixed"
            };
            break;
          }
        default:
          vm.wthrImage = {
            "background": "url(http://images.askmen.com/1080x540/2016/07/18-112526-new_he_man_and_the_masters_of_the_universe_episode_to_premiere_at_san_diego_s_comic_con.jpg)  no-repeat center fixed"
          }
          break;
      }
      console.log(vm.wthrImage);

      vm.icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      console.log(vm.tempC);
    }).error(function() {
      alert('Weather unavailable');
    });
  }).error(function() {
    alert('Unable to fetch location');
  });

});