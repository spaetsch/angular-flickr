'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the intFlickApp
 */

 angular.module('intFlickApp')
  .controller('SearchCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.date = {
      value: new Date(2015, 10, 14)
    };

    $scope.updatePics = function(){
      console.log('in update pics');
      //myFactory.searchPics(searchDate);
    };
  });
