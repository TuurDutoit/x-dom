import * as $ from "../src/entry";



// Family
var $elem = $.select( ".hello" );
var parent = $.parent( $elem );
var ancestors = $.array.flatten( $.ancestors( $elem ) );



// Classes
$.addClass( parent, "parent" );
$.addClass( ancestors, "ancestor test" );



// Create
var $div = $.create( "div", { dynamic: true }, [
  $.create( "h2", { "class": "title" }, "Hello, World!" ),
  $.create( "p", "How are you?" )
] );



// Content
var $h2 = $.firstChild( $div );

console.log( $.text( $h2 ) );


// CSS
$.setStyles( $h2, { fontWeight: "bold", fontSize: 25, color: "red" } );



// Build
$.append( $div, $.select( "main" ) );



// Attributes
console.log( "div is dynamic:", $.getAttr( $div, "dynamic" ) );
$.setAttrs( $.select( "html" ), { lang: "en" } );



// Events
var counter = 0;

var cb = $.live( $div, "h2", "click", function(  ) {
  counter++;

  alert( "Title clicked " + counter + " times!" );

  if ( counter >= 3 ) {
    $.off( $div, "click", cb );
  }

} );



// Props
console.log( "div is a " + $.getProp( $div, "nodeName" ) );
