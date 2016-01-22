'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the intFlickApp
 */

var APIkey = '&api_key=fa3e0832f30851339c73d3dd3c27f961';
var testURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=7cd4e1a19694735a54aa19dd860e5855&date=2016-01-01&per_page=24&page=1&format=json&nojsoncallback=1'+ APIkey;

angular.module('intFlickApp')
  .controller('GridCtrl', function ($scope, $http, myFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //GET call using promises instead of callbacks
    $http({ method: 'GET', url: testURL})
      //success
      .then(function(response) {
        $scope.pics = myFactory.successFlickr(response);
      },
      //error
      function() {
        console.log('error');
      });




    // $scope.filterPics  = function(pic){
    //   var regSrch = new RegExp($scope.searchTerm, 'i');
    //   if (regSrch.test(pic.name) || regSrch.test(pic.city) || regSrch.test(pic.owner)){
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };
  });
