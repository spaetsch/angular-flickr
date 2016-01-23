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

    $scope.myFactory = myFactory;
    $scope.pics = myFactory.pics;

    $scope.$watch('myFactory.pics', function (newVal, oldVal, scope) {

      if (newVal) {
        scope.pics = newVal;
      }
    });
    console.log('end of GridCtrl, scope pics:', $scope.pics);
  });
