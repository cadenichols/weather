'use strict';
$(document).ready(init);

var apiURL = 'http://api.wunderground.com/api/e0e26c847eb5b7b7/';

function init() {
  $('#get-cams').click(clickGetCams);
  $('#my-cams').click(clickMyCams);
}

function clickMyCams() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
  console.log('You are here:', pos);
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude;
  var url = apiURL + 'webcams/q/' + lat + ',' + lon + '.json';
  paint(url);
}

function error(err) {
  console.log('Could not find position', err);
}

function clickGetCams() {
  var zipCode = $('#zip-code').val();
  var url = apiURL + 'webcams/q/' + zipCode + '.json';
  paint(url);
}

function paint(url) {
  $.getJSON(url, function(response) {
    $('#images').empty();
    response.webcams.forEach(function(cam) {
      var $img = $('<div>');
      $img.addClass('image');
      $img.css('background-image', 'url("' + cam.CURRENTIMAGEURL + '")');
      $('#images').append($img);
    });
  });
}
