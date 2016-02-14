'use strict';

/**
 * @ngdoc function
 * @name intFlickApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the intFlickApp
 */

angular.module('intFlickApp')
  .controller('GridCtrl', function ($scope, $http, myFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var reqDate = '&date=' + myFactory.convertDate();
    var requestURL = myFactory.baseURL + reqDate + myFactory.reqExtras + myFactory.reqFormat;

    $scope.findOrientation = function(pic){
      //the longest side is height
      var height = parseInt(pic.height_z, 10);
      var width = parseInt(pic.width_z, 10);

      console.log("width", width);
      console.log("height", height);

      if ( height === width ){
        console.log('square');
        return 'square';
      } else if (height > width){
        console.log('portrait');
        return 'portrait';
      } else {
        console.log('landscape');
        return 'landscape';
      }
    };

    //GET call using promises instead of callbacks
    $http({ method: 'GET', url: requestURL})
      //success
      .then(function(response) {
        console.log(response);
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
   .directive('ngGridModal', function() {
    return {
      templateUrl: 'views/modal.html'
    };
  });

