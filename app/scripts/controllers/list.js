'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the intFlickApp
 */
  // var baseURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c122c5b37d7f44cecd205b35066fd584';
  //     var searchDate = '&date=2016-01-01';
  //     var extras = '&extras=url_z%2C+url_q%2C+owner_name';
  //     var format = '&per_page=24&format=json&nojsoncallback=1';

  //     var requestURL = baseURL + searchDate + extras + format;

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
        console.log('list GET response', response);
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
