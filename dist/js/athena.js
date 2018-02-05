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
		key: 'run',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _this = this;

				var usersId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userId, rankName;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;

								this.sendMessage(config.global.initialmessage);
								//Get Users on server
								_context.next = 4;
								return this.bot.users.filter(function (u) {
									return _this.msg.guild.members.get(u.id);
								}).map(function (u) {
									return u.id;
								});

							case 4:
								usersId = _context.sent;
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context.prev = 8;
								_iterator = usersId[Symbol.iterator]();

							case 10:
								if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
									_context.next = 28;
									break;
								}

								userId = _step.value;
								_context.prev = 12;
								_context.next = 15;
								return this.checkUser(userId);

							case 15:
								rankName = _context.sent;

								if (rankName) {
									_context.next = 18;
									break;
								}

								return _context.abrupt('continue', 25);

							case 18:
								_context.next = 20;
								return this.checkRole(rankName.capitalize(), userId);

							case 20:
								_context.next = 25;
								break;

							case 22:
								_context.prev = 22;
								_context.t0 = _context['catch'](12);

								winston.log('error', _context.t0);

							case 25:
								_iteratorNormalCompletion = true;
								_context.next = 10;
								break;

							case 28:
								_context.next = 34;
								break;

							case 30:
								_context.prev = 30;
								_context.t1 = _context['catch'](8);
								_didIteratorError = true;
								_iteratorError = _context.t1;

							case 34:
								_context.prev = 34;
								_context.prev = 35;

								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}

							case 37:
								_context.prev = 37;

								if (!_didIteratorError) {
									_context.next = 40;
									break;
								}

								throw _iteratorError;

							case 40:
								return _context.finish(37);

							case 41:
								return _context.finish(34);

							case 42:

								this.sendMessage(config.global.finalmessage);
								winston.log('info', 'Successfully completed update...');
								return _context.abrupt('return');

							case 47:
								_context.prev = 47;
								_context.t2 = _context['catch'](0);

								winston.log('error', _context.t2);

							case 50:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 47], [8, 30, 34, 42], [12, 22], [35,, 37, 41]]);
			}));

			function run() {
				return _ref.apply(this, arguments);
			}

			return run;
		}()
	}, {
		key: 'sendMessage',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.channel.send(message);

							case 2:
								winston.log('info', 'Sent message: ' + this.message + '...');

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function sendMessage(_x2) {
				return _ref2.apply(this, arguments);
			}

			return sendMessage;
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

			function checkUser(_x3) {
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

			function checkRole(_x4, _x5) {
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

									return function (_x6) {
										return _ref6.apply(this, arguments);
									};
								}());

							case 2:
								this.sendMessage('Ready!');
								winston.log('info', 'Sent roles...');

							case 4:
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