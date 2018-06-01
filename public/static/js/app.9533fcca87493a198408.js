webpackJsonp([8],{

/***/ "7zck":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__("7+uW");

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/promise.js
var promise = __webpack_require__("//Fk");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/App.vue

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
//



var bus = new vue_esm["a" /* default */]();

vue_esm["a" /* default */].use(function (Vue) {
  Vue.prototype.$toast = function (msg) {
    bus.$emit('toast', msg);
  };
  Vue.prototype.$confirm = function (msg) {
    bus.$emit('confirm', msg);
    return new promise_default.a(function (resolve, reject) {
      bus.$on('confirm-ok', resolve);
      bus.$on('confirm-cancel', reject);
    });
  };
});
/* harmony default export */ var App = ({
  name: 'app',
  data: function data() {
    return {
      snackbar: false,
      snackText: '',
      dialog: false,
      confirmTitle: ''
    };
  },
  created: function created() {
    var _this = this;

    bus.$on('toast', function (msg) {
      _this.snackbar = true;
      _this.snackText = msg;
    });
    bus.$on('confirm', function (msg) {
      _this.confirmTitle = msg;
      _this.dialog = true;
    });
  },

  methods: {
    onConfirm: function onConfirm() {
      this.dialog = false;
      bus.$emit('confirm-ok');
    },
    onCancel: function onCancel() {
      this.dialog = false;
      bus.$emit('confirm-cancel');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f0797d8c","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app',{attrs:{"light":""}},[_c('v-toolbar',{attrs:{"color":"primary"}},[_c('v-toolbar-side-icon'),_vm._v(" "),_c('router-link',{attrs:{"to":"/"}},[_c('v-toolbar-title',{staticClass:"white--text"},[_vm._v("\n        ECOVACS前端控制台\n      ")])],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("search")])],1),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("apps")])],1),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("refresh")])],1),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("more_vert")])],1)],1),_vm._v(" "),_c('router-view'),_vm._v(" "),_c('v-dialog',{attrs:{"max-width":"290"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-card',[_c('v-card-title',{staticClass:"headline"},[_vm._v(_vm._s(_vm.confirmTitle))]),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"flat":"flat"},nativeOn:{"click":function($event){return _vm.onCancel($event)}}},[_vm._v("取消")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary darken-1","flat":"flat"},nativeOn:{"click":function($event){return _vm.onConfirm($event)}}},[_vm._v("确定")])],1)],1)],1),_vm._v(" "),_c('v-snackbar',{attrs:{"timeout":3000,"top":""},model:{value:(_vm.snackbar),callback:function ($$v) {_vm.snackbar=$$v},expression:"snackbar"}},[_vm._v("\n    "+_vm._s(_vm.snackText)+"\n  ")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_App = (esExports);
// CONCATENATED MODULE: ./src/App.vue
function injectStyle (ssrContext) {
  __webpack_require__("NsMy")
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
  App,
  selectortype_template_index_0_src_App,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_App = (Component.exports);

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("/ocq");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/Index.vue
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

/* harmony default export */ var Index = ({
  data: function data() {
    return {
      items: [{
        name: '项目管理',
        to: 'project',
        color: 'green',
        img: 'https://vuetifyjs.com/static/doc-images/cards/house.jpg'
      }, {
        name: '本地SVN管理工具',
        to: 'svn',
        color: 'cyan',
        img: 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
      }, {
        name: 'Shell工具',
        to: 'shell',
        color: 'light-blue',
        img: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg'
      }, {
        name: '接口管理工具',
        to: 'interface',
        color: 'red', // teal
        img: 'https://vuetifyjs.com/static/doc-images/cards/house.jpg'
      }, {
        name: '开发服务器',
        to: 'devserver',
        color: 'light-blue',
        img: 'https://vuetifyjs.com/static/doc-images/cards/desert.jpg'
      }]
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4e04b1c0","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/Index.vue
var Index_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":"","grid-list-md":""}},[_c('v-layout',{attrs:{"wrap":""}},_vm._l((_vm.items),function(item){return _c('v-flex',{key:item.to,attrs:{"xs12":"","md3":"","sm6":""}},[_c('v-card',{staticClass:"white--text",attrs:{"to":item.to,"color":item.color + ' darken-2',"ripple":""}},[_c('v-card-media',{attrs:{"src":item.img,"height":"250px"}}),_vm._v(" "),_c('v-card-title',{attrs:{"primary-title":""}},[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(item.name))])])],1)],1)}))],1)}
var Index_staticRenderFns = []
var Index_esExports = { render: Index_render, staticRenderFns: Index_staticRenderFns }
/* harmony default export */ var pages_Index = (Index_esExports);
// CONCATENATED MODULE: ./src/pages/Index.vue
var Index_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Index___vue_template_functional__ = false
/* styles */
var Index___vue_styles__ = null
/* scopeId */
var Index___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Index___vue_module_identifier__ = null
var Index_Component = Index_normalizeComponent(
  Index,
  pages_Index,
  Index___vue_template_functional__,
  Index___vue_styles__,
  Index___vue_scopeId__,
  Index___vue_module_identifier__
)

/* harmony default export */ var src_pages_Index = (Index_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/ContainerWithMenu.vue
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

/* harmony default export */ var ContainerWithMenu = ({
  props: ['menus']
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-52e5c3b2","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/ContainerWithMenu.vue
var ContainerWithMenu_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"grid-list-md":"","text-xs-center":""}},[_c('v-layout',{attrs:{"nowrap":""}},[_c('v-navigation-drawer',{attrs:{"stateless":"","light":"","value":"true"}},[_c('v-toolbar',{attrs:{"flat":""}},[_c('v-list',[_c('v-list-tile',[_c('v-list-tile-title',{staticClass:"title"},[_vm._v("\n              菜单\n            ")])],1)],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-list',{staticClass:"pt-0",attrs:{"dense":""}},_vm._l((_vm.menus),function(item){return _c('v-list-tile',{key:item.title,attrs:{"to":item.link}},[_c('v-list-tile-action',[_c('v-icon',[_vm._v(_vm._s(item.icon))])],1),_vm._v(" "),_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v(_vm._s(item.title))])],1)],1)}))],1),_vm._v(" "),_c('v-flex',[_c('router-view')],1)],1)],1)}
var ContainerWithMenu_staticRenderFns = []
var ContainerWithMenu_esExports = { render: ContainerWithMenu_render, staticRenderFns: ContainerWithMenu_staticRenderFns }
/* harmony default export */ var components_ContainerWithMenu = (ContainerWithMenu_esExports);
// CONCATENATED MODULE: ./src/components/ContainerWithMenu.vue
var ContainerWithMenu_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ContainerWithMenu___vue_template_functional__ = false
/* styles */
var ContainerWithMenu___vue_styles__ = null
/* scopeId */
var ContainerWithMenu___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ContainerWithMenu___vue_module_identifier__ = null
var ContainerWithMenu_Component = ContainerWithMenu_normalizeComponent(
  ContainerWithMenu,
  components_ContainerWithMenu,
  ContainerWithMenu___vue_template_functional__,
  ContainerWithMenu___vue_styles__,
  ContainerWithMenu___vue_scopeId__,
  ContainerWithMenu___vue_module_identifier__
)

/* harmony default export */ var src_components_ContainerWithMenu = (ContainerWithMenu_Component.exports);

// CONCATENATED MODULE: ./src/pages/svn/index.js

var Action = function Action() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, "3Gs/"));
};
var Add = function Add() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, "A1Ko"));
};
/* harmony default export */ var svn = ({
  path: '/svn',
  component: src_components_ContainerWithMenu,
  props: {
    menus: [{ title: '通用', icon: 'dashboard', link: '/svn' }, { title: '添加', icon: 'add', link: '/svn/add' }]
  },
  children: [{
    name: 'action',
    path: '',
    component: Action
  }, {
    name: 'add',
    path: 'add',
    component: Add
  }]
});
// CONCATENATED MODULE: ./src/pages/shell/index.js

var List = function List() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, "5eys"));
};
var Detail = function Detail() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, "ycYq"));
};
var shell_Add = function Add() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, "7rMs"));
};

/* harmony default export */ var shell = ({
  path: '/shell',
  component: src_components_ContainerWithMenu,
  props: {
    menus: [{ title: '账号列表', icon: 'dashboard', link: '/shell' }, { title: '添加账号', icon: 'add', link: '/shell/add' }]
  },
  children: [{
    name: 'shell-list',
    path: '',
    component: List
  }, {
    name: 'shell-add',
    path: 'add',
    component: shell_Add
  }, {
    name: 'shell-terminal',
    path: ':id',
    component: Detail
  }]
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Container.vue
//
//
//
//
//
//

// import Swagger from 'swagger-client'
/* harmony default export */ var Container = ({});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-987da3c0","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Container.vue
var Container_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('router-view')],1)}
var Container_staticRenderFns = []
var Container_esExports = { render: Container_render, staticRenderFns: Container_staticRenderFns }
/* harmony default export */ var components_Container = (Container_esExports);
// CONCATENATED MODULE: ./src/components/Container.vue
function Container_injectStyle (ssrContext) {
  __webpack_require__("Yu9s")
}
var Container_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Container___vue_template_functional__ = false
/* styles */
var Container___vue_styles__ = Container_injectStyle
/* scopeId */
var Container___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Container___vue_module_identifier__ = null
var Container_Component = Container_normalizeComponent(
  Container,
  components_Container,
  Container___vue_template_functional__,
  Container___vue_styles__,
  Container___vue_scopeId__,
  Container___vue_module_identifier__
)

/* harmony default export */ var src_components_Container = (Container_Component.exports);

// CONCATENATED MODULE: ./src/pages/interface/index.js

var interface_List = function List() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, "E4fp"));
};
var Edit = function Edit() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, "e5qO"));
};
var Preview = function Preview() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, "TNCE"));
};
/* harmony default export */ var pages_interface = ({
  path: '/interface',
  component: src_components_Container,
  children: [{
    name: 'list',
    path: '',
    component: interface_List
  }, {
    name: 'edit',
    path: 'edit/:id',
    component: Edit
  }, {
    name: 'preview',
    path: 'preview/:id',
    component: Preview
  }]
});
// CONCATENATED MODULE: ./src/pages/devserver/index.js

var devserver_List = function List() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, "T9dF"));
};
var devserver_Add = function Add() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, "Hv1x"));
};

/* harmony default export */ var devserver = ({
  path: '/devserver',
  component: src_components_ContainerWithMenu,
  props: {
    menus: [{ title: '列表', icon: 'dashboard', link: '/devserver' }, { title: '添加', icon: 'add', link: '/devserver/add' }]
  },
  children: [{
    name: 'devserver-list',
    path: '',
    component: devserver_List
  }, {
    name: 'devserver-add',
    path: 'add',
    component: devserver_Add
  }]
});
// CONCATENATED MODULE: ./src/pages/project/index.js

var Home = function Home() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, "9npK"));
};
var project_Add = function Add() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, "xyHd"));
};
var Projects = function Projects() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, "6ZIj"));
};

/* harmony default export */ var project = ({
  path: '/project',
  component: src_components_Container,
  children: [{
    path: '',
    component: Home
  }, {
    path: 'add',
    component: project_Add
  }, {
    path: 'projects',
    component: Projects
  }]
});
// CONCATENATED MODULE: ./src/pages/product/index.js

var product_Home = function Home() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, "Qw9b"));
};
var Browser = function Browser() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, "+SVv"));
};

/* harmony default export */ var product = ({
  path: '/product',
  component: src_components_Container,
  children: [{
    path: '',
    component: product_Home
  }, {
    path: 'browser',
    component: Browser
  }]
});
// CONCATENATED MODULE: ./src/router/index.js










vue_esm["a" /* default */].use(vue_router_esm["a" /* default */]);

/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  routes: [{
    path: '/menu',
    name: 'Index',
    component: src_pages_Index
  }, svn, shell, pages_interface, devserver, project, product]
}));
// EXTERNAL MODULE: ./node_modules/vuetify/dist/vuetify.js
var vuetify = __webpack_require__("3EgV");
var vuetify_default = /*#__PURE__*/__webpack_require__.n(vuetify);

// EXTERNAL MODULE: ./node_modules/vuetify/dist/vuetify.min.css
var vuetify_min = __webpack_require__("7zck");
var vuetify_min_default = /*#__PURE__*/__webpack_require__.n(vuetify_min);

// CONCATENATED MODULE: ./src/main.js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.







vue_esm["a" /* default */].use(vuetify_default.a, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});

vue_esm["a" /* default */].config.productionTip = false;

vue_esm["a" /* default */].filter('date', function (v) {
  var t = new Date(v);
  return t.toLocaleString();
});

/* eslint-disable no-new */
new vue_esm["a" /* default */]({
  el: '#app',
  router: router,
  template: '<App/>',
  components: {
    App: src_App
  }
});

/***/ }),

/***/ "NsMy":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Yu9s":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.9533fcca87493a198408.js.map