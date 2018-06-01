webpackJsonp([1],{

/***/ "/n6Q":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("zQR9");
__webpack_require__("+tPU");
module.exports = __webpack_require__("Kh4W").f('iterator');


/***/ }),

/***/ "06OY":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("3Eo+")('meta');
var isObject = __webpack_require__("EqjI");
var has = __webpack_require__("D2L2");
var setDesc = __webpack_require__("evD5").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("S82l")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "0jML":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/vue-upload-component/src/utils/request.js
/**
 * Creates a XHR request
 *
 * @param {Object} options
 */
const createRequest = (options) => {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json'
  xhr.open(options.method || 'GET', options.url)
  if (options.headers) {
    Object.keys(options.headers).forEach(key => {
      xhr.setRequestHeader(key, options.headers[key])
    })
  }

  return xhr
}

/**
 * Sends a XHR request with certain body
 *
 * @param {XMLHttpRequest} xhr
 * @param {Object} body
 */
const sendRequest = (xhr, body) => {
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.response)
      }
    }
    xhr.onerror = () => reject(xhr.response)
    xhr.send(JSON.stringify(body))
  })
}

/**
 * Sends a XHR request with certain form data
 *
 * @param {XMLHttpRequest} xhr
 * @param {Object} data
 */
const sendFormRequest = (xhr, data) => {
  const body = new FormData()
  for (var name in data) {
    body.append(name, data[name])
  }

  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.response)
      }
    }
    xhr.onerror = () => reject(xhr.response)
    xhr.send(body)
  })
}

/**
 * Creates and sends XHR request
 *
 * @param {Object} options
 *
 * @returns Promise
 */
/* harmony default export */ var request = (function (options) {
  const xhr = createRequest(options)

  return sendRequest(xhr, options.body)
});

// CONCATENATED MODULE: ./node_modules/vue-upload-component/src/chunk/ChunkUploadHandler.js


class ChunkUploadHandler_ChunkUploadHandler {
  /**
   * Constructor
   *
   * @param {File} file
   * @param {Object} options
   */
  constructor (file, options) {
    this.file = file
    this.options = options
  }

  /**
   * Gets the max retries from options
   */
  get maxRetries () {
    return parseInt(this.options.maxRetries)
  }

  /**
   * Gets the max number of active chunks being uploaded at once from options
   */
  get maxActiveChunks () {
    return parseInt(this.options.maxActive)
  }

  /**
   * Gets the file type
   */
  get fileType () {
    return this.file.type
  }

  /**
   * Gets the file size
   */
  get fileSize () {
    return this.file.size
  }

  /**
   * Gets action (url) to upload the file
   */
  get action () {
    return this.options.action || null
  }

  /**
   * Gets the body to be merged when sending the request in start phase
   */
  get startBody () {
    return this.options.startBody || {}
  }

  /**
   * Gets the body to be merged when sending the request in upload phase
   */
  get uploadBody () {
    return this.options.uploadBody || {}
  }

  /**
   * Gets the body to be merged when sending the request in finish phase
   */
  get finishBody () {
    return this.options.finishBody || {}
  }

  /**
   * Gets the headers of the requests from options
   */
  get headers () {
    return this.options.headers || {}
  }

  /**
   * Whether it's ready to upload files or not
   */
  get readyToUpload () {
    return !!this.chunks
  }

  /**
   * Gets the progress of the chunk upload
   * - Gets all the completed chunks
   * - Gets the progress of all the chunks that are being uploaded
   */
  get progress () {
    const completedProgress = (this.chunksUploaded.length / this.chunks.length) * 100
    const uploadingProgress = this.chunksUploading.reduce((progress, chunk) => {
      return progress + ((chunk.progress | 0) / this.chunks.length)
    }, 0)

    return Math.min(completedProgress + uploadingProgress, 100)
  }

  /**
   * Gets all the chunks that are pending to be uploaded
   */
  get chunksToUpload () {
    return this.chunks.filter(chunk => {
      return !chunk.active && !chunk.uploaded
    })
  }

  /**
   * Whether there are chunks to upload or not
   */
  get hasChunksToUpload () {
    return this.chunksToUpload.length > 0
  }

  /**
   * Gets all the chunks that are uploading
   */
  get chunksUploading () {
    return this.chunks.filter(chunk => {
      return !!chunk.xhr && !!chunk.active
    })
  }

  /**
   * Gets all the chunks that have finished uploading
   */
  get chunksUploaded () {
    return this.chunks.filter(chunk => {
      return !!chunk.uploaded
    })
  }

  /**
   * Creates all the chunks in the initial state
   */
  createChunks () {
    this.chunks = []

    let start = 0
    let end = this.chunkSize
    while (start < this.fileSize) {
      this.chunks.push({
        blob: this.file.file.slice(start, end),
        startOffset: start,
        active: false,
        retries: this.maxRetries
      })
      start = end
      end = start + this.chunkSize
    }
  }

  /**
   * Updates the progress of the file with the handler's progress
   */
  updateFileProgress () {
    this.file.progress = this.progress
  }

  /**
   * Paues the upload process
   * - Stops all active requests
   * - Sets the file not active
   */
  pause () {
    this.file.active = false
    this.stopChunks()
  }

  /**
   * Stops all the current chunks
   */
  stopChunks () {
    this.chunksUploading.forEach(chunk => {
      chunk.xhr.abort()
      chunk.active = false
    })
  }

  /**
   * Resumes the file upload
   * - Sets the file active
   * - Starts the following chunks
   */
  resume () {
    this.file.active = true
    this.startChunking()
  }

  /**
   * Starts the file upload
   *
   * @returns Promise
   * - resolve  The file was uploaded
   * - reject   The file upload failed
   */
  upload () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    this.start()

    return this.promise
  }

  /**
   * Start phase
   * Sends a request to the backend to initialise the chunks
   */
  start () {
    request({
      method: 'POST',
      headers: Object.assign({}, this.headers, {
        'Content-Type': 'application/json'
      }),
      url: this.action,
      body: Object.assign(this.startBody, {
        phase: 'start',
        mime_type: this.fileType,
        size: this.fileSize
      })
    }).then(res => {
      if (res.status !== 'success') {
        this.file.response = res
        return this.reject('server')
      }

      this.sessionId = res.data.session_id
      this.chunkSize = res.data.end_offset

      this.createChunks()
      this.startChunking()
    }).catch(res => {
      this.file.response = res
      this.reject('server')
    })
  }

  /**
   * Starts to upload chunks
   */
  startChunking () {
    for (let i = 0; i < this.maxActiveChunks; i++) {
      this.uploadNextChunk()
    }
  }

  /**
   * Uploads the next chunk
   * - Won't do anything if the process is paused
   * - Will start finish phase if there are no more chunks to upload
   */
  uploadNextChunk () {
    if (this.file.active) {
      if (this.hasChunksToUpload) {
        return this.uploadChunk(this.chunksToUpload[0])
      }

      if (this.chunksUploading.length === 0) {
        return this.finish()
      }
    }
  }

  /**
   * Uploads a chunk
   * - Sends the chunk to the backend
   * - Sets the chunk as uploaded if everything went well
   * - Decreases the number of retries if anything went wrong
   * - Fails if there are no more retries
   *
   * @param {Object} chunk
   */
  uploadChunk (chunk) {
    chunk.progress = 0
    chunk.active = true
    this.updateFileProgress()
    chunk.xhr = createRequest({
      method: 'POST',
      headers: this.headers,
      url: this.action
    })

    chunk.xhr.upload.addEventListener('progress', function (evt) {
      if (evt.lengthComputable) {
        chunk.progress = Math.round(evt.loaded / evt.total * 100)
      }
    }, false)

    sendFormRequest(chunk.xhr, Object.assign(this.uploadBody, {
      phase: 'upload',
      session_id: this.sessionId,
      start_offset: chunk.startOffset,
      chunk: chunk.blob
    })).then(res => {
      chunk.active = false
      if (res.status === 'success') {
        chunk.uploaded = true
      } else {
        if (chunk.retries-- <= 0) {
          this.stopChunks()
          return this.reject('upload')
        }
      }

      this.uploadNextChunk()
    }).catch(() => {
      chunk.active = false
      if (chunk.retries-- <= 0) {
        this.stopChunks()
        return this.reject('upload')
      }

      this.uploadNextChunk()
    })
  }

  /**
   * Finish phase
   * Sends a request to the backend to finish the process
   */
  finish () {
    this.updateFileProgress()

    request({
      method: 'POST',
      headers: Object.assign({}, this.headers, {
        'Content-Type': 'application/json'
      }),
      url: this.action,
      body: Object.assign(this.finishBody, {
        phase: 'finish',
        session_id: this.sessionId
      })
    }).then(res => {
      this.file.response = res
      if (res.status !== 'success') {
        return this.reject('server')
      }

      this.resolve(res)
    }).catch(res => {
      this.file.response = res
      this.reject('server')
    })
  }
}

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

  handler: ChunkUploadHandler_ChunkUploadHandler
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

/***/ "4vBb":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Uploader.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "5QVw":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("BwfY"), __esModule: true };

/***/ }),

/***/ "66bV":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.my-handle {\r\n  cursor: move;\r\n  cursor: -webkit-grabbing;\n}\n.sortable-ghost {\r\n  opacity: 0.5;\r\n  background: #c8ebfb !important;\n}\r\n", "", {"version":3,"sources":["E:/ecovacs/front-tool-fe/src/pages/project/DataEditor.vue"],"names":[],"mappings":";AACA;EACE,aAAa;EACb,yBAAyB;CAC1B;AACD;EACE,aAAa;EACb,+BAA+B;CAChC","file":"DataEditor.vue","sourcesContent":["\n.my-handle {\r\n  cursor: move;\r\n  cursor: -webkit-grabbing;\n}\n.sortable-ghost {\r\n  opacity: 0.5;\r\n  background: #c8ebfb !important;\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "6ZIj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/api/project.ts
var project = __webpack_require__("bNw7");

// EXTERNAL MODULE: ./node_modules/vue-tree-halower/dist/halower-tree.min.css
var halower_tree_min = __webpack_require__("ug9+");
var halower_tree_min_default = /*#__PURE__*/__webpack_require__.n(halower_tree_min);

// EXTERNAL MODULE: ./node_modules/vue-tree-halower/dist/v2-tree.js
var v2_tree = __webpack_require__("lTSm");
var v2_tree_default = /*#__PURE__*/__webpack_require__.n(v2_tree);

// EXTERNAL MODULE: ./src/api/common.ts
var common = __webpack_require__("RS51");

// EXTERNAL MODULE: ./src/components/Uploader.vue + 2 modules
var Uploader = __webpack_require__("uHkJ");

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
    Uploader: Uploader["a" /* default */]
  },
  data: function data() {
    return {
      list: []
    };
  },

  watch: {
    dir: {
      immediate: true,
      handler: function handler(dir) {
        var _this = this;

        Object(project["d" /* fetchImages */])(dir).then(function (data) {
          _this.list = data.map(function (src) {
            return {
              src: src,
              url: Object(common["c" /* getFileUrl */])(src),
              name: src.substring(src.lastIndexOf('/') + 1),
              type: _this.getMimeType(src)
            };
          });
        });
      }
    }
  },
  methods: {
    inputFile: function inputFile(data, item) {
      item.url = data.url;
    },
    addFile: function addFile(data) {
      this.list.push({
        src: data.path,
        url: data.url,
        name: data.name,
        type: data.type
      });
    },
    getMimeType: function getMimeType(src) {
      var type = src.substring(src.lastIndexOf('.') + 1);
      if (type === 'jpg') {
        type = 'jpeg';
      }
      return 'image/' + type;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-24d47596","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/ImageGallery.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"text-xs-right"},[_c('uploader',{attrs:{"context":_vm.dir,"title":"添加"},on:{"input":_vm.addFile}},[_c('span',{staticClass:"pa-2"},[_c('v-icon',{attrs:{"x-large":"","dark":"","color":"pink"}},[_vm._v("add")])],1)])],1),_vm._v(" "),(_vm.list.length)?[_c('v-container',{attrs:{"fluid":"","grid-list-md":""}},[_c('v-layout',{attrs:{"wrap":""}},_vm._l((_vm.list),function(item){return _c('v-flex',{key:item.url,attrs:{"xs4":""}},[_c('v-card',{attrs:{"flat":"","tile":""}},[_c('v-card-media',{attrs:{"src":item.url,"contain":""}},[_c('uploader',{staticStyle:{"height":"150px","display":"block","width":"100%"},attrs:{"context":_vm.dir,"path":item.src,"accept":item.type},on:{"input":function($event){_vm.inputFile($event,item)}}})],1),_vm._v(" "),_c('v-card-title',{attrs:{"primary-title":""}},[_c('div',[_c('div',{staticClass:"headline"},[_c('a',{attrs:{"href":item.url,"target":"_blank"}},[_vm._v(_vm._s(item.name))])])])])],1)],1)}))],1)]:_c('v-alert',{attrs:{"color":"grey lighten-1","icon":"priority_high","value":"true"}},[_vm._v("\n    无内容\n  ")])],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var project_ImageGallery = (esExports);
// CONCATENATED MODULE: ./src/pages/project/ImageGallery.vue
function injectStyle (ssrContext) {
  __webpack_require__("CXJV")
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
  ImageGallery,
  project_ImageGallery,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_project_ImageGallery = (Component.exports);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

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

// EXTERNAL MODULE: ./src/components/FormEdit.vue + 2 modules
var FormEdit = __webpack_require__("dhkN");

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






function getStructure(data) {
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
        return getStructure(item);
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
    FormEdit: FormEdit["a" /* default */]
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

        Object(project["b" /* fetchDatas */])(dir).then(function (list) {
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

      Object(project["g" /* getData */])(v).then(function (data) {
        _this2.datas = getStructure(data);
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
            value = json.map(getStructure);
          } else if (type === 'object') {
            value = [getStructure(json)];
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
      var _this4 = this;

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
      Object(project["h" /* saveData */])(this.name, data).then(function () {
        _this4.$toast('保存成功');
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-082b8bfd","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/DataEditor.vue
var DataEditor_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[_c('v-select',{attrs:{"items":_vm.list,"label":"选择文件","single-line":"","bottom":"","autocomplete":""},model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v},expression:"name"}}),_vm._v(" "),(_vm.name)?_c('v-form',{on:{"submit":function($event){$event.stopPropagation();return _vm.onSubmit($event)}}},[_vm._l((_vm.datas),function(item,i){return [(item.type==='array')?_c('div',{key:i},[_c('v-subheader',[_vm._v("\n          "+_vm._s(item.name)+"\n          "),_c('v-btn',{attrs:{"flat":"","icon":"","color":"pink"},on:{"click":function($event){_vm.addItem(item.value)}}},[_c('v-icon',[_vm._v("add")])],1)],1),_vm._v(" "),_c('v-expansion-panel',{ref:"panel",refInFor:true,attrs:{"item":item.value}},_vm._l((item.value),function(_item,j){return _c('v-expansion-panel-content',{key:j,attrs:{"hide-actions":_item.length===1}},[(_item.length===1)?_c('v-layout',{attrs:{"slot":"header"},slot:"header"},[_c('v-icon',{staticClass:"my-handle"},[_vm._v("widgets")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(j+1))]),_vm._v(" "),_c('v-flex',[_c('form-control',{attrs:{"item":_item[0]}})],1)],1):[_c('div',{attrs:{"slot":"header"},slot:"header"},[_c('v-icon',{staticClass:"my-handle"},[_vm._v("widgets")]),_vm._v("\n                "+_vm._s(j+1)+"\n              ")],1),_vm._v(" "),_vm._l((_item),function(item,k){return _c('v-card',{key:k},[_c('v-card-text',[_c('form-control',{attrs:{"item":item}})],1)],1)})]],2)}))],1):_c('div',{key:i,staticClass:"my-handle"},[_c('form-control',{attrs:{"item":item}})],1)]}),_vm._v(" "),_c('v-btn',{attrs:{"color":"primary","type":"submit"}},[_vm._v("保存")]),_vm._v(" "),_c('v-dialog',{attrs:{"max-width":"500px"},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-btn',{attrs:{"slot":"activator"},slot:"activator"},[_vm._v("新增")]),_vm._v(" "),_c('v-card',[_c('v-card-title',[_c('span',{staticClass:"headline"},[_vm._v("添加字段")])]),_vm._v(" "),_c('v-card-text',[_c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})],1)],1)],1)],2):_vm._e()],1)}
var DataEditor_staticRenderFns = []
var DataEditor_esExports = { render: DataEditor_render, staticRenderFns: DataEditor_staticRenderFns }
/* harmony default export */ var project_DataEditor = (DataEditor_esExports);
// CONCATENATED MODULE: ./src/pages/project/DataEditor.vue
function DataEditor_injectStyle (ssrContext) {
  __webpack_require__("kfzx")
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

    Object(project["f" /* fetchProjects */])(path).then(function (data) {
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
      return Object(project["e" /* fetchModules */])(node.value).then(function (data) {
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

/* harmony default export */ var pages_project_Projects = __webpack_exports__["default"] = (Projects_Component.exports);


/***/ }),

/***/ "7UMu":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("R9M2");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "7eFv":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("rbCu");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("c0171e56", content, true, {});

/***/ }),

/***/ "9npK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/api/project.ts
var project = __webpack_require__("bNw7");

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

    Object(project["c" /* fetchDirs */])().then(function (list) {
      _this.list = list;
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4b595b44","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/project/Home.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"grid-list-md":"","text-xs-center":""}},[_c('v-layout',{attrs:{"nowrap":""}},[_c('v-navigation-drawer',{attrs:{"stateless":"","light":"","value":"true"}},[_c('v-toolbar',{attrs:{"flat":""}},[_c('v-list',[_c('v-list-tile',[_c('v-list-tile-title',{staticClass:"title"},[_vm._v("\n              菜单\n            ")])],1)],1)],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-list',{staticClass:"pt-0",attrs:{"dense":""}},_vm._l((_vm.menus),function(item){return _c('v-list-tile',{key:item.title,attrs:{"to":item.link}},[_c('v-list-tile-action',[_c('v-icon',[_vm._v(_vm._s(item.icon))])],1),_vm._v(" "),_c('v-list-tile-content',[_c('v-list-tile-title',[_vm._v(_vm._s(item.title))])],1)],1)}))],1),_vm._v(" "),_c('v-flex',[_c('v-list',{attrs:{"two-line":""}},[_vm._l((_vm.list),function(item){return [_c('v-list-tile',{key:item.value,attrs:{"avatar":"","to":{path:'/project/projects',query:{path:item.value}}}},[_c('v-list-tile-content',[_c('v-list-tile-title',{domProps:{"innerHTML":_vm._s(item.name)}})],1)],1),_vm._v(" "),_c('v-divider',{key:item.value})]})],2)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var project_Home = (esExports);
// CONCATENATED MODULE: ./src/pages/project/Home.vue
function injectStyle (ssrContext) {
  __webpack_require__("Y4iv")
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
  Home,
  project_Home,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_project_Home = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "BwfY":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("fWfb");
__webpack_require__("M6a0");
__webpack_require__("OYls");
__webpack_require__("QWe/");
module.exports = __webpack_require__("FeBl").Symbol;


/***/ }),

/***/ "CXJV":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("FX33");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("8507de90", content, true, {});

/***/ }),

/***/ "Cdx3":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("sB3e");
var $keys = __webpack_require__("lktj");

__webpack_require__("uqUo")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "FX33":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ImageGallery.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "Kh4W":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("dSzd");


/***/ }),

/***/ "LKZe":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("NpIQ");
var createDesc = __webpack_require__("X8DO");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var has = __webpack_require__("D2L2");
var IE8_DOM_DEFINE = __webpack_require__("SfB7");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("+E39") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "Lokx":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),

/***/ "OYls":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('asyncIterator');


/***/ }),

/***/ "P4tK":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.file-uploads {\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  display: inline-block;\n}\n.file-uploads.file-uploads-html4 input[type=\"file\"] {\n  opacity: 0;\n  font-size: 20em;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.file-uploads.file-uploads-html5 input[type=\"file\"] {\n  overflow: hidden;\n  position: fixed;\n  width: 1px;\n  height: 1px;\n  z-index: -1;\n  opacity: 0;\n}\n", "", {"version":3,"sources":["E:/ecovacs/front-tool-fe/node_modules/vue-upload-component/src/FileUpload.vue"],"names":[],"mappings":";AACA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,mBAAmB;EACnB,sBAAsB;CACvB;AACD;EACE,WAAW;EACX,gBAAgB;EAChB,WAAW;EACX,OAAO;EACP,QAAQ;EACR,SAAS;EACT,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,aAAa;CACd;AACD;EACE,iBAAiB;EACjB,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,WAAW;CACZ","file":"FileUpload.vue","sourcesContent":["\n.file-uploads {\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  display: inline-block;\n}\n.file-uploads.file-uploads-html4 input[type=\"file\"] {\n  opacity: 0;\n  font-size: 20em;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.file-uploads.file-uploads-html5 input[type=\"file\"] {\n  overflow: hidden;\n  position: fixed;\n  width: 1px;\n  height: 1px;\n  z-index: -1;\n  opacity: 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "QWe/":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('observable');


/***/ }),

/***/ "Qw9b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/regenerator/index.js
var regenerator = __webpack_require__("Xxa5");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("exGp");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./src/api/axios/index.ts
var axios = __webpack_require__("gvqO");

// CONCATENATED MODULE: ./src/api/product.ts

var instance = Object(axios["a" /* default */])('product');
function list() {
    return instance.get('list');
}
function zip(path) {
    return instance.get('zip', {
        params: {
            path: path
        }
    });
}
// EXTERNAL MODULE: ./src/api/common.ts
var common = __webpack_require__("RS51");

// EXTERNAL MODULE: ./src/components/Uploader.vue + 2 modules
var Uploader = __webpack_require__("uHkJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/product/Home.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    Uploader: Uploader["a" /* default */]
  },
  data: function data() {
    return {
      headers: [{ text: '名称', value: 'name' }, { text: '修改时间', value: 'mtime' }, { text: '创建时间', value: 'ctime' }, { text: '操作', align: 'center', sortable: false }],
      items: [],
      ctx: '',
      loading: true
    };
  },
  created: function created() {
    this.load();
  },

  methods: {
    load: function load() {
      var _this = this;

      this.loading = true;
      list().then(function (_ref) {
        var ctx = _ref.ctx,
            items = _ref.items;

        _this.ctx = ctx;
        _this.items = items.sort(function (prev, next) {
          return next.mtime - prev.mtime;
        });
        _this.loading = false;
      });
    },
    onAdd: function onAdd(path) {
      var _this2 = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var data;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return zip(path);

              case 2:
                data = _context.sent;

                _this2.items.push(data);
                _context.next = 6;
                return _this2.load();

              case 6:
                _this2.$toast('添加成功');

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    },
    onClick: function onClick(item) {
      this.$router.push({
        path: '/product/browser',
        query: {
          path: item.path
        }
      });
    },
    del: function del(path) {
      var _this3 = this;

      return asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this3.$confirm('确定要删除吗？');

              case 3:
                _context2.next = 8;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return');

              case 8:
                _context2.next = 10;
                return Object(common["a" /* delFile */])(path);

              case 10:
                _this3.$toast('删除成功');
                _context2.next = 13;
                return _this3.load();

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this3, [[0, 5]]);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c73dd658","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/product/Home.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',[_c('v-layout',[_c('v-flex',[_c('div',{staticClass:"headline"},[_vm._v("资源列表")])]),_vm._v(" "),_c('div',[_c('v-btn',{attrs:{"fab":"","dark":"","small":"","color":"pink","loading":_vm.loading,"title":"刷新"},on:{"click":_vm.load}},[_c('v-icon',{attrs:{"dark":""}},[_vm._v("refresh")])],1),_vm._v(" "),_c('uploader',{attrs:{"context":_vm.ctx,"dir":"","keep-name":"","title":"添加","accept":"application/x-zip-compressed"},on:{"success":_vm.onAdd}},[_c('span',{staticClass:"pa-2"},[_c('v-icon',{attrs:{"x-large":"","dark":"","color":"pink"}},[_vm._v("add")])],1)])],1)],1),_vm._v(" "),(_vm.items.length>0)?_c('v-data-table',{staticClass:"elevation-1",attrs:{"headers":_vm.headers,"items":_vm.items,"hide-actions":""},scopedSlots:_vm._u([{key:"items",fn:function(props){return [_c('td',{staticClass:"text-xs-left"},[_c('v-icon',[_vm._v("star")]),_vm._v(" "),_c('a',{on:{"click":function($event){_vm.onClick(props.item)}}},[_vm._v(_vm._s(props.item.name))])],1),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm._f("date")(props.item.ctime)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm._f("date")(props.item.mtime)))]),_vm._v(" "),_c('td',{staticClass:"text-xs-right"},[_c('v-btn',{attrs:{"color":"primary","flat":"","title":"查看"},on:{"click":function($event){_vm.onClick(props.item)}}},[_vm._v("\n          查看\n        ")]),_vm._v(" "),_c('v-btn',{attrs:{"color":"error","flat":"","title":"删除"},on:{"click":function($event){_vm.del(props.item.path)}}},[_c('v-icon',[_vm._v("delete")])],1),_vm._v(" "),_c('v-btn',{attrs:{"title":"下载","flat":"","href":props.item.zipUrl,"target":"_blank"}},[_c('v-icon',[_vm._v("cloud_download")])],1)],1)]}}])}):_c('v-alert',{attrs:{"value":true,"type":"info"}},[_vm._v("\n    无文件\n  ")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var product_Home = (esExports);
// CONCATENATED MODULE: ./src/pages/product/Home.vue
function injectStyle (ssrContext) {
  __webpack_require__("7eFv")
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
  Home,
  product_Home,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_product_Home = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "Rrel":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("TcQ7");
var gOPN = __webpack_require__("n0T6").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "S62W":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Projects.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "WEDU":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".collapse-transition[data-v-632d9d14]{-webkit-transition:height .3s ease-in-out,padding-top .3s ease-in-out,padding-bottom .3s ease-in-out;transition:height .3s ease-in-out,padding-top .3s ease-in-out,padding-bottom .3s ease-in-out}.halo-tree li span[data-v-632d9d14]:hover{background-color:#dddddde3}.fade-enter-active[data-v-632d9d14],.fade-leave-active[data-v-632d9d14]{-webkit-transition:opacity .2s;transition:opacity .2s}.fade-enter[data-v-632d9d14],.fade-leave-to[data-v-632d9d14]{opacity:0}.halo-tree .expand-enter-active[data-v-632d9d14]{-webkit-transition:all 3s ease;transition:all 3s ease;height:50px;overflow:hidden}.halo-tree .expand-leave-active[data-v-632d9d14]{-webkit-transition:all 3s ease;transition:all 3s ease;height:0;overflow:hidden}.halo-tree .expand-enter[data-v-632d9d14],.halo-tree .expand-leave[data-v-632d9d14]{height:0;opacity:0}.halo-tree[data-v-632d9d14]{font-size:14px}.halo-tree li[data-v-632d9d14],.halo-tree ul[data-v-632d9d14]{list-style-type:none;text-align:left}.halo-tree .inputCheck[data-v-632d9d14]{display:inline-block;position:relative;width:14px;height:14px;border:1px solid #888;border-radius:2px;top:4px;text-align:center;font-size:14px;line-height:14px}.halo-tree .inputCheck.notAllNodes[data-v-632d9d14]:before{content:\"\\2713\";display:block;position:absolute;width:100%;height:100%;background-color:#888;z-index:1;color:#fff}.halo-tree .inputCheck.box-checked[data-v-632d9d14]:after{content:\"\\2713\";display:block;position:absolute;z-index:1;width:100%;text-align:center}.halo-tree .box-halfchecked[data-v-632d9d14]{background-color:#888}.halo-tree .box-halfchecked[data-v-632d9d14]:after{content:\"\\2713\";display:block;position:absolute;z-index:1;width:100%;text-align:center;color:#fff}.halo-tree .check[data-v-632d9d14]{display:block;position:absolute;font-size:14px;width:16px;height:16px;left:-5px;top:-4px;border:1px solid #000;opacity:0;cursor:pointer;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";filter:alpha(opacity=0);z-index:2}.halo-tree .chkDisabled[data-v-632d9d14]{background-color:#f5f5f5;opacity:1;cursor:not-allowed}.halo-tree li[data-v-632d9d14]{margin:0;padding:5px 5px 5px 15px;position:relative;list-style:none}.halo-tree li[data-v-632d9d14]:after,.halo-tree li[data-v-632d9d14]:before{content:\"\";left:-8px;position:absolute;right:auto;border-width:1px}.halo-tree li[data-v-632d9d14]:before{border-left:1px dashed #999;bottom:50px;height:100%;top:-8px;width:1px}.halo-tree li[data-v-632d9d14]:after{border-top:1px dashed #999;height:20px;top:17px;width:28px}.halo-tree li[data-v-632d9d14]:last-child:before{height:26px}.halo-tree>li.first-node[data-v-632d9d14]:before{top:17px}.halo-tree>li.first-node.only-node[data-v-632d9d14]:before{border-left:none}.halo-tree>li.only-node[data-v-632d9d14]:after{border-top:none}.halo-tree>ul[data-v-632d9d14]{padding-left:0}.halo-tree ul[data-v-632d9d14]{padding-left:17px;padding-top:10px}.halo-tree .tree-close[data-v-632d9d14],.halo-tree .tree-open[data-v-632d9d14]{display:inline-block;width:14px;height:14px;text-align:center;line-height:13px;border:1px solid #888;border-radius:2px;background:#fff}.halo-tree .tree-open[data-v-632d9d14]{line-height:13px}.halo-tree .tree-close[data-v-632d9d14]:after{content:\"+\";font-style:normal}.halo-tree .tree-open[data-v-632d9d14]:after{content:\"\\2013\";font-style:normal}.halo-tree .tree-node-el[data-v-632d9d14]{background-color:#fff;padding-left:2px;position:relative;z-index:3}.halo-tree li.leaf[data-v-632d9d14]{padding-left:15px}.halo-tree li.leaf[data-v-632d9d14]:after{content:\"\";left:-7px;position:absolute;right:auto;border-width:1px;border-top:1px dashed #999;height:20px;top:17px;width:25px}.halo-tree-search-box[data-v-632d9d14]{height:18px;line-height:18px;outline:none;border:1px solid #888;border-radius:3px}.halo-tree-search-box[data-v-632d9d14]:focus{border:1px solid #108ee9;-webkit-box-shadow:0 2px 2px rgba(16,142,233,.2);box-shadow:0 2px 2px rgba(16,142,233,.2);-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out}.halo-tree .node-title[data-v-632d9d14]{padding:3px;border-radius:3px;cursor:pointer;margin:0 2px}.halo-tree .node-selected[data-v-632d9d14]{border:1px solid #ddd;background-color:#ddd}.halo-tree .node-title.node-searched[data-v-632d9d14]{border:1px solid #ff8247}svg[data-v-3f867612]{height:14px;width:14px;overflow:visible;line-height:14px}circle[data-v-3f867612]{fill:#1e90ff;fill-opacity:0;-webkit-animation:opacity-data-v-3f867612 1.2s linear infinite;animation:opacity-data-v-3f867612 1.2s linear infinite}circle[data-v-3f867612]:nth-child(12n+1){-webkit-animation-delay:-.1s;animation-delay:-.1s}circle[data-v-3f867612]:nth-child(12n+2){-webkit-animation-delay:-.2s;animation-delay:-.2s}circle[data-v-3f867612]:nth-child(12n+3){-webkit-animation-delay:-.3s;animation-delay:-.3s}circle[data-v-3f867612]:nth-child(12n+4){-webkit-animation-delay:-.4s;animation-delay:-.4s}circle[data-v-3f867612]:nth-child(12n+5){-webkit-animation-delay:-.5s;animation-delay:-.5s}circle[data-v-3f867612]:nth-child(12n+6){-webkit-animation-delay:-.6s;animation-delay:-.6s}circle[data-v-3f867612]:nth-child(12n+7){-webkit-animation-delay:-.7s;animation-delay:-.7s}circle[data-v-3f867612]:nth-child(12n+8){-webkit-animation-delay:-.8s;animation-delay:-.8s}circle[data-v-3f867612]:nth-child(12n+9){-webkit-animation-delay:-.9s;animation-delay:-.9s}circle[data-v-3f867612]:nth-child(12n+10){-webkit-animation-delay:-1s;animation-delay:-1s}circle[data-v-3f867612]:nth-child(12n+11){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}circle[data-v-3f867612]:nth-child(12n+12){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.g-circles--v2 circle[data-v-3f867612]{fill-opacity:0;stroke-opacity:0;stroke-width:1;stroke:#9acd32;-webkit-animation-name:opacity-stroke-data-v-3f867612,colors-data-v-3f867612,colors-stroke-data-v-3f867612,transform-2-data-v-3f867612;animation-name:opacity-stroke-data-v-3f867612,colors-data-v-3f867612,colors-stroke-data-v-3f867612,transform-2-data-v-3f867612}.g-circles--v3 circle[data-v-3f867612]{fill-opacity:1;-webkit-animation-name:opacity-data-v-3f867612,colors-data-v-3f867612;animation-name:opacity-data-v-3f867612,colors-data-v-3f867612}.g-circles--v4 circle[data-v-3f867612]{fill-opacity:1;fill:orange;-webkit-transform-origin:60px 60px;transform-origin:60px 60px;-webkit-animation-name:opacity-data-v-3f867612,colors-3-data-v-3f867612,transform-data-v-3f867612;animation-name:opacity-data-v-3f867612,colors-3-data-v-3f867612,transform-data-v-3f867612}@-webkit-keyframes opacity-data-v-3f867612{3%{fill-opacity:1}75%{fill-opacity:0}}@keyframes opacity-data-v-3f867612{3%{fill-opacity:1}75%{fill-opacity:0}}@-webkit-keyframes opacity-stroke-data-v-3f867612{10%{stroke-opacity:1}85%{stroke-opacity:0}}@keyframes opacity-stroke-data-v-3f867612{10%{stroke-opacity:1}85%{stroke-opacity:0}}@-webkit-keyframes colors-data-v-3f867612{0%{fill:#9acd32}10%{fill:gold}75%{fill:crimson}}@keyframes colors-data-v-3f867612{0%{fill:#9acd32}10%{fill:gold}75%{fill:crimson}}@-webkit-keyframes colors-stroke-data-v-3f867612{0%{stroke:#9acd32}10%{stroke:gold}75%{stroke:crimson}}@keyframes colors-stroke-data-v-3f867612{0%{stroke:#9acd32}10%{stroke:gold}75%{stroke:crimson}}@-webkit-keyframes colors-2-data-v-3f867612{0%{fill:#ff0}50%{fill:red}65%{fill:#ff4500}95%{fill:gold}}@keyframes colors-2-data-v-3f867612{0%{fill:#ff0}50%{fill:red}65%{fill:#ff4500}95%{fill:gold}}@-webkit-keyframes colors-3-data-v-3f867612{0%{fill:#9acd32}50%{fill:#40e0d0}65%{fill:#ff0}95%{fill:orange}}@keyframes colors-3-data-v-3f867612{0%{fill:#9acd32}50%{fill:#40e0d0}65%{fill:#ff0}95%{fill:orange}}@-webkit-keyframes transform-data-v-3f867612{10%{-webkit-transform:scale(.75);transform:scale(.75)}}@keyframes transform-data-v-3f867612{10%{-webkit-transform:scale(.75);transform:scale(.75)}}@-webkit-keyframes transform-2-data-v-3f867612{40%{-webkit-transform:scale(.85);transform:scale(.85)}60%{stroke-width:20}}@keyframes transform-2-data-v-3f867612{40%{-webkit-transform:scale(.85);transform:scale(.85)}60%{stroke-width:20}}/*# sourceMappingURL=halower-tree.min.css.map*/", "", {"version":3,"sources":["E:/ecovacs/front-tool-fe/node_modules/vue-tree-halower/dist/E:/ecovacs/front-tool-fe/node_modules/vue-tree-halower/dist/halower-tree.min.css"],"names":[],"mappings":"AAAA,sCAAsC,qGAAA,4FAA4F,CAAC,0CAA0C,0BAA0B,CAAC,wEAAwE,+BAAA,sBAAsB,CAAC,6DAA6D,SAAS,CAAC,iDAAiD,+BAAA,uBAAuB,YAAY,eAAe,CAAC,iDAAiD,+BAAA,uBAAuB,SAAS,eAAe,CAAC,oFAAoF,SAAS,SAAS,CAAC,4BAA4B,cAAc,CAAC,8DAA8D,qBAAqB,eAAe,CAAC,wCAAwC,qBAAqB,kBAAkB,WAAW,YAAY,sBAAsB,kBAAkB,QAAQ,kBAAkB,eAAe,gBAAgB,CAAC,2DAA2D,gBAAgB,cAAc,kBAAkB,WAAW,YAAY,sBAAsB,UAAU,UAAU,CAAC,0DAA0D,gBAAgB,cAAc,kBAAkB,UAAU,WAAW,iBAAiB,CAAC,6CAA6C,qBAAqB,CAAC,mDAAmD,gBAAgB,cAAc,kBAAkB,UAAU,WAAW,kBAAkB,UAAU,CAAC,mCAAmC,cAAc,kBAAkB,eAAe,WAAW,YAAY,UAAU,SAAS,sBAAsB,UAAU,eAAe,gEAAgE,wBAAwB,SAAS,CAAC,yCAAyC,yBAAyB,UAAU,kBAAkB,CAAC,+BAA+B,SAAS,yBAAyB,kBAAkB,eAAe,CAAC,2EAA2E,WAAW,UAAU,kBAAkB,WAAW,gBAAgB,CAAC,sCAAsC,4BAA4B,YAAY,YAAY,SAAS,SAAS,CAAC,qCAAqC,2BAA2B,YAAY,SAAS,UAAU,CAAC,iDAAiD,WAAW,CAAC,iDAAiD,QAAQ,CAAC,2DAA2D,gBAAgB,CAAC,+CAA+C,eAAe,CAAC,+BAA+B,cAAc,CAAC,+BAA+B,kBAAkB,gBAAgB,CAAC,+EAA+E,qBAAqB,WAAW,YAAY,kBAAkB,iBAAiB,sBAAsB,kBAAkB,eAAe,CAAC,uCAAuC,gBAAgB,CAAC,8CAA8C,YAAY,iBAAiB,CAAC,6CAA6C,gBAAgB,iBAAiB,CAAC,0CAA0C,sBAAsB,iBAAiB,kBAAkB,SAAS,CAAC,oCAAoC,iBAAiB,CAAC,0CAA0C,WAAW,UAAU,kBAAkB,WAAW,iBAAiB,2BAA2B,YAAY,SAAS,UAAU,CAAC,uCAAuC,YAAY,iBAAiB,aAAa,sBAAsB,iBAAiB,CAAC,6CAA6C,yBAAyB,iDAAiD,yCAAyC,qFAAqF,6EAAwE,qEAAA,wGAAoE,CAAC,wCAAwC,YAAY,kBAAkB,eAAe,YAAY,CAAC,2CAA2C,sBAAsB,qBAAqB,CAAC,sDAAsD,wBAAwB,CAAC,qBAAqB,YAAY,WAAW,iBAAiB,gBAAgB,CAAC,wBAAwB,aAAa,eAAe,+DAA+D,sDAAsD,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,yCAAyC,6BAA6B,oBAAoB,CAAC,0CAA0C,4BAA4B,mBAAmB,CAAC,0CAA0C,8BAA8B,qBAAqB,CAAC,0CAA0C,8BAA8B,qBAAqB,CAAC,uCAAuC,eAAe,iBAAiB,eAAe,eAAe,uIAAuI,8HAA8H,CAAC,uCAAuC,eAAe,sEAAsE,6DAA6D,CAAC,uCAAuC,eAAe,YAAY,mCAAmC,2BAA0D,kGAAkG,yFAAyF,CAAC,2CAA2C,GAAG,cAAc,CAAC,IAAI,cAAc,CAAC,CAAC,mCAAmC,GAAG,cAAc,CAAC,IAAI,cAAc,CAAC,CAAC,kDAAkD,IAAI,gBAAgB,CAAC,IAAI,gBAAgB,CAAC,CAAC,0CAA0C,IAAI,gBAAgB,CAAC,IAAI,gBAAgB,CAAC,CAAC,0CAA0C,GAAG,YAAY,CAAC,IAAI,SAAS,CAAC,IAAI,YAAY,CAAC,CAAC,kCAAkC,GAAG,YAAY,CAAC,IAAI,SAAS,CAAC,IAAI,YAAY,CAAC,CAAC,iDAAiD,GAAG,cAAc,CAAC,IAAI,WAAW,CAAC,IAAI,cAAc,CAAC,CAAC,yCAAyC,GAAG,cAAc,CAAC,IAAI,WAAW,CAAC,IAAI,cAAc,CAAC,CAAC,4CAA4C,GAAG,SAAS,CAAC,IAAI,QAAQ,CAAC,IAAI,YAAY,CAAC,IAAI,SAAS,CAAC,CAAC,oCAAoC,GAAG,SAAS,CAAC,IAAI,QAAQ,CAAC,IAAI,YAAY,CAAC,IAAI,SAAS,CAAC,CAAC,4CAA4C,GAAG,YAAY,CAAC,IAAI,YAAY,CAAC,IAAI,SAAS,CAAC,IAAI,WAAW,CAAC,CAAC,oCAAoC,GAAG,YAAY,CAAC,IAAI,YAAY,CAAC,IAAI,SAAS,CAAC,IAAI,WAAW,CAAC,CAAC,6CAA6C,IAAI,6BAA6B,oBAAoB,CAAC,CAAC,qCAAqC,IAAI,6BAA6B,oBAAoB,CAAC,CAAC,+CAA+C,IAAI,6BAA6B,oBAAoB,CAAC,IAAI,eAAe,CAAC,CAAC,uCAAuC,IAAI,6BAA6B,oBAAoB,CAAC,IAAI,eAAe,CAAC,CAAC,+CACzyP","file":"halower-tree.min.css","sourcesContent":[null],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "Xc4G":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("lktj");
var gOPS = __webpack_require__("1kS7");
var pIE = __webpack_require__("NpIQ");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "Y4iv":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("xf46");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("def91fb4", content, true, {});

/***/ }),

/***/ "Zzip":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("/n6Q"), __esModule: true };

/***/ }),

/***/ "bNw7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = fetchDirs;
/* harmony export (immutable) */ __webpack_exports__["a"] = addDir;
/* harmony export (immutable) */ __webpack_exports__["f"] = fetchProjects;
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchModules;
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchImages;
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchDatas;
/* harmony export (immutable) */ __webpack_exports__["g"] = getData;
/* harmony export (immutable) */ __webpack_exports__["h"] = saveData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__axios__ = __webpack_require__("gvqO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__("RS51");



var instance = Object(__WEBPACK_IMPORTED_MODULE_1__axios__["a" /* default */])('project');
function fetchDirs() {
    return instance.get('dir');
}
function addDir(item) {
    return instance.post('dir/add', item);
}
function fetchProjects(dir) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__common__["g" /* listPatternFiles */])(dir + '/src/projects/*');
}
function fetchModules(dir) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__common__["g" /* listPatternFiles */])(dir + '/modules/*');
}
function fetchImages(dir) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__common__["g" /* listPatternFiles */])(dir + '/**/*.{png,jpg,jpeg,svg,gif,webp,ico}');
}
function fetchDatas(dir) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__common__["g" /* listPatternFiles */])(dir + '/data/*.{json,jsonc}');
}
function getData(path) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/api/file', {
        params: {
            path: path
        },
        responseType: 'json'
    }).then(function (res) {
        return res.data;
    });
}
function saveData(path, data) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put('/api/upload', data, {
        params: {
            path: path
        }
    });
}

/***/ }),

/***/ "crlp":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var LIBRARY = __webpack_require__("O4g8");
var wksExt = __webpack_require__("Kh4W");
var defineProperty = __webpack_require__("evD5").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "cyl0":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4vBb");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("40b68aa6", content, true, {});

/***/ }),

/***/ "eFkE":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("0jML")


/***/ }),

/***/ "fWfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7KvD");
var has = __webpack_require__("D2L2");
var DESCRIPTORS = __webpack_require__("+E39");
var $export = __webpack_require__("kM2E");
var redefine = __webpack_require__("880/");
var META = __webpack_require__("06OY").KEY;
var $fails = __webpack_require__("S82l");
var shared = __webpack_require__("e8AB");
var setToStringTag = __webpack_require__("e6n0");
var uid = __webpack_require__("3Eo+");
var wks = __webpack_require__("dSzd");
var wksExt = __webpack_require__("Kh4W");
var wksDefine = __webpack_require__("crlp");
var enumKeys = __webpack_require__("Xc4G");
var isArray = __webpack_require__("7UMu");
var anObject = __webpack_require__("77Pl");
var isObject = __webpack_require__("EqjI");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var createDesc = __webpack_require__("X8DO");
var _create = __webpack_require__("Yobk");
var gOPNExt = __webpack_require__("Rrel");
var $GOPD = __webpack_require__("LKZe");
var $DP = __webpack_require__("evD5");
var $keys = __webpack_require__("lktj");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("n0T6").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("NpIQ").f = $propertyIsEnumerable;
  __webpack_require__("1kS7").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("O4g8")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("hJx8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "fZjL":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("jFbC"), __esModule: true };

/***/ }),

/***/ "hA/Q":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("P4tK");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("ec9c0c76", content, true, {});

/***/ }),

/***/ "jFbC":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Cdx3");
module.exports = __webpack_require__("FeBl").Object.keys;


/***/ }),

/***/ "kfzx":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("66bV");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("ad9214f6", content, true, {});

/***/ }),

/***/ "lTSm":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("VTree",[],t):"object"==typeof exports?exports.VTree=t():e.VTree=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=1)}([function(e,t){e.exports=function(e,t,n,r,a,o){var i,d=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(i=e,d=e.default);var c="function"==typeof d?d.options:d;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),a&&(c._scopeId=a);var l;if(o?(l=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},c._ssrRegister=l):r&&(l=r),l){var f=c.functional,u=f?c.render:c.beforeCreate;f?(c._injectStyles=l,c.render=function(e,t){return l.call(t),u(e,t)}):c.beforeCreate=u?[].concat(u,l):[l]}return{esModule:i,exports:d,options:c}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);r.a.install=function(e){e.component("VTree",r.a)},t.default=r.a},function(e,t,n){"use strict";function r(e){n(3)}var a=n(4),o=n(13),i=n(0),d=r,s=i(a.a,o.a,!1,d,"data-v-632d9d14",null);t.a=s.exports},function(e,t){},function(e,t,n){"use strict";var r=n(5),a=n(6),o=n(7),i=n(11),d=n.n(i),s=function(){function e(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,d=e[Symbol.iterator]();!(r=(i=d.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&d.return&&d.return()}finally{if(a)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.a={name:"Tree",mixins:[r.a],props:{data:{type:Array,default:function(){return[]}},parent:{type:Object,default:function(){return null}},multiple:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},dragAfterExpanded:{type:Boolean,default:!0},halfcheck:{type:Boolean,default:!1},scoped:{type:Boolean,default:!1},tpl:Function},components:{Render:a.a,Loading:o.a,CollapseTransition:d.a},watch:{data:function(){this.initHandle()}},mounted:function(){var e=this;this.$on("childChecked",function(t,n){if(t.children&&t.children.length){var r=!0,a=!1,o=void 0;try{for(var i,d=t.children[Symbol.iterator]();!(r=(i=d.next()).done);r=!0){var s=i.value;e.$set(s,"checked",n),e.$emit("nodeChecked",s,n)}}catch(e){a=!0,o=e}finally{try{!r&&d.return&&d.return()}finally{if(a)throw o}}}}),this.$on("parentChecked",function(t,n){if(e.$set(t,"checked",n),!t.parent)return!1;var r=t.parent.children.some(function(e){return e.checked}),a=t.parent.children.every(function(e){return e.checked});if(e.halfcheck){if(a?e.$set(t.parent,"halfcheck",!1):r?e.$set(t.parent,"halfcheck",!0):e.$set(t.parent,"halfcheck",!1),!n&&r)return e.$set(t.parent,"halfcheck",!0),!1;e.$emit("parentChecked",t.parent,n)}else n&&a&&e.$emit("parentChecked",t.parent,n),n||e.$emit("parentChecked",t.parent,n)}),this.$on("nodeChecked",function(t,n){e.scoped?e.$set(t,"checked",n):(e.$emit("parentChecked",t,n),e.$emit("childChecked",t,n))}),this.$on("toggleshow",function(t,n){e.$set(t,"visible",n),n&&t.parent&&e.$emit("toggleshow",t.parent,n)}),this.$on("cancelSelected",function(e){var t=!0,n=!1,r=void 0;try{for(var a,o=e.$children[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var i=a.value,d=!0,s=!1,c=void 0;try{for(var l,f=i.data[Symbol.iterator]();!(d=(l=f.next()).done);d=!0){var u=l.value;i.$set(u,"selected",!1)}}catch(e){s=!0,c=e}finally{try{!d&&f.return&&f.return()}finally{if(s)throw c}}i.$children&&i.$emit("cancelSelected",i)}}catch(e){n=!0,r=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw r}}}),this.initHandle()},methods:{drop:function(e,t){t.preventDefault(),t.stopPropagation();var n=t.dataTransfer.getData("guid"),r=this.getDragNode(n);if(r.parent===e||null===r.parent)return!1;if(this.hasInGenerations(r,e))return!1;var a=r.parent.children;e.children&&-1===e.children.indexOf(r)?(e.children.push(r),a.splice(a.indexOf(r),1)):(this.$set(e,"children",[r]),a.splice(a.indexOf(r),1)),this.$set(e,"expanded",this.dragAfterExpanded),this.$emit("drag-node-end",{dragNode:r,targetNode:e})},drag:function(e,t){var n=this.guid();this.setDragNode(n,e),t.dataTransfer.setData("guid",n)},dragover:function(e){e.preventDefault(),e.stopPropagation()},initHandle:function(){var e=!0,t=!1,n=void 0;try{for(var r,a=this.data[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var o=r.value;this.$set(o,"parent",this.parent)}}catch(e){t=!0,n=e}finally{try{!e&&a.return&&a.return()}finally{if(t)throw n}}},expandNode:function(e){this.$set(e,"expanded",!e.expanded),this.$emit("node-expanded",e)},asyncLoadNodes:function(e){e.async&&!e.children&&this.$emit("async-load-nodes",e)},isLeaf:function(e){return!(e.children&&e.children.length)&&e.parent},addNode:function(e,t){var n=null;if(this.$set(e,"expanded",!0),void 0===t)throw new ReferenceError("newNode is required but undefined");if("string"==typeof t&&(n={title:t}),"object"===(void 0===t?"undefined":c(t))&&!t.hasOwnProperty("title"))throw new ReferenceError("the title property is missed");"object"===(void 0===t?"undefined":c(t))&&t.hasOwnProperty("title")&&(n=t),this.isLeaf(e)?(this.$set(e,"children",[]),e.children.push(n)):e.children.push(n),this.$emit("addNode",{parentNode:e,newNode:t})},addNodes:function(e,t){var n=!0,r=!1,a=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var d=o.value;this.addNode(e,d)}}catch(e){r=!0,a=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw a}}},nodeClick:function(e){this.$emit("node-click",e)},nodeMouseOver:function(e){this.$emit("node-mouse-over",e)},dragNodeEnd:function(e){this.$emit("drag-node-end",e)},delNode:function(e,t){if(null===e||void 0===e)throw new ReferenceError("the root element can't deleted!");e.children.splice(e.children.indexOf(t),1),this.$emit("delNode",{parentNode:e,delNode:t})},changeNodeCheckStatus:function(e,t){this.$emit("nodeChecked",e,t.target.checked)},nodeSelected:function(e){var t=function e(t){return"UL"===t.$parent.$el.nodeName?(t=t.$parent,e(t)):t}(this);if(!this.multiple){var n=!0,r=!1,a=void 0;try{for(var o,i=(t.data||[])[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var d=o.value;this.$set(d,"selected",!1)}}catch(e){r=!0,a=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw a}}this.$emit("cancelSelected",t)}this.multiple&&this.$set(e,"checked",!e.selected),this.$set(e,"selected",!e.selected),this.$emit("node-click",e)},getNodes:function(e,t){t=t||this.data;var n=[],r=!0,a=!1,o=void 0;try{for(var i,d=t[Symbol.iterator]();!(r=(i=d.next()).done);r=!0){var c=i.value,l=!0,f=!0,u=!1,h=void 0;try{for(var p,y=Object.entries(e)[Symbol.iterator]();!(f=(p=y.next()).done);f=!0){var v=p.value,g=s(v,2),m=g[0],x=g[1];if(c[m]!==x){l=!1;break}}}catch(e){u=!0,h=e}finally{try{!f&&y.return&&y.return()}finally{if(u)throw h}}l&&n.push(c),c.children&&c.children.length&&(n=n.concat(this.getNodes(e,c.children)))}}catch(e){a=!0,o=e}finally{try{!r&&d.return&&d.return()}finally{if(a)throw o}}return n},getSelectedNodes:function(){return this.getNodes({selected:!0},this.data)},getCheckedNodes:function(){return this.getNodes({checked:!0},this.data)},searchNodes:function(e,t){t=t||this.data;var n=!0,r=!1,a=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var d=o.value,s=!!e&&("function"==typeof e?e(d):d.title.indexOf(e)>-1);this.$set(d,"searched",s),this.$set(d,"visible",!1),this.$emit("toggleshow",d,!e||s),d.children&&d.children.length&&(s&&this.$set(d,"expanded",!0),this.searchNodes(e,d.children))}}catch(e){r=!0,a=e}finally{try{!n&&i.return&&i.return()}finally{if(r)throw a}}}}}},function(e,t,n){"use strict";function r(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function a(e,t){window.treeDrag={},window.treeDrag[e]=t}function o(e){return window.treeDrag[e]}function i(e,t){if(e.hasOwnProperty("children")&&e.children){var n=!0,r=!1,a=void 0;try{for(var o,d=e.children[Symbol.iterator]();!(n=(o=d.next()).done);n=!0){var s=o.value;if(s===t)return!0;if(s.children)return i(s,t)}}catch(e){r=!0,a=e}finally{try{!n&&d.return&&d.return()}finally{if(r)throw a}}return!1}}t.a={methods:{guid:r,setDragNode:a,getDragNode:o,hasInGenerations:i}}},function(e,t,n){"use strict";t.a={name:"inlineMenu",functional:!0,props:{node:Object,tpl:Function},render:function(e,t){var n=t.props.node.selected?"node-title node-selected":"node-title";return t.props.node.searched&&(n+=" node-searched"),t.props.tpl?t.props.tpl(t.props.node,t):e("span",{domProps:{innerHTML:t.props.node.title},attrs:{title:t.props.node.title},class:n,on:{mouseover:function(){return t.parent.nodeMouseOver(t.props.node)},click:function(){return t.parent.nodeSelected(t.props.node)}}},[])}}},function(e,t,n){"use strict";function r(e){n(8)}var a=n(9),o=n(10),i=n(0),d=r,s=i(a.a,o.a,!1,d,"data-v-3f867612",null);t.a=s.exports},function(e,t){},function(e,t,n){"use strict";t.a={name:"tree-load-svg"}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{attrs:{viewBox:"0 0 120 120",version:"1.1"}},[n("g",{staticClass:"g-circles g-circles--v3",attrs:{id:"circle"}},[n("circle",{attrs:{id:"12",transform:"translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) ",cx:"35",cy:"16.6987298",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"11",transform:"translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) ",cx:"16.6987298",cy:"35",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"10",transform:"translate(10, 60) rotate(-90) translate(-10, -60) ",cx:"10",cy:"60",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"9",transform:"translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) ",cx:"16.6987298",cy:"85",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"8",transform:"translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) ",cx:"35",cy:"103.30127",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"7",cx:"60",cy:"110",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"6",transform:"translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) ",cx:"85",cy:"103.30127",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"5",transform:"translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) ",cx:"103.30127",cy:"85",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"4",transform:"translate(110, 60) rotate(-90) translate(-110, -60) ",cx:"110",cy:"60",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"3",transform:"translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) ",cx:"103.30127",cy:"35",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"2",transform:"translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) ",cx:"85",cy:"16.6987298",r:"10"}}),e._v(" "),n("circle",{attrs:{id:"1",cx:"60",cy:"10",r:"10"}})])])},a=[],o={render:r,staticRenderFns:a};t.a=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var a=n(12),o=function(){function e(){r(this,e)}return e.prototype.beforeEnter=function(e){(0,a.addClass)(e,"collapse-transition"),e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.style.height="0",e.style.paddingTop=0,e.style.paddingBottom=0},e.prototype.enter=function(e){e.dataset.oldOverflow=e.style.overflow,0!==e.scrollHeight?(e.style.height=e.scrollHeight+"px",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom):(e.style.height="",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom),e.style.overflow="hidden"},e.prototype.afterEnter=function(e){(0,a.removeClass)(e,"collapse-transition"),e.style.height="",e.style.overflow=e.dataset.oldOverflow},e.prototype.beforeLeave=function(e){e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.dataset.oldOverflow=e.style.overflow,e.style.height=e.scrollHeight+"px",e.style.overflow="hidden"},e.prototype.leave=function(e){0!==e.scrollHeight&&((0,a.addClass)(e,"collapse-transition"),e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0)},e.prototype.afterLeave=function(e){(0,a.removeClass)(e,"collapse-transition"),e.style.height="",e.style.overflow=e.dataset.oldOverflow,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom},e}();t.default={name:"ElCollapseTransition",functional:!0,render:function(e,t){var n=t.children;return e("transition",{on:new o},n)}}},function(e,t,n){"use strict";function r(e,t){if(!e||!t)return!1;if(-1!==t.indexOf(" "))throw new Error("className should not contain space.");return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}function a(e,t){if(e){for(var n=e.className,a=(t||"").split(" "),o=0,i=a.length;o<i;o++){var d=a[o];d&&(e.classList?e.classList.add(d):r(e,d)||(n+=" "+d))}e.classList||(e.className=n)}}function o(e,t){if(e&&t){for(var n=t.split(" "),a=" "+e.className+" ",o=0,d=n.length;o<d;o++){var s=n[o];s&&(e.classList?e.classList.remove(s):r(e,s)&&(a=a.replace(" "+s+" "," ")))}e.classList||(e.className=i(a))}}Object.defineProperty(t,"__esModule",{value:!0}),t.hasClass=r,t.addClass=a,t.removeClass=o;var i=function(e){return(e||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")}},function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"halo-tree"},e._l(e.data,function(t,r){return n("li",{directives:[{name:"show",rawName:"v-show",value:!t.hasOwnProperty("visible")||t.visible,expression:"item.hasOwnProperty('visible') ? item.visible : true"}],key:t.id?t.id:t.title,class:{leaf:e.isLeaf(t),"first-node":!e.parent&&0===r,"only-node":!e.parent&&1===e.data.length},on:{drop:function(n){e.drop(t,n)},dragover:function(t){e.dragover(t)}}},[n("div",{staticClass:"tree-node-el",attrs:{draggable:e.draggable},on:{dragstart:function(n){e.drag(t,n)}}},[!t.parent||t.children&&t.children.length>0||t.async?n("span",{class:t.expanded?"tree-open":"tree-close",on:{click:function(n){e.expandNode(t)}}}):e._e(),e._v(" "),e.multiple&&!t.nocheck?n("span",{class:[t.checked?t.halfcheck?"box-halfchecked":"box-checked":"box-unchecked","inputCheck"]},[e.multiple?n("input",{directives:[{name:"model",rawName:"v-model",value:t.checked,expression:"item.checked"}],class:["check",t.chkDisabled?"chkDisabled":""],attrs:{disabled:t.chkDisabled,type:"checkbox"},domProps:{checked:Array.isArray(t.checked)?e._i(t.checked,null)>-1:t.checked},on:{change:[function(n){var r=t.checked,a=n.target,o=!!a.checked;if(Array.isArray(r)){var i=e._i(r,null);a.checked?i<0&&(t.checked=r.concat([null])):i>-1&&(t.checked=r.slice(0,i).concat(r.slice(i+1)))}else e.$set(t,"checked",o)},function(n){e.changeNodeCheckStatus(t,n)}]}}):e._e()]):e._e(),e._v(" "),t.loading&&t.expanded?n("loading"):e._e(),e._v(" "),n("Render",{attrs:{node:t,tpl:e.tpl}})],1),e._v(" "),n("collapse-transition",[e.isLeaf(t)?e._e():n("tree",{directives:[{name:"show",rawName:"v-show",value:t.expanded,expression:"item.expanded"}],attrs:{dragAfterExpanded:e.dragAfterExpanded,draggable:e.draggable,tpl:e.tpl,data:t.children,halfcheck:e.halfcheck,scoped:e.scoped,parent:t,multiple:e.multiple},on:{"async-load-nodes":e.asyncLoadNodes,"node-expanded":e.asyncLoadNodes,"node-click":e.nodeClick,"drag-node-end":e.dragNodeEnd}})],1)],1)}))},a=[],o={render:r,staticRenderFns:a};t.a=o}])});
//# sourceMappingURL=v2-tree.js.map

/***/ }),

/***/ "mLPn":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("S62W");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("3d988830", content, true, {});

/***/ }),

/***/ "n0T6":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("Ibhu");
var hiddenKeys = __webpack_require__("xnc9").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "pFYg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__("Zzip");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__("5QVw");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "rbCu":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Home.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "uHkJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vue-upload-component/src/index.js
var src = __webpack_require__("eFkE");
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// EXTERNAL MODULE: ./src/api/common.ts
var common = __webpack_require__("RS51");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Uploader.vue
//
//
//
//
//
//



/* harmony default export */ var Uploader = ({
  props: {
    context: String,
    path: String,
    keepName: Boolean,
    drop: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    },
    multiple: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    accept: {
      type: String,
      default: function _default() {
        return 'image/*';
      }
    },
    dir: {
      type: String,
      default: function _default() {
        return 'images';
      }
    }
  },
  components: {
    FileUpload: src_default.a
  },
  data: function data() {
    return {
      uploadUrl: Object(common["e" /* getUploadUrl */])()
    };
  },

  methods: {
    addFile: function addFile(item, oldItem) {
      if (!item) {
        return;
      }
      if (item && oldItem) {
        if (item.success !== oldItem.success) {
          this.$emit('success', item.response.data);
        }
        return;
      }
      var file = item.file;
      var name = Date.now() + Math.random().toString().substring(2, 5) + '.' + file.name.substring(file.name.lastIndexOf('.') + 1);
      var path = this.path;
      if (!path) {
        if (this.keepName) {
          path = this.context + '/' + file.name;
        } else {
          path = this.context + '/' + (this.dir ? this.dir + '/' : '') + name;
        }
      }
      item.data = {
        path: path
      };
      this.$emit('input', {
        path: path,
        name: name,
        type: file.type,
        url: this.getImageDataUrl(file)
      });
      item.active = true;
    },
    getImageDataUrl: function getImageDataUrl(file) {
      var URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        return URL.createObjectURL(file);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7bee2b94","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Uploader.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('file-upload',{staticStyle:{"vertical-align":"middle"},attrs:{"name":"file","put-action":_vm.uploadUrl,"multiple":_vm.multiple,"accept":_vm.accept},on:{"input-file":_vm.addFile}},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Uploader = (esExports);
// CONCATENATED MODULE: ./src/components/Uploader.vue
function injectStyle (ssrContext) {
  __webpack_require__("cyl0")
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
  Uploader,
  components_Uploader,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_Uploader = __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "ug9+":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("WEDU");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("733f3f30", content, true, {});

/***/ }),

/***/ "uqUo":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("kM2E");
var core = __webpack_require__("FeBl");
var fails = __webpack_require__("S82l");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "xf46":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Home.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "xyHd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/api/project.ts
var project = __webpack_require__("bNw7");

// EXTERNAL MODULE: ./src/components/FormEdit.vue + 2 modules
var FormEdit = __webpack_require__("dhkN");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/project/Add.vue
//
//
//



/* harmony default export */ var Add = ({
  components: {
    FormEdit: FormEdit["a" /* default */]
  },
  data: function data() {
    return {
      add: project["a" /* addDir */],
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
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-edit',{attrs:{"fields":_vm.fields,"add":_vm.add}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var project_Add = (esExports);
// CONCATENATED MODULE: ./src/pages/project/Add.vue
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
  project_Add,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_project_Add = __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=project.dad5d6feda75f554b29e.js.map