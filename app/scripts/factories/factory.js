'use strict';

console.log('top of factory.js');

var app = angular.module('intFlickApp');
angular.module('myFactory',[]);

app.factory('myFactory', function($http, $q){
  var service = {};

  service.callFlickr = function(){
    console.log('first line service callFlickr');
    var deferred = $q.defer();

      return deferred.promise;
  };

  return service;
});
