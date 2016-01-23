'use strict';

var app = angular.module('intFlickApp');
angular.module('myFactory',[]);

app.factory('myFactory', function(){
  var service = {
    pics:[]
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
