import * as x from "../src/entry";



// Family
var $elem = x.select( ".hello" );
var parent = x.parent( $elem );
var ancestors = x.flatten( x.ancestors( $elem ) );



// Classes
x.addClass( parent, "parent" );
x.addClass( ancestors, "ancestor test" );



// Create
var $div = x.create( "div", { dynamic: true }, [
  x.create( "h2", { "class": "title" }, "Hello, World!" ),
  x.create( "p", "How are you?" )
] );



// Content
var $h2 = x.firstChild( $div );

console.log( x.text( $h2 ) );


// CSS
x.styles( $h2, { fontWeight: "bold", fontSize: 25, color: "red" } );



// Build
x.append( $div, x.select( "main" ) );



// Attributes
console.log( "div is dynamic:", x.getAttr( $div, "dynamic" ) );
x.setAttrs( x.select( "html" ), { lang: "en" } );



// Events
var counter = 0;

var cb = x.live( $div, "h2", "click", function(  ) {
  counter++;

  alert( "Title clicked " + counter + " times!" );

  if ( counter >= 3 ) {
    x.off( $div, "click", cb );
  }

} );



// Props
console.log( "div is a " + x.getProp( $div, "nodeName" ) );
