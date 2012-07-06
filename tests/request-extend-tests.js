var
  reqExtend = require( '../request-extend' );
  req = {
    prop1 : 'a',
    prop2 : 'b',
    prop3 : 'c'
  }, res = undefined, next = function () {},
  mod = {
    name : 'request-extend',
    node : 'rocks'
  }

module.exports = {
  'apply with namespace' : function ( test ) {
    test.expect( 3 );
    var fn = reqExtend( 'namespace1', mod );
    fn( req, res, next );
    test.ok( req.prop1 === 'a', 'Properties should not be overwritten' );
    test.ok( req.namespace1, 'Namespace should be created' );
    test.ok( req.namespace1.name === 'request-extend', 'New properties should be under namespace' );
    test.done();
  },
  'apply with namespace, force' : function ( test ) {
    test.expect( 2 );
    var fn = reqExtend( 'namespace1', { node: 'superrocks', infinite: 'recursion' });
    fn( req, res, next );
    test.ok( req.namespace1.node === 'superrocks', 'Should override existing props' );
    test.ok( req.namespace1.infinite === 'recursion', 'Should make new properties' );
    test.done();
  },
  'apply with namespace, do not force' : function ( test ) {
    test.expect( 4 );
    var fn = reqExtend( 'namespace1', { name: 'newName', node: 'newNode', peanut: 'butter' }, false);
    fn( req, res, next );
    test.ok( req.prop1 === 'a', 'Properties should not be overwritten' );
    test.ok( req.namespace1, 'Namespace should be created' );
    test.ok( req.namespace1.name === 'request-extend', 'Prop should not be overwritten, force == false');
    test.ok( req.namespace1.peanut === 'butter', 'New property should be created, even with force == false');
    test.done();
  },
  'apply without namespace' : function ( test ) {
    test.expect( 3 );
    var fn = reqExtend({ prop4: 'd', prop2: '!' });
    fn( req, res, next );
    test.ok( req.prop4 === 'd', 'Should add new props straight to req obj' );
    test.ok( req.prop2 === '!', 'Should overwrite previous props straight on req obj' );
    test.ok( req.prop1 === 'a', 'Shouldn\'t touch other properties' );
    test.done();
  },
  'apply without namespace, do not force' : function ( test ) {
    test.expect( 3 );
    var fn = reqExtend({ prop1: '@', prop3: '@', prop5: '@' }, false);
    fn( req, res, next );
    test.ok( req.prop1 === 'a', 'Should not overwrite properties' );
    test.ok( req.prop3 === 'c', 'Should not overwrite properties' );
    test.ok( req.prop5 === '@', 'Should add new props straight to req obj' );
    test.done();
  }
};
