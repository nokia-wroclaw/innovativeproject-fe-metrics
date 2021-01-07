// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchingEventsLogs = catchingEventsLogs;

function catchingEventsLogs(event) {
  var measurementName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "log";
  var tags = {};

  for (var property in event) {
    var tagValue = "";

    if (typeof event[property] === "string") {
      tagValue = '"' + event[property] + '"';
      tagValue.replaceAll(" ", "_");
    } else if (typeof event[property] === "number" || typeof event[property] === "boolean") {
      tagValue = event[property];
    }

    if (tagValue !== "") {
      tags[property] = tagValue;
    }
  }

  return [measurementName, '"' + event.type + '"', tags];
}
},{}],"Errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchingErrors = catchingErrors;
exports.throwBasicError = throwBasicError;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function catchingErrors(errorEvent) {
  var measurementName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
  errorEvent.preventDefault();
  errorEvent.stopImmediatePropagation();
  console.log(errorEvent.message);
  var tags = {};

  for (var property in errorEvent) {
    if (_typeof(errorEvent[property]) === "object") {
      tags[property] = '"' + errorEvent[property].constructor.name + '"';
    } else if (typeof errorEvent[property] === "string") {
      var string = '"' + errorEvent[property] + '"';

      if (!string.includes("[native")) {
        tags[property] = string.replaceAll(" ", "_");
      }
    } else if (typeof errorEvent[property] === "number" || typeof errorEvent[property] === "boolean") {
      tags[property] = errorEvent[property];
    }
  }

  return [measurementName, '"' + errorEvent.message + '"', tags];
}

function throwBasicError(mess) {
  throw new Error(mess);
}
},{}],"Performance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPerformance = getPerformance;
exports.checkHowLong = checkHowLong;
exports.preparePerformanceMeasurement = preparePerformanceMeasurement;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getPerformance() {
  var entries = performance.getEntries();
  var performanceMeasurements = [];

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i].toJSON();
    performanceMeasurements.push(preparePerformanceMeasurement(entry));
  }

  return performanceMeasurements;
}

function checkHowLong(func, startName, endName) {
  performance.mark(startName);
  func();
  performance.mark(endName);
  performance.measure("measure " + startName + " to " + endName, startName, endName);
  var performanceMes = preparePerformanceMeasurement(performance.getEntriesByName("measure " + startName + " to " + endName)[0].toJSON());
  performance.clearMarks();
  performance.clearMeasures();
  return performanceMes;
}

function preparePerformanceMeasurement(entry) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "performance";
  var tags = {};
  var value = entry.duration;

  for (var property in entry) {
    if (_typeof(entry[property]) === "object") {
      tags[property] = '"' + entry[property].constructor.name + '"';
    } else if (typeof entry[property] === "string") {
      var string = '"' + entry[property] + '"';
      tags[property] = string.replaceAll(" ", "_");
    } else if (typeof entry[property] === "number" || typeof entry[property] === "boolean") {
      tags[property] = entry[property];
    }
  }

  return [name, value, tags];
}
},{}],"DatabaseController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUrl = setUrl;
exports.setBucket = setBucket;
exports.setToken = setToken;
exports.setPrefix = setPrefix;
exports.setQuery = setQuery;
exports.setExist = setExist;
exports.prepareQuery = prepareQuery;
exports.dropDatabase = dropDatabase;
exports.sendQueries = sendQueries;
exports.createDb = createDb;
exports.checkDb = checkDb;
exports.catchPerformanceMeasurements = catchPerformanceMeasurements;
exports.catchErrors = catchErrors;
exports.catchEvents = catchEvents;
exports.catchOwnFunctionPerformance = catchOwnFunctionPerformance;
exports.throwBasicError = throwBasicError;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.checkCookie = checkCookie;
exports.DatabaseExist = exports.query = exports.Measurement_prefix = exports.Token = exports.Bucket = exports.Url = void 0;

var _Events = require("./Events");

var _Errors = require("./Errors");

var _Performance = require("./Performance");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Url = "";
exports.Url = Url;
var Bucket = "";
exports.Bucket = Bucket;
var Token = "";
exports.Token = Token;
var Measurement_prefix = "fem";
exports.Measurement_prefix = Measurement_prefix;
var query = "";
exports.query = query;
var DatabaseExist = false;
exports.DatabaseExist = DatabaseExist;

function setUrl(url) {
  exports.Url = Url = url;
}

function setBucket(bucket) {
  exports.Bucket = Bucket = bucket;
}

function setToken(token) {
  exports.Token = Token = token;
}

function setPrefix(prefix) {
  exports.Measurement_prefix = Measurement_prefix = prefix;
}

function setQuery(newQuery) {
  exports.query = query = newQuery;
}

function setExist(exist) {
  exports.DatabaseExist = DatabaseExist = exist;
}

function prepareQuery(measurement_name, value) {
  var tags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var str = '' + Measurement_prefix + '_' + measurement_name;

  for (var _i = 0, _Object$entries = Object.entries(tags); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        key_value = _Object$entries$_i[1];

    str = str + ',' + key + '=' + key_value;
  }

  str = str + ' value=' + value;
  str = str + " " + Date.now() * 1000000 + "\n";
  exports.query = query = query + str;
}

function dropDatabase() {
  exports.DatabaseExist = DatabaseExist = false;
  fetch(Url + "/query?db=" + Bucket + "&q=DROP DATABASE " + Bucket, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

function sendQueries() {
  if (query !== "" && Url !== "" && Bucket !== "" && DatabaseExist) {
    if (Token !== "") {
      fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Token ' + Token
        },
        body: query
      });
    } else {
      fetch(Url + "/api/v2/write?bucket=metrics", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query
      });
    }

    exports.query = query = "";
  }
}

function createDb(db_name) {
  var q1 = 'CREATE DATABASE ' + db_name + ";";
  var addr = Url + '/query?q=' + q1;
  fetch(addr, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function () {
    exports.DatabaseExist = DatabaseExist = true;
  });
}

function checkDb(db_name) {
  if (!Url.includes("localhost:8086")) {
    exports.DatabaseExist = DatabaseExist = true;
  } else {
    var jsonIssues = {};
    $.ajax({
      url: Url + "/query?q=show%20databases",
      dataType: 'json',
      success: function success(data) {
        jsonIssues = data;
        var isDatabaseExists = false;
        var databasesNames = jsonIssues.results[0].series[0].values;

        for (var i = 0; i < databasesNames.length; i++) {
          if (databasesNames[i][0] === db_name) {
            isDatabaseExists = true;
          }
        }

        if (!isDatabaseExists) {
          createDb(db_name);
        } else {
          exports.DatabaseExist = DatabaseExist = true;
        }
      },
      fail: function fail(data) {
        createDb(db_name);
      }
    });
  }
}

function catchPerformanceMeasurements() {
  var performanceMeasurements = (0, _Performance.getPerformance)();

  var _iterator = _createForOfIteratorHelper(performanceMeasurements),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var measurement = _step.value;
      prepareQuery(measurement[0], measurement[1], measurement[2]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function catchErrors() {
  window.addEventListener('error', function (ev) {
    var errorMeasurement = (0, _Errors.catchingErrors)(ev);
    prepareQuery(errorMeasurement[0], errorMeasurement[1], errorMeasurement[2]);
  });
}

function catchEvents(elem, eventList) {
  var _iterator2 = _createForOfIteratorHelper(eventList),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var event = _step2.value;
      elem.addEventListener(event, function (ev) {
        var eventMeasurement = (0, _Events.catchingEventsLogs)(ev);
        prepareQuery(eventMeasurement[0], eventMeasurement[1], eventMeasurement[2]);
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function catchOwnFunctionPerformance(func, startName, endName) {
  var score = (0, _Performance.checkHowLong)(func, startName, endName);
  prepareQuery(score[0], score[1], score[2]);
}

function throwBasicError(mess) {
  throwBasicError(mess);
}

function setCookie(cname, cvalue) {
  //var d = new Date();
  //d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue; //+ ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function checkCookie() {
  var addr = getCookie("database_address");
  var bucket = getCookie("bucket");
  return !(addr === "" || bucket === "");
}
},{"./Events":"Events.js","./Errors":"Errors.js","./Performance":"Performance.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37081" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","DatabaseController.js"], null)
//# sourceMappingURL=/DatabaseController.9a32459f.js.map