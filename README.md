xdom
====

A light, modern, pick-and-choose DOM library.

## Goal
`xdom` exposes a functional API very similar to native DOM, which makes it fast, easy to use and keeps it small.

Some of the stuff it does includes (but is not limited to):
 * some missing features of native DOM: `prepend()` to an element, live event binding, creating elements from an HTML string, etc.
 * transparently handling collections of DOM elements
 * facilitating the creation of complex DOM trees
 * abstracting away browser discrepancies

It does all that in just 8.6kB (minified).
And using ES6 tree shaking, that number can be brought down a whole lot more.

## Usage
The `dist` folder contains all the compiled packages (`es5`, `es6` and minified versions, all in UMD bundles), so you can just drop them into a `<script>` tag. The global variable (exported if no module system if found) is called `$`.  
The `src` folder contains the source code, which you can also import from, using ES6 modules. If you want to use tree shaking, you have to import from `src`, because the compiled bundles don't use ES6 modules.

## API
The source code is divided up into different files containing similar functions, e.g. `attr.js` contains `setAttr()` and `getAttr()`. This system is also used in these docs, which is useful for people importing directly from the source.
In the bundled versions, however, all the functions are methods on the exported object, e.g. `x.getAttr()` and `x.addClass()`. This is also the case when importing `src/entry.js`.

> __Note:__ the `element` type refers to a single DOM element, the `elements` type refers to an array (or array-like structure) of DOM elements and the `element(s)` type is used where either of them is accepted. Also note that whenever `element` is specified, you can also pass in an array of elements, in which case the first element will be used, and you can pass 1 element whenever multiple elements are expected, in which case it will be treated as an array of 1 element.


### attr
Get and set element attributes.

#### attr( element(s) $elems, string|object name, [string value] ) : [string value]
Shortcut for `getAttr()`, `setAttr()` and `setAttrs()`.
If `name` is an object, passes it to `setAttrs()`. If name is a string and `value` is defined, calls `setAttr()`, otherwise calls `getAttr()`.

#### setAttr( element(s) $elems, string name, string value )
Sets the attribute `name` to `value` on `$elems`, just like `DOMElement.setAttribute()`. If `value` is falsy, it removes the attribute, if it's `true`, it uses the attribute name, e.g. `disabled="disabled"`.

#### getAttr( element $elem, string name ) : string value
Gets the attribute `name` from `$elem`, like `DOMElement.getAttribute()`.

#### setAttrs( element(s) $elems, object attributes )
Given an `attributes` object, mapping names to values, calls `setAttr()` for every attribute.

#### rmAttr( element(s) $elems, string|string[] names )
Shortcut for `removeAttr()` and `removeAttrs()`.
If `attributes` is a string, calls `removeAttr()`, otherwise calls `removeAttrs()`.

#### removeAttr( element(s) $elems, string name )
Removes the attribute called `name` from `$elems`.

#### removeAttrs( element(s) $elems, string[] names )
Removes all attributes in `names` from `$elems`.


### build
Edit relations between DOM nodes, i.e. moving, inserting and removing elements.

#### append( element(s) $children, element $parent )
Appends `$children` to `$parent`.

#### prepend( element(s) $children, element $parent )
Prepend `$children` to `$parent`.

#### insertBefore( element(s) $elems, element $sibling )
Inserts `$elems` into `$sibling`'s parent, before `$sibling`.

#### insertAfter( element(s) $elems, element $sibling )
Inserts `$elems` into `$sibling`'s parent, after `$sibling`.

#### insertAt( element(s) $elems, element $parent, number index )
Inserts `$elems` into `$parent` at `index` (zero-based).

#### remove( element(s) $elems )
Removes `$elems` from the DOM.

#### removeAt( element $parent, number from, [number to] )
If `to` is a number, removes the children from `$parent`, from index `from` to index `to`. Otherwise, removes one child, at `from`.

#### replace( element(s) $new, element $old )
Replaces `$old` with `$new` in the DOM.


### class
Add, remove and toggle classes.

#### addClass( element(s) $elems, string|string[] classes )
Adds all the classes in `classes` to `$elems`. Strings can be a space-seperated list of classes (as you would find them in HTML).

#### removeClass( element(s) $elems, string|string[] classes )
Removes all the classes in `classes` from `$elems`. Strings can a space-seperated list of classes (as you would find them in HTML).

#### toggleClass( element(s) $elems, string|string[] classes, [boolean|string force = false] )
For each class in `classes` this function will toggle the class on each element in `$elems`. If force is `true`, the class will always be added, if `false`, the class will be removed from all elements.  
If `force` is the string `all`, the class will be toggled the same way for all elements, according to the first one, e.g. if the first element has the class, but the rest doesn't, it will be added to all elements.

#### hasClass( element $elem, string class ) : boolean hasThisClass
Checks whether `$elem` has the `class` class.

#### allHaveClass( element(s) $elems, string class ) : boolean hasThisClass
Checks whether all the `$elems` have the `class` class.

#### someHaveClass( element(s) $elems, string class ) : boolean hasThisClass
Checks whether at least one element of `$elems` has the `class` class.
 

### content
Get and set element's contents.

#### html( element(s) $elems, [string html] ) : [string html]
Shortcut for `setHTML()` and `getHTML()`.

#### getHTML( element $elem ) : string html
Gets `$elem`'s inner HTML.

#### setHTML( element(s) $elems, string html )
Sets (all) the elements's inner HTML.

#### text( elements(s) $elems, [string text] ) : [string html]
Shortcut for `getText()` and `setText()`.

#### getText( element $elem ) : string text
Gets `$elem`'s text content.

#### setText( element(s) $elems, string text )
Sets (all) the elements's text content.


### create
Create DOM elements and trees.

#### create( string tag, [object attributes], [string|string[]|element(s)] $children ) : element $newElement
Creates a new DOM element ith tag name `tag`. Optionally, you can add some attributes (passed to `setAttrs()`).  
You can also add some children, as a string or DOM element, or an array of strings and/or DOM elements. Strings will be converted to text nodes.  
This forgiving syntax allows for some pretty great stuff:

```javascript
create( "div", { dynamic: true }, [
  create( "h2", "Hello, World!" ),
  create( "p", [
    "How are you on this ",
    create( "span", { "class": "emphasize" }, "FINE"),
    " day?"
  ] )
] );
```
results in:
```html
<div dynamic="dynamic">
  <h2>Hello, World!</h2>
  <p>How are you on this <span class="emphasize">FINE</span> day?</p>
</div>
```

#### createHTML( string html ) : element[] result
Parses an HTML string and returns a list of DOM elements.


### css
Edit CSS styles of elements.

#### cssNameToJs( string cssName ) : string jsName
Converts a CSS property name to a JS name, e.g. `property-name` becomes `propertyName`.

#### jsNameToCss( string jsName ) : string cssName
Converts a JS name to a CSS property name, e.g. `propertyName` to `property-name`.

#### style( element(s) $elems, string prop, [any value] ) : [any value]
Shortcut for `setStyle()` and `getStyle()`.

#### getStyle( element $elem, string property ) : any value
Gets the value of the CSS `property` from `elem`. The property name is converted using `cssNameToJs()`.

#### setStyle( element(s) $elems, string property, any value )
Sets the CSS `property` to `value` on `$elems`. For numeric values, `px` is added at the end, if you don't want this, use a string. Property names are converted using `cssNameToJs()`.

#### setStyles( element(s) $elems, object styles )
Calls `setStyle()` for every `property: value` pair of `styles`.

#### css( element(s) $elems, string|object stylesOrProperty, [any value] ) : [any value]
Shortcut for `setStyles()` and `style()`.


### events
Add and remove event listeners.

#### on( element(s) $elems, string event, function listener, [boolean|object options = false] )
Attaches `listener` to the `event` on all `$elems`. The last argument is the `useCapture` flag, or an options object for more modern browsers. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) for more info. By default, `false` is used.

#### off( element(s) $elems, string event, function listener, [boolean|object options = false] )
Removes an event listener. Arguments are the same as for `on()`.

#### live( element(s) $elems, string selector, string event, function listener, [boolean|object options = false] ) : function callback
Adds a listener to all `$elems` that calls `listener` whenever the event target matches `selector`. The actual callback that is registered (i.e. the one that has to be passed to `off()`) is returned.


### family
Read out different relationships between DOM elements.

#### firstChild( element $parent ) : element firstChild
Returns `$parent`'s first child.

#### lastChild( element $parent ) : element lastChild
Returns `$parent`'s last child.

#### childAt( element $parent, number index ) : element child
Returns `$parent`'s child at `index`.

#### childrenAt( element $parent, number from, number to ) : element[] children
Returns `$parent`'s children at indexes from `from` to `to`.

#### children( element(s) $elems, [string selector] ) : element[] children
Returns all of `$elems`'s children as 1 array. Optionally filter children with a CSS `selector`.

#### isChild( element $child, element $elem ) : boolean isChild
Checks whether `$child` is a child of `$elem`.

#### isChildOfAll( , element $childelement(s) $elems ) : boolean isChild
Checks whether `$child` is a child of every element in `$elems`.

#### isChildOfSome( element $child, element(s) $elems ) : boolean isChild
Check whether `$child` is a child of at least one of the elements in `$elems`.

#### descendants( element(s) $elems, [string selector], [boolean all] ) : element[] descendants
Returns all descendants (children, grandchildren...) of `$elems`. Optionally filter them with a CSS selector. If `all` is `true`, include intermediate elements, otherwise only include elements that don't have children themselves (this is the default).

#### isDescendant( element $descendant, element $elem, ) : boolean isDescendant
Checks whether `$descendant` is a descendant of `$elem`.

#### isDescendantOfAll( element $descendant, element(s) $elems, ) : boolean isDescendant
Checks whether `$descendant` is a descendant of every element in `$elems`.

#### isDescendantOfSome( element $descendant, element(s) $elems, ) : boolean isDescendant
Check whether `$descendant` is a descendant of at least one of the elements in `$elems`.

#### parent( element(s) $elems, [string selector] ) : element parent
If a selector is passed, loops through all `$elems` and returns the first parent that matches `selector`. Otherwise, returns the parent of the first element.

#### parents( element(s) $elems, [string selector] ) : element[] parents
Returns all the parents of `$elems` that match `selector`, or all parents if no selector is passed.

#### isParent( element $parent, element $elem ) : boolean isParent
Checks whether `$parent` is a parent of `$elem`.

#### isParentOfAll( element $parent, element(s) $elems ) : boolean isParent
Checks whether `$parent` is a parent of every element in `$elems`.

#### isParentOfSome( element $parent, element(s) $elems ) : boolean isParent
Check whether `$parent` is a parent of at least one of the elements in `$elems`.

#### ancestors( element(s) $elems, [string selector] ) : element[] ancestors
Returns a list of all `$elems`'s ancestors (parents, grandparents...), optionally filtered with a CSS `selector`.

#### isAncestor( element $ancestor, element $descendant ) : boolean isAncestor
Checks whether `$ancestor` is an ancestor of `$descendant`.

#### isAncestorOfAll( element $ancestor, element(s) $descendants ) : boolean isAncestor
Checks whether `$ancestor` is an ancestor of all the elements of `$descendants`.

#### isAncestorOfSome( element $ancestor, element(s) $descendants ) : boolean isAncestor
Checks whether `$ancestor` is an ancestor of at least one of the elements of `$descendants`.

#### next( element $elem ) : element nextSibling
Returns `$elem`'s next (element) sibling, i.e. the element right after it.

#### prev( element $elem ) : element previousSibling
Returns `$elem`'s previous (element) sibling, i.e. the element that comes right in front of it.

#### siblings( element(s) $elems, [string selector] ) : element[] siblings
Returns all of `$elems`'s siblings as 1 array, optionally filtered with a CSS `selector`.

#### prevSiblings( element(s) $elems, [string selector] ) : element[] siblings
For each element in `$elems`, returns all its siblings in front of it. Results are returned as 1 big array, optionally filtered with a CSS `selector`.

#### nextSiblings( element(s) $elems, [string selector] ) : element[] siblings
For each element in `$elems`, returns all its siblings behind it. Results are returned as 1 big array, optionally filtered with a CSS `selector`.

#### index( element $elem ) : number index
Returns the index of `$elem` relative to its siblings, e.g. for a parent with 5 children, `$elem` in the middle, this function would return `2`.


### prop
Get, set and remove properties DOMElement objects.

#### prop( element(s) $elems, object|string name, [any value] ) : [any value]
Shortcut for `getProp()`, `setProp()` and `setProps()`.

#### setProp( element(s) $elems, string name, any value )
Sets the property called `name` to `value` on all `$elems`.

#### setProps( element(s) $elems, object props )
Calls `setProp()` for each `property: value` pair in `props`.

#### getProp( element $elem, string name ) : any value
Returns the value of the property called `name` from `$elem`.

#### rmProp( element(s) $elems, string|string[] names )
Shortcut for `removeProp()` and `removeProps()`.

#### removeProp( element(s) $elems, string name )
Removes the property called `name` from `$elems`.

#### removeProps( element(s) $elems, string[] names )
Calls `removeProp()` for every name in `names`.


### select
Select DOM elements and check if they match CSS selectors.

#### select( [element root = document], string selector, [boolean all = false] ) : element(s)
The `select()` function is used to query the DOM, but depending on its arguments, its behavior changes slightly.  
The `selector` is the only required attribute. If only that is passed, it just queries from the `document`, if a `root` is passed, it queries from there, i.e. `root.querySelector( selector )`. If `all` is `true`, it returns all matching elements (as a NodeList, not an Array!), using `querySelectorAll()`.

Some examples:
```js
var $main = select( "main" ); // select the <main> tag
var $articles = select( $main, "article[visible]", true ) // select all the <article>s with a 'visible' attribute in the <main> tag

// Log the title of each article
for(article in $articles) {
  console.log( select( article, ".title" ).textContent );
}
```

#### matches( element $elem, string selector ) : boolean match
Checks whether `$elem` matches `selector`.

#### match( elements $elems, string selector, [boolean getIndex = false] ) : number|element match
Returns the first element of `$elems` that matches `selector`, or `undefined` if none match. If `getIndex` is `true`, returns the index of that element in the `$elems` collection, rather than the element itself.

#### matchAll( elements $elems, string selector ) : boolean match
Checks whether all `$elems` match `selector`.


### util
xdom includes (and needs) some utilities in the `util` directory. The first one, called `is`, is a small type checking 'library'. The other functions are used to work with arrays and are grouped in `array.js`. `util.js` and `entry.js` export these two as `is` and `array` repectively, i.e. `xdom.is` maps to `util/is.js` and `xdom.array` maps to `util/array.js`.

### util/is
A simple type checking library. Usually, you just `import * as is from "xdom/src/util/is"` and just use it like `is.string(value)`, `is.arrayLike(value)` etc. If you're using ES5 modules or globals, use `xdom.is.string(value)` etc.  
The following is the documentation for all these test functions. I'll only list their names, without the arguments and return values, because they all follow the same pattern: `is.name( any value ) : boolean match`, where `name` is the name of the test, of course.

#### string
Checks if the value is a string.

#### number
Checks if the value is a number.

#### bool
Checks if the value is a boolean.

#### object
Checks if the value is an object, i.e. `typeof value === "object"`.

#### element
Checks if the value is a DOM element.

#### node
Checks if the value is a DOM node.

#### document
Checks if the value is a Date object.

#### document
Checks if the value is the `document` object.

#### array
Checks if the value is an Array (using `Array.isArray()`, so make sure to polyfill it!).

#### arrayLike
Checks if the value is an Array-like structure, like a NodeList or a HTMLCollection (or an Array...). It does this by checking that is has a `length` property and is not a string (which has this property, but is not considered array-like) or a node (which can have a `length` property if it's a TextNode).

#### plainObject 
Checks if the value is a plain object, i.e. if it's an object, but is not a Node, a Date, or array-like.

#### defined
Checks if a value is defined, i.e. it's not `undefined` or `null`.

#### undef
The opposite of `defined`.


### util/array
All array-related utilities. Many functions in xdom accept a single value, or an array of values; these utilities handle these cases transparently. You can import them directly from the source (e.g. `import { each } from "xdom/src/util/array"`) if you're using ES6 modules, otherwise use `xdom.array.each()` etc.

#### each( any|any[] values, function( any value, number index, any[]|false array ) handler ) : any
Calls `handler` for every item in `values`, be it an array, a single value, or even `undefined`. If `values` is array-like, behaves pretty much like `Array.forEach()`. If `values` is not array-like, `handler` is called once for this value. `index` will be 0, and `array` will be false. If `values` is `undefined` or `null`, `handler` is not called and `undefined` is returned.  
If `handler` returns anything, the loop breaks and this value is returned.

#### reduce( any|any[] values, any start, function( any accumulator, any value, number index, any[]|false array ) ) : any
Works like `Array.reduce()`, but with the same safeguards as `each()`.

#### flatten( any|any[] arr ) : any[] flattened
Converts a nested array into a single array, conserving the order of the elements. If `arr` is just a single value, returns an array containing that value.

#### first( any|any[] values ) : any first
Returns the first element of `values` if it's array-like, or `values` itself if it isn't.

#### last( any|any[] values ) : any last
Like `first()`, but returns the last element.

#### slice( any[] arr, number from, [number to] ) : any[] sliced
Like `Array.slice()`, but works with array-like objects.

#### indexOf( any[] arr, any item ) : number index
Like `Array.indexOf()`, but works with array-like objects.
