webpackJsonp([5],{

/***/ "7sGd":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("WFn4");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("41801eaa", content, true, {});

/***/ }),

/***/ "9zrn":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("dowG");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("f07304e0", content, true, {});

/***/ }),

/***/ "DBro":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchList;
/* harmony export (immutable) */ __webpack_exports__["a"] = add;
/* harmony export (immutable) */ __webpack_exports__["c"] = start;
/* harmony export (immutable) */ __webpack_exports__["d"] = stop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__("gvqO");

var instance = Object(__WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */])('devserver');
function fetchList() {
    return instance.get('list');
}
function add(data) {
    return instance.post('add', data);
}
function start(dir) {
    return instance.get('start', {
        params: {
            dir: dir
        }
    });
}
function stop(dir) {
    return instance.get('stop', {
        params: {
            dir: dir
        }
    });
}

/***/ }),

/***/ "Hv1x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/api/devserver.ts
var devserver = __webpack_require__("DBro");

// EXTERNAL MODULE: ./src/components/FormEdit.vue + 2 modules
var FormEdit = __webpack_require__("dhkN");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/devserver/Add.vue
//
//
//
//



/* harmony default export */ var Add = ({
  components: {
    FormEdit: FormEdit["a" /* default */]
  },
  data: function data() {
    return {
      add: devserver["a" /* add */],
      fields: [{
        label: '名称',
        name: 'name'
      }, {
        label: '目录',
        name: 'dir'
      }, {
        label: '端口',
        name: 'port',
        type: 'number',
        value: 8888
      }, {
        label: '启动后自动打开浏览器',
        name: 'open',
        type: 'checkbox',
        value: false
      }, {
        label: '代理映射',
        name: 'proxy',
        multiple: true
      }]
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7d4768f0","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/devserver/Add.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var devserver_Add = (esExports);
// CONCATENATED MODULE: ./src/pages/devserver/Add.vue
function injectStyle (ssrContext) {
  __webpack_require__("9zrn")
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
  Add,
  devserver_Add,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_devserver_Add = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "T9dF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/api/devserver.ts
var devserver = __webpack_require__("DBro");

// EXTERNAL MODULE: ./src/components/Explorer.vue + 2 modules
var Explorer = __webpack_require__("Wle/");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/devserver/List.vue
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
//
//
//
//
//
//



/* harmony default export */ var List = ({
  components: {
    Explorer: Explorer["a" /* default */]
  },
  data: function data() {
    return {
      items: []
    };
  },
  mounted: function mounted() {
    this.getList();
  },

  methods: {
    getList: function getList() {
      var _this = this;

      Object(devserver["b" /* fetchList */])().then(function (items) {
        _this.items = items;
      });
    },
    start: function start(item) {
      var _this2 = this;

      item.disabled = true;
      Object(devserver["c" /* start */])(item.dir).then(function () {
        item.disabled = false;
        _this2.getList();
      });
    },
    stop: function stop(item) {
      var _this3 = this;

      item.disabled = true;
      Object(devserver["d" /* stop */])(item.dir).then(function () {
        item.disabled = false;
        _this3.getList();
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-704b1802","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/devserver/List.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":"","grid-list-md":""}},[_c('v-layout',{attrs:{"wrap":""}},_vm._l((_vm.items),function(item,i){return _c('v-flex',{key:i,attrs:{"md3":""}},[_c('v-card',{attrs:{"flat":"","tile":""}},[_c('v-card-media',{attrs:{"src":("https://unsplash.it/150/300?image=" + (Math.floor(Math.random() * 100) + 1)),"height":"150px"}},[_c('v-container',{attrs:{"fill-height":"","fluid":""}},[_c('v-layout',{attrs:{"fill-height":""}},[_c('v-flex',{attrs:{"xs12":"","align-end":"","flexbox":""}},[_c('span',{staticClass:"headline",staticStyle:{"mix-blend-mode":"color-burn"}},[_vm._v(_vm._s(item.name))])])],1)],1)],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"grey--text"},[_vm._v(_vm._s(item.running?'运行中':'未运行'))]),_vm._v(" "),(item.running)?_c('v-menu',{attrs:{"open-on-hover":"","origin":"center center"}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary","dark":"","flat":""},slot:"activator"},[_vm._v("链接地址")]),_vm._v(" "),_c('v-list',_vm._l((item.urls),function(v,j){return _c('v-list-tile',{key:j},[_c('v-list-tile-content',[_c('v-list-tile-title',[_c('a',{attrs:{"target":"_blank","href":v[1]}},[_vm._v(_vm._s(v[0]))])])],1)],1)}))],1):_vm._e()],1),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{attrs:{"color":"primary","disabled":item.disabled||item.running},on:{"click":function($event){_vm.start(item)}}},[_vm._v("启动")]),_vm._v(" "),_c('explorer',{attrs:{"path":item.dir}}),_vm._v(" "),_c('v-btn',{attrs:{"disabled":item.disabled||!item.running},on:{"click":function($event){_vm.stop(item)}}},[_vm._v("停止")])],1)],1)],1)}))],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var devserver_List = (esExports);
// CONCATENATED MODULE: ./src/pages/devserver/List.vue
function injectStyle (ssrContext) {
  __webpack_require__("kLNN")
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
  List,
  devserver_List,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_devserver_List = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "WFn4":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Explorer.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "Wle/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/api/common.ts
var common = __webpack_require__("RS51");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Explorer.vue
//
//
//
//
//
//
//


/* harmony default export */ var Explorer = ({
  props: ['path'],
  methods: {
    explore: function explore() {
      Object(common["b" /* explore */])(this.path);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-96fd4e2a","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Explorer.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-tooltip',{attrs:{"bottom":""}},[_c('v-btn',{attrs:{"slot":"activator"},on:{"click":_vm.explore},slot:"activator"},[_vm._v("...")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.path))])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Explorer = (esExports);
// CONCATENATED MODULE: ./src/components/Explorer.vue
function injectStyle (ssrContext) {
  __webpack_require__("7sGd")
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
  Explorer,
  components_Explorer,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_Explorer = __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "dowG":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Add.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "kLNN":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("unaz");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("afcc8414", content, true, {});

/***/ }),

/***/ "unaz":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"List.vue","sourceRoot":""}]);

// exports


/***/ })

});
//# sourceMappingURL=devserver.7c9443f3102f24c8619a.js.map