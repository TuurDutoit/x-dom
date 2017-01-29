import { each, first } from "./util/array";
import * as is from "./util/is";



export function prop( $elems, name, val ) {

  if ( is.object( name ) ) {
    setProps( $elems, name );
  } else if ( is.defined( val ) ) {
    setProp( $elems, name, val );
  } else {
    return getProp( $elems, name );
  }

}



export function setProp( $elems, name, val ) {

  each( $elems, function( $elem ) {
    $elem[ name ] = val;
  } );

}



export function setProps( $elems, props ) {

  for ( var name in props ) {
    setProp( $elems, name, props[ name ] );
  }

}



export function getProp( $elems, prop ) {
  return first( $elems )[ prop ];
}



export function rmProp( $elems, props ) {

  if ( is.string( props ) ) {
    removeProp( $elems, props );
  } else {
    removeProps( $elems, props );
  }

}



export function removeProp( $elems, name ) {
  setProp( $elems, name, undefined );
}



export function removeProps( $elems, props ) {

  each( props, function( name ) {
    setProp( $elems, name, undefined );
  } );

}
