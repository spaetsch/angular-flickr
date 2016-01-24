'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the intFlickApp
 */

angular.module('intFlickApp')
  .controller('ListCtrl', function ($scope, $http, myFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var reqDate = '&date=' + myFactory.convertDate();
    var requestURL = myFactory.baseURL + reqDate + myFactory.reqExtras + myFactory.reqFormat;
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
  })
  .directive('ngListModal', function() {
    return {
      templateUrl: 'views/modal.html'
    };
  });
