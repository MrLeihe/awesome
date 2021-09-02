"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

var promise = Promise.resolve();

var Person = /*#__PURE__*/function () {
  function Person() {
    (0, _classCallCheck2.default)(this, Person);
  }

  (0, _createClass2.default)(Person, [{
    key: "say",
    value: function say() {
      console.log('say hello');
    }
  }]);
  return Person;
}();