//console.log( 'this is a test');
function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
    var settings = {
        headers: { Accept: 'application/sparql-results+json' },
        data: { query: sparqlQuery }
    };
    return $.ajax( endpointUrl, settings ).then( doneCallback );
}

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

makeSPARQLQuery( endpointUrl, sparqlQuery, function( data ) {
		$( 'body' ).append( $( '<pre>' ).text( JSON.stringify( data ) ) );
        for(var k = 0; k < data.length; k++){
            var resp = data[k].skaterLabel;
            console.log('ok' + resp);
        }
		console.log( data );
	}
);
