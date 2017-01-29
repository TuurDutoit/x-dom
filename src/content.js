import { each, first } from "./util/array";
import * as is from "./util/is";



export function html( $elems, html ) {

  if ( is.string( html ) ) {
    setHTML( $elems, html );
  } else {
    return getHTML( $elems );
  }

}



export function getHTML( $elems ) {
  return first( $elems ).innerHTML;
}



export function setHTML( $elems, html ) {

  each( $elems, function( $elem ) {
    $elem.innerHTML = html;
  } );

}



export function text( $elems, text ) {

  if ( is.string( text ) ) {
    setText( $elems, text );
  } else {
    return getText( $elems );
  }

}



export function getText( $elems ) {
  return first( $elems ).textContent;
}



export function setText( $elems, text ) {

  each( $elems, function( $elem ) {
    $elem.textContent = text;
  } );

}
