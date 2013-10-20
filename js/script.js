var windowHeight = $(window).height();
var windowWidth = $(window).width();
var addToContainerHeight = windowHeight-62;
var addToContainerWidth = windowWidth-760;
var addFromContainerLeft = addToContainerWidth+42;
var addFromContainerMinLeft = 200;
var usersTags = new Array();

	  
$(document).ready(function(){
	        		
    $('#addToContainer').css({
    	height:addToContainerHeight,
    	width:addToContainerWidth
    });  
    if(addToContainerWidth > 158){
  	  	$('.addFromContainer').css({
   			left:addFromContainerLeft
    	});
  	} 
	else{
    	$('.addFromContainer').css({
    		left:addFromContainerMinLeft
    	});
    }

    $('.category, .color, .suggestedTag, .addedTag, .newTag').hover(
        function(){
            $(this).children(':nth-child(2)').css({
                display:'block',
            });
            $(this).children(':nth-child(2)').filter(':not(:animated)').animate({
                opacity:1,
            },300);
        },
        function() {
            $(this).children(':nth-child(2)').animate({
                opacity:0,
            },300);
            $(this).children(':nth-child(2)').css({
                display:'none',
            });
        }
    );

    $('.category').click(
        function(){
            $(this).children(':nth-child(3)').css({
                display:'block',
            });
            $(this).children(':nth-child(3)').animate({
                opacity:1,
            },300);
            newTag = $(this).children(':nth-child(4)').text().toLowerCase();
            $('#addedTagsContainer').append(
                '<li class="newTag"><span>#' + newTag + '</span><span class="addRemove">-</span></li>'
            );
            $('#addedTagsContainer').children(':last-child').animate({
                opacity:1
            },200);
        }
    );

    $('.color').click(
        function(){
            $(this).children(':nth-child(3)').css({
                display:'block',
            });
            $(this).children(':nth-child(3)').animate({
                opacity:1,
            },300);
            newTag = $(this).children(':nth-child(4)').text().toLowerCase();
            $('#addedTagsContainer').append(
                '<li class="newTag"><span>#' + newTag + '</span><span class="addRemove">-</span></li>'
            );
            $('#addedTagsContainer').children(':last-child').animate({
                opacity:1
            },200);
        }
    );

    $("#suggestedUserTags").on("click", ".suggestedTag", 
        function(){
            $(this).children(':nth-child(3)').css({
                display:'block',
            });
            $(this).children(':nth-child(3)').animate({
                opacity:1,
            },300);
            newTag = $(this).children(':nth-child(1)').text().toLowerCase();
            $('#addedTagsContainer').append(
                '<li class="newTag"><span>' + newTag + '</span><span class="addRemove">-</span></li>'
            );
            $('#addedTagsContainer').children(':last-child').animate({
                opacity:1
            },200);
        }
    );

    $("#suggestedLocationTags").on("click", ".suggestedTag", 
        function(){
            $(this).children(':nth-child(3)').css({
                display:'block',
            });
            $(this).children(':nth-child(3)').animate({
                opacity:1,
            },300);
            newTag = $(this).children(':nth-child(1)').text().toLowerCase();
            $('#addedTagsContainer').append(
                '<li class="newTag"><span>' + newTag + '</span><span class="addRemove">-</span></li>'
            );
            $('#addedTagsContainer').children(':last-child').animate({
                opacity:1
            },200);
        }
    );

    $("#addedTagsContainer").on("click", ".newTag",
        function(){
            $(this).remove();
        }
    );

    $("#addedTagsContainer").on("click", ".addedTag",
        function(){
            $(this).remove();
        }
    );

    $("#getUserTags").submit( 
        function(){
            var tagList = $("#userTags").val().toLowerCase().split(",");        
            for (var i=0; i<tagList.length; i++){
                console.log(tagList[i]);
                $("#addedTagsContainer").append('<li class="newTag"><span>#' + tagList[i].trim() + '</span><span class="addRemove">-</span></li>');
                $('#addedTagsContainer').children(':last-child').animate({
                    opacity:1,
                },200);
                var url = "http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=803b4fba97fed821c7d451d31da3c60f&tag=" + tagList[i] + "&format=json&jsoncallback=?";
                $.getJSON(url, function(data){
                    $.each(data.tags.tag, function(key,value){
                        if(key < 10){
                            $('#userTagsContainer').css({
                                display:'block',
                            });
                            $('#userTagsContainer').animate({
                                opacity:1,
                            },200);
                            $("#suggestedUserTags").append('<li class="suggestedTag"><span>#' + value._content + '</span><span class="addRemove">+</span><span class="added">&#x2713</span></li>');  
                            $('#suggestedUserTags').children(':last-child').animate({
                                opacity:1,
                            },200);
                        }
                    });
                });
            }
            $("#userTags").val('');
            return false;       
        }
    );

});





