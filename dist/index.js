"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dotenv = _interopRequireDefault(require("dotenv"));
var _googleapis = require("googleapis");
var _express = _interopRequireDefault(require("express"));
var _fs = _interopRequireDefault(require("fs"));
var _multer = _interopRequireDefault(require("multer"));
var _cors = _interopRequireDefault(require("cors"));
var _stream = require("stream");
var _credentials = _interopRequireDefault(require("../credentials.json"));
var _googleAuthLibrary = require("google-auth-library");
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // Importação de módulos
_dotenv["default"].config();
// Configuração do servidor Express
var app = (0, _express["default"])();

// Configuração do middleware de análise de corpo da solicitação
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

// Porta do servidor
var PORT = process.env.PORT || 8000;

// Configuração de CORS
var corsOptions = {
  origin: '*',
  // A origem permitida (substitua pelo seu próprio domínio)
  methods: 'GET,POST,DELETE' // Métodos permitidos
};

app.use((0, _cors["default"])(corsOptions));

// Configuração do cliente OAuth2
var oauth2Client = new _googleAuthLibrary.OAuth2Client({
  clientId: _credentials["default"].web.client_id,
  clientSecret: _credentials["default"].web.client_secret,
  redirectUri: _credentials["default"].web.redirect_uris[0]
});

// Leitura das credenciais salvas, se existirem
try {
  var creds = _fs["default"].readFileSync("creds.json");
  oauth2Client.setCredentials(JSON.parse(creds));
} catch (err) {
  console.log("No creds found");
}

// Rota para iniciar o processo de autorização com o Google
app.get("/auth/google", function (req, res) {
  var url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/drive"]
  });
  res.redirect(url);
});

// Rota para tratar o redirecionamento após a autorização do Google
app.get("/google/redirect", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var code, _yield$oauth2Client$g, authTokens;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          code = req.query.code;
          _context.next = 4;
          return oauth2Client.getToken(code);
        case 4:
          _yield$oauth2Client$g = _context.sent;
          authTokens = _yield$oauth2Client$g.tokens;
          oauth2Client.setCredentials(authTokens);
          _fs["default"].writeFileSync("creds.json", JSON.stringify(authTokens));
          res.send("Sucesso");
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error("Erro ao obter tokens de acesso:", _context.t0);
          res.status(500).send("Erro ao obter tokens de acesso.");
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Função para atualizar o token de acesso usando o token de atualização
function refreshAccessToken() {
  return _refreshAccessToken.apply(this, arguments);
}
function _refreshAccessToken() {
  _refreshAccessToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var _JSON$parse, refresh_token, _yield$oauth2Client$r, authTokens;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _JSON$parse = JSON.parse(_fs["default"].readFileSync("creds.json")), refresh_token = _JSON$parse.refresh_token;
          _context8.next = 3;
          return oauth2Client.refreshToken(refresh_token);
        case 3:
          _yield$oauth2Client$r = _context8.sent;
          authTokens = _yield$oauth2Client$r.tokens;
          oauth2Client.setCredentials(authTokens);
          _fs["default"].writeFileSync("creds.json", JSON.stringify(authTokens));
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _refreshAccessToken.apply(this, arguments);
}
function makeRequest() {
  return _makeRequest.apply(this, arguments);
} // Função para criar uma pasta no Google Drive
function _makeRequest() {
  _makeRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 10;
          break;
        case 3:
          _context9.prev = 3;
          _context9.t0 = _context9["catch"](0);
          if (!(_context9.t0.message === 'invalid_grant')) {
            _context9.next = 10;
            break;
          }
          _context9.next = 8;
          return refreshAccessToken();
        case 8:
          _context9.next = 10;
          break;
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 3]]);
  }));
  return _makeRequest.apply(this, arguments);
}
function criarPastaNoDrive(_x3, _x4) {
  return _criarPastaNoDrive.apply(this, arguments);
} // Rota para criar a pasta no Google Drive
function _criarPastaNoDrive() {
  _criarPastaNoDrive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(pastaCliente, oauth2Client) {
    var drive, fileMetadata, response;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          drive = _googleapis.google.drive({
            version: 'v3',
            auth: oauth2Client
          });
          fileMetadata = {
            name: pastaCliente,
            mimeType: 'application/vnd.google-apps.folder'
          };
          _context10.prev = 2;
          _context10.next = 5;
          return drive.files.create({
            resource: fileMetadata,
            fields: 'id'
          });
        case 5:
          response = _context10.sent;
          return _context10.abrupt("return", response.data.id);
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](2);
          console.error('Erro ao criar a pasta no Google Drive:', _context10.t0.message);
          return _context10.abrupt("return", null);
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[2, 9]]);
  }));
  return _criarPastaNoDrive.apply(this, arguments);
}
app.post('/cadastrarPastaNoDrive', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var pastaCliente, pastaId;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          pastaCliente = req.body.pastaCliente;
          if (pastaCliente) {
            _context2.next = 5;
            break;
          }
          res.status(400).send('O nome da pasta não foi fornecido.');
          return _context2.abrupt("return");
        case 5:
          _context2.next = 7;
          return criarPastaNoDrive(pastaCliente, oauth2Client);
        case 7:
          pastaId = _context2.sent;
          if (pastaId) {
            res.send(pastaId);
          } else {
            res.status(500).send('Erro ao criar a pasta no Google Drive.');
          }
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error('Erro ao criar a pasta no Google Drive:', _context2.t0);
          res.status(500).send('Erro ao criar a pasta no Google Drive.');
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

// Função para criar uma subpasta no Google Drive
function criarSubPasta(_x7, _x8, _x9) {
  return _criarSubPasta.apply(this, arguments);
} // Rota para criar a subpasta no Google Drive
function _criarSubPasta() {
  _criarSubPasta = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(pastaCliente, subPasta, oauth2Client) {
    var drive, fileMetadata, response;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          drive = _googleapis.google.drive({
            version: 'v3',
            auth: oauth2Client
          });
          fileMetadata = {
            name: subPasta,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [pastaCliente] // Especifica a pasta pai
          };
          _context11.prev = 2;
          _context11.next = 5;
          return drive.files.create({
            resource: fileMetadata,
            fields: 'id'
          });
        case 5:
          response = _context11.sent;
          return _context11.abrupt("return", response.data.id);
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](2);
          console.error('Erro ao criar a subpasta no Google Drive:', _context11.t0.message);
          return _context11.abrupt("return", null);
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[2, 9]]);
  }));
  return _criarSubPasta.apply(this, arguments);
}
app.post('/subPasta/:pastaCliente', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var pastaCliente, subPasta, subPastaId;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          pastaCliente = req.body.pastaCliente;
          subPasta = req.params.subPasta;
          if (pastaCliente) {
            _context3.next = 6;
            break;
          }
          res.status(400).send('O nome da subpasta não foi fornecido.');
          return _context3.abrupt("return");
        case 6:
          _context3.next = 8;
          return criarSubPasta(pastaCliente, subPasta, oauth2Client);
        case 8:
          subPastaId = _context3.sent;
          if (subPastaId) {
            res.send(subPastaId);
          } else {
            res.status(500).send('Erro ao criar a subpasta no Google Drive.');
          }
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error('Erro ao criar a subpasta no Google Drive:', _context3.t0);
          res.status(500).send('Erro ao criar a subpasta no Google Drive.');
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function (_x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}());

// Função para formatar o tamanho do arquivo
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / 1048576).toFixed(2) + ' MB';
  }
}

// Configuração do armazenamento para o multer
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});

// Rota para upload de arquivos para uma pasta no Google Drive
app.post('/upload/:pastaCliente', upload.array('files', 5), /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var drive, folderName, responses, folderQuery, folders, folderId, _iterator, _step, file, fileMetadata, readableStream, media, response, fileId, fileName, fileSize, webViewLink;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          drive = _googleapis.google.drive({
            version: 'v3',
            auth: oauth2Client
          });
          folderName = req.params.pastaCliente;
          _context4.prev = 2;
          // Pesquisa a pasta pelo nome
          responses = [];
          folderQuery = "name='".concat(folderName, "' and mimeType='application/vnd.google-apps.folder'");
          _context4.next = 7;
          return drive.files.list({
            q: folderQuery,
            fields: 'files(id)'
          });
        case 7:
          folders = _context4.sent;
          if (!(folders.data.files.length > 0)) {
            _context4.next = 45;
            break;
          }
          folderId = folders.data.files[0].id; // Loop através dos arquivos enviados
          _iterator = _createForOfIteratorHelper(req.files);
          _context4.prev = 11;
          _iterator.s();
        case 13:
          if ((_step = _iterator.n()).done) {
            _context4.next = 34;
            break;
          }
          file = _step.value;
          fileMetadata = {
            name: file.originalname,
            parents: [folderId]
          }; // Cria um stream legível a partir do Buffer
          readableStream = new _stream.Readable();
          readableStream.push(file.buffer);
          readableStream.push(null);
          media = {
            mimeType: file.mimetype,
            body: readableStream
          };
          _context4.next = 22;
          return drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id,name,size,webViewLink'
          });
        case 22:
          response = _context4.sent;
          fileId = response.data.id;
          fileName = response.data.name;
          fileSize = response.data.size;
          webViewLink = response.data.webViewLink;
          responses.push({
            fileId: fileId,
            fileName: fileName,
            fileSize: fileSize,
            webViewLink: webViewLink
          });
          console.log("Arquivo ".concat(fileName));
          console.log("ID: ".concat(fileId));
          console.log("Tamanho:".concat(fileSize));
          console.log("Link:".concat(webViewLink));

          // Aqui, você pode armazenar informações sobre os arquivos no banco de dados ou responder de acordo.
        case 32:
          _context4.next = 13;
          break;
        case 34:
          _context4.next = 39;
          break;
        case 36:
          _context4.prev = 36;
          _context4.t0 = _context4["catch"](11);
          _iterator.e(_context4.t0);
        case 39:
          _context4.prev = 39;
          _iterator.f();
          return _context4.finish(39);
        case 42:
          res.json({
            message: 'Arquivos carregados com sucesso',
            success: true,
            responses: responses
          });
          _context4.next = 47;
          break;
        case 45:
          console.error('Pasta não encontrada.');
          res.status(500).send('Pasta não encontrada.');
        case 47:
          _context4.next = 53;
          break;
        case 49:
          _context4.prev = 49;
          _context4.t1 = _context4["catch"](2);
          console.error('Erro ao carregar os arquivos:', _context4.t1);
          res.status(500).send('Erro ao carregar os arquivos.');
        case 53:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 49], [11, 36, 39, 42]]);
  }));
  return function (_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}());

// Função para listar arquivos dentro de uma pasta no Google Drive
function listarArquivos(_x14, _x15) {
  return _listarArquivos.apply(this, arguments);
} // Função para obter o ID de uma pasta por nome
function _listarArquivos() {
  _listarArquivos = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(pastaId, oauth2Client) {
    var drive, response, arquivos;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          drive = _googleapis.google.drive({
            version: 'v3',
            auth: oauth2Client
          });
          _context12.prev = 1;
          _context12.next = 4;
          return drive.files.list({
            q: "'".concat(pastaId, "' in parents"),
            fields: 'files(id, name, webViewLink, size)'
          });
        case 4:
          response = _context12.sent;
          arquivos = response.data.files;
          console.log('Arquivos na pasta:');
          arquivos.forEach(function (arquivo) {
            console.log('ID:', arquivo.id);
            console.log('Nome:', arquivo.name);
            console.log('Tamanho:', arquivo.size);
            console.log('Link:', arquivo.webViewLink);
            console.log('----------------------');
          });
          return _context12.abrupt("return", arquivos);
        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](1);
          console.error('Erro ao listar arquivos na pasta no Google Drive:', _context12.t0.message);
          return _context12.abrupt("return", []);
        case 15:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 11]]);
  }));
  return _listarArquivos.apply(this, arguments);
}
function pastaNome(_x16, _x17) {
  return _pastaNome.apply(this, arguments);
}
function _pastaNome() {
  _pastaNome = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(nomePasta, oauth2Client) {
    var drive, response;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          drive = _googleapis.google.drive({
            version: 'v3',
            auth: oauth2Client
          });
          _context13.prev = 1;
          _context13.next = 4;
          return drive.files.list({
            q: "name='".concat(nomePasta, "' and mimeType='application/vnd.google-apps.folder'"),
            fields: 'files(id)'
          });
        case 4:
          response = _context13.sent;
          if (!(response.data.files.length > 0)) {
            _context13.next = 9;
            break;
          }
          return _context13.abrupt("return", response.data.files[0].id);
        case 9:
          return _context13.abrupt("return", {
            id: null
          });
        case 10:
          _context13.next = 16;
          break;
        case 12:
          _context13.prev = 12;
          _context13.t0 = _context13["catch"](1);
          console.error('Erro ao obter o ID da pasta no Google Drive:', _context13.t0.message);
          // Corrigido para retornar um objeto com a propriedade id como null
          return _context13.abrupt("return", {
            id: null
          });
        case 16:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[1, 12]]);
  }));
  return _pastaNome.apply(this, arguments);
}
function handleFileListing(_x18, _x19) {
  return _handleFileListing.apply(this, arguments);
} // Rota para listar o conteúdo de uma pasta no Google Drive
function _handleFileListing() {
  _handleFileListing = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var pastaCliente, pastaId, arquivos;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          pastaCliente = req.params.pastaCliente;
          if (pastaCliente) {
            _context14.next = 4;
            break;
          }
          res.status(400).send('O nome da pasta não foi fornecido.');
          return _context14.abrupt("return");
        case 4:
          _context14.next = 6;
          return pastaNome(pastaCliente, oauth2Client);
        case 6:
          pastaId = _context14.sent;
          if (pastaId) {
            _context14.next = 10;
            break;
          }
          res.status(404).send('Pasta não encontrada no Google Drive.');
          return _context14.abrupt("return");
        case 10:
          _context14.next = 12;
          return listarArquivos(pastaId, oauth2Client);
        case 12:
          arquivos = _context14.sent;
          // Corrigido para enviar a resposta correta
          res.json(arquivos);
          console.log(arquivos);
        case 15:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _handleFileListing.apply(this, arguments);
}
app.get('/listarArquivos/:pastaCliente', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return handleFileListing(req, res);
        case 3:
          _context5.next = 16;
          break;
        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          if (!(_context5.t0.message === 'invalid_grant')) {
            _context5.next = 14;
            break;
          }
          _context5.next = 10;
          return refreshAccessToken();
        case 10:
          _context5.next = 12;
          return handleFileListing(req, res);
        case 12:
          _context5.next = 16;
          break;
        case 14:
          // Outro erro ocorreu, lidar com isso
          console.error('Erro ao listar o conteúdo da pasta no Google Drive:', _context5.t0);
          res.status(500).send('Erro ao listar o conteúdo da pasta no Google Drive.');
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 5]]);
  }));
  return function (_x20, _x21) {
    return _ref5.apply(this, arguments);
  };
}());

// Função para deletar arquivo ou pasta no Google Drive
function deletar(_x22, _x23) {
  return _deletar.apply(this, arguments);
} // Rota para excluir arquivo ou pasta no Google Drive
function _deletar() {
  _deletar = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(fileId, oauth2Client) {
    var drive;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          drive = _googleapis.google.drive({
            version: 'v3',
            auth: oauth2Client
          });
          _context15.prev = 1;
          _context15.next = 4;
          return drive.files["delete"]({
            fileId: fileId
          });
        case 4:
          console.log('Arquivo ou pasta excluído com sucesso');
          _context15.next = 10;
          break;
        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](1);
          console.error('Erro ao excluir arquivo ou pasta:', _context15.t0.message);
        case 10:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[1, 7]]);
  }));
  return _deletar.apply(this, arguments);
}
app["delete"]('/deletar/:fileId', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var fileId;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          fileId = req.params.fileId;
          console.log(fileId);
          if (fileId) {
            _context6.next = 6;
            break;
          }
          res.status(400).send('O ID do arquivo ou pasta não foi fornecido.');
          return _context6.abrupt("return");
        case 6:
          _context6.next = 8;
          return deletar(fileId, oauth2Client);
        case 8:
          console.log('Arquivo ou pasta excluído com sucesso');
          _context6.next = 15;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.error('Erro ao excluir arquivo ou pasta no Google Drive:', _context6.t0);
          res.status(500).send('Erro ao excluir arquivo ou pasta no Google Drive.');
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function (_x24, _x25) {
    return _ref6.apply(this, arguments);
  };
}());

// Rota para download de arquivo do Google Drive
app.get('/download/:fileId/:nomeDocumento', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var fileId, nomeDocumento, drive, file, extensao, tipoConteudo, tiposDeConteudoPorExtensao;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          fileId = req.params.fileId;
          nomeDocumento = req.params.nomeDocumento; // Cria uma instância da biblioteca googleapis para interagir com a API do Google Drive
          drive = _googleapis.google.drive({
            version: 'v3',
            auth: oauth2Client
          }); // Usa a função files.get para obter informações sobre o arquivo, incluindo o seu conteúdo
          _context7.next = 6;
          return drive.files.get({
            fileId: fileId,
            alt: 'media'
          }, {
            responseType: 'stream'
          });
        case 6:
          file = _context7.sent;
          // Determina o tipo de conteúdo com base na extensão do nome do arquivo
          extensao = nomeDocumento.split('.').pop();
          tipoConteudo = 'application/octet-stream'; // Mapeia extensões comuns para tipos de conteúdo
          tiposDeConteudoPorExtensao = {
            pdf: 'application/pdf',
            doc: 'application/msword',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            xls: 'application/vnd.ms-excel',
            xlsx: 'application/vnd.openxmlformats',
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif'
          };
          if (extensao in tiposDeConteudoPorExtensao) {
            tipoConteudo = tiposDeConteudoPorExtensao[extensao];
          }

          // Configurar o cabeçalho de resposta para o tipo de conteúdo do arquivo
          res.setHeader('Content-Type', tipoConteudo);

          // Configurar o cabeçalho de resposta para permitir o download do arquivo com o nome desejado
          res.setHeader('Content-Disposition', "attachment; filename=\"".concat(nomeDocumento, "\""));

          // Enviar o conteúdo do arquivo como resposta
          file.data.on('end', function () {
            console.log("Arquivo ".concat(nomeDocumento, " enviado com sucesso."));
          }).on('error', function (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(500).send('Erro ao enviar o arquivo.');
          }).pipe(res);
          _context7.next = 20;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](0);
          console.error('Erro ao fazer o download do arquivo:', _context7.t0);
          res.status(500).send('Erro ao fazer o download do arquivo.');
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 16]]);
  }));
  return function (_x26, _x27) {
    return _ref7.apply(this, arguments);
  };
}());
app.listen(PORT, function () {
  console.log("Server started on port 8000");
});