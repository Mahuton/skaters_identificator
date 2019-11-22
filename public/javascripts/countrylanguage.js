// Making requests on wikidata
// to feed the suhhestions array
$( function() {
    var suggestions = [];
    $.ajax({
              url: "https://www.wikidata.org/w/api.php",
              dataType: "jsonp",
              data: {
                action: "query",
                meta: "wbcontentlanguages",
                format: "json"
              }
            }).done( function( data ) {
                //console.log( data.query.wbcontentlanguages );
                var languages_code = data.query.wbcontentlanguages;
                for( var elements in languages_code ){
                  suggestions.push(elements);
                }
            });
        $( "#language-code" ).autocomplete({
          source: suggestions
        });
  } );
 
