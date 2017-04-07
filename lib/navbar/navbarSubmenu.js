"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavbarSubmenu = function (_React$Component) {
    _inherits(NavbarSubmenu, _React$Component);

    function NavbarSubmenu(props) {
        _classCallCheck(this, NavbarSubmenu);

        var _this = _possibleConstructorReturn(this, (NavbarSubmenu.__proto__ || Object.getPrototypeOf(NavbarSubmenu)).call(this, props));

        _this.onMouseEnter = function () {
            return _this.setState({ hover: true });
        };

        _this.onMouseLeave = function () {
            return _this.setState({ hover: false });
        };

        _this.state = {
            hover: false
        };
        return _this;
    }

    _createClass(NavbarSubmenu, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                href = _props.href,
                children = _props.children,
                text = _props.text,
                rest = _objectWithoutProperties(_props, ["href", "children", "text"]);

            var hover = this.state.hover;

            return href ? _react2.default.createElement(
                _reactRouterDom.NavLink,
                _extends({}, rest, {
                    to: href,
                    exact: true,
                    className: "navbar-submenu-item",
                    activeClassName: "active",
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave
                }),
                text ? _react2.default.createElement(
                    "span",
                    null,
                    text
                ) : null,
                children
            ) : _react2.default.createElement(
                "div",
                _extends({}, rest, {
                    className: "navbar-submenu-item",
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave
                }),
                text ? _react2.default.createElement(
                    "span",
                    null,
                    text
                ) : null,
                children
            );
        }
    }]);

    return NavbarSubmenu;
}(_react2.default.Component);

exports.default = NavbarSubmenu;