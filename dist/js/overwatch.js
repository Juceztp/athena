'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Dependencies
require('babel-core/register');
require('babel-polyfill');
var owapi = require('owapi');

var Overwatch = function () {
	function Overwatch() {
		_classCallCheck(this, Overwatch);
	}

	_createClass(Overwatch, [{
		key: 'getGeneralStats',
		value: function getGeneralStats(btag, region) {
			return owapi.getAllStats(btag, region);
		}
	}]);

	return Overwatch;
}();

exports.default = Overwatch;