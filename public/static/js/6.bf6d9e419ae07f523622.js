webpackJsonp([6],{

/***/ "+SVv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./src/api/common.ts
var common = __webpack_require__("RS51");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/FileExplorer.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var FileExplorer = ({
  props: ['value', 'base'],
  data: function data() {
    return {
      items: []
    };
  },

  watch: {
    value: {
      immediate: true,
      handler: function handler(v) {
        if (v) {
          this.loadItems(v);
        }
      }
    }
  },
  methods: {
    next: function next(item) {
      if (!item.dir) {
        return;
      }
      this.$emit('input', item.path);
    },
    loadItems: function loadItems(path) {
      var _this = this;

      Object(common["f" /* listFiles */])(path).then(function (items) {
        _this.items = items.sort(function (prev, next) {
          return prev.dir ? -1 : 1;
        }).map(function (item) {
          return assign_default()(item, {
            icon: item.dir ? 'folder' : 'assignment',
            url: '/product' + item.path.replace(_this.basedir, '')
          });
        });
      });
    }
  },
  computed: {
    bitems: function bitems() {
      var items = this.value.replace(this.base, '').split(/\\|\//);
      var i = this.base.lastIndexOf('/');
      var basename = this.base.substring(i + 1);
      if (items.length === 0) {
        items.push(basename);
      } else {
        items[0] = basename;
      }
      items.reduce(function (state, name, index) {
        state.push(name);
        items[index] = {
          name: name,
          disabled: index === items.length - 1,
          path: state.join('/'),
          dir: true
        };
        return state;
      }, [this.basedir]);
      return items;
    },
    basedir: function basedir() {
      var i = this.base.lastIndexOf('/');
      return this.base.substring(0, i);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-689dfed5","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/FileExplorer.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',[_c('v-breadcrumbs',{attrs:{"divider":"/"}},_vm._l((_vm.bitems),function(item,i){return _c('v-breadcrumbs-item',{key:i,attrs:{"disabled":item.disabled},nativeOn:{"click":function($event){_vm.next(item)}}},[_vm._v("\n      "+_vm._s(item.name)+"\n    ")])})),_vm._v(" "),(_vm.items.length>0)?_c('v-list',[_vm._l((_vm.items),function(item,i){return [_c('v-list-tile',_vm._b({key:item.name,attrs:{"avatar":"","target":"_blank"},on:{"click":function($event){_vm.next(item)}}},'v-list-tile',{href:item.dir?undefined:item.url},false),[_c('v-list-tile-avatar',[_c('v-icon',{staticClass:"grey lighten-1 white--text"},[_vm._v(_vm._s(item.icon))])],1),_vm._v(" "),_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v(_vm._s(item.name))])],1)],1),_vm._v(" "),_c('v-divider',{key:i})]})],2):_c('div',[_c('v-alert',{attrs:{"value":true,"type":"info"}},[_vm._v("\n      无文件\n    ")])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_FileExplorer = (esExports);
// CONCATENATED MODULE: ./src/components/FileExplorer.vue
function injectStyle (ssrContext) {
  __webpack_require__("8lVT")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  FileExplorer,
  components_FileExplorer,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_FileExplorer = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/product/Browser.vue
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Browser = ({
  components: {
    FileExplorer: src_components_FileExplorer
  },
  data: function data() {
    return {
      basePath: '',
      path: ''
    };
  },
  created: function created() {
    this.basePath = this.path = this.$route.query.path;
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-47f42e6e","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/product/Browser.vue
var Browser_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-btn',{attrs:{"flat":"","to":"/product"}},[_c('v-icon',[_vm._v("arrow_back")]),_vm._v("\n    返回列表\n  ")],1),_vm._v(" "),_c('file-explorer',{attrs:{"base":_vm.basePath},model:{value:(_vm.path),callback:function ($$v) {_vm.path=$$v},expression:"path"}})],1)}
var Browser_staticRenderFns = []
var Browser_esExports = { render: Browser_render, staticRenderFns: Browser_staticRenderFns }
/* harmony default export */ var product_Browser = (Browser_esExports);
// CONCATENATED MODULE: ./src/pages/product/Browser.vue
function Browser_injectStyle (ssrContext) {
  __webpack_require__("ipvB")
}
var Browser_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Browser___vue_template_functional__ = false
/* styles */
var Browser___vue_styles__ = Browser_injectStyle
/* scopeId */
var Browser___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Browser___vue_module_identifier__ = null
var Browser_Component = Browser_normalizeComponent(
  Browser,
  product_Browser,
  Browser___vue_template_functional__,
  Browser___vue_styles__,
  Browser___vue_scopeId__,
  Browser___vue_module_identifier__
)

/* harmony default export */ var pages_product_Browser = __webpack_exports__["default"] = (Browser_Component.exports);


/***/ }),

/***/ "8lVT":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("aJQu");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("302e2d80", content, true, {});

/***/ }),

/***/ "HVLv":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Browser.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "aJQu":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"FileExplorer.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "ipvB":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("HVLv");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("4f3dfd3e", content, true, {});

/***/ })

});
//# sourceMappingURL=6.bf6d9e419ae07f523622.js.map