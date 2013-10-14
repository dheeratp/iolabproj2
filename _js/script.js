var users_tags = new Array();

$(document).ready(function() {

    $(".category").click( function() {
        category = $ (this).text();
        var url = "http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=803b4fba97fed821c7d451d31da3c60f&tag=" + category + "&format=json&jsoncallback=?";
        $("#results").empty();
        $.getJSON( url, function( data ) {
                $.each(data.tags.tag, function (key, value) {
                    $("#results").append('<li><a href="#" class="search-result">' + value._content + '</a></li>');
                });      
        });
    });

   $("#results").on("click", ".search-result", function () {
        new_tag = $(this).text()
        users_tags.push(new_tag);
        $("#tag-list").append( new_tag + ' ' );
   });

   $("#tags-search").submit( function () {
        var query = $("#query").val();
        var url = "http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=803b4fba97fed821c7d451d31da3c60f&tag=" + query + "&format=json&jsoncallback=?";
        $("#results").empty();
        $.getJSON( url, function( data ) {
                $.each(data.tags.tag, function (key, value) {
                    $("#results").append('<li><a href="#" class="search-result">' + value._content + '</a></li>');
                });      
        });
        $("#query").val('');
        return false;       
    });

        
});