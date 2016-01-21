'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the intFlickApp
 */
var APIkey = '&api_key=fa3e0832f30851339c73d3dd3c27f961';

var testURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=7cd4e1a19694735a54aa19dd860e5855&date=2016-01-01&per_page=25&page=1&format=json&nojsoncallback=1'+ APIkey;

angular.module('intFlickApp')
  .controller('GridCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.buildPhotoLink = function(data, next){

      var farm = data.photos.photo[next].farm;
      var server = data.photos.photo[next].server;
      var id = data.photos.photo[next].id;
      var secret = data.photos.photo[next].secret;

      //assemble the parts into a complete URL for the photo
      var photoURL = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_z.jpg';  //underscore letter signals size of resultb
      // z medium 640, 640 on longest side
      // c medium 800, 800 on longest side
      // b large, 1024 on longest side
      // h large 1600, 1600 on longest side

      return photoURL;
    };

    //GET call using promises instead of callbacks
    $http({ method: 'GET', url: testURL})
      //success
      .then(function(response) {
        console.log(response.data);
        $scope.pics = response.data.photos.photo;

        console.log('$scope.pics', $scope.pics);
        //adds image URL to array
        for (var i=0; i < response.data.photos.photo.length; i++){
          $scope.pics[i].picURL = $scope.buildPhotoLink(response.data, i);
          console.log('inside for loop');
          console.log('$scope.buildPhotoLink(response.data, i)', $scope.buildPhotoLink(response.data, i));

        }
        console.log('after for loop', response.data);

      },
      //error
      function() {
        console.log('fail');
      });



    // $http({
    //   method: 'GET',
    //   url: testURL
    // },
    //     // $scope.pics = response.data.photos.photo;
    //     console.log(response.data.photos.photo[0]);

    //     //adds image URL to array
    //     // for (var i=0; i < response.data.photos.photo.length; i++){
    //     //   $scope.pics[i].picURL = $scope.buildPhotoLink(response, i);

    //     // }
    //   }, function errorCallback(response) {
    //     console.log('error', response);
    //   });
    // $scope.filterPics  = function(pic){
    //   var regSrch = new RegExp($scope.searchTerm, 'i');
    //   if (regSrch.test(pic.name) || regSrch.test(pic.city) || regSrch.test(pic.owner)){
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };
  });
