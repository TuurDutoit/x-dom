import { each, first } from "./util/array";
import * as is from "./util/is";



export function cssNameToJs( name ) {

  return name.replace( /-[a-z]/, function( match ) {
    return match.charAt( 1 ).toUpperCase();
  } );

}



export function jsNameToCss( name ) {

  return name.replace( /[A-Z]/, function( match ) {
    return "-" + match.toLowerCase();
  } );

}



export function style( $elems, prop, val ) {

  if ( is.defined( val ) ) {
    setStyle( $elems, prop, val );
  } else {
    return getStyle( $elems, prop );
  }

}



export function getStyle( $elems, prop ) {
  return first( $elems ).style[ prop ];
}



export function setStyle( $elems, prop, val ) {
  prop = cssNameToJs( prop );

  if ( is.number( val ) ) {
    val += "px";
  }

  each( $elems, function( $elem ) {
    $elem.style[ prop ] = val;
  } );

}



export function setStyles( $elems, styles ) {

  for ( var prop in styles ) {
    setStyle( $elems, prop, styles[ prop ] );
  }

}



export function css( $elems, prop, val ) {
  return is.string( prop ) ? style( $elems, prop, val ) : setStyles( $elems, prop );
}
