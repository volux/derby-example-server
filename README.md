# derby-example-server

DerbyJS server for components demonstration

````
$ npm install --save volux/derby-example-server
````

````javascript
var options = {
    'path': {
        'public': './public',
        'favicon': '/images/favicon.ico'
    },
    'prebundle': [],
    'MONGO_URL': 'mongodb://localhost:27017/examples',
    'SESSION_SECRET': 'your-session-secret',
    'SESSION_COOKIE': 'your-session-cookie'
};
var apps = [
  require('./apps/examples')
];

require('derby-example-server')(options, apps);
````