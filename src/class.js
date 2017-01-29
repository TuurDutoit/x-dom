import { first, each, reduce } from "./util/array";
import * as is from "./util/is";

var rWhitespace = /\s+/;



export function addClass( $elems, classes ) {
  classes = prepare( classes );

  each( classes, function( klass ) {

    each( $elems, function( $elem ) {

      $elem.classList.add( klass );
    } );

  } );

}



export function removeClass( $elems, classes ) {
  classes = prepare( classes );

  each( classes, function( klass ) {

    each( $elems, function( $elem ) {
      $elem.classList.remove( klass );
    } );

  } );

}



export function toggleClass( $elems, classes, force ) {
  classes = prepare( classes );
  var isObject = is.object( force );

  each( classes, function( klass ) {
    var f = isObject ? force[ klass ] : force;

    if ( f === "all" ) {
      f = hasClass( $elems, klass );
    }

    each( $elems, function( $elem ) {
      // Using DOM API to remove unnecessary overhead from addClass and removeClass

      if ( is.defined( f ) ) {

        if ( f ) {
          $elem.classList.add( klass );
        } else {
          $elem.classList.remove( klass );
        }

      } else if ( hasClass( $elem, klass ) ) {
        $elem.classList.remove( klass );
      } else {
        $elem.classList.add( klass );
      }

    } );

  } );

}



export function hasClass( $elems, klass ) {
  return first( $elems ).classList.contains( klass );
}



export function allHaveClass( $elems, klass ) {

  return reduce( $elems, true, function( value, $elem ) {
    return value && $elem.classList.contains( klass );
  } );

}



export function someHaveClass( $elems, klass ) {

  return !!each( $elems, function( $elem ) {

    if ( $elem.classList.contains( klass ) ) {
      return true;
    }

  } );

}



export function prepare( classes ) {

  if ( is.string( classes ) ) {
    return classes.split( rWhitespace );
  }

  var newClasses = [];

  each( classes, function( klass ) {
    newClasses.push( ...klass.split( rWhitespace ) );
  } );

  return newClasses;
}
