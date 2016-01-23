'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the intFlickApp
 */

 angular.module('intFlickApp')
  .controller('SearchCtrl', function ($scope, $http, myFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.searchDate = {
      value: myFactory.searchDate
    };

    $scope.getPics = function(){
      myFactory.searchDate = $scope.searchDate.value;

      var reqDate = '&date=' + myFactory.convertDate();
      var requestURL = myFactory.baseURL + reqDate + myFactory.reqExtras + myFactory.reqFormat;

      //GET call using promises
      $http({ method: 'GET', url: requestURL})
        //success
        .then(function(response) {
          console.log('search GET all laterresponse', response);
          console.log('myFactory.searchDate', myFactory.searchDate);

          $scope.pics = myFactory.successFlickr(response);
          myFactory.pics = $scope.pics;
          console.log('myFactory.successFlickr(response)', myFactory.successFlickr(response));
          console.log('myFactory.pics', myFactory.pics);
        },
        //error
        function() {
          console.log('error');
        });
    };
  });
