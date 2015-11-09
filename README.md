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
    'prebundle': []
};
var apps = [
  require('./apps/example')
];

require('derby-example-server')(options, apps);
````