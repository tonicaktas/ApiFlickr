$(document).ready(function() {

 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";


 $('form').submit(function (evt) { // När formen är klickad/skickad sker detta
    var $submitButton = $('#submit');
    var $searchField = $('#search');
    evt.preventDefault(); // stopar default bettende
    $searchField.prop("disabled",true);  // hindrar att dkriva mer text medan hämtningen sker
    $submitButton.attr("disabled", true).val("hämtar...."); // informerar att hämtningen sker och disabla knappen
    var animal = $searchField.val(); // sparar vad som är skrivet i inputen
    $('#photos').html('');
    $.getJSON(flickerAPI, {
        tags: animal,
        format: "json"
      },
    function(data){
      var photoHTML = '';
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
      } else {
        photoHTML = "<p>No photos found that match: " + animal + ".</p>"
      }
      $('#photos-sokta').html(photoHTML);
      $searchField.prop("disabled", false); // när hämtningen är färdigt enabla att skriva text i inputen
      $submitButton.attr("disabled", false).val("Search"); // När hämtningen är färdig enabla att klicka på knappen
    }); // end getJSON

  }); // end click

}); // end ready
