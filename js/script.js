var users_tags = new Array();

$(document).ready(function() {

   $(".tagName").on("click", function () {
        new_tag = $(this).text().toLowerCase();
        $("#tagContainer").append('<div class="tag"><p>#' + new_tag + '</p></div>' );
   });

      $("#suggestedTags").on("click", ".suggestedTag",  function () {
        new_tag = $(this).text().toLowerCase();
        $("#tagContainer").append('<div class="tag"><p>' + new_tag + '</p></div>' );
   });

   $("#user_added").submit( function () {
        var tag_list = $("#addTags").val().split(",");        
        for (var i=0; i<tag_list.length; i++) {
        	console.log(tag_list[i]);
        	$("#tagContainer").append('<div class="tag"><p>#' + tag_list[i].trim() + '</p></div>' );
        	var url = "http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=803b4fba97fed821c7d451d31da3c60f&tag=" + tag_list[i] + "&format=json&jsoncallback=?";
        	$.getJSON( url, function( data ) {
        		$.each(data.tags.tag, function (key, value) {
        			if (key < 10) {
            	$("#suggestedTags").append('<div class="suggestedTag"><p>#' + value._content + '</p></div>');
            	}
          	});
					});
				}; 
        $("#addTags").val('');
        return false;       
    });

        
});