//console.log( 'this is a test');
function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
    var settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: sparqlQuery }
    };
    return $.ajax( endpointUrl, settings ).then( doneCallback );
}

var answers = $('#answer-yes');
answers.click( function(){
    var cat = $('#category-name').text;
    var endpointUrl = 'https://query.wikidata.org/sparql',
	sparqlQuery = "SELECT ?competitionLabel ?skater ?skaterLabel ?disciplineLabel ?genderLabel\n" +
        "WHERE {\n" +
        "  ?competition wdt:P31 wd:Q2990963 .\n" +
        "  ?competition wdt:P527 ?part .\n" +
        "  { ?part wdt:P710 ?skater .}\n" +
        "  UNION\n" +
        "  { ?part p:P710 ?statement .\n" +
        "  ?statement ps:P710 ?partner ;\n" +
        "             pq:P1706 ?skater .}\n" +
        "  ?part wdt:P641 ?discipline .\n" +
        "  OPTIONAL { ?skater wdt:P21 ?gender .}\n" +
        "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\". }\n" +
        "  }";
        
var get_select = document.getElementById('skater-list-select');

makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
		$( 'body' ).append( $( '<pre>' ).text( JSON.stringify( data ) ) );
        var y = data.results.bindings;
        var nameList = [];
        
        for(var k in y){
            var resp = y[k].skaterLabel.value;
            nameList.push(y[k].skaterLabel.value);            
        }
        
        console.log(nameList.length);
        
        for(var e = 0; e < nameList.length; e++){
            var options = document.createElement('option');
            options.value = nameList.sort()[e];
            options.text = nameList.sort()[e];
            get_select.appendChild(options);
            //console.log(nameList.sort()[e]);
        }
	}
);
    
});
