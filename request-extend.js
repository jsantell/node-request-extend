// require('request-extend')( [ namespace ], object, [ force ] );
module.exports = function () {
  var
    args = Array.prototype.slice.call( arguments, 0 ),
    namespace, obj, force;
  
  if ( args[0] !== Object( args[0] )) {
    namespace = args.shift();
  }
  obj = args.shift();
  force = args.length ? args.shift() : true;

  var fn = function ( req, res, next ) {

    var request = namespace ? req[ namespace ] : req;
    request = request || ( req[ namespace ] = {} );

    Object.keys( obj ).forEach(function ( key ) {
      if ( force || request[ key ] === undefined ) {
        request[ key ] = obj[ key ];
      }
    });

    next();
  };
  return fn;
};
