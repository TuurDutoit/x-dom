(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.$ = global.$ || {})));
}(this, function (exports) { 'use strict';

  function string( val ) {
    return typeof( val ) === "string";
  }

  function number( val ) {
    return typeof( val ) === "number";
  }

  function bool( val ) {
    return typeof( val ) === "boolean";
  }

  function object( val ) {
    return typeof( val ) === "object";
  }

  function node( val ) {
    return ( "nodeType" in val );
  }

  function element( val ) {
    return val.nodeType === Node.ELEMENT_NODE;
  }

  function document$1( val ) {
    return val.nodeType === Node.DOCUMENT_NODE;
  }

  function date( val ) {
    return ( val instanceof Date );
  }

  function array( val ) {
    return Array.isArray( val );
  }

  function arrayLike( val ) {
    return defined( val ) && !string( val ) && !node( val ) && number( val.length );
  }

  function plainObject( val ) {
    return object( val ) && !node( val ) && !arrayLike( val ) && !date( val );
  }

  function defined( val ) {
    return val != null;
  }

  function undef( val ) {
    return val == null;
  }


  var is = Object.freeze({
    string: string,
    number: number,
    bool: bool,
    object: object,
    node: node,
    element: element,
    document: document$1,
    date: date,
    array: array,
    arrayLike: arrayLike,
    plainObject: plainObject,
    defined: defined,
    undef: undef
  });

  var stub = [];


  function flatten( arr, res = [] ) {

    each( arr, function( item ) {

      if ( arrayLike( item ) ) {
        flatten( item, res );
      } else {
        res.push( item );
      }

    } );

    return res;
  };



  function each( arr, cb ) {

    if ( undef( arr ) ) {

      return;

    } else if ( arrayLike( arr ) ) {
      var res;

      for ( var i = 0, len = arr.length; i < len; i++ ) {
        res = cb( arr[ i ], i, arr );

        if ( defined( res ) ) {
          return res;
        }

      }

    } else {

      return cb( arr, 0, false );

    }

  }



  function first( arr ) {
    return arrayLike( arr ) ? arr[ 0 ] : arr;
  }



  function last( arr ) {
    return arrayLike( arr ) ? arr[ arr.length - 1 ] : arr;
  }



  function map( arr, cb, self ) {
    return stub.map.call( arr, cb, self );
  }



  function slice( arr, from, to ) {
    return stub.slice.call( arr, from, to );
  }



  function indexOf( arr, item ) {
    return stub.indexOf.call( arr, item );
  }



  function unshift( arr, items ) {
    return stub.unshift.apply( arr, items );
  }

  function attr( $elems, name, val ) {

    if ( string( name ) ) {

      if ( defined( val ) ) {
        setAttr( $elems, name, val );
      } else {
        return getAttr( $elems, name );
      }

    } else {

      setAttrs( $elems, name );

    }

  }



  function setAttr( $elems, name, val ) {

      each( $elems, function( $elem ) {
        $elem.setAttribute( name, val );
      } );

  }



  function setAttrs( $elems, attrs ) {

    for ( var name in attrs ) {
      setAttr( $elems, name, attrs[ name ] );
    }

  }



  function getAttr( $elems, name ) {
    return first( $elems ).getAttribute( name );
  }



  function rmAttr( $elems, attrs ) {

    if ( string( attrs ) ) {
      removeAttr( $elems, attrs );
    } else {
      removeAttrs( $elems, attrs );
    }

  }



  function removeAttr( $elems, name ) {

    each( $elems, function( $elem ) {
      $elem.removeAttribute( name );
    } );

  }



  function removeAttrs( $elems, attrs ) {

    each( attrs, function( name ) {
      removeAttr( $elems, name );
    } );

  }

  function html( $elems, html ) {

    if ( string( html ) ) {

      each( $elems, function( $elem ) {
        $elem.innerHTML = html;
      } );

    } else {

      return first( $elems ).innerHTML;

    }

  }



  function text( $elems, text ) {

    if ( string( text ) ) {

      each( $elems, function( $elem ) {
        $elem.textContent = text;
      } );

    } else {

      return first( $elems ).textContent;

    }

  }

  var $container = document.createElement( "div" );



  function create( tag, attrs, $children = [] ) {
    var $elem = document.createElement( tag );

    if ( plainObject( attrs ) ) {
      setAttrs( $elem, attrs );
    } else if ( arrayLike( attrs ) ) {
      unshift( $children, attrs );
    } else if ( defined( attrs ) ) {
      $children.unshift( attrs );
    }

    each( $children, function( $child ) {

      if ( string( $child ) ) {
        $child = document.createTextNode( $child );
      }
      console.log( $child, $elem );
      append( $child, $elem );

    } );

    return $elem;
  }



  function createHTML( html$$ ) {

    html( $container, html$$ );

    return children( $container );
  }

  function select( elem, sel, all ) {

    if ( string( elem ) ) {

      all = sel;
      sel = elem;
      elem = document;

    }

    if ( !sel ) {
      return elem;
    }

    return all ? elem.querySelectorAll( sel ) : elem.querySelector( sel );
  }



  function matches( $elem, sel ) {
    return _matches.call( $elem, sel );
  }



  function match( $elems, sel, getIndex ) {

    return each( $elems, function( $elem, i ) {

      if ( matches( $elem, sel ) ) {
        return getIndex ? i : $elem;
      }

    } );

  }



  function matchAll( $elems, sel ) {

    return !each( $elems, function( $elem ) {
      // Return undefined when $elem matches, or true if it doesn't

      if ( !matches( $elem, sel ) ) {
        return true;
      }

    } );

  }



  function matchesPolyfill( sel ) {
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

  function firstChild( $elem ) {
    return first( $elem ).children[ 0 ];
  }



  function lastChild( $elem ) {
    return last( first( $elem ).children );
  }



  function childAt( $parent, index ) {
    return $parent.children[ index ];
  }



  function childrenAt( $parent, from, to ) {
    return slice( $parent.children, from, to );
  }



  function children( $elems ) {

    // Optimize case where $elems is just one element
    // Also convert to an Array, as a HTMLCollection is live
    // and could cause unexpected behaviour when expecting an Array
    if ( node( $elems ) ) {

      return Array.from( $elems.children );

    } else {
      var $children = [];

      each( $elems, function( $elem ) {
        $children.push( $elem.children );
      } );

      return $children;
    }

  }



  function descendants( $elems, all, $descendants = [] ) {

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



  function parent( $elems, sel ) {

    if ( string( sel ) ) {

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



  function parents( $elems, sel ) {
    var parents = [];

    each( $elems, function( $elem ) {
      var $parent = $elem.parentElement;

      if ( !sel || matches( $parent, sel ) ) {
        parents.push( $parent );
      }

    } );

    return parents;
  }



  function ancestors( $elems, sel ) {
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



  function isAncestor( $ancestor, $descendants ) {

    return each( $descendants, function( $elem ) {

      while ( $elem ) {
        $elem = $elem.parentElement;

        if ( $elem === $ancestor ) {
          return true;
        }

      }

    } );

  }



  function next( $elem ) {
    return first( $elem ).nextElementSibling;
  }



  function prev( $elem ) {
    return first( $elem ).previouElementsSibling;
  }



  function siblings( $elem ) {
    return previousSiblings( $elem ).concat( nextSiblings( $elem ) );
  }



  function previousSiblings( $elem ) {
    var $siblings = [];
    var $elem = first( $elem );

    while ( $elem ) {
      var $sibling =  $elem.previousElementSibling;

      $siblings.push( $sibling );
      $elem = $sibling;

    }

    return $siblings;
  }



  function nextSiblings( $elem ) {
    var $siblings = [];
    var $elem = first( $elem );

    while ( $elem ) {
      var $sibling = $elem.nextElementSibling;

      $siblings.push( $sibling );
      $elem = $sibling;

    }

    return $siblings;
  }



  function index( $elem ) {

    if ( !$elem.parentElement ) {
      return -1;
    }

    return indexOf( $elem.parentElement.children, $elem );
  }

  function append( $children, $parent ) {

    each( $children, function( $child ) {
      $parent.appendChild( $child );
    } );

  }



  function prepend( $children, $parent ) {

    if ( $parent.children.length ) {
      insertBefore( $children, $parent.children[ 0 ] );
    } else {
      append( $children, $parent );
    }

  }



  function insertBefore( $children, $sibling ) {
    var $parent = parent( $sibling );

    each( $children, function( $child ) {
      $parent.insertBefore( $child, $sibling );
    } );

  }



  function insertAfter( $children, $sibling ) {
    var $parent = parent( $sibling );
    var i = index( $sibling );

    insertAt( $children, $parent, i );

  }



  function insertAt( $children, $parent, i ) {
    var $sibling = $parent.children[ i + 1 ];

    if ( defined( $sibling ) ) {
      insertBefore( $children, $sibling );
    } else {
      append( $children, $parent );
    }

  }



  function remove( $elems ) {

    each( $elems, function( $elem ) {
      parent( $elem ).removeChild( $elem );
    } );

  }



  function removeAt( $parent, from, to ) {
    remove( number( to ) ? childrenAt( $parent, from, to ) : childAt( $parent, from ) );
  }



  function replace( $new, $old ) {
    // Not using replaceChild because it doesn't allow inserting multiple children

    insertBefore( $new, $old );
    remove( $old );

  }

  var rWhitespace = /\s+/;



  function addClass( $elems, classes ) {
    classes = prepare( classes );

    each( classes, function( klass ) {

      each( $elems, function( $elem ) {

        $elem.classList.add( klass );
      } );

    } );

  }



  function removeClass( $elems, classes ) {
    classes = prepare( classes );

    each( classes, function( klass ) {

      each( $elems, function( $elem ) {
        $elem.classList.remove( klass );
      } );

    } );

  }



  function toggleClass( $elems, classes, force ) {
    classes = prepare( classes );
    var isObject = object( force );

    each( classes, function( klass ) {
      var f = isObject ? force[ klass ] : force;

      if ( f === "all" ) {
        f = hasClass( $elems, klass );
      }

      each( $elems, function( $elem ) {
        // Using DOM API to remove unnecessary overhead from addClass and removeClass

        if ( defined( f ) ) {

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



  function hasClass( $elem, klass ) {
    return first( $elem ).classList.contains( klass );
  }



  function prepare( classes ) {

    if ( string( classes ) ) {
      return classes.split( rWhitespace );
    }

    classes = map( classes, function( klass ) {
      return klass.split( rWhitespace );
    } );

    return flatten( classes );
  }

  function cssNameToJs( name ) {

    return name.replace( /-[a-z]/, function( match ) {
      return match.charAt( 1 ).toUpperCase();
    } );

  }



  function jsNameToCss( name ) {

    return name.replace( /[A-Z]/, function( match ) {
      return "-" + match.toLowerCase();
    } );

  }



  function style( $elems, prop, val ) {
    prop = cssNameToJs( prop );

    if ( number( val ) ) {
      val += "px";
    }

    each( $elems, function( $elem ) {
      $elem.style[ prop ] = val;
    } );

  }



  function styles( $elems, styles ) {

    for ( var prop in styles ) {
      style( $elems, prop, styles[ prop ] );
    }

  }



  function css( $elems, prop, val ) {
    return string( prop ) ? style( $elems, prop, val ) : styles( $elems, prop );
  }

  function on( $elems, event, cb, opts = false ) {

    each( $elems, function( $elem ) {
      $elem.addEventListener( event, cb, opts );
    } );

  }



  function off( $elems, event, cb, opts = false ) {

    each( $elems, function( $elem ) {
      $elem.removeEventListener( event, cb, opts );
    } );

  }



  function live( $elems, sel, event, cb, opts ) {

    function liveCallback( e ) {
      var $target = e.target || e.srcElement;

      if ( matches( $target, sel ) ) {
        cb( e );
      }

    }

    on( $elems, event, liveCallback, opts );

    return liveCallback;
  }

  function prop( $elems, name, val ) {

    if ( defined( val ) ) {
      setProp( $elems, name, val );
    } else {
      return getProp( $elems, name );
    }

  }



  function setProp( $elems, name, val ) {

    each( $elems, function( $elem ) {
      $elem[ name ] = val;
    } );

  }



  function setProps( $elems, props ) {

    for ( var name in props ) {
      setProp( $elems, name, props[ name ] );
    }

  }



  function getProp( $elems, prop ) {
    return first( $elems )[ prop ];
  }



  function rmProp( $elems, props ) {

    if ( string( props ) ) {
      removeProp( $elems, props );
    } else {
      removeProps( $elems, props );
    }

  }



  function removeProp( $elems, name ) {
    setProp( $elems, name, undefined );
  }



  function removeProps( $elems, props ) {

    each( props, function( name ) {
      setProp( $elems, name, undefined );
    } );

  }

  function merge( base, ...objs ) {
    var val;

    each( objs, function( obj ) {

      for ( var key in obj ) {
        val = obj[ key ];

        if ( object( val ) ) {

          if ( defined( base[ key ] ) ) {
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



  function clone( obj ) {
    return merge( ( new ( obj.constructor ) ), obj );
  }

  exports.is = is;
  exports.attr = attr;
  exports.setAttr = setAttr;
  exports.setAttrs = setAttrs;
  exports.getAttr = getAttr;
  exports.rmAttr = rmAttr;
  exports.removeAttr = removeAttr;
  exports.removeAttrs = removeAttrs;
  exports.append = append;
  exports.prepend = prepend;
  exports.insertBefore = insertBefore;
  exports.insertAfter = insertAfter;
  exports.insertAt = insertAt;
  exports.remove = remove;
  exports.removeAt = removeAt;
  exports.replace = replace;
  exports.addClass = addClass;
  exports.removeClass = removeClass;
  exports.toggleClass = toggleClass;
  exports.hasClass = hasClass;
  exports.prepare = prepare;
  exports.html = html;
  exports.text = text;
  exports.create = create;
  exports.createHTML = createHTML;
  exports.cssNameToJs = cssNameToJs;
  exports.jsNameToCss = jsNameToCss;
  exports.style = style;
  exports.styles = styles;
  exports.css = css;
  exports.on = on;
  exports.off = off;
  exports.live = live;
  exports.firstChild = firstChild;
  exports.lastChild = lastChild;
  exports.childAt = childAt;
  exports.childrenAt = childrenAt;
  exports.children = children;
  exports.descendants = descendants;
  exports.parent = parent;
  exports.parents = parents;
  exports.ancestors = ancestors;
  exports.isAncestor = isAncestor;
  exports.next = next;
  exports.prev = prev;
  exports.siblings = siblings;
  exports.previousSiblings = previousSiblings;
  exports.nextSiblings = nextSiblings;
  exports.index = index;
  exports.prop = prop;
  exports.setProp = setProp;
  exports.setProps = setProps;
  exports.getProp = getProp;
  exports.rmProp = rmProp;
  exports.removeProp = removeProp;
  exports.removeProps = removeProps;
  exports.select = select;
  exports.matches = matches;
  exports.match = match;
  exports.matchAll = matchAll;
  exports.matchesPolyfill = matchesPolyfill;
  exports._matches = _matches;
  exports.flatten = flatten;
  exports.each = each;
  exports.first = first;
  exports.last = last;
  exports.map = map;
  exports.slice = slice;
  exports.indexOf = indexOf;
  exports.unshift = unshift;
  exports.merge = merge;
  exports.clone = clone;

  Object.defineProperty(exports, '__esModule', { value: true });

}));