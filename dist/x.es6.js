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

  function array$1( val ) {
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
    array: array$1,
    arrayLike: arrayLike,
    plainObject: plainObject,
    defined: defined,
    undef: undef
  });

  var stub = [];



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



  function reduce( arr, value, cb ) {

    each( arr, function( item, index ) {

      value = cb( value, item, index, arr );

    } );

    return value;
  }



  function flatten( arr ) {

    if ( !arrayLike( arr ) ) {
      return [ arr ];
    }

    var res = [];

    for ( var i = 0, len = arr.length; i < len; i++ ) {

      if ( arrayLike( arr[ i ] ) ) {
        res.push( ...flatten( arr[ i ] ) );
      } else {
        res.push( arr[ i ] );
      }

    }

    return res;
  }



  function first( arr ) {
    return arrayLike( arr ) ? arr[ 0 ] : arr;
  }



  function last( arr ) {
    return arrayLike( arr ) ? arr[ arr.length - 1 ] : arr;
  }



  function slice( arr, from, to ) {
    return stub.slice.call( arr, from, to );
  }



  function indexOf( arr, item ) {
    return stub.indexOf.call( arr, item );
  }


  var array = Object.freeze({
    each: each,
    reduce: reduce,
    flatten: flatten,
    first: first,
    last: last,
    slice: slice,
    indexOf: indexOf
  });

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

    if ( !val ) {
      return removeAttr( $elems, name );
    }

    if ( val === true ) {
      val = name;
    }

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
      setHTML( $elems, html );
    } else {
      return getHTML( $elems );
    }

  }



  function getHTML( $elems ) {
    return first( $elems ).innerHTML;
  }



  function setHTML( $elems, html ) {

    each( $elems, function( $elem ) {
      $elem.innerHTML = html;
    } );

  }



  function text( $elems, text ) {

    if ( string( text ) ) {
      setText( $elems, text );
    } else {
      return getText( $elems );
    }

  }



  function getText( $elems ) {
    return first( $elems ).textContent;
  }



  function setText( $elems, text ) {

    each( $elems, function( $elem ) {
      $elem.textContent = text;
    } );

  }

  var $container = document.createElement( "div" );



  function create( tag, attrs, $children ) {
    var $elem = document.createElement( tag );

    if ( plainObject( attrs ) ) {
      setAttrs( $elem, attrs );
    } else {
      $children = attrs;
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



  function children( $elems, sel ) {

    // Optimize case where $elems is just one element
    // Also convert to an Array, as a HTMLCollection is live
    // and could cause unexpected behaviour when expecting an Array
    if ( node( $elems ) && !sel ) {

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



  function isChild( $elems, $child ) {
    return $child.parentElement === first( $elems );
  }



  function isChildOfAll( $elems, $child ) {
    $child = first( $child );

    return reduce( $elems, true, function( res, $elem ) {
      return res && isChild( $elem, $child );
    } );

  }



  function isChildOfSome( $elems, $child ) {
    $child = first( $child );

    return !!each( $elems, function( $elem ) {

      if ( isChild( $elem, $child ) ) {
        return true;
      }

    } );

  }



  function descendants( $elems, sel, all, $descendants = [] ) {

    if ( bool( sel ) ) {
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



  function isDescendant( $elems, $descendant ) {
    return isAncestor( $descendant, first( $elems ) );
  }



  function isDescendantOfAll( $elems, $descendant ) {
    $descendant = first( $descendant );

    return reduce( $elems, true, function( res, $elem ) {
      return res && isDescendant( $elem, $descendant );
    } );

  }



  function isDescendantOfSome( $elems, $descendant ) {
    $descendant = first( $descendant );

    return !!each( $elems, function( $elem ) {

      if ( isDescendant( $elem, $descendant ) ) {
        return true;
      }

    } );

  }



  function parent( $elems, sel ) {

    if ( string( sel ) ) {

      return each( $elems, function( $elem ) {

        if ( matches( $elem.parentElement, sel ) ) {
          return $elem;
        }

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



  function isParent( $elems, $parent ) {
    return first( $elems ).parentElement === first( $parent );
  }



  function isParentOfAll( $elems, $parent ) {
    $parent = first( $parent );

    return reduce( $elems, true, function( res, $elem ) {
      return res && isParent( $elem, $parent );
    } );

  }



  function isParentOfSome( $elems, $parent ) {
    $parent = first( $parent );

    return !!each( $elems, function( $elem ) {

      if ( isParent( $elem, $parent ) ) {
        return true;
      }

    } );

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



  function isAncestor( $ancestor, $descendant ) {
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



  function isAncestorOfAll( $ancestor, $descendants ) {
    $ancestor = first( $ancestor );

    return reduce( $descendants, true, function( res, $descendant ) {
      return res && isAncestor( $ancestor, $descendant );
    } );

  }



  function isAncestorOfSome( $ancestor, $descendants ) {
    $ancestor = first( $ancestor );

    return !!each( $descendants, function( $descendant ) {

      if ( isAncestor( $ancestor, $descendant ) ) {
        return true;
      }

    } );

  }



  function next( $elem ) {
    return first( $elem ).nextElementSibling;
  }



  function prev( $elem ) {
    return first( $elem ).previouElementsSibling;
  }



  function siblings( $elems, sel ) {
    return prevSiblings( $elems, sel ).concat( nextSiblings( $elems, sel ) );
  }



  function prevSiblings( $elems, sel ) {
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



  function nextSiblings( $elems, sel ) {
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



  function hasClass( $elems, klass ) {
    return first( $elems ).classList.contains( klass );
  }



  function allHaveClass( $elems, klass ) {

    return reduce( $elems, true, function( value, $elem ) {
      return value && $elem.classList.contains( klass );
    } );

  }



  function someHaveClass( $elems, klass ) {

    return !!each( $elems, function( $elem ) {

      if ( $elem.classList.contains( klass ) ) {
        return true;
      }

    } );

  }



  function prepare( classes ) {

    if ( string( classes ) ) {
      return classes.split( rWhitespace );
    }

    var newClasses = [];

    each( classes, function( klass ) {
      newClasses.push( ...klass.split( rWhitespace ) );
    } );

    return newClasses;
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

    if ( defined( val ) ) {
      setStyle( $elems, prop, val );
    } else {
      return getStyle( $elems, prop );
    }

  }



  function getStyle( $elems, prop ) {
    return first( $elems ).style[ prop ];
  }



  function setStyle( $elems, prop, val ) {
    prop = cssNameToJs( prop );

    if ( number( val ) ) {
      val += "px";
    }

    each( $elems, function( $elem ) {
      $elem.style[ prop ] = val;
    } );

  }



  function setStyles( $elems, styles ) {

    for ( var prop in styles ) {
      setStyle( $elems, prop, styles[ prop ] );
    }

  }



  function css( $elems, prop, val ) {
    return string( prop ) ? style( $elems, prop, val ) : setStyles( $elems, prop );
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

    if ( object( name ) ) {
      setProps( $elems, name );
    } else if ( defined( val ) ) {
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

  exports.array = array;
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
  exports.allHaveClass = allHaveClass;
  exports.someHaveClass = someHaveClass;
  exports.prepare = prepare;
  exports.html = html;
  exports.getHTML = getHTML;
  exports.setHTML = setHTML;
  exports.text = text;
  exports.getText = getText;
  exports.setText = setText;
  exports.create = create;
  exports.createHTML = createHTML;
  exports.cssNameToJs = cssNameToJs;
  exports.jsNameToCss = jsNameToCss;
  exports.style = style;
  exports.getStyle = getStyle;
  exports.setStyle = setStyle;
  exports.setStyles = setStyles;
  exports.css = css;
  exports.on = on;
  exports.off = off;
  exports.live = live;
  exports.firstChild = firstChild;
  exports.lastChild = lastChild;
  exports.childAt = childAt;
  exports.childrenAt = childrenAt;
  exports.children = children;
  exports.isChild = isChild;
  exports.isChildOfAll = isChildOfAll;
  exports.isChildOfSome = isChildOfSome;
  exports.descendants = descendants;
  exports.isDescendant = isDescendant;
  exports.isDescendantOfAll = isDescendantOfAll;
  exports.isDescendantOfSome = isDescendantOfSome;
  exports.parent = parent;
  exports.parents = parents;
  exports.isParent = isParent;
  exports.isParentOfAll = isParentOfAll;
  exports.isParentOfSome = isParentOfSome;
  exports.ancestors = ancestors;
  exports.isAncestor = isAncestor;
  exports.isAncestorOfAll = isAncestorOfAll;
  exports.isAncestorOfSome = isAncestorOfSome;
  exports.next = next;
  exports.prev = prev;
  exports.siblings = siblings;
  exports.prevSiblings = prevSiblings;
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

  Object.defineProperty(exports, '__esModule', { value: true });

}));