function string( val ) {
  return typeof( val ) === "string";
}

function number( val ) {
  return typeof( val ) === "number";
}

function object( val ) {
  return typeof( val ) === "object";
}

function node( val ) {
  return ( "nodeType" in val );
}

function date( val ) {
  return ( val instanceof Date );
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



function map( arr, cb, self ) {
  return stub.map.call( arr, cb, self );
}



function unshift( arr, items ) {
  return stub.unshift.apply( arr, items );
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



function parent$1( $elems, sel ) {

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



function ancestors$1( $elems, sel ) {
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

function append( $children, $parent ) {

  each( $children, function( $child ) {
    $parent.appendChild( $child );
  } );

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

function getProp( $elems, prop ) {
  return first( $elems )[ prop ];
}

// Family
var $elem = select( ".hello" );
var parent = parent$1( $elem );
var ancestors = flatten( ancestors$1( $elem ) );



// Classes
addClass( parent, "parent" );
addClass( ancestors, "ancestor test" );



// Create
var $div = create( "div", { dynamic: true }, [
  create( "h2", { "class": "title" }, "Hello, World!" ),
  create( "p", "How are you?" )
] );



// Content
var $h2 = firstChild( $div );

console.log( text( $h2 ) );


// CSS
styles( $h2, { fontWeight: "bold", fontSize: 25, color: "red" } );



// Build
append( $div, select( "main" ) );



// Attributes
console.log( "div is dynamic:", getAttr( $div, "dynamic" ) );
setAttrs( select( "html" ), { lang: "en" } );



// Events
var counter = 0;

var cb = live( $div, "h2", "click", function(  ) {
  counter++;

  alert( "Title clicked " + counter + " times!" );

  if ( counter >= 3 ) {
    off( $div, "click", cb );
  }

} );



// Props
console.log( "div is a " + getProp( $div, "nodeName" ) );