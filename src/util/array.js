import * as is from "./is";

var stub = [];


export function flatten( arr, res = [] ) {

  each( arr, function( item ) {

    if ( is.arrayLike( item ) ) {
      flatten( item, res );
    } else {
      res.push( item );
    }

  } );

  return res;
};



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



export function first( arr ) {
  return is.arrayLike( arr ) ? arr[ 0 ] : arr;
}



export function last( arr ) {
  return is.arrayLike( arr ) ? arr[ arr.length - 1 ] : arr;
}



export function map( arr, cb, self ) {
  return stub.map.call( arr, cb, self );
}



export function slice( arr, from, to ) {
  return stub.slice.call( arr, from, to );
}



export function indexOf( arr, item ) {
  return stub.indexOf.call( arr, item );
}



export function unshift( arr, items ) {
  return stub.unshift.apply( arr, items );
}
