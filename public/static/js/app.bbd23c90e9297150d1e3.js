webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "0jML":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue-upload-component/src/chunk/ChunkUploadHandler.js + 1 modules
var ChunkUploadHandler = __webpack_require__("RXhB");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vue-upload-component/src/InputFile.vue
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var InputFile = ({
  methods: {
    change: function change(e) {
      this.$destroy();
      this.$parent.addInputFile(e.target);
      // eslint-disable-next-line
      new this.constructor({
        parent: this.$parent,
        el: this.$el
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7f36c02c","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vue-upload-component/src/InputFile.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{attrs:{"type":"file","name":_vm.$parent.name,"id":_vm.$parent.inputId || _vm.$parent.name,"accept":_vm.$parent.accept,"capture":_vm.$parent.capture,"webkitdirectory":_vm.$parent.directory && _vm.$parent.features.directory,"directory":_vm.$parent.directory && _vm.$parent.features.directory,"multiple":_vm.$parent.multiple && _vm.$parent.features.html5},on:{"change":_vm.change}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var src_InputFile = (esExports);
// CONCATENATED MODULE: ./node_modules/vue-upload-component/src/InputFile.vue
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
  InputFile,
  src_InputFile,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var vue_upload_component_src_InputFile = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vue-upload-component/src/FileUpload.vue
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var CHUNK_DEFAULT_OPTIONS = {
  headers: {},
  action: '',
  minSize: 1048576,
  maxActive: 3,
  maxRetries: 5,

  handler: ChunkUploadHandler["a" /* default */]
};

/* harmony default export */ var FileUpload = ({
  components: {
    InputFile: vue_upload_component_src_InputFile
  },
  props: {
    inputId: {
      type: String
    },

    name: {
      type: String,
      default: 'file'
    },

    accept: {
      type: String
    },

    capture: {},

    multiple: {
      type: Boolean
    },

    maximum: {
      type: Number,
      default: function _default() {
        return this.multiple ? 0 : 1;
      }
    },

    addIndex: {
      type: [Boolean, Number]
    },

    directory: {
      type: Boolean
    },

    postAction: {
      type: String
    },

    putAction: {
      type: String
    },

    customAction: {
      type: Function
    },

    headers: {
      type: Object,
      default: Object
    },

    data: {
      type: Object,
      default: Object
    },

    timeout: {
      type: Number,
      default: 0
    },

    drop: {
      default: false
    },

    dropDirectory: {
      type: Boolean,
      default: true
    },

    size: {
      type: Number,
      default: 0
    },

    extensions: {
      default: Array
    },

    value: {
      type: Array,
      default: Array
    },

    thread: {
      type: Number,
      default: 1
    },

    // Chunk upload enabled
    chunkEnabled: {
      type: Boolean,
      default: false
    },

    // Chunk upload properties
    chunk: {
      type: Object,
      default: function _default() {
        return CHUNK_DEFAULT_OPTIONS;
      }
    }
  },

  data: function data() {
    return {
      files: this.value,
      features: {
        html5: true,
        directory: false,
        drag: false
      },

      active: false,
      dropActive: false,

      uploading: 0,

      destroy: false
    };
  },


  /**
   * mounted
   * @return {[type]} [description]
   */
  mounted: function mounted() {
    var input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    // html5 特征
    if (window.FormData && input.files) {
      // 上传目录特征
      if (typeof input.webkitdirectory === 'boolean' || typeof input.directory === 'boolean') {
        this.features.directory = true;
      }

      // 拖拽特征
      if (this.features.html5 && typeof input.ondrop !== 'undefined') {
        this.features.drop = true;
      }
    } else {
      this.features.html5 = false;
    }

    // files 定位缓存
    this.maps = {};

    this.$nextTick(function () {

      // 更新下父级
      if (this.$parent) {
        this.$parent.$forceUpdate();
      }

      // 拖拽渲染
      this.watchDrop(this.drop);
    });
  },


  /**
   * beforeDestroy
   * @return {[type]} [description]
   */
  beforeDestroy: function beforeDestroy() {
    // 已销毁
    this.destroy = true;

    // 设置成不激活
    this.active = false;
  },


  computed: {
    /**
     * uploading 正在上传的线程
     * @return {[type]} [description]
     */

    /**
     * uploaded 文件列表是否全部已上传
     * @return {[type]} [description]
     */
    uploaded: function uploaded() {
      var file = void 0;
      for (var i = 0; i < this.files.length; i++) {
        file = this.files[i];
        if (file.fileObject && !file.error && !file.success) {
          return false;
        }
      }
      return true;
    },
    chunkOptions: function chunkOptions() {
      return Object.assign(CHUNK_DEFAULT_OPTIONS, this.chunk);
    },
    className: function className() {
      return ['file-uploads', this.features.html5 ? 'file-uploads-html5' : 'file-uploads-html4', this.features.directory && this.directory ? 'file-uploads-directory' : undefined, this.features.drop && this.drop ? 'file-uploads-drop' : undefined];
    }
  },

  watch: {
    active: function active(_active) {
      this.watchActive(_active);
    },
    dropActive: function dropActive() {
      if (this.$parent) {
        this.$parent.$forceUpdate();
      }
    },
    drop: function drop(value) {
      this.watchDrop(value);
    },
    value: function value(files) {
      if (this.files === files) {
        return;
      }
      this.files = files;

      var oldMaps = this.maps;

      // 重写 maps 缓存
      this.maps = {};
      for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        this.maps[file.id] = file;
      }

      // add, update
      for (var key in this.maps) {
        var newFile = this.maps[key];
        var oldFile = oldMaps[key];
        if (newFile !== oldFile) {
          this.emitFile(newFile, oldFile);
        }
      }

      // delete
      for (var _key in oldMaps) {
        if (!this.maps[_key]) {
          this.emitFile(undefined, oldMaps[_key]);
        }
      }
    }
  },

  methods: {

    // 清空
    clear: function clear() {
      if (this.files.length) {
        var files = this.files;
        this.files = [];

        // 定位
        this.maps = {};

        // 事件
        this.emitInput();
        for (var i = 0; i < files.length; i++) {
          this.emitFile(undefined, files[i]);
        }
      }
      return true;
    },


    // 选择
    get: function get(id) {
      if (!id) {
        return false;
      }

      if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object') {
        return this.maps[id.id] || false;
      }

      return this.maps[id] || false;
    },


    // 添加
    add: function add(_files) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.addIndex;

      var files = _files;
      var isArray = files instanceof Array;

      // 不是数组整理成数组
      if (!isArray) {
        files = [files];
      }

      // 遍历规范对象
      var addFiles = [];
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (this.features.html5 && file instanceof Blob) {
          file = {
            file: file,
            size: file.size,
            name: file.webkitRelativePath || file.relativePath || file.name || 'unknown',
            type: file.type
          };
        }
        var fileObject = false;
        if (file.fileObject === false) {
          // false
        } else if (file.fileObject) {
          fileObject = true;
        } else if (typeof Element !== 'undefined' && file.el instanceof Element) {
          fileObject = true;
        } else if (typeof Blob !== 'undefined' && file.file instanceof Blob) {
          fileObject = true;
        }
        if (fileObject) {
          file = _extends({
            fileObject: true,
            size: -1,
            name: 'Filename',
            type: '',
            active: false,
            error: '',
            success: false,
            putAction: this.putAction,
            postAction: this.postAction,
            timeout: this.timeout
          }, file, {
            response: {},

            progress: '0.00', // 只读
            speed: 0 // 只读
            // xhr: false,                // 只读
            // iframe: false,             // 只读
          });

          file.data = _extends({}, this.data, file.data ? file.data : {});

          file.headers = _extends({}, this.headers, file.headers ? file.headers : {});
        }

        // 必须包含 id
        if (!file.id) {
          file.id = Math.random().toString(36).substr(2);
        }

        if (this.emitFilter(file, undefined)) {
          continue;
        }

        // 最大数量限制
        if (this.maximum > 1 && addFiles.length + this.files.length >= this.maximum) {
          break;
        }

        addFiles.push(file);

        // 最大数量限制
        if (this.maximum === 1) {
          break;
        }
      }

      // 没有文件
      if (!addFiles.length) {
        return false;
      }

      // 如果是 1 清空
      if (this.maximum === 1) {
        this.clear();
      }

      // 添加进去 files
      var newFiles = void 0;
      if (index === true || index === 0) {
        newFiles = addFiles.concat(this.files);
      } else if (index) {
        newFiles = addFiles.concat([]);
        newFiles.splice(index, 0, addFiles);
      } else {
        newFiles = this.files.concat(addFiles);
      }

      this.files = newFiles;

      // 定位
      for (var _i = 0; _i < addFiles.length; _i++) {
        var _file2 = addFiles[_i];
        this.maps[_file2.id] = _file2;
      }

      // 事件
      this.emitInput();
      for (var _i2 = 0; _i2 < addFiles.length; _i2++) {
        this.emitFile(addFiles[_i2], undefined);
      }

      return isArray ? addFiles : addFiles[0];
    },


    // 添加表单文件
    addInputFile: function addInputFile(el) {
      var files = [];
      if (el.files) {
        for (var i = 0; i < el.files.length; i++) {
          var file = el.files[i];
          files.push({
            size: file.size,
            name: file.webkitRelativePath || file.relativePath || file.name,
            type: file.type,
            file: file,
            el: el
          });
        }
      } else {
        files.push({
          name: el.value.replace(/^.*?([^\/\\\r\n]+)$/, '$1'),
          el: el
        });
      }
      return this.add(files);
    },


    // 添加 DataTransfer
    addDataTransfer: function addDataTransfer(dataTransfer) {
      var _this = this;

      var files = [];
      if (dataTransfer.items && dataTransfer.items.length) {
        var items = [];
        for (var i = 0; i < dataTransfer.items.length; i++) {
          var item = dataTransfer.items[i];
          if (item.getAsEntry) {
            item = item.getAsEntry() || item.getAsFile();
          } else if (item.webkitGetAsEntry) {
            item = item.webkitGetAsEntry() || item.getAsFile();
          } else {
            item = item.getAsFile();
          }
          if (item) {
            items.push(item);
          }
        }

        return new Promise(function (resolve, reject) {
          var forEach = function forEach(i) {
            var item = items[i];
            // 结束 文件数量大于 最大数量
            if (!item || _this.maximum > 0 && files.length >= _this.maximum) {
              return resolve(_this.add(files));
            }
            _this.getEntry(item).then(function (results) {
              files.push.apply(files, _toConsumableArray(results));
              forEach(i + 1);
            });
          };
          forEach(0);
        });
      }

      if (dataTransfer.files.length) {
        for (var _i3 = 0; _i3 < dataTransfer.files.length; _i3++) {
          files.push(dataTransfer.files[_i3]);
          if (this.maximum > 0 && files.length >= this.maximum) {
            break;
          }
        }
        return Promise.resolve(this.add(files));
      }

      return Promise.resolve([]);
    },


    // 获得 entry
    getEntry: function getEntry(entry) {
      var _this2 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return new Promise(function (resolve, reject) {
        if (entry.isFile) {
          entry.file(function (file) {
            resolve([{
              size: file.size,
              name: path + file.name,
              type: file.type,
              file: file
            }]);
          });
        } else if (entry.isDirectory && _this2.dropDirectory) {
          var files = [];
          var dirReader = entry.createReader();
          var readEntries = function readEntries() {
            dirReader.readEntries(function (entries) {
              var forEach = function forEach(i) {
                if (!entries[i] && i === 0 || _this2.maximum > 0 && files.length >= _this2.maximum) {
                  return resolve(files);
                }
                if (!entries[i]) {
                  return readEntries();
                }
                _this2.getEntry(entries[i], path + entry.name + '/').then(function (results) {
                  files.push.apply(files, _toConsumableArray(results));
                  forEach(i + 1);
                });
              };
              forEach(0);
            });
          };
          readEntries();
        } else {
          resolve([]);
        }
      });
    },
    replace: function replace(id1, id2) {
      var file1 = this.get(id1);
      var file2 = this.get(id2);
      if (!file1 || !file2 || file1 === file2) {
        return false;
      }
      var files = this.files.concat([]);
      var index1 = files.indexOf(file1);
      var index2 = files.indexOf(file2);
      if (index1 === -1 || index2 === -1) {
        return false;
      }
      files[index1] = file2;
      files[index2] = file1;
      this.files = files;
      this.emitInput();
      return true;
    },


    // 移除
    remove: function remove(id) {
      var file = this.get(id);
      if (file) {
        if (this.emitFilter(undefined, file)) {
          return false;
        }
        var files = this.files.concat([]);
        var index = files.indexOf(file);
        if (index === -1) {
          console.error('remove', file);
          return false;
        }
        files.splice(index, 1);
        this.files = files;

        // 定位
        delete this.maps[file.id];

        // 事件
        this.emitInput();
        this.emitFile(undefined, file);
      }
      return file;
    },


    // 更新
    update: function update(id, data) {
      var file = this.get(id);
      if (file) {
        var newFile = _extends({}, file, data);
        // 停用必须加上错误
        if (file.fileObject && file.active && !newFile.active && !newFile.error && !newFile.success) {
          newFile.error = 'abort';
        }

        if (this.emitFilter(newFile, file)) {
          return false;
        }

        var files = this.files.concat([]);
        var index = files.indexOf(file);
        if (index === -1) {
          console.error('update', file);
          return false;
        }
        files.splice(index, 1, newFile);
        this.files = files;

        // 删除  旧定位 写入 新定位 （已便支持修改id)
        delete this.maps[file.id];
        this.maps[newFile.id] = newFile;

        // 事件
        this.emitInput();
        this.emitFile(newFile, file);
        return newFile;
      }
      return false;
    },


    // 预处理 事件 过滤器
    emitFilter: function emitFilter(newFile, oldFile) {
      var isPrevent = false;
      this.$emit('input-filter', newFile, oldFile, function () {
        isPrevent = true;
        return isPrevent;
      });
      return isPrevent;
    },


    // 处理后 事件 分发
    emitFile: function emitFile(newFile, oldFile) {
      this.$emit('input-file', newFile, oldFile);
      if (newFile && newFile.fileObject && newFile.active && (!oldFile || !oldFile.active)) {
        this.uploading++;
        // 激活
        this.$nextTick(function () {
          var _this3 = this;

          setTimeout(function () {
            _this3.upload(newFile).then(function () {
              // eslint-disable-next-line
              newFile = _this3.get(newFile);
              if (newFile && newFile.fileObject) {
                _this3.update(newFile, {
                  active: false,
                  success: !newFile.error
                });
              }
            }).catch(function (e) {
              _this3.update(newFile, {
                active: false,
                success: false,
                error: e.code || e.error || e.message || e
              });
            });
          }, parseInt(Math.random() * 50 + 50, 10));
        });
      } else if ((!newFile || !newFile.fileObject || !newFile.active) && oldFile && oldFile.fileObject && oldFile.active) {
        // 停止
        this.uploading--;
      }

      // 自动延续激活
      if (this.active && (Boolean(newFile) !== Boolean(oldFile) || newFile.active !== oldFile.active)) {
        this.watchActive(true);
      }
    },
    emitInput: function emitInput() {
      this.$emit('input', this.files);
    },


    // 上传
    upload: function upload(id) {
      var file = this.get(id);

      // 被删除
      if (!file) {
        return Promise.reject('not_exists');
      }

      // 不是文件对象
      if (!file.fileObject) {
        return Promise.reject('file_object');
      }

      // 有错误直接响应
      if (file.error) {
        return Promise.reject(file.error);
      }

      // 已完成直接响应
      if (file.success) {
        return Promise.resolve(file);
      }

      // 后缀
      var extensions = this.extensions;
      if (extensions && (extensions.length || typeof extensions.length === 'undefined')) {
        if ((typeof extensions === 'undefined' ? 'undefined' : _typeof(extensions)) !== 'object' || !(extensions instanceof RegExp)) {
          if (typeof extensions === 'string') {
            extensions = extensions.split(',').map(function (value) {
              return value.trim();
            }).filter(function (value) {
              return value;
            });
          }
          extensions = new RegExp('\\.(' + extensions.join('|').replace(/\./g, '\\.') + ')$', 'i');
        }
        if (file.name.search(extensions) === -1) {
          return Promise.reject('extension');
        }
      }

      // 大小
      if (this.size > 0 && file.size >= 0 && file.size > this.size) {
        return Promise.reject('size');
      }

      if (this.customAction) {
        return this.customAction(file, this);
      }

      if (this.features.html5) {
        if (this.shouldUseChunkUpload(file)) {
          return this.uploadChunk(file);
        }
        if (file.putAction) {
          return this.uploadPut(file);
        }
        if (file.postAction) {
          return this.uploadHtml5(file);
        }
      }
      if (file.postAction) {
        return this.uploadHtml4(file);
      }
      return Promise.reject('No action configured');
    },


    /**
     * Whether this file should be uploaded using chunk upload or not
     *
     * @param Object file
     */
    shouldUseChunkUpload: function shouldUseChunkUpload(file) {
      return this.chunkEnabled && !!this.chunkOptions.handler && file.size > this.chunkOptions.minSize;
    },


    /**
     * Upload a file using Chunk method
     *
     * @param File file
     */
    uploadChunk: function uploadChunk(file) {
      var HandlerClass = this.chunkOptions.handler;
      file.chunk = new HandlerClass(file, this.chunkOptions);

      return file.chunk.upload();
    },
    uploadPut: function uploadPut(file) {
      var querys = [];
      var value = void 0;
      for (var key in file.data) {
        value = file.data[key];
        if (value !== null && value !== undefined) {
          querys.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
      }
      var queryString = querys.length ? (file.putAction.indexOf('?') === -1 ? '?' : '&') + querys.join('&') : '';
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', file.putAction + queryString);
      return this.uploadXhr(xhr, file, file.file);
    },
    uploadHtml5: function uploadHtml5(file) {
      var form = new window.FormData();
      var value = void 0;
      for (var key in file.data) {
        value = file.data[key];
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString !== 'function') {
          if (value instanceof File) {
            form.append(key, value, value.name);
          } else {
            form.append(key, JSON.stringify(value));
          }
        } else if (value !== null && value !== undefined) {
          form.append(key, value);
        }
      }
      form.append(this.name, file.file, file.file.filename || file.name);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', file.postAction);
      return this.uploadXhr(xhr, file, form);
    },
    uploadXhr: function uploadXhr(xhr, _file, body) {
      var _this4 = this;

      var file = _file;
      var speedTime = 0;
      var speedLoaded = 0;

      // 进度条
      xhr.upload.onprogress = function (e) {
        // 还未开始上传 已删除 未激活
        file = _this4.get(file);
        if (!e.lengthComputable || !file || !file.fileObject || !file.active) {
          return;
        }

        // 进度 速度 每秒更新一次
        var speedTime2 = Math.round(Date.now() / 1000);
        if (speedTime2 === speedTime) {
          return;
        }
        speedTime = speedTime2;

        file = _this4.update(file, {
          progress: (e.loaded / e.total * 100).toFixed(2),
          speed: e.loaded - speedLoaded
        });
        speedLoaded = e.loaded;
      };

      // 检查激活状态
      var interval = setInterval(function () {
        file = _this4.get(file);
        if (file && file.fileObject && !file.success && !file.error && file.active) {
          return;
        }

        if (interval) {
          clearInterval(interval);
          interval = false;
        }

        try {
          xhr.abort();
          xhr.timeout = 1;
        } catch (e) {}
      }, 100);

      return new Promise(function (resolve, reject) {
        var complete = void 0;
        var fn = function fn(e) {
          // 已经处理过了
          if (complete) {
            return;
          }
          complete = true;
          if (interval) {
            clearInterval(interval);
            interval = false;
          }

          file = _this4.get(file);

          // 不存在直接响应
          if (!file) {
            return reject('not_exists');
          }

          // 不是文件对象
          if (!file.fileObject) {
            return reject('file_object');
          }

          // 有错误自动响应
          if (file.error) {
            return reject(file.error);
          }

          // 未激活
          if (!file.active) {
            return reject('abort');
          }

          // 已完成 直接相应
          if (file.success) {
            return resolve(file);
          }

          var data = {};

          switch (e.type) {
            case 'timeout':
            case 'abort':
              data.error = e.type;
              break;
            case 'error':
              if (!xhr.status) {
                data.error = 'network';
              } else if (xhr.status >= 500) {
                data.error = 'server';
              } else if (xhr.status >= 400) {
                data.error = 'denied';
              }
              break;
            default:
              if (xhr.status >= 500) {
                data.error = 'server';
              } else if (xhr.status >= 400) {
                data.error = 'denied';
              } else {
                data.progress = '100.00';
              }
          }

          if (xhr.responseText) {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (contentType && contentType.indexOf('/json') !== -1) {
              data.response = JSON.parse(xhr.responseText);
            } else {
              data.response = xhr.responseText;
            }
          }

          // 更新
          file = _this4.update(file, data);

          // 相应错误
          if (file.error) {
            return reject(file.error);
          }

          // 响应
          return resolve(file);
        };

        // 事件
        xhr.onload = fn;
        xhr.onerror = fn;
        xhr.onabort = fn;
        xhr.ontimeout = fn;

        // 超时
        if (file.timeout) {
          xhr.timeout = file.timeout;
        }

        // headers
        for (var key in file.headers) {
          xhr.setRequestHeader(key, file.headers[key]);
        }

        // 更新 xhr
        file = _this4.update(file, { xhr: xhr });

        // 开始上传
        xhr.send(body);
      });
    },
    uploadHtml4: function uploadHtml4(_file) {
      var _this5 = this;

      var file = _file;
      var onKeydown = function onKeydown(e) {
        if (e.keyCode === 27) {
          e.preventDefault();
        }
      };

      var iframe = document.createElement('iframe');
      iframe.id = 'upload-iframe-' + file.id;
      iframe.name = 'upload-iframe-' + file.id;
      iframe.src = 'about:blank';
      iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;');

      var form = document.createElement('form');

      form.action = file.postAction;

      form.name = 'upload-form-' + file.id;

      form.setAttribute('method', 'POST');
      form.setAttribute('target', 'upload-iframe-' + file.id);
      form.setAttribute('enctype', 'multipart/form-data');

      var value = void 0;
      var input = void 0;
      for (var key in file.data) {
        value = file.data[key];
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toString !== 'function') {
          value = JSON.stringify(value);
        }
        if (value !== null && value !== undefined) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }
      }
      form.appendChild(file.el);

      document.body.appendChild(iframe).appendChild(form);

      var getResponseData = function getResponseData() {
        var doc = void 0;
        try {
          if (iframe.contentWindow) {
            doc = iframe.contentWindow.document;
          }
        } catch (err) {}
        if (!doc) {
          try {
            doc = iframe.contentDocument ? iframe.contentDocument : iframe.document;
          } catch (err) {
            doc = iframe.document;
          }
        }
        if (doc && doc.body) {
          return doc.body.innerHTML;
        }
        return null;
      };

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          file = _this5.update(file, { iframe: iframe });

          // 不存在
          if (!file) {
            return reject('not_exists');
          }

          // 定时检查
          var interval = setInterval(function () {
            file = _this5.get(file);
            if (file && file.fileObject && !file.success && !file.error && file.active) {
              return;
            }

            if (interval) {
              clearInterval(interval);
              interval = false;
            }

            iframe.onabort({ type: file ? 'abort' : 'not_exists' });
          }, 100);

          var complete = void 0;
          var fn = function fn(e) {
            // 已经处理过了
            if (complete) {
              return;
            }
            complete = true;

            if (interval) {
              clearInterval(interval);
              interval = false;
            }

            // 关闭 esc 事件
            document.body.removeEventListener('keydown', onKeydown);

            file = _this5.get(file);

            // 不存在直接响应
            if (!file) {
              return reject('not_exists');
            }

            // 不是文件对象
            if (!file.fileObject) {
              return reject('file_object');
            }

            // 有错误自动响应
            if (file.error) {
              return reject(file.error);
            }

            // 未激活
            if (!file.active) {
              return reject('abort');
            }

            // 已完成 直接相应
            if (file.success) {
              return resolve(file);
            }

            var response = getResponseData();
            var data = {};
            switch (e.type) {
              case 'abort':
                data.error = 'abort';
                break;
              case 'error':
                if (file.error) {
                  data.error = file.error;
                } else if (response === null) {
                  data.error = 'network';
                } else {
                  data.error = 'denied';
                }
                break;
              default:
                if (file.error) {
                  data.error = file.error;
                } else if (data === null) {
                  data.error = 'network';
                } else {
                  data.progress = '100.00';
                }
            }

            if (response !== null) {
              if (response && response.substr(0, 1) === '{' && response.substr(response.length - 1, 1) === '}') {
                try {
                  response = JSON.parse(response);
                } catch (err) {}
              }
              data.response = response;
            }

            // 更新
            file = _this5.update(file, data);

            if (file.error) {
              return reject(file.error);
            }

            // 响应
            return resolve(file);
          };

          // 添加事件
          iframe.onload = fn;
          iframe.onerror = fn;
          iframe.onabort = fn;

          // 禁止 esc 键
          document.body.addEventListener('keydown', onKeydown);

          // 提交
          form.submit();
        }, 50);
      }).then(function (res) {
        iframe.parentNode && iframe.parentNode.removeChild(iframe);
        return res;
      }).catch(function (res) {
        iframe.parentNode && iframe.parentNode.removeChild(iframe);
        return res;
      });
    },
    watchActive: function watchActive(active) {
      var file = void 0;
      var index = 0;
      while (file = this.files[index]) {
        index++;
        if (!file.fileObject) {
          // 不是文件对象
        } else if (active && !this.destroy) {
          if (this.uploading >= this.thread || this.uploading && !this.features.html5) {
            break;
          }
          if (!file.active && !file.error && !file.success) {
            this.update(file, { active: true });
          }
        } else {
          if (file.active) {
            this.update(file, { active: false });
          }
        }
      }
      if (this.uploading === 0) {
        this.active = false;
      }
    },
    watchDrop: function watchDrop(_el) {
      var el = _el;
      if (!this.features.drop) {
        return;
      }

      // 移除挂载
      if (this.dropElement) {
        try {
          document.removeEventListener('dragenter', this.onDragenter, false);
          document.removeEventListener('dragleave', this.onDragleave, false);
          document.removeEventListener('drop', this.onDocumentDrop, false);
          this.dropElement.removeEventListener('dragover', this.onDragover, false);
          this.dropElement.removeEventListener('drop', this.onDrop, false);
        } catch (e) {}
      }

      if (!el) {
        el = false;
      } else if (typeof el === 'string') {
        el = document.querySelector(el) || this.$root.$el.querySelector(el);
      } else if (el === true) {
        el = this.$parent.$el;
      }

      this.dropElement = el;

      if (this.dropElement) {
        document.addEventListener('dragenter', this.onDragenter, false);
        document.addEventListener('dragleave', this.onDragleave, false);
        document.addEventListener('drop', this.onDocumentDrop, false);
        this.dropElement.addEventListener('dragover', this.onDragover, false);
        this.dropElement.addEventListener('drop', this.onDrop, false);
      }
    },
    onDragenter: function onDragenter(e) {
      e.preventDefault();
      if (!this.dropActive) {
        this.dropActive = true;
      }
    },
    onDragleave: function onDragleave(e) {
      e.preventDefault();
      if (e.target.nodeName === 'HTML' || e.screenX === 0 && e.screenY === 0 && !e.fromElement && e.offsetX <= 0) {
        this.dropActive = false;
      }
    },
    onDragover: function onDragover(e) {
      e.preventDefault();
    },
    onDocumentDrop: function onDocumentDrop() {
      this.dropActive = false;
    },
    onDrop: function onDrop(e) {
      e.preventDefault();
      this.addDataTransfer(e.dataTransfer);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-edf39dee","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vue-upload-component/src/FileUpload.vue
var FileUpload_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.className},[_vm._t("default"),_vm._v(" "),_c('input-file')],2)}
var FileUpload_staticRenderFns = []
var FileUpload_esExports = { render: FileUpload_render, staticRenderFns: FileUpload_staticRenderFns }
/* harmony default export */ var src_FileUpload = (FileUpload_esExports);
// CONCATENATED MODULE: ./node_modules/vue-upload-component/src/FileUpload.vue
function injectStyle (ssrContext) {
  __webpack_require__("hA/Q")
}
var FileUpload_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var FileUpload___vue_template_functional__ = false
/* styles */
var FileUpload___vue_styles__ = injectStyle
/* scopeId */
var FileUpload___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var FileUpload___vue_module_identifier__ = null
var FileUpload_Component = FileUpload_normalizeComponent(
  FileUpload,
  src_FileUpload,
  FileUpload___vue_template_functional__,
  FileUpload___vue_styles__,
  FileUpload___vue_scopeId__,
  FileUpload___vue_module_identifier__
)

/* harmony default export */ var vue_upload_component_src_FileUpload = __webpack_exports__["default"] = (FileUpload_Component.exports);


/***/ }),

/***/ "3tHY":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "7sGd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "7zck":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "9zrn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "EOwD":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "HvjG":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "M5yl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__("7+uW");

// CONCATENATED MODULE: ./src/util/mid.ts

/* harmony default export */ var mid = (new vue_esm["a" /* default */]());
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


/* harmony default export */ var App = ({
  name: 'app',
  data: function data() {
    return {
      snackbar: false,
      snackText: ''
    };
  },
  created: function created() {
    var _this = this;

    mid.$on('toast', function (msg) {
      _this.snackbar = true;
      _this.snackText = msg;
    });
  },
  beforeDestroy: function beforeDestroy() {
    mid.$off('toast');
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2bb0145f","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/App.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app',{attrs:{"light":""}},[_c('v-toolbar',{attrs:{"color":"primary"}},[_c('v-toolbar-side-icon'),_vm._v(" "),_c('router-link',{attrs:{"to":"/"}},[_c('v-toolbar-title',{staticClass:"white--text"},[_vm._v("\n        ECOVACS前端控制台\n      ")])],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("search")])],1),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("apps")])],1),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("refresh")])],1),_vm._v(" "),_c('v-btn',{attrs:{"icon":""}},[_c('v-icon',[_vm._v("more_vert")])],1)],1),_vm._v(" "),_c('router-view'),_vm._v(" "),_c('v-snackbar',{attrs:{"timeout":3000,"top":""},model:{value:(_vm.snackbar),callback:function ($$v) {_vm.snackbar=$$v},expression:"snackbar"}},[_vm._v("\n    "+_vm._s(_vm.snackText)+"\n  ")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_App = (esExports);
// CONCATENATED MODULE: ./src/App.vue
function injectStyle (ssrContext) {
  __webpack_require__("EOwD")
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

// EXTERNAL MODULE: ./node_modules/babel-runtime/regenerator/index.js
var regenerator = __webpack_require__("Xxa5");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("exGp");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("mtWM");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/util/index.ts
var getAData = function getAData(_ref) {
    var _ref$data = _ref.data,
        code = _ref$data.code,
        data = _ref$data.data,
        msg = _ref$data.msg;

    if (code === 0) {
        return data;
    }
    throw msg;
};
// CONCATENATED MODULE: ./src/api/svn.ts

var instance = axios_default.a.create({
    baseURL: '/api/svn'
});

function fetchPaths() {
    return instance.get('paths').then(getAData);
}
function addPath(params) {
    return instance.post('path', params);
}
function fetchStatus(path) {
    return instance.get('status', {
        params: {
            path: path
        }
    }).then(getAData);
}
function fetchInfo(path) {
    return instance.get('info', {
        params: {
            path: path
        }
    }).then(getAData);
}
function fetchStructure(path, base) {
    return instance.get('/structure', {
        params: {
            path: path,
            base: base
        }
    }).then(getAData);
}
function fetchLogs(params) {
    return instance.get('log', {
        params: params
    }).then(getAData);
}
function svn_update(path) {
    return instance.post('update', { path: path }).then(getAData);
}
function resolveFiles(paths, path) {
    return instance.post('resolve', {
        path: path,
        paths: paths
    }).then(getAData);
}
function merge(path, url, revisions) {
    return instance.post('merge', {
        path: path,
        url: url,
        revisions: revisions
    }).then(getAData);
}
function mergeinfo(path, url) {
    return instance.get('mergeinfo', {
        params: {
            path: path,
            url: url
        }
    }).then(getAData);
}
function addFiles(paths, path) {
    return instance.post('add', { paths: paths, path: path }).then(getAData);
}
function delFiles(paths, path) {
    return instance.post('del', { paths: paths, path: path }).then(getAData);
}
function commitFiles(path, paths, msg) {
    return instance.post('commit', { path: path, msg: msg, paths: paths }).then(getAData);
}
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
      fetchStatus(path).then(function (data) {
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
var Status_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-card',[_c('v-card-actions',[_c('v-checkbox',{attrs:{"label":"选中所有","indeterminate":_vm.isIndeterminate},model:{value:(_vm.allSelected),callback:function ($$v) {_vm.allSelected=$$v},expression:"allSelected"}}),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-tooltip',{attrs:{"top":""}},[_c('v-btn',{attrs:{"slot":"activator","icon":"","title":"刷新"},on:{"click":_vm.refresh},slot:"activator"},[_c('v-icon',[_vm._v("refresh")])],1),_vm._v(" "),_c('span',[_vm._v("刷新")])],1)],1)],1),_vm._v(" "),_c('v-data-table',{attrs:{"headers":_vm.headers,"items":_vm.items,"loading":_vm.loading,"pagination":_vm.pagination,"item-key":"path","select-all":""},on:{"update:pagination":function($event){_vm.pagination=$event}},scopedSlots:_vm._u([{key:"items",fn:function(props){return [_c('tr',{style:(props.item.hasConflict?'background:red':''),attrs:{"active":props.selected}},[_c('td',[_c('v-checkbox',{attrs:{"primary":"","hide-details":""},model:{value:(props.selected),callback:function ($$v) {_vm.$set(props, "selected", $$v)},expression:"props.selected"}})],1),_vm._v(" "),_c('td',[_vm._v(_vm._s(props.item.path))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.type))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.revision))]),_vm._v(" "),_c('td',[(props.item.commit)?_c('div',[_vm._v("\n            提交者："+_vm._s(props.item.commit.author)+" "),_c('br'),_vm._v(" 时间："+_vm._s(_vm._f("date")(props.item.commit.date))+"\n            "),_c('br'),_vm._v(" 版本："+_vm._s(props.item.commit.revision)+"\n          ")]):_vm._e()])])]}}]),model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v},expression:"selected"}})],1)}
var Status_staticRenderFns = []
var Status_esExports = { render: Status_render, staticRenderFns: Status_staticRenderFns }
/* harmony default export */ var svn_Status = (Status_esExports);
// CONCATENATED MODULE: ./src/pages/svn/Status.vue
var Status_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Status___vue_template_functional__ = false
/* styles */
var Status___vue_styles__ = null
/* scopeId */
var Status___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Status___vue_module_identifier__ = null
var Status_Component = Status_normalizeComponent(
  Status,
  svn_Status,
  Status___vue_template_functional__,
  Status___vue_styles__,
  Status___vue_scopeId__,
  Status___vue_module_identifier__
)

/* harmony default export */ var pages_svn_Status = (Status_Component.exports);

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
      fetchStructure(this.url, this.baseObj.name).then(function (data) {
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
      return fetchLogs(this.logQueryOptions).then(function (_ref) {
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

      return mergeinfo(this.path, this.baseObj.url).then(function (revisions) {
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
      return merge(path, this.baseObj.url, revisions);
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
      this.getLogs(this.baseObj.url);
    }
  },
  computed: {
    urls: function urls() {
      var _this5 = this;

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
          items = items[0].files.filter(function (item) {
            return item.fullPath !== _this5.url;
          }).map(function (item) {
            return { text: item.name, value: item.fullPath };
          });
        }
      }
      return items;
    },
    filteredItems: function filteredItems() {
      if (!this.ignoreMerged) {
        return this.items;
      }
      return this.items.filter(function (item) {
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
      var _this6 = this;

      return this.filteredItems.map(function (item) {
        return assign_default()({
          isMerged: _this6.revisions.lastIndexOf(item.revision) > -1
        }, item);
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e3d6b348","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/svn/Merge.vue
var Merge_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-layout',{attrs:{"wrap":""}},[_c('v-flex',{attrs:{"xs8":""}},[_c('v-radio-group',{attrs:{"row":""},on:{"change":_vm.getStructure},model:{value:(_vm.baseObj.mergeType),callback:function ($$v) {_vm.$set(_vm.baseObj, "mergeType", $$v)},expression:"baseObj.mergeType"}},[_c('v-radio',{attrs:{"label":"branch","value":"branch"}}),_vm._v(" "),_c('v-radio',{attrs:{"label":"tag","value":"tag"}}),_vm._v(" "),_c('v-radio',{attrs:{"label":"trunk","value":"trunk"}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('v-text-field',{attrs:{"label":"版本库根目录名"},model:{value:(_vm.baseObj.name),callback:function ($$v) {_vm.$set(_vm.baseObj, "name", $$v)},expression:"baseObj.name"}})],1),_vm._v(" "),(_vm.baseObj.mergeType)?[_c('v-flex',{attrs:{"xs8":""}},[_c('v-select',{attrs:{"items":_vm.urls,"label":"版本名","single-line":"","bottom":"","autocomplete":""},model:{value:(_vm.baseObj.url),callback:function ($$v) {_vm.$set(_vm.baseObj, "url", $$v)},expression:"baseObj.url"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('v-btn',{attrs:{"color":"primary"},on:{"click":_vm.getStructure}},[_vm._v("拉取")])],1)]:_vm._e()],2),_vm._v(" "),_c('div',{on:{"contextmenu":function($event){$event.preventDefault();return _vm.onContextMenu($event)}}},[(_vm.baseObj.url)?_c('v-data-table',{attrs:{"headers":_vm.headers,"items":_vm.itemsWithMergeinfo,"select-all":"","item-key":"revision","pagination":_vm.pagination,"total-items":_vm.pagination.totalItems,"loading":_vm.loading},on:{"update:pagination":function($event){_vm.pagination=$event}},scopedSlots:_vm._u([{key:"items",fn:function(props){return [_c('tr',{attrs:{"active":props.selected}},[_c('td',[_c('v-checkbox',{attrs:{"primary":"","hide-details":""},model:{value:(props.selected),callback:function ($$v) {_vm.$set(props, "selected", $$v)},expression:"props.selected"}})],1),_vm._v(" "),_c('td',[_vm._v(_vm._s(props.item.revision)+"\n            "),(props.item.isMerged)?_c('span',{staticClass:"brown lighten-4"},[_vm._v("(已合并)")]):_vm._e()]),_vm._v(" "),_c('td',[_vm._v(_vm._s(props.item.msg))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.author))]),_vm._v(" "),_c('td',[_vm._v("\n            "+_vm._s(_vm._f("date")(props.item.date))+"\n          ")]),_vm._v(" "),_c('td',[_c('v-btn',{attrs:{"color":"primary"},on:{"click":function($event){_vm.showLogFiles(props.item.paths)}}},[_vm._v("查看")])],1)])]}}]),model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v},expression:"selected"}}):_vm._e()],1),_vm._v(" "),(_vm.logFiles.length>0)?_c('v-data-table',{attrs:{"headers":_vm.logFilesHeader,"items":_vm.logFiles,"item-key":"path"},scopedSlots:_vm._u([{key:"items",fn:function(props){return [_c('tr',[_c('td',[_vm._v(_vm._s(props.item.path))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.kind))]),_vm._v(" "),_c('td',{staticClass:"text-xs-center"},[_vm._v(_vm._s(props.item.action))])])]}}])}):_vm._e(),_vm._v(" "),_c('v-menu',{attrs:{"offset-y":"","absolute":"","position-x":_vm.x,"position-y":_vm.y,"min-width":"15em"},model:{value:(_vm.showMenu),callback:function ($$v) {_vm.showMenu=$$v},expression:"showMenu"}},[_c('v-list',[_c('v-list-tile',{on:{"click":_vm.refresh}},[_c('v-list-tile-title',[_vm._v("刷新记录")])],1),_vm._v(" "),_c('v-list-tile',[_c('v-list-tile-title',[_c('v-switch',{attrs:{"label":"忽略已合并版本"},model:{value:(_vm.ignoreMerged),callback:function ($$v) {_vm.ignoreMerged=$$v},expression:"ignoreMerged"}})],1)],1)],1)],1)],1)}
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
function Commit_injectStyle (ssrContext) {
  __webpack_require__("TvEJ")
}
var Commit_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Commit___vue_template_functional__ = false
/* styles */
var Commit___vue_styles__ = Commit_injectStyle
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

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/promise.js
var promise = __webpack_require__("//Fk");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// CONCATENATED MODULE: ./src/api/common.ts


function common_explore(path) {
    return axios_default.a.get('/api/explore', {
        params: {
            path: path
        }
    });
}
function getScript(url) {
    var ele = document.createElement('script');
    ele.src = url;
    document.body.appendChild(ele);
    document.body.removeChild(ele);
    return new promise_default.a(function (resolve, reject) {
        ele.onload = resolve;
        ele.onerror = reject;
    });
}
function getFileUrl(path) {
    return '/api/file?path=' + path;
}
function getUploadUrl() {
    return '/api/upload';
}
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
      common_explore(this.path);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-96fd4e2a","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Explorer.vue
var Explorer_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-tooltip',{attrs:{"bottom":""}},[_c('v-btn',{attrs:{"slot":"activator"},on:{"click":_vm.explore},slot:"activator"},[_vm._v("...")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.path))])],1)}
var Explorer_staticRenderFns = []
var Explorer_esExports = { render: Explorer_render, staticRenderFns: Explorer_staticRenderFns }
/* harmony default export */ var components_Explorer = (Explorer_esExports);
// CONCATENATED MODULE: ./src/components/Explorer.vue
function Explorer_injectStyle (ssrContext) {
  __webpack_require__("7sGd")
}
var Explorer_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Explorer___vue_template_functional__ = false
/* styles */
var Explorer___vue_styles__ = Explorer_injectStyle
/* scopeId */
var Explorer___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Explorer___vue_module_identifier__ = null
var Explorer_Component = Explorer_normalizeComponent(
  Explorer,
  components_Explorer,
  Explorer___vue_template_functional__,
  Explorer___vue_styles__,
  Explorer___vue_scopeId__,
  Explorer___vue_module_identifier__
)

/* harmony default export */ var src_components_Explorer = (Explorer_Component.exports);

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
    Explorer: src_components_Explorer
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
    fetchPaths().then(function (data) {
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

      fetchInfo(this.path).then(function (data) {
        _this2.info = data[0];
      });
    },
    update: function update() {
      var _this3 = this;

      return svn_update(this.path).then(function (data) {
        _this3.addRecord(data);
      });
    },
    resolve: function resolve(paths) {
      var _this4 = this;

      if (paths.length) {
        return resolveFiles(paths, this.path).then(function (data) {
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
                  _context.next = 31;
                  break;
                }

                if (!(svnStatus.newFiles.length > 0)) {
                  _context.next = 24;
                  break;
                }

                _context.next = 24;
                return addFiles(svnStatus.newFiles, _this5.path).then(addRecord);

              case 24:
                if (!(svnStatus.delFiles.length > 0)) {
                  _context.next = 27;
                  break;
                }

                _context.next = 27;
                return delFiles(svnStatus.delFiles, _this5.path).then(addRecord);

              case 27:
                _context.next = 29;
                return commitFiles(_this5.path, [], _this5.msg).then(addRecord);

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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6a3b7ffe","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/svn/Action.vue
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

/* harmony default export */ var pages_svn_Action = (Action_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/FormEdit.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var FormEdit = ({
  props: ['fields', 'add'],
  data: function data() {
    return {
      disabled: false
    };
  },

  methods: {
    onAdd: function onAdd() {
      var _this = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var params;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = {};

                _this.disabled = true;
                _this.fields.forEach(function (item) {
                  params[item.name] = item.value;
                });
                _context.prev = 3;
                _context.next = 6;
                return _this.add(params);

              case 6:
                mid.$emit('toast', '添加成功');

              case 7:
                _context.prev = 7;

                _this.disabled = false;
                return _context.finish(7);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[3,, 7, 10]]);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6f6d9e88","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/FormEdit.vue
var FormEdit_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-form',{on:{"submit":function($event){$event.preventDefault();return _vm.onAdd($event)}}},[_vm._l((_vm.fields),function(item,i){return [(item.type==='select')?_c('v-select',{key:i,attrs:{"items":item.items,"label":item.label,"required":item.required,"bottom":""},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}):(item.type==='checkbox')?_c('v-switch',{key:i,attrs:{"label":item.label,"color":"red"},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}):(item.type==='number')?_c('v-text-field',{key:i,attrs:{"label":item.label,"type":item.type,"required":item.required},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", _vm._n($$v))},expression:"item.value"}}):_c('v-text-field',{key:i,attrs:{"label":item.label,"type":item.type,"required":item.required,"multi-line":item.multiple,"clearable":""},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"item.value"}})]}),_vm._v(" "),_vm._t("default"),_vm._v(" "),_c('div',[_c('v-btn',{attrs:{"color":"primary","type":"submit","disabled":_vm.disabled}},[_vm._v("添加")])],1)],2)}
var FormEdit_staticRenderFns = []
var FormEdit_esExports = { render: FormEdit_render, staticRenderFns: FormEdit_staticRenderFns }
/* harmony default export */ var components_FormEdit = (FormEdit_esExports);
// CONCATENATED MODULE: ./src/components/FormEdit.vue
var FormEdit_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var FormEdit___vue_template_functional__ = false
/* styles */
var FormEdit___vue_styles__ = null
/* scopeId */
var FormEdit___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var FormEdit___vue_module_identifier__ = null
var FormEdit_Component = FormEdit_normalizeComponent(
  FormEdit,
  components_FormEdit,
  FormEdit___vue_template_functional__,
  FormEdit___vue_styles__,
  FormEdit___vue_scopeId__,
  FormEdit___vue_module_identifier__
)

/* harmony default export */ var src_components_FormEdit = (FormEdit_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/svn/Add.vue
//
//
//



/* harmony default export */ var Add = ({
  components: {
    FormEdit: src_components_FormEdit
  },
  data: function data() {
    return {
      add: addPath,
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
var Add_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})}
var Add_staticRenderFns = []
var Add_esExports = { render: Add_render, staticRenderFns: Add_staticRenderFns }
/* harmony default export */ var svn_Add = (Add_esExports);
// CONCATENATED MODULE: ./src/pages/svn/Add.vue
var Add_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Add___vue_template_functional__ = false
/* styles */
var Add___vue_styles__ = null
/* scopeId */
var Add___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Add___vue_module_identifier__ = null
var Add_Component = Add_normalizeComponent(
  Add,
  svn_Add,
  Add___vue_template_functional__,
  Add___vue_styles__,
  Add___vue_scopeId__,
  Add___vue_module_identifier__
)

/* harmony default export */ var pages_svn_Add = (Add_Component.exports);

// CONCATENATED MODULE: ./src/pages/svn/index.js



/* harmony default export */ var svn = ({
  path: '/svn',
  component: src_components_ContainerWithMenu,
  props: {
    menus: [{ title: '通用', icon: 'dashboard', link: '/svn' }, { title: '添加', icon: 'add', link: '/svn/add' }]
  },
  children: [{
    name: 'action',
    path: '',
    component: pages_svn_Action
  }, {
    name: 'add',
    path: 'add',
    component: pages_svn_Add
  }]
});
// CONCATENATED MODULE: ./src/api/ssh.ts

var ssh_instance = axios_default.a.create({
    baseURL: '/api/ssh'
});

function fetchInfos() {
    return ssh_instance.get('info').then(getAData);
}
function ssh_fetchInfo(id) {
    return ssh_instance.get('info/' + id).then(getAData);
}
function addInfo(data) {
    return ssh_instance.post('add', data);
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/shell/List.vue
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      list: [],
      colors: ['blue-grey darken-2', 'cyan darken-2', 'purple']
    };
  },
  created: function created() {
    var _this = this;

    fetchInfos().then(function (data) {
      _this.list = data;
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-692acec0","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/shell/List.vue
var List_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{staticStyle:{"min-height":"0"},attrs:{"fluid":"","grid-list-lg":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},_vm._l((_vm.list),function(item,i){return _c('v-flex',{key:item.id,attrs:{"xs3":""}},[_c('v-card',{staticClass:"white--text",attrs:{"color":_vm.colors[i%3]}},[_c('v-card-title',{attrs:{"primary-title":""}},[_c('div',{staticClass:"headline"},[_vm._v(_vm._s(item.host))]),_vm._v(" "),_c('div',[_vm._v(_vm._s(item.username))])]),_vm._v(" "),_c('v-card-actions',[_c('router-link',{attrs:{"to":("/shell/" + (item.id))}},[_c('v-btn',{attrs:{"dark":""}},[_vm._v("进入")])],1)],1)],1)],1)}))],1)}
var List_staticRenderFns = []
var List_esExports = { render: List_render, staticRenderFns: List_staticRenderFns }
/* harmony default export */ var shell_List = (List_esExports);
// CONCATENATED MODULE: ./src/pages/shell/List.vue
function List_injectStyle (ssrContext) {
  __webpack_require__("3tHY")
}
var List_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var List___vue_template_functional__ = false
/* styles */
var List___vue_styles__ = List_injectStyle
/* scopeId */
var List___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var List___vue_module_identifier__ = null
var List_Component = List_normalizeComponent(
  List,
  shell_List,
  List___vue_template_functional__,
  List___vue_styles__,
  List___vue_scopeId__,
  List___vue_module_identifier__
)

/* harmony default export */ var pages_shell_List = (List_Component.exports);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/xterm/lib/Terminal.js
var Terminal = __webpack_require__("R2KS");
var Terminal_default = /*#__PURE__*/__webpack_require__.n(Terminal);

// EXTERNAL MODULE: ./node_modules/socket.io-client/lib/index.js
var lib = __webpack_require__("DmT9");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/xterm/dist/xterm.css
var xterm = __webpack_require__("fIPj");
var xterm_default = /*#__PURE__*/__webpack_require__.n(xterm);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/shell/Detail.vue





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var Detail = ({
  data: function data() {
    return {
      dialog: false,
      newcommand: {
        category: '',
        text: '',
        value: ''
      },
      command: [],
      commandList: [],
      term: null,
      socket: null,
      category: '',
      dialog2: false,
      editData: null,
      originalList: []
    };
  },
  created: function created() {
    var commandList = localStorage.getItem('commandList');
    if (commandList) {
      this.originalList = JSON.parse(commandList);
      this.updateList();
    }
  },
  mounted: function mounted() {
    var _this = this;

    return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var data;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return ssh_fetchInfo(_this.$route.params.id);

            case 2:
              data = _context.sent;

              _this.start(data);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
    if (this.term) {
      this.term.destroy();
    }
  },

  methods: {
    updateList: function updateList() {
      var _ref;

      this.commandList = (_ref = []).concat.apply(_ref, toConsumableArray_default()(this.originalList.map(function (item) {
        return [{ header: item.name }].concat(item.children.map(function (_item) {
          return assign_default()(_item, { group: item.name });
        }));
      })));
    },
    start: function start(data) {
      var ele = this.$refs.term;
      var term = this.term = new Terminal["Terminal"]({
        cursorBlink: true, // Do not blink the terminal's cursor
        cols: 120
      });
      var socket = this.socket = lib_default.a.connect( true ? '' : 'http://localhost:3000');
      socket.on('connect', function (e) {
        socket.emit('login', data);
        socket.once('success', function () {
          term.writeln('登录成功-_-');
        });
      });
      socket.on('message', function (d) {
        term.write(d);
      });
      socket.once('failed', function (d) {
        term.writeln('登录失败-**-');
        term.write(d);
      });
      term.open(ele, true);
      term.writeln('欢迎使用!!!');
      term.writeln('正在登录服务器...');
      /* term.on('paste', data => {
        socket.send(data)
      })
      term.on('key', (key, ev) => {
        socket.send(key)
      }); */
      term.on('data', function (data) {
        socket.send(data);
      });
    },
    clear: function clear() {
      if (this.term) {
        this.term.reset();
        this.term.focus();
      }
    },
    add: function add() {
      var _this2 = this;

      this.dialog = false;
      var item = this.originalList.find(function (item) {
        return item.name === _this2.newcommand.category;
      });
      if (this.editData) {
        var _item = this.originalList.find(function (item) {
          return item.name === _this2.editData.group;
        });
        assign_default()(this.editData, this.newcommand);
        if (item !== _item) {
          var i = _item.children.findIndex(function (item) {
            return item.name === _this2.editData.group;
          });
          _item.children.splice(i, 1);
          item.children.push(this.editData);
        }
        this.editData = null;
      } else {
        item.children.push({
          text: this.newcommand.text,
          value: this.newcommand.value
        });
      }
      this.updateList();
      this.newcommand.text = '';
      this.newcommand.value = '';
      this.saveCommand();
    },
    saveCommand: function saveCommand() {
      localStorage.setItem('commandList', stringify_default()(this.originalList.map(function (item) {
        return {
          name: item.name,
          children: item.children.map(function (item) {
            return {
              text: item.text,
              value: item.value
            };
          })
        };
      })));
    },
    action: function action() {
      if (this.socket) {
        this.socket.send(this.command.join('\n') + '\n');
      }
    },
    edit: function edit(item) {
      this.newcommand.category = item.group;
      this.newcommand.text = item.text;
      this.newcommand.value = item.value;
      this.editData = item;
      this.dialog = true;
    },
    addCategory: function addCategory() {
      this.commandList.push({
        header: this.category
      });
      this.originalList.push({
        name: this.category,
        children: []
      });
      this.category = '';
      this.saveCommand();
    }
  },
  computed: {
    categories: function categories() {
      return this.originalList.map(function (item) {
        return item.name;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-dbbe4908","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/shell/Detail.vue
var Detail_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"term"}),_vm._v(" "),_c('v-btn',{attrs:{"color":"error"},on:{"click":_vm.clear}},[_vm._v("清空")]),_vm._v(" "),_c('v-layout',[_c('v-select',{attrs:{"items":_vm.commandList,"label":"常用命令","autocomplete":"","item-value":"value","item-text":"text","multiple":""},scopedSlots:_vm._u([{key:"selection",fn:function(data){return [_c('v-chip',{key:JSON.stringify(data.item),staticClass:"chip--select-multi",attrs:{"close":"","selected":data.selected},on:{"input":function($event){data.parent.selectItem(data.item)}}},[_vm._v("\n          "+_vm._s(data.item.group + '-' + data.item.text)+"\n        ")])]}},{key:"item",fn:function(data){return [(typeof data.item !== 'object')?[_c('v-list-tile-content',{domProps:{"textContent":_vm._s(data.item)}})]:[_c('v-list-tile-content',[_c('v-list-tile-title',{domProps:{"innerHTML":_vm._s(data.item.text)}})],1),_vm._v(" "),_c('v-list-tile-avatar',{on:{"click":function($event){$event.stopPropagation();_vm.edit(data.item)}}},[_vm._v("\n            编辑\n          ")])]]}}]),model:{value:(_vm.command),callback:function ($$v) {_vm.command=$$v},expression:"command"}}),_vm._v(" "),_c('v-btn',{attrs:{"color":"cyan","disabled":!_vm.command},on:{"click":_vm.action}},[_vm._v("执行")]),_vm._v(" "),_c('v-dialog',{attrs:{"persistent":""},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary","dark":""},slot:"activator"},[_vm._v("添加常用命令")]),_vm._v(" "),_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("添加常用命令")])]),_vm._v(" "),_c('v-card-text',[_c('v-select',{attrs:{"items":_vm.categories,"label":"类别","autocomplete":""},model:{value:(_vm.newcommand.category),callback:function ($$v) {_vm.$set(_vm.newcommand, "category", $$v)},expression:"newcommand.category"}}),_vm._v(" "),_c('v-text-field',{attrs:{"label":"名称","required":""},model:{value:(_vm.newcommand.text),callback:function ($$v) {_vm.$set(_vm.newcommand, "text", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"newcommand.text"}}),_vm._v(" "),_c('v-text-field',{attrs:{"label":"命令","required":"","multi-line":""},model:{value:(_vm.newcommand.value),callback:function ($$v) {_vm.$set(_vm.newcommand, "value", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"newcommand.value"}})],1),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","flat":""},nativeOn:{"click":function($event){_vm.dialog=false}}},[_vm._v("关闭")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","flat":"","disabled":!_vm.newcommand.value},nativeOn:{"click":function($event){return _vm.add($event)}}},[_vm._v("确定")])],1)],1)],1),_vm._v(" "),_c('v-dialog',{attrs:{"max-width":"500px"},model:{value:(_vm.dialog2),callback:function ($$v) {_vm.dialog2=$$v},expression:"dialog2"}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary","dark":""},slot:"activator"},[_vm._v("添加类别")]),_vm._v(" "),_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("添加类别")])]),_vm._v(" "),_c('v-card-text',[_c('v-text-field',{attrs:{"label":"类别","required":""},model:{value:(_vm.category),callback:function ($$v) {_vm.category=(typeof $$v === 'string'? $$v.trim(): $$v)},expression:"category"}})],1),_vm._v(" "),_c('v-card-actions',[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","flat":""},nativeOn:{"click":function($event){_vm.dialog2=false}}},[_vm._v("关闭")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"blue darken-1","flat":"","disabled":!_vm.category},nativeOn:{"click":function($event){return _vm.addCategory($event)}}},[_vm._v("确定")])],1)],1)],1)],1)],1)}
var Detail_staticRenderFns = []
var Detail_esExports = { render: Detail_render, staticRenderFns: Detail_staticRenderFns }
/* harmony default export */ var shell_Detail = (Detail_esExports);
// CONCATENATED MODULE: ./src/pages/shell/Detail.vue
var Detail_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Detail___vue_template_functional__ = false
/* styles */
var Detail___vue_styles__ = null
/* scopeId */
var Detail___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Detail___vue_module_identifier__ = null
var Detail_Component = Detail_normalizeComponent(
  Detail,
  shell_Detail,
  Detail___vue_template_functional__,
  Detail___vue_styles__,
  Detail___vue_scopeId__,
  Detail___vue_module_identifier__
)

/* harmony default export */ var pages_shell_Detail = (Detail_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/shell/Add.vue
//
//
//



/* harmony default export */ var shell_Add = ({
  components: {
    FormEdit: src_components_FormEdit
  },
  data: function data() {
    return {
      add: addInfo,
      fields: [{
        label: '服务器',
        name: 'host'
      }, {
        label: '端口号',
        name: 'port',
        value: 22,
        type: 'number'
      }, {
        label: '用户名',
        name: 'username'
      }, {
        label: '密码',
        name: 'password',
        type: 'password'
      }]
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-087a0aaa","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/shell/Add.vue
var shell_Add_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})}
var shell_Add_staticRenderFns = []
var shell_Add_esExports = { render: shell_Add_render, staticRenderFns: shell_Add_staticRenderFns }
/* harmony default export */ var pages_shell_Add = (shell_Add_esExports);
// CONCATENATED MODULE: ./src/pages/shell/Add.vue
var shell_Add_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var shell_Add___vue_template_functional__ = false
/* styles */
var shell_Add___vue_styles__ = null
/* scopeId */
var shell_Add___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var shell_Add___vue_module_identifier__ = null
var shell_Add_Component = shell_Add_normalizeComponent(
  shell_Add,
  pages_shell_Add,
  shell_Add___vue_template_functional__,
  shell_Add___vue_styles__,
  shell_Add___vue_scopeId__,
  shell_Add___vue_module_identifier__
)

/* harmony default export */ var src_pages_shell_Add = (shell_Add_Component.exports);

// CONCATENATED MODULE: ./src/pages/shell/index.js





/* harmony default export */ var shell = ({
  path: '/shell',
  component: src_components_ContainerWithMenu,
  props: {
    menus: [{ title: '账号列表', icon: 'dashboard', link: '/shell' }, { title: '添加账号', icon: 'add', link: '/shell/add' }]
  },
  children: [{
    name: 'shell-list',
    path: '',
    component: pages_shell_List
  }, {
    name: 'shell-add',
    path: 'add',
    component: src_pages_shell_Add
  }, {
    name: 'shell-terminal',
    path: ':id',
    component: pages_shell_Detail
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

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/interface/List.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var interface_List = ({
  data: function data() {
    return {
      list: [{
        id: 1,
        name: '接口1',
        img: 'https://unsplash.it/150/300?image=13',
        date: '2017-11-30 13:17:58',
        desc: ''
      }, {
        id: 2,
        name: '接口2',
        img: 'https://unsplash.it/150/300?image=24',
        date: '2017-11-30 13:17:58',
        desc: '这是接口2'
      }, {
        id: 3,
        name: '接口3',
        img: 'https://unsplash.it/150/300?image=7',
        date: '2017-11-30 13:17:58',
        desc: '这是接口3'
      }]
    };
  },

  methods: {
    del: function del(item) {
      var i = this.list.indexOf(item);
      this.list.splice(i, 1);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4b0e0fba","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/interface/List.vue
var interface_List_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"grid-list-lg":""}},[_c('v-layout',{attrs:{"wrap":""}},_vm._l((_vm.list),function(item){return _c('v-flex',{key:item.id,attrs:{"xs3":""}},[_c('v-card',{attrs:{"height":"100%","hover":""}},[_c('v-card-media',{staticClass:"white--text",attrs:{"height":"200px","src":item.img}},[_c('v-container',{attrs:{"fill-height":"","fluid":""}},[_c('v-layout',{attrs:{"fill-height":""}},[_c('v-flex',{attrs:{"xs12":"","align-end":"","flexbox":""}},[_c('span',{staticClass:"headline"},[_vm._v(_vm._s(item.name))])])],1)],1)],1),_vm._v(" "),_c('v-card-title',[_c('div',[_c('span',{staticClass:"grey--text"},[_vm._v(_vm._s(_vm._f("date")(item.date)))]),_c('br'),_vm._v("\n            "+_vm._s(item.desc)+"\n          ")])]),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{attrs:{"flat":"","color":"orange","to":("/interface/edit/" + (item.id))}},[_vm._v("编辑")]),_vm._v(" "),_c('v-btn',{attrs:{"flat":"","color":"primary","to":("/interface/preview/" + (item.id))}},[_vm._v("查看")]),_vm._v(" "),_c('v-btn',{attrs:{"flat":"","color":"red"},on:{"click":function($event){$event.stopPropagation();_vm.del(item)}}},[_vm._v("删除")])],1)],1)],1)}))],1)}
var interface_List_staticRenderFns = []
var interface_List_esExports = { render: interface_List_render, staticRenderFns: interface_List_staticRenderFns }
/* harmony default export */ var pages_interface_List = (interface_List_esExports);
// CONCATENATED MODULE: ./src/pages/interface/List.vue
function interface_List_injectStyle (ssrContext) {
  __webpack_require__("hmA7")
}
var interface_List_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var interface_List___vue_template_functional__ = false
/* styles */
var interface_List___vue_styles__ = interface_List_injectStyle
/* scopeId */
var interface_List___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var interface_List___vue_module_identifier__ = null
var interface_List_Component = interface_List_normalizeComponent(
  interface_List,
  pages_interface_List,
  interface_List___vue_template_functional__,
  interface_List___vue_styles__,
  interface_List___vue_scopeId__,
  interface_List___vue_module_identifier__
)

/* harmony default export */ var src_pages_interface_List = (interface_List_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/interface/Edit.vue


//
//
//
//
//
//
//

// import Swagger from 'swagger-client'

/* harmony default export */ var Edit = ({
  mounted: function mounted() {
    var _this = this;

    return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var editor;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getScript('https://editor.swagger.io//dist/swagger-editor-bundle.js');

            case 2:
              _context.next = 4;
              return getScript('https://editor.swagger.io//dist/swagger-editor-standalone-preset.js');

            case 4:
              // await getScript('//cdn.bootcss.com/swagger-ui/3.5.0/swagger-ui.js')
              editor = window.SwaggerEditorBundle({
                url: '/static/swagger.json',
                dom_id: '#swagger-editor',
                layout: 'StandaloneLayout',
                presets: [window.SwaggerEditorStandalonePreset]
              });

              window.editor = editor;
              /* Swagger('http://petstore.swagger.io/v2/swagger.json').then(res => {
                console.log(res)
                window.res = res;
              }) */

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-68971ebf","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/interface/Edit.vue
var Edit_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var Edit_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('link',{attrs:{"rel":"stylesheet","href":"https://editor.swagger.io//dist/swagger-editor.css"}}),_vm._v(" "),_c('div',{attrs:{"id":"swagger-editor"}})])}]
var Edit_esExports = { render: Edit_render, staticRenderFns: Edit_staticRenderFns }
/* harmony default export */ var interface_Edit = (Edit_esExports);
// CONCATENATED MODULE: ./src/pages/interface/Edit.vue
var Edit_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Edit___vue_template_functional__ = false
/* styles */
var Edit___vue_styles__ = null
/* scopeId */
var Edit___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Edit___vue_module_identifier__ = null
var Edit_Component = Edit_normalizeComponent(
  Edit,
  interface_Edit,
  Edit___vue_template_functional__,
  Edit___vue_styles__,
  Edit___vue_scopeId__,
  Edit___vue_module_identifier__
)

/* harmony default export */ var pages_interface_Edit = (Edit_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/interface/Preview.vue


//
//
//
//
//
//
//

// import Swagger from 'swagger-client'

/* harmony default export */ var Preview = ({
  mounted: function mounted() {
    var _this = this;

    return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var SwaggerUIBundle, SwaggerUIStandalonePreset, ui;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getScript('http://petstore.swagger.io/swagger-ui-bundle.js');

            case 2:
              _context.next = 4;
              return getScript('http://petstore.swagger.io/swagger-ui-standalone-preset.js');

            case 4:
              SwaggerUIBundle = window.SwaggerUIBundle;
              SwaggerUIStandalonePreset = window.SwaggerUIStandalonePreset;
              ui = SwaggerUIBundle({
                url: 'http://petstore.swagger.io/v2/swagger.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
                plugins: [SwaggerUIBundle.plugins.DownloadUrl],
                layout: 'StandaloneLayout'
              });

              window.ui = ui;
              /* Swagger('http://petstore.swagger.io/v2/swagger.json').then(res => {
                console.log(res)
                window.res = res;
              }) */

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5ef70fe7","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/interface/Preview.vue
var Preview_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var Preview_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('link',{attrs:{"rel":"stylesheet","href":"https://editor.swagger.io//dist/swagger-editor.css"}}),_vm._v(" "),_c('div',{attrs:{"id":"swagger-ui"}})])}]
var Preview_esExports = { render: Preview_render, staticRenderFns: Preview_staticRenderFns }
/* harmony default export */ var interface_Preview = (Preview_esExports);
// CONCATENATED MODULE: ./src/pages/interface/Preview.vue
var Preview_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Preview___vue_template_functional__ = false
/* styles */
var Preview___vue_styles__ = null
/* scopeId */
var Preview___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Preview___vue_module_identifier__ = null
var Preview_Component = Preview_normalizeComponent(
  Preview,
  interface_Preview,
  Preview___vue_template_functional__,
  Preview___vue_styles__,
  Preview___vue_scopeId__,
  Preview___vue_module_identifier__
)

/* harmony default export */ var pages_interface_Preview = (Preview_Component.exports);

// CONCATENATED MODULE: ./src/pages/interface/index.js




/* harmony default export */ var pages_interface = ({
  path: '/interface',
  component: src_components_Container,
  children: [{
    name: 'list',
    path: '',
    component: src_pages_interface_List
  }, {
    name: 'edit',
    path: 'edit/:id',
    component: pages_interface_Edit
  }, {
    name: 'preview',
    path: 'preview/:id',
    component: pages_interface_Preview
  }]
});
// CONCATENATED MODULE: ./src/api/devserver.ts

var devserver_instance = axios_default.a.create({
    baseURL: '/api/devserver'
});

function fetchList() {
    return devserver_instance.get('list').then(getAData);
}
function devserver_add(data) {
    return devserver_instance.post('add', data).then(getAData);
}
function devserver_start(dir) {
    return devserver_instance.get('start', {
        params: {
            dir: dir
        }
    }).then(getAData);
}
function devserver_stop(dir) {
    return devserver_instance.get('stop', {
        params: {
            dir: dir
        }
    }).then(getAData);
}
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



/* harmony default export */ var devserver_List = ({
  components: {
    Explorer: src_components_Explorer
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

      fetchList().then(function (items) {
        _this.items = items;
      });
    },
    start: function start(item) {
      var _this2 = this;

      item.disabled = true;
      devserver_start(item.dir).then(function () {
        item.disabled = false;
        _this2.getList();
      });
    },
    stop: function stop(item) {
      var _this3 = this;

      item.disabled = true;
      devserver_stop(item.dir).then(function () {
        item.disabled = false;
        _this3.getList();
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-704b1802","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/devserver/List.vue
var devserver_List_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":"","grid-list-md":""}},[_c('v-layout',{attrs:{"wrap":""}},_vm._l((_vm.items),function(item,i){return _c('v-flex',{key:i,attrs:{"md3":""}},[_c('v-card',{attrs:{"flat":"","tile":""}},[_c('v-card-media',{attrs:{"src":("https://unsplash.it/150/300?image=" + (Math.floor(Math.random() * 100) + 1)),"height":"150px"}},[_c('v-container',{attrs:{"fill-height":"","fluid":""}},[_c('v-layout',{attrs:{"fill-height":""}},[_c('v-flex',{attrs:{"xs12":"","align-end":"","flexbox":""}},[_c('span',{staticClass:"headline",staticStyle:{"mix-blend-mode":"color-burn"}},[_vm._v(_vm._s(item.name))])])],1)],1)],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"grey--text"},[_vm._v(_vm._s(item.running?'运行中':'未运行'))]),_vm._v(" "),(item.running)?_c('v-menu',{attrs:{"open-on-hover":"","origin":"center center"}},[_c('v-btn',{attrs:{"slot":"activator","color":"primary","dark":"","flat":""},slot:"activator"},[_vm._v("链接地址")]),_vm._v(" "),_c('v-list',_vm._l((item.urls),function(v,j){return _c('v-list-tile',{key:j},[_c('v-list-tile-content',[_c('v-list-tile-title',[_c('a',{attrs:{"target":"_blank","href":v[1]}},[_vm._v(_vm._s(v[0]))])])],1)],1)}))],1):_vm._e()],1),_vm._v(" "),_c('v-card-actions',[_c('v-btn',{attrs:{"color":"primary","disabled":item.disabled||item.running},on:{"click":function($event){_vm.start(item)}}},[_vm._v("启动")]),_vm._v(" "),_c('explorer',{attrs:{"path":item.dir}}),_vm._v(" "),_c('v-btn',{attrs:{"disabled":item.disabled||!item.running},on:{"click":function($event){_vm.stop(item)}}},[_vm._v("停止")])],1)],1)],1)}))],1)}
var devserver_List_staticRenderFns = []
var devserver_List_esExports = { render: devserver_List_render, staticRenderFns: devserver_List_staticRenderFns }
/* harmony default export */ var pages_devserver_List = (devserver_List_esExports);
// CONCATENATED MODULE: ./src/pages/devserver/List.vue
function devserver_List_injectStyle (ssrContext) {
  __webpack_require__("kLNN")
}
var devserver_List_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var devserver_List___vue_template_functional__ = false
/* styles */
var devserver_List___vue_styles__ = devserver_List_injectStyle
/* scopeId */
var devserver_List___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var devserver_List___vue_module_identifier__ = null
var devserver_List_Component = devserver_List_normalizeComponent(
  devserver_List,
  pages_devserver_List,
  devserver_List___vue_template_functional__,
  devserver_List___vue_styles__,
  devserver_List___vue_scopeId__,
  devserver_List___vue_module_identifier__
)

/* harmony default export */ var src_pages_devserver_List = (devserver_List_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/devserver/Add.vue
//
//
//
//



/* harmony default export */ var devserver_Add = ({
  components: {
    FormEdit: src_components_FormEdit
  },
  data: function data() {
    return {
      add: devserver_add,
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
var devserver_Add_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})}
var devserver_Add_staticRenderFns = []
var devserver_Add_esExports = { render: devserver_Add_render, staticRenderFns: devserver_Add_staticRenderFns }
/* harmony default export */ var pages_devserver_Add = (devserver_Add_esExports);
// CONCATENATED MODULE: ./src/pages/devserver/Add.vue
function Add_injectStyle (ssrContext) {
  __webpack_require__("9zrn")
}
var devserver_Add_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var devserver_Add___vue_template_functional__ = false
/* styles */
var devserver_Add___vue_styles__ = Add_injectStyle
/* scopeId */
var devserver_Add___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var devserver_Add___vue_module_identifier__ = null
var devserver_Add_Component = devserver_Add_normalizeComponent(
  devserver_Add,
  pages_devserver_Add,
  devserver_Add___vue_template_functional__,
  devserver_Add___vue_styles__,
  devserver_Add___vue_scopeId__,
  devserver_Add___vue_module_identifier__
)

/* harmony default export */ var src_pages_devserver_Add = (devserver_Add_Component.exports);

// CONCATENATED MODULE: ./src/pages/devserver/index.js




/* harmony default export */ var devserver = ({
  path: '/devserver',
  component: src_components_ContainerWithMenu,
  props: {
    menus: [{ title: '列表', icon: 'dashboard', link: '/devserver' }, { title: '添加', icon: 'add', link: '/devserver/add' }]
  },
  children: [{
    name: 'devserver-list',
    path: '',
    component: src_pages_devserver_List
  }, {
    name: 'devserver-add',
    path: 'add',
    component: src_pages_devserver_Add
  }]
});
// CONCATENATED MODULE: ./src/api/project.ts

var project_instance = axios_default.a.create({
    baseURL: '/api/project'
});

function fetchDirs() {
    return project_instance.get('dir').then(getAData);
}
function addDir(item) {
    return project_instance.post('dir/add', item);
}
function fetchProjects(dir) {
    return axios_default.a.get('/api/files', {
        params: {
            pattern: dir + '/src/projects/*'
        }
    }).then(getAData);
}
function fetchModules(dir) {
    return axios_default.a.get('/api/files', {
        params: {
            pattern: dir + '/modules/*'
        }
    }).then(getAData);
}
function fetchImages(dir) {
    return axios_default.a.get('/api/files', {
        params: {
            pattern: dir + '/**/*.{png,jpg,jpeg,svg,gif,webp,ico}'
        }
    }).then(getAData);
}
function fetchDatas(dir) {
    return axios_default.a.get('/api/files', {
        params: {
            pattern: dir + '/data/*.{json,jsonc}'
        }
    }).then(getAData);
}
function getData(path) {
    return axios_default.a.get('/api/file', {
        params: {
            path: path
        },
        responseType: 'json'
    }).then(function (res) {
        return res.data;
    });
}
function saveData(path, data) {
    return axios_default.a.put('/api/upload', data, {
        params: {
            path: path
        }
    });
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/project/Home.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Home = ({
  data: function data() {
    return {
      list: [],
      menus: [{ title: '目录', icon: 'dashboard', link: '/project' }, { title: '添加目录', icon: 'add', link: '/project/add' }]
    };
  },
  created: function created() {
    var _this = this;

    fetchDirs().then(function (list) {
      _this.list = list;
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4b595b44","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/Home.vue
var Home_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"grid-list-md":"","text-xs-center":""}},[_c('v-layout',{attrs:{"nowrap":""}},[_c('v-navigation-drawer',{attrs:{"stateless":"","light":"","value":"true"}},[_c('v-toolbar',{attrs:{"flat":""}},[_c('v-list',[_c('v-list-tile',[_c('v-list-tile-title',{staticClass:"title"},[_vm._v("\n              菜单\n            ")])],1)],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-list',{staticClass:"pt-0",attrs:{"dense":""}},_vm._l((_vm.menus),function(item){return _c('v-list-tile',{key:item.title,attrs:{"to":item.link}},[_c('v-list-tile-action',[_c('v-icon',[_vm._v(_vm._s(item.icon))])],1),_vm._v(" "),_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v(_vm._s(item.title))])],1)],1)}))],1),_vm._v(" "),_c('v-flex',[_c('v-list',{attrs:{"two-line":""}},[_vm._l((_vm.list),function(item){return [_c('v-list-tile',{key:item.value,attrs:{"avatar":"","to":{path:'/project/projects',query:{path:item.value}}}},[_c('v-list-tile-content',[_c('v-list-tile-title',{domProps:{"innerHTML":_vm._s(item.name)}})],1)],1),_vm._v(" "),_c('v-divider',{key:item.value})]})],2)],1)],1)],1)}
var Home_staticRenderFns = []
var Home_esExports = { render: Home_render, staticRenderFns: Home_staticRenderFns }
/* harmony default export */ var project_Home = (Home_esExports);
// CONCATENATED MODULE: ./src/pages/project/Home.vue
function Home_injectStyle (ssrContext) {
  __webpack_require__("Y4iv")
}
var Home_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Home___vue_template_functional__ = false
/* styles */
var Home___vue_styles__ = Home_injectStyle
/* scopeId */
var Home___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Home___vue_module_identifier__ = null
var Home_Component = Home_normalizeComponent(
  Home,
  project_Home,
  Home___vue_template_functional__,
  Home___vue_styles__,
  Home___vue_scopeId__,
  Home___vue_module_identifier__
)

/* harmony default export */ var pages_project_Home = (Home_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/project/Add.vue
//
//
//



/* harmony default export */ var project_Add = ({
  components: {
    FormEdit: src_components_FormEdit
  },
  data: function data() {
    return {
      add: addDir,
      fields: [{
        label: '名称',
        name: 'name'
      }, {
        label: '路径',
        name: 'value'
      }]
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8b9fb906","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/Add.vue
var project_Add_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})}
var project_Add_staticRenderFns = []
var project_Add_esExports = { render: project_Add_render, staticRenderFns: project_Add_staticRenderFns }
/* harmony default export */ var pages_project_Add = (project_Add_esExports);
// CONCATENATED MODULE: ./src/pages/project/Add.vue
var project_Add_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var project_Add___vue_template_functional__ = false
/* styles */
var project_Add___vue_styles__ = null
/* scopeId */
var project_Add___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var project_Add___vue_module_identifier__ = null
var project_Add_Component = project_Add_normalizeComponent(
  project_Add,
  pages_project_Add,
  project_Add___vue_template_functional__,
  project_Add___vue_styles__,
  project_Add___vue_scopeId__,
  project_Add___vue_module_identifier__
)

/* harmony default export */ var src_pages_project_Add = (project_Add_Component.exports);

// EXTERNAL MODULE: ./node_modules/vue-tree-halower/dist/halower-tree.min.css
var halower_tree_min = __webpack_require__("ug9+");
var halower_tree_min_default = /*#__PURE__*/__webpack_require__.n(halower_tree_min);

// EXTERNAL MODULE: ./node_modules/vue-tree-halower/dist/v2-tree.js
var v2_tree = __webpack_require__("lTSm");
var v2_tree_default = /*#__PURE__*/__webpack_require__.n(v2_tree);

// EXTERNAL MODULE: ./node_modules/vue-upload-component/src/index.js
var vue_upload_component_src = __webpack_require__("eFkE");
var src_default = /*#__PURE__*/__webpack_require__.n(vue_upload_component_src);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/project/ImageGallery.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var ImageGallery = ({
  props: ['dir'],
  components: {
    FileUpload: src_default.a
  },
  data: function data() {
    return {
      list: [],
      uploadUrl: getUploadUrl()
    };
  },

  watch: {
    dir: {
      immediate: true,
      handler: function handler(dir) {
        var _this = this;

        fetchImages(dir).then(function (data) {
          _this.list = data.map(function (src) {
            return {
              src: src,
              url: getFileUrl(src),
              name: src.substring(src.lastIndexOf('/') + 1),
              type: _this.getMimeType(src.substring(src.lastIndexOf('.') + 1))
            };
          });
        });
      }
    }
  },
  methods: {
    inputFile: function inputFile(newFile, item) {
      newFile.active = true;
      item.url = this.getImageDataUrl(newFile.file);
    },
    addFile: function addFile(item, oldItem) {
      if (!item || item.data.path) {
        return;
      }
      var file = item.file;
      var ext = file.name.substring(file.name.lastIndexOf('.'));
      var name = Date.now() + Math.random().toString().substring(2, 5) + ext;
      var path = this.dir + '/images/' + name;
      item.data = {
        path: path
      };
      this.list.push({
        src: path,
        url: this.getImageDataUrl(file),
        name: name,
        type: this.getMimeType(ext.substring(1))
      });
      item.active = true;
    },
    getImageDataUrl: function getImageDataUrl(file) {
      var URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        return URL.createObjectURL(file);
      }
    },
    getMimeType: function getMimeType(type) {
      if (type === 'jpg') {
        type = 'jpeg';
      }
      return 'image/' + type;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4cb3f0c4","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/ImageGallery.vue
var ImageGallery_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"text-xs-right"},[_c('file-upload',{attrs:{"title":"添加","put-action":_vm.uploadUrl,"multiple":"","accept":"image/*"},on:{"input-file":_vm.addFile}},[_c('span',{staticClass:"pa-2"},[_c('v-icon',{attrs:{"x-large":"","dark":"","color":"pink"}},[_vm._v("add")])],1)])],1),_vm._v(" "),(_vm.list.length)?[_c('v-container',{attrs:{"fluid":"","grid-list-md":""}},[_c('v-layout',{attrs:{"wrap":""}},_vm._l((_vm.list),function(item){return _c('v-flex',{key:item.url,attrs:{"xs4":""}},[_c('v-card',{attrs:{"flat":"","tile":""}},[_c('v-card-media',{attrs:{"src":item.url,"contain":""}},[_c('file-upload',{staticStyle:{"height":"150px","display":"block","width":"100%"},attrs:{"name":"file","drop":true,"data":{path:item.src},"put-action":_vm.uploadUrl,"accept":item.type},on:{"input-file":function($event){_vm.inputFile($event,item)}}})],1),_vm._v(" "),_c('v-card-title',{attrs:{"primary-title":""}},[_c('div',[_c('div',{staticClass:"headline"},[_c('a',{attrs:{"href":item.url,"target":"_blank"}},[_vm._v(_vm._s(item.name))])])])])],1)],1)}))],1)]:_c('v-alert',{attrs:{"color":"grey lighten-1","icon":"priority_high","value":"true"}},[_vm._v("\n    无内容\n  ")])],2)}
var ImageGallery_staticRenderFns = []
var ImageGallery_esExports = { render: ImageGallery_render, staticRenderFns: ImageGallery_staticRenderFns }
/* harmony default export */ var project_ImageGallery = (ImageGallery_esExports);
// CONCATENATED MODULE: ./src/pages/project/ImageGallery.vue
function ImageGallery_injectStyle (ssrContext) {
  __webpack_require__("M5yl")
}
var ImageGallery_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var ImageGallery___vue_template_functional__ = false
/* styles */
var ImageGallery___vue_styles__ = ImageGallery_injectStyle
/* scopeId */
var ImageGallery___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ImageGallery___vue_module_identifier__ = null
var ImageGallery_Component = ImageGallery_normalizeComponent(
  ImageGallery,
  project_ImageGallery,
  ImageGallery___vue_template_functional__,
  ImageGallery___vue_styles__,
  ImageGallery___vue_scopeId__,
  ImageGallery___vue_module_identifier__
)

/* harmony default export */ var pages_project_ImageGallery = (ImageGallery_Component.exports);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("pFYg");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__("fZjL");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/sortablejs/Sortable.js
var Sortable = __webpack_require__("Lokx");
var Sortable_default = /*#__PURE__*/__webpack_require__.n(Sortable);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/project/FormControl.vue
//
//
//
//
//
//
//

/* harmony default export */ var FormControl = ({
  props: ['item']
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2af0bd44","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/FormControl.vue
var FormControl_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.item.type==='boolean')?_c('v-checkbox',{attrs:{"label":_vm.item.name,"light":""},model:{value:(_vm.item.value),callback:function ($$v) {_vm.$set(_vm.item, "value", $$v)},expression:"item.value"}}):_c('v-text-field',{attrs:{"label":_vm.item.name},model:{value:(_vm.item.value),callback:function ($$v) {_vm.$set(_vm.item, "value", $$v)},expression:"item.value"}})],1)}
var FormControl_staticRenderFns = []
var FormControl_esExports = { render: FormControl_render, staticRenderFns: FormControl_staticRenderFns }
/* harmony default export */ var project_FormControl = (FormControl_esExports);
// CONCATENATED MODULE: ./src/pages/project/FormControl.vue
var FormControl_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var FormControl___vue_template_functional__ = false
/* styles */
var FormControl___vue_styles__ = null
/* scopeId */
var FormControl___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var FormControl___vue_module_identifier__ = null
var FormControl_Component = FormControl_normalizeComponent(
  FormControl,
  project_FormControl,
  FormControl___vue_template_functional__,
  FormControl___vue_styles__,
  FormControl___vue_scopeId__,
  FormControl___vue_module_identifier__
)

/* harmony default export */ var pages_project_FormControl = (FormControl_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/project/DataEditor.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







function DataEditor_getStructure(data) {
  return keys_default()(data).map(function (key) {
    var value = data[key];
    var type;
    if (Array.isArray(value)) {
      type = 'array';
      value = value.map(function (item) {
        if ((typeof item === 'undefined' ? 'undefined' : typeof_default()(item)) !== 'object') {
          return [{
            type: typeof item === 'undefined' ? 'undefined' : typeof_default()(item),
            value: item
          }];
        }
        return DataEditor_getStructure(item);
      });
    } else {
      type = typeof value === 'undefined' ? 'undefined' : typeof_default()(value);
    }
    return {
      type: type,
      value: value,
      name: key
    };
  });
}

/* harmony default export */ var DataEditor = ({
  props: ['dir'],
  components: {
    FormControl: pages_project_FormControl,
    FormEdit: src_components_FormEdit
  },
  data: function data() {
    return {
      list: [],
      name: '',
      datas: [],
      fields: [{
        label: '名字',
        name: 'name'
      }, {
        label: '类型',
        name: 'type',
        items: ['string', 'number', 'array', 'boolean'],
        type: 'select',
        value: 'string'
      }, {
        label: '初始值',
        name: 'value'
      }],
      dialog: false,
      sortables: []
    };
  },
  beforeDestroy: function beforeDestroy() {
    this.sortables.forEach(function (item) {
      item.destroy();
    });
    // this.name = 'E:/github/front-projects/src/projects/project1/modules/module1/data/index2.json'
  },

  watch: {
    dir: {
      immediate: true,
      handler: function handler(dir) {
        var _this = this;

        fetchDatas(dir).then(function (list) {
          _this.list = list.map(function (value) {
            return {
              text: value.substring(value.lastIndexOf('/') + 1),
              value: value
            };
          });
        });
      }
    },
    name: function name(v) {
      var _this2 = this;

      getData(v).then(function (data) {
        _this2.datas = DataEditor_getStructure(data);
        _this2.bindSortable();
      });
    }
  },
  methods: {
    bindSortable: function bindSortable() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.$refs.panel.forEach(function (component) {
          if (component.hasSortable) {
            return;
          }
          component.hasSortable = true;
          Sortable_default.a.create(component.$el, {
            handle: '.my-handle',
            onEnd: function onEnd(e) {
              if (e.newIndex === e.oldIndex) {
                return;
              }
              var arr = component.$attrs.item;
              var value = arr[e.oldIndex];
              arr[e.oldIndex] = arr[e.newIndex];
              arr[e.newIndex] = value;
            }
          });
        });
      });
    },
    add: function add(data) {
      if (!data.name) {
        return;
      }
      var value = data.value;
      if (data.type === 'array') {
        try {
          // eslint-disable-next-line
          var json = window.eval('(' + value + ')');
          var type = typeof json === 'undefined' ? 'undefined' : typeof_default()(json);
          if (type === 'boolean' || type === 'string' || type === 'number') {
            value = [[{
              type: type,
              value: json
            }]];
          } else if (Array.isArray(json)) {
            value = json.map(DataEditor_getStructure);
          } else if (type === 'object') {
            value = [DataEditor_getStructure(json)];
          }
        } catch (e) {
          value = [[{
            type: 'string',
            value: value
          }]];
        }
      } else if (data.type === 'boolean') {
        value = !(value === 'false' || value === '');
      }
      this.datas.push({
        name: data.name,
        type: data.type,
        value: value
      });
      this.dialog = false;
      this.bindSortable();
    },
    onSubmit: function onSubmit() {
      var data = {};
      this.datas.forEach(function (item) {
        if (item.type === 'array') {
          data[item.name] = item.value.map(function (item) {
            if (item.length === 1 && !item[0].name) {
              item = item[0];
              if (item.type === 'number') {
                return +item.value;
              }
              return item.value;
            } else {
              var _data = {};
              item.forEach(function (item) {
                if (item.type === 'number') {
                  _data[item.name] = +item.value;
                } else {
                  _data[item.name] = item.value;
                }
              });
              return _data;
            }
          });
        } else if (item.type === 'number') {
          data[item.name] = Number(item.value);
        } else {
          data[item.name] = item.value;
        }
      });
      saveData(this.name, data).then(function () {
        mid.$emit('toast', '保存成功');
      });
    },
    addItem: function addItem(item) {
      var data = JSON.parse(stringify_default()(item[0]));
      data.forEach(function (item) {
        item.value = '';
      });
      item.push(data);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a5dff15e","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/DataEditor.vue
var DataEditor_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[_c('v-select',{attrs:{"items":_vm.list,"label":"选择文件","single-line":"","bottom":"","autocomplete":""},model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v},expression:"name"}}),_vm._v(" "),(_vm.name)?_c('v-form',{on:{"submit":function($event){$event.stopPropagation();return _vm.onSubmit($event)}}},[_vm._l((_vm.datas),function(item,i){return [(item.type==='array')?_c('div',{key:i},[_c('v-subheader',[_vm._v("\n          "+_vm._s(item.name)+"\n          "),_c('v-btn',{attrs:{"flat":"","icon":"","color":"pink"},on:{"click":function($event){_vm.addItem(item.value)}}},[_c('v-icon',[_vm._v("add")])],1)],1),_vm._v(" "),_c('v-expansion-panel',{ref:"panel",refInFor:true,attrs:{"item":item.value}},_vm._l((item.value),function(_item,j){return _c('v-expansion-panel-content',{key:j,attrs:{"hide-actions":_item.length===1}},[(_item.length===1)?_c('v-layout',{attrs:{"slot":"header"},slot:"header"},[_c('v-icon',{staticClass:"my-handle"},[_vm._v("widgets")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(j+1))]),_vm._v(" "),_c('v-flex',[_c('form-control',{attrs:{"item":_item[0]}})],1)],1):[_c('div',{attrs:{"slot":"header"},slot:"header"},[_c('v-icon',{staticClass:"my-handle"},[_vm._v("widgets")]),_vm._v("\n                "+_vm._s(j+1)+"\n              ")],1),_vm._v(" "),_vm._l((_item),function(item,k){return _c('v-card',{key:k},[_c('v-card-text',[_c('form-control',{attrs:{"item":item}})],1)],1)})]],2)}))],1):_c('div',{key:i,staticClass:"my-handle"},[_c('form-control',{attrs:{"item":item}})],1)]}),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary","type":"submit"}},[_vm._v("保存")]),_vm._v(" "),_c('v-dialog',{attrs:{"max-width":"500px"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-btn',{attrs:{"slot":"activator"},slot:"activator"},[_vm._v("新增")]),_vm._v(" "),_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("添加字段")])]),_vm._v(" "),_c('v-card-text',[_c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})],1)],1)],1)],2):_vm._e()],1)}
var DataEditor_staticRenderFns = []
var DataEditor_esExports = { render: DataEditor_render, staticRenderFns: DataEditor_staticRenderFns }
/* harmony default export */ var project_DataEditor = (DataEditor_esExports);
// CONCATENATED MODULE: ./src/pages/project/DataEditor.vue
function DataEditor_injectStyle (ssrContext) {
  __webpack_require__("RdKN")
}
var DataEditor_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var DataEditor___vue_template_functional__ = false
/* styles */
var DataEditor___vue_styles__ = DataEditor_injectStyle
/* scopeId */
var DataEditor___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var DataEditor___vue_module_identifier__ = null
var DataEditor_Component = DataEditor_normalizeComponent(
  DataEditor,
  project_DataEditor,
  DataEditor___vue_template_functional__,
  DataEditor___vue_styles__,
  DataEditor___vue_scopeId__,
  DataEditor___vue_module_identifier__
)

/* harmony default export */ var pages_project_DataEditor = (DataEditor_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/project/Projects.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



 // you can customize the style of the tree



/* harmony default export */ var Projects = ({
  components: {
    VTree: v2_tree_default.a,
    ImageGallery: pages_project_ImageGallery,
    DataEditor: pages_project_DataEditor
  },
  data: function data() {
    return {
      checkedIds: [],
      list: [],
      type: '',
      dir: ''
    };
  },
  created: function created() {
    var _this = this;

    var _$route$query = this.$route.query,
        path = _$route$query.path,
        pos = _$route$query.pos;

    fetchProjects(path).then(function (data) {
      _this.list = data.map(function (value, i) {
        return {
          title: value.substring(value.lastIndexOf('/') + 1),
          value: value,
          children: [],
          expanded: false
        };
      });
      if (pos) {
        _this.initPos(pos.split('/'));
      }
    });
  },

  methods: {
    initPos: function initPos(pos) {
      var _this2 = this;

      var index = pos[0];
      if (index !== undefined) {
        var node = this.list[index];
        node.expanded = true;
        this.onNodeExpand(node).then(function () {
          var index = pos[1];
          if (index !== undefined) {
            node = node.children[index];
            node.expanded = true;
            node = node.children[pos[2]];
            node.selected = true;
            _this2.onNodeClick(node);
          }
        });
      }
    },
    onNodeExpand: function onNodeExpand(node) {
      node.loading = true;
      return fetchModules(node.value).then(function (data) {
        node.children = data.map(function (value) {
          return {
            title: value.substring(value.lastIndexOf('/') + 1),
            expanded: false,
            children: [{
              title: '图片',
              value: value,
              type: 'image',
              selected: false
            }, {
              title: '数据',
              value: value,
              type: 'data',
              selected: false
            }]
          };
        });
        node.loading = false;
      });
    },
    onNodeClick: function onNodeClick(node) {
      this.contentData = [];
      if (node.type) {
        this.type = node.type;
        this.dir = node.value;
        var ret = [];
        this.getNodeIndex(node, ret);
        this.$router.replace({
          path: this.$route.path,
          query: {
            path: this.$route.query.path,
            pos: ret.join('/')
          }
        });
      }
    },
    getNodeIndex: function getNodeIndex(node, ret) {
      if (node.parent) {
        this.getNodeIndex(node.parent, ret);
        ret.push(node.parent.children.indexOf(node));
      } else {
        ret.push(this.list.indexOf(node));
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5253ad32","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/Projects.vue
var Projects_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',[_c('v-flex',{attrs:{"md3":""}},[_c('v-tree',{ref:"tree",attrs:{"data":_vm.list},on:{"node-click":_vm.onNodeClick,"node-expanded":_vm.onNodeExpand}})],1),_vm._v(" "),_c('v-flex',{attrs:{"md9":""}},[(_vm.type==='image')?_c('image-gallery',{attrs:{"dir":_vm.dir}}):(_vm.type==='data')?_c('data-editor',{attrs:{"dir":_vm.dir}}):_c('v-alert',{attrs:{"color":"grey lighten-1","icon":"priority_high","value":"true"}},[_vm._v("\n      暂无功能\n    ")])],1)],1)}
var Projects_staticRenderFns = []
var Projects_esExports = { render: Projects_render, staticRenderFns: Projects_staticRenderFns }
/* harmony default export */ var project_Projects = (Projects_esExports);
// CONCATENATED MODULE: ./src/pages/project/Projects.vue
function Projects_injectStyle (ssrContext) {
  __webpack_require__("mLPn")
}
var Projects_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var Projects___vue_template_functional__ = false
/* styles */
var Projects___vue_styles__ = Projects_injectStyle
/* scopeId */
var Projects___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Projects___vue_module_identifier__ = null
var Projects_Component = Projects_normalizeComponent(
  Projects,
  project_Projects,
  Projects___vue_template_functional__,
  Projects___vue_styles__,
  Projects___vue_scopeId__,
  Projects___vue_module_identifier__
)

/* harmony default export */ var pages_project_Projects = (Projects_Component.exports);

// CONCATENATED MODULE: ./src/pages/project/index.js





/* harmony default export */ var project = ({
  path: '/project',
  component: src_components_Container,
  children: [{
    path: '',
    component: pages_project_Home
  }, {
    path: 'add',
    component: src_pages_project_Add
  }, {
    path: 'projects',
    component: pages_project_Projects
  }]
});
// CONCATENATED MODULE: ./src/router/index.js









vue_esm["a" /* default */].use(vue_router_esm["a" /* default */]);

/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  routes: [{
    path: '/menu',
    name: 'Index',
    component: src_pages_Index
  }, svn, shell, pages_interface, devserver, project]
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

/***/ "RdKN":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "TvEJ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Y4iv":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Yu9s":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "eJo3":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "fIPj":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "hA/Q":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "hmA7":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "kLNN":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "mLPn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ug9+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.bbd23c90e9297150d1e3.js.map