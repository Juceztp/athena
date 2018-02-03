"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Dependencies
require("babel-core/register");
require("babel-polyfill");
var owapi = require('owapi');

var Athena = function () {
        function Athena() {
                _classCallCheck(this, Athena);
        }

        _createClass(Athena, [{
                key: "run",
                value: function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                var result;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                                switch (_context.prev = _context.next) {
                                                        case 0:
                                                                _context.next = 2;
                                                                return owapi.getAllStats('Trev-11289', 'us');

                                                        case 2:
                                                                result = _context.sent;

                                                                console.log(result);

                                                        case 4:
                                                        case "end":
                                                                return _context.stop();
                                                }
                                        }
                                }, _callee, this);
                        }));

                        function run() {
                                return _ref.apply(this, arguments);
                        }

                        return run;
                }()
        }]);

        return Athena;
}();

exports.default = Athena;