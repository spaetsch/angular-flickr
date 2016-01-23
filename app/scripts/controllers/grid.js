'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the intFlickApp
 */

var baseURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c122c5b37d7f44cecd205b35066fd584';
var searchDate = '&date=2016-01-01';
var format = '&extras=owner_name%2C+url_z&per_page=24&format=json&nojsoncallback=1';
var requestURL = baseURL + searchDate + format;

angular.module('intFlickApp')
  .controller('GridCtrl', function ($scope, $http, myFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //GET call using promises instead of callbacks
    $http({ method: 'GET', url: requestURL})
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
