'use strict';

var app = angular.module('intFlickApp');
angular.module('myFactory',[]);

app.factory('myFactory', function(){
  var service = {
    pics:[],
    searchDate: new Date(2015, 7, 1),
    baseURL: 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=c122c5b37d7f44cecd205b35066fd584',
    reqExtras: '&extras=url_z%2C+url_q%2C+owner_name%2C+tags%2C++views',
    reqFormat: '&per_page=24&format=json&nojsoncallback=1'
  };
  service.leadingZero = function(num){
    if (num < 10){
      var str = '0' + num;
      return str;
    } else {
      return num;
    }
  };
  service.convertDate = function(){
    var year = this.searchDate.getFullYear();
    var month = this.leadingZero(this.searchDate.getMonth() + 1);
    var day = this.leadingZero(this.searchDate.getDate());

    return year + '-' + month + '-' + day;
  };
  service.buildFlickrURL = function(data, next){
    var baseURL = 'https://www.flickr.com/photos/';
    var userID = data.photos.photo[next].owner;
    var photoID = data.photos.photo[next].id;

    return baseURL + userID + '/' + photoID;
  };
  service.successFlickr = function(response){
    this.pics = response.data.photos.photo;
    //adds flickr URL to array
    for (var i=0; i < response.data.photos.photo.length; i++){
      this.pics[i].flickrURL = this.buildFlickrURL(response.data, i);
    }
    return this.pics;
  };
  return service;
});
