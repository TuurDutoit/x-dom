import { matches } from "./select";
import { each, first, last, slice, indexOf } from "./util/array";
import * as is from "./util/is";



export function firstChild( $elem ) {
  return first( $elem ).children[ 0 ];
}



export function lastChild( $elem ) {
  return last( first( $elem ).children );
}



export function childAt( $parent, index ) {
  return $parent.children[ index ];
}



export function childrenAt( $parent, from, to ) {
  return slice( $parent.children, from, to );
}



export function children( $elems ) {

  // Optimize case where $elems is just one element
  // Also convert to an Array, as a HTMLCollection is live
  // and could cause unexpected behaviour when expecting an Array
  if ( is.node( $elems ) ) {

    return Array.from( $elems.children );

  } else {
    var $children = [];

    each( $elems, function( $elem ) {
      $children.push( $elem.children );
    } );

    return $children;
  }

}



export function descendants( $elems, all, $descendants = [] ) {

  each( $elems, function( $elem ) {
    var hasChildren = $elem.children.length;

    if ( all || !hasChildren ) {
      $descendants.push( $elem );
    }

    if ( hasChildren ) {
      $descendants.push( ...descendants( $elem, all, $descendants ) );
    }

  } );

  return $descendants;
}



export function parent( $elems, sel ) {

  if ( is.string( sel ) ) {

    return each( $elems, function( $elem ) {
      var $parents = parents( $elem );

      return each( $parents, function( $parent ) {

        if ( matches( $parent, sel ) ) {
          return $parent;
        }

      } );

    } );

  } else {

    return first( $elems ).parentElement;

  }

}



export function parents( $elems, sel ) {
  var parents = [];

  each( $elems, function( $elem ) {
    var $parent = $elem.parentElement;

    if ( !sel || matches( $parent, sel ) ) {
      parents.push( $parent );
    }

  } );

  return parents;
}



export function ancestors( $elems, sel ) {
  var ancestors = [];

  each( $elems, function( $elem ) {
    var parents = [];

    while ( ( $elem = $elem.parentElement ) ) {

      if ( !sel || matches( $elem, sel ) ) {
        parents.push( $elem );
      }

    }

    ancestors.push( parents );

  } );

  return ancestors;
}



export function isAncestor( $ancestor, $descendants ) {

  return each( $descendants, function( $elem ) {

    while ( $elem ) {
      $elem = $elem.parentElement;

      if ( $elem === $ancestor ) {
        return true;
      }

    }

  } );

}



export function next( $elem ) {
  return first( $elem ).nextElementSibling;
}



export function prev( $elem ) {
  return first( $elem ).previouElementsSibling;
}



export function siblings( $elem ) {
  return previousSiblings( $elem ).concat( nextSiblings( $elem ) );
}



export function previousSiblings( $elem ) {
  var $siblings = [];
  var $elem = first( $elem );

  while ( $elem ) {
    var $sibling =  $elem.previousElementSibling;

    $siblings.push( $sibling );
    $elem = $sibling;

  }

  return $siblings;
}



export function nextSiblings( $elem ) {
  var $siblings = [];
  var $elem = first( $elem );

  while ( $elem ) {
    var $sibling = $elem.nextElementSibling;

    $siblings.push( $sibling );
    $elem = $sibling;

  }

  return $siblings;
}



export function index( $elem ) {

  if ( !$elem.parentElement ) {
    return -1;
  }

  return indexOf( $elem.parentElement.children, $elem );
}
