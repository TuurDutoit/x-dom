import { each } from "./util/array";
import { matches } from "./select";



export function on( $elems, event, cb, opts = false ) {

  each( $elems, function( $elem ) {
    $elem.addEventListener( event, cb, opts );
  } );

}



export function off( $elems, event, cb, opts = false ) {

  each( $elems, function( $elem ) {
    $elem.removeEventListener( event, cb, opts );
  } );

}



export function live( $elems, sel, event, cb, opts ) {

  function liveCallback( e ) {
    var $target = e.target || e.srcElement;

    if ( matches( $target, sel ) ) {
      cb( e );
    }

  }

  on( $elems, event, liveCallback, opts );

  return liveCallback;
}
