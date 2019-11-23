$( function() {
    var images_urls = [];
    
    var images_conntainer = document.getElementById('images-container');
    var base_url = "https://commons.wikimedia.org/wiki/";
    
    $.ajax({
              url: "https://commons.wikimedia.org/w/api.php",
              dataType: "jsonp",
              data: {
                action: "query",
                list: "categorymembers",
                cmtype: "file",
                cmtitle: "Category:Unidentified_figure_skaters",
                cmlimit: 500,
                meta: "wbcontentlanguages",
                format: "json"
              }

            }).done( function( data ) {
             //console.log(data);
              var l = data.query.categorymembers;

              for(var i = 0; i < data.query.categorymembers.length; i++ ){
                images_urls.push(data.query.categorymembers[i]['title']);
              }
              
              for (var j in images_urls){
                $.ajax({
                  url: "https://commons.wikimedia.org/w/api.php",
                  dataType: "jsonp",
                  data: {
                    action: "query",
                    titles: images_urls[j],
                    prop:"imageinfo",
                    iiprop:"url",
                    cmlimit: 500,
                    format: "json"
                  }

                }).done(function(data2){
                  //console.log(data2);
                  for (var t in data2['query']['pages']){
                    console.log(data2['query']['pages'][t].title)
                    var element = document.createElement('img');
                    var div_container = document.createElement('div');
                    div_container.setAttribute('class', 'item');
                    element.src = data2['query']['pages'][t]['imageinfo'][0]['url'];
                    div_container.appendChild(element);
                    div_container.setAttribute('image-title', data2['query']['pages'][t].title);
                    images_conntainer.appendChild(div_container);
                    var firstDiv = document.querySelectorAll('.item')[0];
                    firstDiv.setAttribute('class', 'item active');
                    
                  }
                });
              }
            });
} );

 
