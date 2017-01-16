import { html as setContent } from "./content";
import { children } from "./family";
import { setAttrs } from "./attr";
import { append } from "./build";
import { each, unshift } from "./util/array";
import * as is from "./util/is";

var $container = document.createElement( "div" );



export function create( tag, attrs, $children = [] ) {
  var $elem = document.createElement( tag );

  if ( is.plainObject( attrs ) ) {
    setAttrs( $elem, attrs );
  } else if ( is.arrayLike( attrs ) ) {
    unshift( $children, attrs );
  } else if ( is.defined( attrs ) ) {
    $children.unshift( attrs );
  }

  each( $children, function( $child ) {

    if ( is.string( $child ) ) {
      $child = document.createTextNode( $child );
    }
    console.log( $child, $elem );
    append( $child, $elem );

  } );

  return $elem;
}



export function createHTML( html ) {

  setContent( $container, html );

  return children( $container );
}
