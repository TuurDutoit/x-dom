import { each, first } from "./util/array";
import * as is from "./util/is";



export function attr( $elems, name, val ) {

  if ( is.string( name ) ) {

    if ( is.defined( val ) ) {
      setAttr( $elems, name, val );
    } else {
      return getAttr( $elems, name );
    }

  } else {

    setAttrs( $elems, name );

  }

}



export function setAttr( $elems, name, val ) {

  if ( !val ) {
    return removeAttr( $elems, name );
  }

  if ( val === true ) {
    val = name;
  }

  each( $elems, function( $elem ) {
    $elem.setAttribute( name, val );
  } );

}



export function setAttrs( $elems, attrs ) {

  for ( var name in attrs ) {
    setAttr( $elems, name, attrs[ name ] );
  }

}



export function getAttr( $elems, name ) {
  return first( $elems ).getAttribute( name );
}



export function rmAttr( $elems, attrs ) {

  if ( is.string( attrs ) ) {
    removeAttr( $elems, attrs );
  } else {
    removeAttrs( $elems, attrs );
  }

}



export function removeAttr( $elems, name ) {

  each( $elems, function( $elem ) {
    $elem.removeAttribute( name );
  } );

}



export function removeAttrs( $elems, attrs ) {

  each( attrs, function( name ) {
    removeAttr( $elems, name );
  } );

}
