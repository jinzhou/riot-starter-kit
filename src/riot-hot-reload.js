(function(global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('riot')) :
      typeof define === 'function' && define.amd ? define(['exports', 'riot'], factory) :
         factory((global.riotHotReload = global.riotHotReload || {}), global.riot);
}(this, (function(exports, riot) {
   'use strict';

   function reload(prop) {
      var tags = [];

      riot.util.styleManager.inject();

      var elems = document.querySelectorAll((prop + ", [data-is=" + prop + "]"));

      for(var i = 0; i < elems.length; i++) {
         var el = elems[i];
         var oldTag = el._tag;

         // unmount the old tag
         oldTag.unmount(true);

         // reset the innerHTML and attributes to how they were before mount
         el.innerHTML = oldTag.__.innerHTML;

         (oldTag.__.origAttrs || []).map(function(attr) {
            el.setAttribute(attr.name, attr.value);
         });

         // copy options for creating the new tag
         var newOpts = {};

         for(var key in oldTag.opts) {
            newOpts[key] = oldTag.opts[key];
         }

         newOpts.parent = oldTag.parent;

         // mount the new tag
         var newTag = riot.mount(el, newOpts)[0];

         tags.push(newTag);
      }

      return tags;
   }

   riot.reload = riot.default.reload = reload;

   exports.reload = reload;
   exports['default'] = reload;

   Object.defineProperty(exports, '__esModule', {value: true});

})));
