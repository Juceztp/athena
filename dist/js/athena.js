'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Dependencies
require('babel-core/register');
require('babel-polyfill');
var overwatch = require('owapi');
var winston = require('winston');

//Dependencies local
require('./util/capitalize');

//Config
var config = require('../../config.json');

var Athena = function () {
	function Athena(client) {
		var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		_classCallCheck(this, Athena);

		this.bot = client;
		this.msg = message;
		this.channel = this.bot.channels.get(config.global.mainchannelid);
	}

	_createClass(Athena, [{
		key: 'init',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:

								winston.log('info', 'With ' + this.bot.users.size + ' users...');
								_context.next = 3;
								return this.channel.send(config.global.initialmessage);

							case 3:
								winston.log('info', 'Update started successfully...');

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function init() {
				return _ref.apply(this, arguments);
			}

			return init;
		}()
	}, {
		key: 'run',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var _this = this;

				var usersId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userId, rankName;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								_context2.next = 3;
								return this.bot.users.filter(function (u) {
									return _this.msg.guild.members.get(u.id);
								}).map(function (u) {
									return u.id;
								});

							case 3:
								usersId = _context2.sent;
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context2.prev = 7;
								_iterator = usersId[Symbol.iterator]();

							case 9:
								if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
									_context2.next = 27;
									break;
								}

								userId = _step.value;
								_context2.prev = 11;
								_context2.next = 14;
								return this.checkUser(userId);

							case 14:
								rankName = _context2.sent;

								if (rankName) {
									_context2.next = 17;
									break;
								}

								return _context2.abrupt('continue', 24);

							case 17:
								_context2.next = 19;
								return this.checkRole(rankName.capitalize(), userId);

							case 19:
								_context2.next = 24;
								break;

							case 21:
								_context2.prev = 21;
								_context2.t0 = _context2['catch'](11);

								winston.log('error', _context2.t0);

							case 24:
								_iteratorNormalCompletion = true;
								_context2.next = 9;
								break;

							case 27:
								_context2.next = 33;
								break;

							case 29:
								_context2.prev = 29;
								_context2.t1 = _context2['catch'](7);
								_didIteratorError = true;
								_iteratorError = _context2.t1;

							case 33:
								_context2.prev = 33;
								_context2.prev = 34;

								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}

							case 36:
								_context2.prev = 36;

								if (!_didIteratorError) {
									_context2.next = 39;
									break;
								}

								throw _iteratorError;

							case 39:
								return _context2.finish(36);

							case 40:
								return _context2.finish(33);

							case 41:

								winston.log('info', 'Successfully completed update...');
								return _context2.abrupt('return');

							case 45:
								_context2.prev = 45;
								_context2.t2 = _context2['catch'](0);

								winston.log('error', _context2.t2);

							case 48:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[0, 45], [7, 29, 33, 41], [11, 21], [34,, 36, 40]]);
			}));

			function run() {
				return _ref2.apply(this, arguments);
			}

			return run;
		}()
	}, {
		key: 'checkUser',
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId) {
				var nickname, battletag, data;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								nickname = this.msg.guild.members.get(userId).nickname;

								if (nickname) {
									_context3.next = 3;
									break;
								}

								return _context3.abrupt('return');

							case 3:
								battletag = nickname.split('-')[0].trim();

								if (!(!battletag || battletag.search('#') === -1)) {
									_context3.next = 6;
									break;
								}

								return _context3.abrupt('return');

							case 6:
								_context3.next = 8;
								return overwatch.getGeneralStats(battletag.replace('#', '-'), config.global.region);

							case 8:
								data = _context3.sent;

								if (!(nickname === battletag + ' - ' + data.rank)) {
									_context3.next = 11;
									break;
								}

								return _context3.abrupt('return');

							case 11:
								_context3.next = 13;
								return this.msg.guild.members.get(userId).setNickname(battletag + ' - ' + data.rank);

							case 13:

								winston.log('info', 'New nickname for ' + nickname + ' to ' + battletag + ' - ' + data.rank + '...');

								return _context3.abrupt('return', data.rank_name);

							case 15:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function checkUser(_x2) {
				return _ref3.apply(this, arguments);
			}

			return checkUser;
		}()
	}, {
		key: 'checkRole',
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(rankName, userId) {
				var role;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.msg.guild.roles.find(function (r) {
									return r.name === rankName;
								});

							case 2:
								role = _context4.sent;

								if (role) {
									_context4.next = 5;
									break;
								}

								return _context4.abrupt('return');

							case 5:
								_context4.next = 7;
								return this.msg.guild.members.get(userId).addRole(role);

							case 7:
								_context4.next = 9;
								return this.msg.guild.members.get(userId).removeRoles(Object.values(config.global.ranks).filter(function (r) {
									return r != role.id && r != 0;
								}));

							case 9:

								winston.log('info', 'Role added ' + rankName + ' to ' + userId + '...');

							case 10:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function checkRole(_x3, _x4) {
				return _ref4.apply(this, arguments);
			}

			return checkRole;
		}()
	}, {
		key: 'getRolesFromServer',
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
				var _this2 = this;

				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.next = 2;
								return this.msg.guild.roles.map(function () {
									var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(r) {
										return regeneratorRuntime.wrap(function _callee5$(_context5) {
											while (1) {
												switch (_context5.prev = _context5.next) {
													case 0:
														_context5.next = 2;
														return _this2.channel.send(r.name + ': ' + r.id);

													case 2:
													case 'end':
														return _context5.stop();
												}
											}
										}, _callee5, _this2);
									}));

									return function (_x5) {
										return _ref6.apply(this, arguments);
									};
								}());

							case 2:
								winston.log('info', 'finish');

							case 3:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function getRolesFromServer() {
				return _ref5.apply(this, arguments);
			}

			return getRolesFromServer;
		}()
	}]);

	return Athena;
}();

exports.default = Athena;