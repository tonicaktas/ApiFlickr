$(document).ready(function() {


 $('button').click(function () {
    // highlight knappen
    // Ändra på uttseende på knapapr
    $("button").removeClass("selected");
    $(this).addClass("selected");

    // Api delen
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; // Api urlen
    var animal = $(this).text(); // Lägg till texten från knappen til urlen för att hämta vald djur
    var flickrOptions = { // Väljer ut info vi vill hämta med loopen
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
        console.log(data);
      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) { // loopar igenom data och delar up allt i "photo"
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a>';
        photoHTML += '<p>' + photo.title + '</p></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos); // kallar funktionen och gör det hela api hämtingen som är skriven ovan

  }); // end click

}); // end ready
