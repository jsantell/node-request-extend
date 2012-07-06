node-line-cutter
================

Cuts in line of your middleware and adds references to request

## Installation ##

`npm install line-cutter`

## Methods ##

`lineCutter([namespace,] object [, force]);`
Merges `object`'s keys and values with a routes request variable, which optionally can be contained under a property of `namespace`. `force` defaults to true, and controls whether or not `object` values should overwrite properties already on the request variable.

## Usage ##

```javascript```
var
  express = require( 'express' ),
  lineCutter = require( 'line-cutter' ),
  app = express.createServer();

var
  models = {
    user : require( './models/user' ),
    data : require( './models/data' )
  },
  config = require( './config' );

app.configure(function () {
  app.set( 'views', __dirname + '/views' );
  app.set( 'view engine', 'jade' );
  app.use( lineCutter( 'models', models ));
  app.use( lineCutter( 'config', config ));
  app.use( express.static( __dirname + '/public' ));
  app.use( app.router );
});
```

Adds `req.models.user`, `req.models.data` and `req.config` to all requests in your routes.

```javascript
app.get( '/users', function ( req, res, next ) {
  res.render( 'users', { users: req.models.user });
});
```

## Tests ##

Run `node tests/runTests.js` from project root -- testing uses `nodeunit`
