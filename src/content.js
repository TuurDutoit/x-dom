import { each, first } from "./util/array";
import * as is from "./util/is";



export function html( $elems, html ) {

  if ( is.string( html ) ) {

    each( $elems, function( $elem ) {
      $elem.innerHTML = html;
    } );

  } else {

    return first( $elems ).innerHTML;

  }

}



export function text( $elems, text ) {

  if ( is.string( text ) ) {

    each( $elems, function( $elem ) {
      $elem.textContent = text;
    } );

  } else {

    return first( $elems ).textContent;

  }

}
