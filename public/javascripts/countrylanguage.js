// Making requests on wikidata
// to feed the suhhestions array

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
              var l = data.query.categorymembers;

              for(var i = 0; i < data.query.categorymembers.length; i++ ){
                //console.log(data.query.categorymembers[i]['title']);
                images_urls.push(data.query.categorymembers[i]['title']);
              }

              //console.log(images_urls.length);
              for (var j in images_urls){
                //console.log(images_urls[j]);
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
                  for (var t in data2['query']['pages']){
                    //console.log(data2['query']['pages'][t]['imageinfo'][0]['url']);
                    var element = document.createElement('img');
                    var div_container = document.createElement('div');
                    div_container.setAttribute('class', 'item');
                    element.src = data2['query']['pages'][t]['imageinfo'][0]['url'];
                    div_container.appendChild(element);
                    images_conntainer.appendChild(div_container);
                    var firstDiv = document.querySelectorAll('.item')[0];
                    firstDiv.setAttribute('class', 'item active');
                    
                  }
                });

              }


            });

} );

//var firstDiv = document.querySelectorAll('.card-body')[0].style.border="solid red";
//firstDiv.setAttribute('class', 'item active');

//https://commons.wikimedia.org/w/api.php?action=query&titles=File:Albert%20Einstein%20Head.jpg&prop=imageinfo&iiprop=url


 
