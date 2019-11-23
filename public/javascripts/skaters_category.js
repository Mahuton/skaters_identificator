$( function() {
    var myVar = setInterval(setColor, 3000);

    function setColor() {
      var x = document.getElementsByClassName('item')[0];
      //x.style.border  = "solid red";
      var atr = x.getAttribute('image-title');
      var cat_container = document.getElementById('category-name');
      if(cat_container.textContent.length == 0){
        document.getElementsByClassName('category-confirmation-block')[0].style.display='block';
      $.ajax({
                    url: "https://commons.wikimedia.org/w/api.php",
                    dataType: "jsonp",
                    data: {
                      action: "query",
                      prop: "categories",
                      titles: atr,
                      clshow:"!hidden",
                      format: "json"
                    }
      
                  }).done( function( data ){
                    //console.log(data.query.pages);
                    for(var r in data.query.pages){                      
                        console.log(data.query.pages[r].categories[0].title);
                        var cat_container = document.getElementById('category-name');
                        
                        cat_container.textContent = data.query.pages[r].categories[0].title.replace('Category:','');
                      }
                      
                      if(document.getElementById('category-name').textContent.length > 0){
                        document.getElementById('category-answer-button').style.display ='block';
                      }
                      
                      
              
                    });
      //here
                      }
    }
    
    function stopInterval() {
      clearInterval(myVar);
    }
    
    if(document.getElementsByClassName('item').length > 0){
        stopInterval();
    }
    
    
    $("#myCarousel").on('slid.bs.carousel', function () {
    //console.log('The carousel has finished sliding from one item to another!');
    $('.item').each(function(){
            if($(this).hasClass('active')){
                //$(this).css('border', 'solid red');
                //console.log($(this).attr('image-title'));
                
                // get the category
                $.ajax({
                    url: "https://commons.wikimedia.org/w/api.php",
                    dataType: "jsonp",
                    data: {
                      action: "query",
                      prop: "categories",
                      titles: $(this).attr('image-title'),
                      clshow:"!hidden",
                      format: "json"
                    }
      
                  }).done( function( data ){
                    //console.log(data.query.pages);
                    for(var r in data.query.pages){                      
                        console.log(data.query.pages[r].categories[0].title);
                        var cat_container = document.getElementById('category-name');
                        cat_container.textContent = data.query.pages[r].categories[0].title.replace('Category:','');
                      }
                      
                      if(document.getElementById('category-name').textContent.length > 0){
                        document.getElementById('category-answer-button').style.display ='block';
                      }
              
                    });
                // end
                //https://commons.wikimedia.org/w/api.php?action=query&prop=categories&titles=File:2008%20European%20Championships%20Banquet01.jpg
            }
            else{
            }
    });
  });
    
    
} );


