export function string( val ) {
  return typeof( val ) === "string";
}

export function number( val ) {
  return typeof( val ) === "number";
}

export function bool( val ) {
  return typeof( val ) === "boolean";
}

export function object( val ) {
  return typeof( val ) === "object";
}

export function node( val ) {
  return ( "nodeType" in val );
}

export function element( val ) {
  return val.nodeType === Node.ELEMENT_NODE;
}

export function document( val ) {
  return val.nodeType === Node.DOCUMENT_NODE;
}

export function date( val ) {
  return ( val instanceof Date );
}

export function array( val ) {
  return Array.isArray( val );
}

export function arrayLike( val ) {
  return defined( val ) && !string( val ) && !node( val ) && number( val.length );
}

export function plainObject( val ) {
  return object( val ) && !node( val ) && !arrayLike( val ) && !date( val );
}

export function defined( val ) {
  return val != null;
}

export function undef( val ) {
  return val == null;
}
