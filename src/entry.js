window.$ = $;
window.jQuery = jQuery;
var riot = require('riot');
window.riot = riot;
require('./riot-hot-reload.js');

function loadResources() {
   var requireHtml = require.context('./app', true, /\.html$/);
   requireAll(requireHtml);

   var requireCss = require.context('./app', true, /\.css$/);
   requireAll(requireCss);

   var requireJs = require.context('./app', true, /^([^.]*?\.(?!spec\.))+js$/);
   requireAll(requireJs);

   var requireImage = require.context('./app', true, /\.jpe?g|.png|.gif$/i);
   requireAll(requireImage);

   var requireTag = require.context('./app', true, /\.tag(\.html)?$/i);
   requireAll(requireTag);
}

function requireAll(require) {
   require.keys().forEach(function(key) {
      require(key);
   });
}

loadResources();

var tags = riot.mount('*');
