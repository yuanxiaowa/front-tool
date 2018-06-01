webpackJsonp([4],{

/***/ "3Gs/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/regenerator/index.js
var regenerator = __webpack_require__("Xxa5");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("exGp");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./src/api/svn.ts
var svn = __webpack_require__("IMQR");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/svn/Status.vue
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


/* harmony default export */ var Status = ({
  props: ['path'],
  data: function data() {
    return {
      lastPath: '',
      loading: false,
      items: [],
      pagination: {
        rowsPerPage: 10
      },
      selected: [],
      headers: [{ text: '路径', value: 'path', align: 'left' }, { text: '状态', value: 'type', align: 'center' }, { text: '版本', value: 'revision' }, { text: '上次提交', align: 'left' /* ,
                                                                                                                                                                               { text: '操作' } */
      }]
    };
  },

  watch: {
    path: {
      handler: function handler(v) {
        if (v) {
          this.getList(v);
        }
      },

      immediate: true
    }
  },
  methods: {
    getList: function getList(path) {
      var _this = this;

      this.lastPath = path;
      this.loading = true;
      Object(svn["h" /* fetchStatus */])(path).then(function (data) {
        _this.loading = false;
        _this.items = _this.selected = data[0].entries;
      });
    },
    refresh: function refresh() {
      this.getList(this.lastPath);
    }
  },
  computed: {
    conflictFiles: function conflictFiles() {
      return this.selected.filter(function (item) {
        return item.hasConflict;
      }).map(function (item) {
        return item.path;
      });
    },
    newFiles: function newFiles() {
      return this.selected.filter(function (item) {
        return item.type === 'unversioned';
      }).map(function (item) {
        return item.path;
      });
    },
    delFiles: function delFiles() {
      return this.selected.filter(function (item) {
        return item.type === 'missing' || item.type === 'deleted';
      }).map(function (item) {
        return item.path;
      });
    },

    allSelected: {
      set: function set(v) {
        this.selected = v ? this.items : [];
      },
      get: function get() {
        return this.items.length === this.selected.length;
      }
    },
    isIndeterminate: function isIndeterminate() {
      return this.selected.length > 0 && this.items.length > this.selected.length;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4043ec45","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/svn/Status.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-card',[_c('v-card-actions',[_c('v-checkbox',{attrs:{"label":"选中所有","indeterminate":_vm.isIndeterminate},model:{value:(_vm.allSelected),callback:function ($$v) {_vm.allSelected=$$v},expression:"allSelected"}}),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-tooltip',{attrs:{"top":""}},[_c('v-btn',{attrs:{"slot":"activator","icon":"","title":"刷新"},on:{"click":_vm.refresh},slot:"activator"},[_c('v-icon',[_vm._v("refresh")])],1),_vm._v(" "),_c('span',[_vm._v("刷新")])],1)],1)],1),_vm._v(" "),_c('v-data-table',{attrs:{"headers":_vm.headers,"items":_vm.items,"loading":_vm.loading,"pagination":_vm.pagination,"item-key":"path","select-all":""},on:{"update:pagination":function($event){_vm.pagination=$event}},scopedSlots:_vm._u([{key:"items",fn:function(props){return [_c('tr',{style:(props.item.hasConflict?'background:red':''),attrs:{"active":props.selected}},[_c('td',[_c('v-checkbox',{attrs:{"primary":"","hide-details":""},model:{value:(props.selected),callback:function ($$v) {_vm.$set(props, "selected", $$v)},expression:"props.selected"}})],1),_vm._v(" "),_c('td',[_vm._v(_vm._s(props.item.path))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.type))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.revision))]),_vm._v(" "),_c('td',[(props.item.commit)?_c('div',[_vm._v("\n            提交者："+_vm._s(props.item.commit.author)+" "),_c('br'),_vm._v(" 时间："+_vm._s(_vm._f("date")(props.item.commit.date))+"\n            "),_c('br'),_vm._v(" 版本："+_vm._s(props.item.commit.revision)+"\n          ")]):_vm._e()])])]}}]),model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v},expression:"selected"}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var svn_Status = (esExports);
// CONCATENATED MODULE: ./src/pages/svn/Status.vue
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Status,
  svn_Status,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_svn_Status = (Component.exports);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/svn/Merge.vue


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



var mapping = function () {
  var data = JSON.parse(localStorage.getItem('latestMergeMappings')) || {};
  return {
    set: function set(name, value) {
      data[name] = value;
      localStorage.setItem('latestMergeMappings', stringify_default()(data));
    },
    get: function get(name) {
      return data[name];
    }
  };
}();
/* harmony default export */ var Merge = ({
  props: ['url', 'path'],
  data: function data() {
    return {
      structures: null,
      headers: [{ text: '版本', value: 'revision' }, { text: '备注', value: 'msg', align: 'left' }, { text: '提交者', value: 'author' }, { text: '提交时间', value: 'date', align: 'left' }, { text: '操作' }],
      pagination: {
        sortBy: 'revision',
        descending: true,
        rowsPerPage: 10,
        page: 1,
        totalItems: 0
      },
      selected: [],
      items: [],
      revisions: [],
      logFiles: [],
      logFilesHeader: [{
        text: '路径',
        value: 'path',
        align: 'left'
      }, {
        text: '类型',
        value: 'kind',
        align: 'center'
      }, {
        text: 'Action',
        value: 'action',
        align: 'center'
      }],
      loading: false,
      baseObj: {
        name: '',
        mergeType: 'branch',
        url: ''
      },
      x: 0,
      y: 0,
      showMenu: true,
      ignoreMerged: false
    };
  },

  watch: {
    url: function url(v) {
      this.items = [];
      this.structures = null;
      this.logFiles = [];
      this.baseObj = mapping.get(v) || {
        name: '',
        mergeType: 'branch',
        url: ''
      };
      this.getStructure();
    },
    logQueryOptions: function logQueryOptions(v, old) {
      if (v.path && stringify_default()(v) !== stringify_default()(old)) {
        this.getLogs();
      }
    },

    baseObj: {
      deep: true,
      handler: function handler(v, old) {
        mapping.set(this.url, this.baseObj);
        if (v.url && v.url !== old.url) {
          this.pagination.page = 1;
          this.getMergeInfo();
        }
      }
    }
  },
  mounted: function mounted() {
    var baseObj = mapping.get(this.url);
    if (baseObj) {
      this.baseObj = baseObj;
    }
  },

  methods: {
    getStructure: function getStructure() {
      var _this = this;

      if (this.structures && this.structures.trunks.length) {
        return;
      }
      Object(svn["i" /* fetchStructure */])(this.url, this.baseObj.name).then(function (data) {
        _this.structures = data;
      });
    },
    showLogFiles: function showLogFiles(files) {
      var path = this.baseObj.url.replace(/^\w+:\/\/[^/]+/, '');
      var fname = files[0].path.match(/(\/[^/]+)/)[1];
      var i = path.indexOf(fname);
      var cs = path.slice(i);
      this.logFiles = files.filter(function (item) {
        return item.kind === 'file';
      }).map(function (item) {
        return {
          path: item.path.replace(cs, '') || '.',
          kind: item.kind,
          action: item.action
        };
      });
    },
    getLogs: function getLogs() {
      var _this2 = this;

      this.loading = true;
      return Object(svn["f" /* fetchLogs */])(this.logQueryOptions).then(function (_ref) {
        var page = _ref.page,
            items = _ref.items,
            total = _ref.total;

        _this2.pagination.totalItems = total;
        _this2.pagination.page = page;
        _this2.items = items;
        _this2.loading = false;
      });
    },
    getMergeInfo: function getMergeInfo() {
      var _this3 = this;

      return Object(svn["k" /* mergeinfo */])(this.path, this.baseObj.url).then(function (revisions) {
        _this3.revisions = revisions;
      });
    },
    mergeTo: function mergeTo(path) {
      if (this.selected.length === 0) {
        return;
      }
      var revisions = this.selected.map(function (item) {
        return item.revision;
      });
      return Object(svn["j" /* merge */])(path, this.baseObj.url, revisions);
    },
    onContextMenu: function onContextMenu(e) {
      var _this4 = this;

      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(function () {
        _this4.showMenu = true;
      });
    },
    refresh: function refresh() {
      var _this5 = this;

      this.getLogs(this.baseObj.url).then(function () {
        _this5.selected = [];
      });
      this.getMergeInfo();
    }
  },
  computed: {
    urls: function urls() {
      var _this6 = this;

      var items = [];
      if (this.structures) {
        var mergeType = this.baseObj.mergeType;
        if (mergeType === 'trunk') {
          items = this.structures.trunks;
        } else if (mergeType === 'tag') {
          items = this.structures.tags;
        } else {
          items = this.structures.branches;
        }
        if (items.length > 0) {
          items = items.filter(function (item) {
            return item.fullPath !== _this6.url;
          }).map(function (item) {
            return { text: item.name, value: item.fullPath };
          });
        }
      }
      return items;
    },
    filteredItems: function filteredItems() {
      if (!this.ignoreMerged) {
        return this.itemsWithMergeinfo;
      }
      return this.itemsWithMergeinfo.filter(function (item) {
        return !item.isMerged;
      });
    },
    logQueryOptions: function logQueryOptions() {
      return {
        path: this.baseObj.url,
        page: this.pagination.page,
        rowsPerPage: this.pagination.rowsPerPage
      };
    },
    itemsWithMergeinfo: function itemsWithMergeinfo() {
      var _this7 = this;

      return this.items.map(function (item) {
        return assign_default()({
          isMerged: _this7.revisions.lastIndexOf(item.revision) > -1
        }, item);
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0c4c5aed","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/svn/Merge.vue
var Merge_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-layout',{attrs:{"wrap":""}},[_c('v-flex',{attrs:{"xs8":""}},[_c('v-radio-group',{attrs:{"row":""},on:{"change":_vm.getStructure},model:{value:(_vm.baseObj.mergeType),callback:function ($$v) {_vm.$set(_vm.baseObj, "mergeType", $$v)},expression:"baseObj.mergeType"}},[_c('v-radio',{attrs:{"label":"branch","value":"branch"}}),_vm._v(" "),_c('v-radio',{attrs:{"label":"tag","value":"tag"}}),_vm._v(" "),_c('v-radio',{attrs:{"label":"trunk","value":"trunk"}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('v-text-field',{attrs:{"label":"版本库根目录名"},model:{value:(_vm.baseObj.name),callback:function ($$v) {_vm.$set(_vm.baseObj, "name", $$v)},expression:"baseObj.name"}})],1),_vm._v(" "),(_vm.baseObj.mergeType)?[_c('v-flex',{attrs:{"xs8":""}},[_c('v-select',{attrs:{"items":_vm.urls,"label":"版本名","single-line":"","bottom":"","autocomplete":""},model:{value:(_vm.baseObj.url),callback:function ($$v) {_vm.$set(_vm.baseObj, "url", $$v)},expression:"baseObj.url"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('v-btn',{attrs:{"color":"primary"},on:{"click":_vm.getStructure}},[_vm._v("拉取")])],1)]:_vm._e()],2),_vm._v(" "),_c('div',{on:{"contextmenu":function($event){$event.preventDefault();return _vm.onContextMenu($event)}}},[(_vm.baseObj.url)?_c('v-data-table',{attrs:{"headers":_vm.headers,"items":_vm.filteredItems,"select-all":"","item-key":"revision","pagination":_vm.pagination,"total-items":_vm.pagination.totalItems,"loading":_vm.loading},on:{"update:pagination":function($event){_vm.pagination=$event}},scopedSlots:_vm._u([{key:"items",fn:function(props){return [_c('tr',{attrs:{"active":props.selected}},[_c('td',[_c('v-checkbox',{attrs:{"primary":"","hide-details":""},model:{value:(props.selected),callback:function ($$v) {_vm.$set(props, "selected", $$v)},expression:"props.selected"}})],1),_vm._v(" "),_c('td',[_vm._v(_vm._s(props.item.revision)+"\n            "),(props.item.isMerged)?_c('span',{staticClass:"brown lighten-4"},[_vm._v("(已合并)")]):_vm._e()]),_vm._v(" "),_c('td',[_vm._v(_vm._s(props.item.msg))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.author))]),_vm._v(" "),_c('td',[_vm._v("\n            "+_vm._s(_vm._f("date")(props.item.date))+"\n          ")]),_vm._v(" "),_c('td',[_c('v-btn',{attrs:{"color":"primary"},on:{"click":function($event){_vm.showLogFiles(props.item.paths)}}},[_vm._v("查看")])],1)])]}}]),model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v},expression:"selected"}}):_vm._e()],1),_vm._v(" "),(_vm.logFiles.length>0)?_c('v-data-table',{attrs:{"headers":_vm.logFilesHeader,"items":_vm.logFiles,"item-key":"path"},scopedSlots:_vm._u([{key:"items",fn:function(props){return [_c('tr',[_c('td',[_vm._v(_vm._s(props.item.path))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.kind))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.action))])])]}}])}):_vm._e(),_vm._v(" "),_c('v-menu',{attrs:{"offset-y":"","absolute":"","position-x":_vm.x,"position-y":_vm.y,"min-width":"15em"},model:{value:(_vm.showMenu),callback:function ($$v) {_vm.showMenu=$$v},expression:"showMenu"}},[_c('v-list',[_c('v-list-tile',{on:{"click":_vm.refresh}},[_c('v-list-tile-title',[_vm._v("刷新记录")])],1),_vm._v(" "),_c('v-list-tile',[_c('v-list-tile-title',[_c('v-switch',{attrs:{"label":"忽略已合并版本"},model:{value:(_vm.ignoreMerged),callback:function ($$v) {_vm.ignoreMerged=$$v},expression:"ignoreMerged"}})],1)],1)],1)],1)],1)}
var Merge_staticRenderFns = []
var Merge_esExports = { render: Merge_render, staticRenderFns: Merge_staticRenderFns }
/* harmony default export */ var svn_Merge = (Merge_esExports);
// CONCATENATED MODULE: ./src/pages/svn/Merge.vue
var Merge_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Merge___vue_template_functional__ = false
/* styles */
var Merge___vue_styles__ = null
/* scopeId */
var Merge___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Merge___vue_module_identifier__ = null
var Merge_Component = Merge_normalizeComponent(
  Merge,
  svn_Merge,
  Merge___vue_template_functional__,
  Merge___vue_styles__,
  Merge___vue_scopeId__,
  Merge___vue_module_identifier__
)

/* harmony default export */ var pages_svn_Merge = (Merge_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/svn/Commit.vue
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

/* harmony default export */ var Commit = ({
  props: ['value'],
  data: function data() {
    return {
      msg: '',
      preMsg: ''
    };
  },
  created: function created() {
    this.msg = localStorage.getItem('latestMsg') || '';
    this.preMsg = localStorage.getItem('latestPreMsg') || '';
  },

  watch: {
    msg: function msg(v) {
      localStorage.setItem('latestMsg', v);
    },
    preMsg: function preMsg(v) {
      localStorage.setItem('latestPreMsg', v);
    },
    v: function v(_v) {
      this.$emit('input', _v);
    }
  },
  computed: {
    v: function v() {
      var v = this.preMsg + this.msg;
      return v;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4db99f00","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/svn/Commit.vue
var Commit_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',[_c('v-flex',[_c('v-card',[_c('v-card-text',[_c('v-text-field',{attrs:{"label":"备注"},model:{value:(_vm.msg),callback:function ($$v) {_vm.msg=$$v},expression:"msg"}})],1)],1)],1),_vm._v(" "),_c('v-flex',[_c('v-card',[_c('v-card-text',[_c('v-text-field',{attrs:{"label":"前缀"},model:{value:(_vm.preMsg),callback:function ($$v) {_vm.preMsg=$$v},expression:"preMsg"}})],1)],1)],1)],1)}
var Commit_staticRenderFns = []
var Commit_esExports = { render: Commit_render, staticRenderFns: Commit_staticRenderFns }
/* harmony default export */ var svn_Commit = (Commit_esExports);
// CONCATENATED MODULE: ./src/pages/svn/Commit.vue
function injectStyle (ssrContext) {
  __webpack_require__("TvEJ")
}
var Commit_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Commit___vue_template_functional__ = false
/* styles */
var Commit___vue_styles__ = injectStyle
/* scopeId */
var Commit___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Commit___vue_module_identifier__ = null
var Commit_Component = Commit_normalizeComponent(
  Commit,
  svn_Commit,
  Commit___vue_template_functional__,
  Commit___vue_styles__,
  Commit___vue_scopeId__,
  Commit___vue_module_identifier__
)

/* harmony default export */ var pages_svn_Commit = (Commit_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/LogBoard.vue
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

/* harmony default export */ var LogBoard = ({
  data: function data() {
    return {
      x: 0,
      y: 0,
      showMenu: false,
      records: []
    };
  },

  methods: {
    add: function add(txt, type) {
      txt = txt.replace(/\r?\n/g, '<br>');
      this.records.unshift({
        time: new Date().toTimeString(),
        content: txt.trim(),
        type: type
      });
    },
    show: function show(e) {
      var _this = this;

      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(function () {
        _this.showMenu = true;
      });
    },
    clear: function clear() {
      this.records = [];
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e34c0bdc","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/LogBoard.vue
var LogBoard_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"log-board",on:{"contextmenu":_vm.show}},_vm._l((_vm.records),function(item,i){return _c('div',{key:i},[_c('time',{staticStyle:{"color":"blue"}},[_vm._v(_vm._s(item.time))]),_vm._v(" "),(item.type==='error')?_c('v-alert',{attrs:{"outline":"","color":"error","icon":"warning","value":true}},[_c('div',{domProps:{"innerHTML":_vm._s(item.content)}})]):_c('v-alert',{attrs:{"outline":"","color":"info","icon":"info","value":true}},[_c('div',{domProps:{"innerHTML":_vm._s(item.content)}})])],1)})),_vm._v(" "),_c('v-menu',{attrs:{"offset-y":"","absolute":"","position-x":_vm.x,"position-y":_vm.y},model:{value:(_vm.showMenu),callback:function ($$v) {_vm.showMenu=$$v},expression:"showMenu"}},[_c('v-list',[_c('v-list-tile',{on:{"click":_vm.clear}},[_c('v-list-tile-title',[_vm._v("清空")])],1)],1)],1)],1)}
var LogBoard_staticRenderFns = []
var LogBoard_esExports = { render: LogBoard_render, staticRenderFns: LogBoard_staticRenderFns }
/* harmony default export */ var components_LogBoard = (LogBoard_esExports);
// CONCATENATED MODULE: ./src/components/LogBoard.vue
function LogBoard_injectStyle (ssrContext) {
  __webpack_require__("HvjG")
  __webpack_require__("eJo3")
}
var LogBoard_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var LogBoard___vue_template_functional__ = false
/* styles */
var LogBoard___vue_styles__ = LogBoard_injectStyle
/* scopeId */
var LogBoard___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var LogBoard___vue_module_identifier__ = null
var LogBoard_Component = LogBoard_normalizeComponent(
  LogBoard,
  components_LogBoard,
  LogBoard___vue_template_functional__,
  LogBoard___vue_styles__,
  LogBoard___vue_scopeId__,
  LogBoard___vue_module_identifier__
)

/* harmony default export */ var src_components_LogBoard = (LogBoard_Component.exports);

// EXTERNAL MODULE: ./src/components/Explorer.vue + 2 modules
var Explorer = __webpack_require__("Wle/");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/svn/Action.vue


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









/* harmony default export */ var Action = ({
  components: {
    SvnStatus: pages_svn_Status,
    SvnMerge: pages_svn_Merge,
    SvnCommit: pages_svn_Commit,
    LogBoard: src_components_LogBoard,
    Explorer: Explorer["a" /* default */]
  },
  data: function data() {
    return {
      info: {},
      isUpdate: true,
      isCommit: true,
      isMerge: false,
      msg: '',
      path: '',
      paths: [],
      isExcuting: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.path = localStorage.getItem('latestPath');
    Object(svn["g" /* fetchPaths */])().then(function (data) {
      _this.paths = data.map(function (item) {
        return { text: item.name, value: item.path };
      });
    });
  },

  watch: {
    path: function path(v) {
      if (!v) {
        return;
      }
      this.getInfo();
      localStorage.setItem('latestPath', v);
    }
  },
  methods: {
    addRecord: function addRecord(txt, type) {
      if (!txt) {
        return;
      }
      this.$refs.logBoard.add(txt, type);
    },
    getInfo: function getInfo() {
      var _this2 = this;

      Object(svn["e" /* fetchInfo */])(this.path).then(function (data) {
        _this2.info = data[0];
      });
    },
    update: function update() {
      var _this3 = this;

      return Object(svn["m" /* update */])(this.path).then(function (data) {
        _this3.addRecord(data);
      });
    },
    resolve: function resolve(paths) {
      var _this4 = this;

      if (paths.length) {
        return Object(svn["l" /* resolveFiles */])(paths, this.path).then(function (data) {
          _this4.addRecord(data);
        });
      }
    },
    excute: function excute() {
      var _this5 = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var addRecord, svnStatus;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this5.isExcuting = true;

                addRecord = function addRecord(data, type) {
                  return _this5.addRecord(data, type);
                };

                svnStatus = _this5.$refs.svnStatus;
                _context.prev = 3;

                if (!_this5.isUpdate) {
                  _context.next = 9;
                  break;
                }

                _context.next = 7;
                return _this5.update();

              case 7:
                _context.next = 9;
                return svnStatus.refresh();

              case 9:
                _context.next = 11;
                return _this5.resolve(svnStatus.conflictFiles);

              case 11:
                if (!_this5.isMerge) {
                  _context.next = 20;
                  break;
                }

                _context.next = 14;
                return _this5.$refs.svnMerge.mergeTo(_this5.path).then(addRecord);

              case 14:
                _context.next = 16;
                return svnStatus.refresh();

              case 16:
                _context.next = 18;
                return _this5.resolve(svnStatus.conflictFiles);

              case 18:
                _context.next = 20;
                return svnStatus.refresh();

              case 20:
                if (!_this5.isCommit) {
                  _context.next = 29;
                  break;
                }

                if (!(svnStatus.newFiles.length > 0)) {
                  _context.next = 24;
                  break;
                }

                _context.next = 24;
                return Object(svn["a" /* addFiles */])(svnStatus.newFiles, _this5.path).then(addRecord);

              case 24:
                if (!(svnStatus.delFiles.length > 0)) {
                  _context.next = 27;
                  break;
                }

                _context.next = 27;
                return Object(svn["d" /* delFiles */])(svnStatus.delFiles, _this5.path).then(addRecord);

              case 27:
                _context.next = 29;
                return Object(svn["c" /* commitFiles */])(_this5.path, [], _this5.msg).then(addRecord);

              case 29:
                _context.next = 31;
                return svnStatus.refresh();

              case 31:
                _context.next = 36;
                break;

              case 33:
                _context.prev = 33;
                _context.t0 = _context['catch'](3);

                addRecord(_context.t0, 'error');

              case 36:
                _this5.isExcuting = false;

              case 37:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this5, [[3, 33]]);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4479818c","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/svn/Action.vue
var Action_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-form',[_c('v-layout',{attrs:{"wrap":""}},[_c('v-select',{attrs:{"items":_vm.paths,"label":"本地版本库","bottom":""},model:{value:(_vm.path),callback:function ($$v) {_vm.path=$$v},expression:"path"}}),_vm._v(" "),_c('explorer',{attrs:{"path":_vm.path}})],1),_vm._v(" "),(_vm.path)?_c('div',[_c('v-expansion-panel',[_c('v-expansion-panel-content',[_c('div',{attrs:{"slot":"header"},slot:"header"},[_vm._v("状态")]),_vm._v(" "),_c('svn-status',{ref:"svnStatus",attrs:{"path":_vm.path}})],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card',[_c('v-card-text',[_c('v-checkbox',{attrs:{"label":"更新"},model:{value:(_vm.isUpdate),callback:function ($$v) {_vm.isUpdate=$$v},expression:"isUpdate"}})],1)],1),_vm._v(" "),_c('v-expansion-panel',{attrs:{"expand":""}},[_c('v-expansion-panel-content',[_c('v-checkbox',{attrs:{"slot":"header","label":"合并"},slot:"header",model:{value:(_vm.isMerge),callback:function ($$v) {_vm.isMerge=$$v},expression:"isMerge"}}),_vm._v(" "),(_vm.isMerge)?_c('v-container',[_c('svn-merge',{ref:"svnMerge",attrs:{"url":_vm.info.url,"path":_vm.path}})],1):_vm._e()],1),_vm._v(" "),_c('v-expansion-panel-content',{attrs:{"value":_vm.isCommit}},[_c('v-checkbox',{attrs:{"slot":"header","label":"提交"},slot:"header",model:{value:(_vm.isCommit),callback:function ($$v) {_vm.isCommit=$$v},expression:"isCommit"}}),_vm._v(" "),_c('svn-commit',{model:{value:(_vm.msg),callback:function ($$v) {_vm.msg=$$v},expression:"msg"}})],1)],1),_vm._v(" "),_c('div',[_c('v-btn',{attrs:{"color":"primary","disabled":_vm.isExcuting},on:{"click":_vm.excute}},[_vm._v("执行")])],1),_vm._v(" "),_c('log-board',{ref:"logBoard"})],1):_vm._e()],1)}
var Action_staticRenderFns = []
var Action_esExports = { render: Action_render, staticRenderFns: Action_staticRenderFns }
/* harmony default export */ var svn_Action = (Action_esExports);
// CONCATENATED MODULE: ./src/pages/svn/Action.vue
var Action_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Action___vue_template_functional__ = false
/* styles */
var Action___vue_styles__ = null
/* scopeId */
var Action___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Action___vue_module_identifier__ = null
var Action_Component = Action_normalizeComponent(
  Action,
  svn_Action,
  Action___vue_template_functional__,
  Action___vue_styles__,
  Action___vue_scopeId__,
  Action___vue_module_identifier__
)

/* harmony default export */ var pages_svn_Action = __webpack_exports__["default"] = (Action_Component.exports);


/***/ }),

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

/***/ "A1Ko":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/api/svn.ts
var svn = __webpack_require__("IMQR");

// EXTERNAL MODULE: ./src/components/FormEdit.vue + 2 modules
var FormEdit = __webpack_require__("dhkN");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/svn/Add.vue
//
//
//



/* harmony default export */ var Add = ({
  components: {
    FormEdit: FormEdit["a" /* default */]
  },
  data: function data() {
    return {
      add: svn["b" /* addPath */],
      fields: [{
        label: '名称',
        name: 'name'
      }, {
        label: '目录',
        name: 'path'
      }]
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-25152fc3","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/svn/Add.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var svn_Add = (esExports);
// CONCATENATED MODULE: ./src/pages/svn/Add.vue
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Add,
  svn_Add,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_svn_Add = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "HvjG":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("x3sp");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("f4a45506", content, true, {});

/***/ }),

/***/ "IMQR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = fetchPaths;
/* harmony export (immutable) */ __webpack_exports__["b"] = addPath;
/* harmony export (immutable) */ __webpack_exports__["h"] = fetchStatus;
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchInfo;
/* harmony export (immutable) */ __webpack_exports__["i"] = fetchStructure;
/* harmony export (immutable) */ __webpack_exports__["f"] = fetchLogs;
/* harmony export (immutable) */ __webpack_exports__["m"] = update;
/* harmony export (immutable) */ __webpack_exports__["l"] = resolveFiles;
/* harmony export (immutable) */ __webpack_exports__["j"] = merge;
/* harmony export (immutable) */ __webpack_exports__["k"] = mergeinfo;
/* harmony export (immutable) */ __webpack_exports__["a"] = addFiles;
/* harmony export (immutable) */ __webpack_exports__["d"] = delFiles;
/* harmony export (immutable) */ __webpack_exports__["c"] = commitFiles;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__axios__ = __webpack_require__("gvqO");

var instance = Object(__WEBPACK_IMPORTED_MODULE_0__axios__["a" /* default */])('svn');
function fetchPaths() {
    return instance.get('paths');
}
function addPath(params) {
    return instance.post('path', params);
}
function fetchStatus(path) {
    return instance.get('status', {
        params: {
            path: path
        }
    });
}
function fetchInfo(path) {
    return instance.get('info', {
        params: {
            path: path
        }
    });
}
function fetchStructure(path, base) {
    return instance.get('/structure', {
        params: {
            path: path,
            base: base
        }
    });
}
function fetchLogs(params) {
    return instance.get('log', {
        params: params
    });
}
function update(path) {
    return instance.post('update', { path: path });
}
function resolveFiles(paths, path) {
    return instance.post('resolve', {
        path: path,
        paths: paths
    });
}
function merge(path, url, revisions) {
    return instance.post('merge', {
        path: path,
        url: url,
        revisions: revisions
    });
}
function mergeinfo(path, url) {
    return instance.get('mergeinfo', {
        params: {
            path: path,
            url: url
        }
    });
}
function addFiles(paths, path) {
    return instance.post('add', { paths: paths, path: path });
}
function delFiles(paths, path) {
    return instance.post('del', { paths: paths, path: path });
}
function commitFiles(path, paths, msg) {
    return instance.post('commit', { path: path, msg: msg, paths: paths });
}

/***/ }),

/***/ "Jwk5":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Commit.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "TvEJ":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Jwk5");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("cee49102", content, true, {});

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

/***/ "cieA":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"LogBoard.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "eJo3":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("cieA");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("77577b9c", content, true, {});

/***/ }),

/***/ "x3sp":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.log-board {\r\n  max-height: 500px;\r\n  text-align: left;\r\n  overflow: auto;\n}\r\n", "", {"version":3,"sources":["E:/ecovacs/front-tool-fe/src/components/LogBoard.vue"],"names":[],"mappings":";AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB","file":"LogBoard.vue","sourcesContent":["\n.log-board {\r\n  max-height: 500px;\r\n  text-align: left;\r\n  overflow: auto;\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ })

});
//# sourceMappingURL=svn.7b3830bd8497db2761c8.js.map