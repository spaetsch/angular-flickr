'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the intFlickApp
 */

angular.module('intFlickApp')
  .controller('ListCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http({
      method: 'GET',
      url: 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=7cd4e1a19694735a54aa19dd860e5855&date=2016-01-01&per_page=25&page=1&format=json&nojsoncallback=1&api_sig=28f315de2173fb55407c1cb004f09972'
    }).then(function successCallback(response) {
        $scope.pics = response.data;
        console.log(response);
        // //adds 300x300 image to array
        // for (var i=0; i < response.data.length; i++){
        //   var url = response.data[i].image;
        //   $scope.dogs[i].bigImage = url.replace('h_100,w_100', 'h_300,w_300');
        // }

      }, function errorCallback(response) {
        console.log('error', response);
      });
    $scope.filterPics  = function(pic){
      var regSrch = new RegExp($scope.searchTerm, 'i');
      if (regSrch.test(pic.name) || regSrch.test(pic.city) || regSrch.test(pic.owner)){
        return true;
      } else {
        return false;
      }
    };
  });
