import { matches } from "./select";
import { each, first, last, slice, indexOf, reduce } from "./util/array";
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



export function children( $elems, sel ) {

  // Optimize case where $elems is just one element
  // Also convert to an Array, as a HTMLCollection is live
  // and could cause unexpected behaviour when expecting an Array
  if ( is.node( $elems ) && !sel ) {

    return Array.from( $elems.children );

  } else {
    var $children = [];

    each( $elems, function( $elem ) {

      each( $elem.children, function( $child ) {

        if ( !sel || matches( $child, sel ) ) {
          $children.push( $child );
        }

      } );

    } );

    return $children;
  }

}



export function isChild( $elems, $child ) {
  return $child.parentElement === first( $elems );
}



export function isChildOfAll( $elems, $child ) {
  $child = first( $child );

  return reduce( $elems, true, function( res, $elem ) {
    return res && isChild( $elem, $child );
  } );

}



export function isChildOfSome( $elems, $child ) {
  $child = first( $child );

  return !!each( $elems, function( $elem ) {

    if ( isChild( $elem, $child ) ) {
      return true;
    }

  } );

}



export function descendants( $elems, sel, all, $descendants = [] ) {

  if ( is.bool( sel ) ) {
    all = sel;
    sel = null;
  }

  each( $elems, function( $elem ) {
    var hasChildren = $elem.children.length;

    if ( ( all || !hasChildren ) && ( !sel || matches( $elem, sel ) ) ) {
      $descendants.push( $elem );
    }

    if ( hasChildren ) {
      $descendants.push( ...descendants( $elem, all, $descendants ) );
    }

  } );

  return $descendants;
}



export function isDescendant( $elems, $descendant ) {
  return isAncestor( $descendant, first( $elems ) );
}



export function isDescendantOfAll( $elems, $descendant ) {
  $descendant = first( $descendant );

  return reduce( $elems, true, function( res, $elem ) {
    return res && isDescendant( $elem, $descendant );
  } );

}



export function isDescendantOfSome( $elems, $descendant ) {
  $descendant = first( $descendant );

  return !!each( $elems, function( $elem ) {

    if ( isDescendant( $elem, $descendant ) ) {
      return true;
    }

  } );

}



export function parent( $elems, sel ) {

  if ( is.string( sel ) ) {

    return each( $elems, function( $elem ) {

      if ( matches( $elem.parentElement, sel ) ) {
        return $elem;
      }

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



export function isParent( $elems, $parent ) {
  return first( $elems ).parentElement === first( $parent );
}



export function isParentOfAll( $elems, $parent ) {
  $parent = first( $parent );

  return reduce( $elems, true, function( res, $elem ) {
    return res && isParent( $elem, $parent );
  } );

}



export function isParentOfSome( $elems, $parent ) {
  $parent = first( $parent );

  return !!each( $elems, function( $elem ) {

    if ( isParent( $elem, $parent ) ) {
      return true;
    }

  } );

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



export function isAncestor( $ancestor, $descendant ) {
  var $elem = first( $descendant );
  var $ancestor = first( $ancestor );

  while ( $elem ) {
    $elem = $elem.parentElement;

    if ( $elem === $ancestor ) {
      return true;
    }

  }

  return false;
}



export function isAncestorOfAll( $ancestor, $descendants ) {
  $ancestor = first( $ancestor );

  return reduce( $descendants, true, function( res, $descendant ) {
    return res && isAncestor( $ancestor, $descendant );
  } );

}



export function isAncestorOfSome( $ancestor, $descendants ) {
  $ancestor = first( $ancestor );

  return !!each( $descendants, function( $descendant ) {

    if ( isAncestor( $ancestor, $descendant ) ) {
      return true;
    }

  } );

}



export function next( $elem ) {
  return first( $elem ).nextElementSibling;
}



export function prev( $elem ) {
  return first( $elem ).previouElementsSibling;
}



export function siblings( $elems, sel ) {
  return prevSiblings( $elems, sel ).concat( nextSiblings( $elems, sel ) );
}



export function prevSiblings( $elems, sel ) {
  var $siblings = [];

  each( $elems, function( $elem ) {
    var $sibling = prev( $elem );

    while ( $sibling ) {

      if ( !sel || matches( $sibling, sel ) ) {
        $siblings.push( $sibling );
      }

      $elem = $sibling;
      $sibling = prev( $elem );

    }

  } );

  return $siblings;
}



export function nextSiblings( $elems, sel ) {
  var $siblings = [];

  each( $elems, function( $elem ) {
    var $sibling = next( $elem );

    while ( $sibling ) {

      if ( !sel || matches( $sibling, sel ) ) {
        $siblings.push( $sibling );
      }

      $elem = $sibling;
      $sibling = next( $elem );

    }

  } );

  return $siblings;
}



export function index( $elem ) {

  if ( !$elem.parentElement ) {
    return -1;
  }

  return indexOf( $elem.parentElement.children, $elem );
}
