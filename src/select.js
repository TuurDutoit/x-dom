import { create } from "./create";
import { each } from "./util/array";
import * as is from "./util/is";



export function select( elem, sel, all ) {

  if ( is.string( elem ) ) {

    all = sel;
    sel = elem;
    elem = document;

  }

  if ( !sel ) {
    return elem;
  }

  return all ? elem.querySelectorAll( sel ) : elem.querySelector( sel );
}



export function matches( $elem, sel ) {
  return _matches.call( $elem, sel );
}



export function match( $elems, sel, getIndex ) {

  return each( $elems, function( $elem, i ) {

    if ( matches( $elem, sel ) ) {
      return getIndex ? i : $elem;
    }

  } );

}



export function matchAll( $elems, sel ) {

  return !each( $elems, function( $elem ) {
    // Return undefined when $elem matches, or true if it doesn't

    if ( !matches( $elem, sel ) ) {
      return true;
    }

  } );

}



export function matchesPolyfill( sel ) {
  var matches = select( sel, true );
  var i = matches.length;

  while ( --i >= 0 && matches[ i ] !== this ) {}

  return i > -1;
}



var $test = create( "p" );
var _matches = $test.matches ||
  $test.matchesSelector ||
  $test.webkitMatchesSelector ||
  $test.mozMatchesSelector ||
  $test.msMatchesSelector ||
  $test.oMatchesSelector ||
  matchesPolyfill;



export { _matches };
