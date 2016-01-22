'use strict';

var app = angular.module('intFlickApp');
angular.module('myFactory',[]);

app.factory('myFactory', function(){
  var service = {};

  service.buildSearchURL = function(searchDate){
    var baseURL = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=8f17ffef253a96b1b922e28c52672280';
    var date = '&date=' + searchDate;
    var format = '&per_page=24&format=json&nojsoncallback=1';

    return baseURL + date + format;
  };

  service.searchPics = function(searchDate){
    var newPics = this.buildSearchURL(searchDate);
    console.log(newPics);
  };



  service.buildPicURL = function(data, next){
    var farm = data.photos.photo[next].farm;
    var server = data.photos.photo[next].server;
    var id = data.photos.photo[next].id;
    var secret = data.photos.photo[next].secret;

    //assemble the parts into a complete URL for the photo
    var photoURL = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_z.jpg';  //underscore letter signals size of resultb
    // z medium 640, 640 on longest side
    // c medium 800, 800 on longest side
    // b large, 1024 on longest side
    // h large 1600, 1600 on longest side
    return photoURL;
  };

  service.successFlickr = function(response){
    this.pics = response.data.photos.photo;
    //adds image URL to array
    for (var i=0; i < response.data.photos.photo.length; i++){
      this.pics[i].picURL = this.buildPicURL(response.data, i);
    }
    return this.pics;
  };
  return service;
});