import { childAt, childrenAt, parent, index } from "./family";
import { each } from "./util/array";
import * as is from "./util/is";



export function append( $children, $parent ) {

  each( $children, function( $child ) {
    $parent.appendChild( $child );
  } );

}



export function prepend( $children, $parent ) {

  if ( $parent.children.length ) {
    insertBefore( $children, $parent.children[ 0 ] );
  } else {
    append( $children, $parent );
  }

}



export function insertBefore( $children, $sibling ) {
  var $parent = parent( $sibling );

  each( $children, function( $child ) {
    $parent.insertBefore( $child, $sibling );
  } );

}



export function insertAfter( $children, $sibling ) {
  var $parent = parent( $sibling );
  var i = index( $sibling );

  insertAt( $children, $parent, i );

}



export function insertAt( $children, $parent, i ) {
  var $sibling = $parent.children[ i + 1 ];

  if ( is.defined( $sibling ) ) {
    insertBefore( $children, $sibling );
  } else {
    append( $children, $parent );
  }

}



export function remove( $elems ) {

  each( $elems, function( $elem ) {
    parent( $elem ).removeChild( $elem );
  } );

}



export function removeAt( $parent, from, to ) {
  remove( is.number( to ) ? childrenAt( $parent, from, to ) : childAt( $parent, from ) );
}



export function replace( $new, $old ) {
  // Not using replaceChild because it doesn't allow inserting multiple children

  insertBefore( $new, $old );
  remove( $old );

}
