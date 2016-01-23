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
      value: new Date(2015, 0, 1)
    };

    $scope.leadingZero = function(num){
      if (num < 10){
        var str = '0' + num;
        return str;
      } else {
        return num;
      }
    };

    $scope.convertDate = function(){
      var year = $scope.searchDate.value.getFullYear();
      var month = this.leadingZero($scope.searchDate.value.getMonth() + 1);
      var day = this.leadingZero($scope.searchDate.value.getDate());

      return year + '-' + month + '-' + day;
    };

    $scope.getPics = function(){
      var baseURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c122c5b37d7f44cecd205b35066fd584';
      var searchDate = '&date=' + this.convertDate();
      var format = '&extras=owner_name%2C+url_z&per_page=24&format=json&nojsoncallback=1';

      var requestURL = baseURL + searchDate + format;
      console.log('in getPics, requestURL:', requestURL);

      //GET call using promises
      $http({ method: 'GET', url: requestURL})
        //success
        .then(function(response) {
          console.log('in getPics success, response:', response);
          $scope.pics = myFactory.successFlickr(response);
          myFactory.pics = $scope.pics;
        },
        //error
        function() {
          console.log('error');
        });
    };
  });
