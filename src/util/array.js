import * as is from "./is";

var stub = [];



export function each( arr, cb ) {

  if ( is.undef( arr ) ) {

    return;

  } else if ( is.arrayLike( arr ) ) {
    var res;

    for ( var i = 0, len = arr.length; i < len; i++ ) {
      res = cb( arr[ i ], i, arr );

      if ( is.defined( res ) ) {
        return res;
      }

    }

  } else {

    return cb( arr, 0, false );

  }

}



export function reduce( arr, value, cb ) {

  each( arr, function( item, index ) {

    value = cb( value, item, index, arr );

  } );

  return value;
}



export function flatten( arr ) {

  if ( !is.arrayLike( arr ) ) {
    return [ arr ];
  }

  var res = [];

  for ( var i = 0, len = arr.length; i < len; i++ ) {

    if ( is.arrayLike( arr[ i ] ) ) {
      res.push( ...flatten( arr[ i ] ) );
    } else {
      res.push( arr[ i ] );
    }

  }

  return res;
}



export function first( arr ) {
  return is.arrayLike( arr ) ? arr[ 0 ] : arr;
}



export function last( arr ) {
  return is.arrayLike( arr ) ? arr[ arr.length - 1 ] : arr;
}



export function slice( arr, from, to ) {
  return stub.slice.call( arr, from, to );
}



export function indexOf( arr, item ) {
  return stub.indexOf.call( arr, item );
}
