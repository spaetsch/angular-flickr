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

    $scope.date = {
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
      var year = $scope.date.value.getFullYear();
      var month = this.leadingZero($scope.date.value.getMonth() + 1);
      var day = this.leadingZero($scope.date.value.getDate());

      return year + '-' + month + '-' + day;
    };

    $scope.updatePics = function(){
      var baseURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c122c5b37d7f44cecd205b35066fd584';
      var searchDate = '&date=' + this.convertDate();
      var format = '&per_page=24&format=json&nojsoncallback=1';

      var requestURL = baseURL + searchDate + format;
      console.log('requestURL', requestURL);

      //GET call using promises instead of callbacks
      $http({ method: 'GET', url: requestURL})
        //success
        .then(function(response) {
          console.log('in http success in searchjs');
          $scope.pics = myFactory.successFlickr(response);
          console.log('$scope.pics', $scope.pics);
        },
        //error
        function() {
          console.log('error');
        });


    };




  });
