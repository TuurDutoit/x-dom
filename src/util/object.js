import { each } from "./array";
import * as is from "./is";



export function merge( base, ...objs ) {
  var val;

  each( objs, function( obj ) {

    for ( var key in obj ) {
      val = obj[ key ];

      if ( is.object( val ) ) {

        if ( is.defined( base[ key ] ) ) {
          merge( base[ key ], val );
        } else {
          base[ key ] = clone( val );
        }

      } else {

        base[ key ] = val;

      }

    }

  } );

  return base;
}



export function clone( obj ) {
  return merge( ( new ( obj.constructor ) ), obj );
}
