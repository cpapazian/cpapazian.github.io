(self.AMP=self.AMP||[]).push({n:"amp-bind",v:"1516482726434",f:(function(AMP){(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Data representation of an <amp-bind-macro> that can cross the web worker
 * boundary (structured cloneable).
 * @typedef {{
 *   id: string,
 *   argumentNames: Array<string>,
 *   expressionString: string
 * }}
 */
var AmpBindMacroDef = exports.AmpBindMacroDef = void 0;

/**
 * The <amp-bind-macro> element is used to define an expression macro that can
 * be called from other amp-bind expressions within the document.
 */

var AmpBindMacro = exports.AmpBindMacro = function (_AMP$BaseElement) {
  _inherits(AmpBindMacro, _AMP$BaseElement);

  function AmpBindMacro() {
    _classCallCheck(this, AmpBindMacro);

    return _possibleConstructorReturn(this, _AMP$BaseElement.apply(this, arguments));
  }

  /** @override */
  AmpBindMacro.prototype.getPriority = function getPriority() {
    // Loads after other content.
    return 1;
  };

  /** @override */


  AmpBindMacro.prototype.isAlwaysFixed = function isAlwaysFixed() {
    return true;
  };

  /** @override */


  AmpBindMacro.prototype.isLayoutSupported = function isLayoutSupported(unusedLayout) {
    return true;
  };

  /** @override */


  AmpBindMacro.prototype.renderOutsideViewport = function renderOutsideViewport() {
    // We want the macro to be available wherever it is in the document.
    return true;
  };

  /**
   * @return {string} Returns a string to identify this tag. May not be unique
   *     if the element name is not unique.
   * @private
   */


  AmpBindMacro.prototype.getName_ = function getName_() {
    return '<amp-bind-macro> ' + (this.element.getAttribute('id') || '<unknown id>');
  };

  return AmpBindMacro;
}(AMP.BaseElement);

},{}],2:[function(require,module,exports){
var _ampBindMacro = require('./amp-bind-macro');

var _ampState = require('./amp-state');

var _bindImpl = require('./bind-impl');

/** @const {string} */
var TAG = 'amp-bind'; /**
                       * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                       *
                       * Licensed under the Apache License, Version 2.0 (the "License");
                       * you may not use this file except in compliance with the License.
                       * You may obtain a copy of the License at
                       *
                       *      http://www.apache.org/licenses/LICENSE-2.0
                       *
                       * Unless required by applicable law or agreed to in writing, software
                       * distributed under the License is distributed on an "AS-IS" BASIS,
                       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                       * See the License for the specific language governing permissions and
                       * limitations under the License.
                       */

AMP.extension(TAG, '0.1', function (AMP) {
  AMP.registerServiceForDoc('bind', _bindImpl.Bind);
  AMP.registerElement('amp-state', _ampState.AmpState);
  AMP.registerElement('amp-bind-macro', _ampBindMacro.AmpBindMacro);
});

},{"./amp-bind-macro":1,"./amp-state":3,"./bind-impl":9}],3:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmpState = undefined;

var _services = require('../../../src/services');

var _object = require('../../../src/utils/object');

var _batchedJson = require('../../../src/batched-json');

var _dom = require('../../../src/dom');

var _style = require('../../../src/style');

var _json = require('../../../src/json');

var _log = require('../../../src/log');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AmpState = exports.AmpState = function (_AMP$BaseElement) {
  _inherits(AmpState, _AMP$BaseElement);

  function AmpState() {
    _classCallCheck(this, AmpState);

    return _possibleConstructorReturn(this, _AMP$BaseElement.apply(this, arguments));
  }

  /** @override */
  AmpState.prototype.getPriority = function getPriority() {
    // Loads after other content.
    return 1;
  };

  /** @override */


  AmpState.prototype.isAlwaysFixed = function isAlwaysFixed() {
    return true;
  };

  /** @override */


  AmpState.prototype.isLayoutSupported = function isLayoutSupported(unusedLayout) {
    return true;
  };

  /** @override */


  AmpState.prototype.activate = function activate(unusedInvocation) {
    // TODO(choumx): Remove this after a few weeks in production.
    var TAG = this.getName_();
    this.user().error(TAG, 'Please use AMP.setState() action explicitly, e.g. ' + 'on="submit-success:AMP.setState({myAmpState: event.response})"');
  };

  /** @override */


  AmpState.prototype.buildCallback = function buildCallback() {
    var _this2 = this;

    (0, _style.toggle)(this.element, /* opt_display */false);
    this.element.setAttribute('aria-hidden', 'true');

    // Don't parse or fetch in prerender mode.
    var viewer = _services.Services.viewerForDoc(this.getAmpDoc());
    viewer.whenFirstVisible().then(function () {
      return _this2.initialize_();
    });
  };

  /** @override */


  AmpState.prototype.mutatedAttributesCallback = function mutatedAttributesCallback(mutations) {
    var viewer = _services.Services.viewerForDoc(this.getAmpDoc());
    if (!viewer.isVisible()) {
      var TAG = this.getName_();
      (0, _log.dev)().error(TAG, 'Viewer must be visible before mutation.');
      return;
    }
    var src = mutations['src'];
    if (src !== undefined) {
      this.fetchSrcAndUpdateState_( /* isInit */false);
    }
  };

  /** @override */


  AmpState.prototype.renderOutsideViewport = function renderOutsideViewport() {
    // We want the state data to be available wherever it is in the document.
    return true;
  };

  /** @private */


  AmpState.prototype.initialize_ = function initialize_() {
    // Parse child script tag and/or fetch JSON from endpoint at `src`
    // attribute, with the latter taking priority.
    var children = this.element.children;
    if (children.length > 0) {
      this.parseChildAndUpdateState_();
    }
    if (this.element.hasAttribute('src')) {
      this.fetchSrcAndUpdateState_( /* isInit */true);
    }
  };

  /**
   * Parses JSON in child script element and updates state.
   * @private
   */


  AmpState.prototype.parseChildAndUpdateState_ = function parseChildAndUpdateState_() {
    var _this3 = this;

    var TAG = this.getName_();
    var children = this.element.children;
    if (children.length != 1) {
      this.user().error(TAG, 'Should contain exactly one <script> child.');
      return;
    }
    var firstChild = children[0];
    if (!(0, _dom.isJsonScriptTag)(firstChild)) {
      this.user().error(TAG, 'State should be in a <script> tag with type="application/json".');
      return;
    }
    var json = (0, _json.tryParseJson)(firstChild.textContent, function (e) {
      _this3.user().error(TAG, 'Failed to parse state. Is it valid JSON?', e);
    });
    this.updateState_(json, /* isInit */true);
  };

  /**
   * Wrapper to stub during testing.
   * @param {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc
   * @param {!Element} element
   * @return {!Promise}
   * @visibleForTesting
   */


  AmpState.prototype.fetchBatchedJsonFor_ = function fetchBatchedJsonFor_(ampdoc, element) {
    return (0, _batchedJson.fetchBatchedJsonFor)(ampdoc, element);
  };

  /**
   * @param {boolean} isInit
   * @returm {!Promise}
   * @private
   */


  AmpState.prototype.fetchSrcAndUpdateState_ = function fetchSrcAndUpdateState_(isInit) {
    var _this4 = this;

    var ampdoc = this.getAmpDoc();
    return this.fetchBatchedJsonFor_(ampdoc, this.element).then(function (json) {
      _this4.updateState_(json, isInit);
    });
  };

  /**
   * @param {*} json
   * @param {boolean} isInit
   * @private
   */


  AmpState.prototype.updateState_ = function updateState_(json, isInit) {
    if (json === undefined || json === null) {
      return;
    }
    var id = (0, _log.user)().assert(this.element.id, '<amp-state> must have an id.');
    var state = /** @type {!JsonObject} */(0, _object.map)();
    state[id] = json;
    _services.Services.bindForDocOrNull(this.element).then(function (bind) {
      (0, _log.dev)().assert(bind, 'Bind service can not be found.');
      bind.setState(state,
      /* opt_skipEval */isInit, /* opt_isAmpStateMutation */!isInit);
    });
  };

  /**
   * @return {string} Returns a string to identify this tag. May not be unique
   *     if the element id is not unique.
   * @private
   */


  AmpState.prototype.getName_ = function getName_() {
    return '<amp-state> ' + (this.element.getAttribute('id') || '<unknown id>');
  };

  return AmpState;
}(AMP.BaseElement);

},{"../../../src/batched-json":16,"../../../src/dom":20,"../../../src/json":27,"../../../src/log":28,"../../../src/services":43,"../../../src/style":47,"../../../src/utils/object":54}],4:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindEvaluator = exports.BindingDef = undefined;

var _bindMacro = require('./bind-macro');

var _bindExpression = require('./bind-expression');

var _bindValidator = require('./bind-validator');

var _array = require('../../../src/utils/array');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

/**
 * @typedef {{
 *   tagName: string,
 *   property: string,
 *   expressionString: string,
 * }}
 */
var BindingDef = exports.BindingDef = void 0;

/**
 * Error-like object that can be passed through web worker boundary.
 * @typedef {{
 *   message: string,
 *   stack: string,
 * }}
 */
var EvaluatorErrorDef = void 0;

/**
 * Asynchronously evaluates a set of Bind expressions.
 */

var BindEvaluator = exports.BindEvaluator = function () {
  function BindEvaluator() {
    _classCallCheck(this, BindEvaluator);

    /** @const @private {!Array<BindingDef>} */
    this.bindings_ = [];

    /**
     * Maps `id` to parsed BindMacro objects for all <amp-bind-macro> on page.
     * @private @const {!Object<string, !./bind-macro.BindMacro>}
     */
    this.macros_ = Object.create(null);

    /** @const @private {!./bind-validator.BindValidator} */
    this.validator_ = new _bindValidator.BindValidator();

    /** @const @private {!Object<string, !BindExpression>} */
    this.expressions_ = Object.create(null);
  }

  /**
   * Parses and stores given bindings into expression objects and returns map
   * of expression string to parse errors.
   * @param {!Array<BindingDef>} bindings
   * @return {!Object<string, EvaluatorErrorDef>},
   */


  BindEvaluator.prototype.addBindings = function addBindings(bindings) {
    var _this = this;

    var errors = Object.create(null);
    // Create BindExpression objects from expression strings.
    bindings.forEach(function (binding) {
      var parsed = _this.parse_(binding.expressionString);
      if (parsed.error) {
        errors[binding.expressionString] = parsed.error;
      } else {
        _this.bindings_.push(binding);
      }
    });
    return errors;
  };

  /**
   * Removes all parsed bindings for the provided expressions.
   * @param {!Array<string>} expressionStrings
   */


  BindEvaluator.prototype.removeBindingsWithExpressionStrings = function removeBindingsWithExpressionStrings(expressionStrings) {
    var _this2 = this;

    var expressionsToRemove = Object.create(null);

    expressionStrings.forEach(function (expressionString) {
      delete _this2.expressions_[expressionString];
      expressionsToRemove[expressionString] = true;
    });

    (0, _array.filterSplice)(this.bindings_, function (binding) {
      return !expressionsToRemove[binding.expressionString];
    });
  };

  /**
   * Parses and stores the given macros and returns map of macro `id` to
   * parse errors.
   * @param {!Array<./amp-bind-macro.AmpBindMacroDef>} macros
   * @return {!Object<string, EvaluatorErrorDef>}
   */


  BindEvaluator.prototype.addMacros = function addMacros(macros) {
    var _this3 = this;

    var errors = Object.create(null);
    // Create BindMacro objects from AmpBindMacroDef.
    macros.forEach(function (macro) {
      // Only allow a macro to reference macros defined before it to prevent
      // cycles and recursion.
      // TODO(willchou): Would be better if cycle/recursion errors are thrown
      // at creation instead of evaluation.
      var referableMacros = Object.assign(Object.create(null), _this3.macros_);
      try {
        _this3.macros_[macro.id] = new _bindMacro.BindMacro(macro, referableMacros);
      } catch (e) {
        errors[macro.id] = { message: e.message, stack: e.stack };
      }
    });
    return errors;
  };

  /**
   * Evaluates all expressions with the given `scope` data returns two maps:
   * expression strings to results and expression strings to errors.
   * @param {!Object} scope
   * @return {{
   *   results: !Object<string, ./bind-expression.BindExpressionResultDef>,
   *   errors: !Object<string, !EvaluatorErrorDef>,
   * }}
   */


  BindEvaluator.prototype.evaluateBindings = function evaluateBindings(scope) {
    var _this4 = this;

    /** @type {!Object<string, ./bind-expression.BindExpressionResultDef>} */
    var cache = Object.create(null);
    /** @type {!Object<string, !EvaluatorErrorDef>} */
    var errors = Object.create(null);

    // First, evaluate all of the expression strings in the bindings.
    this.bindings_.forEach(function (binding) {
      var expressionString = binding.expressionString;
      // Skip if we've already evaluated this expression string.
      if (cache[expressionString] !== undefined || errors[expressionString]) {
        return;
      }
      var expression = _this4.expressions_[expressionString];
      if (!expression) {
        var _error = new Error('Expression "' + expressionString + '"" is not cached.');
        errors[expressionString] = { message: _error.message, stack: _error.stack };
        return;
      }

      var _evaluate_ = _this4.evaluate_(expression, scope),
          result = _evaluate_.result,
          error = _evaluate_.error;

      if (error) {
        errors[expressionString] = error;
        return;
      }
      cache[expressionString] = result;
    });

    // Then, validate each binding and delete invalid expression results.
    this.bindings_.forEach(function (binding) {
      var tagName = binding.tagName,
          property = binding.property,
          expressionString = binding.expressionString;

      var result = cache[expressionString];
      if (result === undefined) {
        return;
      }
      // IMPORTANT: We need to validate expression results on each binding
      // since validity depends on the `tagName` and `property` rather than
      // just the `result`.
      var resultString = _this4.stringValueOf_(property, result);
      if (!_this4.validator_.isResultValid(tagName, property, resultString)) {
        // TODO(choumx): If this expression string is used in another
        // tagName/property which is valid, we ought to allow it.
        delete cache[expressionString];
        var error = new Error('"' + result + '" is not a valid result for [' + property + '].');
        errors[expressionString] = { message: error.message, stack: error.stack };
      }
    });

    return { results: cache, errors: errors };
  };

  /**
   * Evaluates and returns a single expression string.
   * @param {string} expressionString
   * @param {!Object} scope
   * @return {{
   *   result: ./bind-expression.BindExpressionResultDef,
   *   error: ?EvaluatorErrorDef,
   * }}
   */


  BindEvaluator.prototype.evaluateExpression = function evaluateExpression(expressionString, scope) {
    var parsed = this.parse_(expressionString);
    if (!parsed.expression) {
      return { result: null, error: parsed.error };
    }
    var evaluated = this.evaluate_(parsed.expression, scope);
    if (!evaluated.result) {
      return { result: null, error: evaluated.error };
    }
    return { result: evaluated.result, error: null };
  };

  /**
   * Parses a single expression string, caches and returns it.
   * @param {string} expressionString
   * @return {{
   *   expression: BindExpression,
   *   error: ?EvaluatorErrorDef,
   * }}
   * @private
   */


  BindEvaluator.prototype.parse_ = function parse_(expressionString) {
    var expression = this.expressions_[expressionString];
    var error = null;
    if (!expression) {
      try {
        expression = new _bindExpression.BindExpression(expressionString, this.macros_);
        this.expressions_[expressionString] = expression;
      } catch (e) {
        error = { message: e.message, stack: e.stack };
      }
    }
    return { expression: expression, error: error };
  };

  /**
   * Evaluate a single expression with the given scope.
   * @param {!BindExpression} expression
   * @param {!Object} scope
   * @return {{
   *   result: ./bind-expression.BindExpressionResultDef,
   *   error: ?EvaluatorErrorDef,
   * }}
   * @private
   */


  BindEvaluator.prototype.evaluate_ = function evaluate_(expression, scope) {
    var result = null;
    var error = null;
    try {
      result = expression.evaluate(scope);
    } catch (e) {
      error = { message: e.message, stack: e.stack };
    }
    return { result: result, error: error };
  };

  /**
   * Return parsed bindings for testing.
   * @visibleForTesting {!Array<BindingDef>}
   */


  BindEvaluator.prototype.bindingsForTesting = function bindingsForTesting() {
    return this.bindings_;
  };

  /**
   * Returns the expression cache for testing.
   * @return {!Object<string, !BindExpression>}
   * @visibleForTesting
   */


  BindEvaluator.prototype.expressionsForTesting = function expressionsForTesting() {
    return this.expressions_;
  };

  /**
   * Returns the expression result string for a binding to `property`.
   * @param {./bind-expression.BindExpressionResultDef} result
   * @return {?string}
   * @private
   */


  BindEvaluator.prototype.stringValueOf_ = function stringValueOf_(property, result) {
    if (result === null) {
      return null;
    }
    switch (property) {
      case 'text':
        break;
      case 'class':
        if (Array.isArray(result)) {
          return result.join(' ');
        }
        break;
      default:
        if (typeof result === 'boolean') {
          return result ? '' : null;
        }
        break;
    }
    return String(result);
  };

  return BindEvaluator;
}();

},{"../../../src/utils/array":52,"./bind-expression":8,"./bind-macro":10,"./bind-validator":11}],5:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
* Enum used to specify Events for the Amp Bind extension
*
* @enum {string}
*/
var BindEvents = exports.BindEvents = {
  INITIALIZE: 'amp:bind:initialize',
  RESCAN_TEMPLATE: 'amp:bind:rescan-template',
  SET_STATE: 'amp:bind:setState'
};

},{}],6:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A single node in the AST of a `BindExpression`.
 * @struct
 */
var AstNode =
/**
 * @param {AstNodeType} type
 * @param {?Array<AstNode>} args
 * @param {(AstNodeValue|undefined)=} opt_value
 */
exports.AstNode = function AstNode(type, args, opt_value) {
  _classCallCheck(this, AstNode);

  /** @const {AstNodeType} */
  this.type = type;

  /** @const {?Array<AstNode>} */
  this.args = args;

  /** @const {(AstNodeValue|undefined)} */
  this.value = opt_value;
};

/**
 * Type of a node in the AST of a `BindExpression`.
 * @enum {number}
 */


var AstNodeType = exports.AstNodeType = {
  // Grammar rules.
  EXPRESSION: 0,
  INVOCATION: 1,
  ARGS: 2,
  MEMBER_ACCESS: 3,
  MEMBER: 4,
  VARIABLE: 5,
  LITERAL: 6,
  ARRAY_LITERAL: 7,
  ARRAY: 8,
  OBJECT_LITERAL: 9,
  OBJECT: 10,
  KEY_VALUE: 11,
  // Instead of using having an OPERATION type with subtypes, flatten and use
  // the operation types directly.
  NOT: 12,
  UNARY_MINUS: 13,
  UNARY_PLUS: 14,
  PLUS: 15,
  MINUS: 16,
  MULTIPLY: 17,
  DIVIDE: 18,
  MODULO: 19,
  LOGICAL_AND: 20,
  LOGICAL_OR: 21,
  LESS_OR_EQUAL: 22,
  LESS: 23,
  GREATER_OR_EQUAL: 24,
  GREATER: 25,
  NOT_EQUAL: 26,
  EQUAL: 27,
  TERNARY: 28,
  ARROW_FUNCTION: 29
};

/**
 * Value of a primitive or variable node.
 * @typedef {(boolean|string|number|null)}
 */
var AstNodeValue = exports.AstNodeValue = void 0;

},{}],7:[function(require,module,exports){
var _bindExprDefines = require("./bind-expr-defines");

/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [1, 7],
        $V1 = [1, 10],
        $V2 = [1, 11],
        $V3 = [1, 12],
        $V4 = [1, 13],
        $V5 = [1, 23],
        $V6 = [1, 17],
        $V7 = [1, 18],
        $V8 = [1, 19],
        $V9 = [1, 20],
        $Va = [1, 21],
        $Vb = [1, 22],
        $Vc = [1, 26],
        $Vd = [1, 25],
        $Ve = [1, 27],
        $Vf = [1, 28],
        $Vg = [1, 29],
        $Vh = [1, 30],
        $Vi = [1, 31],
        $Vj = [1, 32],
        $Vk = [1, 33],
        $Vl = [1, 34],
        $Vm = [1, 35],
        $Vn = [1, 36],
        $Vo = [1, 37],
        $Vp = [1, 38],
        $Vq = [1, 39],
        $Vr = [1, 41],
        $Vs = [5, 10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 31, 35, 38, 39, 49],
        $Vt = [2, 39],
        $Vu = [1, 47],
        $Vv = [1, 52],
        $Vw = [1, 54],
        $Vx = [5, 10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 35, 39, 49],
        $Vy = [1, 75],
        $Vz = [35, 49],
        $VA = [10, 35, 39],
        $VB = [5, 10, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 35, 39, 49],
        $VC = [5, 10, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 35, 39, 49],
        $VD = [5, 10, 19, 20, 25, 26, 27, 28, 35, 39, 49],
        $VE = [10, 35];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "result": 3, "expr": 4, "EOF": 5, "operation": 6, "invocation": 7, "member_access": 8, "(": 9, ")": 10, "variable": 11, "literal": 12, "!": 13, "-": 14, "+": 15, "*": 16, "/": 17, "%": 18, "&&": 19, "||": 20, "<=": 21, "<": 22, ">=": 23, ">": 24, "!=": 25, "==": 26, "?": 27, ":": 28, "NAME": 29, "args": 30, ".": 31, "arrow_function": 32, "=>": 33, "params": 34, ",": 35, "array": 36, "member": 37, "[": 38, "]": 39, "primitive": 40, "object_literal": 41, "array_literal": 42, "STRING": 43, "NUMBER": 44, "TRUE": 45, "FALSE": 46, "NULL": 47, "{": 48, "}": 49, "object": 50, "key_value": 51, "key": 52, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 9: "(", 10: ")", 13: "!", 14: "-", 15: "+", 16: "*", 17: "/", 18: "%", 19: "&&", 20: "||", 21: "<=", 22: "<", 23: ">=", 24: ">", 25: "!=", 26: "==", 27: "?", 28: ":", 29: "NAME", 31: ".", 33: "=>", 35: ",", 38: "[", 39: "]", 43: "STRING", 44: "NUMBER", 45: "TRUE", 46: "FALSE", 47: "NULL", 48: "{", 49: "}" },
        productions_: [0, [3, 2], [3, 1], [4, 1], [4, 1], [4, 1], [4, 3], [4, 1], [4, 1], [6, 2], [6, 2], [6, 2], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 3], [6, 5], [7, 2], [7, 4], [7, 6], [32, 4], [32, 3], [32, 5], [34, 3], [34, 3], [30, 2], [30, 3], [8, 2], [37, 2], [37, 3], [11, 1], [12, 1], [12, 1], [12, 1], [40, 1], [40, 1], [40, 1], [40, 1], [40, 1], [42, 2], [42, 3], [42, 4], [36, 1], [36, 3], [41, 2], [41, 3], [41, 4], [50, 1], [50, 3], [51, 3], [52, 1], [52, 1], [52, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                    return '';
                    break;
                case 3:case 4:case 5:case 7:case 8:
                    this.$ = $$[$0];
                    break;
                case 6:
                    this.$ = $$[$0 - 1];
                    break;
                case 9:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.NOT, [$$[$0]]);

                    break;
                case 10:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.UNARY_MINUS, [$$[$0]]);

                    break;
                case 11:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.UNARY_PLUS, [$$[$0]]);

                    break;
                case 12:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.PLUS, [$$[$0 - 2], $$[$0]]);

                    break;
                case 13:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.MINUS, [$$[$0 - 2], $$[$0]]);

                    break;
                case 14:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.MULTIPLY, [$$[$0 - 2], $$[$0]]);

                    break;
                case 15:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.DIVIDE, [$$[$0 - 2], $$[$0]]);

                    break;
                case 16:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.MODULO, [$$[$0 - 2], $$[$0]]);

                    break;
                case 17:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LOGICAL_AND, [$$[$0 - 2], $$[$0]]);

                    break;
                case 18:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LOGICAL_OR, [$$[$0 - 2], $$[$0]]);

                    break;
                case 19:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LESS_OR_EQUAL, [$$[$0 - 2], $$[$0]]);

                    break;
                case 20:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LESS, [$$[$0 - 2], $$[$0]]);

                    break;
                case 21:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.GREATER_OR_EQUAL, [$$[$0 - 2], $$[$0]]);

                    break;
                case 22:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.GREATER, [$$[$0 - 2], $$[$0]]);

                    break;
                case 23:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.NOT_EQUAL, [$$[$0 - 2], $$[$0]]);

                    break;
                case 24:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.EQUAL, [$$[$0 - 2], $$[$0]]);

                    break;
                case 25:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.TERNARY, [$$[$0 - 4], $$[$0 - 2], $$[$0]]);

                    break;
                case 26:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.INVOCATION, [undefined, $$[$0]], $$[$0 - 1]);

                    break;
                case 27:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.INVOCATION, [$$[$0 - 3], $$[$0]], $$[$0 - 1]);

                    break;
                case 28:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.INVOCATION, [$$[$0 - 5], $$[$0 - 1]], $$[$0 - 3]);

                    break;
                case 29:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARROW_FUNCTION, [undefined, $$[$0]]);

                    break;
                case 30:

                    var param = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, [$$[$0 - 2]]);
                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARROW_FUNCTION, [param, $$[$0]]);

                    break;
                case 31:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARROW_FUNCTION, [$$[$0 - 3], $$[$0]]);

                    break;
                case 32:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, [$$[$0 - 2], $$[$0]]);

                    break;
                case 33:

                    this.$ = $$[$0 - 2];
                    this.$.value.push($$[$0]);

                    break;
                case 34:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARGS, []);

                    break;
                case 35:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARGS, [$$[$0 - 1]]);

                    break;
                case 36:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.MEMBER_ACCESS, [$$[$0 - 1], $$[$0]]);

                    break;
                case 37:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.MEMBER, null, $$[$0]);

                    break;
                case 38:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.MEMBER, [$$[$0 - 1]]);

                    break;
                case 39:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.VARIABLE, null, $$[$0]);

                    break;
                case 40:case 41:case 42:case 60:

                    this.$ = $$[$0];

                    break;
                case 43:

                    var string = yytext.substr(1, yyleng - 2);
                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, string);

                    break;
                case 44:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, Number(yytext));

                    break;
                case 45:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, true);

                    break;
                case 46:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, false);

                    break;
                case 47:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, null);

                    break;
                case 48:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARRAY_LITERAL, []);

                    break;
                case 49:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARRAY_LITERAL, [$$[$0 - 1]]);

                    break;
                case 50:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARRAY_LITERAL, [$$[$0 - 2]]);

                    break;
                case 51:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.ARRAY, [$$[$0]]);

                    break;
                case 52:case 57:

                    this.$ = $$[$0 - 2];
                    this.$.args.push($$[$0]);

                    break;
                case 53:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.OBJECT_LITERAL, []);

                    break;
                case 54:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.OBJECT_LITERAL, [$$[$0 - 1]]);

                    break;
                case 55:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.OBJECT_LITERAL, [$$[$0 - 2]]);

                    break;
                case 56:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.OBJECT, [$$[$0]]);

                    break;
                case 58:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.KEY_VALUE, [$$[$0 - 2], $$[$0]]);

                    break;
                case 59:

                    this.$ = new _bindExprDefines.AstNode(_bindExprDefines.AstNodeType.LITERAL, null, $$[$0]);

                    break;
                case 61:

                    this.$ = $$[$0 - 1];

                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [1, 3], 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 1: [3] }, { 5: [1, 24], 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 37: 40, 38: $Vr }, { 1: [2, 2] }, o($Vs, [2, 3]), o($Vs, [2, 4]), o($Vs, [2, 5]), { 4: 42, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($Vs, [2, 7]), o($Vs, [2, 8]), { 4: 43, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 44, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 45, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($Vs, $Vt, { 30: 46, 9: $Vu }), o($Vs, [2, 40]), o($Vs, [2, 41]), o($Vs, [2, 42]), o($Vs, [2, 43]), o($Vs, [2, 44]), o($Vs, [2, 45]), o($Vs, [2, 46]), o($Vs, [2, 47]), { 29: $Vv, 38: $Vw, 40: 53, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 49: [1, 48], 50: 49, 51: 50, 52: 51 }, { 4: 57, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 36: 56, 38: $V5, 39: [1, 55], 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 1: [2, 1] }, { 4: 58, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 59, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 60, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 61, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 62, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 63, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 64, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 65, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 66, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 67, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 68, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 69, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 70, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 71, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 29: [1, 72] }, o($Vs, [2, 36]), { 4: 73, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 10: [1, 74], 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 37: 40, 38: $Vr }, o($Vx, [2, 9], { 37: 40, 31: $Vq, 38: $Vr }), o($Vx, [2, 10], { 37: 40, 31: $Vq, 38: $Vr }), o($Vx, [2, 11], { 37: 40, 31: $Vq, 38: $Vr }), o($Vs, [2, 26]), { 4: 57, 6: 4, 7: 5, 8: 6, 9: $V0, 10: $Vy, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 36: 76, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($Vs, [2, 53]), { 35: [1, 78], 49: [1, 77] }, o($Vz, [2, 56]), { 28: [1, 79] }, { 28: [2, 59] }, { 28: [2, 60] }, { 4: 80, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($Vs, [2, 48]), { 35: [1, 82], 39: [1, 81] }, o($VA, [2, 51], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 38: $Vr }), o($VB, [2, 12], { 37: 40, 16: $Ve, 17: $Vf, 18: $Vg, 31: $Vq, 38: $Vr }), o($VB, [2, 13], { 37: 40, 16: $Ve, 17: $Vf, 18: $Vg, 31: $Vq, 38: $Vr }), o($Vx, [2, 14], { 37: 40, 31: $Vq, 38: $Vr }), o($Vx, [2, 15], { 37: 40, 31: $Vq, 38: $Vr }), o($Vx, [2, 16], { 37: 40, 31: $Vq, 38: $Vr }), o([5, 10, 19, 20, 27, 28, 35, 39, 49], [2, 17], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 31: $Vq, 38: $Vr }), o([5, 10, 20, 27, 28, 35, 39, 49], [2, 18], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 31: $Vq, 38: $Vr }), o($VC, [2, 19], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 31: $Vq, 38: $Vr }), o($VC, [2, 20], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 31: $Vq, 38: $Vr }), o($VC, [2, 21], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 31: $Vq, 38: $Vr }), o($VC, [2, 22], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 31: $Vq, 38: $Vr }), o($VD, [2, 23], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 31: $Vq, 38: $Vr }), o($VD, [2, 24], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 31: $Vq, 38: $Vr }), { 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 28: [1, 83], 31: $Vq, 37: 40, 38: $Vr }, o($Vs, [2, 37], { 30: 84, 9: [1, 85] }), { 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 37: 40, 38: $Vr, 39: [1, 86] }, o($Vs, [2, 6]), o($Vs, [2, 34]), { 10: [1, 87], 35: [1, 88] }, o($Vs, [2, 54]), { 29: $Vv, 38: $Vw, 40: 53, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 49: [1, 89], 51: 90, 52: 51 }, { 4: 91, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 37: 40, 38: $Vr, 39: [1, 92] }, o($Vs, [2, 49]), { 4: 94, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 39: [1, 93], 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 95, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($Vs, [2, 27]), { 4: 57, 6: 4, 7: 5, 8: 6, 9: [1, 97], 10: $Vy, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: [1, 98], 32: 96, 36: 76, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($Vs, [2, 38]), o($Vs, [2, 35]), { 4: 94, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($Vs, [2, 55]), o($Vz, [2, 57]), o($Vz, [2, 58], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 38: $Vr }), { 28: [2, 61] }, o($Vs, [2, 50]), o($VA, [2, 52], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 38: $Vr }), o([5, 10, 28, 35, 39, 49], [2, 25], { 37: 40, 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 38: $Vr }), { 10: [1, 99] }, { 4: 42, 6: 4, 7: 5, 8: 6, 9: $V0, 10: [1, 100], 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: [1, 102], 34: 101, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o([10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 31, 35, 38], $Vt, { 30: 46, 9: $Vu, 33: [1, 103] }), o($Vs, [2, 28]), { 33: [1, 104] }, { 10: [1, 105], 35: [1, 106] }, o([10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 31, 38], $Vt, { 30: 46, 9: $Vu, 35: [1, 107] }), { 4: 108, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 4: 109, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, { 33: [1, 110] }, { 29: [1, 111] }, { 29: [1, 112] }, { 10: [2, 30], 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 37: 40, 38: $Vr }, { 10: [2, 29], 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 37: 40, 38: $Vr }, { 4: 113, 6: 4, 7: 5, 8: 6, 9: $V0, 11: 8, 12: 9, 13: $V1, 14: $V2, 15: $V3, 29: $V4, 38: $V5, 40: 14, 41: 15, 42: 16, 43: $V6, 44: $V7, 45: $V8, 46: $V9, 47: $Va, 48: $Vb }, o($VE, [2, 33]), o($VE, [2, 32]), { 10: [2, 31], 14: $Vc, 15: $Vd, 16: $Ve, 17: $Vf, 18: $Vg, 19: $Vh, 20: $Vi, 21: $Vj, 22: $Vk, 23: $Vl, 24: $Vm, 25: $Vn, 26: $Vo, 27: $Vp, 31: $Vq, 37: 40, 38: $Vr }],
        defaultActions: { 3: [2, 2], 24: [2, 1], 52: [2, 59], 53: [2, 60], 92: [2, 61] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function lex() {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        /* skip whitespace */
                        break;
                    case 1:
                        return 47;
                        break;
                    case 2:
                        return 45;
                        break;
                    case 3:
                        return 46;
                        break;
                    case 4:
                        return 44;
                        break;
                    case 5:
                        return 29;
                        break;
                    case 6:
                        return 43;
                        break;
                    case 7:
                        return 43;
                        break;
                    case 8:
                        return 33;
                        break;
                    case 9:
                        return 15;
                        break;
                    case 10:
                        return 14;
                        break;
                    case 11:
                        return 16;
                        break;
                    case 12:
                        return 17;
                        break;
                    case 13:
                        return 19;
                        break;
                    case 14:
                        return 20;
                        break;
                    case 15:
                        return 25;
                        break;
                    case 16:
                        return 26;
                        break;
                    case 17:
                        return 21;
                        break;
                    case 18:
                        return 22;
                        break;
                    case 19:
                        return 23;
                        break;
                    case 20:
                        return 24;
                        break;
                    case 21:
                        return 13;
                        break;
                    case 22:
                        return 27;
                        break;
                    case 23:
                        return 28;
                        break;
                    case 24:
                        return 18;
                        break;
                    case 25:
                        return 38;
                        break;
                    case 26:
                        return 39;
                        break;
                    case 27:
                        return 48;
                        break;
                    case 28:
                        return 49;
                        break;
                    case 29:
                        return 9;
                        break;
                    case 30:
                        return 10;
                        break;
                    case 31:
                        return 35;
                        break;
                    case 32:
                        return 31;
                        break;
                    case 33:
                        return 'INVALID';
                        break;
                    case 34:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:\s+)/, /^(?:null\b)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:[0-9]+(\.[0-9]+)?\b)/, /^(?:[a-zA-Z_][a-zA-Z0-9_]*)/, /^(?:'[^\']*')/, /^(?:"[^\"]*")/, /^(?:=>)/, /^(?:\+)/, /^(?:-)/, /^(?:\*)/, /^(?:\/)/, /^(?:&&)/, /^(?:\|\|)/, /^(?:!=)/, /^(?:==)/, /^(?:<=)/, /^(?:<)/, /^(?:>=)/, /^(?:>)/, /^(?:!)/, /^(?:\?)/, /^(?::)/, /^(?:%)/, /^(?:\[)/, /^(?:\])/, /^(?:\{)/, /^(?:\})/, /^(?:\()/, /^(?:\))/, /^(?:,)/, /^(?:\.)/, /^(?:.)/, /^(?:$)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}(); /**
      * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *      http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS-IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */

/** @fileoverview @suppress {checkTypes, suspiciousCode, uselessCode} */

exports.parser = parser;

},{"./bind-expr-defines":6}],8:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindExpression = exports.BindExpressionResultDef = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _bindExprDefines = require('./bind-expr-defines');

var _mode = require('../../../src/mode');

var _object = require('../../../src/utils/object');

var _types = require('../../../src/types');

var _bindExprImpl = require('./bind-expr-impl');

var _log = require('../../../src/log');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

var TAG = 'amp-bind';

/**
 * Possible types of a Bind expression evaluation.
 * @typedef {(null|boolean|string|number|Array|Object)}
 */
var BindExpressionResultDef = exports.BindExpressionResultDef = void 0;

/**
 * Default maximum number of nodes in an expression AST.
 * Double size of a "typical" expression in examples/bind/performance.amp.html.
 * @const @private {number}
 */
var DEFAULT_MAX_AST_SIZE = 50;

/** @const @private {string} */
var BUILT_IN_FUNCTIONS = 'built-in-functions';

/**
 * Map of object type to function name to whitelisted function.
 * @private {!Object<string, !Object<string, Function>>}
 */
var FUNCTION_WHITELIST = void 0;

/**
 * @return {!Object<string, !Object<string, Function>>}
 * @private
 */
function generateFunctionWhitelist() {
  /**
   * Static, not-in-place variant of Array#splice.
   * @param {!Array} array
   * @param {number=} start
   * @param {number=} deleteCount
   * @param {...?} items
   * @return {!Array}
   */
  /*eslint "no-unused-vars": 0*/
  function splice(array, start, deleteCount, items) {
    if (!(0, _types.isArray)(array)) {
      throw new Error('splice: ' + array + ' is not an array.');
    }
    var copy = Array.prototype.slice.call(array);
    var args = Array.prototype.slice.call(arguments, 1);
    Array.prototype.splice.apply(copy, args);
    return copy;
  }

  /**
   * Static, not-in-place variant of Array#sort.
   * @param {!Array} array
   * @return {!Array}
   */
  function sort(array) {
    if (!(0, _types.isArray)(array)) {
      throw new Error('sort: ' + array + ' is not an array.');
    }
    var copy = Array.prototype.slice.call(array);
    Array.prototype.sort.call(copy);
    return copy;
  }

  /**
   * Polyfills Object.values for IE.
   * @param {!Object} object
   * @return {!Array}
   * @see https://github.com/es-shims/Object.values
   */
  function values(object) {
    var v = [];
    for (var key in object) {
      if ((0, _object.hasOwn)(object, key)) {
        v.push(object[key]);
      }
    }
    return v;
  }

  // Prototype functions.
  var whitelist = (0, _object.dict)({
    '[object Array]': [Array.prototype.concat, Array.prototype.filter,
    // TODO(choumx): Need polyfill for Array#find and Array#findIndex.
    Array.prototype.indexOf, Array.prototype.join, Array.prototype.lastIndexOf, Array.prototype.map, Array.prototype.reduce, Array.prototype.slice, Array.prototype.some, Array.prototype.includes],
    '[object Number]': [Number.prototype.toExponential, Number.prototype.toFixed, Number.prototype.toPrecision, Number.prototype.toString],
    '[object String]': [String.prototype.charAt, String.prototype.charCodeAt, String.prototype.concat, String.prototype.indexOf, String.prototype.lastIndexOf, String.prototype.slice, String.prototype.split, String.prototype.substr, String.prototype.substring, String.prototype.toLowerCase, String.prototype.toUpperCase]
  });

  // Un-namespaced static functions.
  whitelist[BUILT_IN_FUNCTIONS] = [encodeURI, encodeURIComponent, Math.abs, Math.ceil, Math.floor, Math.max, Math.min, Math.random, Math.round, Math.sign, Object.keys];

  // Creates a map of function name to the function itself.
  // This makes function lookups faster (compared to Array.indexOf).
  var out = (0, _object.map)();
  Object.keys(whitelist).forEach(function (type) {
    out[type] = (0, _object.map)();

    whitelist[type].forEach(function (fn, i) {
      if (fn) {
        out[type][fn.name] = fn;
      } else {
        // This can happen if a browser doesn't support a built-in function.
        throw new Error('Unsupported function for ' + type + ' at index ' + i + '.');
      }
    });
  });

  // Custom functions (non-js-built-ins) must be added manually as their names
  // will be minified at compile time.
  out[BUILT_IN_FUNCTIONS]['copyAndSplice'] = splice; // Legacy name.
  out[BUILT_IN_FUNCTIONS]['sort'] = sort;
  out[BUILT_IN_FUNCTIONS]['splice'] = splice;
  out[BUILT_IN_FUNCTIONS]['values'] = typeof Object.values == 'function' ? Object.values : values;

  return out;
}

/**
 * A single Bind expression.
 */

var BindExpression = exports.BindExpression = function () {
  /**
   * @param {string} expressionString
   * @param {!Object<string, !./bind-macro.BindMacro>} macros
   * @param {number=} opt_maxAstSize
   * @throws {Error} On malformed expressions.
   */
  function BindExpression(expressionString, macros, opt_maxAstSize) {
    _classCallCheck(this, BindExpression);

    if (!FUNCTION_WHITELIST) {
      FUNCTION_WHITELIST = generateFunctionWhitelist();
    }

    /** @const {string} */
    this.expressionString = expressionString;

    /** @private @const {!Object<string, !./bind-macro.BindMacro>} */
    this.macros_ = macros;

    /** @const @private {!./bind-expr-defines.AstNode} */
    this.ast_ = _bindExprImpl.parser.parse(this.expressionString);

    /** @const {number} */
    this.expressionSize = this.numberOfNodesInAst_(this.ast_);

    // Check if this expression string is too large (for performance).
    var maxSize = opt_maxAstSize || DEFAULT_MAX_AST_SIZE;
    var skipConstraint = (0, _mode.getMode)().localDev && !(0, _mode.getMode)().test;
    if (this.expressionSize > maxSize && !skipConstraint) {
      throw new Error('Expression size (' + this.expressionSize + ') exceeds max ' + ('(' + maxSize + '). Please reduce number of operands.'));
    }
  }

  /**
   * Evaluates the expression given a scope.
   * @param {!Object} scope
   * @throws {Error} On illegal function invocation.
   * @return {BindExpressionResultDef}
   */


  BindExpression.prototype.evaluate = function evaluate(scope) {
    return this.eval_(this.ast_, scope);
  };

  /**
   * @param {!./bind-expr-defines.AstNode} ast
   * @return {number}
   * @private
   */


  BindExpression.prototype.numberOfNodesInAst_ = function numberOfNodesInAst_(ast) {
    var _this = this;

    // Include the node count of any nested macros in the expression.
    if (this.isMacroInvocationNode_(ast)) {
      var macro = this.macros_[String(ast.value)];
      var nodes = macro.getExpressionSize();
      this.getInvocationArgNodes_(ast).forEach(function (arg) {
        if (arg) {
          nodes += _this.numberOfNodesInAst_(arg) - 1;
        }
      });
      return nodes;
    } else {
      var _nodes = 1;
      if (ast.args) {
        ast.args.forEach(function (arg) {
          if (arg) {
            _nodes += _this.numberOfNodesInAst_(arg);
          }
        });
      }
      return _nodes;
    }
  };

  /**
   * @param {!./bind-expr-defines.AstNode} ast
   * @return {boolean}
   * @private
   */


  BindExpression.prototype.isMacroInvocationNode_ = function isMacroInvocationNode_(ast) {
    var isInvocationWithNoCaller = ast.type === _bindExprDefines.AstNodeType.INVOCATION && !ast.args[0];
    if (isInvocationWithNoCaller) {
      var macroExistsWithValue = this.macros_[String(ast.value)] != null;
      return macroExistsWithValue;
    }
    return false;
  };

  /**
   * Gets the array of nodes for the arguments of the provided INVOCATION
   * node, without the wrapping ARGS node and ARRAY node.
   * @param {!./bind-expr-defines.AstNode} ast
   * @return {!Array<./bind-expr-defines.AstNode>}
   * @private
   */


  BindExpression.prototype.getInvocationArgNodes_ = function getInvocationArgNodes_(ast) {
    if (ast.args.length === 2 && ast.args[1].type === _bindExprDefines.AstNodeType.ARGS) {
      var argsNode = ast.args[1];
      if (argsNode.args.length === 0) {
        return [];
      } else if (argsNode.args.length === 1 && argsNode.args[0].type === _bindExprDefines.AstNodeType.ARRAY) {
        var arrayNode = argsNode.args[0];
        return arrayNode.args || [];
      }
    }
    return ast.args || [];
  };

  /**
   * Recursively evaluates and returns value of `node` and its children.
   * @param {./bind-expr-defines.AstNode} node
   * @param {!Object} scope
   * @throws {Error}
   * @return {BindExpressionResultDef}
   * @private
   */


  BindExpression.prototype.eval_ = function eval_(node, scope) {
    var _this2 = this;

    if (!node) {
      return null;
    }

    var type = node.type,
        args = node.args,
        value = node.value;

    // `value` should always exist for literals.

    if (type === _bindExprDefines.AstNodeType.LITERAL && value !== undefined) {
      return value;
    }

    switch (type) {
      case _bindExprDefines.AstNodeType.EXPRESSION:
        return this.eval_(args[0], scope);

      case _bindExprDefines.AstNodeType.INVOCATION:
        // Built-in functions and macros don't have a caller object.
        var isBuiltInOrMacro = args[0] === undefined;

        var caller = this.eval_(args[0], scope);
        var params = this.eval_(args[1], scope);
        var method = String(value);

        var validFunction = void 0;
        var unsupportedError = void 0;

        if (isBuiltInOrMacro) {
          var macro = this.macros_[method];
          if (macro) {
            validFunction = function validFunction() {
              return macro.evaluate(scope, Array.prototype.slice.call(arguments));
            };
          } else {
            validFunction = FUNCTION_WHITELIST[BUILT_IN_FUNCTIONS][method];
          }
          if (!validFunction) {
            unsupportedError = method + ' is not a supported function.';
          }
        } else {
          if (caller === null) {
            (0, _log.user)().warn(TAG, 'Cannot invoke method ' + method + ' on null; ' + 'returning null.');
            return null;
          }
          var callerType = Object.prototype.toString.call(caller);
          var whitelist = FUNCTION_WHITELIST[callerType];
          if (whitelist) {
            var f = caller[method];
            if (f && f === whitelist[method]) {
              validFunction = f;
            }
          }
          if (!validFunction) {
            unsupportedError = callerType + '.' + method + ' is not a supported function.';
          }
        }

        if (validFunction) {
          if (Array.isArray(params)) {
            // Don't allow objects as parameters except for Object functions.
            var invalidArgumentType = this.containsObject_(params) && !this.isObjectMethod_(method);
            if (!invalidArgumentType) {
              return validFunction.apply(caller, params);
            }
          } else if (typeof params == 'function') {
            // Special case: `params` may be an arrow function, which are only
            // supported as the sole argument to functions like Array#find.
            return validFunction.call(caller, params);
          }
          throw new Error('Unexpected argument type in ' + method + '().');
        }

        throw new Error(unsupportedError);

      case _bindExprDefines.AstNodeType.MEMBER_ACCESS:
        var target = this.eval_(args[0], scope);
        var member = this.eval_(args[1], scope);

        if (target === null || member === null) {
          this.memberAccessWarning_(target, member);
          return null;
        }
        var targetType = typeof target === 'undefined' ? 'undefined' : _typeof(target);
        if (targetType !== 'string' && targetType !== 'object') {
          this.memberAccessWarning_(target, member);
          return null;
        }
        var memberType = typeof member === 'undefined' ? 'undefined' : _typeof(member);
        if (memberType !== 'string' && memberType !== 'number') {
          this.memberAccessWarning_(target, member);
          return null;
        }
        // Ignore Closure's type constraint for `hasOwnProperty`.
        if (Object.prototype.hasOwnProperty.call(
        /** @type {Object} */target, member)) {
          return target[member];
        } else {
          this.memberAccessWarning_(target, member);
        }
        return null;

      case _bindExprDefines.AstNodeType.MEMBER:
        return value || this.eval_(args[0], scope);

      case _bindExprDefines.AstNodeType.VARIABLE:
        var variable = value;
        if (Object.prototype.hasOwnProperty.call(scope, variable)) {
          return scope[variable];
        } else {
          (0, _log.user)().warn(TAG, variable + ' is not defined; returning null.');
        }
        return null;

      case _bindExprDefines.AstNodeType.ARGS:
      case _bindExprDefines.AstNodeType.ARRAY_LITERAL:
        return args.length > 0 ? this.eval_(args[0], scope) : [];

      case _bindExprDefines.AstNodeType.ARRAY:
        return args.map(function (element) {
          return _this2.eval_(element, scope);
        });

      case _bindExprDefines.AstNodeType.OBJECT_LITERAL:
        return args.length > 0 ? this.eval_(args[0], scope) : (0, _object.map)();

      case _bindExprDefines.AstNodeType.OBJECT:
        var object = (0, _object.map)();
        args.forEach(function (keyValue) {
          var _eval_ = _this2.eval_(keyValue, scope),
              k = _eval_.k,
              v = _eval_.v;

          object[k] = v;
        });
        return object;

      case _bindExprDefines.AstNodeType.KEY_VALUE:
        return {
          k: this.eval_(args[0], scope),
          v: this.eval_(args[1], scope)
        };

      case _bindExprDefines.AstNodeType.NOT:
        return !this.eval_(args[0], scope);

      case _bindExprDefines.AstNodeType.UNARY_MINUS:
        return -Number(this.eval_(args[0], scope));

      case _bindExprDefines.AstNodeType.UNARY_PLUS:
        return +Number(this.eval_(args[0], scope));

      case _bindExprDefines.AstNodeType.PLUS:
        return this.eval_(args[0], scope) + this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.MINUS:
        return Number(this.eval_(args[0], scope)) - Number(this.eval_(args[1], scope));

      case _bindExprDefines.AstNodeType.MULTIPLY:
        return Number(this.eval_(args[0], scope)) * Number(this.eval_(args[1], scope));

      case _bindExprDefines.AstNodeType.DIVIDE:
        return Number(this.eval_(args[0], scope)) / Number(this.eval_(args[1], scope));

      case _bindExprDefines.AstNodeType.MODULO:
        return Number(this.eval_(args[0], scope)) % Number(this.eval_(args[1], scope));

      case _bindExprDefines.AstNodeType.LOGICAL_AND:
        return this.eval_(args[0], scope) && this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.LOGICAL_OR:
        return this.eval_(args[0], scope) || this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.LESS_OR_EQUAL:
        return this.eval_(args[0], scope) <= this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.LESS:
        return this.eval_(args[0], scope) < this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.GREATER_OR_EQUAL:
        return this.eval_(args[0], scope) >= this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.GREATER:
        return this.eval_(args[0], scope) > this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.NOT_EQUAL:
        return this.eval_(args[0], scope) != this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.EQUAL:
        return this.eval_(args[0], scope) == this.eval_(args[1], scope);

      case _bindExprDefines.AstNodeType.TERNARY:
        return this.eval_(args[0], scope) ? this.eval_(args[1], scope) : this.eval_(args[2], scope);

      case _bindExprDefines.AstNodeType.ARROW_FUNCTION:
        var functionScope = (0, _object.map)(scope);
        return function () {
          for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
            values[_key] = arguments[_key];
          }

          // Support parameters in arrow functions by forwarding their values
          // into the function's scope. For example, in this function call:
          //
          //     const f = (x, y) => x + y;
          //     f(2, 7);
          //
          // `names` == ['x', 'y'] and `values` == [2, 7], so we include
          // {x: 2, y: 7} in the scope when evaluating `x + y`.

          var names = _this2.eval_(args[0], scope);
          if (names) {
            names.forEach(function (name, i) {
              functionScope[name] = values[i];
            });
          }
          return _this2.eval_(args[1], functionScope);
        };

      default:
        throw new Error('Unexpected AstNodeType: ' + type + '.');
    }
  };

  /**
   * @param {*} target
   * @param {*} member
   * @private
   */


  BindExpression.prototype.memberAccessWarning_ = function memberAccessWarning_(target, member) {
    // Cast valid, because we don't care for the logging.
    var stringified = JSON.stringify( /** @type {!JsonObject} */member);
    (0, _log.user)().warn(TAG, 'Cannot read property ' + stringified + ' of ' + (stringified + '; returning null.'));
  };

  /**
   * Returns true iff method is
   * @param {string} method
   * @return {boolean}
   */


  BindExpression.prototype.isObjectMethod_ = function isObjectMethod_(method) {
    return method == 'keys' || method == 'values';
  };

  /**
   * Returns true if input array contains a plain object.
   * @param {!Array} array
   * @return {boolean}
   * @private
   */


  BindExpression.prototype.containsObject_ = function containsObject_(array) {
    for (var i = 0; i < array.length; i++) {
      if ((0, _types.isObject)(array[i])) {
        return true;
      }
    }
    return false;
  };

  return BindExpression;
}();

},{"../../../src/log":28,"../../../src/mode":30,"../../../src/types":48,"../../../src/utils/object":54,"./bind-expr-defines":6,"./bind-expr-impl":7}],9:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bind = undefined;

var _ampEvents = require('../../../src/amp-events');

var _bindEvents = require('./bind-events');

var _bindExpression = require('./bind-expression');

var _bindEvaluator = require('./bind-evaluator');

var _bindValidator = require('./bind-validator');

var _services = require('../../../src/services');

var _chunk = require('../../../src/chunk');

var _log = require('../../../src/log');

var _object = require('../../../src/utils/object');

var _mode = require('../../../src/mode');

var _array = require('../../../src/utils/array');

var _service = require('../../../src/service');

var _ampWorker = require('../../../src/web-worker/amp-worker');

var _types = require('../../../src/types');

var _json = require('../../../src/json');

var _error = require('../../../src/error');

var _sanitizer = require('../../../src/sanitizer');

var _dom = require('../../../src/dom');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

var TAG = 'amp-bind';

/**
 * Regular expression that identifies AMP CSS classes.
 * Includes 'i-amphtml-', '-amp-', and 'amp-' prefixes.
 * @type {!RegExp}
 */
var AMP_CSS_RE = /^(i?-)?amp(html)?-/;

/**
 * Maximum depth for state merge.
 * @type {number}
 */
var MAX_MERGE_DEPTH = 10;

/**
 * A bound property, e.g. [property]="expression".
 * `previousResult` is the result of this expression during the last evaluation.
 * @typedef {{
 *   property: string,
 *   expressionString: string,
 *   previousResult: (./bind-expression.BindExpressionResultDef|undefined),
 * }}
 */
var BoundPropertyDef = void 0;

/**
 * A tuple containing a single element and all of its bound properties.
 * @typedef {{
 *   boundProperties: !Array<BoundPropertyDef>,
 *   element: !Element,
 * }}
 */
var BoundElementDef = void 0;

/**
 * A map of tag names to arrays of attributes that do not have non-bind
 * counterparts. For instance, amp-carousel allows a `[slide]` attribute,
 * but does not support a `slide` attribute.
 * @const {!Object<string, !Array<string>>}
 */
var BIND_ONLY_ATTRIBUTES = (0, _object.map)({
  'AMP-CAROUSEL': ['slide'],
  'AMP-LIST': ['state'],
  'AMP-SELECTOR': ['selected']
});

/**
 * Bind is an ampdoc-scoped service that handles the Bind lifecycle, from
 * scanning for bindings to evaluating expressions to mutating elements.
 * @implements {../../../src/service.EmbeddableService}
 */

var Bind = exports.Bind = function () {
  /**
   * If `opt_win` is provided, scans its document for bindings instead.
   * @param {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc
   * @param {!Window=} opt_win
   */
  function Bind(ampdoc, opt_win) {
    var _this = this;

    _classCallCheck(this, Bind);

    /** @const {!../../../src/service/ampdoc-impl.AmpDoc} */
    this.ampdoc = ampdoc;

    /** @const @private {!Window} */
    this.win_ = ampdoc.win;

    /**
     * The window containing the document to scan.
     * May differ from the `ampdoc`'s window e.g. in FIE.
     * @const @private {!Window}
     */
    this.localWin_ = opt_win || ampdoc.win;

    /** @private {!Array<BoundElementDef>} */
    this.boundElements_ = [];

    /** @const @private {!Function} */
    this.boundOnDomUpdate_ = this.onDomUpdate_.bind(this);

    /**
     * Maps expression string to the element(s) that contain it.
     * @private @const {!Object<string, !Array<!Element>>}
     */
    this.expressionToElements_ = (0, _object.map)();

    /** @private {!../../../src/service/history-impl.History} */
    this.history_ = _services.Services.historyForDoc(ampdoc);

    /**
     * Upper limit on number of bindings for performance.
     * @private {number}
     */
    this.maxNumberOfBindings_ = 2000; // Based on ~1ms to parse an expression.

    /** @const @private {!../../../src/service/resources-impl.Resources} */
    this.resources_ = _services.Services.resourcesForDoc(ampdoc);

    /**
     * The current values of all bound expressions on the page.
     * @const @private {!JsonObject}
     */
    this.state_ = /** @type {!JsonObject} */(0, _object.map)();

    /** @const {!../../../src/service/timer-impl.Timer} */
    this.timer_ = _services.Services.timerFor(this.win_);

    /** @const @private {!./bind-validator.BindValidator} */
    this.validator_ = new _bindValidator.BindValidator();

    /** @const @private {!../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = _services.Services.viewerForDoc(this.ampdoc);

    var bodyPromise = opt_win ? (0, _dom.waitForBodyPromise)(opt_win.document).then(function () {
      return (0, _log.dev)().assertElement(opt_win.document.body);
    }) : ampdoc.whenBodyAvailable();

    /**
     * Resolved when the service finishes scanning the document for bindings.
     * @const @private {Promise}
     */
    this.initializePromise_ = this.viewer_.whenFirstVisible().then(function () {
      return bodyPromise;
    }).then(function (body) {
      return _this.initialize_(body);
    });

    /** @private {Promise} */
    this.setStatePromise_ = null;

    // Expose for testing on dev.
    if ((0, _mode.getMode)().development || (0, _mode.getMode)().localDev) {
      AMP.printState = this.printState_.bind(this);
    }
  }

  /** @override */


  Bind.prototype.adoptEmbedWindow = function adoptEmbedWindow(embedWin) {
    (0, _service.installServiceInEmbedScope)(embedWin, 'bind', new Bind(this.ampdoc, embedWin));
  };

  /**
   * Merges `state` into the current state and immediately triggers an
   * evaluation unless `opt_skipEval` is false.
   * @param {!JsonObject} state
   * @param {boolean=} opt_skipEval
   * @param {boolean=} opt_isAmpStateMutation
   * @return {!Promise}
   */


  Bind.prototype.setState = function setState(state, opt_skipEval, opt_isAmpStateMutation) {
    var _this2 = this;

    // TODO(choumx): What if `state` contains references to globals?
    try {
      (0, _object.deepMerge)(this.state_, state, MAX_MERGE_DEPTH);
    } catch (e) {
      (0, _log.user)().error(TAG, 'Failed to merge result from AMP.setState().', e);
    }

    if (opt_skipEval) {
      return Promise.resolve();
    }

    (0, _log.user)().fine(TAG, 'State updated; re-evaluating expressions...');

    var promise = this.initializePromise_.then(function () {
      return _this2.evaluate_();
    }).then(function (results) {
      return _this2.apply_(results, opt_isAmpStateMutation);
    });

    if ((0, _mode.getMode)().test) {
      promise.then(function () {
        _this2.dispatchEventForTesting_(_bindEvents.BindEvents.SET_STATE);
      });
    }

    return this.setStatePromise_ = promise;
  };

  /**
   * Parses and evaluates an expression with a given scope and merges the
   * resulting object into current state.
   * @param {string} expression
   * @param {!JsonObject} scope
   * @return {!Promise}
   */


  Bind.prototype.setStateWithExpression = function setStateWithExpression(expression, scope) {
    var _this3 = this;

    this.setStatePromise_ = this.evaluateExpression_(expression, scope).then(function (result) {
      return _this3.setState(result);
    });
    return this.setStatePromise_;
  };

  /**
   * Same as setStateWithExpression() except also pushes new history.
   * Popping the new history stack entry will restore the values of variables
   * in `expression`.
   * @param {string} expression
   * @param {!JsonObject} scope
   * @return {!Promise}
   */


  Bind.prototype.pushStateWithExpression = function pushStateWithExpression(expression, scope) {
    var _this4 = this;

    return this.evaluateExpression_(expression, scope).then(function (result) {
      // Store the current values of each referenced variable in `expression`
      // so that we can restore them on history-pop.
      var oldState = (0, _object.map)();
      Object.keys(result).forEach(function (variable) {
        var value = _this4.state_[variable];
        // Store a deep copy of `value` to make sure `oldState` isn't
        // modified by subsequent setState() actions.
        oldState[variable] = _this4.copyJsonObject_(value);
      });

      var onPop = function onPop() {
        return _this4.setState(oldState);
      };
      _this4.history_.push(onPop);

      return _this4.setState(result);
    });
  };

  /**
   * Rescans elements for bindings, evaluates corresponding expressions
   * and applies the results to only those elements. Does _not_ mutate other
   * elements in the document.
   *
   * Returned promise is resolved when rescan and evaluation complete.
   * If it doesn't complete within `timeout` ms, the promise is rejected.
   *
   * @param {!Array<!Element>} elements
   * @param {number} timeout Timeout in milliseconds.
   * @return {!Promise}
   */


  Bind.prototype.rescanAndEvaluate = function rescanAndEvaluate(elements) {
    var _this5 = this;

    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

    var rescan = this.removeBindingsForNodes_(elements).then(function () {
      return _this5.addBindingsForNodes_(elements);
    }).then(function (numberOfBindingsAdded) {
      // Don't reevaluate/apply if there are no bindings.
      if (numberOfBindingsAdded > 0) {
        return _this5.evaluate_().then(function (results) {
          return _this5.applyElements_(results, elements);
        });
      }
    });
    return this.timer_.timeoutPromise(timeout, rescan, 'Timed out waiting for amp-bind to process rendered template.');
  };

  /**
   * Scans the ampdoc for bindings and creates the expression evaluator.
   * @param {!Node} rootNode
   * @return {!Promise}
   * @private
   */


  Bind.prototype.initialize_ = function initialize_(rootNode) {
    var _this6 = this;

    (0, _log.dev)().fine(TAG, 'Scanning DOM for bindings and macros...');
    var promise = Promise.all([this.addMacros_(), this.addBindingsForNodes_([rootNode])]).then(function () {
      // Listen for DOM updates (e.g. template render) to rescan for bindings.
      rootNode.addEventListener(_ampEvents.AmpEvents.DOM_UPDATE, _this6.boundOnDomUpdate_);
    });
    if ((0, _mode.getMode)().development) {
      // Check default values against initial expression results.
      promise = promise.then(function () {
        return _this6.evaluate_().then(function (results) {
          return _this6.verify_(results);
        });
      });
    }
    if ((0, _mode.getMode)().test) {
      // Signal init completion for integration tests.
      promise.then(function () {
        _this6.dispatchEventForTesting_(_bindEvents.BindEvents.INITIALIZE);
      });
    }
    return promise;
  };

  /**
   * The current number of bindings.
   * @return {number}
   * @visibleForTesting
   */


  Bind.prototype.numberOfBindings = function numberOfBindings() {
    return this.boundElements_.reduce(function (number, boundElement) {
      return number + boundElement.boundProperties.length;
    }, 0);
  };

  /**
   * @param {number} value
   * @visibleForTesting
   */


  Bind.prototype.setMaxNumberOfBindingsForTesting = function setMaxNumberOfBindingsForTesting(value) {
    this.maxNumberOfBindings_ = value;
  };

  /** @return {!../../../src/service/history-impl.History} */


  Bind.prototype.historyForTesting = function historyForTesting() {
    return this.history_;
  };

  /**
   * Scans the document for <amp-bind-macro> elements, and adds them to the
   * bind-evaluator.
   *
   * Returns a promise that resolves after macros have been added.
   *
   * @return {!Promise<number>}
   * @private
   */


  Bind.prototype.addMacros_ = function addMacros_() {
    var elements = (0, _dom.scopedQuerySelectorAll)(this.ampdoc.getBody(), 'AMP-BIND-MACRO');
    var macros =
    /** @type {!Array<!./amp-bind-macro.AmpBindMacroDef>} */[];
    (0, _dom.iterateCursor)(elements, function (element) {
      var argumentNames = (element.getAttribute('arguments') || '').split(',').map(function (s) {
        return s.trim();
      });
      macros.push({
        id: element.getAttribute('id'),
        argumentNames: argumentNames,
        expressionString: element.getAttribute('expression')
      });
    });
    if (macros.length == 0) {
      return Promise.resolve(0);
    } else {
      return this.ww_('bind.addMacros', [macros]).then(function () {
        return macros.length;
      });
    }
  };

  /**
   * For each node in an array, scans it and its descendants for bindings.
   * This function is not idempotent.
   *
   * Returns a promise that resolves after bindings have been added.
   *
   * @param {!Array<!Node>} nodes
   * @return {!Promise<number>}
   * @private
   */


  Bind.prototype.addBindingsForNodes_ = function addBindingsForNodes_(nodes) {
    var _this7 = this;

    // For each node, scan it for bindings and store them.
    var scanPromises = nodes.map(function (node) {
      // Limit number of total bindings (unless in local manual testing).
      var limit = (0, _mode.getMode)().localDev && !(0, _mode.getMode)().test ? Number.POSITIVE_INFINITY : _this7.maxNumberOfBindings_ - _this7.numberOfBindings();

      return _this7.scanNode_(node, limit).then(function (results) {
        var boundElements = results.boundElements,
            bindings = results.bindings,
            expressionToElements = results.expressionToElements,
            limitExceeded = results.limitExceeded;


        _this7.boundElements_ = _this7.boundElements_.concat(boundElements);
        Object.assign(_this7.expressionToElements_, expressionToElements);

        (0, _log.dev)().fine(TAG, 'Scanned ' + bindings.length + ' bindings from ' + (boundElements.length + ' elements.'));

        if (limitExceeded) {
          (0, _log.user)().error(TAG, 'Maximum number of bindings reached ' + ('(' + _this7.maxNumberOfBindings_ + '). Additional elements with ') + 'bindings will be ignored.');
        }

        return bindings;
      });
    });

    // Once all scans are complete, combine the bindings and ask web-worker to
    // evaluate expressions in a single RPC.
    return Promise.all(scanPromises).then(function (results) {
      // `results` is a 2D array where results[i] is an array of bindings.
      // Flatten this into a 1D array of bindings via concat.
      var bindings = Array.prototype.concat.apply([], results);
      if (bindings.length == 0) {
        return bindings.length;
      } else {
        (0, _log.dev)().fine(TAG, 'Asking worker to parse expressions...');
        return _this7.ww_('bind.addBindings', [bindings]).then(function (parseErrors) {
          // Report each parse error.
          Object.keys(parseErrors).forEach(function (expressionString) {
            var elements = _this7.expressionToElements_[expressionString];
            if (elements.length > 0) {
              var parseError = parseErrors[expressionString];
              var userError = (0, _log.user)().createError(TAG + ': Expression compile error in "' + expressionString + '". ' + parseError.message);
              userError.stack = parseError.stack;
              (0, _error.reportError)(userError, elements[0]);
            }
          });
          (0, _log.dev)().fine(TAG, 'Finished parsing expressions with ' + (Object.keys(parseErrors).length + ' errors.'));
          return bindings.length;
        });
      }
    });
  };

  /**
   * For each node in an array, removes all bindings for it and its descendants.
   *
   * Returns a promise that resolves after bindings have been removed.
   *
   * @param {!Array<!Node>} nodes
   * @return {!Promise}
   * @private
   * @visibleForTesting
   */


  Bind.prototype.removeBindingsForNodes_ = function removeBindingsForNodes_(nodes) {
    // Eliminate bound elements that are descendants of `nodes`.
    (0, _array.filterSplice)(this.boundElements_, function (boundElement) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].contains(boundElement.element)) {
          return false;
        }
      }
      return true;
    });

    // Eliminate elements from the expression to elements map that
    // have node as an ancestor. Delete expressions that are no longer
    // bound to elements.
    var deletedExpressions = [];
    for (var expression in this.expressionToElements_) {
      var elements = this.expressionToElements_[expression];
      (0, _array.filterSplice)(elements, function (element) {
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].contains(element)) {
            return false;
          }
        }
        return true;
      });
      if (elements.length == 0) {
        deletedExpressions.push(expression);
        delete this.expressionToElements_[expression];
      }
    }

    // Remove the bindings from the evaluator.
    if (deletedExpressions.length > 0) {
      (0, _log.dev)().fine(TAG, 'Asking worker to remove expressions...');
      return this.ww_('bind.removeBindingsWithExpressionStrings', [deletedExpressions]);
    } else {
      return Promise.resolve();
    }
  };

  /**
   * Scans `node` for attributes that conform to bind syntax and returns
   * a tuple containing bound elements and binding data for the evaluator.
   * @param {!Node} node
   * @param {number} limit
   * @return {
   *   !Promise<{
   *     boundElements: !Array<BoundElementDef>,
   *     bindings: !Array<./bind-evaluator.BindingDef>,
   *     expressionToElements: !Object<string, !Array<!Element>>,
   *     limitExceeded: boolean,
   *   }>
   * }
   * @private
   */


  Bind.prototype.scanNode_ = function scanNode_(node, limit) {
    var _this8 = this;

    /** @type {!Array<BoundElementDef>} */
    var boundElements = [];
    /** @type {!Array<./bind-evaluator.BindingDef>} */
    var bindings = [];
    /** @type {!Object<string, !Array<!Element>>} */
    var expressionToElements = (0, _object.map)();

    var doc = (0, _log.dev)().assert(node.ownerDocument, 'ownerDocument is null.');
    // Third and fourth params of `createTreeWalker` are not optional on IE11.
    var walker = doc.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, null,
    /* entityReferenceExpansion */false);

    // Set to true if number of bindings in `node` exceeds `limit`.
    var limitExceeded = false;

    // Helper function for scanning the tree walker's next node.
    // Returns true if the walker has no more nodes.
    var scanNextNode_ = function scanNextNode_() {
      var node = walker.currentNode;
      if (!node) {
        return true;
      }
      var element = (0, _log.dev)().assertElement(node);
      var tagName = element.tagName;

      var boundProperties = _this8.scanElement_(element);
      // Stop scanning once |limit| bindings are reached.
      if (bindings.length + boundProperties.length > limit) {
        boundProperties = boundProperties.slice(0, limit - bindings.length);
        limitExceeded = true;
      }
      if (boundProperties.length > 0) {
        boundElements.push({ element: element, boundProperties: boundProperties });
      }
      boundProperties.forEach(function (boundProperty) {
        var property = boundProperty.property,
            expressionString = boundProperty.expressionString;

        bindings.push({ tagName: tagName, property: property, expressionString: expressionString });

        if (!expressionToElements[expressionString]) {
          expressionToElements[expressionString] = [];
        }
        expressionToElements[expressionString].push(element);
      });
      return !walker.nextNode() || limitExceeded;
    };

    return new Promise(function (resolve) {
      var chunktion = function chunktion(idleDeadline) {
        var completed = false;
        // If `requestIdleCallback` is available, scan elements until
        // idle time runs out.
        if (idleDeadline && !idleDeadline.didTimeout) {
          while (idleDeadline.timeRemaining() > 1 && !completed) {
            completed = scanNextNode_();
          }
        } else {
          // If `requestIdleCallback` isn't available, scan elements in buckets.
          // Bucket size is a magic number that fits within a single frame.
          var bucketSize = 250;
          for (var i = 0; i < bucketSize && !completed; i++) {
            completed = scanNextNode_();
          }
        }
        // If we scanned all elements, resolve. Otherwise, continue chunking.
        if (completed) {
          resolve({
            boundElements: boundElements, bindings: bindings, expressionToElements: expressionToElements, limitExceeded: limitExceeded
          });
        } else {
          (0, _chunk.chunk)(_this8.ampdoc, chunktion, _chunk.ChunkPriority.LOW);
        }
      };
      (0, _chunk.chunk)(_this8.ampdoc, chunktion, _chunk.ChunkPriority.LOW);
    });
  };

  /**
   * Returns bound properties for an element.
   * @param {!Element} element
   * @return {!Array<{property: string, expressionString: string}>}
   * @private
   */


  Bind.prototype.scanElement_ = function scanElement_(element) {
    var boundProperties = [];
    var attrs = element.attributes;
    for (var i = 0, numberOfAttrs = attrs.length; i < numberOfAttrs; i++) {
      var attr = attrs[i];
      var boundProperty = this.scanAttribute_(attr, element);
      if (boundProperty) {
        boundProperties.push(boundProperty);
      }
    }
    return boundProperties;
  };

  /**
   * Returns the bound property and expression string within a given attribute,
   * if it exists. Otherwise, returns null.
   * @param {!Attr} attribute
   * @param {!Element} element
   * @return {?{property: string, expressionString: string}}
   * @private
   */


  Bind.prototype.scanAttribute_ = function scanAttribute_(attribute, element) {
    var tagName = element.tagName;
    var name = attribute.name;
    if (name.length > 2 && name[0] === '[' && name[name.length - 1] === ']') {
      var property = name.substr(1, name.length - 2);
      if (this.validator_.canBind(tagName, property)) {
        return { property: property, expressionString: attribute.value };
      } else {
        var err = (0, _log.user)().createError(TAG + ': Binding to [' + property + '] on <' + tagName + '> is not allowed.');
        (0, _error.reportError)(err, element);
      }
    }
    return null;
  };

  /**
   * Evaluates a single expression and returns its result.
   * @param {string} expression
   * @param {!JsonObject} scope
   * @return {!Promise<!JsonObject>}
   */


  Bind.prototype.evaluateExpression_ = function evaluateExpression_(expression, scope) {
    var _this9 = this;

    return this.initializePromise_.then(function () {
      // Allow expression to reference current state in addition to event state.
      Object.assign(scope, _this9.state_);
      return _this9.ww_('bind.evaluateExpression', [expression, scope]);
    }).then(function (returnValue) {
      var result = returnValue.result,
          error = returnValue.error;

      if (error) {
        var userError = (0, _log.user)().createError(TAG + ': Expression eval failed ' + ('with error: ' + error.message));
        userError.stack = error.stack;
        (0, _error.reportError)(userError);

        throw userError; // Reject promise.
      } else {
        return result;
      }
    });
  };

  /**
   * Reevaluates all expressions and returns a map of expressions to results.
   * @return {!Promise<
   *     !Object<string, ./bind-expression.BindExpressionResultDef>
   * >}
   * @private
   */


  Bind.prototype.evaluate_ = function evaluate_() {
    var _this10 = this;

    (0, _log.user)().fine(TAG, 'Asking worker to re-evaluate expressions...');
    var evaluatePromise = this.ww_('bind.evaluateBindings', [this.state_]);
    return evaluatePromise.then(function (returnValue) {
      var results = returnValue.results,
          errors = returnValue.errors;
      // Report evaluation errors.

      Object.keys(errors).forEach(function (expressionString) {
        var elements = _this10.expressionToElements_[expressionString];
        if (elements.length > 0) {
          var evalError = errors[expressionString];
          var userError = (0, _log.user)().createError(TAG + ': Expression evaluation error in "' + expressionString + '". ' + evalError.message);
          userError.stack = evalError.stack;
          (0, _error.reportError)(userError, elements[0]);
        }
      });
      return results;
    });
  };

  /**
   * Verifies expression results against current DOM state.
   * @param {Object<string, ./bind-expression.BindExpressionResultDef>} results
   * @private
   */


  Bind.prototype.verify_ = function verify_(results) {
    var _this11 = this;

    this.boundElements_.forEach(function (boundElement) {
      var element = boundElement.element,
          boundProperties = boundElement.boundProperties;


      boundProperties.forEach(function (binding) {
        var newValue = results[binding.expressionString];
        if (newValue !== undefined) {
          _this11.verifyBinding_(binding, element, newValue);
        }
      });
    });
  };

  /**
   * Determines which properties to update based on results of evaluation
   * of all bound expression strings with the current state. This method
   * will only return properties that need to be updated along with their
   * new value.
   * @param {!Array<!BoundPropertyDef>} boundProperties
   * @param {Object<string, ./bind-expression.BindExpressionResultDef>} results
   * @return {
   *   !Array<{
   *     boundProperty: !BoundPropertyDef,
   *     newValue: !./bind-expression.BindExpressionResultDef,
   *   }>
   * }
   * @private
   */


  Bind.prototype.calculateUpdates_ = function calculateUpdates_(boundProperties, results) {
    var updates = [];
    boundProperties.forEach(function (boundProperty) {
      var expressionString = boundProperty.expressionString,
          previousResult = boundProperty.previousResult;

      var newValue = results[expressionString];
      if (newValue === undefined || (0, _json.recursiveEquals)(newValue, previousResult, /* depth */3)) {
        (0, _log.user)().fine(TAG, 'Expression result unchanged or missing: ' + ('"' + expressionString + '"'));
      } else {
        boundProperty.previousResult = newValue;
        (0, _log.user)().fine(TAG, 'New expression result: ' + ('"' + expressionString + '" -> ' + newValue));
        updates.push({ boundProperty: boundProperty, newValue: newValue });
      }
    });
    return updates;
  };

  /**
   * Applies expression results to all elements in the document.
   * @param {Object<string, ./bind-expression.BindExpressionResultDef>} results
   * @param {boolean=} opt_isAmpStateMutation
   * @return {!Promise}
   * @private
   */


  Bind.prototype.apply_ = function apply_(results, opt_isAmpStateMutation) {
    var _this12 = this;

    var promises = this.boundElements_.map(function (boundElement) {
      // If this "apply" round is triggered by an <amp-state> mutation,
      // ignore updates to <amp-state> element to prevent update cycles.
      if (opt_isAmpStateMutation && boundElement.element.tagName == 'AMP-STATE') {
        return Promise.resolve();
      }
      return _this12.applyBoundElement_(results, boundElement);
    });
    return Promise.all(promises);
  };

  /**
   * Applies expression results to only given elements and their descendants.
   * @param {Object<string, ./bind-expression.BindExpressionResultDef>} results
   * @param {!Array<!Element>} elements
   * @return {!Promise}
   */


  Bind.prototype.applyElements_ = function applyElements_(results, elements) {
    var _this13 = this;

    var promises = [];
    this.boundElements_.forEach(function (boundElement) {
      elements.forEach(function (element) {
        if (element.contains(boundElement.element)) {
          promises.push(_this13.applyBoundElement_(results, boundElement));
        }
      });
    });
    return Promise.all(promises);
  };

  /**
   * Applies expression results to a single BoundElementDef.
   * @param {Object<string, ./bind-expression.BindExpressionResultDef>} results
   * @param {BoundElementDef} boundElement
   * @return {!Promise}
   */


  Bind.prototype.applyBoundElement_ = function applyBoundElement_(results, boundElement) {
    var _this14 = this;

    var element = boundElement.element,
        boundProperties = boundElement.boundProperties;

    var updates = this.calculateUpdates_(boundProperties, results);
    if (updates.length === 0) {
      return Promise.resolve();
    }
    return this.resources_.mutateElement(element, function () {
      var mutations = (0, _object.dict)();
      var width = void 0,
          height = void 0;

      updates.forEach(function (update) {
        var boundProperty = update.boundProperty,
            newValue = update.newValue;

        var mutation = _this14.applyBinding_(boundProperty, element, newValue);
        if (mutation) {
          mutations[mutation.name] = mutation.value;
          var property = boundProperty.property;
          if (property == 'width') {
            width = (0, _types.isFiniteNumber)(newValue) ? Number(newValue) : width;
          } else if (property == 'height') {
            height = (0, _types.isFiniteNumber)(newValue) ? Number(newValue) : height;
          }
        }
      });

      if (width !== undefined || height !== undefined) {
        // TODO(choumx): Add new Resources method for adding change-size
        // request without scheduling vsync pass since `mutateElement()`
        // will schedule a pass after a short delay anyways.
        _this14.resources_. /*OK*/changeSize(element, height, width);
      }

      if (typeof element.mutatedAttributesCallback === 'function') {
        // Prevent an exception in the callback from interrupting execution,
        // instead wrap in user error and give a helpful message.
        try {
          element.mutatedAttributesCallback(mutations);
        } catch (e) {
          var error = (0, _log.user)().createError(TAG + ': Applying expression ' + ('results (' + JSON.stringify(mutations) + ') failed with error'), e);
          (0, _error.reportError)(error, element);
        }
      }
    });
  };

  /**
   * Mutates the bound property of `element` with `newValue`.
   * @param {!BoundPropertyDef} boundProperty
   * @param {!Element} element
   * @param {./bind-expression.BindExpressionResultDef} newValue
   * @return (?{name: string, value:./bind-expression.BindExpressionResultDef})
   * @private
   */


  Bind.prototype.applyBinding_ = function applyBinding_(boundProperty, element, newValue) {
    var property = boundProperty.property;
    switch (property) {
      case 'text':
        element.textContent = String(newValue);
        // Setting `textContent` on TEXTAREA element only works if user
        // has not interacted with the element, therefore `value` also needs
        // to be set (but `value` is not an attribute on TEXTAREA)
        if (element.tagName == 'TEXTAREA') {
          element.value = String(newValue);
        }
        break;

      case 'class':
        // Preserve internal AMP classes.
        var ampClasses = [];
        for (var i = 0; i < element.classList.length; i++) {
          var cssClass = element.classList[i];
          if (AMP_CSS_RE.test(cssClass)) {
            ampClasses.push(cssClass);
          }
        }
        if (Array.isArray(newValue) || typeof newValue === 'string') {
          element.className = ampClasses.concat(newValue).join(' ');
        } else if (newValue === null) {
          element.className = ampClasses.join(' ');
        } else {
          var err = (0, _log.user)().createError(TAG + ': "' + newValue + '" is not a valid result for [class].');
          (0, _error.reportError)(err, element);
        }
        break;

      default:
        // Some input elements treat some of their attributes as initial values.
        // Once the user interacts with these elements, the JS properties
        // underlying these attributes must be updated for the change to be
        // visible to the user.
        var updateProperty = element.tagName == 'INPUT' && property in element;
        var oldValue = element.getAttribute(property);

        var mutated = false;
        if (typeof newValue === 'boolean') {
          if (updateProperty && element[property] !== newValue) {
            // Property value _must_ be read before the attribute is changed.
            // Before user interaction, attribute updates affect the property.
            element[property] = newValue;
            mutated = true;
          }
          if (newValue && oldValue !== '') {
            element.setAttribute(property, '');
            mutated = true;
          } else if (!newValue && oldValue !== null) {
            element.removeAttribute(property);
            mutated = true;
          }
        } else if (newValue !== oldValue) {
          // TODO(choumx): Perform in worker with URL API.
          // Rewrite attribute value if necessary. This is not done in the
          // worker since it relies on `url#parseUrl`, which uses DOM APIs.
          var rewrittenNewValue = void 0;
          try {
            rewrittenNewValue = (0, _sanitizer.rewriteAttributeValue)(element.tagName, property, String(newValue));
          } catch (e) {
            var _err = (0, _log.user)().createError(TAG + ': "' + newValue + '" is not a ' + ('valid result for [' + property + ']'), e);
            (0, _error.reportError)(_err, element);
          }
          // Rewriting can fail due to e.g. invalid URL.
          if (rewrittenNewValue !== undefined) {
            // TODO(choumx): Don't bother setting for bind-only attrs.
            element.setAttribute(property, rewrittenNewValue);
            if (updateProperty) {
              element[property] = rewrittenNewValue;
            }
            mutated = true;
          }
        }

        if (mutated) {
          return { name: property, value: newValue };
        }
        break;
    }
    return null;
  };

  /**
   * If current bound element state equals `expectedValue`, returns true.
   * Otherwise, returns false.
   * @param {!BoundPropertyDef} boundProperty
   * @param {!Element} element
   * @param {./bind-expression.BindExpressionResultDef} expectedValue
   * @private
   */


  Bind.prototype.verifyBinding_ = function verifyBinding_(boundProperty, element, expectedValue) {
    var property = boundProperty.property;

    // Don't show a warning for bind-only attributes,
    // like 'slide' on amp-carousel.
    var bindOnlyAttrs = BIND_ONLY_ATTRIBUTES[element.tagName];
    if (bindOnlyAttrs && bindOnlyAttrs.includes(property)) {
      return;
    }

    var initialValue = void 0;
    var match = true;

    switch (property) {
      case 'text':
        initialValue = element.textContent;
        expectedValue = String(expectedValue);
        match = initialValue.trim() === expectedValue.trim();
        break;

      case 'class':
        initialValue = [];
        for (var i = 0; i < element.classList.length; i++) {
          var cssClass = element.classList[i];
          // Ignore internal AMP classes.
          if (AMP_CSS_RE.test(cssClass)) {
            continue;
          }
          initialValue.push(cssClass);
        }
        /** @type {!Array<string>} */
        var classes = [];
        if (Array.isArray(expectedValue)) {
          classes = expectedValue;
        } else if (typeof expectedValue === 'string') {
          var trimmed = expectedValue.trim();
          if (trimmed.length > 0) {
            classes = trimmed.split(' ');
          }
        } else {
          var err = (0, _log.user)().createError(TAG + ': "' + expectedValue + '" is not a valid result for [class].');
          (0, _error.reportError)(err, element);
        }
        match = this.compareStringArrays_(initialValue, classes);
        break;

      default:
        var attribute = element.getAttribute(property);
        initialValue = attribute;
        // Boolean attributes return values of either '' or null.
        if (expectedValue === true) {
          match = initialValue === '';
        } else if (expectedValue === false) {
          match = initialValue === null;
        } else {
          match = initialValue === expectedValue;
        }
        break;
    }

    if (!match) {
      var _err2 = (0, _log.user)().createError(TAG + ': ' + ('Default value for [' + property + '] does not match first expression ') + ('result (' + expectedValue + '). This can result in unexpected behavior ') + 'after the next state change.');
      (0, _error.reportError)(_err2, element);
    }
  };

  /**
   * @param {!Event} event
   */


  Bind.prototype.onDomUpdate_ = function onDomUpdate_(event) {
    var _this15 = this;

    var templateContainer = (0, _log.dev)().assertElement(event.target);
    this.removeBindingsForNodes_([templateContainer]).then(function () {
      return _this15.addBindingsForNodes_([templateContainer]);
    }).then(function () {
      _this15.dispatchEventForTesting_(_bindEvents.BindEvents.RESCAN_TEMPLATE);
    });
  };

  /**
   * Helper for invoking a method on web worker.
   * @param {string} method
   * @param {!Array=} opt_args
   * @return {!Promise}
   */


  Bind.prototype.ww_ = function ww_(method, opt_args) {
    return (0, _ampWorker.invokeWebWorker)(this.win_, method, opt_args, this.localWin_);
  };

  /**
   * Returns true if both arrays contain the same strings.
   * @param {!(IArrayLike<string>|Array<string>)} a
   * @param {!(IArrayLike<string>|Array<string>)} b
   * @return {boolean}
   * @private
   */


  Bind.prototype.compareStringArrays_ = function compareStringArrays_(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    var sortedA = ((0, _types.isArray)(a) ? a : (0, _types.toArray)(a)).sort();
    var sortedB = ((0, _types.isArray)(b) ? b : (0, _types.toArray)(b)).sort();
    for (var i = 0; i < a.length; i++) {
      if (sortedA[i] !== sortedB[i]) {
        return false;
      }
    }
    return true;
  };

  /**
   * Copies an object containing JSON data and returns it.
   * Returns null if input object contains invalid JSON (e.g. undefined or
   * circular references).
   * @param {?JsonObject|undefined} o
   * @return {?JsonObject}
   */


  Bind.prototype.copyJsonObject_ = function copyJsonObject_(o) {
    if (o === undefined) {
      return null;
    }
    try {
      return (0, _json.parseJson)(JSON.stringify(o));
    } catch (e) {
      (0, _log.dev)().error(TAG, 'Failed to copy JSON (' + o + ') with error: ' + e);
    }
    return null;
  };

  /**
   * Print out the current state in the console.
   * @private
   */


  Bind.prototype.printState_ = function printState_() {
    var seen = [];
    var s = JSON.stringify(this.state_, function (key, value) {
      if ((0, _types.isObject)(value)) {
        if (seen.includes(value)) {
          return '[Circular]';
        } else {
          seen.push(value);
        }
      }
      return value;
    });
    (0, _log.user)().info(TAG, s);
  };

  /**
   * Wait for bind scan to finish for testing.
   *
   * @return {?Promise}
   * @visibleForTesting
   */


  Bind.prototype.initializePromiseForTesting = function initializePromiseForTesting() {
    return this.initializePromise_;
  };

  /**
   * Wait for bindings to evaluate and apply for testing. Should
   * be called once for each event that changes bindings.
   *
   * @return {?Promise}
   * @visibleForTesting
   */


  Bind.prototype.setStatePromiseForTesting = function setStatePromiseForTesting() {
    return this.setStatePromise_;
  };

  /**
   * @param {string} name
   * @private
   */


  Bind.prototype.dispatchEventForTesting_ = function dispatchEventForTesting_(name) {
    if ((0, _mode.getMode)().test) {
      var event = void 0;
      if (typeof this.localWin_.Event === 'function') {
        event = new Event(name, { bubbles: true, cancelable: true });
      } else {
        event = this.localWin_.document.createEvent('Event');
        event.initEvent(name, /* bubbles */true, /* cancelable */true);
      }
      this.localWin_.dispatchEvent(event);
    }
  };

  return Bind;
}();

},{"../../../src/amp-events":14,"../../../src/chunk":17,"../../../src/dom":20,"../../../src/error":22,"../../../src/json":27,"../../../src/log":28,"../../../src/mode":30,"../../../src/sanitizer":40,"../../../src/service":41,"../../../src/services":43,"../../../src/types":48,"../../../src/utils/array":52,"../../../src/utils/object":54,"../../../src/web-worker/amp-worker":56,"./bind-evaluator":4,"./bind-events":5,"./bind-expression":8,"./bind-validator":11}],10:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindMacro = undefined;

var _bindExpression = require('./bind-expression');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

/**
 * A single parsed Bind macro.
 */
var BindMacro = exports.BindMacro = function () {
  /**
   * @param {!./amp-bind-macro.AmpBindMacroDef} data
   * @param {!Object<string, !BindMacro>} referableMacros
   */
  function BindMacro(data, referableMacros) {
    _classCallCheck(this, BindMacro);

    /** @const @private {!Array<string>} */
    this.argumentNames_ = data.argumentNames || [];

    /** @const @private {!BindExpression} */
    this.expression_ = new _bindExpression.BindExpression(data.expressionString, referableMacros);
  }

  /**
   * @param {!Object} state
   * @param {!Array} args
   * @throws {Error} On illegal function invocation.
   * @return {./bind-expression.BindExpressionResultDef}
   */


  BindMacro.prototype.evaluate = function evaluate(state, args) {
    var scope = Object.assign({}, state);
    for (var i = 0; i < this.argumentNames_.length; i++) {
      scope[this.argumentNames_[i]] = args[i];
    }
    return this.expression_.evaluate(scope);
  };

  /**
   * @return {number}
   */


  BindMacro.prototype.getExpressionSize = function getExpressionSize() {
    return this.expression_.expressionSize;
  };

  return BindMacro;
}();

},{"./bind-expression":8}],11:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindValidator = undefined;

var _object = require('../../../src/utils/object');

var _srcset = require('../../../src/srcset');

var _string = require('../../../src/string');

var _log = require('../../../src/log');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

var TAG = 'amp-bind';

/**
 * @typedef {{
 *   allowedProtocols: (!Object<string,boolean>|undefined),
 *   alternativeName: (string|undefined),
 * }}
 */
var PropertyRulesDef = void 0;

/**
 * Property rules that apply to any and all tags.
 * @private {Object<string, ?PropertyRulesDef>}
 */
var GLOBAL_PROPERTY_RULES = {
  'class': {
    blacklistedValueRegex: '(^|\\W)i-amphtml-'
  },
  'hidden': null,
  'text': null
};

/**
 * Property rules that apply to all AMP elements.
 * @private {Object<string, ?PropertyRulesDef>}
 */
var AMP_PROPERTY_RULES = {
  'width': null,
  'height': null
};

/**
 * Maps tag names to property names to PropertyRulesDef.
 * If `ELEMENT_RULES[tag][property]` is null, then all values are valid
 * for that property in that tag.
 * @private {Object<string, Object<string, ?PropertyRulesDef>>}}
 */
var ELEMENT_RULES = createElementRules_();

/**
 * Map whose keys comprise all properties that contain URLs.
 * @private {Object<string, boolean>}
 */
var URL_PROPERTIES = {
  'src': true,
  'srcset': true,
  'href': true
};

/**
 * BindValidator performs runtime validation of Bind expression results.
 *
 * For performance reasons, the validation rules enforced are a subset
 * of the AMP validator's, selected with a focus on security and UX.
 */

var BindValidator = exports.BindValidator = function () {
  function BindValidator() {
    _classCallCheck(this, BindValidator);
  }

  /**
   * Returns true if (tag, property) binding is allowed.
   * Otherwise, returns false.
   * @note `tag` and `property` are case-sensitive.
   * @param {!string} tag
   * @param {!string} property
   * @return {boolean}
   */
  BindValidator.prototype.canBind = function canBind(tag, property) {
    return this.rulesForTagAndProperty_(tag, property) !== undefined;
  };

  /**
   * Returns true if `value` is a valid result for a (tag, property) binding.
   * Otherwise, returns false.
   * @param {!string} tag
   * @param {!string} property
   * @param {?string} value
   * @return {boolean}
   */


  BindValidator.prototype.isResultValid = function isResultValid(tag, property, value) {
    var rules = this.rulesForTagAndProperty_(tag, property);

    // `alternativeName` is a reference to another property's rules.
    if (rules && rules.alternativeName) {
      rules = this.rulesForTagAndProperty_(tag, rules.alternativeName);
    }

    // If binding to (tag, property) is not allowed, return false.
    if (rules === undefined) {
      return false;
    }

    // If binding is allowed but have no specific rules, return true.
    if (rules === null) {
      return true;
    }

    // Validate URL(s) if applicable.
    if (value && (0, _object.ownProperty)(URL_PROPERTIES, property)) {
      var urls = void 0;
      if (property === 'srcset') {
        var srcset = void 0;
        try {
          srcset = (0, _srcset.parseSrcset)(value);
        } catch (e) {
          (0, _log.user)().error(TAG, 'Failed to parse srcset: ', e);
          return false;
        }
        var sources = srcset.getSources();
        urls = sources.map(function (source) {
          return source.url;
        });
      } else {
        urls = [value];
      }

      for (var i = 0; i < urls.length; i++) {
        if (!this.isUrlValid_(urls[i], rules)) {
          return false;
        }
      }
    }

    // @see validator/engine/validator.ParsedTagSpec.validateAttributes()
    var blacklistedValueRegex = rules.blacklistedValueRegex;
    if (value && blacklistedValueRegex) {
      var re = new RegExp(blacklistedValueRegex, 'i');
      if (re.test(value)) {
        return false;
      }
    }

    return true;
  };

  /**
   * Returns true if a url's value is valid within a property rules spec.
   * @param {string} url
   * @param {!PropertyRulesDef} rules
   * @return {boolean}
   * @private
   */


  BindValidator.prototype.isUrlValid_ = function isUrlValid_(url, rules) {
    // @see validator/engine/validator.ParsedUrlSpec.validateUrlAndProtocol()
    var allowedProtocols = rules.allowedProtocols;
    if (allowedProtocols && url) {
      var re = /^([^:\/?#.]+):[\s\S]*$/;
      var match = re.exec(url);
      if (match !== null) {
        var protocol = match[1].toLowerCase().trim();
        // hasOwnProperty() needed since nested objects are not prototype-less.
        if (!allowedProtocols.hasOwnProperty(protocol)) {
          return false;
        }
      }
    }

    return true;
  };

  /**
   * Returns the property rules object for (tag, property), if it exists.
   * Returns null if binding is allowed without constraints.
   * Returns undefined if binding is not allowed.
   * @return {(?PropertyRulesDef|undefined)}
   * @private
   */


  BindValidator.prototype.rulesForTagAndProperty_ = function rulesForTagAndProperty_(tag, property) {
    // Allow binding to all ARIA attributes.
    if ((0, _string.startsWith)(property, 'aria-')) {
      return null;
    }
    var globalRules = (0, _object.ownProperty)(GLOBAL_PROPERTY_RULES, property);
    if (globalRules !== undefined) {
      return (/** @type {PropertyRulesDef} */globalRules
      );
    }
    var ampPropertyRules = (0, _object.ownProperty)(AMP_PROPERTY_RULES, property);
    if ((0, _string.startsWith)(tag, 'AMP-') && ampPropertyRules !== undefined) {
      return (/** @type {PropertyRulesDef} */ampPropertyRules
      );
    }
    var tagRules = (0, _object.ownProperty)(ELEMENT_RULES, tag);
    if (tagRules) {
      return tagRules[property];
    }
    return undefined;
  };

  return BindValidator;
}();

/**
 * @return {Object<string, Object<string, ?PropertyRulesDef>>}}
 * @private
 */


function createElementRules_() {
  // Initialize `rules` with tag-specific constraints.
  var rules = {
    'AMP-BRIGHTCOVE': {
      'data-account': null,
      'data-embed': null,
      'data-player': null,
      'data-player-id': null,
      'data-playlist-id': null,
      'data-video-id': null
    },
    'AMP-CAROUSEL': {
      'slide': null
    },
    'AMP-IFRAME': {
      'src': null
    },
    'AMP-IMG': {
      'alt': null,
      'attribution': null,
      'src': {
        'allowedProtocols': {
          'data': true,
          'http': true,
          'https': true
        }
      },
      'srcset': {
        'alternativeName': 'src'
      }
    },
    'AMP-LIST': {
      'src': {
        'allowedProtocols': {
          'https': true
        }
      },
      'state': null
    },
    'AMP-SELECTOR': {
      'selected': null
    },
    'AMP-STATE': {
      'src': {
        'allowedProtocols': {
          'https': true
        }
      }
    },
    'AMP-VIDEO': {
      'alt': null,
      'attribution': null,
      'controls': null,
      'loop': null,
      'poster': null,
      'preload': null,
      'src': {
        'allowedProtocols': {
          'https': true
        }
      }
    },
    'AMP-YOUTUBE': {
      'data-videoid': null
    },
    'A': {
      'href': {
        'allowedProtocols': {
          'ftp': true,
          'http': true,
          'https': true,
          'mailto': true,
          'fb-messenger': true,
          'intent': true,
          'skype': true,
          'sms': true,
          'snapchat': true,
          'tel': true,
          'tg': true,
          'threema': true,
          'twitter': true,
          'viber': true,
          'whatsapp': true
        }
      }
    },
    'BUTTON': {
      'disabled': null,
      'type': null,
      'value': null
    },
    'FIELDSET': {
      'disabled': null
    },
    'INPUT': {
      'accept': null,
      'accesskey': null,
      'autocomplete': null,
      'checked': null,
      'disabled': null,
      'height': null,
      'inputmode': null,
      'max': null,
      'maxlength': null,
      'min': null,
      'minlength': null,
      'multiple': null,
      'pattern': null,
      'placeholder': null,
      'readonly': null,
      'required': null,
      'selectiondirection': null,
      'size': null,
      'spellcheck': null,
      'step': null,
      'type': {
        blacklistedValueRegex: '(^|\\s)(button|file|image|password|)(\\s|$)'
      },
      'value': null,
      'width': null
    },
    'OPTION': {
      'disabled': null,
      'label': null,
      'selected': null,
      'value': null
    },
    'OPTGROUP': {
      'disabled': null,
      'label': null
    },
    'SELECT': {
      'autofocus': null,
      'disabled': null,
      'multiple': null,
      'required': null,
      'size': null
    },
    'SOURCE': {
      'src': {
        'allowedProtocols': {
          'https': true
        }
      },
      'type': null
    },
    'TRACK': {
      'label': null,
      'src': {
        'allowedProtocols': {
          'https': true
        }
      },
      'srclang': null
    },
    'TEXTAREA': {
      'autocomplete': null,
      'autofocus': null,
      'cols': null,
      'disabled': null,
      'maxlength': null,
      'minlength': null,
      'placeholder': null,
      'readonly': null,
      'required': null,
      'rows': null,
      'selectiondirection': null,
      'selectionend': null,
      'selectionstart': null,
      'spellcheck': null,
      'wrap': null
    }
  };
  return rules;
}

},{"../../../src/log":28,"../../../src/srcset":44,"../../../src/string":45,"../../../src/utils/object":54}],12:[function(require,module,exports){
(function (global){
/*!

Copyright (C) 2014-2016 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
// global window Object
// optional polyfill info
//    'auto' used by default, everything is feature detected
//    'force' use the polyfill even if not fully needed
function installCustomElements(window, polyfill) {'use strict';

  // DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
  // THIS IS A PROJECT BASED ON A BUILD SYSTEM
  // THIS FILE IS JUST WRAPPED UP RESULTING IN
  // build/document-register-element.node.js

  var
    document = window.document,
    Object = window.Object
  ;

  var htmlClass = (function (info) {
    // (C) Andrea Giammarchi - @WebReflection - MIT Style
    var
      catchClass = /^[A-Z]+[a-z]/,
      filterBy = function (re) {
        var arr = [], tag;
        for (tag in register) {
          if (re.test(tag)) arr.push(tag);
        }
        return arr;
      },
      add = function (Class, tag) {
        tag = tag.toLowerCase();
        if (!(tag in register)) {
          register[Class] = (register[Class] || []).concat(tag);
          register[tag] = (register[tag.toUpperCase()] = Class);
        }
      },
      register = (Object.create || Object)(null),
      htmlClass = {},
      i, section, tags, Class
    ;
    for (section in info) {
      for (Class in info[section]) {
        tags = info[section][Class];
        register[Class] = tags;
        for (i = 0; i < tags.length; i++) {
          register[tags[i].toLowerCase()] =
          register[tags[i].toUpperCase()] = Class;
        }
      }
    }
    htmlClass.get = function get(tagOrClass) {
      return typeof tagOrClass === 'string' ?
        (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
        filterBy(tagOrClass);
    };
    htmlClass.set = function set(tag, Class) {
      return (catchClass.test(tag) ?
        add(tag, Class) :
        add(Class, tag)
      ), htmlClass;
    };
    return htmlClass;
  }({
    "collections": {
      "HTMLAllCollection": [
        "all"
      ],
      "HTMLCollection": [
        "forms"
      ],
      "HTMLFormControlsCollection": [
        "elements"
      ],
      "HTMLOptionsCollection": [
        "options"
      ]
    },
    "elements": {
      "Element": [
        "element"
      ],
      "HTMLAnchorElement": [
        "a"
      ],
      "HTMLAppletElement": [
        "applet"
      ],
      "HTMLAreaElement": [
        "area"
      ],
      "HTMLAttachmentElement": [
        "attachment"
      ],
      "HTMLAudioElement": [
        "audio"
      ],
      "HTMLBRElement": [
        "br"
      ],
      "HTMLBaseElement": [
        "base"
      ],
      "HTMLBodyElement": [
        "body"
      ],
      "HTMLButtonElement": [
        "button"
      ],
      "HTMLCanvasElement": [
        "canvas"
      ],
      "HTMLContentElement": [
        "content"
      ],
      "HTMLDListElement": [
        "dl"
      ],
      "HTMLDataElement": [
        "data"
      ],
      "HTMLDataListElement": [
        "datalist"
      ],
      "HTMLDetailsElement": [
        "details"
      ],
      "HTMLDialogElement": [
        "dialog"
      ],
      "HTMLDirectoryElement": [
        "dir"
      ],
      "HTMLDivElement": [
        "div"
      ],
      "HTMLDocument": [
        "document"
      ],
      "HTMLElement": [
        "element",
        "abbr",
        "address",
        "article",
        "aside",
        "b",
        "bdi",
        "bdo",
        "cite",
        "code",
        "command",
        "dd",
        "dfn",
        "dt",
        "em",
        "figcaption",
        "figure",
        "footer",
        "header",
        "i",
        "kbd",
        "mark",
        "nav",
        "noscript",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "section",
        "small",
        "strong",
        "sub",
        "summary",
        "sup",
        "u",
        "var",
        "wbr"
      ],
      "HTMLEmbedElement": [
        "embed"
      ],
      "HTMLFieldSetElement": [
        "fieldset"
      ],
      "HTMLFontElement": [
        "font"
      ],
      "HTMLFormElement": [
        "form"
      ],
      "HTMLFrameElement": [
        "frame"
      ],
      "HTMLFrameSetElement": [
        "frameset"
      ],
      "HTMLHRElement": [
        "hr"
      ],
      "HTMLHeadElement": [
        "head"
      ],
      "HTMLHeadingElement": [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6"
      ],
      "HTMLHtmlElement": [
        "html"
      ],
      "HTMLIFrameElement": [
        "iframe"
      ],
      "HTMLImageElement": [
        "img"
      ],
      "HTMLInputElement": [
        "input"
      ],
      "HTMLKeygenElement": [
        "keygen"
      ],
      "HTMLLIElement": [
        "li"
      ],
      "HTMLLabelElement": [
        "label"
      ],
      "HTMLLegendElement": [
        "legend"
      ],
      "HTMLLinkElement": [
        "link"
      ],
      "HTMLMapElement": [
        "map"
      ],
      "HTMLMarqueeElement": [
        "marquee"
      ],
      "HTMLMediaElement": [
        "media"
      ],
      "HTMLMenuElement": [
        "menu"
      ],
      "HTMLMenuItemElement": [
        "menuitem"
      ],
      "HTMLMetaElement": [
        "meta"
      ],
      "HTMLMeterElement": [
        "meter"
      ],
      "HTMLModElement": [
        "del",
        "ins"
      ],
      "HTMLOListElement": [
        "ol"
      ],
      "HTMLObjectElement": [
        "object"
      ],
      "HTMLOptGroupElement": [
        "optgroup"
      ],
      "HTMLOptionElement": [
        "option"
      ],
      "HTMLOutputElement": [
        "output"
      ],
      "HTMLParagraphElement": [
        "p"
      ],
      "HTMLParamElement": [
        "param"
      ],
      "HTMLPictureElement": [
        "picture"
      ],
      "HTMLPreElement": [
        "pre"
      ],
      "HTMLProgressElement": [
        "progress"
      ],
      "HTMLQuoteElement": [
        "blockquote",
        "q",
        "quote"
      ],
      "HTMLScriptElement": [
        "script"
      ],
      "HTMLSelectElement": [
        "select"
      ],
      "HTMLShadowElement": [
        "shadow"
      ],
      "HTMLSlotElement": [
        "slot"
      ],
      "HTMLSourceElement": [
        "source"
      ],
      "HTMLSpanElement": [
        "span"
      ],
      "HTMLStyleElement": [
        "style"
      ],
      "HTMLTableCaptionElement": [
        "caption"
      ],
      "HTMLTableCellElement": [
        "td",
        "th"
      ],
      "HTMLTableColElement": [
        "col",
        "colgroup"
      ],
      "HTMLTableElement": [
        "table"
      ],
      "HTMLTableRowElement": [
        "tr"
      ],
      "HTMLTableSectionElement": [
        "thead",
        "tbody",
        "tfoot"
      ],
      "HTMLTemplateElement": [
        "template"
      ],
      "HTMLTextAreaElement": [
        "textarea"
      ],
      "HTMLTimeElement": [
        "time"
      ],
      "HTMLTitleElement": [
        "title"
      ],
      "HTMLTrackElement": [
        "track"
      ],
      "HTMLUListElement": [
        "ul"
      ],
      "HTMLUnknownElement": [
        "unknown",
        "vhgroupv",
        "vkeygen"
      ],
      "HTMLVideoElement": [
        "video"
      ]
    },
    "nodes": {
      "Attr": [
        "node"
      ],
      "Audio": [
        "audio"
      ],
      "CDATASection": [
        "node"
      ],
      "CharacterData": [
        "node"
      ],
      "Comment": [
        "#comment"
      ],
      "Document": [
        "#document"
      ],
      "DocumentFragment": [
        "#document-fragment"
      ],
      "DocumentType": [
        "node"
      ],
      "HTMLDocument": [
        "#document"
      ],
      "Image": [
        "img"
      ],
      "Option": [
        "option"
      ],
      "ProcessingInstruction": [
        "node"
      ],
      "ShadowRoot": [
        "#shadow-root"
      ],
      "Text": [
        "#text"
      ],
      "XMLDocument": [
        "xml"
      ]
    }
  }));



  // passed at runtime, configurable
  // via nodejs module
  if (!polyfill) polyfill = 'auto';

  var
    // V0 polyfill entry
    REGISTER_ELEMENT = 'registerElement',

    // IE < 11 only + old WebKit for attributes + feature detection
    EXPANDO_UID = '__' + REGISTER_ELEMENT + (window.Math.random() * 10e4 >> 0),

    // shortcuts and costants
    ADD_EVENT_LISTENER = 'addEventListener',
    ATTACHED = 'attached',
    CALLBACK = 'Callback',
    DETACHED = 'detached',
    EXTENDS = 'extends',

    ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
    ATTACHED_CALLBACK = ATTACHED + CALLBACK,
    CONNECTED_CALLBACK = 'connected' + CALLBACK,
    DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
    CREATED_CALLBACK = 'created' + CALLBACK,
    DETACHED_CALLBACK = DETACHED + CALLBACK,

    ADDITION = 'ADDITION',
    MODIFICATION = 'MODIFICATION',
    REMOVAL = 'REMOVAL',

    DOM_ATTR_MODIFIED = 'DOMAttrModified',
    DOM_CONTENT_LOADED = 'DOMContentLoaded',
    DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',

    PREFIX_TAG = '<',
    PREFIX_IS = '=',

    // valid and invalid node names
    validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
    invalidNames = [
      'ANNOTATION-XML',
      'COLOR-PROFILE',
      'FONT-FACE',
      'FONT-FACE-SRC',
      'FONT-FACE-URI',
      'FONT-FACE-FORMAT',
      'FONT-FACE-NAME',
      'MISSING-GLYPH'
    ],

    // registered types and their prototypes
    types = [],
    protos = [],

    // to query subnodes
    query = '',

    // html shortcut used to feature detect
    documentElement = document.documentElement,

    // ES5 inline helpers || basic patches
    indexOf = types.indexOf || function (v) {
      for(var i = this.length; i-- && this[i] !== v;){}
      return i;
    },

    // other helpers / shortcuts
    OP = Object.prototype,
    hOP = OP.hasOwnProperty,
    iPO = OP.isPrototypeOf,

    defineProperty = Object.defineProperty,
    empty = [],
    gOPD = Object.getOwnPropertyDescriptor,
    gOPN = Object.getOwnPropertyNames,
    gPO = Object.getPrototypeOf,
    sPO = Object.setPrototypeOf,

    // jshint proto: true
    hasProto = !!Object.__proto__,

    // V1 helpers
    fixGetClass = false,
    DRECEV1 = '__dreCEv1',
    customElements = window.customElements,
    usableCustomElements = polyfill !== 'force' && !!(
      customElements &&
      customElements.define &&
      customElements.get &&
      customElements.whenDefined
    ),
    Dict = Object.create || Object,
    Map = window.Map || function Map() {
      var K = [], V = [], i;
      return {
        get: function (k) {
          return V[indexOf.call(K, k)];
        },
        set: function (k, v) {
          i = indexOf.call(K, k);
          if (i < 0) V[K.push(k) - 1] = v;
          else V[i] = v;
        }
      };
    },
    Promise = window.Promise || function (fn) {
      var
        notify = [],
        done = false,
        p = {
          'catch': function () {
            return p;
          },
          'then': function (cb) {
            notify.push(cb);
            if (done) setTimeout(resolve, 1);
            return p;
          }
        }
      ;
      function resolve(value) {
        done = true;
        while (notify.length) notify.shift()(value);
      }
      fn(resolve);
      return p;
    },
    justCreated = false,
    constructors = Dict(null),
    waitingList = Dict(null),
    nodeNames = new Map(),
    secondArgument = function (is) {
      return is.toLowerCase();
    },

    // used to create unique instances
    create = Object.create || function Bridge(proto) {
      // silly broken polyfill probably ever used but short enough to work
      return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
    },

    // will set the prototype if possible
    // or copy over all properties
    setPrototype = sPO || (
      hasProto ?
        function (o, p) {
          o.__proto__ = p;
          return o;
        } : (
      (gOPN && gOPD) ?
        (function(){
          function setProperties(o, p) {
            for (var
              key,
              names = gOPN(p),
              i = 0, length = names.length;
              i < length; i++
            ) {
              key = names[i];
              if (!hOP.call(o, key)) {
                defineProperty(o, key, gOPD(p, key));
              }
            }
          }
          return function (o, p) {
            do {
              setProperties(o, p);
            } while ((p = gPO(p)) && !iPO.call(p, o));
            return o;
          };
        }()) :
        function (o, p) {
          for (var key in p) {
            o[key] = p[key];
          }
          return o;
        }
    )),

    // DOM shortcuts and helpers, if any

    MutationObserver = window.MutationObserver ||
                       window.WebKitMutationObserver,

    HTMLElementPrototype = (
      window.HTMLElement ||
      window.Element ||
      window.Node
    ).prototype,

    IE8 = !iPO.call(HTMLElementPrototype, documentElement),

    safeProperty = IE8 ? function (o, k, d) {
      o[k] = d.value;
      return o;
    } : defineProperty,

    isValidNode = IE8 ?
      function (node) {
        return node.nodeType === 1;
      } :
      function (node) {
        return iPO.call(HTMLElementPrototype, node);
      },

    targets = IE8 && [],

    attachShadow = HTMLElementPrototype.attachShadow,
    cloneNode = HTMLElementPrototype.cloneNode,
    dispatchEvent = HTMLElementPrototype.dispatchEvent,
    getAttribute = HTMLElementPrototype.getAttribute,
    hasAttribute = HTMLElementPrototype.hasAttribute,
    removeAttribute = HTMLElementPrototype.removeAttribute,
    setAttribute = HTMLElementPrototype.setAttribute,

    // replaced later on
    createElement = document.createElement,
    patchedCreateElement = createElement,

    // shared observer for all attributes
    attributesObserver = MutationObserver && {
      attributes: true,
      characterData: true,
      attributeOldValue: true
    },

    // useful to detect only if there's no MutationObserver
    DOMAttrModified = MutationObserver || function(e) {
      doesNotSupportDOMAttrModified = false;
      documentElement.removeEventListener(
        DOM_ATTR_MODIFIED,
        DOMAttrModified
      );
    },

    // will both be used to make DOMNodeInserted asynchronous
    asapQueue,
    asapTimer = 0,

    // internal flags
    V0 = REGISTER_ELEMENT in document,
    setListener = true,
    justSetup = false,
    doesNotSupportDOMAttrModified = true,
    dropDomContentLoaded = true,

    // needed for the innerHTML helper
    notFromInnerHTMLHelper = true,

    // optionally defined later on
    onSubtreeModified,
    callDOMAttrModified,
    getAttributesMirror,
    observer,
    observe,

    // based on setting prototype capability
    // will check proto or the expando attribute
    // in order to setup the node once
    patchIfNotAlready,
    patch
  ;

  // only if needed
  if (!V0) {

    if (sPO || hasProto) {
        patchIfNotAlready = function (node, proto) {
          if (!iPO.call(proto, node)) {
            setupNode(node, proto);
          }
        };
        patch = setupNode;
    } else {
        patchIfNotAlready = function (node, proto) {
          if (!node[EXPANDO_UID]) {
            node[EXPANDO_UID] = Object(true);
            setupNode(node, proto);
          }
        };
        patch = patchIfNotAlready;
    }

    if (IE8) {
      doesNotSupportDOMAttrModified = false;
      (function (){
        var
          descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
          addEventListener = descriptor.value,
          patchedRemoveAttribute = function (name) {
            var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
            e.attrName = name;
            e.prevValue = getAttribute.call(this, name);
            e.newValue = null;
            e[REMOVAL] = e.attrChange = 2;
            removeAttribute.call(this, name);
            dispatchEvent.call(this, e);
          },
          patchedSetAttribute = function (name, value) {
            var
              had = hasAttribute.call(this, name),
              old = had && getAttribute.call(this, name),
              e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
            ;
            setAttribute.call(this, name, value);
            e.attrName = name;
            e.prevValue = had ? old : null;
            e.newValue = value;
            if (had) {
              e[MODIFICATION] = e.attrChange = 1;
            } else {
              e[ADDITION] = e.attrChange = 0;
            }
            dispatchEvent.call(this, e);
          },
          onPropertyChange = function (e) {
            // jshint eqnull:true
            var
              node = e.currentTarget,
              superSecret = node[EXPANDO_UID],
              propertyName = e.propertyName,
              event
            ;
            if (superSecret.hasOwnProperty(propertyName)) {
              superSecret = superSecret[propertyName];
              event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
              event.attrName = superSecret.name;
              event.prevValue = superSecret.value || null;
              event.newValue = (superSecret.value = node[propertyName] || null);
              if (event.prevValue == null) {
                event[ADDITION] = event.attrChange = 0;
              } else {
                event[MODIFICATION] = event.attrChange = 1;
              }
              dispatchEvent.call(node, event);
            }
          }
        ;
        descriptor.value = function (type, handler, capture) {
          if (
            type === DOM_ATTR_MODIFIED &&
            this[ATTRIBUTE_CHANGED_CALLBACK] &&
            this.setAttribute !== patchedSetAttribute
          ) {
            this[EXPANDO_UID] = {
              className: {
                name: 'class',
                value: this.className
              }
            };
            this.setAttribute = patchedSetAttribute;
            this.removeAttribute = patchedRemoveAttribute;
            addEventListener.call(this, 'propertychange', onPropertyChange);
          }
          addEventListener.call(this, type, handler, capture);
        };
        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
      }());
    } else if (!MutationObserver) {
      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
      documentElement.setAttribute(EXPANDO_UID, 1);
      documentElement.removeAttribute(EXPANDO_UID);
      if (doesNotSupportDOMAttrModified) {
        onSubtreeModified = function (e) {
          var
            node = this,
            oldAttributes,
            newAttributes,
            key
          ;
          if (node === e.target) {
            oldAttributes = node[EXPANDO_UID];
            node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
            for (key in newAttributes) {
              if (!(key in oldAttributes)) {
                // attribute was added
                return callDOMAttrModified(
                  0,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  ADDITION
                );
              } else if (newAttributes[key] !== oldAttributes[key]) {
                // attribute was changed
                return callDOMAttrModified(
                  1,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  MODIFICATION
                );
              }
            }
            // checking if it has been removed
            for (key in oldAttributes) {
              if (!(key in newAttributes)) {
                // attribute removed
                return callDOMAttrModified(
                  2,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  REMOVAL
                );
              }
            }
          }
        };
        callDOMAttrModified = function (
          attrChange,
          currentTarget,
          attrName,
          prevValue,
          newValue,
          action
        ) {
          var e = {
            attrChange: attrChange,
            currentTarget: currentTarget,
            attrName: attrName,
            prevValue: prevValue,
            newValue: newValue
          };
          e[action] = attrChange;
          onDOMAttrModified(e);
        };
        getAttributesMirror = function (node) {
          for (var
            attr, name,
            result = {},
            attributes = node.attributes,
            i = 0, length = attributes.length;
            i < length; i++
          ) {
            attr = attributes[i];
            name = attr.name;
            if (name !== 'setAttribute') {
              result[name] = attr.value;
            }
          }
          return result;
        };
      }
    }

    // set as enumerable, writable and configurable
    document[REGISTER_ELEMENT] = function registerElement(type, options) {
      upperType = type.toUpperCase();
      if (setListener) {
        // only first time document.registerElement is used
        // we need to set this listener
        // setting it by default might slow down for no reason
        setListener = false;
        if (MutationObserver) {
          observer = (function(attached, detached){
            function checkEmAll(list, callback) {
              for (var i = 0, length = list.length; i < length; callback(list[i++])){}
            }
            return new MutationObserver(function (records) {
              for (var
                current, node, newValue,
                i = 0, length = records.length; i < length; i++
              ) {
                current = records[i];
                if (current.type === 'childList') {
                  checkEmAll(current.addedNodes, attached);
                  checkEmAll(current.removedNodes, detached);
                } else {
                  node = current.target;
                  if (notFromInnerHTMLHelper &&
                      node[ATTRIBUTE_CHANGED_CALLBACK] &&
                      current.attributeName !== 'style') {
                    newValue = getAttribute.call(node, current.attributeName);
                    if (newValue !== current.oldValue) {
                      node[ATTRIBUTE_CHANGED_CALLBACK](
                        current.attributeName,
                        current.oldValue,
                        newValue
                      );
                    }
                  }
                }
              }
            });
          }(executeAction(ATTACHED), executeAction(DETACHED)));
          observe = function (node) {
            observer.observe(
              node,
              {
                childList: true,
                subtree: true
              }
            );
            return node;
          };
          observe(document);
          if (attachShadow) {
            HTMLElementPrototype.attachShadow = function () {
              return observe(attachShadow.apply(this, arguments));
            };
          }
        } else {
          asapQueue = [];
          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
        }

        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);

        HTMLElementPrototype.cloneNode = function (deep) {
          var
            node = cloneNode.call(this, !!deep),
            i = getTypeIndex(node)
          ;
          if (-1 < i) patch(node, protos[i]);
          if (deep && query.length) loopAndSetup(node.querySelectorAll(query));
          return node;
        };
      }

      if (justSetup) return (justSetup = false);

      if (-2 < (
        indexOf.call(types, PREFIX_IS + upperType) +
        indexOf.call(types, PREFIX_TAG + upperType)
      )) {
        throwTypeError(type);
      }

      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
        throw new Error('The type ' + type + ' is invalid');
      }

      var
        constructor = function () {
          return extending ?
            document.createElement(nodeName, upperType) :
            document.createElement(nodeName);
        },
        opt = options || OP,
        extending = hOP.call(opt, EXTENDS),
        nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
        upperType,
        i
      ;

      if (extending && -1 < (
        indexOf.call(types, PREFIX_TAG + nodeName)
      )) {
        throwTypeError(nodeName);
      }

      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;

      query = query.concat(
        query.length ? ',' : '',
        extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
      );

      constructor.prototype = (
        protos[i] = hOP.call(opt, 'prototype') ?
          opt.prototype :
          create(HTMLElementPrototype)
      );

      if (query.length) loopAndVerify(
        document.querySelectorAll(query),
        ATTACHED
      );

      return constructor;
    };

    document.createElement = (patchedCreateElement = function (localName, typeExtension) {
      var
        is = getIs(typeExtension),
        node = is ?
          createElement.call(document, localName, secondArgument(is)) :
          createElement.call(document, localName),
        name = '' + localName,
        i = indexOf.call(
          types,
          (is ? PREFIX_IS : PREFIX_TAG) +
          (is || name).toUpperCase()
        ),
        setup = -1 < i
      ;
      if (is) {
        node.setAttribute('is', is = is.toLowerCase());
        if (setup) {
          setup = isInQSA(name.toUpperCase(), is);
        }
      }
      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    });

  }

  function ASAP() {
    var queue = asapQueue.splice(0, asapQueue.length);
    asapTimer = 0;
    while (queue.length) {
      queue.shift().call(
        null, queue.shift()
      );
    }
  }

  function loopAndVerify(list, action) {
    for (var i = 0, length = list.length; i < length; i++) {
      verifyAndSetupAndAction(list[i], action);
    }
  }

  function loopAndSetup(list) {
    for (var i = 0, length = list.length, node; i < length; i++) {
      node = list[i];
      patch(node, protos[getTypeIndex(node)]);
    }
  }

  function executeAction(action) {
    return function (node) {
      if (isValidNode(node)) {
        verifyAndSetupAndAction(node, action);
        if (query.length) loopAndVerify(
          node.querySelectorAll(query),
          action
        );
      }
    };
  }

  function getTypeIndex(target) {
    var
      is = getAttribute.call(target, 'is'),
      nodeName = target.nodeName.toUpperCase(),
      i = indexOf.call(
        types,
        is ?
            PREFIX_IS + is.toUpperCase() :
            PREFIX_TAG + nodeName
      )
    ;
    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
  }

  function isInQSA(name, type) {
    return -1 < query.indexOf(name + '[is="' + type + '"]');
  }

  function onDOMAttrModified(e) {
    var
      node = e.currentTarget,
      attrChange = e.attrChange,
      attrName = e.attrName,
      target = e.target,
      addition = e[ADDITION] || 2,
      removal = e[REMOVAL] || 3
    ;
    if (notFromInnerHTMLHelper &&
        (!target || target === node) &&
        node[ATTRIBUTE_CHANGED_CALLBACK] &&
        attrName !== 'style' && (
          e.prevValue !== e.newValue ||
          // IE9, IE10, and Opera 12 gotcha
          e.newValue === '' && (
            attrChange === addition ||
            attrChange === removal
          )
    )) {
      node[ATTRIBUTE_CHANGED_CALLBACK](
        attrName,
        attrChange === addition ? null : e.prevValue,
        attrChange === removal ? null : e.newValue
      );
    }
  }

  function onDOMNode(action) {
    var executor = executeAction(action);
    return function (e) {
      asapQueue.push(executor, e.target);
      if (asapTimer) clearTimeout(asapTimer);
      asapTimer = setTimeout(ASAP, 1);
    };
  }

  function onReadyStateChange(e) {
    if (dropDomContentLoaded) {
      dropDomContentLoaded = false;
      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    }
    if (query.length) loopAndVerify(
      (e.target || document).querySelectorAll(query),
      e.detail === DETACHED ? DETACHED : ATTACHED
    );
    if (IE8) purge();
  }

  function patchedSetAttribute(name, value) {
    // jshint validthis:true
    var self = this;
    setAttribute.call(self, name, value);
    onSubtreeModified.call(self, {target: self});
  }

  function setupNode(node, proto) {
    setPrototype(node, proto);
    if (observer) {
      observer.observe(node, attributesObserver);
    } else {
      if (doesNotSupportDOMAttrModified) {
        node.setAttribute = patchedSetAttribute;
        node[EXPANDO_UID] = getAttributesMirror(node);
        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
      }
      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
    }
    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
      node.created = true;
      node[CREATED_CALLBACK]();
      node.created = false;
    }
  }

  function purge() {
    for (var
      node,
      i = 0,
      length = targets.length;
      i < length; i++
    ) {
      node = targets[i];
      if (!documentElement.contains(node)) {
        length--;
        targets.splice(i--, 1);
        verifyAndSetupAndAction(node, DETACHED);
      }
    }
  }

  function throwTypeError(type) {
    throw new Error('A ' + type + ' type is already registered');
  }

  function verifyAndSetupAndAction(node, action) {
    var
      fn,
      i = getTypeIndex(node)
    ;
    if (-1 < i) {
      patchIfNotAlready(node, protos[i]);
      i = 0;
      if (action === ATTACHED && !node[ATTACHED]) {
        node[DETACHED] = false;
        node[ATTACHED] = true;
        i = 1;
        if (IE8 && indexOf.call(targets, node) < 0) {
          targets.push(node);
        }
      } else if (action === DETACHED && !node[DETACHED]) {
        node[ATTACHED] = false;
        node[DETACHED] = true;
        i = 1;
      }
      if (i && (fn = node[action + CALLBACK])) fn.call(node);
    }
  }



  // V1 in da House!
  function CustomElementRegistry() {}

  CustomElementRegistry.prototype = {
    constructor: CustomElementRegistry,
    // a workaround for the stubborn WebKit
    define: usableCustomElements ?
      function (name, Class, options) {
        if (options) {
          CERDefine(name, Class, options);
        } else {
          var NAME = name.toUpperCase();
          constructors[NAME] = {
            constructor: Class,
            create: [NAME]
          };
          nodeNames.set(Class, NAME);
          customElements.define(name, Class);
        }
      } :
      CERDefine,
    get: usableCustomElements ?
      function (name) {
        return customElements.get(name) || get(name);
      } :
      get,
    whenDefined: usableCustomElements ?
      function (name) {
        return Promise.race([
          customElements.whenDefined(name),
          whenDefined(name)
        ]);
      } :
      whenDefined
  };

  function CERDefine(name, Class, options) {
    var
      is = options && options[EXTENDS] || '',
      CProto = Class.prototype,
      proto = create(CProto),
      attributes = Class.observedAttributes || empty,
      definition = {prototype: proto}
    ;
    // TODO: is this needed at all since it's inherited?
    // defineProperty(proto, 'constructor', {value: Class});
    safeProperty(proto, CREATED_CALLBACK, {
        value: function () {
          if (justCreated) justCreated = false;
          else if (!this[DRECEV1]) {
            this[DRECEV1] = true;
            new Class(this);
            if (CProto[CREATED_CALLBACK])
              CProto[CREATED_CALLBACK].call(this);
            var info = constructors[nodeNames.get(Class)];
            if (!usableCustomElements || info.create.length > 1) {
              notifyAttributes(this);
            }
          }
      }
    });
    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
      value: function (name) {
        if (-1 < indexOf.call(attributes, name))
          CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
      }
    });
    if (CProto[CONNECTED_CALLBACK]) {
      safeProperty(proto, ATTACHED_CALLBACK, {
        value: CProto[CONNECTED_CALLBACK]
      });
    }
    if (CProto[DISCONNECTED_CALLBACK]) {
      safeProperty(proto, DETACHED_CALLBACK, {
        value: CProto[DISCONNECTED_CALLBACK]
      });
    }
    if (is) definition[EXTENDS] = is;
    name = name.toUpperCase();
    constructors[name] = {
      constructor: Class,
      create: is ? [is, secondArgument(name)] : [name]
    };
    nodeNames.set(Class, name);
    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
    whenDefined(name);
    waitingList[name].r();
  }

  function get(name) {
    var info = constructors[name.toUpperCase()];
    return info && info.constructor;
  }

  function getIs(options) {
    return typeof options === 'string' ?
        options : (options && options.is || '');
  }

  function notifyAttributes(self) {
    var
      callback = self[ATTRIBUTE_CHANGED_CALLBACK],
      attributes = callback ? self.attributes : empty,
      i = attributes.length,
      attribute
    ;
    while (i--) {
      attribute =  attributes[i]; // || attributes.item(i);
      callback.call(
        self,
        attribute.name || attribute.nodeName,
        null,
        attribute.value || attribute.nodeValue
      );
    }
  }

  function whenDefined(name) {
    name = name.toUpperCase();
    if (!(name in waitingList)) {
      waitingList[name] = {};
      waitingList[name].p = new Promise(function (resolve) {
        waitingList[name].r = resolve;
      });
    }
    return waitingList[name].p;
  }

  function polyfillV1() {
    if (customElements) delete window.customElements;
    defineProperty(window, 'customElements', {
      configurable: true,
      value: new CustomElementRegistry()
    });
    defineProperty(window, 'CustomElementRegistry', {
      configurable: true,
      value: CustomElementRegistry
    });
    for (var
      patchClass = function (name) {
        var Class = window[name];
        if (Class) {
          window[name] = function CustomElementsV1(self) {
            var info, isNative;
            if (!self) self = this;
            if (!self[DRECEV1]) {
              justCreated = true;
              info = constructors[nodeNames.get(self.constructor)];
              isNative = usableCustomElements && info.create.length === 1;
              self = isNative ?
                Reflect.construct(Class, empty, info.constructor) :
                document.createElement.apply(document, info.create);
              self[DRECEV1] = true;
              justCreated = false;
              if (!isNative) notifyAttributes(self);
            }
            return self;
          };
          window[name].prototype = Class.prototype;
          try {
            Class.prototype.constructor = window[name];
          } catch(WebKit) {
            fixGetClass = true;
            defineProperty(Class, DRECEV1, {value: window[name]});
          }
        }
      },
      Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/),
      i = Classes.length;
      i--;
      patchClass(Classes[i])
    ) {}
    (document.createElement = function (name, options) {
      var is = getIs(options);
      return is ?
        patchedCreateElement.call(this, name, secondArgument(is)) :
        patchedCreateElement.call(this, name);
    });
    if (!V0) {
      justSetup = true;
      document[REGISTER_ELEMENT]('');
    }
  }

  // if customElements is not there at all
  if (!customElements || polyfill === 'force') polyfillV1();
  else {
    // if available test extends work as expected
    try {
      (function (DRE, options, name) {
        options[EXTENDS] = 'a';
        DRE.prototype = create(HTMLAnchorElement.prototype);
        DRE.prototype.constructor = DRE;
        window.customElements.define(name, DRE, options);
        if (
          getAttribute.call(document.createElement('a', {is: name}), 'is') !== name ||
          (usableCustomElements && getAttribute.call(new DRE(), 'is') !== name)
        ) {
          throw options;
        }
      }(
        function DRE() {
          return Reflect.construct(HTMLAnchorElement, [], DRE);
        },
        {},
        'document-register-element-a'
      ));
    } catch(o_O) {
      // or force the polyfill if not
      // and keep internal original reference
      polyfillV1();
    }
  }

  try {
    createElement.call(document, 'a', 'a');
  } catch(FireFox) {
    secondArgument = function (is) {
      return {is: is.toLowerCase()};
    };
  }

}

module.exports = installCustomElements;
installCustomElements(global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],13:[function(require,module,exports){
'use strict';

/**
 * Constructs a ES6/Promises A+ Promise instance.
 *
 * @constructor
 * @param {function(function(*=), function (*=))} resolver
 */
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Constructor Promise requires `new`');
  }
  if (!isFunction(resolver)) {
    throw new TypeError('Must pass resolver function');
  }

  /**
   * @type {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise}
   * @private
   */
  this._state = PendingPromise;

  /**
   * @type {*}
   * @private
   */
  this._value = [];

  /**
   * @type {boolean}
   * @private
   */
  this._isChainEnd = true;

  doResolve(
    this,
    adopter(this, FulfilledPromise),
    adopter(this, RejectedPromise),
    { then: resolver }
  );
}

/****************************
  Public Instance Methods
 ****************************/

/**
 * Creates a new promise instance that will receive the result of this promise
 * as inputs to the onFulfilled or onRejected callbacks.
 *
 * @param {function(*)} onFulfilled
 * @param {function(*)} onRejected
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : void 0;
  onRejected = isFunction(onRejected) ? onRejected : void 0;

  if (onFulfilled || onRejected) {
    this._isChainEnd = false;
  }

  return this._state(
    this._value,
    onFulfilled,
    onRejected
  );
};

/**
 * Creates a new promise that will handle the rejected state of this promise.
 *
 * @param {function(*)} onRejected
 * @returns {!Promise}
 */
Promise.prototype.catch = function(onRejected) {
  return this.then(void 0, onRejected);
};

/****************************
  Public Static Methods
 ****************************/

/**
 * Creates a fulfilled Promise of value. If value is itself a then-able,
 * resolves with the then-able's value.
 *
 * @this {!Promise}
 * @param {*=} value
 * @returns {!Promise}
 */
Promise.resolve = function(value) {
  var Constructor = this;
  var promise;

  if (isObject(value) && value instanceof this) {
    promise = value;
  } else {
    promise = new Constructor(function(resolve) {
      resolve(value);
    });
  }

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a rejected Promise of reason.
 *
 * @this {!Promise}
 * @param {*=} reason
 * @returns {!Promise}
 */
Promise.reject = function(reason) {
  var Constructor = this;
  var promise = new Constructor(function(_, reject) {
    reject(reason);
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve with an array of the values of the
 * passed in promises. If any promise rejects, the returned promise will
 * reject.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.all = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    var length = promises.length;
    var values = new Array(length);

    if (length === 0) {
      return resolve(values);
    }

    each(promises, function(promise, index) {
      Constructor.resolve(promise).then(function(value) {
        values[index] = value;
        if (--length === 0) {
          resolve(values);
        }
      }, reject);
    });
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve or reject based on the first
 * resolved or rejected promise.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.race = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Constructor.resolve(promises[i]).then(resolve, reject);
    }
  });

  return /** @type {!Promise} */(promise);
};

var onPossiblyUnhandledRejection = function(reason, promise) {
  throw reason;
};

/**
 * An internal use static function.
 */
Promise._overrideUnhandledExceptionHandler = function(handler) {
  onPossiblyUnhandledRejection = handler;
};

/****************************
  Private functions
 ****************************/

/**
 * The Fulfilled Promise state. Calls onFulfilled with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onFulfilled, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} value The current promise's resolved value.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} unused
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Fulfilled state from the
 *     Pending state.
 * @returns {!Promise}
 */
function FulfilledPromise(value, onFulfilled, unused, deferred) {
  if (!onFulfilled) {
    deferredAdopt(deferred, FulfilledPromise, value);
    return this;
  }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onFulfilled, value));
  return deferred.promise;
}

/**
 * The Rejected Promise state. Calls onRejected with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onRejected, returns the current promise to avoid an promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} reason The current promise's rejection reason.
 * @param {function(*=)=} unused
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Rejected state from the
 *     Pending state.
 * @returns {!Promise}
 */
function RejectedPromise(reason, unused, onRejected, deferred) {
  if (!onRejected) {
    deferredAdopt(deferred, RejectedPromise, reason);
    return this;
  }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onRejected, reason));
  return deferred.promise;
}

/**
 * The Pending Promise state. Eventually calls onFulfilled once the promise has
 * resolved, or onRejected once the promise rejects.
 *
 * If there is no onFulfilled and no onRejected, returns the current promise to
 * avoid an promise instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} queue The current promise's pending promises queue.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Pending state from the
 *     Pending state of another promise.
 * @returns {!Promise}
 */
function PendingPromise(queue, onFulfilled, onRejected, deferred) {
  if (!deferred) {
    if (!onFulfilled && !onRejected) { return this; }
    deferred = new Deferred(this.constructor);
  }
  queue.push({
    deferred: deferred,
    onFulfilled: onFulfilled || deferred.resolve,
    onRejected: onRejected || deferred.reject
  });
  return deferred.promise;
}

/**
 * Constructs a deferred instance that holds a promise and its resolve and
 * reject functions.
 *
 * @constructor
 */
function Deferred(Promise) {
  var deferred = this;
  /** @type {!Promise} */
  this.promise = new Promise(function(resolve, reject) {
    /** @type {function(*=)} */
    deferred.resolve = resolve;

    /** @type {function(*=)} */
    deferred.reject = reject;
  });
  return deferred;
}

/**
 * Transitions the state of promise to another state. This is only ever called
 * on with a promise that is currently in the Pending state.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function adopt(promise, state, value, adoptee) {
  var queue = promise._value;
  promise._state = state;
  promise._value = value;

  if (adoptee && state === PendingPromise) {
    adoptee._state(value, void 0, void 0, {
      promise: promise,
      resolve: void 0,
      reject: void 0
    });
  }

  for (var i = 0; i < queue.length; i++) {
    var next = queue[i];
    promise._state(
      value,
      next.onFulfilled,
      next.onRejected,
      next.deferred
    );
  }
  queue.length = 0;

  // Determine if this rejected promise will be "handled".
  if (state === RejectedPromise && promise._isChainEnd) {
    setTimeout(function() {
      if (promise._isChainEnd) {
        onPossiblyUnhandledRejection(value, promise);
      }
    }, 0);
  }
}

/**
 * A partial application of adopt.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @returns {function(*=)}
 */
function adopter(promise, state) {
  return function(value) {
    adopt(promise, state, value);
  };
}

/**
 * Updates a deferred promises state. Necessary for updating an adopting
 * promise's state when the adoptee resolves.
 *
 * @param {?Deferred} deferred
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function deferredAdopt(deferred, state, value) {
  if (deferred) {
    var promise = deferred.promise;
    promise._state = state;
    promise._value = value;
  }
}

/**
 * A no-op function to prevent double resolving.
 */
function noop() {}

/**
 * Tests if fn is a Function
 *
 * @param {*} fn
 * @returns {boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * Tests if fn is an Object
 *
 * @param {*} obj
 * @returns {boolean}
 */
function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Iterates over each element of an array, calling the iterator with the
 * element and its index.
 *
 * @param {!Array} collection
 * @param {function(*=,number)} iterator
 */
function each(collection, iterator) {
  for (var i = 0; i < collection.length; i++) {
    iterator(collection[i], i);
  }
}

/**
 * Creates a function that will attempt to resolve the deferred with the return
 * of fn. If any error is raised, rejects instead.
 *
 * @param {!Deferred} deferred
 * @param {function(*=)} fn
 * @param {*} arg
 * @returns {function()}
 */
function tryCatchDeferred(deferred, fn, arg) {
  var promise = deferred.promise;
  var resolve = deferred.resolve;
  var reject = deferred.reject;
  return function() {
    try {
      var result = fn(arg);
      doResolve(promise, resolve, reject, result, result);
    } catch (e) {
      reject(e);
    }
  };
}

/**
 * Queues and executes multiple deferred functions on another run loop.
 */
var defer = (function() {
  /**
   * Defers fn to another run loop.
   */
  var scheduleFlush;
  if (typeof window !== 'undefined' && window.postMessage) {
    window.addEventListener('message', flush);
    scheduleFlush = function() {
      window.postMessage('macro-task', '*');
    };
  } else {
    scheduleFlush = function() {
      setTimeout(flush, 0);
    };
  }

  var queue = new Array(16);
  var length = 0;

  function flush() {
    for (var i = 0; i < length; i++) {
      var fn = queue[i];
      queue[i] = null;
      fn();
    }
    length = 0;
  }

  /**
   * @param {function()} fn
   */
  function defer(fn) {
    if (length === 0) { scheduleFlush(); }
    queue[length++] = fn;
  }

  return defer;
})();

/**
 * The Promise resolution procedure.
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 *
 * @param {!Promise} promise
 * @param {function(*=)} resolve
 * @param {function(*=)} reject
 * @param {*} value
 * @param {*=} context
 */
function doResolve(promise, resolve, reject, value, context) {
  var _reject = reject;
  var then;
  var _resolve;
  try {
    if (value === promise) {
      throw new TypeError('Cannot fulfill promise with itself');
    }
    var isObj = isObject(value);
    if (isObj && value instanceof promise.constructor) {
      adopt(promise, value._state, value._value, value);
    } else if (isObj && (then = value.then) && isFunction(then)) {
      _resolve = function(value) {
        _resolve = _reject = noop;
        doResolve(promise, resolve, reject, value, value);
      };
      _reject = function(reason) {
        _resolve = _reject = noop;
        reject(reason);
      };
      then.call(
        context,
        function(value) { _resolve(value); },
        function(reason) { _reject(reason); }
      );
    } else {
      resolve(value);
    }
  } catch (e) {
    _reject(e);
  }
}

module.exports = Promise;

},{}],14:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
* Enum used to specify custom Amp Events
*
* @enum {string}
*/
var AmpEvents = exports.AmpEvents = {
  VISIBILITY_CHANGE: 'amp:visibilitychange',
  DOM_UPDATE: 'amp:dom-update',
  BUILT: 'amp:built',
  ATTACHED: 'amp:attached',
  STUBBED: 'amp:stubbed',
  LOAD_START: 'amp:load:start',
  LOAD_END: 'amp:load:end',
  ERROR: 'amp:error'
};

},{}],15:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerAnalyticsEvent = triggerAnalyticsEvent;

var _services = require('./services');

/**
 * Helper method to trigger analytics event if amp-analytics is available.
 * TODO: Do not expose this function
 * @param {!Element} target
 * @param {string} eventType
 * @param {!Object<string, string>=} opt_vars A map of vars and their values.
 */
function triggerAnalyticsEvent(target, eventType, opt_vars) {
  _services.Services.analyticsForDocOrNull(target).then(function (analytics) {
    if (!analytics) {
      return;
    }
    analytics.triggerEventForTarget(target, eventType, opt_vars);
  });
} /**
   * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

},{"./services":43}],16:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchBatchedJsonFor = fetchBatchedJsonFor;

var _url = require('./url');

var _services = require('./services');

var _json = require('./json');

/**
 * Batch fetches the JSON endpoint at the given element's `src` attribute.
 * Sets the fetch credentials option from the element's `credentials` attribute,
 * if it exists.
 *
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 * @param {!Element} element
 * @param {string=} opt_expr Dot-syntax reference to subdata of JSON result
 *     to return. If not specified, entire JSON result is returned.
 * @return {!Promise<!JsonObject|!Array<JsonObject>>} Resolved with JSON
 *     result or rejected if response is invalid.
 */
function fetchBatchedJsonFor(ampdoc, element, opt_expr) {
  var url = (0, _url.assertHttpsUrl)(element.getAttribute('src'), element);
  return _services.Services.urlReplacementsForDoc(ampdoc).expandAsync(url).then(function (src) {
    var opts = {};
    if (element.hasAttribute('credentials')) {
      opts.credentials = element.getAttribute('credentials');
    } else {
      opts.requireAmpResponseSourceOrigin = false;
    }
    return _services.Services.batchedXhrFor(ampdoc.win).fetchJson(src, opts);
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data == null) {
      throw new Error('Response is undefined.');
    }
    return (0, _json.getValueForExpr)(data, opt_expr || '.');
  });
} /**
   * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

},{"./json":27,"./services":43,"./url":51}],17:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChunkPriority = undefined;
exports.startupChunk = startupChunk;
exports.chunk = chunk;
exports.chunkInstanceForTesting = chunkInstanceForTesting;
exports.deactivateChunking = deactivateChunking;
exports.activateChunkingForTesting = activateChunkingForTesting;
exports.runChunksForTesting = runChunksForTesting;
exports.onIdle = onIdle;

var _priorityQueue = require('./utils/priority-queue');

var _priorityQueue2 = _interopRequireDefault(_priorityQueue);

var _log = require('./log');

var _eventHelper = require('./event-helper');

var _service = require('./service');

var _styleInstaller = require('./style-installer');

var _services = require('./services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

/**
 * @const {string}
 */
var TAG = 'CHUNK';

/**
 * @type {boolean}
 */
var deactivated = /nochunking=1/.test(self.location.hash);

/**
 * @const {!Promise}
 */
var resolved = Promise.resolve();

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrAmpDoc
 * @return {!Chunks}
 * @private
 */
function getChunkServiceForDoc_(nodeOrAmpDoc) {
  (0, _service.registerServiceBuilderForDoc)(nodeOrAmpDoc, 'chunk', Chunks);
  return (0, _service.getServiceForDoc)(nodeOrAmpDoc, 'chunk');
}

/**
 * Run the given function. For visible documents the function will be
 * called in a micro task (Essentially ASAP). If the document is
 * not visible, tasks will yield to the event loop (to give the browser
 * time to do other things) and may even be further delayed until
 * there is time.
 *
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrAmpDoc
 * @param {function(?IdleDeadline)} fn
 */
function startupChunk(nodeOrAmpDoc, fn) {
  if (deactivated) {
    resolved.then(fn);
    return;
  }
  var service = getChunkServiceForDoc_(nodeOrAmpDoc);
  service.runForStartup_(fn);
}

/**
 * Run the given function sometime in the future without blocking UI.
 *
 * Higher priority tasks are executed before lower priority tasks.
 * Tasks with the same priority are executed in FIFO order.
 *
 * Uses `requestIdleCallback` if available and passes the `IdleDeadline`
 * object to the function, which can be used to perform a variable amount
 * of work depending on the remaining amount of idle time.
 *
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrAmpDoc
 * @param {function(?IdleDeadline)} fn
 * @param {ChunkPriority} priority
 */
function chunk(nodeOrAmpDoc, fn, priority) {
  if (deactivated) {
    resolved.then(fn);
    return;
  }
  var service = getChunkServiceForDoc_(nodeOrAmpDoc);
  service.run(fn, priority);
}

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrAmpDoc
 * @return {!Chunks}
 */
function chunkInstanceForTesting(nodeOrAmpDoc) {
  return getChunkServiceForDoc_(nodeOrAmpDoc);
}

/**
 * Use a standard micro task for every invocation. This should only
 * be called from the AMP bootstrap script if it is known that
 * chunking makes no sense. In particular this is the case when
 * AMP runs in the `amp-shadow` multi document mode.
 */
function deactivateChunking() {
  deactivated = true;
};

function activateChunkingForTesting() {
  deactivated = false;
};

/**
 * Runs all currently scheduled chunks.
 * Independent of errors it will unwind the queue. Will afterwards
 * throw the first encountered error.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrAmpDoc
 */
function runChunksForTesting(nodeOrAmpDoc) {
  var service = chunkInstanceForTesting(nodeOrAmpDoc);
  var errors = [];
  while (true) {
    try {
      if (!service.execute_( /* idleDeadline */null)) {
        break;
      }
    } catch (e) {
      errors.push(e);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}

/**
 * The priority of a chunk task. Higher priority tasks have higher values.
 * @enum {number}
 */
var ChunkPriority = exports.ChunkPriority = {
  HIGH: 20,
  LOW: 10,
  BACKGROUND: 0
};

/** @enum {string} */
var TaskState = {
  NOT_RUN: 'not_run',
  RUN: 'run'
};

/**
 * A default chunkable task.
 * @private
 */

var Task = function () {
  /**
   * @param {!function(?IdleDeadline)} fn
   */
  function Task(fn) {
    _classCallCheck(this, Task);

    /** @public {TaskState} */
    this.state = TaskState.NOT_RUN;

    /** @private @const {!function(?IdleDeadline)} */
    this.fn_ = fn;
  }

  /**
   * Executes the wrapped function.
   * @param {?IdleDeadline} idleDeadline
   * @throws {Error}
   * @private
   */


  Task.prototype.runTask_ = function runTask_(idleDeadline) {
    if (this.state == TaskState.RUN) {
      return;
    }
    this.state = TaskState.RUN;
    try {
      this.fn_(idleDeadline);
    } catch (e) {
      this.onTaskError_(e);
      throw e;
    }
  };

  /**
   * @return {string}
   * @private
   */


  Task.prototype.getName_ = function getName_() {
    return this.fn_.displayName || this.fn_.name;
  };

  /**
   * Optional handling when a task run throws an error.
   * @param {Error} unusedError
   * @private
   */


  Task.prototype.onTaskError_ = function onTaskError_(unusedError) {}
  // By default, no-op.


  /**
   * Returns true if this task should be run without delay.
   * @return {boolean}
   * @private
   */
  ;

  Task.prototype.immediateTriggerCondition_ = function immediateTriggerCondition_() {
    // By default, there are no immediate trigger conditions.
    return false;
  };

  /**
   * Returns true if this task should be scheduled using `requestIdleCallback`.
   * Otherwise, task is scheduled as macro-task on next event loop.
   * @return {boolean}
   * @private
   */


  Task.prototype.useRequestIdleCallback_ = function useRequestIdleCallback_() {
    // By default, always use requestIdleCallback.
    return true;
  };

  return Task;
}();

/**
 * A task that's run as part of AMP's startup sequence.
 * @private
 */


var StartupTask = function (_Task) {
  _inherits(StartupTask, _Task);

  /**
   * @param {!function(?IdleDeadline)} fn
   * @param {!Window} win
   * @param {!Promise<!./service/viewer-impl.Viewer>} viewerPromise
   */
  function StartupTask(fn, win, viewerPromise) {
    _classCallCheck(this, StartupTask);

    /** @private {!Window} */
    var _this = _possibleConstructorReturn(this, _Task.call(this, fn));

    _this.win_ = win;

    /** @private {?./service/viewer-impl.Viewer} */
    _this.viewer_ = null;

    viewerPromise.then(function (viewer) {
      _this.viewer_ = viewer;

      if (_this.viewer_.isVisible()) {
        _this.runTask_( /* idleDeadline */null);
      }
      _this.viewer_.onVisibilityChanged(function () {
        if (_this.viewer_.isVisible()) {
          _this.runTask_( /* idleDeadline */null);
        }
      });
    });
    return _this;
  }

  /** @override */


  StartupTask.prototype.onTaskError_ = function onTaskError_(unusedError) {
    // Startup tasks run early in init. All errors should show the doc.
    (0, _styleInstaller.makeBodyVisible)(self.document);
  };

  /** @override */


  StartupTask.prototype.immediateTriggerCondition_ = function immediateTriggerCondition_() {
    // Run in a micro task when the doc is visible. Otherwise, run after
    // having yielded to the event queue once.
    return this.isVisible_();
  };

  /** @override */


  StartupTask.prototype.useRequestIdleCallback_ = function useRequestIdleCallback_() {
    // We only start using requestIdleCallback when the viewer has
    // been initialized. Otherwise we risk starving ourselves
    // before we get into a state where the viewer can tell us
    // that we are visible.
    return !!this.viewer_;
  };

  /**
   * @return {boolean}
   * @private
   */


  StartupTask.prototype.isVisible_ = function isVisible_() {
    // Ask the viewer first.
    if (this.viewer_) {
      return this.viewer_.isVisible();
    }
    // There is no viewer yet. Lets try to guess whether we are visible.
    if (this.win_.document.hidden) {
      return false;
    }
    // Viewers send a URL param if we are not visible.
    return !/visibilityState=(hidden|prerender)/.test(this.win_.location.hash);
  };

  return StartupTask;
}(Task);

/**
 * Handles queueing, scheduling and executing tasks.
 */


var Chunks = function () {
  /**
   * @param {!./service/ampdoc-impl.AmpDoc} ampDoc
   */
  function Chunks(ampDoc) {
    var _this2 = this;

    _classCallCheck(this, Chunks);

    /** @private @const */
    this.ampDoc_ = ampDoc;
    /** @private @const {!Window} */
    this.win_ = ampDoc.win;
    /** @private @const {!PriorityQueue<Task>} */
    this.tasks_ = new _priorityQueue2.default();
    /** @private @const {function(?IdleDeadline)} */
    this.boundExecute_ = this.execute_.bind(this);

    /** @private @const {!Promise<!./service/viewer-impl.Viewer>} */
    this.viewerPromise_ = _services.Services.viewerPromiseForDoc(ampDoc);

    this.win_.addEventListener('message', function (e) {
      if ((0, _eventHelper.getData)(e) == 'amp-macro-task') {
        _this2.execute_( /* idleDeadline */null);
      }
    });
  }

  /**
   * Run fn as a "chunk".
   * @param {function(?IdleDeadline)} fn
   * @param {number} priority
   */


  Chunks.prototype.run = function run(fn, priority) {
    var t = new Task(fn);
    this.enqueueTask_(t, priority);
  };

  /**
   * Run a fn that's part of AMP's startup sequence as a "chunk".
   * @param {function(?IdleDeadline)} fn
   * @private
   */


  Chunks.prototype.runForStartup_ = function runForStartup_(fn) {
    var t = new StartupTask(fn, this.win_, this.viewerPromise_);
    this.enqueueTask_(t, Number.POSITIVE_INFINITY);
  };

  /**
   * Queues a task to be executed later with given priority.
   * @param {!Task} task
   * @param {number} priority
   * @private
   */


  Chunks.prototype.enqueueTask_ = function enqueueTask_(task, priority) {
    var _this3 = this;

    this.tasks_.enqueue(task, priority);
    resolved.then(function () {
      _this3.schedule_();
    });
  };

  /**
   * Returns the next task that hasn't been run yet.
   * If `opt_dequeue` is true, remove the returned task from the queue.
   * @param {boolean=} opt_dequeue
   * @return {?Task}
   * @private
   */


  Chunks.prototype.nextTask_ = function nextTask_(opt_dequeue) {
    var t = this.tasks_.peek();
    // Dequeue tasks until we find one that hasn't been run yet.
    while (t && t.state !== TaskState.NOT_RUN) {
      this.tasks_.dequeue();
      t = this.tasks_.peek();
    }
    // If `opt_dequeue` is true, remove this task from the queue.
    if (t && opt_dequeue) {
      this.tasks_.dequeue();
    }
    return t;
  };

  /**
   * Run a task.
   * Schedule the next round if there are more tasks.
   * @param {?IdleDeadline} idleDeadline
   * @return {boolean} Whether anything was executed.
   * @private
   */


  Chunks.prototype.execute_ = function execute_(idleDeadline) {
    var _this4 = this;

    var t = this.nextTask_( /* opt_dequeue */true);
    if (!t) {
      return false;
    }
    var before = Date.now();
    t.runTask_(idleDeadline);
    resolved.then(function () {
      _this4.schedule_();
    });
    (0, _log.dev)().fine(TAG, t.getName_(), 'Chunk duration', Date.now() - before);
    return true;
  };

  /**
   * Calls `execute_()` asynchronously.
   * @param {?IdleDeadline} idleDeadline
   * @private
   */


  Chunks.prototype.executeAsap_ = function executeAsap_(idleDeadline) {
    var _this5 = this;

    resolved.then(function () {
      _this5.boundExecute_(idleDeadline);
    });
  };

  /**
   * Schedule running the next queued task.
   * @private
   */


  Chunks.prototype.schedule_ = function schedule_() {
    var nextTask = this.nextTask_();
    if (!nextTask) {
      return;
    }
    if (nextTask.immediateTriggerCondition_()) {
      this.executeAsap_( /* idleDeadline */null);
      return;
    }
    // If requestIdleCallback exists, schedule a task with it, but
    // do not wait longer than two seconds.
    if (nextTask.useRequestIdleCallback_() && this.win_.requestIdleCallback) {
      onIdle(this.win_,
      // Wait until we have a budget of at least 15ms.
      // 15ms is a magic number. Budgets are higher when the user
      // is completely idle (around 40), but that occurs too
      // rarely to be usable. 15ms budgets can happen during scrolling
      // but only if the device is doing super, super well, and no
      // real processing is done between frames.
      15 /* minimumTimeRemaining */
      , 2000 /* timeout */
      , this.boundExecute_);
      return;
    }
    // The message doesn't actually matter.
    this.win_.postMessage /*OK*/('amp-macro-task', '*');
  };

  return Chunks;
}();

/**
 * Delays calling the given function until the browser is notifying us
 * about a certain minimum budget or the timeout is reached.
 * @param {!Window} win
 * @param {number} minimumTimeRemaining Minimum number of millis idle
 *     budget for callback to fire.
 * @param {number} timeout in millis for callback to fire.
 * @param {function(?IdleDeadline)} fn Callback.
 * @visibleForTesting
 */


function onIdle(win, minimumTimeRemaining, timeout, fn) {
  var startTime = Date.now();
  function rIC(info) {
    if (info.timeRemaining() < minimumTimeRemaining) {
      var remainingTimeout = timeout - (Date.now() - startTime);
      if (remainingTimeout <= 0 || info.didTimeout) {
        (0, _log.dev)().fine(TAG, 'Timed out', timeout, info.didTimeout);
        fn(info);
      } else {
        (0, _log.dev)().fine(TAG, 'Rescheduling with', remainingTimeout, info.timeRemaining());
        win.requestIdleCallback(rIC, { timeout: remainingTimeout });
      }
    } else {
      (0, _log.dev)().fine(TAG, 'Running idle callback with ', minimumTimeRemaining);
      fn(info);
    }
  }
  win.requestIdleCallback(rIC, { timeout: timeout });
}

},{"./event-helper":24,"./log":28,"./service":41,"./services":43,"./style-installer":46,"./utils/priority-queue":55}],18:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Allows for runtime configuration. Internally, the runtime should
 * use the src/config.js module for various constants. We can use the
 * AMP_CONFIG global to translate user-defined configurations to this
 * module.
 * @type {!Object<string, string>}
 */
var env = self.AMP_CONFIG || {};

var thirdPartyFrameRegex = typeof env['thirdPartyFrameRegex'] == 'string' ? new RegExp(env['thirdPartyFrameRegex']) : env['thirdPartyFrameRegex'];

var cdnProxyRegex = typeof env['cdnProxyRegex'] == 'string' ? new RegExp(env['cdnProxyRegex']) : env['cdnProxyRegex'];

/** @type {!Object<string, string|boolean|RegExp>} */
var urls = exports.urls = {
  thirdParty: env['thirdPartyUrl'] || 'https://3p.ampproject.net',
  thirdPartyFrameHost: env['thirdPartyFrameHost'] || 'ampproject.net',
  thirdPartyFrameRegex: thirdPartyFrameRegex || /^d-\d+\.ampproject\.net$/,
  cdn: env['cdnUrl'] || 'https://cdn.ampproject.org',
  /* Note that cdnProxyRegex is only ever checked against origins
   * (proto://host[:port]) so does not need to consider path
   */
  cdnProxyRegex: cdnProxyRegex || /^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/,
  localhostRegex: /^https?:\/\/localhost(:\d+)?$/,
  errorReporting: env['errorReportingUrl'] || 'https://amp-error-reporting.appspot.com/r',
  localDev: env['localDev'] || false
};

},{}],19:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
exports.setCookie = setCookie;

var _url = require('./url');

var _string = require('./string');

var _config = require('./config');

/**
 * Returns the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * Returns the cookie's value or `null`.
 *
 * @param {!Window} win
 * @param {string} name
 * @return {?string}
 */
function getCookie(win, name) {
  var cookieString = tryGetDocumentCookieNoInline(win);
  if (!cookieString) {
    return null;
  }
  var cookies = cookieString.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var eq = cookie.indexOf('=');
    if (eq == -1) {
      continue;
    }
    if ((0, _url.tryDecodeUriComponent)(cookie.substring(0, eq).trim()) == name) {
      var value = cookie.substring(eq + 1).trim();
      return (0, _url.tryDecodeUriComponent)(value, value);
    }
  }
  return null;
}

/**
 * This method should not be inlined to prevent TryCatch deoptimization.
 * NoInline keyword at the end of function name also prevents Closure compiler
 * from inlining the function.
 * @param {!Window} win
 * @return {string}
 */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function tryGetDocumentCookieNoInline(win) {
  try {
    return win.document.cookie;
  } catch (e) {
    // Act as if no cookie is available. Exceptions can be thrown when
    // AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
    return '';
  }
}

/**
 * Sets the value of the cookie. The cookie access is restricted and must
 * go through the privacy review. Before using this method please file a
 * GitHub issue with "Privacy Review" label.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {{
 *   highestAvailableDomain:(boolean|undefined),
 *   domain:(string|undefined)
 * }=} opt_options
 *     - highestAvailableDomain: If true, set the cookie at the widest domain
 *       scope allowed by the browser. E.g. on example.com if we are currently
 *       on www.example.com.
 *     - domain: Explicit domain to set.
 *     - allowOnProxyOrigin: Allow setting a cookie on the AMP Cache.
 */
function setCookie(win, name, value, expirationTime, opt_options) {
  checkOriginForSettingCookie(win, opt_options, name);
  if (opt_options && opt_options.highestAvailableDomain) {
    var parts = win.location.hostname.split('.');
    var _domain = parts[parts.length - 1];
    for (var i = parts.length - 2; i >= 0; i--) {
      _domain = parts[i] + '.' + _domain;
      trySetCookie(win, name, value, expirationTime, _domain);
      if (getCookie(win, name) == value) {
        return;
      }
    }
  }
  var domain = undefined;
  if (opt_options && opt_options.domain) {
    domain = opt_options.domain;
  }
  trySetCookie(win, name, value, expirationTime, domain);
}

/**
 * Attempt to set a cookie with the given params.
 *
 * @param {!Window} win
 * @param {string} name
 * @param {string} value
 * @param {time} expirationTime
 * @param {string|undefined} domain
 */
function trySetCookie(win, name, value, expirationTime, domain) {
  // We do not allow setting cookies on the domain that contains both
  // the cdn. and www. hosts.
  if (domain == 'ampproject.org') {
    // Actively delete them.
    value = 'delete';
    expirationTime = 0;
  }
  var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/' + (domain ? '; domain=' + domain : '') + '; expires=' + new Date(expirationTime).toUTCString();
  try {
    win.document.cookie = cookie;
  } catch (ignore) {
    // Do not throw if setting the cookie failed Exceptions can be thrown
    // when AMP docs are opened on origins that do not allow setting
    // cookies such as null origins.
  };
}

/**
 * Throws if a given cookie should not be set on the given origin.
 * This is a defense-in-depth. Callers should never run into this.
 *
 * @param {!Window} win
 * @param {!Object|undefined} options
 * @param {string} name For the error message.
 */
function checkOriginForSettingCookie(win, options, name) {
  if (options && options.allowOnProxyOrigin) {
    return;
  }
  if ((0, _url.isProxyOrigin)(win.location.href)) {
    throw new Error('Should never attempt to set cookie on proxy origin: ' + name);
  }

  var current = (0, _url.parseUrl)(win.location.href).hostname.toLowerCase();
  var proxy = (0, _url.parseUrl)(_config.urls.cdn).hostname.toLowerCase();
  if (current == proxy || (0, _string.endsWith)(current, '.' + proxy)) {
    throw new Error('Should never attempt to set cookie on proxy origin.' + ' (in depth check): ' + name);
  }
}

},{"./config":18,"./string":45,"./url":51}],20:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPGRADE_TO_CUSTOMELEMENT_RESOLVER = exports.UPGRADE_TO_CUSTOMELEMENT_PROMISE = undefined;
exports.waitForChild = waitForChild;
exports.waitForChildPromise = waitForChildPromise;
exports.waitForBody = waitForBody;
exports.waitForBodyPromise = waitForBodyPromise;
exports.removeElement = removeElement;
exports.removeChildren = removeChildren;
exports.copyChildren = copyChildren;
exports.insertAfterOrAtStart = insertAfterOrAtStart;
exports.addAttributesToElement = addAttributesToElement;
exports.createElementWithAttributes = createElementWithAttributes;
exports.isConnectedNode = isConnectedNode;
exports.rootNodeFor = rootNodeFor;
exports.closest = closest;
exports.closestNode = closestNode;
exports.closestByTag = closestByTag;
exports.closestBySelector = closestBySelector;
exports.matches = matches;
exports.elementByTag = elementByTag;
exports.childElement = childElement;
exports.childElements = childElements;
exports.lastChildElement = lastChildElement;
exports.childNodes = childNodes;
exports.setScopeSelectorSupportedForTesting = setScopeSelectorSupportedForTesting;
exports.childElementByAttr = childElementByAttr;
exports.lastChildElementByAttr = lastChildElementByAttr;
exports.childElementsByAttr = childElementsByAttr;
exports.childElementByTag = childElementByTag;
exports.childElementsByTag = childElementsByTag;
exports.scopedQuerySelector = scopedQuerySelector;
exports.scopedQuerySelectorAll = scopedQuerySelectorAll;
exports.getDataParamsFromAttributes = getDataParamsFromAttributes;
exports.hasNextNodeInDocumentOrder = hasNextNodeInDocumentOrder;
exports.ancestorElements = ancestorElements;
exports.ancestorElementsByTag = ancestorElementsByTag;
exports.iterateCursor = iterateCursor;
exports.openWindowDialog = openWindowDialog;
exports.isJsonScriptTag = isJsonScriptTag;
exports.isJsonLdScriptTag = isJsonLdScriptTag;
exports.isRTL = isRTL;
exports.escapeCssSelectorIdent = escapeCssSelectorIdent;
exports.escapeHtml = escapeHtml;
exports.tryFocus = tryFocus;
exports.isIframed = isIframed;
exports.isAmpElement = isAmpElement;
exports.whenUpgradedToCustomElement = whenUpgradedToCustomElement;
exports.fullscreenEnter = fullscreenEnter;
exports.fullscreenExit = fullscreenExit;
exports.isFullscreenElement = isFullscreenElement;
exports.isEnabled = isEnabled;

var _log = require('./log');

var _object = require('./utils/object');

var _cssEscape = require('../third_party/css-escape/css-escape');

var _string = require('./string');

var _types = require('./types');

var HTML_ESCAPE_CHARS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
}; /**
    * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *      http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS-IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */

var HTML_ESCAPE_REGEX = /(&|<|>|"|'|`)/g;

/** @const {string} */
var UPGRADE_TO_CUSTOMELEMENT_PROMISE = exports.UPGRADE_TO_CUSTOMELEMENT_PROMISE = '__AMP_UPG_PRM';

/** @const {string} */
var UPGRADE_TO_CUSTOMELEMENT_RESOLVER = exports.UPGRADE_TO_CUSTOMELEMENT_RESOLVER = '__AMP_UPG_RES';

/**
 * Waits until the child element is constructed. Once the child is found, the
 * callback is executed.
 * @param {!Element} parent
 * @param {function(!Element):boolean} checkFunc
 * @param {function()} callback
 */
function waitForChild(parent, checkFunc, callback) {
  if (checkFunc(parent)) {
    callback();
    return;
  }
  /** @const {!Window} */
  var win = (0, _types.toWin)(parent.ownerDocument.defaultView);
  if (win.MutationObserver) {
    /** @const {MutationObserver} */
    var observer = new win.MutationObserver(function () {
      if (checkFunc(parent)) {
        observer.disconnect();
        callback();
      }
    });
    observer.observe(parent, { childList: true });
  } else {
    /** @const {number} */
    var interval = win.setInterval(function () {
      if (checkFunc(parent)) {
        win.clearInterval(interval);
        callback();
      }
    }, /* milliseconds */5);
  }
}

/**
 * Waits until the child element is constructed. Once the child is found, the
 * promise is resolved.
 * @param {!Element} parent
 * @param {function(!Element):boolean} checkFunc
 * @return {!Promise}
 */
function waitForChildPromise(parent, checkFunc) {
  return new Promise(function (resolve) {
    waitForChild(parent, checkFunc, resolve);
  });
}

/**
 * Waits for document's body to be available.
 * Will be deprecated soon; use {@link AmpDoc#whenBodyAvailable} or
 * @{link DocumentState#onBodyAvailable} instead.
 * @param {!Document} doc
 * @param {function()} callback
 */
function waitForBody(doc, callback) {
  waitForChild(doc.documentElement, function () {
    return !!doc.body;
  }, callback);
}

/**
 * Waits for document's body to be available.
 * @param {!Document} doc
 * @return {!Promise}
 */
function waitForBodyPromise(doc) {
  return new Promise(function (resolve) {
    waitForBody(doc, resolve);
  });
}

/**
 * Removes the element.
 * @param {!Element} element
 */
function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}

/**
 * Removes all child nodes of the specified element.
 * @param {!Element} parent
 */
function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Copies all children nodes of element "from" to element "to". Child nodes
 * are deeply cloned. Notice, that this method should be used with care and
 * preferably on smaller subtrees.
 * @param {!Element} from
 * @param {!Element} to
 */
function copyChildren(from, to) {
  var frag = to.ownerDocument.createDocumentFragment();
  for (var n = from.firstChild; n; n = n.nextSibling) {
    frag.appendChild(n.cloneNode(true));
  }
  to.appendChild(frag);
}

/**
 * Insert the element in the root after the element named after or
 * if that is null at the beginning.
 * @param {!Element|!ShadowRoot} root
 * @param {!Element} element
 * @param {?Node} after
 */
function insertAfterOrAtStart(root, element, after) {
  if (after) {
    if (after.nextSibling) {
      root.insertBefore(element, after.nextSibling);
    } else {
      root.appendChild(element);
    }
  } else {
    // Add at the start.
    root.insertBefore(element, root.firstChild);
  }
}

/**
 * Add attributes to an element.
 * @param {!Element} element
 * @param {!JsonObject<string, string>} attributes
 * @return {!Element} created element
 */
function addAttributesToElement(element, attributes) {
  for (var attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

/**
 * Create a new element on document with specified tagName and attributes.
 * @param {!Document} doc
 * @param {string} tagName
 * @param {!JsonObject<string, string>} attributes
 * @return {!Element} created element
 */
function createElementWithAttributes(doc, tagName, attributes) {
  var element = doc.createElement(tagName);
  return addAttributesToElement(element, attributes);
}

/**
 * Returns true if node is connected (attached).
 * @param {!Node} node
 * @return {boolean}
 * @see https://dom.spec.whatwg.org/#connected
 */
function isConnectedNode(node) {
  // "An element is connected if its shadow-including root is a document."
  var n = node;
  do {
    n = rootNodeFor(n);
    if (n.host) {
      n = n.host;
    } else {
      break;
    }
  } while (true);
  return n.nodeType === Node.DOCUMENT_NODE;
}

/**
 * Returns the root for a given node. Does not cross shadow DOM boundary.
 * @param {!Node} node
 * @return {!Node}
 */
function rootNodeFor(node) {
  if (Node.prototype.getRootNode) {
    // Type checker says `getRootNode` may return null.
    return node.getRootNode() || node;
  }
  var n = void 0;
  for (n = node; !!n.parentNode; n = n.parentNode) {}
  return n;
}

/**
 * Finds the closest element that satisfies the callback from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {function(!Element):boolean} callback
 * @param {Element=} opt_stopAt optional elemnt to stop the search at.
 * @return {?Element}
 */
function closest(element, callback, opt_stopAt) {
  for (var el = element; el && el !== opt_stopAt; el = el.parentElement) {
    if (callback(el)) {
      return el;
    }
  }
  return null;
}

/**
 * Finds the closest node that satisfies the callback from this node
 * up the DOM subtree.
 * @param {!Node} node
 * @param {function(!Node):boolean} callback
 * @return {?Node}
 */
function closestNode(node, callback) {
  for (var n = node; n; n = n.parentNode) {
    if (callback(n)) {
      return n;
    }
  }
  return null;
}

/**
 * Finds the closest element with the specified name from this element
 * up the DOM subtree.
 * @param {!Element} element
 * @param {string} tagName
 * @return {?Element}
 */
function closestByTag(element, tagName) {
  if (element.closest) {
    return element.closest(tagName);
  }
  tagName = tagName.toUpperCase();
  return closest(element, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Finds the closest element with the specified selector from this element
 * @param {!Element} element
 * @param {string} selector
 * @return {?Element} closest ancestor if found.
 */
function closestBySelector(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  return closest(element, function (el) {
    return matches(el, selector);
  });
}

/**
 * Checks if the given element matches the selector
 * @param  {!Element} el The element to verify
 * @param  {!string} selector The selector to check against
 * @return {boolean} True if the element matched the selector. False otherwise.
 */
function matches(el, selector) {
  var matcher = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector;
  if (matcher) {
    return matcher.call(el, selector);
  }
  return false; // IE8 always returns false.
}

/**
 * Finds the first descendant element with the specified name.
 * @param {!Element|!Document|!ShadowRoot} element
 * @param {string} tagName
 * @return {?Element}
 */
function elementByTag(element, tagName) {
  var elements = element.getElementsByTagName(tagName);
  return elements[0] || null;
}

/**
 * Finds the first child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */
function childElement(parent, callback) {
  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      return child;
    }
  }
  return null;
}

/**
 * Finds all child elements that satisfy the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {!Array<!Element>}
 */
function childElements(parent, callback) {
  var children = [];
  for (var child = parent.firstElementChild; child; child = child.nextElementSibling) {
    if (callback(child)) {
      children.push(child);
    }
  }
  return children;
}

/**
 * Finds the last child element that satisfies the callback.
 * @param {!Element} parent
 * @param {function(!Element):boolean} callback
 * @return {?Element}
 */
function lastChildElement(parent, callback) {
  for (var child = parent.lastElementChild; child; child = child.previousElementSibling) {
    if (callback(child)) {
      return child;
    }
  }
  return null;
}

/**
 * Finds all child nodes that satisfy the callback.
 * These nodes can include Text, Comment and other child nodes.
 * @param {!Node} parent
 * @param {function(!Node):boolean} callback
 * @return {!Array<!Node>}
 */
function childNodes(parent, callback) {
  var nodes = [];
  for (var child = parent.firstChild; child; child = child.nextSibling) {
    if (callback(child)) {
      nodes.push(child);
    }
  }
  return nodes;
}

/**
 * @type {boolean|undefined}
 * @visibleForTesting
 */
var scopeSelectorSupported = void 0;

/**
 * @param {boolean|undefined} val
 * @visibleForTesting
 */
function setScopeSelectorSupportedForTesting(val) {
  scopeSelectorSupported = val;
}

/**
 * Test that the :scope selector is supported and behaves correctly.
 * @param {!Element} parent
 * @return {boolean}
 */
function isScopeSelectorSupported(parent) {
  var doc = parent.ownerDocument;
  try {
    var testElement = doc.createElement('div');
    var testChild = doc.createElement('div');
    testElement.appendChild(testChild);
    // NOTE(cvializ, #12383): Firefox's implementation is incomplete,
    // therefore we test actual functionality of`:scope` as well.
    return testElement. /*OK*/querySelector(':scope div') === testChild;
  } catch (e) {
    return false;
  }
}

/**
 * Finds the first child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */
function childElementByAttr(parent, attr) {
  return scopedQuerySelector(parent, '> [' + attr + ']');
}

/**
 * Finds the last child element that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {?Element}
 */
function lastChildElementByAttr(parent, attr) {
  return lastChildElement(parent, function (el) {
    return el.hasAttribute(attr);
  });
}

/**
 * Finds all child elements that has the specified attribute.
 * @param {!Element} parent
 * @param {string} attr
 * @return {!NodeList<!Element>}
 */
function childElementsByAttr(parent, attr) {
  return scopedQuerySelectorAll(parent, '> [' + attr + ']');
}

/**
 * Finds the first child element that has the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {?Element}
 */
function childElementByTag(parent, tagName) {
  return scopedQuerySelector(parent, '> ' + tagName);
}

/**
 * Finds all child elements with the specified tag name.
 * @param {!Element} parent
 * @param {string} tagName
 * @return {!NodeList<!Element>}
 */
function childElementsByTag(parent, tagName) {
  return scopedQuerySelectorAll(parent, '> ' + tagName);
}

/**
 * Finds the first element that matches `selector`, scoped inside `root`.
 * Note: in IE, this causes a quick mutation of the element's class list.
 * @param {!Element} root
 * @param {string} selector
 * @return {?Element}
 */
function scopedQuerySelector(root, selector) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(root);
  }
  if (scopeSelectorSupported) {
    return root. /*OK*/querySelector(':scope ' + selector);
  }

  // Only IE.
  var unique = 'i-amphtml-scoped';
  root.classList.add(unique);
  var element = root. /*OK*/querySelector('.' + unique + ' ' + selector);
  root.classList.remove(unique);
  return element;
}

/**
 * Finds the every element that matches `selector`, scoped inside `root`.
 * Note: in IE, this causes a quick mutation of the element's class list.
 * @param {!Element} root
 * @param {string} selector
 * @return {!NodeList<!Element>}
 */
function scopedQuerySelectorAll(root, selector) {
  if (scopeSelectorSupported == null) {
    scopeSelectorSupported = isScopeSelectorSupported(root);
  }
  if (scopeSelectorSupported) {
    return root. /*OK*/querySelectorAll(':scope ' + selector);
  }

  // Only IE.
  var unique = 'i-amphtml-scoped';
  root.classList.add(unique);
  var elements = root. /*OK*/querySelectorAll('.' + unique + ' ' + selector);
  root.classList.remove(unique);
  return elements;
}

/**
 * Returns element data-param- attributes as url parameters key-value pairs.
 * e.g. data-param-some-attr=value -> {someAttr: value}.
 * @param {!Element} element
 * @param {function(string):string=} opt_computeParamNameFunc to compute the parameter
 *    name, get passed the camel-case parameter name.
 * @param {!RegExp=} opt_paramPattern Regex pattern to match data attributes.
 * @return {!JsonObject}
 */
function getDataParamsFromAttributes(element, opt_computeParamNameFunc, opt_paramPattern) {
  var computeParamNameFunc = opt_computeParamNameFunc || function (key) {
    return key;
  };
  var dataset = element.dataset;
  var params = (0, _object.dict)();
  var paramPattern = opt_paramPattern ? opt_paramPattern : /^param(.+)/;
  for (var key in dataset) {
    var _matches = key.match(paramPattern);
    if (_matches) {
      var param = _matches[1][0].toLowerCase() + _matches[1].substr(1);
      params[computeParamNameFunc(param)] = dataset[key];
    }
  }
  return params;
}

/**
 * Whether the element have a next node in the document order.
 * This means either:
 *  a. The element itself has a nextSibling.
 *  b. Any of the element ancestors has a nextSibling.
 * @param {!Element} element
 * @param {?Node} opt_stopNode
 * @return {boolean}
 */
function hasNextNodeInDocumentOrder(element, opt_stopNode) {
  var currentElement = element;
  do {
    if (currentElement.nextSibling) {
      return true;
    }
  } while ((currentElement = currentElement.parentNode) && currentElement != opt_stopNode);
  return false;
}

/**
 * Finds all ancestor elements that satisfy predicate.
 * @param {!Element} child
 * @param {function(!Element):boolean} predicate
 * @return {!Array<!Element>}
 */
function ancestorElements(child, predicate) {
  var ancestors = [];
  for (var ancestor = child.parentElement; ancestor; ancestor = ancestor.parentElement) {
    if (predicate(ancestor)) {
      ancestors.push(ancestor);
    }
  }
  return ancestors;
}

/**
 * Finds all ancestor elements that has the specified tag name.
 * @param {!Element} child
 * @param {string} tagName
 * @return {!Array<!Element>}
 */
function ancestorElementsByTag(child, tagName) {
  tagName = tagName.toUpperCase();
  return ancestorElements(child, function (el) {
    return el.tagName == tagName;
  });
}

/**
 * Iterate over an array-like. Some collections like NodeList are
 * lazily evaluated in some browsers, and accessing `length` forces full
 * evaluation. We can improve performance by iterating until an element is
 * `undefined` to avoid checking the `length` property.
 * Test cases: https://jsperf.com/iterating-over-collections-of-elements
 * @param {!IArrayLike<T>} iterable
 * @param {!function(T, number)} cb
 * @template T
 */
function iterateCursor(iterable, cb) {
  for (var i = 0, value; (value = iterable[i]) !== undefined; i++) {
    cb(value, i);
  }
}

/**
 * This method wraps around window's open method. It first tries to execute
 * `open` call with the provided target and if it fails, it retries the call
 * with the `_top` target. This is necessary given that in some embedding
 * scenarios, such as iOS' WKWebView, navigation to `_blank` and other targets
 * is blocked by default.
 *
 * @param {!Window} win
 * @param {string} url
 * @param {string} target
 * @param {string=} opt_features
 * @return {?Window}
 */
function openWindowDialog(win, url, target, opt_features) {
  // Try first with the specified target. If we're inside the WKWebView or
  // a similar environments, this method is expected to fail by default for
  // all targets except `_top`.
  var res = void 0;
  try {
    res = win.open(url, target, opt_features);
  } catch (e) {
    (0, _log.dev)().error('DOM', 'Failed to open url on target: ', target, e);
  }

  // Then try with `_top` target.
  if (!res && target != '_top') {
    res = win.open(url, '_top');
  }
  return res;
}

/**
 * Whether the element is a script tag with application/json type.
 * @param {!Element} element
 * @return {boolean}
 */
function isJsonScriptTag(element) {
  return element.tagName == 'SCRIPT' && element.getAttribute('type').toUpperCase() == 'APPLICATION/JSON';
}

/**
 * Whether the element is a script tag with application/json type.
 * @param {!Element} element
 * @return {boolean}
 */
function isJsonLdScriptTag(element) {
  return element.tagName == 'SCRIPT' && element.getAttribute('type').toUpperCase() == 'APPLICATION/LD+JSON';
}

/**
 * Whether the page's direction is right to left or not.
 * @param {!Document} doc
 * @return {boolean}
 */
function isRTL(doc) {
  var dir = doc.body.getAttribute('dir') || doc.documentElement.getAttribute('dir') || 'ltr';
  return dir == 'rtl';
}

/**
 * Escapes an ident (ID or a class name) to be used as a CSS selector.
 *
 * See https://drafts.csswg.org/cssom/#serialize-an-identifier.
 *
 * @param {!Window} win
 * @param {string} ident
 * @return {string}
 */
function escapeCssSelectorIdent(win, ident) {
  if (win.CSS && win.CSS.escape) {
    return win.CSS.escape(ident);
  }
  // Polyfill.
  return (0, _cssEscape.cssEscape)(ident);
}

/**
 * Escapes `<`, `>` and other HTML charcaters with their escaped forms.
 * @param {string} text
 * @return {string}
 */
function escapeHtml(text) {
  if (!text) {
    return text;
  }
  return text.replace(HTML_ESCAPE_REGEX, escapeHtmlChar);
}

/**
 * @param {string} c
 * @return string
 */
function escapeHtmlChar(c) {
  return HTML_ESCAPE_CHARS[c];
}

/**
 * Tries to focus on the given element; fails silently if browser throws an
 * exception.
 * @param {!Element} element
 */
function tryFocus(element) {
  try {
    element. /*OK*/focus();
  } catch (e) {
    // IE <= 7 may throw exceptions when focusing on hidden items.
  }
}

/**
 * Whether the given window is in an iframe or not.
 * @param {!Window} win
 * @return {boolean}
 */
function isIframed(win) {
  return win.parent && win.parent != win;
}

/**
 * Determines if this element is an AMP element
 * @param {!Element} element
 * @return {boolean}
 */
function isAmpElement(element) {
  var tag = element.tagName;
  // Use prefix to recognize AMP element. This is necessary because stub
  // may not be attached yet.
  return (0, _string.startsWith)(tag, 'AMP-') &&
  // Some "amp-*" elements are not really AMP elements. :smh:
  !(tag == 'AMP-STICKY-AD-TOP-PADDING' || tag == 'AMP-BODY');
}

/**
 * Return a promise that resolve when an AMP element upgrade from HTMLElement
 * to CustomElement
 * @param {!Element} element
 * @return {!Promise<!Element>}
 */
function whenUpgradedToCustomElement(element) {
  (0, _log.dev)().assert(isAmpElement(element), 'element is not AmpElement');
  if (element.createdCallback) {
    // Element already is CustomElement;
    return Promise.resolve(element);
  }
  // If Element is still HTMLElement, wait for it to upgrade to customElement
  // Note: use pure string to avoid obfuscation between versions.
  if (!element[UPGRADE_TO_CUSTOMELEMENT_PROMISE]) {
    element[UPGRADE_TO_CUSTOMELEMENT_PROMISE] = new Promise(function (resolve) {
      element[UPGRADE_TO_CUSTOMELEMENT_RESOLVER] = resolve;
    });
  }

  return element[UPGRADE_TO_CUSTOMELEMENT_PROMISE];
}

/**
 * Replacement for `Element.requestFullscreen()` method.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
 * @param {!Element} element
 */
function fullscreenEnter(element) {
  var requestFs = element.requestFullscreen || element.requestFullScreen || element.webkitRequestFullscreen || element.webkitRequestFullScreen || element.webkitEnterFullscreen || element.webkitEnterFullScreen || element.msRequestFullscreen || element.msRequestFullScreen || element.mozRequestFullscreen || element.mozRequestFullScreen;
  if (requestFs) {
    requestFs.call(element);
  }
}

/**
 * Replacement for `Document.exitFullscreen()` method.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen
 * @param {!Element} element
 */
function fullscreenExit(element) {
  var exitFs = element.cancelFullScreen || element.exitFullscreen || element.exitFullScreen || element.webkitExitFullscreen || element.webkitExitFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msExitFullscreen;
  if (exitFs) {
    exitFs.call(element);
    return;
  }
  if (element.ownerDocument) {
    exitFs = element.ownerDocument.cancelFullScreen || element.ownerDocument.exitFullscreen || element.ownerDocument.exitFullScreen || element.ownerDocument.webkitExitFullscreen || element.ownerDocument.webkitExitFullScreen || element.ownerDocument.webkitCancelFullScreen || element.ownerDocument.mozCancelFullScreen || element.ownerDocument.msExitFullscreen;
  }
  if (exitFs) {
    exitFs.call(element.ownerDocument);
    return;
  }
}

/**
 * Replacement for `Document.fullscreenElement`.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement
 * @param {!Element} element
 * @return {boolean}
 */
function isFullscreenElement(element) {
  var isFullscreen = element.webkitDisplayingFullscreen;
  if (isFullscreen) {
    return true;
  }
  if (element.ownerDocument) {
    var fullscreenElement = element.ownerDocument.fullscreenElement || element.ownerDocument.webkitFullscreenElement || element.ownerDocument.mozFullScreenElement || element.webkitCurrentFullScreenElement;
    if (fullscreenElement == element) {
      return true;
    }
  }
  return false;
}

/**
 * Returns true if node is not disabled.
 *
 * IE8 can return false positives, see {@link matches}.
 * @param {!Element} element
 * @return {boolean}
 * @see https://www.w3.org/TR/html5/forms.html#concept-fe-disabled
 */
function isEnabled(element) {
  return !(element.disabled || matches(element, ':disabled'));
}

},{"../third_party/css-escape/css-escape":59,"./log":28,"./string":45,"./types":48,"./utils/object":54}],21:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementService = getElementService;
exports.getElementServiceIfAvailable = getElementServiceIfAvailable;
exports.getElementServiceForDoc = getElementServiceForDoc;
exports.getElementServiceIfAvailableForDoc = getElementServiceIfAvailableForDoc;
exports.getElementServiceIfAvailableForDocInEmbedScope = getElementServiceIfAvailableForDocInEmbedScope;

var _service = require('./service');

var _log = require('./log');

var _dom = require('./dom');

var dom = _interopRequireWildcard(_dom);

var _types = require('./types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * Services.viewportForDoc(...)) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an
 *     element, not the extension.
 * @return {!Promise<*>}
 */
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getElementService(win, id, extension, opt_element) {
  return getElementServiceIfAvailable(win, id, extension, opt_element).then(function (service) {
    return assertService(service, id, extension);
  });
}

/**
 * Same as getElementService but produces null if the given element is not
 * actually available on the current page.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an
 *     element, not the extension.
 * @return {!Promise<?Object>}
 */
function getElementServiceIfAvailable(win, id, extension, opt_element) {
  var s = (0, _service.getServicePromiseOrNull)(win, id);
  if (s) {
    return (/** @type {!Promise<?Object>} */s
    );
  }
  return getElementServicePromiseOrNull(win, id, extension, opt_element);
}

/**
 * @param {!Window} win
 * @param {string} elementName Name of an extended custom element.
 * @return {boolean} Whether this element is scheduled to be loaded.
 */
function isElementScheduled(win, elementName) {
  // Set in custom-element.js
  if (!win.ampExtendedElements) {
    return false;
  }
  return !!win.ampExtendedElements[elementName];
}

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * Services.viewportForDoc(...)) for type safety and because the factory should not be
 * passed around.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an
 *     element, not the extension.
 * @return {!Promise<*>}
 */
function getElementServiceForDoc(nodeOrDoc, id, extension, opt_element) {
  return getElementServiceIfAvailableForDoc(nodeOrDoc, id, extension, opt_element).then(function (service) {
    return assertService(service, id, extension);
  });
}

/**
 * Same as getElementService but produces null if the given element is not
 * actually available on the current page.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {string} extension Name of the custom extension that provides the
 *     implementation of this service.
 * @param {boolean=} opt_element Whether this service is provided by an
 *     element, not the extension.
 * @return {!Promise<?Object>}
 */
function getElementServiceIfAvailableForDoc(nodeOrDoc, id, extension, opt_element) {
  var ampdoc = (0, _service.getAmpdoc)(nodeOrDoc);
  var s = (0, _service.getServicePromiseOrNullForDoc)(nodeOrDoc, id);
  if (s) {
    return (/** @type {!Promise<?Object>} */s
    );
  }
  // Microtask is necessary to ensure that window.ampExtendedElements has been
  // initialized.
  return Promise.resolve().then(function () {
    if (!opt_element && isElementScheduled(ampdoc.win, extension)) {
      return (0, _service.getServicePromiseForDoc)(nodeOrDoc, id);
    }
    // Wait for HEAD to fully form before denying access to the service.
    return ampdoc.whenBodyAvailable().then(function () {
      // If this service is provided by an element, then we can't depend on the
      // service (they may not use the element).
      if (opt_element) {
        return (0, _service.getServicePromiseOrNullForDoc)(nodeOrDoc, id);
      } else if (isElementScheduled(ampdoc.win, extension)) {
        return (0, _service.getServicePromiseForDoc)(nodeOrDoc, id);
      }
      return null;
    });
  });
}

/**
 * Returns a promise for service for the given id in the embed scope of
 * a given node, if it exists. Otherwise, falls back to ampdoc scope IFF
 * the given node is in the top-level window.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {string} extension Name of the custom element that provides
 *     the implementation of this service.
 * @return {!Promise<?Object>}
 */
function getElementServiceIfAvailableForDocInEmbedScope(nodeOrDoc, id, extension) {
  var s = (0, _service.getExistingServiceForDocInEmbedScope)(nodeOrDoc, id);
  if (s) {
    return (/** @type {!Promise<?Object>} */Promise.resolve(s)
    );
  }
  // Return embed-scope element service promise if scheduled.
  if (nodeOrDoc.nodeType) {
    var win = (0, _types.toWin)( /** @type {!Document} */(nodeOrDoc.ownerDocument || nodeOrDoc).defaultView);
    var topWin = (0, _service.getTopWindow)(win);
    // In embeds, doc-scope services are window-scope. But make sure to
    // only do this for embeds (not the top window), otherwise we'd grab
    // a promise from the wrong service holder which would never resolve.
    if (win !== topWin) {
      return getElementServicePromiseOrNull(win, id, extension);
    } else {
      // Fallback to ampdoc IFF the given node is _not_ FIE.
      return getElementServiceIfAvailableForDoc(nodeOrDoc, id, extension);
    }
  }
  return (/** @type {!Promise<?Object>} */Promise.resolve(null)
  );
}

/**
 * Throws user error if `service` is null.
 * @param {Object} service
 * @param {string} id
 * @param {string} extension
 * @return {!Object}
 * @private
 */
function assertService(service, id, extension) {
  return (/** @type {!Object} */(0, _log.user)().assert(service, 'Service %s was requested to be provided through %s, ' + 'but %s is not loaded in the current page. To fix this ' + 'problem load the JavaScript file for %s in this page.', id, extension, extension, extension)
  );
}

/**
 * Returns the promise for service with `id` on the given window if available.
 * Otherwise, resolves with null (service was not registered).
 * @param {!Window} win
 * @param {string} id
 * @param {string} extension
 * @param {boolean=} opt_element
 * @return {!Promise<Object>}
 * @private
 */
function getElementServicePromiseOrNull(win, id, extension, opt_element) {
  // Microtask is necessary to ensure that window.ampExtendedElements has been
  // initialized.
  return Promise.resolve().then(function () {
    if (!opt_element && isElementScheduled(win, extension)) {
      return (0, _service.getServicePromise)(win, id);
    }
    // Wait for HEAD to fully form before denying access to the service.
    return dom.waitForBodyPromise(win.document).then(function () {
      // If this service is provided by an element, then we can't depend on the
      // service (they may not use the element).
      if (opt_element) {
        return (0, _service.getServicePromiseOrNull)(win, id);
      } else if (isElementScheduled(win, extension)) {
        return (0, _service.getServicePromise)(win, id);
      }
      return null;
    });
  });
}

},{"./dom":20,"./log":28,"./service":41,"./types":48}],22:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportErrorForWin = reportErrorForWin;
exports.reportError = reportError;
exports.cancellation = cancellation;
exports.isCancellation = isCancellation;
exports.installErrorReporting = installErrorReporting;
exports.getErrorReportData = getErrorReportData;
exports.detectNonAmpJs = detectNonAmpJs;
exports.resetAccumulatedErrorMessagesForTesting = resetAccumulatedErrorMessagesForTesting;
exports.detectJsEngineFromStack = detectJsEngineFromStack;
exports.reportErrorToAnalytics = reportErrorToAnalytics;

var _mode = require('./mode');

var _exponentialBackoff = require('./exponential-backoff');

var _eventHelper = require('./event-helper');

var _log = require('./log');

var _url = require('./url');

var _experiments = require('./experiments');

var _styleInstaller = require('./style-installer');

var _string = require('./string');

var _config = require('./config');

var _ampEvents = require('./amp-events');

var _analytics = require('./analytics');

var _services = require('./services');

/**
 * @const {string}
 */
var CANCELLED = 'CANCELLED';

/**
 * The threshold for errors throttled because nothing can be done about
 * them, but we'd still like to report the rough number.
 * @const {number}
 */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var NON_ACTIONABLE_ERROR_THROTTLE_THRESHOLD = 0.001;

/**
 * The threshold for errors throttled because nothing can be done about
 * them, but we'd still like to report the rough number.
 * @const {number}
 */
var USER_ERROR_THROTTLE_THRESHOLD = 0.1;

/**
 * Collects error messages, so they can be included in subsequent reports.
 * That allows identifying errors that might be caused by previous errors.
 */
var accumulatedErrorMessages = self.AMPErrors || [];
// Use a true global, to avoid multi-module inclusion issues.
self.AMPErrors = accumulatedErrorMessages;

/**
 * A wrapper around our exponentialBackoff, to lazy initialize it to avoid an
 * un-DCE'able side-effect.
 * @param {function()} work the function to execute after backoff
 * @return {number} the setTimeout id
 */
var _reportingBackoff = function reportingBackoff(work) {
  // Set reportingBackoff as the lazy-created function. JS Vooodoooo.
  _reportingBackoff = (0, _exponentialBackoff.exponentialBackoff)(1.5);
  return _reportingBackoff(work);
};

/**
 * Attempts to stringify a value, falling back to String.
 * @param {*} value
 * @return {string}
 */
function tryJsonStringify(value) {
  try {
    // Cast is fine, because we really don't care here. Just trying.
    return JSON.stringify( /** @type {!JsonObject} */value);
  } catch (e) {
    return String(value);
  }
}

/**
 * The true JS engine, as detected by inspecting an Error stack. This should be
 * used with the userAgent to tell definitely. I.e., Chrome on iOS is really a
 * Safari JS engine.
 */
var detectedJsEngine = void 0;

/**
 * @param {!Window} win
 * @param {*} error
 * @param {!Element=} opt_associatedElement
 */
function reportErrorForWin(win, error, opt_associatedElement) {
  reportError(error, opt_associatedElement);
  if (error && !!win && (0, _log.isUserErrorMessage)(error.message) && !(0, _log.isUserErrorEmbed)(error.message)) {
    reportErrorToAnalytics( /** @type {!Error} */error, win);
  }
}

/**
 * Reports an error. If the error has an "associatedElement" property
 * the element is marked with the `i-amphtml-element-error` and displays
 * the message itself. The message is always send to the console.
 * If the error has a "messageArray" property, that array is logged.
 * This way one gets the native fidelity of the console for things like
 * elements instead of stringification.
 * @param {*} error
 * @param {!Element=} opt_associatedElement
 * @return {!Error}
 */
function reportError(error, opt_associatedElement) {
  try {
    // Convert error to the expected type.
    var isValidError = void 0;
    if (error) {
      if (error.message !== undefined) {
        error = (0, _log.duplicateErrorIfNecessary)( /** @type {!Error} */error);
        isValidError = true;
      } else {
        var origError = error;
        error = new Error(tryJsonStringify(origError));
        error.origError = origError;
      }
    } else {
      error = new Error('Unknown error');
    }
    // Report if error is not an expected type.
    if (!isValidError && (0, _mode.getMode)().localDev && !(0, _mode.getMode)().test) {
      setTimeout(function () {
        var rethrow = new Error('_reported_ Error reported incorrectly: ' + error);
        throw rethrow;
      });
    }

    if (error.reported) {
      return (/** @type {!Error} */error
      );
    }
    error.reported = true;

    // Update element.
    var element = opt_associatedElement || error.associatedElement;
    if (element && element.classList) {
      element.classList.add('i-amphtml-error');
      if ((0, _mode.getMode)().development) {
        element.classList.add('i-amphtml-element-error');
        element.setAttribute('error-message', error.message);
      }
    }

    // Report to console.
    if (self.console) {
      var output = console.error || console.log;
      if (error.messageArray) {
        output.apply(console, error.messageArray);
      } else {
        if (element) {
          output.call(console, error.message, element);
        } else if (!(0, _mode.getMode)().minified) {
          output.call(console, error.stack);
        } else {
          output.call(console, error.message);
        }
      }
    }
    if (element && element.dispatchCustomEventForTesting) {
      element.dispatchCustomEventForTesting(_ampEvents.AmpEvents.ERROR, error.message);
    }

    // 'call' to make linter happy. And .call to make compiler happy
    // that expects some @this.
    reportErrorToServer['call'](undefined, undefined, undefined, undefined, undefined, error);
  } catch (errorReportingError) {
    setTimeout(function () {
      throw errorReportingError;
    });
  }
  return (/** @type {!Error} */error
  );
}

/**
 * Returns an error for a cancellation of a promise.
 * @return {!Error}
 */
function cancellation() {
  return new Error(CANCELLED);
}

/**
 * @param {*} errorOrMessage
 * @return {boolean}
 */
function isCancellation(errorOrMessage) {
  if (!errorOrMessage) {
    return false;
  }
  if (typeof errorOrMessage == 'string') {
    return (0, _string.startsWith)(errorOrMessage, CANCELLED);
  }
  if (typeof errorOrMessage.message == 'string') {
    return (0, _string.startsWith)(errorOrMessage.message, CANCELLED);
  }
  return false;
}

/**
 * Install handling of global unhandled exceptions.
 * @param {!Window} win
 */
function installErrorReporting(win) {
  win.onerror = /** @type {!Function} */reportErrorToServer;
  win.addEventListener('unhandledrejection', function (event) {
    if (event.reason && event.reason.message === CANCELLED) {
      event.preventDefault();
      return;
    }
    reportError(event.reason || new Error('rejected promise ' + event));
  });
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {*|undefined} error
 * @this {!Window|undefined}
 */
function reportErrorToServer(message, filename, line, col, error) {
  // Make an attempt to unhide the body.
  if (this && this.document) {
    (0, _styleInstaller.makeBodyVisible)(this.document);
  }
  if ((0, _mode.getMode)().localDev || (0, _mode.getMode)().development || (0, _mode.getMode)().test) {
    return;
  }
  var hasNonAmpJs = false;
  try {
    hasNonAmpJs = detectNonAmpJs(self);
  } catch (ignore) {
    // Ignore errors during error report generation.
  }
  if (hasNonAmpJs && Math.random() > 0.01) {
    // Only report 1% of errors on pages with non-AMP JS.
    // These errors can almost never be acted upon, but spikes such as
    // due to buggy browser extensions may be helpful to notify authors.
    return;
  }
  var data = getErrorReportData(message, filename, line, col, error, hasNonAmpJs);
  if (data) {
    _reportingBackoff(function () {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', _config.urls.errorReporting, true);
      xhr.send(JSON.stringify(data));
    });
  }
}

/**
 * Signature designed, so it can work with window.onerror
 * @param {string|undefined} message
 * @param {string|undefined} filename
 * @param {string|undefined} line
 * @param {string|undefined} col
 * @param {*|undefined} error
 * @param {boolean} hasNonAmpJs
 * @return {!JsonObject|undefined} The data to post
 * visibleForTesting
 */
function getErrorReportData(message, filename, line, col, error, hasNonAmpJs) {
  var expected = false;
  if (error) {
    if (error.message) {
      message = error.message;
    } else {
      // This should never be a string, but sometimes it is.
      message = String(error);
    }
    // An "expected" error is still an error, i.e. some features are disabled
    // or not functioning fully because of it. However, it's an expected
    // error. E.g. as is the case with some browser API missing (storage).
    // Thus, the error can be classified differently by log aggregators.
    // The main goal is to monitor that an "expected" error doesn't deteriorate
    // over time. It's impossible to completely eliminate it.
    if (error.expected) {
      expected = true;
    }
  }
  if (!message) {
    message = 'Unknown error';
  }
  if (/_reported_/.test(message)) {
    return;
  }
  if (message == CANCELLED) {
    return;
  }

  var throttleBase = Math.random();
  // We throttle load errors and generic "Script error." errors
  // that have no information and thus cannot be acted upon.
  if ((0, _eventHelper.isLoadErrorMessage)(message) ||
  // See https://github.com/ampproject/amphtml/issues/7353
  // for context.
  message == 'Script error.') {
    expected = true;

    if (throttleBase > NON_ACTIONABLE_ERROR_THROTTLE_THRESHOLD) {
      return;
    }
  }

  var isUserError = (0, _log.isUserErrorMessage)(message);

  // Only report a subset of user errors.
  if (isUserError && throttleBase > USER_ERROR_THROTTLE_THRESHOLD) {
    return;
  }

  // This is the App Engine app in
  // https://github.com/ampproject/error-tracker
  // It stores error reports via https://cloud.google.com/error-reporting/
  // for analyzing production issues.
  var data = /** @type {!JsonObject} */Object.create(null);
  data['v'] = (0, _mode.getMode)().rtvVersion;
  data['noAmp'] = hasNonAmpJs ? '1' : '0';
  data['m'] = message.replace(_log.USER_ERROR_SENTINEL, '');
  data['a'] = isUserError ? '1' : '0';

  // Errors are tagged with "ex" ("expected") label to allow loggers to
  // classify these errors as benchmarks and not exceptions.
  data['ex'] = expected ? '1' : '0';

  var runtime = '1p';
  if (self.context && self.context.location) {
    data['3p'] = '1';
    runtime = '3p';
  } else if ((0, _mode.getMode)().runtime) {
    runtime = (0, _mode.getMode)().runtime;
  }
  data['rt'] = runtime;

  // TODO(erwinm): Remove ca when all systems read `bt` instead of `ca` to
  // identify js binary type.
  data['ca'] = (0, _experiments.isCanary)(self) ? '1' : '0';

  // Pass binary type.
  data['bt'] = (0, _experiments.getBinaryType)(self);

  if (self.location.ancestorOrigins && self.location.ancestorOrigins[0]) {
    data['or'] = self.location.ancestorOrigins[0];
  }
  if (self.viewerState) {
    data['vs'] = self.viewerState;
  }
  // Is embedded?
  if (self.parent && self.parent != self) {
    data['iem'] = '1';
  }

  if (self.AMP && self.AMP.viewer) {
    var resolvedViewerUrl = self.AMP.viewer.getResolvedViewerUrl();
    var messagingOrigin = self.AMP.viewer.maybeGetMessagingOrigin();
    if (resolvedViewerUrl) {
      data['rvu'] = resolvedViewerUrl;
    }
    if (messagingOrigin) {
      data['mso'] = messagingOrigin;
    }
  }

  if (!detectedJsEngine) {
    detectedJsEngine = detectJsEngineFromStack();
  }
  data['jse'] = detectedJsEngine;

  var exps = [];
  var experiments = (0, _experiments.experimentTogglesOrNull)(self);
  for (var exp in experiments) {
    var on = experiments[exp];
    exps.push(exp + '=' + (on ? '1' : '0'));
  }
  data['exps'] = exps.join(',');

  if (error) {
    var tagName = error && error.associatedElement ? error.associatedElement.tagName : 'u'; // Unknown
    data['el'] = tagName;

    if (error.args) {
      data['args'] = JSON.stringify(error.args);
    }

    if (!isUserError && !error.ignoreStack && error.stack) {
      data['s'] = error.stack;
    }

    error.message += ' _reported_';
  } else {
    data['f'] = filename || '';
    data['l'] = line || '';
    data['c'] = col || '';
  }
  data['r'] = self.document.referrer;
  data['ae'] = accumulatedErrorMessages.join(',');
  data['fr'] = self.location.originalHash || self.location.hash;

  accumulatedErrorMessages.push(message);

  return data;
}

/**
 * Returns true if it appears like there is non-AMP JS on the
 * current page.
 * @param {!Window} win
 * @return {boolean}
 * @visibleForTesting
 */
function detectNonAmpJs(win) {
  var scripts = win.document.querySelectorAll('script[src]');
  for (var i = 0; i < scripts.length; i++) {
    if (!(0, _url.isProxyOrigin)(scripts[i].src.toLowerCase())) {
      return true;
    }
  }
  return false;
}

function resetAccumulatedErrorMessagesForTesting() {
  accumulatedErrorMessages = [];
}

/**
 * Does a series of checks on the stack of an thrown error to determine the
 * JS engine that is currently running. This gives a bit more information than
 * just the UserAgent, since browsers often allow overriding it to "emulate"
 * mobile.
 * @return {string}
 * @visibleForTesting
 */
function detectJsEngineFromStack() {
  /** @constructor */
  function Fn() {}
  Fn.prototype.t = function () {
    throw new Error('message');
  };
  var object = new Fn();
  try {
    object.t();
  } catch (e) {
    var stack = e.stack;

    // Safari only mentions the method name.
    if ((0, _string.startsWith)(stack, 't@')) {
      return 'Safari';
    }

    // Firefox mentions "prototype".
    if (stack.indexOf('.prototype.t@') > -1) {
      return 'Firefox';
    }

    // IE looks like Chrome, but includes a context for the base stack line.
    // Explicitly, we're looking for something like:
    // "    at Global code (https://example.com/app.js:1:200)" or
    // "    at Anonymous function (https://example.com/app.js:1:200)"
    // vs Chrome which has:
    // "    at https://example.com/app.js:1:200"
    var last = stack.split('\n').pop();
    if (/\bat .* \(/i.test(last)) {
      return 'IE';
    }

    // Finally, chrome includes the error message in the stack.
    if ((0, _string.startsWith)(stack, 'Error: message')) {
      return 'Chrome';
    }
  }

  return 'unknown';
}

/**
 * @param {!Error} error
 * @param {!Window} win
 */
function reportErrorToAnalytics(error, win) {
  if ((0, _experiments.isExperimentOn)(win, 'user-error-reporting')) {
    var vars = {
      'errorName': error.name,
      'errorMessage': error.message
    };
    (0, _analytics.triggerAnalyticsEvent)(getRootElement_(win), 'user-error', vars);
  }
}

/**
 * @param {!Window} win
 * @return {!Element}
 * @private
 */
function getRootElement_(win) {
  var root = _services.Services.ampdocServiceFor(win).getAmpDoc().getRootNode();
  return (0, _log.dev)().assertElement(root.documentElement || root.body || root);
}

},{"./amp-events":14,"./analytics":15,"./config":18,"./event-helper":24,"./experiments":25,"./exponential-backoff":26,"./log":28,"./mode":30,"./services":43,"./string":45,"./style-installer":46,"./url":51}],23:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.internalListenImplementation = internalListenImplementation;
exports.detectEvtListenerOptsSupport = detectEvtListenerOptsSupport;
exports.resetEvtListenerOptsSupportForTesting = resetEvtListenerOptsSupportForTesting;
/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
  * Whether addEventListener supports options or only takes capture as a boolean
  * @type {boolean|undefined}
  * @visibleForTesting
  */
var optsSupported = void 0;

/**
 * Listens for the specified event on the element.
 *
 * Do not use this directly. This method is implemented as a shared
 * dependency. Use `listen()` in either `event-helper` or `3p-frame-messaging`,
 * depending on your use case.
 *
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {function(!Event)} listener
 * @param {Object=} opt_evtListenerOpts
 * @return {!UnlistenDef}
 */
function internalListenImplementation(element, eventType, listener, opt_evtListenerOpts) {
  var localElement = element;
  var localListener = listener;
  /** @type {?Function}  */
  var wrapped = function wrapped(event) {
    try {
      return localListener(event);
    } catch (e) {
      // reportError is installed globally per window in the entry point.
      self.reportError(e);
      throw e;
    }
  };
  var optsSupported = detectEvtListenerOptsSupport();
  var capture = false;
  if (opt_evtListenerOpts) {
    capture = opt_evtListenerOpts.capture;
  }
  localElement.addEventListener(eventType, wrapped, optsSupported ? opt_evtListenerOpts : capture);
  return function () {
    if (localElement) {
      localElement.removeEventListener(eventType, wrapped, optsSupported ? opt_evtListenerOpts : capture);
    }
    // Ensure these are GC'd
    localListener = null;
    localElement = null;
    wrapped = null;
  };
}

/**
 * Tests whether the browser supports options as an argument of addEventListener
 * or not.
 *
 * @return {boolean}
 */
function detectEvtListenerOptsSupport() {
  // Only run the test once
  if (optsSupported !== undefined) {
    return optsSupported;
  }

  optsSupported = false;
  try {
    // Test whether browser supports EventListenerOptions or not
    var options = {
      get capture() {
        optsSupported = true;
      }
    };
    self.addEventListener('test-options', null, options);
    self.removeEventListener('test-options', null, options);
  } catch (err) {
    // EventListenerOptions are not supported
  }
  return optsSupported;
}

/**
  * Resets the test for whether addEventListener supports options or not.
  */
function resetEvtListenerOptsSupportForTesting() {
  optsSupported = undefined;
}

},{}],24:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCustomEvent = createCustomEvent;
exports.listen = listen;
exports.getData = getData;
exports.listenOnce = listenOnce;
exports.listenOncePromise = listenOncePromise;
exports.isLoaded = isLoaded;
exports.loadPromise = loadPromise;
exports.isLoadErrorMessage = isLoadErrorMessage;

var _eventHelperListen = require('./event-helper-listen');

var _log = require('./log');

/** @const {string}  */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var LOAD_FAILURE_PREFIX = 'Failed to load:';

/**
 * Returns a CustomEvent with a given type and detail; supports fallback for IE.
 * @param {!Window} win
 * @param {string} type
 * @param {Object} detail
 * @param {EventInit=} opt_eventInit
 * @return {!Event}
 */
function createCustomEvent(win, type, detail, opt_eventInit) {
  var eventInit = /** @type {!CustomEventInit} */{ detail: detail };
  Object.assign(eventInit, opt_eventInit);
  // win.CustomEvent is a function on Edge, Chrome, FF, Safari but
  // is an object on IE 11.
  if (typeof win.CustomEvent == 'function') {
    return new win.CustomEvent(type, eventInit);
  } else {
    // Deprecated fallback for IE.
    var e = win.document.createEvent('CustomEvent');
    e.initCustomEvent(type, !!eventInit.bubbles, !!eventInit.cancelable, detail);
    return e;
  }
}

/**
 * Listens for the specified event on the element.
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {function(!Event)} listener
 * @param {Object=} opt_evtListenerOpts
 * @return {!UnlistenDef}
 */
function listen(element, eventType, listener, opt_evtListenerOpts) {
  return (0, _eventHelperListen.internalListenImplementation)(element, eventType, listener, opt_evtListenerOpts);
}

/**
 * Returns the data property of an event with the correct type.
 * @param {!Event|{data: !JsonObject}} event
 * @return {?JsonObject|string|undefined}
 */
function getData(event) {
  return (/** @type {?JsonObject|string|undefined} */event.data
  );
}

/**
 * Listens for the specified event on the element and removes the listener
 * as soon as event has been received.
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {function(!Event)} listener
 * @param {Object=} opt_evtListenerOpts
 * @return {!UnlistenDef}
 */
function listenOnce(element, eventType, listener, opt_evtListenerOpts) {
  var localListener = listener;
  var unlisten = (0, _eventHelperListen.internalListenImplementation)(element, eventType, function (event) {
    try {
      localListener(event);
    } finally {
      // Ensure listener is GC'd
      localListener = null;
      unlisten();
    }
  }, opt_evtListenerOpts);
  return unlisten;
}

/**
 * Returns  a promise that will resolve as soon as the specified event has
 * fired on the element.
 * @param {!EventTarget} element
 * @param {string} eventType
 * @param {Object=} opt_evtListenerOpts
 * @param {function(!UnlistenDef)=} opt_cancel An optional function that, when
 *     provided, will be called with the unlistener. This gives the caller
 *     access to the unlistener, so it may be called manually when necessary.
 * @return {!Promise<!Event>}
 */
function listenOncePromise(element, eventType, opt_evtListenerOpts, opt_cancel) {
  var unlisten = void 0;
  var eventPromise = new Promise(function (resolve) {
    unlisten = listenOnce(element, eventType, resolve, opt_evtListenerOpts);
  });
  eventPromise.then(unlisten, unlisten);
  if (opt_cancel) {
    opt_cancel(unlisten);
  }
  return eventPromise;
}

/**
 * Whether the specified element/window has been loaded already.
 * @param {!Element|!Window} eleOrWindow
 * @return {boolean}
 */
function isLoaded(eleOrWindow) {
  return !!(eleOrWindow.complete || eleOrWindow.readyState == 'complete'
  // If the passed in thing is a Window, infer loaded state from
  //
  || eleOrWindow.document && eleOrWindow.document.readyState == 'complete');
}

/**
 * Returns a promise that will resolve or fail based on the eleOrWindow's 'load'
 * and 'error' events. Optionally this method takes a timeout, which will reject
 * the promise if the resource has not loaded by then.
 * @param {T} eleOrWindow Supports both Elements and as a special case Windows.
 * @return {!Promise<T>}
 * @template T
 */
function loadPromise(eleOrWindow) {
  var unlistenLoad = void 0;
  var unlistenError = void 0;
  if (isLoaded(eleOrWindow)) {
    return Promise.resolve(eleOrWindow);
  }
  var loadingPromise = new Promise(function (resolve, reject) {
    // Listen once since IE 5/6/7 fire the onload event continuously for
    // animated GIFs.
    var tagName = eleOrWindow.tagName;
    if (tagName === 'AUDIO' || tagName === 'VIDEO') {
      unlistenLoad = listenOnce(eleOrWindow, 'loadstart', resolve);
    } else {
      unlistenLoad = listenOnce(eleOrWindow, 'load', resolve);
    }
    // For elements, unlisten on error (don't for Windows).
    if (tagName) {
      unlistenError = listenOnce(eleOrWindow, 'error', reject);
    }
  });

  return loadingPromise.then(function () {
    if (unlistenError) {
      unlistenError();
    }
    return eleOrWindow;
  }, function () {
    if (unlistenLoad) {
      unlistenLoad();
    }
    failedToLoad(eleOrWindow);
  });
}

/**
 * Emit error on load failure.
 * @param {!Element|!Window} eleOrWindow Supports both Elements and as a special
 *     case Windows.
 */
function failedToLoad(eleOrWindow) {
  // Report failed loads as user errors so that they automatically go
  // into the "document error" bucket.
  var target = eleOrWindow;
  if (target && target.src) {
    target = target.src;
  }
  throw (0, _log.user)().createError(LOAD_FAILURE_PREFIX, target);
}

/**
 * Returns true if this error message is was created for a load error.
 * @param {string} message An error message
 * @return {boolean}
 */
function isLoadErrorMessage(message) {
  return message.indexOf(LOAD_FAILURE_PREFIX) != -1;
}

},{"./event-helper-listen":23,"./log":28}],25:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RANDOM_NUMBER_GENERATORS = exports.ExperimentInfo = undefined;
exports.isCanary = isCanary;
exports.getBinaryType = getBinaryType;
exports.isOriginExperimentOn = isOriginExperimentOn;
exports.isExperimentOn = isExperimentOn;
exports.toggleExperiment = toggleExperiment;
exports.experimentToggles = experimentToggles;
exports.experimentTogglesOrNull = experimentTogglesOrNull;
exports.getExperimentToglesFromCookieForTesting = getExperimentToglesFromCookieForTesting;
exports.resetExperimentTogglesForTesting = resetExperimentTogglesForTesting;
exports.randomlySelectUnsetExperiments = randomlySelectUnsetExperiments;
exports.getExperimentBranch = getExperimentBranch;
exports.forceExperimentBranch = forceExperimentBranch;

var _originExperiments = require('./origin-experiments');

var _services = require('./services');

var _cookies = require('./cookies');

var _url = require('./url');

var _log = require('./log');

/** @const {string} */
var TAG = 'experiments';

/** @const {string} */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Experiments system allows a developer to opt-in to test
 * features that are not yet fully tested.
 *
 * Experiments page: https://cdn.ampproject.org/experiments.html *
 */

var COOKIE_NAME = 'AMP_EXP';

/** @const {number} */
var COOKIE_MAX_AGE_DAYS = 180; // 6 month

/** @const {time} */
var COOKIE_EXPIRATION_INTERVAL = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

/** @const {string} */
var TOGGLES_WINDOW_PROPERTY = '__AMP__EXPERIMENT_TOGGLES';

/** @const {!webCrypto.JsonWebKey} */
var ORIGIN_EXPERIMENTS_PUBLIC_JWK = /** @type {!webCrypto.JsonWebKey} */{
  'alg': 'RS256',
  'e': 'AQAB',
  'ext': true,
  'key_ops': ['verify'],
  'kty': 'RSA',
  /*eslint "max-len": 0*/
  'n': 'uAGSMYKze8Fit508UaGHz1eZowfX4YsA0lmyi-65xQfjF7nMo61c4Iz4erdqgRp-ov662yVPquhPmTxgB-nzNcTPrj15Jo05Js78Q9hS2hrPIjKMlzcKSYQN_08QieWKOSmVbLSv_-4n9Ms5ta8nRs4pwc_2nX5n7m5B5GH4VerGbqIWIn9FRNYMShBRQ9TCHpb6BIUTwUn6iwmJLenq0A1xhGrQ9rswGC1QJhjotkeReKXZDLLWaFr0uRw-IyvRa5RiiEGntgOvcbvamM5TnbKavc2rxvg2TWTCNQnb7lWSAzldJA_yAOYet_MjnHMyj2srUdbQSDCk8kPWWuafiQ'
};

/** @type {?Promise} */
var originExperimentsPromise = void 0;

/** @private {?OriginExperiments} */
var originExperiments = void 0;

/**
 * @typedef {{
 *   isTrafficEligible: !function(!Window):boolean,
 *   branches: !Array<string>
 * }}
 */
var ExperimentInfo = exports.ExperimentInfo = void 0;

/**
 * Whether we are in canary.
 * @param {!Window} win
 * @return {boolean}
 */
function isCanary(win) {
  return !!(win.AMP_CONFIG && win.AMP_CONFIG.canary);
}

/**
 * Returns binary type, e.g., canary, control, or production.
 * @param {!Window} win
 * @return {string}
 */
function getBinaryType(win) {
  return win.AMP_CONFIG && win.AMP_CONFIG.type ? win.AMP_CONFIG.type : 'unknown';
}

/**
 * Verifies a single origin experiment token and enables the corresponding
 * experiment on success. If token verification fails, a user error is logged.
 * @param {!Window} win
 * @param {string} token
 * @param {!./service/crypto-impl.Crypto} crypto
 * @param {!webCrypto.CryptoKey} publicKey
 * @return {!Promise}
 * @private
 */
function verifyOriginExperimentToken(win, token, crypto, publicKey) {
  if (!crypto.isPkcsAvailable()) {
    (0, _log.user)().error(TAG, 'Crypto is unavailable.');
    return Promise.resolve();
  }
  if (!originExperiments) {
    originExperiments = new _originExperiments.OriginExperiments(crypto);
  }
  var verify = originExperiments.verifyToken(token, win.location, publicKey);
  return verify.then(function (experimentId) {
    toggleExperiment(win, experimentId, true, /* transientExperiment */true);
  }, function (error) {
    (0, _log.user)().error(TAG, 'Failed to verify experiment token:' + error);
  });
}

/**
 * Scan the page for origin experiment tokens, verifies them, and enables
 * the corresponding experiments for verified tokens.
 * @param {!Window} win
 * @param {!webCrypto.JsonWebKey} publicJwk
 * @return {!Promise}
 * @private
 */
function scanForOriginExperimentTokens(win, publicJwk) {
  var metas = win.document.head.querySelectorAll('meta[name="amp-experiment-token"]');
  if (metas.length == 0) {
    return Promise.resolve();
  }
  var crypto = _services.Services.cryptoFor(win);
  return crypto.importPkcsKey(publicJwk).then(function (publicKey) {
    var promises = [];
    for (var i = 0; i < metas.length; i++) {
      var meta = metas[i];
      var token = meta.getAttribute('content');
      if (token) {
        var p = verifyOriginExperimentToken(win, token, crypto, publicKey);
        promises.push(p);
      } else {
        (0, _log.user)().error(TAG, 'Missing content for experiment token.');
      }
    }
    return Promise.all(promises);
  });
}

/**
 * Asynchronously checks whether the specified origin experiment is on or off.
 * On the first invocation, triggers scan of origin experiment tokens on page.
 * @param {!Window} win
 * @param {string} experimentId
 * @param {boolean=} opt_forceScan Forces rescan of page for experiment tokens.
 * @return {!Promise<boolean>}
 */
function isOriginExperimentOn(win, experimentId, opt_forceScan) {
  if (!originExperimentsPromise || opt_forceScan) {
    originExperimentsPromise = scanForOriginExperimentTokens(win, ORIGIN_EXPERIMENTS_PUBLIC_JWK);
  }
  return originExperimentsPromise.then(function () {
    return isExperimentOn(win, experimentId);
  });
}

/**
 * Whether the specified experiment is on or off.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */
function isExperimentOn(win, experimentId) {
  var toggles = experimentToggles(win);
  return !!toggles[experimentId];
}

/**
 * Toggles the experiment on or off. Returns the actual value of the experiment
 * after toggling is done.
 * @param {!Window} win
 * @param {string} experimentId
 * @param {boolean=} opt_on
 * @param {boolean=} opt_transientExperiment  Whether to toggle the
 *     experiment state "transiently" (i.e., for this page load only) or
 *     durably (by saving the experiment IDs to the cookie after toggling).
 *     Default: false (save durably).
 * @return {boolean} New state for experimentId.
 */
function toggleExperiment(win, experimentId, opt_on, opt_transientExperiment) {
  var currentlyOn = isExperimentOn(win, experimentId);
  var on = !!(opt_on !== undefined ? opt_on : !currentlyOn);
  if (on != currentlyOn) {
    var toggles = experimentToggles(win);
    toggles[experimentId] = on;

    if (!opt_transientExperiment) {
      var cookieToggles = getExperimentTogglesFromCookie(win);
      cookieToggles[experimentId] = on;
      saveExperimentTogglesToCookie(win, cookieToggles);
    }
  }
  return on;
}

/**
 * Calculate whether the experiment is on or off based off of the
 * cookieFlag or the global config frequency given.
 * @param {!Window} win
 * @return {!Object<string, boolean>}
 */
function experimentToggles(win) {
  if (win[TOGGLES_WINDOW_PROPERTY]) {
    return win[TOGGLES_WINDOW_PROPERTY];
  }
  win[TOGGLES_WINDOW_PROPERTY] = Object.create(null);
  var toggles = win[TOGGLES_WINDOW_PROPERTY];

  // Read the default config of this build.
  if (win.AMP_CONFIG) {
    for (var experimentId in win.AMP_CONFIG) {
      var frequency = win.AMP_CONFIG[experimentId];
      if (typeof frequency === 'number' && frequency >= 0 && frequency <= 1) {
        toggles[experimentId] = Math.random() < frequency;
      }
    }
  }
  // Read document level override from meta tag.
  if (win.AMP_CONFIG && Array.isArray(win.AMP_CONFIG['allow-doc-opt-in']) && win.AMP_CONFIG['allow-doc-opt-in'].length > 0) {
    var allowed = win.AMP_CONFIG['allow-doc-opt-in'];
    var meta = win.document.head.querySelector('meta[name="amp-experiments-opt-in"]');
    if (meta) {
      var optedInExperiments = meta.getAttribute('content').split(',');
      for (var i = 0; i < optedInExperiments.length; i++) {
        if (allowed.indexOf(optedInExperiments[i]) != -1) {
          toggles[optedInExperiments[i]] = true;
        }
      }
    }
  }

  Object.assign(toggles, getExperimentTogglesFromCookie(win));

  if (win.AMP_CONFIG && Array.isArray(win.AMP_CONFIG['allow-url-opt-in']) && win.AMP_CONFIG['allow-url-opt-in'].length > 0) {
    var _allowed = win.AMP_CONFIG['allow-url-opt-in'];
    var hash = win.location.originalHash || win.location.hash;
    var params = (0, _url.parseQueryString)(hash);
    for (var _i = 0; _i < _allowed.length; _i++) {
      var param = params['e-' + _allowed[_i]];
      if (param == '1') {
        toggles[_allowed[_i]] = true;
      }
      if (param == '0') {
        toggles[_allowed[_i]] = false;
      }
    }
  }
  return toggles;
}

/**
 * Returns the cached experiments toggles, or null if they have not been
 * computed yet.
 * @param {!Window} win
 * @return {Object<string, boolean>}
 */
function experimentTogglesOrNull(win) {
  return win[TOGGLES_WINDOW_PROPERTY] || null;
}

/**
 * Returns a set of experiment IDs currently on.
 * @param {!Window} win
 * @return {!Object<string, boolean>}
 */
function getExperimentTogglesFromCookie(win) {
  var experimentCookie = (0, _cookies.getCookie)(win, COOKIE_NAME);
  var tokens = experimentCookie ? experimentCookie.split(/\s*,\s*/g) : [];

  var toggles = Object.create(null);
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].length == 0) {
      continue;
    }
    if (tokens[i][0] == '-') {
      toggles[tokens[i].substr(1)] = false;
    } else {
      toggles[tokens[i]] = true;
    }
  }

  return toggles;
}

/**
 * Saves a set of experiment IDs currently on.
 * @param {!Window} win
 * @param {!Object<string, boolean>} toggles
 */
function saveExperimentTogglesToCookie(win, toggles) {
  var experimentIds = [];
  for (var experiment in toggles) {
    experimentIds.push((toggles[experiment] === false ? '-' : '') + experiment);
  }

  (0, _cookies.setCookie)(win, COOKIE_NAME, experimentIds.join(','), Date.now() + COOKIE_EXPIRATION_INTERVAL, {
    // Set explicit domain, so the cookie gets send to sub domains.
    domain: win.location.hostname,
    allowOnProxyOrigin: true
  });
}

/**
 * See getExperimentTogglesFromCookie().
 * @param {!Window} win
 * @return {!Object<string, boolean>}
 * @visibleForTesting
 */
function getExperimentToglesFromCookieForTesting(win) {
  return getExperimentTogglesFromCookie(win);
}

/**
 * Resets the experimentsToggle cache for testing purposes.
 * @param {!Window} win
 * @visibleForTesting
 */
function resetExperimentTogglesForTesting(win) {
  (0, _cookies.setCookie)(win, COOKIE_NAME, '', 0, {
    domain: win.location.hostname
  });
  win[TOGGLES_WINDOW_PROPERTY] = null;
}

/**
 * In some browser implementations of Math.random(), sequential calls of
 * Math.random() are correlated and can cause a bias.  In particular,
 * if the previous random() call was < 0.001 (as it will be if we select
 * into an experiment), the next value could be less than 0.5 more than
 * 50.7% of the time.  This provides an implementation that roots down into
 * the crypto API, when available, to produce less biased samples.
 *
 * @return {number} Pseudo-random floating-point value on the range [0, 1).
 */
function slowButAccuratePrng() {
  // TODO(tdrl): Implement.
  return Math.random();
}

/**
 * Container for alternate random number generator implementations.  This
 * allows us to set an "accurate" PRNG for branch selection, but to mock it
 * out easily in tests.
 *
 * @visibleForTesting
 * @const {!{accuratePrng: function():number}}
 */
var RANDOM_NUMBER_GENERATORS = exports.RANDOM_NUMBER_GENERATORS = {
  accuratePrng: slowButAccuratePrng
};

/**
 * Selects, uniformly at random, a single item from the array.
 * @param {!Array<string>} arr Object to select from.
 * @return {?string} Single item from arr or null if arr was empty.
 */
function selectRandomItem(arr) {
  var rn = RANDOM_NUMBER_GENERATORS.accuratePrng();
  return arr[Math.floor(rn * arr.length)] || null;
}

/**
 * Selects which page-level experiment branches are enabled. If a given
 * experiment name is already set (including to the null / no branches selected
 * state), this won't alter its state.
 *
 * Check whether a given experiment is set using isExperimentOn(win,
 * experimentName) and, if it is on, look for which branch is selected in
 * win.experimentBranches[experimentName].
 *
 * @param {!Window} win Window context on which to save experiment
 *     selection state.
 * @param {!Object<string, !ExperimentInfo>} experiments  Set of experiments to
 *     configure for this page load.
 * @visibleForTesting
 */
function randomlySelectUnsetExperiments(win, experiments) {
  win.experimentBranches = win.experimentBranches || {};
  for (var experimentName in experiments) {
    // Skip experimentName if it is not a key of experiments object or if it
    // has already been populated by some other property.
    if (!experiments.hasOwnProperty(experimentName) || win.experimentBranches.hasOwnProperty(experimentName)) {
      continue;
    }

    if (!experiments[experimentName].isTrafficEligible || !experiments[experimentName].isTrafficEligible(win)) {
      win.experimentBranches[experimentName] = null;
      continue;
    }

    // If we're in the experiment, but we haven't already forced a specific
    // experiment branch (e.g., via a test setup), then randomize the branch
    // choice.
    if (!win.experimentBranches[experimentName] && isExperimentOn(win, experimentName)) {
      var branches = experiments[experimentName].branches;
      win.experimentBranches[experimentName] = selectRandomItem(branches);
    }
  }
}

/**
 * Returns the experiment branch enabled for the given experiment ID.
 * For example, 'control' or 'experiment'.
 *
 * @param {!Window} win Window context to check for experiment state.
 * @param {!string} experimentName Name of the experiment to check.
 * @return {?string} Active experiment branch ID for experimentName (possibly
 *     null if experimentName has been tested but no branch was enabled).
 */
function getExperimentBranch(win, experimentName) {
  return win.experimentBranches ? win.experimentBranches[experimentName] : null;
}

/**
 * Force enable (or disable) a specific branch of a given experiment name.
 * Disables the experiment name altogether if branchId is falseish.
 *
 * @param {!Window} win Window context to check for experiment state.
 * @param {!string} experimentName Name of the experiment to check.
 * @param {?string} branchId ID of branch to force or null to disable
 *     altogether.
 * @visibleForTesting
 */
function forceExperimentBranch(win, experimentName, branchId) {
  win.experimentBranches = win.experimentBranches || {};
  toggleExperiment(win, experimentName, !!branchId, true);
  win.experimentBranches[experimentName] = branchId;
}

},{"./cookies":19,"./log":28,"./origin-experiments":31,"./services":43,"./url":51}],26:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exponentialBackoff = exponentialBackoff;
exports.exponentialBackoffClock = exponentialBackoffClock;
exports.getJitter = getJitter;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {number=} opt_base Exponential base. Defaults to 2.
 * @return {function(function()): number} Function that when invoked will
 *     call the passed in function. On every invocation the next
 *     invocation of the passed in function will be exponentially
 *     later. Returned function returns timeout id.
 */
function exponentialBackoff(opt_base) {
  var getTimeout = exponentialBackoffClock(opt_base);
  return function (work) {
    return setTimeout(work, getTimeout());
  };
}

/**
 * @param {number=} opt_base Exponential base. Defaults to 2.
 * @return {function(): number} Function that when invoked will return
 *    a number that exponentially grows per invocation.
 */
function exponentialBackoffClock(opt_base) {
  var base = opt_base || 2;
  var count = 0;
  return function () {
    var wait = Math.pow(base, count++);
    wait += getJitter(wait);
    return wait * 1000;
  };
}

/**
 * Add jitter to avoid the thundering herd. This can e.g. happen when
 * we poll a backend and it fails for everyone at the same time.
 * We add up to 30% (default) longer or shorter than the given time.
 *
 * @param {number} wait the amount if base milliseconds
 * @param {number=} opt_perc the min/max percentage to add or sutract
 * @return {number}
 */
function getJitter(wait, opt_perc) {
  opt_perc = opt_perc || .3;
  var jitter = wait * opt_perc * Math.random();
  if (Math.random() > .5) {
    jitter *= -1;
  }
  return jitter;
}

},{}],27:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                               * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                               * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                               * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                                                                                                                                               * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                               * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                               * limitations under the License.
                                                                                                                                                                                                                                                                               */

/**
 * @fileoverview This module declares JSON types as defined in the
 * {@link http://json.org/}.
 */

exports.recreateNonProtoObject = recreateNonProtoObject;
exports.getValueForExpr = getValueForExpr;
exports.parseJson = parseJson;
exports.tryParseJson = tryParseJson;
exports.recursiveEquals = recursiveEquals;

var _types = require('./types');

// NOTE Type are changed to {*} because of
// https://github.com/google/closure-compiler/issues/1999

/**
 * JSON scalar. It's either string, number or boolean.
 * @typedef {*} should be string|number|boolean
 */
var JSONScalarDef = void 0;

/**
 * JSON object. It's a map with string keys and JSON values.
 * @typedef {*} should be !Object<string, ?JSONValueDef>
 */
var JSONObjectDef = void 0;

/**
 * JSON array. It's an array with JSON values.
 * @typedef {*} should be !Array<?JSONValueDef>
 */
var JSONArrayDef = void 0;

/**
 * JSON value. It's either a scalar, an object or an array.
 * @typedef {*} should be !JSONScalarDef|!JSONObjectDef|!JSONArrayDef
 */
var JSONValueDef = void 0;

/**
 * Recreates objects with prototype-less copies.
 * @param {!JsonObject} obj
 * @return {!JsonObject}
 */
function recreateNonProtoObject(obj) {
  var copy = Object.create(null);
  for (var k in obj) {
    if (!hasOwnProperty(obj, k)) {
      continue;
    }
    var v = obj[k];
    copy[k] = (0, _types.isObject)(v) ? recreateNonProtoObject(v) : v;
  }
  return (/** @type {!JsonObject} */copy
  );
}

/**
 * Returns a value from an object for a field-based expression. The expression
 * is a simple nested dot-notation of fields, such as `field1.field2`. If any
 * field in a chain does not exist or is not an object or array, the returned
 * value will be `undefined`.
 *
 * @param {!JsonObject} obj
 * @param {string} expr
 * @return {*}
 */
function getValueForExpr(obj, expr) {
  // The `.` indicates "the object itself".
  if (expr == '.') {
    return obj;
  }
  // Otherwise, navigate via properties.
  var parts = expr.split('.');
  var value = obj;
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (part && value && value[part] !== undefined && hasOwnProperty(value, part)) {
      value = value[part];
      continue;
    }
    value = undefined;
    break;
  }
  return value;
}

/**
 * Simple wrapper around JSON.parse that casts the return value
 * to JsonObject.
 * Create a new wrapper if an array return value is desired.
 * @param {*} json JSON string to parse
 * @return {?JsonObject} May be extend to parse arrays.
 */
function parseJson(json) {
  return (/** @type {?JsonObject} */JSON.parse( /** @type {string} */json)
  );
}

/**
 * Parses the given `json` string without throwing an exception if not valid.
 * Returns `undefined` if parsing fails.
 * Returns the `Object` corresponding to the JSON string when parsing succeeds.
 * @param {*} json JSON string to parse
 * @param {function(!Error)=} opt_onFailed Optional function that will be called
 *     with the error if parsing fails.
 * @return {?JsonObject|undefined} May be extend to parse arrays.
 */
function tryParseJson(json, opt_onFailed) {
  try {
    return parseJson(json);
  } catch (e) {
    if (opt_onFailed) {
      opt_onFailed(e);
    }
    return undefined;
  }
}

/**
 * Recursively checks strict equality of items in nested arrays and objects.
 *
 * @param {JSONValueDef} a
 * @param {JSONValueDef} b
 * @param {number} depth The maximum recursion depth. Must be finite.
 * @return {boolean}
 * @throws {Error} If depth argument is not finite.
 */
function recursiveEquals(a, b) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

  if (!isFinite(depth)) {
    throw new Error('depth arg must be finite: ' + depth);
  }
  if (a === b) {
    return true;
  }
  // Only check shallow equality for depth < 1.
  if (depth < 1) {
    return false;
  }
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (!recursiveEquals(a[i], b[i], depth - 1)) {
        return false;
      }
    }
    return true;
  }
  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
    var keysA = Object.keys( /** @type {!Object} */a);
    var keysB = Object.keys( /** @type {!Object} */b);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (var _i = 0; _i < keysA.length; _i++) {
      var keyA = keysA[_i];
      var valueA = a[keyA];
      var valueB = b[keyA];
      if (!recursiveEquals(valueA, valueB, depth - 1)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

/**
 * @param {*} obj
 * @param {string} key
 * @return {boolean}
 */
function hasOwnProperty(obj, key) {
  if (obj == null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(
  /** @type {!Object} */obj, key);
}

},{"./types":48}],28:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = exports.LogLevel = exports.USER_ERROR_EMBED_SENTINEL = exports.USER_ERROR_SENTINEL = undefined;
exports.isUserErrorMessage = isUserErrorMessage;
exports.isUserErrorEmbed = isUserErrorEmbed;
exports.setReportError = setReportError;
exports.duplicateErrorIfNecessary = duplicateErrorIfNecessary;
exports.rethrowAsync = rethrowAsync;
exports.initLogConstructor = initLogConstructor;
exports.resetLogConstructorForTesting = resetLogConstructorForTesting;
exports.user = user;
exports.dev = dev;
exports.isFromEmbed = isFromEmbed;

var _mode = require('./mode');

var _modeObject = require('./mode-object');

var _types = require('./types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

/** @const Time when this JS loaded.  */
var start = Date.now();

/**
 * Triple zero width space.
 *
 * This is added to user error messages, so that we can later identify
 * them, when the only thing that we have is the message. This is the
 * case in many browsers when the global exception handler is invoked.
 *
 * @const {string}
 */
var USER_ERROR_SENTINEL = exports.USER_ERROR_SENTINEL = '\u200B\u200B\u200B';

/**
 * Four zero width space.
 *
 * @const {string}
 */
var USER_ERROR_EMBED_SENTINEL = exports.USER_ERROR_EMBED_SENTINEL = '\u200B\u200B\u200B\u200B';

/**
 * @return {boolean} Whether this message was a user error.
 */
function isUserErrorMessage(message) {
  return message.indexOf(USER_ERROR_SENTINEL) >= 0;
}

/**
 * @return {boolean} Whether this message was a a user error from an iframe embed.
 */
function isUserErrorEmbed(message) {
  return message.indexOf(USER_ERROR_EMBED_SENTINEL) >= 0;
}

/**
 * @enum {number}
 * @private Visible for testing only.
 */
var LogLevel = exports.LogLevel = {
  OFF: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  FINE: 4
};

/**
 * Sets reportError function. Called from error.js to break cyclic
 * dependency.
 * @param {function(*, !Element=)|undefined} fn
 */
function setReportError(fn) {
  self.reportError = fn;
}

/**
 * Logging class.
 * Use of sentinel string instead of a boolean to check user/dev errors
 * because errors could be rethrown by some native code as a new error, and only a message would survive.
 * Also, some browser don’t support a 5th error object argument in window.onerror. List of supporting browser can be found
 * here: https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
 * @final
 * @private Visible for testing only.
 */

var Log = exports.Log = function () {
  /**
   * opt_suffix will be appended to error message to identify the type of the error message.
   * We can't rely on the error object to pass along the type because
   * some browsers do not have this param in its window.onerror API.
   * See: https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
   *
   * @param {!Window} win
   * @param {function(!./mode.ModeDef):!LogLevel} levelFunc
   * @param {string=} opt_suffix
   */
  function Log(win, levelFunc, opt_suffix) {
    _classCallCheck(this, Log);

    /**
     * In tests we use the main test window instead of the iframe where
     * the tests runs because only the former is relayed to the console.
     * @const {!Window}
     */
    this.win = (0, _mode.getMode)().test && win.AMP_TEST_IFRAME ? win.parent : win;

    /** @private @const {function(!./mode.ModeDef):!LogLevel} */
    this.levelFunc_ = levelFunc;

    /** @private @const {!LogLevel} */
    this.level_ = this.calcLevel_();

    /** @private @const {string} */
    this.suffix_ = opt_suffix || '';
  }

  /**
   * @return {!LogLevel}
   * @private
   */


  Log.prototype.calcLevel_ = function calcLevel_() {
    // No console - can't enable logging.
    if (!this.win.console || !this.win.console.log) {
      return LogLevel.OFF;
    }

    // Logging has been explicitly disabled.
    if ((0, _mode.getMode)().log == '0') {
      return LogLevel.OFF;
    }

    // Logging is enabled for tests directly.
    if ((0, _mode.getMode)().test && this.win.ENABLE_LOG) {
      return LogLevel.FINE;
    }

    // LocalDev by default allows INFO level, unless overriden by `#log`.
    if ((0, _mode.getMode)().localDev && !(0, _mode.getMode)().log) {
      return LogLevel.INFO;
    }

    // Delegate to the specific resolver.
    return this.levelFunc_((0, _modeObject.getModeObject)());
  };

  /**
   * @param {string} tag
   * @param {string} level
   * @param {!Array} messages
   */


  Log.prototype.msg_ = function msg_(tag, level, messages) {
    if (this.level_ != LogLevel.OFF) {
      var fn = this.win.console.log;
      if (level == 'ERROR') {
        fn = this.win.console.error || fn;
      } else if (level == 'INFO') {
        fn = this.win.console.info || fn;
      } else if (level == 'WARN') {
        fn = this.win.console.warn || fn;
      }
      messages.unshift(Date.now() - start, '[' + tag + ']');
      fn.apply(this.win.console, messages);
    }
  };

  /**
   * Whether the logging is enabled.
   * @return {boolean}
   */


  Log.prototype.isEnabled = function isEnabled() {
    return this.level_ != LogLevel.OFF;
  };

  /**
   * Reports a fine-grained message.
   * @param {string} tag
   * @param {...*} var_args
   */


  Log.prototype.fine = function fine(tag, var_args) {
    if (this.level_ >= LogLevel.FINE) {
      this.msg_(tag, 'FINE', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports a informational message.
   * @param {string} tag
   * @param {...*} var_args
   */


  Log.prototype.info = function info(tag, var_args) {
    if (this.level_ >= LogLevel.INFO) {
      this.msg_(tag, 'INFO', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports a warning message.
   * @param {string} tag
   * @param {...*} var_args
   */


  Log.prototype.warn = function warn(tag, var_args) {
    if (this.level_ >= LogLevel.WARN) {
      this.msg_(tag, 'WARN', Array.prototype.slice.call(arguments, 1));
    }
  };

  /**
   * Reports an error message. If the logging is disabled, the error is rethrown
   * asynchronously.
   * @param {string} tag
   * @param {...*} var_args
   * @return {!Error|undefined}
   * @private
   */


  Log.prototype.error_ = function error_(tag, var_args) {
    if (this.level_ >= LogLevel.ERROR) {
      this.msg_(tag, 'ERROR', Array.prototype.slice.call(arguments, 1));
    } else {
      var error = createErrorVargs.apply(null, Array.prototype.slice.call(arguments, 1));
      this.prepareError_(error);
      return error;
    }
  };

  /**
   * Reports an error message.
   * @param {string} tag
   * @param {...*} var_args
   * @return {!Error|undefined}
   */


  Log.prototype.error = function error(tag, var_args) {
    var error = this.error_.apply(this, arguments);
    if (error) {
      error.name = tag || error.name;
      // reportError is installed globally per window in the entry point.
      self.reportError(error);
    }
  };

  /**
   * Reports an error message and marks with an expected property. If the
   * logging is disabled, the error is rethrown asynchronously.
   * @param {string} unusedTag
   * @param {...*} var_args
   */


  Log.prototype.expectedError = function expectedError(unusedTag, var_args) {
    var error = this.error_.apply(this, arguments);
    if (error) {
      error.expected = true;
      // reportError is installed globally per window in the entry point.
      self.reportError(error);
    }
  };

  /**
   * Creates an error object.
   * @param {...*} var_args
   * @return {!Error}
   */


  Log.prototype.createError = function createError(var_args) {
    var error = createErrorVargs.apply(null, arguments);
    this.prepareError_(error);
    return error;
  };

  /**
   * Creates an error object with its expected property set to true.
   * @param {...*} var_args
   * @return {!Error}
   */


  Log.prototype.createExpectedError = function createExpectedError(var_args) {
    var error = createErrorVargs.apply(null, arguments);
    this.prepareError_(error);
    error.expected = true;
    return error;
  };

  /**
   * Throws an error if the first argument isn't trueish.
   *
   * Supports argument substitution into the message via %s placeholders.
   *
   * Throws an error object that has two extra properties:
   * - associatedElement: This is the first element provided in the var args.
   *   It can be used for improved display of error messages.
   * - messageArray: The elements of the substituted message as non-stringified
   *   elements in an array. When e.g. passed to console.error this yields
   *   native displays of things like HTML elements.
   *
   * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
   *     not evaluate to true.
   * @param {string=} opt_message The assertion message
   * @param {...*} var_args Arguments substituted into %s in the message.
   * @return {T} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 0*/


  Log.prototype.assert = function assert(shouldBeTrueish, opt_message, var_args) {
    var firstElement = void 0;
    if (!shouldBeTrueish) {
      var message = opt_message || 'Assertion failed';
      var splitMessage = message.split('%s');
      var first = splitMessage.shift();
      var formatted = first;
      var messageArray = [];
      pushIfNonEmpty(messageArray, first);
      for (var i = 2; i < arguments.length; i++) {
        var val = arguments[i];
        if (val && val.tagName) {
          firstElement = val;
        }
        var nextConstant = splitMessage.shift();
        messageArray.push(val);
        pushIfNonEmpty(messageArray, nextConstant.trim());
        formatted += toString(val) + nextConstant;
      }
      var e = new Error(formatted);
      e.fromAssert = true;
      e.associatedElement = firstElement;
      e.messageArray = messageArray;
      this.prepareError_(e);
      // reportError is installed globally per window in the entry point.
      self.reportError(e);
      throw e;
    }
    return shouldBeTrueish;
  };

  /**
   * Throws an error if the first argument isn't an Element
   *
   * Otherwise see `assert` for usage
   *
   * @param {*} shouldBeElement
   * @param {string=} opt_message The assertion message
   * @return {!Element} The value of shouldBeTrueish.
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/


  Log.prototype.assertElement = function assertElement(shouldBeElement, opt_message) {
    var shouldBeTrueish = shouldBeElement && shouldBeElement.nodeType == 1;
    this.assert(shouldBeTrueish, (opt_message || 'Element expected') + ': %s', shouldBeElement);
    return (/** @type {!Element} */shouldBeElement
    );
  };

  /**
   * Throws an error if the first argument isn't a string. The string can
   * be empty.
   *
   * For more details see `assert`.
   *
   * @param {*} shouldBeString
   * @param {string=} opt_message The assertion message
   * @return {string} The string value. Can be an empty string.
   */
  /*eslint "google-camelcase/google-camelcase": 2*/


  Log.prototype.assertString = function assertString(shouldBeString, opt_message) {
    this.assert(typeof shouldBeString == 'string', (opt_message || 'String expected') + ': %s', shouldBeString);
    return (/** @type {string} */shouldBeString
    );
  };

  /**
   * Throws an error if the first argument isn't a number. The allowed values
   * include `0` and `NaN`.
   *
   * For more details see `assert`.
   *
   * @param {*} shouldBeNumber
   * @param {string=} opt_message The assertion message
   * @return {number} The number value. The allowed values include `0`
   *   and `NaN`.
   */


  Log.prototype.assertNumber = function assertNumber(shouldBeNumber, opt_message) {
    this.assert(typeof shouldBeNumber == 'number', (opt_message || 'Number expected') + ': %s', shouldBeNumber);
    return (/** @type {number} */shouldBeNumber
    );
  };

  /**
   * Asserts and returns the enum value. If the enum doesn't contain such a value,
   * the error is thrown.
   *
   * @param {!Object<T>} enumObj
   * @param {string} s
   * @param {string=} opt_enumName
   * @return T
   * @template T
   */
  /*eslint "google-camelcase/google-camelcase": 2*/


  Log.prototype.assertEnumValue = function assertEnumValue(enumObj, s, opt_enumName) {
    if ((0, _types.isEnumValue)(enumObj, s)) {
      return s;
    }
    this.assert(false, 'Unknown %s value: "%s"', opt_enumName || 'enum', s);
  };

  /**
   * @param {!Error} error
   * @private
   */


  Log.prototype.prepareError_ = function prepareError_(error) {
    error = duplicateErrorIfNecessary(error);
    if (this.suffix_) {
      if (!error.message) {
        error.message = this.suffix_;
      } else if (error.message.indexOf(this.suffix_) == -1) {
        error.message += this.suffix_;
      }
    } else if (isUserErrorMessage(error.message)) {
      error.message = error.message.replace(USER_ERROR_SENTINEL, '');
    }
  };

  return Log;
}();

/**
 * @param {string|!Element} val
 * @return {string}
 */


function toString(val) {
  // Do check equivalent to `val instanceof Element` without cross-window bug
  if (val && val.nodeType == 1) {
    return val.tagName.toLowerCase() + (val.id ? '#' + val.id : '');
  }
  return (/** @type {string} */val
  );
}

/**
 * @param {!Array} array
 * @param {*} val
 */
function pushIfNonEmpty(array, val) {
  if (val != '') {
    array.push(val);
  }
}

/**
 * Some exceptions (DOMException, namely) have read-only message.
 * @param {!Error} error
 * @return {!Error};
 */
function duplicateErrorIfNecessary(error) {
  var message = error.message;
  var test = String(Math.random());
  error.message = test;

  if (error.message === test) {
    error.message = message;
    return error;
  }

  var e = new Error(error.message);
  // Copy all the extraneous things we attach.
  for (var prop in error) {
    e[prop] = error[prop];
  }
  // Ensure these are copied.
  e.stack = error.stack;
  return e;
}

/**
 * @param {...*} var_args
 * @return {!Error}
 * @private
 */
function createErrorVargs(var_args) {
  var error = null;
  var message = '';
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (arg instanceof Error && !error) {
      error = duplicateErrorIfNecessary(arg);
    } else {
      if (message) {
        message += ' ';
      }
      message += arg;
    }
  }

  if (!error) {
    error = new Error(message);
  } else if (message) {
    error.message = message + ': ' + error.message;
  }
  return error;
}

/**
 * Rethrows the error without terminating the current context. This preserves
 * whether the original error designation is a user error or a dev error.
 * @param {...*} var_args
 */
function rethrowAsync(var_args) {
  var error = createErrorVargs.apply(null, arguments);
  setTimeout(function () {
    // reportError is installed globally per window in the entry point.
    self.reportError(error);
    throw error;
  });
}

/**
 * Cache for logs. We do not use a Service since the service module depends
 * on Log and closure literally can't even.
 * @type {{user: ?Log, dev: ?Log, userForEmbed: ?Log}}
 */
self.log = self.log || {
  user: null,
  dev: null,
  userForEmbed: null
};

var logs = self.log;

/**
 * Eventually holds a constructor for Log objects. Lazily initialized, so we
 * can avoid ever referencing the real constructor except in JS binaries
 * that actually want to include the implementation.
 * @type {?Function}
 */
var logConstructor = null;

function initLogConstructor() {
  logConstructor = Log;
  // Initialize instances for use. If a binary (an extension for example) that
  // does not call `initLogConstructor` invokes `dev()` or `user()` earlier
  // than the binary that does call `initLogConstructor` (amp.js), the extension
  // will throw an error as that extension will never be able to initialize
  // the log instances and we also don't want it to call `initLogConstructor`
  // either (since that will cause the Log implementation to be bundled into that
  // binary). So we must initialize the instances eagerly so that they are
  // ready for use (stored globally) after the main binary calls
  // `initLogConstructor`.
  dev();
  user();
}

function resetLogConstructorForTesting() {
  logConstructor = null;
}

/**
 * Publisher level log.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Development mode is enabled via `#development=1` or logging is explicitly
 *     enabled via `#log=D` where D >= 1.
 *
 * @param {!Element=} opt_element
 * @return {!Log}
 */
function user(opt_element) {
  if (!logs.user) {
    logs.user = getUserLogger(USER_ERROR_SENTINEL);
  }
  if (!isFromEmbed(logs.user.win, opt_element)) {
    return logs.user;
  } else {
    if (logs.userForEmbed) {
      return logs.userForEmbed;
    }
    return logs.userForEmbed = getUserLogger(USER_ERROR_EMBED_SENTINEL);
  }
}

/**
 * Getter for user logger
 * @param {string=} suffix
 * @returns {!Log}
 */
function getUserLogger(suffix) {
  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }
  return new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);
    if (mode.development || logNum >= 1) {
      return LogLevel.FINE;
    }
    return LogLevel.OFF;
  }, suffix);
}

/**
 * AMP development log. Calls to `devLog().assert` and `dev.fine` are stripped in
 * the PROD binary. However, `devLog().assert` result is preserved in either case.
 *
 * Enabled in the following conditions:
 *  1. Not disabled using `#log=0`.
 *  2. Logging is explicitly enabled via `#log=D`, where D >= 2.
 *
 * @return {!Log}
 */
function dev() {
  if (logs.dev) {
    return logs.dev;
  }
  if (!logConstructor) {
    throw new Error('failed to call initLogConstructor');
  }
  return logs.dev = new logConstructor(self, function (mode) {
    var logNum = parseInt(mode.log, 10);
    if (logNum >= 3) {
      return LogLevel.FINE;
    }
    if (logNum >= 2) {
      return LogLevel.INFO;
    }
    return LogLevel.OFF;
  });
}

/**
 * @param {!Window} win
 * @param {!Element=} opt_element
 * @returns {boolean} isEmbed
 */
function isFromEmbed(win, opt_element) {
  if (!opt_element) {
    return false;
  }
  return opt_element.ownerDocument.defaultView != win;
}

},{"./mode":30,"./mode-object":29,"./types":48}],29:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModeObject = getModeObject;

var _mode = require('./mode');

/**
 * Provides info about the current app. This return value may be cached and
 * passed around as it will always be DCE'd.
 * @param {?Window=} opt_win
 * @return {!./mode.ModeDef}
 */
function getModeObject(opt_win) {
  return {
    localDev: (0, _mode.getMode)(opt_win).localDev,
    development: (0, _mode.getMode)(opt_win).development,
    filter: (0, _mode.getMode)(opt_win).filter,
    minified: (0, _mode.getMode)(opt_win).minified,
    lite: (0, _mode.getMode)(opt_win).lite,
    test: (0, _mode.getMode)(opt_win).test,
    log: (0, _mode.getMode)(opt_win).log,
    version: (0, _mode.getMode)(opt_win).version,
    rtvVersion: (0, _mode.getMode)(opt_win).rtvVersion
  };
} /**
   * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

},{"./mode":30}],30:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModeDef = undefined;
exports.getMode = getMode;
exports.getRtvVersionForTesting = getRtvVersionForTesting;
exports.resetRtvVersionForTesting = resetRtvVersionForTesting;

var _string = require('./string');

var _urlParseQueryString = require('./url-parse-query-string');

/**
 * @typedef {{
 *   localDev: boolean,
 *   development: boolean,
 *   filter: (string|undefined),
 *   minified: boolean,
 *   lite: boolean,
 *   test: boolean,
 *   log: (string|undefined),
 *   version: string,
 *   rtvVersion: string,
 * }}
 */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ModeDef = exports.ModeDef = void 0;

/** @type {string} */
var version = '1516482726434';

/**
 * `rtvVersion` is the prefixed version we serve off of the cdn.
 * The prefix denotes canary(00) or prod(01) or an experiment version ( > 01).
 * @type {string}
 */
var rtvVersion = '';

/**
 * A #querySelector query to see if we have any scripts with development paths.
 * @type {string}
 */
var developmentScriptQuery = 'script[src*="/dist/"],script[src*="/base/"]';

/**
 * Provides info about the current app.
 * @param {?Window=} opt_win
 * @return {!ModeDef}
 */
function getMode(opt_win) {
  var win = opt_win || self;
  if (win.AMP_MODE) {
    return win.AMP_MODE;
  }
  return win.AMP_MODE = getMode_(win);
}

/**
 * Provides info about the current app.
 * @param {!Window} win
 * @return {!ModeDef}
 */
function getMode_(win) {
  // Magic constants that are replaced by closure compiler.
  // IS_MINIFIED is always replaced with true when closure compiler is used
  // while IS_DEV is only replaced when the --fortesting flag is NOT used.
  var IS_DEV = true;
  var IS_MINIFIED = false;
  var FORCE_LOCALDEV = !!(self.AMP_CONFIG && self.AMP_CONFIG.localDev);
  var AMP_CONFIG_3P_FRAME_HOST = self.AMP_CONFIG && self.AMP_CONFIG.thirdPartyFrameHost;

  var isLocalDev = true; //IS_DEV && !!(win.location.hostname == 'localhost' || FORCE_LOCALDEV && win.location.hostname == AMP_CONFIG_3P_FRAME_HOST || win.location.ancestorOrigins && win.location.ancestorOrigins[0] && (0, _string.startsWith)(win.location.ancestorOrigins[0], 'http://localhost:')) && (
  // Filter out localhost running against a prod script.
  // Because all allowed scripts are ours, we know that these can only
  // occur during local dev.
  !win.document || !!win.document.querySelector(developmentScriptQuery));

  var hashQuery = (0, _urlParseQueryString.parseQueryString_)(
  // location.originalHash is set by the viewer when it removes the fragment
  // from the URL.
  win.location.originalHash || win.location.hash);

  var searchQuery = (0, _urlParseQueryString.parseQueryString_)(win.location.search);

  if (!rtvVersion) {
    rtvVersion = getRtvVersion(win, isLocalDev);
  }

  // The `minified`, `test` and `localDev` properties are replaced
  // as boolean literals when we run `gulp dist` without the `--fortesting`
  // flags. This improved DCE on the production file we deploy as the code
  // paths for localhost/testing/development are eliminated.
  return {
    localDev: isLocalDev,
    // Triggers validation
    development: !!(hashQuery['development'] == '1' || win.AMP_DEV_MODE),
    examiner: hashQuery['development'] == '2',
    // Allows filtering validation errors by error category. For the
    // available categories, see ErrorCategory in validator/validator.proto.
    filter: hashQuery['filter'],
    minified: IS_MINIFIED,
    // Whether document is in an amp-lite viewer. It signal that the user
    // would prefer to use less bandwidth.
    lite: searchQuery['amp_lite'] != undefined,
    test: IS_DEV && !!(win.AMP_TEST || win.__karma__),
    log: hashQuery['log'],
    version: version,
    rtvVersion: rtvVersion
  };
}

/**
 * Retrieve the `rtvVersion` which will have a numeric prefix
 * denoting canary/prod/experiment (unless `isLocalDev` is true).
 *
 * @param {!Window} win
 * @param {boolean} isLocalDev
 * @return {string}
 */
function getRtvVersion(win, isLocalDev) {
  // If it's local dev then we won't actually have a full version so
  // just use the version.
  if (isLocalDev) {
    return version;
  }

  if (win.AMP_CONFIG && win.AMP_CONFIG.v) {
    return win.AMP_CONFIG.v;
  }

  // Currently `1516482726434` and thus `mode.version` contain only
  // major version. The full version however must also carry the minor version.
  // We will default to production default `01` minor version for now.
  // TODO(erwinmombay): decide whether 1516482726434 should contain
  // minor version.
  return '01' + version;
}

/**
 * @param {!Window} win
 * @param {boolean} isLocalDev
 * @return {string}
 * @visibleForTesting
 */
function getRtvVersionForTesting(win, isLocalDev) {
  return getRtvVersion(win, isLocalDev);
}

/** @visibleForTesting */
function resetRtvVersionForTesting() {
  rtvVersion = '';
}

},{"./string":45,"./url-parse-query-string":49}],31:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OriginExperiments = undefined;

var _bytes = require('./utils/bytes');

var _url = require('./url');

var _json = require('./json');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

/**
 * Generates, signs and verifies origin experiments.
 */
var OriginExperiments = exports.OriginExperiments = function () {
  /**
   * @param {!./service/crypto-impl.Crypto} crypto
   */
  function OriginExperiments(crypto) {
    _classCallCheck(this, OriginExperiments);

    /** @private {!./service/crypto-impl.Crypto} */
    this.crypto_ = crypto;
  }

  /**
   * Generates an RSA public/private key pair for signing and verifying.
   * @return {!Promise}
   */


  OriginExperiments.prototype.generateKeys = function generateKeys() {
    var generationAlgo = Object.assign({
      modulusLength: 2048,
      publicExponent: Uint8Array.of(1, 0, 1)
    }, this.crypto_.pkcsAlgo);
    return this.crypto_.subtle.generateKey(
    /** @type {{name: string}} */generationAlgo,
    /* extractable */true,
    /* keyUsages */['sign', 'verify']);
  };

  /**
   * Generates an origin experiment token given a config json.
   * @param {number} version
   * @param {!JsonObject} json
   * @param {!webCrypto.CryptoKey} privateKey
   * @return {!Promise<string>}
   */


  OriginExperiments.prototype.generateToken = function generateToken(version, json, privateKey) {
    var _this = this;

    var config = (0, _bytes.stringToBytes)(JSON.stringify(json));
    var data = this.prepend_(version, config);
    return this.sign_(data, privateKey).then(function (signature) {
      return _this.append_(data, new Uint8Array(signature));
    });
  };

  /**
   * Verifies an origin experiment token given a public key.
   * @param {string} token
   * @param {!Location} location
   * @param {!webCrypto.CryptoKey} publicKey
   * @return {!Promise<string>} If token is valid, resolves with the
   *     experiment ID. Otherwise, rejects with validation error.
   */


  OriginExperiments.prototype.verifyToken = function verifyToken(token, location, publicKey) {
    var _this2 = this;

    return new Promise(function (resolve) {
      var i = 0;
      var bytes = (0, _bytes.stringToBytes)(atob(token));

      // Parse version.
      var version = bytes[i];
      if (version !== 0) {
        throw new Error('Unrecognized token version: ' + version);
      }
      i += 1;

      // Parse config length.
      var length = new DataView(bytes.buffer).getUint32(i);
      i += 4; // Number of bytes in Uint32 config length.
      if (length > bytes.length - i) {
        throw new Error('Unexpected config length: ' + length);
      }

      // Parse config itself.
      var configBytes = bytes.subarray(i, i + length);
      i += length;

      // Parse unsigned data and its signature.
      var data = bytes.subarray(0, i);
      var signature = bytes.subarray(i);

      resolve(_this2.verify_(signature, data, publicKey).then(function (verified) {
        if (!verified) {
          throw new Error('Failed to verify token signature.');
        }
        // Convert config from bytes to JS object.
        var configStr = (0, _bytes.bytesToString)(configBytes);
        var config = (0, _json.parseJson)(configStr);

        // Check token experiment origin against `location`.
        var approvedOrigin = (0, _url.parseUrl)(config['origin']).origin;
        var sourceOrigin = (0, _url.getSourceOrigin)(location);
        if (approvedOrigin !== sourceOrigin) {
          throw new Error('Config origin (' + approvedOrigin + ') does not match ' + ('window (' + sourceOrigin + ').'));
        }

        // Check token expiration date.
        var experimentId = config['experiment'];
        var expiration = config['expiration'];
        if (expiration >= Date.now()) {
          return experimentId;
        } else {
          throw new Error('Experiment "' + experimentId + '" has expired.');
        }
      }));
    });
  };

  /**
   * Returns a byte array: (version + config.length + config)
   * @param {number} version
   * @param {!Uint8Array} config
   * @return {!Uint8Array}
   */


  OriginExperiments.prototype.prepend_ = function prepend_(version, config) {
    var data = new Uint8Array(config.length + 5);
    data[0] = version;
    // Insert config length into bytes 1 through 5.
    new DataView(data.buffer).setUint32(1, config.length, false);
    data.set(config, 5);
    return data;
  };

  /**
   * Returns base64(data + signature).
   * @param {!Uint8Array} data
   * @param {!Uint8Array} signature
   * @return {string}
   */


  OriginExperiments.prototype.append_ = function append_(data, signature) {
    var string = (0, _bytes.bytesToString)(data) + (0, _bytes.bytesToString)(signature);
    return btoa(string);
  };

  /**
   * Wraps SubtleCrypto.sign().
   * @param {!Uint8Array} data
   * @param {!webCrypto.CryptoKey} privateKey
   * @return {!Promise}
   */


  OriginExperiments.prototype.sign_ = function sign_(data, privateKey) {
    return this.crypto_.subtle.sign(this.crypto_.pkcsAlgo, privateKey, data);
  };

  /**
   * Wraps SubtleCrypto.verify().
   * @param {!Uint8Array} signature
   * @param {!Uint8Array} data
   * @param {!webCrypto.CryptoKey} publicKey
   * @return {!Promise<boolean>}
   */


  OriginExperiments.prototype.verify_ = function verify_(signature, data, publicKey) {
    return this.crypto_.verifyPkcs(publicKey, signature, data);
  };

  return OriginExperiments;
}();

},{"./json":27,"./url":51,"./utils/bytes":53}],32:[function(require,module,exports){
var _documentRegisterElement = require('document-register-element/build/document-register-element.node');

var _documentRegisterElement2 = _interopRequireDefault(_documentRegisterElement);

var _domtokenlistToggle = require('./polyfills/domtokenlist-toggle');

var _documentContains = require('./polyfills/document-contains');

var _mathSign = require('./polyfills/math-sign');

var _objectAssign = require('./polyfills/object-assign');

var _promise = require('./polyfills/promise');

var _arrayIncludes = require('./polyfills/array-includes');

var _mode = require('./mode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  Only install in closure binary and not in babel/browserify binary, since in
  the closure binary we strip out the `document-register-element` install side
  effect so we can tree shake the dependency correctly and we have to make
  sure to not `install` it during dev since the `install` is done as a side
  effect in importing the module.
*/
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Importing the document-register-element module has the side effect
// of installing the custom elements polyfill if necessary.
if (!(0, _mode.getMode)().localDev) {
  (0, _documentRegisterElement2.default)(self, 'auto');
}
(0, _domtokenlistToggle.install)(self);
(0, _mathSign.install)(self);
(0, _objectAssign.install)(self);
(0, _promise.install)(self);
(0, _documentContains.install)(self);
(0, _arrayIncludes.install)(self);

},{"./mode":30,"./polyfills/array-includes":33,"./polyfills/document-contains":34,"./polyfills/domtokenlist-toggle":35,"./polyfills/math-sign":36,"./polyfills/object-assign":37,"./polyfills/promise":38,"document-register-element/build/document-register-element.node":12}],33:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns true if the element is in the array and false otherwise.
 *
 * @param {*} value
 * @param {number=} opt_fromIndex
 * @return {boolean}
 * @this {Array}
 */
function includes(value, opt_fromIndex) {
  var fromIndex = opt_fromIndex || 0;
  var len = this.length;
  var i = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);
  for (; i < len; i++) {
    var other = this[i];
    // If value has been found OR (value is NaN AND other is NaN)
    /*eslint "no-self-compare": 0*/
    if (other === value || value !== value && other !== other) {
      return true;
    }
  }
  return false;
}

/**
* Sets the Array.contains polyfill if it does not exist.
* @param {!Window} win
*/
function install(win) {
  if (!win.Array.prototype.includes) {
    win.Object.defineProperty(Array.prototype, 'includes', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: includes
    });
  }
}

},{}],34:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `document.contains()` method. Notice that according to spec
 * `document.contains` is inclusionary.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param {?Node} node
 * @return {boolean}
 * @this {Node}
 */
function documentContainsPolyfill(node) {
  // Per spec, "contains" method is inclusionary
  // i.e. `node.contains(node) == true`. However, we still need to test
  // equality to the document itself.
  return node == this || this.documentElement.contains(node);
}

/**
 * Polyfills `HTMLDocument.contains` API.
 * @param {!Window} win
 */
function install(win) {
  if (!win.HTMLDocument.prototype.contains) {
    win.Object.defineProperty(win.HTMLDocument.prototype, 'contains', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: documentContainsPolyfill
    });
  }
}

},{}],35:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `DOMTokenList.prototype.toggle(token, opt_force)` method.
 * This is specially important because IE does not support `opt_force` attribute.
 * See https://goo.gl/hgKNYY for details.
 * @param {string} token
 * @param {boolean=} opt_force
 * @this {DOMTokenList}
 * @return {boolean}
 */
function domTokenListTogglePolyfill(token, opt_force) {
  var remove = opt_force === undefined ? this.contains(token) : !opt_force;
  if (remove) {
    this.remove(token);
    return false;
  } else {
    this.add(token);
    return true;
  }
}

/**
 * Polyfills `DOMTokenList.prototype.toggle` API in IE.
 * @param {!Window} win
 */
function install(win) {
  if (isIe(win) && win.DOMTokenList) {
    win.Object.defineProperty(win.DOMTokenList.prototype, 'toggle', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: domTokenListTogglePolyfill
    });
  }
}

/**
 * Whether the current browser is a IE browser.
 * @param {!Window} win
 * @return {boolean}
 */
function isIe(win) {
  return (/Trident|MSIE|IEMobile/i.test(win.navigator.userAgent)
  );
}

},{}],36:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Parses the number x and returns its sign. For positive x returns 1, for
 * negative, -1. For 0 and -0, returns 0 and -0 respectively. For any number
 * that parses to NaN, returns NaN.
 *
 * @param {number} x
 * @returns {number}
 */
function sign(x) {
  x = Number(x);

  // If x is 0, -0, or NaN, return it.
  if (!x) {
    return x;
  }

  return x > 0 ? 1 : -1;
};

/**
 * Sets the Math.sign polyfill if it does not exist.
 * @param {!Window} win
 */
function install(win) {
  if (!win.Math.sign) {
    win.Object.defineProperty(win.Math, 'sign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: sign
    });
  }
}

},{}],37:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.install = install;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Copies values of all enumerable own properties from one or more source
 * objects (provided as extended arguments to the function) to a target object.
 *
 * @param {!Object} target
 * @param {...Object} var_args
 * @returns {!Object}
 */
function assign(target, var_args) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source != null) {
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          output[key] = source[key];
        }
      }
    }
  }
  return output;
}

/**
 * Sets the Object.assign polyfill if it does not exist.
 * @param {!Window} win
 */
function install(win) {
  if (!win.Object.assign) {
    win.Object.defineProperty(win.Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

},{}],38:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;

var _promise = require('promise-pjs/promise');

var Promise = _interopRequireWildcard(_promise);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Sets the Promise polyfill if it does not exist.
 * @param {!Window} win
 */
function install(win) {
  if (!win.Promise) {
    win.Promise = /** @type {?} */Promise;
    // In babel the * export is an Object with a default property.
    // In closure compiler it is the Promise function itself.
    if (Promise.default) {
      win.Promise = Promise.default;
    }
    // We copy the individual static methods, because closure
    // compiler flattens the polyfill namespace.
    win.Promise.resolve = Promise.resolve;
    win.Promise.reject = Promise.reject;
    win.Promise.all = Promise.all;
    win.Promise.race = Promise.race;
  }
} /**
   * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS-IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

},{"promise-pjs/promise":13}],39:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForServices = waitForServices;
exports.hasRenderDelayingServices = hasRenderDelayingServices;
exports.includedServices = includedServices;

var _log = require('./log');

var _service = require('./service');

var _services = require('./services');

/**
 * A map of services that delay rendering. The key is the name of the service
 * and the value is a DOM query which is used to check if the service is needed
 * in the current document.
 * Do not add a service unless absolutely necessary.
 *
 * \   \  /  \  /   / /   \     |   _  \     |  \ |  | |  | |  \ |  |  / _____|
 *  \   \/    \/   / /  ^  \    |  |_)  |    |   \|  | |  | |   \|  | |  |  __
 *   \            / /  /_\  \   |      /     |  . `  | |  | |  . `  | |  | |_ |
 *    \    /\    / /  _____  \  |  |\  \----.|  |\   | |  | |  |\   | |  |__| |
 *     \__/  \__/ /__/     \__\ | _| `._____||__| \__| |__| |__| \__|  \______|
 *
 * The equivalent of this list is used for server-side rendering (SSR) and any
 * changes made to it must be made in coordination with caches that implement
 * SSR. For more information on SSR see bit.ly/amp-ssr.
 *
 * @const {!Object<string, string>}
 */
var SERVICES = {
  'amp-dynamic-css-classes': '[custom-element=amp-dynamic-css-classes]',
  'variant': 'amp-experiment',
  'amp-story': 'amp-story[standalone]'
};

/**
 * Maximum milliseconds to wait for all extensions to load before erroring.
 * @const
 */
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var LOAD_TIMEOUT = 3000;

/**
 * Detects any render delaying services that are required on the page,
 * and returns a promise with a timeout.
 * @param {!Window} win
 * @return {!Promise<!Array<*>>} resolves to an Array that has the same length as
 *     the detected render delaying services
 */
function waitForServices(win) {
  var promises = includedServices(win).map(function (service) {
    return _services.Services.timerFor(win).timeoutPromise(LOAD_TIMEOUT, (0, _service.getServicePromise)(win, service), 'Render timeout waiting for service ' + service + ' to be ready.');
  });
  return Promise.all(promises);
}

/**
 * Returns true if the page has a render delaying service.
 * @param {!Window} win
 * @return {boolean}
 */
function hasRenderDelayingServices(win) {
  return includedServices(win).length > 0;
}

/**
 * Detects which, if any, render-delaying extensions are included on the page.
 * @param {!Window} win
 * @return {!Array<string>}
 */
function includedServices(win) {
  /** @const {!Document} */
  var doc = win.document;
  (0, _log.dev)().assert(doc.body);

  return Object.keys(SERVICES).filter(function (service) {
    return doc.querySelector(SERVICES[service]);
  });
}

},{"./log":28,"./service":41,"./services":43}],40:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeHtml = sanitizeHtml;
exports.sanitizeFormattingHtml = sanitizeFormattingHtml;
exports.isValidAttr = isValidAttr;
exports.rewriteAttributeValue = rewriteAttributeValue;
exports.resolveUrlAttr = resolveUrlAttr;

var _htmlSanitizer = require('../third_party/caja/html-sanitizer');

var _url = require('./url');

var _srcset = require('./srcset');

var _log = require('./log');

var _config = require('./config');

var _object = require('./utils/object');

var _string = require('./string');

/** @private @const {string} */
var TAG = 'sanitizer';

/**
 * @const {!Object<string, boolean>}
 * See https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md
 */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var BLACKLISTED_TAGS = {
  'applet': true,
  'audio': true,
  'base': true,
  'embed': true,
  'form': true,
  'frame': true,
  'frameset': true,
  'iframe': true,
  'img': true,
  'link': true,
  'meta': true,
  'object': true,
  'script': true,
  'style': true,
  // TODO(dvoytenko, #1156): SVG is blacklisted temporarily. There's no
  // intention to keep this block for any longer than we have to.
  'svg': true,
  'template': true,
  'video': true
};

/** @const {!Object<string, boolean>} */
var SELF_CLOSING_TAGS = {
  'br': true,
  'col': true,
  'hr': true,
  'img': true,
  'input': true,
  'source': true,
  'track': true,
  'wbr': true,
  'area': true,
  'base': true,
  'command': true,
  'embed': true,
  'keygen': true,
  'link': true,
  'meta': true,
  'param': true
};

/** @const {!Array<string>} */
var WHITELISTED_FORMAT_TAGS = ['b', 'br', 'code', 'del', 'em', 'i', 'ins', 'mark', 'q', 's', 'small', 'strong', 'sub', 'sup', 'time', 'u'];

/** @const {!Array<string>} */
var WHITELISTED_ATTRS = ['fallback', 'href', 'on', 'placeholder', 'option',
/* Attributes added for amp-bind */
// TODO(kmh287): Add more whitelisted attributes for bind?
'text'];

/** @const {!RegExp} */
var WHITELISTED_ATTR_PREFIX_REGEX = /^data-/i;

/** @const {!Array<string>} */
var WHITELISTED_TARGETS = ['_top', '_blank'];

/** @const {!Array<string>} */
var BLACKLISTED_ATTR_VALUES = [
/*eslint no-script-url: 0*/'javascript:',
/*eslint no-script-url: 0*/'vbscript:',
/*eslint no-script-url: 0*/'data:',
/*eslint no-script-url: 0*/'<script',
/*eslint no-script-url: 0*/'</script'];

/** @const {!Object<string, !Object<string, !RegExp>>} */
var BLACKLISTED_TAG_SPECIFIC_ATTR_VALUES = {
  'input': {
    'type': /(?:image|file|password|button)/i
  }
};

/** @const {!Array<string>} */
var BLACKLISTED_FIELDS_ATTR = ['form', 'formaction', 'formmethod', 'formtarget', 'formnovalidate', 'formenctype'];

/** @const {!Object<string, !Array<string>>} */
var BLACKLISTED_TAG_SPECIFIC_ATTRS = {
  'input': BLACKLISTED_FIELDS_ATTR,
  'textarea': BLACKLISTED_FIELDS_ATTR,
  'select': BLACKLISTED_FIELDS_ATTR
};

/**
 * Sanitizes the provided HTML.
 *
 * This function expects the HTML to be already pre-sanitized and thus it does
 * not validate all of the AMP rules - only the most dangerous security-related
 * cases, such as <SCRIPT>, <STYLE>, <IFRAME>.
 *
 * @param {string} html
 * @return {string}
 */
function sanitizeHtml(html) {
  var tagPolicy = _htmlSanitizer.htmlSanitizer.makeTagPolicy();
  var output = [];
  var ignore = 0;

  function emit(content) {
    if (ignore == 0) {
      output.push(content);
    }
  }

  var parser = _htmlSanitizer.htmlSanitizer.makeSaxParser({
    'startTag': function startTag(tagName, attribs) {
      if (ignore > 0) {
        if (!SELF_CLOSING_TAGS[tagName]) {
          ignore++;
        }
        return;
      }
      var bindAttribsIndices = (0, _object.map)();
      // Special handling for attributes for amp-bind which are formatted as
      // [attr]. The brackets are restored at the end of this function.
      for (var i = 0; i < attribs.length; i += 2) {
        var attr = attribs[i];
        if (attr && attr[0] == '[' && attr[attr.length - 1] == ']') {
          bindAttribsIndices[i] = true;
          attribs[i] = attr.slice(1, -1);
        }
      }
      if (BLACKLISTED_TAGS[tagName]) {
        ignore++;
      } else if (!(0, _string.startsWith)(tagName, 'amp-')) {
        // Ask Caja to validate the element as well.
        // Use the resulting properties.
        var savedAttribs = attribs.slice(0);
        var scrubbed = tagPolicy(tagName, attribs);
        if (!scrubbed) {
          ignore++;
        } else {
          attribs = scrubbed.attribs;
          // Restore some of the attributes that AMP is directly responsible
          // for, such as "on"
          for (var _i = 0; _i < attribs.length; _i += 2) {
            var attrib = attribs[_i];
            if (WHITELISTED_ATTRS.includes(attrib)) {
              attribs[_i + 1] = savedAttribs[_i + 1];
            } else if (attrib.search(WHITELISTED_ATTR_PREFIX_REGEX) == 0) {
              attribs[_i + 1] = savedAttribs[_i + 1];
            }
          }
        }
        // `<A>` has special target rules:
        // - Default target is "_top";
        // - Allowed targets are "_blank", "_top";
        // - All other targets are rewritted to "_top".
        if (tagName == 'a') {
          var index = -1;
          var hasHref = false;
          for (var _i2 = 0; _i2 < savedAttribs.length; _i2 += 2) {
            if (savedAttribs[_i2] == 'target') {
              index = _i2 + 1;
            } else if (savedAttribs[_i2] == 'href') {
              // Only allow valid `href` values.
              hasHref = attribs[_i2 + 1] != null;
            }
          }
          var origTarget = index != -1 ? savedAttribs[index] : null;
          if (origTarget != null) {
            origTarget = origTarget.toLowerCase();
            if (WHITELISTED_TARGETS.indexOf(origTarget) != -1) {
              attribs[index] = origTarget;
            } else {
              attribs[index] = '_top';
            }
          } else if (hasHref) {
            attribs.push('target');
            attribs.push('_top');
          }
        }
      }
      if (ignore > 0) {
        if (SELF_CLOSING_TAGS[tagName]) {
          ignore--;
        }
        return;
      }
      emit('<');
      emit(tagName);
      for (var _i3 = 0; _i3 < attribs.length; _i3 += 2) {
        var attrName = attribs[_i3];
        var attrValue = attribs[_i3 + 1];
        if (!isValidAttr(tagName, attrName, attrValue)) {
          continue;
        }
        emit(' ');
        if (bindAttribsIndices[_i3]) {
          emit('[' + attrName + ']');
        } else {
          emit(attrName);
        }
        emit('="');
        if (attrValue) {
          emit(_htmlSanitizer.htmlSanitizer.escapeAttrib(rewriteAttributeValue(tagName, attrName, attrValue)));
        }
        emit('"');
      }
      emit('>');
    },
    'endTag': function endTag(tagName) {
      if (ignore > 0) {
        ignore--;
        return;
      }
      emit('</');
      emit(tagName);
      emit('>');
    },
    'pcdata': emit,
    'rcdata': emit,
    'cdata': emit
  });
  parser(html);
  return output.join('');
}

/**
 * Sanitizes the provided formatting HTML. Only the most basic inline tags are
 * allowed, such as <b>, <i>, etc.
 *
 * @param {string} html
 * @return {string}
 */
function sanitizeFormattingHtml(html) {
  return _htmlSanitizer.htmlSanitizer.sanitizeWithPolicy(html, function (tagName, unusedAttrs) {
    if (!WHITELISTED_FORMAT_TAGS.includes(tagName)) {
      return null;
    }
    return {
      tagName: tagName,
      attribs: []
    };
  });
}

/**
 * Whether the attribute/value are valid.
 * @param {string} tagName
 * @param {string} attrName
 * @param {string} attrValue
 * @return {boolean}
 */
function isValidAttr(tagName, attrName, attrValue) {

  // "on*" attributes are not allowed.
  if ((0, _string.startsWith)(attrName, 'on') && attrName != 'on') {
    return false;
  }

  // Inline styles are not allowed.
  if (attrName == 'style') {
    return false;
  }

  // See validator-main.protoascii
  // https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii
  if (attrName == 'class' && attrValue && /(^|\W)i-amphtml-/i.test(attrValue)) {
    return false;
  }

  // No attributes with "javascript" or other blacklisted substrings in them.
  if (attrValue) {
    var attrValueNorm = attrValue.toLowerCase().replace(/[\s,\u0000]+/g, '');
    for (var i = 0; i < BLACKLISTED_ATTR_VALUES.length; i++) {
      if (attrValueNorm.indexOf(BLACKLISTED_ATTR_VALUES[i]) != -1) {
        return false;
      }
    }
  }

  // Remove blacklisted attributes from specific tags e.g. input[formaction].
  var attrNameBlacklist = BLACKLISTED_TAG_SPECIFIC_ATTRS[tagName];
  if (attrNameBlacklist && attrNameBlacklist.indexOf(attrName) != -1) {
    return false;
  }

  // Remove blacklisted values for specific attributes for specific tags
  // e.g. input[type=image].
  var attrBlacklist = BLACKLISTED_TAG_SPECIFIC_ATTR_VALUES[tagName];
  if (attrBlacklist) {
    var blacklistedValuesRegex = attrBlacklist[attrName];
    if (blacklistedValuesRegex && attrValue.search(blacklistedValuesRegex) != -1) {
      return false;
    }
  }

  return true;
}

/**
 * If (tagName, attrName) is a CDN-rewritable URL attribute, returns the
 * rewritten URL value. Otherwise, returns the unchanged `attrValue`.
 * @see resolveUrlAttr for rewriting rules.
 * @param {string} tagName
 * @param {string} attrName
 * @param {string} attrValue
 * @return {string}
 */
function rewriteAttributeValue(tagName, attrName, attrValue) {
  var tag = tagName.toLowerCase();
  var attr = attrName.toLowerCase();
  if (attr == 'src' || attr == 'href' || attr == 'srcset') {
    return resolveUrlAttr(tag, attr, attrValue, self.location);
  }
  return attrValue;
}

/**
 * Rewrites the URL attribute values. URLs are rewritten as following:
 * - If URL is absolute, it is not rewritten
 * - If URL is relative, it's rewritten as absolute against the source origin
 * - If resulting URL is a `http:` URL and it's for image, the URL is rewritten
 *   again to be served with AMP Cache (cdn.ampproject.org).
 *
 * @param {string} tagName
 * @param {string} attrName
 * @param {string} attrValue
 * @param {!Location} windowLocation
 * @return {string}
 * @private Visible for testing.
 */
function resolveUrlAttr(tagName, attrName, attrValue, windowLocation) {
  (0, _url.checkCorsUrl)(attrValue);
  var isProxyHost = (0, _url.isProxyOrigin)(windowLocation);
  var baseUrl = (0, _url.parseUrl)((0, _url.getSourceUrl)(windowLocation));

  if (attrName == 'href' && !(0, _string.startsWith)(attrValue, '#')) {
    return (0, _url.resolveRelativeUrl)(attrValue, baseUrl);
  }

  if (attrName == 'src') {
    if (tagName == 'amp-img') {
      return resolveImageUrlAttr(attrValue, baseUrl, isProxyHost);
    }
    return (0, _url.resolveRelativeUrl)(attrValue, baseUrl);
  }

  if (attrName == 'srcset') {
    var srcset = void 0;
    try {
      srcset = (0, _srcset.parseSrcset)(attrValue);
    } catch (e) {
      // Do not fail the whole template just because one srcset is broken.
      // An AMP element will pick it up and report properly.
      (0, _log.user)().error(TAG, 'Failed to parse srcset: ', e);
      return attrValue;
    }
    var sources = srcset.getSources();
    for (var i = 0; i < sources.length; i++) {
      sources[i].url = resolveImageUrlAttr(sources[i].url, baseUrl, isProxyHost);
    }
    return srcset.stringify();
  }

  return attrValue;
}

/**
 * Non-HTTPs image URLs are rewritten via proxy.
 * @param {string} attrValue
 * @param {!Location} baseUrl
 * @param {boolean} isProxyHost
 * @return {string}
 */
function resolveImageUrlAttr(attrValue, baseUrl, isProxyHost) {
  var src = (0, _url.parseUrl)((0, _url.resolveRelativeUrl)(attrValue, baseUrl));

  // URLs such as `data:` or proxy URLs are returned as is. Unsafe protocols
  // do not arrive here - already stripped by the sanitizer.
  if (src.protocol == 'data:' || (0, _url.isProxyOrigin)(src) || !isProxyHost) {
    return src.href;
  }

  // Rewrite as a proxy URL.
  return _config.urls.cdn + '/i/' + (src.protocol == 'https:' ? 's/' : '') + encodeURIComponent(src.host) + src.pathname + (src.search || '') + (src.hash || '');
}

},{"../third_party/caja/html-sanitizer":58,"./config":18,"./log":28,"./srcset":44,"./string":45,"./url":51,"./utils/object":54}],41:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableService = exports.Disposable = undefined;
exports.getExistingServiceInEmbedScope = getExistingServiceInEmbedScope;
exports.getExistingServiceForDocInEmbedScope = getExistingServiceForDocInEmbedScope;
exports.installServiceInEmbedScope = installServiceInEmbedScope;
exports.registerServiceBuilder = registerServiceBuilder;
exports.registerServiceBuilderForDoc = registerServiceBuilderForDoc;
exports.getService = getService;
exports.getServicePromise = getServicePromise;
exports.getExistingServiceOrNull = getExistingServiceOrNull;
exports.getServicePromiseOrNull = getServicePromiseOrNull;
exports.getServiceForDoc = getServiceForDoc;
exports.getServicePromiseForDoc = getServicePromiseForDoc;
exports.getServicePromiseOrNullForDoc = getServicePromiseOrNullForDoc;
exports.setParentWindow = setParentWindow;
exports.getParentWindow = getParentWindow;
exports.getTopWindow = getTopWindow;
exports.getParentWindowFrameElement = getParentWindowFrameElement;
exports.getAmpdoc = getAmpdoc;
exports.isDisposable = isDisposable;
exports.assertDisposable = assertDisposable;
exports.disposeServicesForDoc = disposeServicesForDoc;
exports.disposeServicesForEmbed = disposeServicesForEmbed;
exports.isEmbeddable = isEmbeddable;
exports.adoptServiceForEmbed = adoptServiceForEmbed;
exports.adoptServiceForEmbedIfEmbeddable = adoptServiceForEmbedIfEmbeddable;
exports.resetServiceForTesting = resetServiceForTesting;

require('./polyfills');

var _log = require('./log');

var _types = require('./types');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

/**
 * @fileoverview Registration and getter functions for AMP services.
 *
 * Invariant: Service getters never return null for registered services.
 */

// Requires polyfills in immediate side effect.


/**
 * Holds info about a service.
 * - obj: Actual service implementation when available.
 * - promise: Promise for the obj.
 * - resolve: Function to resolve the promise with the object.
 * - context: Argument for ctor, either a window or an ampdoc.
 * - ctor: Function that constructs and returns the service.
 * @typedef {{
 *   obj: (?Object),
 *   promise: (?Promise),
 *   resolve: (?function(!Object)),
 *   context: (?Window|?./service/ampdoc-impl.AmpDoc),
 *   ctor: (?function(new:Object, !Window)|
 *          ?function(new:Object, !./service/ampdoc-impl.AmpDoc)),
 * }}
 */
var ServiceHolderDef = void 0;

/**
 * This interface provides a `dispose` method that will be called by
 * runtime when a service needs to be disposed of.
 * @interface
 */

var Disposable = exports.Disposable = function () {
  function Disposable() {
    _classCallCheck(this, Disposable);
  }

  /**
   * Instructs the service to release any resources it might be holding. Can
   * be called only once in the lifecycle of a service.
   */
  Disposable.prototype.dispose = function dispose() {};

  return Disposable;
}();

/**
 * This interface provides a `adoptEmbedWindow` method that will be called by
 * runtime for a new embed window.
 * @interface
 */


var EmbeddableService = exports.EmbeddableService = function () {
  function EmbeddableService() {
    _classCallCheck(this, EmbeddableService);
  }

  /**
   * Instructs the service to adopt the embed window and add any necessary
   * listeners and resources.
   * @param {!Window} unusedEmbedWin
   */
  EmbeddableService.prototype.adoptEmbedWindow = function adoptEmbedWindow(unusedEmbedWin) {};

  return EmbeddableService;
}();

/**
 * Returns a service with the given id. Assumes that it has been registered
 * already.
 * @param {!Window} win
 * @param {string} id
 * @param {boolean=} opt_fallbackToTopWin
 * @return {Object} The service.
 */


function getExistingServiceInEmbedScope(win, id, opt_fallbackToTopWin) {
  // First, try to resolve via local (embed) window.
  var local = getLocalExistingServiceForEmbedWinOrNull(win, id);
  if (local) {
    return local;
  }
  if (opt_fallbackToTopWin) {
    return getService(win, id);
  }
  return null;
}

/**
 * Returns a service with the given id. Assumes that it has been constructed
 * already.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id
 * @param {boolean=} opt_fallbackToTopWin
 * @return {Object} The service.
 */
function getExistingServiceForDocInEmbedScope(nodeOrDoc, id, opt_fallbackToTopWin) {
  // First, try to resolve via local (embed) window.
  if (nodeOrDoc.nodeType) {
    // If a node is passed, try to resolve via this node.
    var win = (0, _types.toWin)( /** @type {!Document} */(nodeOrDoc.ownerDocument || nodeOrDoc).defaultView);
    var local = getLocalExistingServiceForEmbedWinOrNull(win, id);
    if (local) {
      return local;
    }
  }
  // If an ampdoc is passed or fallback is allowed, continue resolving.
  if (!nodeOrDoc.nodeType || opt_fallbackToTopWin) {
    return getServiceForDoc(nodeOrDoc, id);
  }
  return null;
}

/**
 * Installs a service override on amp-doc level.
 * @param {!Window} embedWin
 * @param {string} id
 * @param {!Object} service The service.
 */
function installServiceInEmbedScope(embedWin, id, service) {
  var topWin = getTopWindow(embedWin);
  (0, _log.dev)().assert(embedWin != topWin, 'Service override can only be installed in embed window: %s', id);
  (0, _log.dev)().assert(!getLocalExistingServiceForEmbedWinOrNull(embedWin, id), 'Service override has already been installed: %s', id);
  registerServiceInternal(embedWin, embedWin, id, function () {
    return service;
  });
  getServiceInternal(embedWin, id); // Force service to build.
}

/**
 * @param {!Window} embedWin
 * @param {string} id
 * @return {?Object}
 */
function getLocalExistingServiceForEmbedWinOrNull(embedWin, id) {
  // Note that this method currently only resolves against the given window.
  // It does not try to go all the way up the parent window chain. We can change
  // this in the future, but for now this gives us a better performance.
  var topWin = getTopWindow(embedWin);
  if (embedWin != topWin && isServiceRegistered(embedWin, id)) {
    return getServiceInternal(embedWin, id);
  } else {
    return null;
  }
}

/**
 * Registers a service given a class to be used as implementation.
 * @param {!Window} win
 * @param {string} id of the service.
 * @param {function(new:Object, !Window)} constructor
 * @param {boolean=} opt_instantiate Whether to immediately create the service
 */
function registerServiceBuilder(win, id, constructor, opt_instantiate) {
  win = getTopWindow(win);
  registerServiceInternal(win, win, id, constructor);
  if (opt_instantiate) {
    getServiceInternal(win, id);
  }
}

/**
 * Returns a service and registers it given a class to be used as
 * implementation.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @param {function(new:Object, !./service/ampdoc-impl.AmpDoc)} constructor
 * @param {boolean=} opt_instantiate Whether to immediately create the service
 */
function registerServiceBuilderForDoc(nodeOrDoc, id, constructor, opt_instantiate) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  var holder = getAmpdocServiceHolder(ampdoc);
  registerServiceInternal(holder, ampdoc, id, constructor);
  if (opt_instantiate) {
    getServiceInternal(holder, id);
  }
}

/**
 * Returns a service for the given id and window (a per-window singleton).
 * Users should typically wrap this as a special purpose function (e.g.
 * `Services.vsyncFor(win)`) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @template T
 * @return {T}
 */
function getService(win, id) {
  win = getTopWindow(win);
  return getServiceInternal(win, id);
}

/**
 * Returns a promise for a service for the given id and window. Also expects
 * an element that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * Users should typically wrap this as a special purpose function (e.g.
 * `Services.vsyncFor(win)`) for type safety and because the factory should not be
 * passed around.
 * @param {!Window} win
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */
function getServicePromise(win, id) {
  return getServicePromiseInternal(win, id);
}

/**
 * Returns a service or null with the given id.
 * @param {!Window} win
 * @param {string} id
 * @return {?Object} The service.
 */
function getExistingServiceOrNull(win, id) {
  win = getTopWindow(win);
  if (isServiceRegistered(win, id)) {
    return getServiceInternal(win, id);
  } else {
    return null;
  }
}

/**
 * Like getServicePromise but returns null if the service was never registered.
 * @param {!Window} win
 * @param {string} id of the service.
 * @return {?Promise<!Object>}
 */
function getServicePromiseOrNull(win, id) {
  return getServicePromiseOrNullInternal(win, id);
}

/**
 * Returns a service for the given id and ampdoc (a per-ampdoc singleton).
 * Expects service `id` to be registered.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @return {T}
 * @template T
 */
function getServiceForDoc(nodeOrDoc, id) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  var holder = getAmpdocServiceHolder(ampdoc);
  return getServiceInternal(holder, id);
}

/**
 * Returns a promise for a service for the given id and ampdoc. Also expects
 * a service that has the actual implementation. The promise resolves when
 * the implementation loaded.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */
function getServicePromiseForDoc(nodeOrDoc, id) {
  return getServicePromiseInternal(getAmpdocServiceHolder(nodeOrDoc), id);
}

/**
 * Like getServicePromiseForDoc but returns null if the service was never
 * registered for this ampdoc.
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @param {string} id of the service.
 * @return {?Promise<!Object>}
 */
function getServicePromiseOrNullForDoc(nodeOrDoc, id) {
  return getServicePromiseOrNullInternal(getAmpdocServiceHolder(nodeOrDoc), id);
}

/**
 * Set the parent and top windows on a child window (friendly iframe).
 * @param {!Window} win
 * @param {!Window} parentWin
 */
function setParentWindow(win, parentWin) {
  win.__AMP_PARENT = parentWin;
  win.__AMP_TOP = getTopWindow(parentWin);
}

/**
 * Returns the parent window for a child window (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */
function getParentWindow(win) {
  return win.__AMP_PARENT || win;
}

/**
 * Returns the top window where AMP Runtime is installed for a child window
 * (friendly iframe).
 * @param {!Window} win
 * @return {!Window}
 */
function getTopWindow(win) {
  return win.__AMP_TOP || win;
}

/**
 * Returns the parent "friendly" iframe if the node belongs to a child window.
 * @param {!Node} node
 * @param {!Window} topWin
 * @return {?HTMLIFrameElement}
 */
function getParentWindowFrameElement(node, topWin) {
  var childWin = (node.ownerDocument || node).defaultView;
  if (childWin && childWin != topWin && getTopWindow(childWin) == topWin) {
    try {
      return (/** @type {?HTMLIFrameElement} */childWin.frameElement
      );
    } catch (e) {
      // Ignore the error.
    }
  }
  return null;
}

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc}
 */
function getAmpdoc(nodeOrDoc) {
  if (nodeOrDoc.nodeType) {
    var win = (0, _types.toWin)( /** @type {!Document} */(nodeOrDoc.ownerDocument || nodeOrDoc).defaultView);
    return getAmpdocService(win).getAmpDoc( /** @type {!Node} */nodeOrDoc);
  }
  return (/** @type {!./service/ampdoc-impl.AmpDoc} */nodeOrDoc
  );
}

/**
 * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
 * @return {!./service/ampdoc-impl.AmpDoc|!Window}
 */
function getAmpdocServiceHolder(nodeOrDoc) {
  var ampdoc = getAmpdoc(nodeOrDoc);
  return ampdoc.isSingleDoc() ? ampdoc.win : ampdoc;
}

/**
 * This is essentially a duplicate of `ampdoc.js`, but necessary to avoid
 * circular dependencies.
 * @param {!Window} win
 * @return {!./service/ampdoc-impl.AmpDocService}
 */
function getAmpdocService(win) {
  return (/** @type {!./service/ampdoc-impl.AmpDocService} */getService(win, 'ampdoc')
  );
}

/**
 * Get service `id` from `holder`. Assumes the service
 * has already been registered.
 * @param {!Object} holder Object holding the service instance.
 * @param {string} id of the service.
 * @return {Object}
 * @template T
 */
function getServiceInternal(holder, id) {
  (0, _log.dev)().assert(isServiceRegistered(holder, id), 'Expected service ' + id + ' to be registered');
  var services = getServices(holder);
  var s = services[id];
  if (!s.obj) {
    (0, _log.dev)().assert(s.ctor, 'Service ' + id + ' registered without ctor nor impl.');
    (0, _log.dev)().assert(s.context, 'Service ' + id + ' registered without context.');
    s.obj = new s.ctor(s.context);
    (0, _log.dev)().assert(s.obj, 'Service ' + id + ' constructed to null.');
    s.ctor = null;
    s.context = null;
    // The service may have been requested already, in which case we have a
    // pending promise we need to fulfill.
    if (s.resolve) {
      s.resolve(s.obj);
    }
  }
  return s.obj;
}

/**
 * @param {!Object} holder Object holding the service instance.
 * @param {!Window|!./service/ampdoc-impl.AmpDoc} context Win or AmpDoc.
 * @param {string} id of the service.
 * @param {?function(new:Object, !Window)|
 *         ?function(new:Object, !./service/ampdoc-impl.AmpDoc)}
 *     ctor Constructor function to new the service. Called with context.
 */
function registerServiceInternal(holder, context, id, ctor) {
  var services = getServices(holder);
  var s = services[id];

  if (!s) {
    s = services[id] = {
      obj: null,
      promise: null,
      resolve: null,
      context: null,
      ctor: null
    };
  }

  if (s.ctor || s.obj) {
    // Service already registered.
    return;
  }

  s.ctor = ctor;
  s.context = context;

  // The service may have been requested already, in which case there is a
  // pending promise that needs to fulfilled.
  if (s.resolve) {
    // getServiceInternal will resolve the promise.
    getServiceInternal(holder, id);
  }
}

/**
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {!Promise<!Object>}
 */
function getServicePromiseInternal(holder, id) {
  var cached = getServicePromiseOrNullInternal(holder, id);
  if (cached) {
    return cached;
  }
  // Service is not registered.

  // TODO(@cramforce): Add a check that if the element is eventually registered
  // that the service is actually provided and this promise resolves.
  var resolve = void 0;
  var promise = new Promise(function (r) {
    resolve = r;
  });
  var services = getServices(holder);
  services[id] = {
    obj: null,
    promise: promise,
    resolve: resolve,
    context: null,
    ctor: null
  };
  return promise;
}

/**
 * Returns a promise for service `id` if the service has been registered
 * on `holder`.
 * @param {!Object} holder
 * @param {string} id of the service.
 * @return {?Promise<!Object>}
 */
function getServicePromiseOrNullInternal(holder, id) {
  var services = getServices(holder);
  var s = services[id];
  if (s) {
    if (s.promise) {
      return s.promise;
    } else {
      // Instantiate service if not already instantiated.
      getServiceInternal(holder, id);
      return s.promise = Promise.resolve( /** @type {!Object} */s.obj);
    }
  }
  return null;
}

/**
 * Returns the object that holds the services registered in a holder.
 * @param {!Object} holder
 * @return {!Object<string,!ServiceHolderDef>}
 */
function getServices(holder) {
  var services = holder.services;
  if (!services) {
    services = holder.services = {};
  }
  return services;
}

/**
 * Whether the specified service implements `Disposable` interface.
 * @param {!Object} service
 * @return {boolean}
 */
function isDisposable(service) {
  return typeof service.dispose == 'function';
}

/**
 * Asserts that the specified service implements `Disposable` interface and
 * typecasts the instance to `Disposable`.
 * @param {!Object} service
 * @return {!Disposable}
 */
function assertDisposable(service) {
  (0, _log.dev)().assert(isDisposable(service), 'required to implement Disposable');
  return (/** @type {!Disposable} */service
  );
}

/**
 * Disposes all disposable (implements `Disposable` interface) services in
 * ampdoc scope.
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc
 */
function disposeServicesForDoc(ampdoc) {
  disposeServicesInternal(ampdoc);
}

/**
 * Disposes all disposable (implements `Disposable` interface) services in
 * embed scope.
 * @param {!Window} embedWin
 */
function disposeServicesForEmbed(embedWin) {
  disposeServicesInternal(embedWin);
}

/**
 * @param {!Object} holder Object holding the service instances.
 */
function disposeServicesInternal(holder) {
  // TODO(dvoytenko): Consider marking holder as destroyed for later-arriving
  // service to be canceled automatically.
  var services = getServices(holder);

  var _loop = function _loop(id) {
    if (!Object.prototype.hasOwnProperty.call(services, id)) {
      return 'continue';
    }
    var serviceHolder = services[id];
    if (serviceHolder.obj) {
      disposeServiceInternal(id, serviceHolder.obj);
    } else if (serviceHolder.promise) {
      serviceHolder.promise.then(function (instance) {
        return disposeServiceInternal(id, instance);
      });
    }
  };

  for (var id in services) {
    var _ret = _loop(id);

    if (_ret === 'continue') continue;
  }
}

/**
 * @param {string} id
 * @param {!Object} service
 */
function disposeServiceInternal(id, service) {
  if (!isDisposable(service)) {
    return;
  }
  try {
    assertDisposable(service).dispose();
  } catch (e) {
    // Ensure that a failure to dispose a service does not disrupt other
    // services.
    (0, _log.dev)().error('SERVICE', 'failed to dispose service', id, e);
  }
}

/**
 * Whether the specified service implements `EmbeddableService` interface.
 * @param {!Object} service
 * @return {boolean}
 */
function isEmbeddable(service) {
  return typeof service.adoptEmbedWindow == 'function';
}

/**
 * Adopts an embeddable (implements `EmbeddableService` interface) service
 * in embed scope.
 * @param {!Window} embedWin
 * @param {string} serviceId
 */
function adoptServiceForEmbed(embedWin, serviceId) {
  var adopted = adoptServiceForEmbedIfEmbeddable(embedWin, serviceId);
  (0, _log.dev)().assert(adopted, 'Service ' + serviceId + ' not found on parent ' + 'or doesn\'t implement EmbeddableService.');
}

/**
 * Adopts an embeddable (implements `EmbeddableService` interface) service
 * in embed scope.
 * @param {!Window} embedWin
 * @param {string} serviceId
 * @return {boolean}
 */
function adoptServiceForEmbedIfEmbeddable(embedWin, serviceId) {
  var frameElement = /** @type {!Node} */(0, _log.dev)().assert(embedWin.frameElement, 'frameElement not found for embed');
  var ampdoc = getAmpdoc(frameElement);
  var holder = getAmpdocServiceHolder(ampdoc);
  if (!isServiceRegistered(holder, serviceId)) {
    return false;
  }
  var service = getServiceForDoc(frameElement, serviceId);
  if (!isEmbeddable(service)) {
    return false;
  }
  service.adoptEmbedWindow(embedWin);
  return true;
}

/**
 * Resets a single service, so it gets recreated on next getService invocation.
 * @param {!Object} holder
 * @param {string} id of the service.
 */
function resetServiceForTesting(holder, id) {
  if (holder.services) {
    holder.services[id] = null;
  }
}

/**
 * @param {!Object} holder Object holding the service instance.
 * @param {string} id of the service.
 * @return {boolean}
 */
function isServiceRegistered(holder, id) {
  var service = holder.services && holder.services[id];
  // All registered services must have an implementation or a constructor.
  return !!(service && (service.ctor || service.obj));
}

},{"./log":28,"./polyfills":32,"./types":48}],42:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateExtensionScriptUrl = calculateExtensionScriptUrl;
exports.calculateEntryPointScriptUrl = calculateEntryPointScriptUrl;

var _config = require('../config');

var _mode = require('../mode');

/**
 * Calculate the base url for any scripts.
 * @param {!Location} location The window's location
 * @param {boolean=} opt_isLocalDev
 * @return {string}
 */
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function calculateScriptBaseUrl(location, opt_isLocalDev) {
  if (opt_isLocalDev) {
    return location.protocol + '//' + location.host + '/amp/dist';
  }
  return _config.urls.cdn;
}

/**
 * Calculate script url for an extension.
 * @param {!Location} location The window's location
 * @param {string} extensionId
 * @param {string=} opt_extensionVersion
 * @param {boolean=} opt_isLocalDev
 * @return {string}
 */
function calculateExtensionScriptUrl(location, extensionId, opt_extensionVersion, opt_isLocalDev) {
  var base = calculateScriptBaseUrl(location, opt_isLocalDev);
  var rtv = (0, _mode.getMode)().rtvVersion;
  var extensionVersion = opt_extensionVersion || '0.1';
  return base + '/rtv/' + rtv + '/v0/' + extensionId + '-' + extensionVersion + '.js';
}

/**
 * Calculate script url for an entry point.
 * If `opt_rtv` is true, returns the URL matching the current RTV.
 * @param {!Location} location The window's location
 * @param {string} entryPoint
 * @param {boolean=} isLocalDev
 * @param {boolean=} opt_rtv
 * @return {string}
 */
function calculateEntryPointScriptUrl(location, entryPoint, isLocalDev, opt_rtv) {
  var base = calculateScriptBaseUrl(location, isLocalDev);
  if (opt_rtv) {
    return base + '/rtv/' + (0, _mode.getMode)().rtvVersion + '/' + entryPoint + '.js';
  }
  return base + '/' + entryPoint + '.js';
}

},{"../config":18,"../mode":30}],43:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Services = undefined;

var _service = require('./service');

var _elementService = require('./element-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

var Services = exports.Services = function () {
  function Services() {
    _classCallCheck(this, Services);
  }

  /**
   * Returns a promise for the Access service.
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<!../extensions/amp-access/0.1/amp-access.AccessService>}
   */
  Services.accessServiceForDoc = function accessServiceForDoc(nodeOrDoc) {
    return (/** @type {!Promise<
           !../extensions/amp-access/0.1/amp-access.AccessService>} */(0, _elementService.getElementServiceForDoc)(nodeOrDoc, 'access', 'amp-access')
    );
  };

  /**
   * Returns a promise for the Access service or a promise for null if the service
   * is not available on the current page.
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<?../extensions/amp-access/0.1/amp-access.AccessService>}
   */


  Services.accessServiceForDocOrNull = function accessServiceForDocOrNull(nodeOrDoc) {
    return (/** @type {
           !Promise<?../extensions/amp-access/0.1/amp-access.AccessService>} */(0, _elementService.getElementServiceIfAvailableForDoc)(nodeOrDoc, 'access', 'amp-access')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/action-impl.ActionService}
   */


  Services.actionServiceForDoc = function actionServiceForDoc(nodeOrDoc) {
    return (/** @type {!./service/action-impl.ActionService} */(0, _service.getExistingServiceForDocInEmbedScope)(nodeOrDoc, 'action', /* opt_fallbackToTopWin */true)
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<!Activity>}
   */


  Services.activityForDoc = function activityForDoc(nodeOrDoc) {
    return (/** @type {!Promise<!Activity>} */(0, _elementService.getElementServiceForDoc)(nodeOrDoc, 'activity', 'amp-analytics')
    );
  };

  /**
   * Returns the global instance of the `AmpDocService` service that can be
   * used to resolve an ampdoc for any node: either in the single-doc or
   * shadow-doc environment.
   * @param {!Window} window
   * @return {!./service/ampdoc-impl.AmpDocService}
   */


  Services.ampdocServiceFor = function ampdocServiceFor(window) {
    return (/** @type {!./service/ampdoc-impl.AmpDocService} */(0, _service.getService)(window, 'ampdoc')
    );
  };

  /**
   * Returns the AmpDoc for the specified context node.
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/ampdoc-impl.AmpDoc}
   */


  Services.ampdoc = function ampdoc(nodeOrDoc) {
    return (0, _service.getAmpdoc)(nodeOrDoc);
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @param {boolean=} loadAnalytics
   * @return {!Promise<!../extensions/amp-analytics/0.1/instrumentation.InstrumentationService>}
   */


  Services.analyticsForDoc = function analyticsForDoc(nodeOrDoc) {
    var loadAnalytics = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (loadAnalytics) {
      // Get Extensions service and force load analytics extension.
      var ampdoc = (0, _service.getAmpdoc)(nodeOrDoc);
      Services.extensionsFor(ampdoc.win). /*OK*/installExtensionForDoc(ampdoc, 'amp-analytics');
    }
    return (/** @type {!Promise<
             !../extensions/amp-analytics/0.1/instrumentation.InstrumentationService
           >} */(0, _elementService.getElementServiceForDoc)(nodeOrDoc, 'amp-analytics-instrumentation', 'amp-analytics')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<?../extensions/amp-analytics/0.1/instrumentation.InstrumentationService>}
   */


  Services.analyticsForDocOrNull = function analyticsForDocOrNull(nodeOrDoc) {
    return (/** @type {!Promise<
             ?../extensions/amp-analytics/0.1/instrumentation.InstrumentationService
           >} */(0, _elementService.getElementServiceIfAvailableForDoc)(nodeOrDoc, 'amp-analytics-instrumentation', 'amp-analytics')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/batched-xhr-impl.BatchedXhr}
   */


  Services.batchedXhrFor = function batchedXhrFor(window) {
    return (/** @type {!./service/batched-xhr-impl.BatchedXhr} */(0, _service.getService)(window, 'batched-xhr')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<?../extensions/amp-bind/0.1/bind-impl.Bind>}
   */


  Services.bindForDocOrNull = function bindForDocOrNull(nodeOrDoc) {
    return (/** @type {!Promise<?../extensions/amp-bind/0.1/bind-impl.Bind>} */(0, _elementService.getElementServiceIfAvailableForDocInEmbedScope)(nodeOrDoc, 'bind', 'amp-bind')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<!./service/cid-impl.Cid>}
   */


  Services.cidForDoc = function cidForDoc(nodeOrDoc) {
    return (/** @type {!Promise<!./service/cid-impl.Cid>} */(0, _service.getServicePromiseForDoc)(nodeOrDoc, 'cid')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/crypto-impl.Crypto}
   */


  Services.cryptoFor = function cryptoFor(window) {
    return (/** @type {!./service/crypto-impl.Crypto} */(0, _service.getService)(window, 'crypto')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/document-info-impl.DocumentInfoDef} Info about the doc
   */


  Services.documentInfoForDoc = function documentInfoForDoc(nodeOrDoc) {
    return (/** @type {!./service/document-info-impl.DocInfo} */(0, _service.getServiceForDoc)(nodeOrDoc, 'documentInfo').get()
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/document-state.DocumentState}
   */


  Services.documentStateFor = function documentStateFor(window) {
    return (0, _service.getService)(window, 'documentState');
  };

  /**
   * @param {!Window} window
   * @return {!./service/extensions-impl.Extensions}
   */


  Services.extensionsFor = function extensionsFor(window) {
    return (/** @type {!./service/extensions-impl.Extensions} */(0, _service.getService)(window, 'extensions')
    );
  };

  /**
   * Returns service implemented in service/history-impl.
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/history-impl.History}
   */


  Services.historyForDoc = function historyForDoc(nodeOrDoc) {
    return (/** @type {!./service/history-impl.History} */(0, _service.getServiceForDoc)(nodeOrDoc, 'history')
    );
  };

  /**
   * @param {!Window} win
   * @return {!./input.Input}
   */


  Services.inputFor = function inputFor(win) {
    return (0, _service.getService)(win, 'input');
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/parallax-impl.ParallaxService}
   */
  Services.parallaxForDoc = function parallaxForDoc(nodeOrDoc) {
    return (/** @type {!./service/parallax-impl.ParallaxService} */(0, _service.getServiceForDoc)(nodeOrDoc, 'amp-fx-parallax')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/performance-impl.Performance}
   */


  Services.performanceFor = function performanceFor(window) {
    return (/** @type {!./service/performance-impl.Performance}*/(0, _service.getService)(window, 'performance')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/performance-impl.Performance}
   */


  Services.performanceForOrNull = function performanceForOrNull(window) {
    return (/** @type {!./service/performance-impl.Performance}*/(0, _service.getExistingServiceOrNull)(window, 'performance')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/platform-impl.Platform}
   */


  Services.platformFor = function platformFor(window) {
    return (/** @type {!./service/platform-impl.Platform} */(0, _service.getService)(window, 'platform')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/resources-impl.Resources}
   */


  Services.resourcesForDoc = function resourcesForDoc(nodeOrDoc) {
    return (/** @type {!./service/resources-impl.Resources} */(0, _service.getServiceForDoc)(nodeOrDoc, 'resources')
    );
  };

  /**
   * @param {!Window} win
   * @return {?Promise<?{incomingFragment: string, outgoingFragment: string}>}
   */


  Services.shareTrackingForOrNull = function shareTrackingForOrNull(win) {
    return (/** @type {
           !Promise<?{incomingFragment: string, outgoingFragment: string}>} */(0, _elementService.getElementServiceIfAvailable)(win, 'share-tracking', 'amp-share-tracking', true)
    );
  };

  /**
   * @param {!Window} win
   * @return {?Promise<?../extensions/amp-story/0.1/variable-service.AmpStoryVariableService>}
   */


  Services.storyVariableServiceForOrNull = function storyVariableServiceForOrNull(win) {
    return (
      /** @type {!Promise<
           * ?../extensions/amp-story/0.1/variable-service.AmpStoryVariableService
           * >} */(0, _elementService.getElementServiceIfAvailable)(win, 'story-variable', 'amp-story', true)
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<!../extensions/amp-animation/0.1/web-animation-service.WebAnimationService>}
   */


  Services.webAnimationServiceFor = function webAnimationServiceFor(nodeOrDoc) {
    return (/** @type {
           !Promise<!../extensions/amp-animation/0.1/web-animation-service.WebAnimationService>} */
      (0, _elementService.getElementServiceForDoc)(nodeOrDoc, 'web-animation', 'amp-animation')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<!./service/storage-impl.Storage>}
   */


  Services.storageForDoc = function storageForDoc(nodeOrDoc) {
    return (/** @type {!Promise<!./service/storage-impl.Storage>} */(0, _service.getServicePromiseForDoc)(nodeOrDoc, 'storage')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/template-impl.Templates}
   */


  Services.templatesFor = function templatesFor(window) {
    return (/** @type {!./service/template-impl.Templates} */(0, _service.getService)(window, 'templates')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/timer-impl.Timer}
   */


  Services.timerFor = function timerFor(window) {
    return (/** @type {!./service/timer-impl.Timer} */(0, _service.getService)(window, 'timer')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/url-replacements-impl.UrlReplacements}
   */


  Services.urlReplacementsForDoc = function urlReplacementsForDoc(nodeOrDoc) {
    return (/** @type {!./service/url-replacements-impl.UrlReplacements} */(0, _service.getExistingServiceForDocInEmbedScope)(nodeOrDoc, 'url-replace', /* opt_fallbackToTopWin */true)
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<!../extensions/amp-user-notification/0.1/amp-user-notification.UserNotificationManager>}
   */


  Services.userNotificationManagerForDoc = function userNotificationManagerForDoc(nodeOrDoc) {
    return (/** @type {!Promise<!../extensions/amp-user-notification/0.1/amp-user-notification.UserNotificationManager>} */
      (0, _elementService.getElementServiceForDoc)(nodeOrDoc, 'userNotificationManager', 'amp-user-notification')
    );
  };

  /**
   * Returns a promise for the experiment variants or a promise for null if it is
   * not available on the current page.
   * @param {!Window} win
   * @return {!Promise<?Object<string>>}
   */


  Services.variantForOrNull = function variantForOrNull(win) {
    return (/** @type {!Promise<?Object<string>>} */(0, _elementService.getElementServiceIfAvailable)(win, 'variant', 'amp-experiment', true)
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/video-manager-impl.VideoManager}
   */


  Services.videoManagerForDoc = function videoManagerForDoc(nodeOrDoc) {
    return (/** @type {!./service/video-manager-impl.VideoManager} */(0, _service.getServiceForDoc)(nodeOrDoc, 'video-manager')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/viewer-impl.Viewer}
   */


  Services.viewerForDoc = function viewerForDoc(nodeOrDoc) {
    return (/** @type {!./service/viewer-impl.Viewer} */(0, _service.getServiceForDoc)(nodeOrDoc, 'viewer')
    );
  };

  /**
   * Returns promise for the viewer. This is an unusual case and necessary only
   * for services that need reference to the viewer before it has been
   * initialized. Most of the code, however, just should use `viewerForDoc`.
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!Promise<!./service/viewer-impl.Viewer>}
   */


  Services.viewerPromiseForDoc = function viewerPromiseForDoc(nodeOrDoc) {
    return (/** @type {!Promise<!./service/viewer-impl.Viewer>} */(0, _service.getServicePromiseForDoc)(nodeOrDoc, 'viewer')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/vsync-impl.Vsync}
   */


  Services.vsyncFor = function vsyncFor(window) {
    return (/** @type {!./service/vsync-impl.Vsync} */(0, _service.getService)(window, 'vsync')
    );
  };

  /**
   * @param {!Node|!./service/ampdoc-impl.AmpDoc} nodeOrDoc
   * @return {!./service/viewport/viewport-impl.Viewport}
   */


  Services.viewportForDoc = function viewportForDoc(nodeOrDoc) {
    return (/** @type {!./service/viewport/viewport-impl.Viewport} */(0, _service.getServiceForDoc)(nodeOrDoc, 'viewport')
    );
  };

  /**
   * @param {!Window} window
   * @return {!./service/xhr-impl.Xhr}
   */


  Services.xhrFor = function xhrFor(window) {
    return (/** @type {!./service/xhr-impl.Xhr} */(0, _service.getService)(window, 'xhr')
    );
  };

  return Services;
}();

},{"./element-service":21,"./service":41}],44:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Srcset = undefined;
exports.srcsetFromElement = srcsetFromElement;
exports.srcsetFromSrc = srcsetFromSrc;
exports.parseSrcset = parseSrcset;

var _log = require('./log');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

/**
 * A single source within a srcset. Only one: width or DPR can be specified at
 * a time.
 * @typedef {{
 *   url: string,
 *   width: (number|undefined),
 *   dpr: (number|undefined)
 * }}
 */
var SrcsetSourceDef = void 0;

/**
 * Extracts `srcset` and fallbacks to `src` if not available.
 * @param {!Element} element
 * @return {!Srcset}
 */
function srcsetFromElement(element) {
  var srcsetAttr = element.getAttribute('srcset');
  if (srcsetAttr) {
    return parseSrcset(srcsetAttr);
  }
  // We can't push `src` via `parseSrcset` because URLs in `src` are not always
  // RFC compliant and can't be easily parsed as an `srcset`. For instance,
  // they sometimes contain space characters.
  var srcAttr = (0, _log.user)().assert(element.getAttribute('src'), 'Either non-empty "srcset" or "src" attribute must be specified: %s', element);
  return srcsetFromSrc(srcAttr);
}

/**
 * Creates a Srcset from a `src` attribute value.
 * @param {string} src
 * @return {!Srcset}
 */
function srcsetFromSrc(src) {
  return new Srcset([{ url: src, width: undefined, dpr: 1 }]);
}

/**
 * Parses the text representation of srcset into Srcset object.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes.
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
 * @param {string} s
 * @param {!Element=} opt_element
 * @return {!Srcset}
 */
function parseSrcset(s, opt_element) {
  // General grammar: (URL [NUM[w|x]],)*
  // Example 1: "image1.png 100w, image2.png 50w"
  // Example 2: "image1.png 2x, image2.png"
  // Example 3: "image1,100w.png 100w, image2.png 50w"
  var sSources = s.match(/\s*(?:[\S]*)(?:\s+(?:-?(?:\d+(?:\.(?:\d+)?)?|\.\d+)[a-zA-Z]))?(?:\s*,)?/g);
  (0, _log.user)().assert(sSources.length > 0, 'srcset has to have at least one source: %s', opt_element);
  var sources = [];
  for (var i = 0; i < sSources.length; i++) {
    var sSource = sSources[i].trim();
    if (sSource.substr(-1) == ',') {
      sSource = sSource.substr(0, sSource.length - 1).trim();
    }
    var parts = sSource.split(/\s+/, 2);
    if (parts.length == 0 || parts.length == 1 && !parts[0] || parts.length == 2 && !parts[0] && !parts[1]) {
      continue;
    }
    var url = parts[0];
    if (parts.length == 1 || parts.length == 2 && !parts[1]) {
      // If no "w" or "x" specified, we assume it's "1x".
      sources.push({ url: url, width: undefined, dpr: 1 });
    } else {
      var spec = parts[1].toLowerCase();
      var lastChar = spec.substring(spec.length - 1);
      if (lastChar == 'w') {
        sources.push({ url: url, width: parseFloat(spec), dpr: undefined });
      } else if (lastChar == 'x') {
        sources.push({ url: url, width: undefined, dpr: parseFloat(spec) });
      }
    }
  }
  return new Srcset(sources);
}

/**
 * A srcset object contains one or more sources.
 *
 * There are two types of sources: width-based and DPR-based. Only one type
 * of sources allowed to be specified within a single srcset. Depending on a
 * usecase, the components are free to choose any source that best corresponds
 * to the required rendering quality and network and CPU conditions. See
 * "select" method for details on how this selection is performed.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 */

var Srcset = exports.Srcset = function () {

  /**
   * @param {!Array<!SrcsetSourceDef>} sources
   */
  function Srcset(sources) {
    _classCallCheck(this, Srcset);

    (0, _log.user)().assert(sources.length > 0, 'Srcset must have at least one source');
    /** @private @const {!Array<!SrcsetSourceDef>} */
    this.sources_ = sources;

    // Only one type of source specified can be used - width or DPR.
    var hasWidth = false;
    var hasDpr = false;
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      (0, _log.user)().assert((source.width || source.dpr) && (!source.width || !source.dpr), 'Either dpr or width must be specified');
      hasWidth = hasWidth || !!source.width;
      hasDpr = hasDpr || !!source.dpr;
    }
    (0, _log.user)().assert(!hasWidth || !hasDpr, 'Srcset cannot have both width and dpr sources');

    // Source and assert duplicates.
    if (hasWidth) {
      this.sources_.sort(sortByWidth);
    } else {
      this.sources_.sort(sortByDpr);
    }

    /** @private @const {boolean} */
    this.widthBased_ = hasWidth;

    /** @private @const {boolean} */
    this.dprBased_ = hasDpr;
  }

  /**
   * Performs selection for specified width and DPR. Here, width is the width
   * in screen pixels and DPR is the device-pixel-ratio or pixel density of
   * the device. Depending on the circumstances, such as low network conditions,
   * it's possible to manipulate the result of this method by passing a lower
   * DPR value.
   *
   * The source selection depends on whether this is width-based or DPR-based
   * srcset.
   *
   * In a width-based source, the source's width is the physical width of a
   * resource (e.g. an image). Depending on the provided DPR, this width is
   * converted to the screen pixels as following:
   *   pixelWidth = sourceWidth / DPR
   *
   * Then, the source closest to the requested "width" is selected using
   * the "pixelWidth". The slight preference is given to the bigger sources to
   * ensure the most optimal quality.
   *
   * In a DPR-based source, the source's DPR is used to return the source that
   * is closest to the requested DPR.
   *
   * Based on
   * http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
   * @param {number} width
   * @param {number} dpr
   * @return {!SrcsetSourceDef}
   */


  Srcset.prototype.select = function select(width, dpr) {
    (0, _log.dev)().assert(width, 'width=%s', width);
    (0, _log.dev)().assert(dpr, 'dpr=%s', dpr);
    var index = -1;
    if (this.widthBased_) {
      index = this.selectByWidth_(width, dpr);
    } else if (this.dprBased_) {
      index = this.selectByDpr_(width, dpr);
    }
    if (index != -1) {
      return this.sources_[index];
    }
    return this.getLast();
  };

  /**
   * @param {number} width
   * @param {number} dpr
   * @return {number}
   * @private
   */


  Srcset.prototype.selectByWidth_ = function selectByWidth_(width, dpr) {
    var length = this.sources_.length;
    var prevWidth = -Infinity;
    for (var i = length - 1; i >= 0; i--) {
      var source = this.sources_[i];
      var sourceWidth = source.width / dpr;
      // First candidate width that's equal or higher than the requested width
      // will stop the search.
      if (sourceWidth >= width) {
        // The right value is now between `i` and `i + 1` - select the one
        // that is closer with a slight preference toward higher numbers.
        var delta = sourceWidth - width;
        var prevDelta = (width - prevWidth) * 1.1;
        // If smaller size is closer, enfore minimum ratio between
        // requested width and prevWidth to ensure image isn't too distorted.
        if (prevDelta < delta && width / prevWidth <= 1.2) {
          return i + 1;
        }
        return i;
      }
      prevWidth = sourceWidth;
    }
    // Use the first (maximum) value.
    return 0;
  };

  /**
   * @param {number} _width
   * @param {number} dpr
   * @return {number}
   * @private
   */


  Srcset.prototype.selectByDpr_ = function selectByDpr_(_width, dpr) {
    var minIndex = -1;
    var minScore = 1000000;
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      // Default DPR = 1.
      var sourceDpr = source.dpr || 1;
      var score = Math.abs(sourceDpr - dpr);
      if (score < minScore) {
        minScore = score;
        minIndex = i;
      }
    }
    return minIndex;
  };

  /**
   * Returns the last source in the srcset, which is the default source.
   * @return {!SrcsetSourceDef}
   */


  Srcset.prototype.getLast = function getLast() {
    return this.sources_[this.sources_.length - 1];
  };

  /**
   * Returns all sources in the srcset.
   * @return {!Array<!SrcsetSourceDef>}
   */


  Srcset.prototype.getSources = function getSources() {
    return this.sources_;
  };

  /**
   * Reconstructs the string expression for this srcset.
   * @return {string}
   */


  Srcset.prototype.stringify = function stringify() {
    var res = [];
    for (var i = 0; i < this.sources_.length; i++) {
      var source = this.sources_[i];
      if (source.width) {
        res.push(source.url + ' ' + source.width + 'w');
      } else if (source.dpr) {
        res.push(source.url + ' ' + source.dpr + 'x');
      } else {
        res.push('' + source.url);
      }
    }
    return res.join(', ');
  };

  return Srcset;
}();

function sortByWidth(s1, s2) {
  (0, _log.user)().assert(s1.width != s2.width, 'Duplicate width: %s', s1.width);
  return s2.width - s1.width;
}

function sortByDpr(s1, s2) {
  (0, _log.user)().assert(s1.dpr != s2.dpr, 'Duplicate dpr: %s', s1.dpr);
  return s2.dpr - s1.dpr;
}

},{"./log":28}],45:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashToCamelCase = dashToCamelCase;
exports.camelCaseToDash = camelCaseToDash;
exports.dashToUnderline = dashToUnderline;
exports.endsWith = endsWith;
exports.startsWith = startsWith;
exports.expandTemplate = expandTemplate;
exports.stringHash32 = stringHash32;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {string} _match
 * @param {string} character
 * @return {string}
 */
function toUpperCase(_match, character) {
  return character.toUpperCase();
}

/**
 * @param {string} match
 * @return {string}
 */
function prependDashAndToLowerCase(match) {
  return '-' + match.toLowerCase();
}

/**
 * @param {string} name Attribute name containing dashes.
 * @return {string} Dashes removed and successive character sent to upper case.
 * visibleForTesting
 */
function dashToCamelCase(name) {
  return name.replace(/-([a-z])/g, toUpperCase);
}

/**
 * Converts a string that is in camelCase to one that is in dash-case.
 *
 * @param {string} string The string to convert.
 * @return {string} The string in dash-case.
 */
function camelCaseToDash(string) {
  return string.replace(/(?!^)[A-Z]/g, prependDashAndToLowerCase);
}

/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes replaced by underlines.
 */
function dashToUnderline(name) {
  return name.replace('-', '_');
}

/**
 * Polyfill for String.prototype.endsWith.
 * @param {string} string
 * @param {string} suffix
 * @return {boolean}
 */
function endsWith(string, suffix) {
  var index = string.length - suffix.length;
  return index >= 0 && string.indexOf(suffix, index) == index;
}

/**
 * Polyfill for String.prototype.startsWith.
 * @param {string} string
 * @param {string} prefix
 * @return {boolean}
 */
function startsWith(string, prefix) {
  if (prefix.length > string.length) {
    return false;
  }
  return string.lastIndexOf(prefix, 0) == 0;
}

/**
 * Expands placeholders in a given template string with values.
 *
 * Placeholders use ${key-name} syntax and are replaced with the value
 * returned from the given getter function.
 *
 * @param {string} template The template string to expand.
 * @param {!function(string):*} getter Function used to retrieve a value for a
 *   placeholder. Returns values will be coerced into strings.
 * @param {number=} opt_maxIterations Number of times to expand the template.
 *   Defaults to 1, but should be set to a larger value your placeholder tokens
 *   can be expanded to other placeholder tokens. Take caution with large values
 *   as recursively expanding a string can be exponentially expensive.
 */
function expandTemplate(template, getter, opt_maxIterations) {
  var maxIterations = opt_maxIterations || 1;

  var _loop = function _loop(i) {
    var matches = 0;
    template = template.replace(/\${([^}]*)}/g, function (_a, b) {
      matches++;
      return getter(b);
    });
    if (!matches) {
      return 'break';
    }
  };

  for (var i = 0; i < maxIterations; i++) {
    var _ret = _loop(i);

    if (_ret === 'break') break;
  }
  return template;
}

/**
 * Hash function djb2a
 * This is intended to be a simple, fast hashing function using minimal code.
 * It does *not* have good cryptographic properties.
 * @param {string} str
 * @return {string} 32-bit unsigned hash of the string
 */
function stringHash32(str) {
  var length = str.length;
  var hash = 5381;
  for (var i = 0; i < length; i++) {
    hash = hash * 33 ^ str.charCodeAt(i);
  }
  // Convert from 32-bit signed to unsigned.
  return String(hash >>> 0);
};

},{}],46:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installStylesForDoc = installStylesForDoc;
exports.installStylesLegacy = installStylesLegacy;
exports.installCssTransformer = installCssTransformer;
exports.makeBodyVisible = makeBodyVisible;
exports.bodyAlwaysVisible = bodyAlwaysVisible;

var _services = require('./services');

var _log = require('./log');

var _object = require('./utils/object');

var _style = require('./style');

var _dom = require('./dom');

var _renderDelayingServices = require('./render-delaying-services');

/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TRANSFORMER_PROP = '__AMP_CSS_TR';
var STYLE_MAP_PROP = '__AMP_CSS_SM';
var bodyVisibleSentinel = '__AMP_BODY_VISIBLE';

/**
 * Adds the given css text to the given ampdoc.
 *
 * The style tags will be at the beginning of the head before all author
 * styles. One element can be the main runtime CSS. This is guaranteed
 * to always be the first stylesheet in the doc.
 *
 * @param {!./service/ampdoc-impl.AmpDoc} ampdoc The ampdoc that should get the new styles.
 * @param {string} cssText
 * @param {?function(!Element)|undefined} cb Called when the new styles are available.
 *     Not using a promise, because this is synchronous when possible.
 *     for better performance.
 * @param {boolean=} opt_isRuntimeCss If true, this style tag will be inserted
 *     as the first element in head and all style elements will be positioned
 *     after.
 * @param {string=} opt_ext
 * @return {!Element}
 */
function installStylesForDoc(ampdoc, cssText, cb, opt_isRuntimeCss, opt_ext) {
  var cssRoot = ampdoc.getHeadNode();
  var style = insertStyleElement(cssRoot, maybeTransform(cssRoot, cssText), opt_isRuntimeCss || false, opt_ext || null);

  if (cb) {
    var rootNode = ampdoc.getRootNode();
    // Styles aren't always available synchronously. E.g. if there is a
    // pending style download, it will have to finish before the new
    // style is visible.
    // For this reason we poll until the style becomes available.
    // Sync case.
    if (styleLoaded(rootNode, style)) {
      cb(style);
      return style;
    }
    // Poll until styles are available.
    var interval = setInterval(function () {
      if (styleLoaded(rootNode, style)) {
        clearInterval(interval);
        cb(style);
      }
    }, 4);
  }
  return style;
}

/**
 * Adds the given css text to the given document.
 * TODO(dvoytenko, #10705): Remove this method once FIE/ampdoc migration is done.
 *
 * @param {!Document} doc The document that should get the new styles.
 * @param {string} cssText
 * @param {?function(!Element)|undefined} cb Called when the new styles are available.
 *     Not using a promise, because this is synchronous when possible.
 *     for better performance.
 * @param {boolean=} opt_isRuntimeCss If true, this style tag will be inserted
 *     as the first element in head and all style elements will be positioned
 *     after.
 * @param {string=} opt_ext
 * @return {!Element}
 */
function installStylesLegacy(doc, cssText, cb, opt_isRuntimeCss, opt_ext) {
  var style = insertStyleElement((0, _log.dev)().assertElement(doc.head), cssText, opt_isRuntimeCss || false, opt_ext || null);

  if (cb) {
    // Styles aren't always available synchronously. E.g. if there is a
    // pending style download, it will have to finish before the new
    // style is visible.
    // For this reason we poll until the style becomes available.
    // Sync case.
    if (styleLoaded(doc, style)) {
      cb(style);
      return style;
    }
    // Poll until styles are available.
    var interval = setInterval(function () {
      if (styleLoaded(doc, style)) {
        clearInterval(interval);
        cb(style);
      }
    }, 4);
  }
  return style;
}

/**
 * Creates the properly configured style element.
 * @param {!Element|!ShadowRoot} cssRoot
 * @param {string} cssText
 * @param {boolean} isRuntimeCss
 * @param {?string} ext
 * @return {!Element}
 */
function insertStyleElement(cssRoot, cssText, isRuntimeCss, ext) {
  var styleMap = cssRoot[STYLE_MAP_PROP];
  if (!styleMap) {
    styleMap = cssRoot[STYLE_MAP_PROP] = (0, _object.map)();
  }

  var isExtCss = !isRuntimeCss && ext && ext != 'amp-custom' && ext != 'amp-keyframes';
  var key = isRuntimeCss ? 'amp-runtime' : isExtCss ? 'amp-extension=' + ext : null;

  // Check if it has already been created or discovered.
  if (key) {
    var existing = getExistingStyleElement(cssRoot, styleMap, key);
    if (existing) {
      return existing;
    }
  }

  // Create the new style element and append to cssRoot.
  var doc = cssRoot.ownerDocument || cssRoot;
  var style = doc.createElement('style');
  style. /*OK*/textContent = cssText;
  var afterElement = null;
  // Make sure that we place style tags after the main runtime CSS. Otherwise
  // the order is random.
  if (isRuntimeCss) {
    style.setAttribute('amp-runtime', '');
  } else if (isExtCss) {
    style.setAttribute('amp-extension', ext || '');
    afterElement = (0, _log.dev)().assertElement(getExistingStyleElement(cssRoot, styleMap, 'amp-runtime'));
  } else {
    if (ext) {
      style.setAttribute(ext, '');
    }
    afterElement = cssRoot.lastChild;
  }
  (0, _dom.insertAfterOrAtStart)(cssRoot, style, afterElement);
  if (key) {
    styleMap[key] = style;
  }
  return style;
}

/**
 * @param {!Element|!ShadowRoot} cssRoot
 * @param {!Object<string, !Element>} styleMap
 * @param {string} key
 * @return {?Element}
 */
function getExistingStyleElement(cssRoot, styleMap, key) {
  // Already cached.
  if (styleMap[key]) {
    return styleMap[key];
  }
  // Check if the style has already been added by the server layout.
  var existing = cssRoot. /*OK*/querySelector('style[' + key + ']');
  if (existing) {
    styleMap[key] = existing;
    return existing;
  }
  // Nothing found.
  return null;
}

/**
 * Applies a transformer to the CSS text if it has been registered.
 * @param {!Element|!ShadowRoot} cssRoot
 * @param {function(string):string} transformer
 */
function installCssTransformer(cssRoot, transformer) {
  cssRoot[TRANSFORMER_PROP] = transformer;
}

/**
 * Applies a transformer to the CSS text if it has been registered.
 * @param {!Element|!ShadowRoot} cssRoot
 * @param {string} cssText
 * @return {string}
 */
function maybeTransform(cssRoot, cssText) {
  var transformer = cssRoot[TRANSFORMER_PROP];
  return transformer ? transformer(cssText) : cssText;
}

/**
 * Sets the document's body opacity to 1.
 * If the body is not yet available (because our script was loaded
 * synchronously), polls until it is.
 * @param {!Document} doc The document who's body we should make visible.
 * @param {boolean=} opt_waitForServices Whether the body visibility should
 *     be blocked on key services being loaded.
 */
function makeBodyVisible(doc, opt_waitForServices) {
  (0, _log.dev)().assert(doc.defaultView, 'Passed in document must have a defaultView');
  var win = /** @type {!Window} */doc.defaultView;
  if (win[bodyVisibleSentinel]) {
    return;
  }
  var set = function set() {
    win[bodyVisibleSentinel] = true;
    (0, _style.setStyles)((0, _log.dev)().assertElement(doc.body), {
      opacity: 1,
      visibility: 'visible',
      animation: 'none'
    });
    renderStartedNoInline(doc);
  };
  try {
    (0, _dom.waitForBody)(doc, function () {
      if (win[bodyVisibleSentinel]) {
        return;
      }
      win[bodyVisibleSentinel] = true;
      if (opt_waitForServices) {
        (0, _renderDelayingServices.waitForServices)(win).catch(function (reason) {
          (0, _log.rethrowAsync)(reason);
          return [];
        }).then(function (services) {
          set();
          if (services.length > 0) {
            _services.Services.resourcesForDoc(doc). /*OK*/schedulePass(1, /* relayoutAll */true);
          }
          try {
            var perf = _services.Services.performanceFor(win);
            perf.tick('mbv');
            perf.flush();
          } catch (e) {}
        });
      } else {
        set();
      }
    });
  } catch (e) {
    // If there was an error during the logic above (such as service not
    // yet installed, definitely try to make the body visible.
    set();
    // Avoid errors in the function to break execution flow as this is
    // often called as a last resort.
    (0, _log.rethrowAsync)(e);
  }
}

/**
 * @param {!Document} doc
 */
function renderStartedNoInline(doc) {
  try {
    _services.Services.resourcesForDoc(doc).renderStarted();
  } catch (e) {
    // `makeBodyVisible` is called in the error-processing cycle and thus
    // could be triggered when runtime's initialization is incomplete which
    // would cause unrelated errors to be thrown here.
  }
}

/**
 * Indicates that the body is always visible. For instance, in case of PWA.
 * @param {!Window} win
 */
function bodyAlwaysVisible(win) {
  win[bodyVisibleSentinel] = true;
}

/**
 * Checks whether a style element was registered in the DOM.
 * @param {!Document|!ShadowRoot} doc
 * @param {!Element} style
 * @return {boolean}
 */
function styleLoaded(doc, style) {
  var sheets = doc.styleSheets;
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    if (sheet.ownerNode == style) {
      return true;
    }
  }
  return false;
};

},{"./dom":20,"./log":28,"./render-delaying-services":39,"./services":43,"./style":47,"./utils/object":54}],47:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelCaseToTitleCase = camelCaseToTitleCase;
exports.getVendorJsPropertyName = getVendorJsPropertyName;
exports.setImportantStyles = setImportantStyles;
exports.setStyle = setStyle;
exports.getStyle = getStyle;
exports.setStyles = setStyles;
exports.toggle = toggle;
exports.px = px;
exports.translateX = translateX;
exports.translate = translate;
exports.scale = scale;
exports.removeAlphaFromColor = removeAlphaFromColor;
exports.computedStyle = computedStyle;
exports.resetStyles = resetStyles;

var _object = require('./utils/object.js');

var _string = require('./string');

/** @type {Object<string, string>} */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: loaded by 3p system. Cannot rely on babel polyfills.
var propertyNameCache = void 0;

/** @const {!Array<string>} */
var vendorPrefixes = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'O', 'o'];

/**
 * @export
 * @param {string} camelCase camel cased string
 * @return {string} title cased string
 */
function camelCaseToTitleCase(camelCase) {
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Checks the style if a prefixed version of a property exists and returns
 * it or returns an empty string.
 * @private
 * @param {!Object} style
 * @param {string} titleCase the title case version of a css property name
 * @return {string} the prefixed property name or null.
 */
function getVendorJsPropertyName_(style, titleCase) {
  for (var i = 0; i < vendorPrefixes.length; i++) {
    var propertyName = vendorPrefixes[i] + titleCase;
    if (style[propertyName] !== undefined) {
      return propertyName;
    }
  }
  return '';
}

/**
 * Returns the possibly prefixed JavaScript property name of a style property
 * (ex. WebkitTransitionDuration) given a camelCase'd version of the property
 * (ex. transitionDuration).
 * @export
 * @param {!Object} style
 * @param {string} camelCase the camel cased version of a css property name
 * @param {boolean=} opt_bypassCache bypass the memoized cache of property
 *   mapping
 * @return {string}
 */
function getVendorJsPropertyName(style, camelCase, opt_bypassCache) {
  if ((0, _string.startsWith)(camelCase, '--')) {
    // CSS vars are returned as is.
    return camelCase;
  }
  if (!propertyNameCache) {
    propertyNameCache = (0, _object.map)();
  }
  var propertyName = propertyNameCache[camelCase];
  if (!propertyName || opt_bypassCache) {
    propertyName = camelCase;
    if (style[camelCase] === undefined) {
      var titleCase = camelCaseToTitleCase(camelCase);
      var prefixedPropertyName = getVendorJsPropertyName_(style, titleCase);

      if (style[prefixedPropertyName] !== undefined) {
        propertyName = prefixedPropertyName;
      }
    }
    if (!opt_bypassCache) {
      propertyNameCache[camelCase] = propertyName;
    }
  }
  return propertyName;
}

/**
 * Sets the CSS styles of the specified element with !important. The styles
 * are specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, *>} styles
 */
function setImportantStyles(element, styles) {
  for (var k in styles) {
    element.style.setProperty(getVendorJsPropertyName(styles, k), styles[k].toString(), 'important');
  }
}

/**
 * Sets the CSS style of the specified element with optional units, e.g. "px".
 * @param {Element} element
 * @param {string} property
 * @param {*} value
 * @param {string=} opt_units
 * @param {boolean=} opt_bypassCache
 */
function setStyle(element, property, value, opt_units, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (propertyName) {
    element.style[propertyName] =
    /** @type {string} */opt_units ? value + opt_units : value;
  }
}

/**
 * Returns the value of the CSS style of the specified element.
 * @param {!Element} element
 * @param {string} property
 * @param {boolean=} opt_bypassCache
 * @return {*}
 */
function getStyle(element, property, opt_bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, opt_bypassCache);
  if (!propertyName) {
    return undefined;
  }
  return element.style[propertyName];
}

/**
 * Sets the CSS styles of the specified element. The styles
 * a specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, *>} styles
 */
function setStyles(element, styles) {
  for (var k in styles) {
    setStyle(element, k, styles[k]);
  }
}

/**
 * Shows or hides the specified element.
 * @param {!Element} element
 * @param {boolean=} opt_display
 */
function toggle(element, opt_display) {
  if (opt_display === undefined) {
    opt_display = getStyle(element, 'display') == 'none';
  }
  setStyle(element, 'display', opt_display ? '' : 'none');
}

/**
 * Returns a pixel value.
 * @param {number} value
 * @return {string}
 */
function px(value) {
  return value + 'px';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */
function translateX(value) {
  if (typeof value == 'string') {
    return 'translateX(' + value + ')';
  }
  return 'translateX(' + px(value) + ')';
}

/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} x
 * @param {(number|string)=} opt_y
 * @return {string}
 */
function translate(x, opt_y) {
  if (typeof x == 'number') {
    x = px(x);
  }
  if (opt_y === undefined) {
    return 'translate(' + x + ')';
  }
  if (typeof opt_y == 'number') {
    opt_y = px(opt_y);
  }
  return 'translate(' + x + ', ' + opt_y + ')';
}

/**
 * Returns a "scale" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */
function scale(value) {
  return 'scale(' + value + ')';
}

/**
 * Remove alpha value from a rgba color value.
 * Return the new color property with alpha equals if has the alpha value.
 * Caller needs to make sure the input color value is a valid rgba/rgb value
 * @param {string} rgbaColor
 * @return {string}
 */
function removeAlphaFromColor(rgbaColor) {
  return rgbaColor.replace(/\(([^,]+),([^,]+),([^,)]+),[^)]+\)/g, '($1,$2,$3, 1)');
}

/**
 * Gets the computed style of the element. The helper is necessary to enforce
 * the possible `null` value returned by a buggy Firefox.
 *
 * @param {!Window} win
 * @param {!Element} el
 * @return {!Object<string, string>}
 */
function computedStyle(win, el) {
  var style = /** @type {?CSSStyleDeclaration} */win.getComputedStyle(el);
  return (/** @type {!Object<string, string>} */style || (0, _object.map)()
  );
}

/**
 * Resets styles that were set dynamically (i.e. inline)
 * @param {!Element} element
 * @param {!Array<string>} properties
 */
function resetStyles(element, properties) {
  var styleObj = {};
  properties.forEach(function (prop) {
    styleObj[prop] = null;
  });
  setStyles(element, styleObj);
}

},{"./string":45,"./utils/object.js":54}],48:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
exports.toArray = toArray;
exports.isObject = isObject;
exports.isFiniteNumber = isFiniteNumber;
exports.isEnumValue = isEnumValue;
exports.toWin = toWin;
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @const */
var toString_ = Object.prototype.toString;

/**
 * Returns the ECMA [[Class]] of a value
 * @param {*} value
 * @return {string}
 */
function toString(value) {
  return toString_.call(value);
}

/**
 * Determines if value is actually an Array.
 * @param {*} value
 * @return {boolean}
 */
function isArray(value) {
  return Array.isArray(value);
}

/**
 * Converts an array-like object to an array.
 * @param {?IArrayLike<T>|string} arrayLike
 * @return {!Array<T>}
 * @template T
 */
function toArray(arrayLike) {
  if (!arrayLike) {
    return [];
  }
  var array = new Array(arrayLike.length);
  for (var i = 0; i < arrayLike.length; i++) {
    array[i] = arrayLike[i];
  }
  return array;
}

/**
 * Determines if value is actually an Object.
 * @param {*} value
 * @return {boolean}
 */
function isObject(value) {
  return toString(value) === '[object Object]';
}

/**
 * Determines if value is of number type and finite.
 * NaN and Infinity are not considered a finite number.
 * String numbers are not considered numbers.
 * @param {*} value
 * @return {boolean}
 */
function isFiniteNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Checks whether `s` is a valid value of `enumObj`.
 *
 * @param {!Object<T>} enumObj
 * @param {T} s
 * @return {boolean}
 * @template T
 */
function isEnumValue(enumObj, s) {
  for (var k in enumObj) {
    if (enumObj[k] === s) {
      return true;
    }
  }
  return false;
}

/**
 * Externs declare that access `defaultView` from `document` or
 * `ownerDocument` is of type `(Window|null)` but most of our parameter types
 * assume that it is never null. This is OK in practice as we ever only get
 * null on disconnected documents or old IE.
 * This helper function casts it into just a simple Window return type.
 *
 * @param {!Window|null} winOrNull
 * @return {!Window}
 */
function toWin(winOrNull) {
  return (/** @type {!Window} */winOrNull
  );
}

},{}],49:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryString_ = parseQueryString_;

var _urlTryDecodeUriComponent = require('./url-try-decode-uri-component');

var regex = /(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;

/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 *
 * DO NOT import the function from this file. Instead, import parseQueryString
 * from `src/url.js`.
 *
 * @param {string} queryString
 * @return {!JsonObject}
 */
/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function parseQueryString_(queryString) {
  var params = /** @type {!JsonObject} */Object.create(null);
  if (!queryString) {
    return params;
  }

  var match = void 0;
  while (match = regex.exec(queryString)) {
    var name = (0, _urlTryDecodeUriComponent.tryDecodeUriComponent_)(match[1], match[1]);
    var value = match[2] ? (0, _urlTryDecodeUriComponent.tryDecodeUriComponent_)(match[2], match[2]) : '';
    params[name] = value;
  }
  return params;
}

},{"./url-try-decode-uri-component":50}],50:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryDecodeUriComponent_ = tryDecodeUriComponent_;
/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Tries to decode a URI component, falling back to opt_fallback (or an empty
 * string)
 *
 * DO NOT import the function from this file. Instead, import
 * tryDecodeUriComponent from `src/url.js`.
 *
 * @param {string} component
 * @param {string=} fallback
 * @return {string}
 */
function tryDecodeUriComponent_(component) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  try {
    return decodeURIComponent(component);
  } catch (e) {
    return fallback;
  }
}

},{}],51:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SOURCE_ORIGIN_PARAM = undefined;
exports.getWinOrigin = getWinOrigin;
exports.parseUrl = parseUrl;
exports.parseUrlWithA = parseUrlWithA;
exports.appendEncodedParamStringToUrl = appendEncodedParamStringToUrl;
exports.addParamToUrl = addParamToUrl;
exports.addParamsToUrl = addParamsToUrl;
exports.serializeQueryString = serializeQueryString;
exports.isSecureUrl = isSecureUrl;
exports.assertHttpsUrl = assertHttpsUrl;
exports.assertAbsoluteHttpOrHttpsUrl = assertAbsoluteHttpOrHttpsUrl;
exports.parseQueryString = parseQueryString;
exports.removeFragment = removeFragment;
exports.getFragment = getFragment;
exports.isProxyOrigin = isProxyOrigin;
exports.isLocalhostOrigin = isLocalhostOrigin;
exports.isProtocolValid = isProtocolValid;
exports.getSourceUrl = getSourceUrl;
exports.getSourceOrigin = getSourceOrigin;
exports.resolveRelativeUrl = resolveRelativeUrl;
exports.resolveRelativeUrlFallback_ = resolveRelativeUrlFallback_;
exports.getCorsUrl = getCorsUrl;
exports.checkCorsUrl = checkCorsUrl;
exports.tryDecodeUriComponent = tryDecodeUriComponent;

var _string = require('./string');

var _log = require('./log');

var _mode = require('./mode');

var _config = require('./config');

var _types = require('./types');

var _urlParseQueryString = require('./url-parse-query-string');

var _urlTryDecodeUriComponent = require('./url-try-decode-uri-component');

/**
 * Cached a-tag to avoid memory allocation during URL parsing.
 * @type {HTMLAnchorElement}
 */
var a = void 0;

/**
 * We cached all parsed URLs. As of now there are no use cases
 * of AMP docs that would ever parse an actual large number of URLs,
 * but we often parse the same one over and over again.
 * @type {Object<string, !Location>}
 */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cache = void 0;

/** @private @const Matches amp_js_* parameters in query string. */
var AMP_JS_PARAMS_REGEX = /[?&]amp_js[^&]*/;

/** @private @const Matches usqp parameters from goog experiment in query string. */
var GOOGLE_EXPERIMENT_PARAMS_REGEX = /[?&]usqp[^&]*/;

var INVALID_PROTOCOLS = [
/*eslint no-script-url: 0*/'javascript:',
/*eslint no-script-url: 0*/'data:',
/*eslint no-script-url: 0*/'vbscript:'];

/** @const {string} */
var SOURCE_ORIGIN_PARAM = exports.SOURCE_ORIGIN_PARAM = '__amp_source_origin';

/**
 * Returns the correct origin for a given window.
 * @param {!Window} win
 * @return {string} origin
 */
function getWinOrigin(win) {
  return win.origin || parseUrl(win.location.href).origin;
}

/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * Consider the returned object immutable. This is enforced during
 * testing by freezing the object.
 * @param {string} url
 * @param {boolean=} opt_nocache
 * @return {!Location}
 */
function parseUrl(url, opt_nocache) {
  if (!a) {
    a = /** @type {!HTMLAnchorElement} */self.document.createElement('a');
    cache = self.UrlCache || (self.UrlCache = Object.create(null));
  }

  var fromCache = cache[url];
  if (fromCache) {
    return fromCache;
  }

  var info = parseUrlWithA(a, url);

  // Freeze during testing to avoid accidental mutation.
  var frozen = (0, _mode.getMode)().test && Object.freeze ? Object.freeze(info) : info;

  if (opt_nocache) {
    return frozen;
  }
  return cache[url] = frozen;
}

/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * @param {!HTMLAnchorElement} a
 * @param {string} url
 * @return {!Location}
 * @restricted
 */
function parseUrlWithA(a, url) {
  a.href = url;

  // IE11 doesn't provide full URL components when parsing relative URLs.
  // Assigning to itself again does the trick #3449.
  if (!a.protocol) {
    a.href = a.href;
  }

  var info = /** @type {!Location} */{
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    origin: null // Set below.
  };

  // Some IE11 specific polyfills.
  // 1) IE11 strips out the leading '/' in the pathname.
  if (info.pathname[0] !== '/') {
    info.pathname = '/' + info.pathname;
  }

  // 2) For URLs with implicit ports, IE11 parses to default ports while
  // other browsers leave the port field empty.
  if (info.protocol == 'http:' && info.port == 80 || info.protocol == 'https:' && info.port == 443) {
    info.port = '';
    info.host = info.hostname;
  }

  // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.
  if (a.origin && a.origin != 'null') {
    info.origin = a.origin;
  } else if (info.protocol == 'data:' || !info.host) {
    info.origin = info.href;
  } else {
    info.origin = info.protocol + '//' + info.host;
  }
  return info;
}

/**
 * Appends the string just before the fragment part (or optionally
 * to the front of the query string) of the URL.
 * @param {string} url
 * @param {string} paramString
 * @param {boolean=} opt_addToFront
 * @return {string}
 */
function appendEncodedParamStringToUrl(url, paramString, opt_addToFront) {
  if (!paramString) {
    return url;
  }
  var mainAndFragment = url.split('#', 2);
  var mainAndQuery = mainAndFragment[0].split('?', 2);

  var newUrl = mainAndQuery[0] + (mainAndQuery[1] ? opt_addToFront ? '?' + paramString + '&' + mainAndQuery[1] : '?' + mainAndQuery[1] + '&' + paramString : '?' + paramString);
  newUrl += mainAndFragment[1] ? '#' + mainAndFragment[1] : '';
  return newUrl;
}
/**
 * Appends a query string field and value to a url. `key` and `value`
 * will be ran through `encodeURIComponent` before appending.
 * @param {string} url
 * @param {string} key
 * @param {string} value
 * @param {boolean=} opt_addToFront
 * @return {string}
 */
function addParamToUrl(url, key, value, opt_addToFront) {
  var field = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  return appendEncodedParamStringToUrl(url, field, opt_addToFront);
}

/**
 * Appends query string fields and values to a url. The `params` objects'
 * `key`s and `value`s will be transformed into query string keys/values.
 * @param {string} url
 * @param {!JsonObject<string, string|!Array<string>>} params
 * @return {string}
 */
function addParamsToUrl(url, params) {
  return appendEncodedParamStringToUrl(url, serializeQueryString(params));
}

/**
 * Serializes the passed parameter map into a query string with both keys
 * and values encoded.
 * @param {!JsonObject<string, string|!Array<string>>} params
 * @return {string}
 */
function serializeQueryString(params) {
  var s = [];
  for (var k in params) {
    var v = params[k];
    if (v == null) {
      continue;
    } else if ((0, _types.isArray)(v)) {
      for (var i = 0; i < v.length; i++) {
        var sv = /** @type {string} */v[i];
        s.push(encodeURIComponent(k) + '=' + encodeURIComponent(sv));
      }
    } else {
      var _sv = /** @type {string} */v;
      s.push(encodeURIComponent(k) + '=' + encodeURIComponent(_sv));
    }
  }
  return s.join('&');
}

/**
 * Returns `true` if the URL is secure: either HTTPS or localhost (for testing).
 * @param {string|!Location} url
 * @return {boolean}
 */
function isSecureUrl(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  return url.protocol == 'https:' || url.hostname == 'localhost' || (0, _string.endsWith)(url.hostname, '.localhost');
}

/**
 * Asserts that a given url is HTTPS or protocol relative. It's a user-level
 * assert.
 *
 * Provides an exception for localhost.
 *
 * @param {?string|undefined} urlString
 * @param {!Element|string} elementContext Element where the url was found.
 * @param {string=} sourceName Used for error messages.
 * @return {string}
 */
function assertHttpsUrl(urlString, elementContext) {
  var sourceName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'source';

  (0, _log.user)().assert(urlString != null, '%s %s must be available', elementContext, sourceName);
  // (erwinm, #4560): type cast necessary until #4560 is fixed.
  var theUrlString = /** @type {string} */urlString;
  (0, _log.user)().assert(isSecureUrl(theUrlString) || /^(\/\/)/.test(theUrlString), '%s %s must start with ' + '"https://" or "//" or be relative and served from ' + 'either https or from localhost. Invalid value: %s', elementContext, sourceName, theUrlString);
  return theUrlString;
}

/**
 * Asserts that a given url is an absolute HTTP or HTTPS URL.
 * @param {string} urlString
 * @return {string}
 */
function assertAbsoluteHttpOrHttpsUrl(urlString) {
  (0, _log.user)().assert(/^https?\:/i.test(urlString), 'URL must start with "http://" or "https://". Invalid value: %s', urlString);
  return parseUrl(urlString).href;
}

/**
 * Parses the query string of an URL. This method returns a simple key/value
 * map. If there are duplicate keys the latest value is returned.
 *
 * This function is implemented in a separate file to avoid a circular
 * dependency.
 *
 * @param {string} queryString
 * @return {!JsonObject}
 */
function parseQueryString(queryString) {
  return (0, _urlParseQueryString.parseQueryString_)(queryString);
}

/**
 * Returns the URL without fragment. If URL doesn't contain fragment, the same
 * string is returned.
 * @param {string} url
 * @return {string}
 */
function removeFragment(url) {
  var index = url.indexOf('#');
  if (index == -1) {
    return url;
  }
  return url.substring(0, index);
}

/**
 * Returns the fragment from the URL. If the URL doesn't contain fragment,
 * the empty string is returned.
 * @param {string} url
 * @return {string}
 */
function getFragment(url) {
  var index = url.indexOf('#');
  if (index == -1) {
    return '';
  }
  return url.substring(index);
}

/**
 * Returns whether the URL has the origin of a proxy.
 * @param {string|!Location} url URL of an AMP document.
 * @return {boolean}
 */
function isProxyOrigin(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  return _config.urls.cdnProxyRegex.test(url.origin);
}

/**
 * Returns whether the URL origin is localhost.
 * @param {string|!Location} url URL of an AMP document.
 * @return {boolean}
 */
function isLocalhostOrigin(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  return _config.urls.localhostRegex.test(url.origin);
}

/**
 * Returns whether the URL has valid protocol.
 * Deep link protocol is valid, but not javascript etc.
 * @param {string|!Location} url
 * @return {boolean}
 */
function isProtocolValid(url) {
  if (!url) {
    return true;
  }
  if (typeof url == 'string') {
    url = parseUrl(url);
  }
  return !INVALID_PROTOCOLS.includes(url.protocol);
}

/**
 * Removes parameters that start with amp js parameter pattern and returns the new
 * search string.
 * @param {string} urlSearch
 * @return {string}
 */
function removeAmpJsParams(urlSearch) {
  if (!urlSearch || urlSearch == '?') {
    return '';
  }
  var search = urlSearch.replace(AMP_JS_PARAMS_REGEX, '').replace(GOOGLE_EXPERIMENT_PARAMS_REGEX, '').replace(/^[?&]/, ''); // Removes first ? or &.
  return search ? '?' + search : '';
}

/**
 * Returns the source URL of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string}
 */
function getSourceUrl(url) {
  if (typeof url == 'string') {
    url = parseUrl(url);
  }

  // Not a proxy URL - return the URL itself.
  if (!isProxyOrigin(url)) {
    return url.href;
  }

  // A proxy URL.
  // Example path that is being matched here.
  // https://cdn.ampproject.org/c/s/www.origin.com/foo/
  // The /s/ is optional and signals a secure origin.
  var path = url.pathname.split('/');
  var prefix = path[1];
  (0, _log.user)().assert(prefix == 'a' || prefix == 'c' || prefix == 'v', 'Unknown path prefix in url %s', url.href);
  var domainOrHttpsSignal = path[2];
  var origin = domainOrHttpsSignal == 's' ? 'https://' + decodeURIComponent(path[3]) : 'http://' + decodeURIComponent(domainOrHttpsSignal);
  // Sanity test that what we found looks like a domain.
  (0, _log.user)().assert(origin.indexOf('.') > 0, 'Expected a . in origin %s', origin);
  path.splice(1, domainOrHttpsSignal == 's' ? 3 : 2);
  return origin + path.join('/') + removeAmpJsParams(url.search) + (url.hash || '');
}

/**
 * Returns the source origin of an AMP document for documents served
 * on a proxy origin or directly.
 * @param {string|!Location} url URL of an AMP document.
 * @return {string} The source origin of the URL.
 */
function getSourceOrigin(url) {
  return parseUrl(getSourceUrl(url)).origin;
}

/**
 * Returns absolute URL resolved based on the relative URL and the base.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 */
function resolveRelativeUrl(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrl(baseUrl);
  }
  if (typeof URL == 'function') {
    return new URL(relativeUrlString, baseUrl.href).toString();
  }
  return resolveRelativeUrlFallback_(relativeUrlString, baseUrl);
}

/**
 * Fallback for URL resolver when URL class is not available.
 * @param {string} relativeUrlString
 * @param {string|!Location} baseUrl
 * @return {string}
 * @private Visible for testing.
 */
function resolveRelativeUrlFallback_(relativeUrlString, baseUrl) {
  if (typeof baseUrl == 'string') {
    baseUrl = parseUrl(baseUrl);
  }
  relativeUrlString = relativeUrlString.replace(/\\/g, '/');
  var relativeUrl = parseUrl(relativeUrlString);

  // Absolute URL.
  if ((0, _string.startsWith)(relativeUrlString.toLowerCase(), relativeUrl.protocol)) {
    return relativeUrl.href;
  }

  // Protocol-relative URL.
  if ((0, _string.startsWith)(relativeUrlString, '//')) {
    return baseUrl.protocol + relativeUrlString;
  }

  // Absolute path.
  if ((0, _string.startsWith)(relativeUrlString, '/')) {
    return baseUrl.origin + relativeUrlString;
  }

  // Relative path.
  return baseUrl.origin + baseUrl.pathname.replace(/\/[^/]*$/, '/') + relativeUrlString;
}

/**
 * Add "__amp_source_origin" query parameter to the URL.
 * @param {!Window} win
 * @param {string} url
 * @return {string}
 */
function getCorsUrl(win, url) {
  checkCorsUrl(url);
  var sourceOrigin = getSourceOrigin(win.location.href);
  return addParamToUrl(url, SOURCE_ORIGIN_PARAM, sourceOrigin);
}

/**
 * Checks if the url have __amp_source_origin and throws if it does.
 * @param {string} url
 */
function checkCorsUrl(url) {
  var parsedUrl = parseUrl(url);
  var query = parseQueryString(parsedUrl.search);
  (0, _log.user)().assert(!(SOURCE_ORIGIN_PARAM in query), 'Source origin is not allowed in %s', url);
}

/**
 * Tries to decode a URI component, falling back to opt_fallback (or an empty
 * string)
 *
 * @param {string} component
 * @param {string=} opt_fallback
 * @return {string}
 */
function tryDecodeUriComponent(component, opt_fallback) {
  return (0, _urlTryDecodeUriComponent.tryDecodeUriComponent_)(component, opt_fallback);
}

},{"./config":18,"./log":28,"./mode":30,"./string":45,"./types":48,"./url-parse-query-string":49,"./url-try-decode-uri-component":50}],52:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSplice = filterSplice;
exports.findIndex = findIndex;
exports.fromIterator = fromIterator;
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A bit like Array#filter, but removes elements that filter false from the
 * array. Returns the filtered items.
 *
 * @param {!Array<T>} array
 * @param {function(T, number, !Array<T>):boolean} filter
 * @return {!Array<T>}
 * @template T
 */
function filterSplice(array, filter) {
  var splice = [];
  var index = 0;
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (filter(item, i, array)) {
      if (index < i) {
        array[index] = item;
      }
      index++;
    } else {
      splice.push(item);
    }
  }

  if (index < array.length) {
    array.length = index;
  }

  return splice;
}

/**
 * Returns the index of the first element matching the predicate.
 * Like Array#findIndex.
 *
 * @param {!Array<T>} array
 * @param {function(T, number, !Array<T>):boolean} predicate
 * @return {number}
 * @template T
 */
function findIndex(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

/**
 * Converts the given iterator to an array.
 *
 * @param {!Iterator<T>} iterator
 * @return {Array<T>}
 * @template T
 */
function fromIterator(iterator) {
  var array = [];
  for (var e = iterator.next(); !e.done; e = iterator.next()) {
    array.push(e.value);
  }
  return array;
}

},{}],53:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utf8Decode = utf8Decode;
exports.utf8DecodeSync = utf8DecodeSync;
exports.utf8Encode = utf8Encode;
exports.utf8EncodeSync = utf8EncodeSync;
exports.stringToBytes = stringToBytes;
exports.bytesToString = bytesToString;
exports.bytesToUInt32 = bytesToUInt32;
exports.getCryptoRandomBytesArray = getCryptoRandomBytesArray;

var _log = require('../log');

/**
 * Interpret a byte array as a UTF-8 string.
 * @param {!BufferSource} bytes
 * @return {!Promise<string>}
 */
function utf8Decode(bytes) {
  if (typeof TextDecoder !== 'undefined') {
    return Promise.resolve(new TextDecoder('utf-8').decode(bytes));
  }
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = function () {
      reject(reader.error);
    };
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.readAsText(new Blob([bytes]));
  });
}

// TODO(aghassemi, #6139): Remove the async version of utf8 encoding and rename
// the sync versions to the canonical utf8Decode/utf8Encode.
/**
 * Interpret a byte array as a UTF-8 string.
 * @param {!BufferSource} bytes
 * @return {!string}
 */
/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function utf8DecodeSync(bytes) {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder('utf-8').decode(bytes);
  }
  var asciiString = bytesToString(new Uint8Array(bytes.buffer || bytes));
  return decodeURIComponent(escape(asciiString));
}

/**
 * Turn a string into UTF-8 bytes.
 * @param {string} string
 * @return {!Promise<!Uint8Array>}
 */
function utf8Encode(string) {
  if (typeof TextEncoder !== 'undefined') {
    return Promise.resolve(new TextEncoder('utf-8').encode(string));
  }
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onerror = function () {
      reject(reader.error);
    };
    reader.onloadend = function () {
      // Because we used readAsArrayBuffer, we know the result must be an
      // ArrayBuffer.
      resolve(new Uint8Array( /** @type {ArrayBuffer} */reader.result));
    };
    reader.readAsArrayBuffer(new Blob([string]));
  });
}

/**
 * Turn a string into UTF-8 bytes.
 * @param {string} string
 * @return {!Uint8Array}
 */
function utf8EncodeSync(string) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder('utf-8').encode(string);
  }
  return stringToBytes(unescape(encodeURIComponent(string)));
}

/**
 * Converts a string which holds 8-bit code points, such as the result of atob,
 * into a Uint8Array with the corresponding bytes.
 * If you have a string of characters, you probably want to be using utf8Encode.
 * @param {string} str
 * @return {!Uint8Array}
 */
function stringToBytes(str) {
  var bytes = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    (0, _log.dev)().assert(charCode <= 255, 'Characters must be in range [0,255]');
    bytes[i] = charCode;
  }
  return bytes;
};

/**
 * Converts a 8-bit bytes array into a string
 * @param {!Uint8Array} bytes
 * @return {string}
 */
function bytesToString(bytes) {
  // Intentionally avoids String.fromCharCode.apply so we don't suffer a
  // stack overflow. #10495, https://jsperf.com/bytesToString-2
  var array = new Array(bytes.length);
  for (var i = 0; i < bytes.length; i++) {
    array[i] = String.fromCharCode(bytes[i]);
  }
  return array.join('');
};

/**
 * Converts a 4-item byte array to an unsigned integer.
 * Assumes bytes are big endian.
 * @param {!Uint8Array} bytes
 * @return {number}
 */
function bytesToUInt32(bytes) {
  if (bytes.length != 4) {
    throw new Error('Received byte array with length != 4');
  }
  var val = (bytes[0] & 0xFF) << 24 | (bytes[1] & 0xFF) << 16 | (bytes[2] & 0xFF) << 8 | bytes[3] & 0xFF;
  // Convert to unsigned.
  return val >>> 0;
}

/**
 * Generate a random bytes array with specific length using
 * win.crypto.getRandomValues. Return null if it is not available.
 * @param {!number} length
 * @return {?Uint8Array}
 */
function getCryptoRandomBytesArray(win, length) {
  if (!win.crypto || !win.crypto.getRandomValues) {
    return null;
  }

  // Widely available in browsers we support:
  // http://caniuse.com/#search=getRandomValues
  var uint8array = new Uint8Array(length);
  win.crypto.getRandomValues(uint8array);
  return uint8array;
}

},{"../log":28}],54:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.dict = dict;
exports.hasOwn = hasOwn;
exports.ownProperty = ownProperty;
exports.deepMerge = deepMerge;
exports.omit = omit;

var _types = require('../types');

/* @const */
var hasOwn_ = Object.prototype.hasOwnProperty;

/**
 * Returns a map-like object.
 * If opt_initial is provided, copies its own properties into the
 * newly created object.
 * @param {T=} opt_initial This should typically be an object literal.
 * @return {T}
 * @template T
 */
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function map(opt_initial) {
  var obj = Object.create(null);
  if (opt_initial) {
    Object.assign(obj, opt_initial);
  }
  return obj;
}

/**
 * Return an empty JsonObject or makes the passed in object literal
 * an JsonObject.
 * The JsonObject type is just a simple object that is at-dict.
 * See
 * https://github.com/google/closure-compiler/wiki/@struct-and-@dict-Annotations
 * for what a dict is type-wise.
 * The linter enforces that the argument is, in fact, at-dict like.
 * @param {!Object=} opt_initial
 * @return {!JsonObject}
 */
function dict(opt_initial) {
  // We do not copy. The linter enforces that the passed in object is a literal
  // and thus the caller cannot have a reference to it.
  return (/** @type {!JsonObject} */opt_initial || {}
  );
}

/**
 * Checks if the given key is a property in the map.
 *
 * @param {T}  obj a map like property.
 * @param {string}  key
 * @return {boolean}
 * @template T
 */
function hasOwn(obj, key) {
  return hasOwn_.call(obj, key);
}

/**
 * Returns obj[key] iff key is obj's own property (is not inherited).
 * Otherwise, returns undefined.
 *
 * @param {Object} obj
 * @param {string} key
 * @return {*}
 */
function ownProperty(obj, key) {
  if (hasOwn(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}

/**
 * Deep merges source into target.
 *
 * @param {!Object} target
 * @param {!Object} source
 * @param {number} depth The maximum merge depth. If exceeded, Object.assign
 *                       will be used instead.
 * @return {!Object}
 * @throws {Error} If source contains a circular reference.
 * @note Only nested objects are deep-merged, primitives and arrays are not.
 */
function deepMerge(target, source) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

  // Keep track of seen objects to detect recursive references.
  var seen = [];

  /** @type {!Array<{t: !Object, s: !Object, d: number}>} */
  var queue = [];
  queue.push({ t: target, s: source, d: 0 });

  // BFS to ensure objects don't have recursive references at shallower depths.

  var _loop = function _loop() {
    var _queue$shift = queue.shift(),
        t = _queue$shift.t,
        s = _queue$shift.s,
        d = _queue$shift.d;

    if (seen.includes(s)) {
      throw new Error('Source object has a circular reference.');
    }
    seen.push(s);
    if (t === s) {
      return 'continue';
    }
    if (d > depth) {
      Object.assign(t, s);
      return 'continue';
    }
    Object.keys(s).forEach(function (key) {
      var newValue = s[key];
      // Perform a deep merge IFF both target and source have the same key
      // whose corresponding values are objects.
      if (hasOwn(t, key)) {
        var oldValue = t[key];
        if ((0, _types.isObject)(newValue) && (0, _types.isObject)(oldValue)) {
          queue.push({ t: oldValue, s: newValue, d: d + 1 });
          return;
        }
      }
      t[key] = newValue;
    });
  };

  while (queue.length > 0) {
    var _ret = _loop();

    if (_ret === 'continue') continue;
  }
  return target;
}

/**
 * @param {!Object} o An object to remove properties from
 * @param {!Array<string>} props A list of properties to remove from the Object
 * @return {!Object} An object with the given properties removed
 */
function omit(o, props) {
  return Object.keys(o).reduce(function (acc, key) {
    if (!props.includes(key)) {
      acc[key] = o[key];
    }
    return acc;
  }, {});
}

},{"../types":48}],55:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A priority queue backed with sorted array.
 * @template T
 */
var PriorityQueue = function () {
  function PriorityQueue() {
    _classCallCheck(this, PriorityQueue);

    /** @private @const {Array<{item: T, priority: number}>} */
    this.queue_ = [];
  }

  /**
   * Returns the max priority item without dequeueing it.
   * @return {T}
   */


  PriorityQueue.prototype.peek = function peek() {
    var l = this.queue_.length;
    if (!l) {
      return null;
    }
    return this.queue_[l - 1].item;
  };

  /**
   * Enqueues an item with the given priority.
   * @param {T} item
   * @param {number} priority
   */


  PriorityQueue.prototype.enqueue = function enqueue(item, priority) {
    if (isNaN(priority)) {
      throw new Error('Priority must not be NaN.');
    }
    var i = this.binarySearch_(priority);
    this.queue_.splice(i, 0, { item: item, priority: priority });
  };

  /**
   * Returns index at which item with `target` priority should be inserted.
   * @param {number} target
   * @return {number}
   * @private
   */


  PriorityQueue.prototype.binarySearch_ = function binarySearch_(target) {
    var i = -1;
    var lo = 0;
    var hi = this.queue_.length;
    while (lo <= hi) {
      i = Math.floor((lo + hi) / 2);
      // This means `target` is the new max priority in the queue.
      if (i === this.queue_.length) {
        break;
      }
      // Stop searching once p[i] >= target AND p[i-1] < target.
      // This way, we'll return the index of the first occurence of `target`
      // priority (if any), which preserves FIFO order of same-priority items.
      if (this.queue_[i].priority < target) {
        lo = i + 1;
      } else if (i > 0 && this.queue_[i - 1].priority >= target) {
        hi = i - 1;
      } else {
        break;
      }
    }
    return i;
  };

  /**
   * Dequeues the max priority item.
   * Items with the same priority are dequeued in FIFO order.
   * @return {T}
   */


  PriorityQueue.prototype.dequeue = function dequeue() {
    if (!this.queue_.length) {
      return null;
    }
    return this.queue_.pop().item;
  };

  /**
   * The number of items in the queue.
   * @return {number}
   */


  _createClass(PriorityQueue, [{
    key: 'length',
    get: function get() {
      return this.queue_.length;
    }
  }]);

  return PriorityQueue;
}();

exports.default = PriorityQueue;

},{}],56:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invokeWebWorker = invokeWebWorker;
exports.ampWorkerForTesting = ampWorkerForTesting;

var _webWorkerDefines = require('./web-worker-defines');

var _extensionLocation = require('../service/extension-location');

var _log = require('../log');

var _service = require('../service');

var _mode = require('../mode');

var _services = require('../services');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
                                                                                                                                                           *
                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                           * you may not use this file except in compliance with the License.
                                                                                                                                                           * You may obtain a copy of the License at
                                                                                                                                                           *
                                                                                                                                                           *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                           *
                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                           * distributed under the License is distributed on an "AS-IS" BASIS,
                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                           * See the License for the specific language governing permissions and
                                                                                                                                                           * limitations under the License.
                                                                                                                                                           */

var TAG = 'web-worker';

/**
 * @typedef {{method: string, resolve: !Function, reject: !Function}}
 */
var PendingMessageDef = void 0;

/**
 * Invokes function named `method` with args `opt_args` on the web worker
 * and returns a Promise that will be resolved with the function's return value.
 *
 * If `opt_localWin` is provided, method will be executed in a scope limited
 * to other invocations with `opt_localWin`.
 *
 * @note Currently only works in a single entry point (amp-bind.js).
 *
 * @param {!Window} win
 * @param {string} method
 * @param {!Array=} opt_args
 * @param {!Window=} opt_localWin
 * @return {!Promise}
 */
function invokeWebWorker(win, method, opt_args, opt_localWin) {
  if (!win.Worker) {
    return Promise.reject('Worker not supported in window.');
  }
  (0, _service.registerServiceBuilder)(win, 'amp-worker', AmpWorker);
  var worker = (0, _service.getService)(win, 'amp-worker');
  return worker.sendMessage_(method, opt_args || [], opt_localWin);
}

/**
 * @param {!Window} win
 * @return {!AmpWorker}
 * @visibleForTesting
 */
function ampWorkerForTesting(win) {
  (0, _service.registerServiceBuilder)(win, 'amp-worker', AmpWorker);
  return (0, _service.getService)(win, 'amp-worker');
}

/**
 * A Promise-based API wrapper around a single Web Worker.
 * @private
 */

var AmpWorker = function () {
  /**
   * @param {!Window} win
   */
  function AmpWorker(win) {
    var _this = this;

    _classCallCheck(this, AmpWorker);

    /** @const @private {!Window} */
    this.win_ = win;

    /** @const @private {!../service/xhr-impl.Xhr} */
    this.xhr_ = _services.Services.xhrFor(win);

    // Use `testLocation` for testing with iframes. @see testing/iframe.js.
    var loc = win.location;
    if ((0, _mode.getMode)().test && win.testLocation) {
      loc = win.testLocation;
    }
    // Use RTV to make sure we fetch prod/canary/experiment correctly.
    var useLocal = (0, _mode.getMode)().localDev || (0, _mode.getMode)().test;
    var useRtvVersion = !useLocal;
    var url = (0, _extensionLocation.calculateEntryPointScriptUrl)(loc, 'ww', useLocal, useRtvVersion);
    (0, _log.dev)().fine(TAG, 'Fetching web worker from', url);

    /** @private {Worker} */
    this.worker_ = null;

    /** @const @private {!Promise} */
    this.fetchPromise_ = this.xhr_.fetchText(url, {
      ampCors: false
    }).then(function (res) {
      return res.text();
    }).then(function (text) {
      // Workaround since Worker constructor only accepts same origin URLs.
      var blob = new win.Blob([text], { type: 'text/javascript' });
      var blobUrl = win.URL.createObjectURL(blob);
      _this.worker_ = new win.Worker(blobUrl);
      _this.worker_.onmessage = _this.receiveMessage_.bind(_this);
    });

    /**
     * Array of in-flight messages pending response from worker.
     * @const @private {!Object<number, PendingMessageDef>}
     */
    this.messages_ = {};

    /**
     * Monotonically increasing integer that increments on each message.
     * @private {number}
     */
    this.counter_ = 0;

    /**
     * Array of top-level and local windows passed into `invokeWebWorker`.
     * Used to uniquely identify windows for scoping worker functions when
     * a single worker is used for multiple windows (i.e. FIE).
     * @const @private {!Array<!Window>}
     */
    this.windows_ = [win];
  }

  /**
   * Sends a method invocation request to the worker and returns a Promise.
   * @param {string} method
   * @param {!Array} args
   * @return {!Promise}
   * @private
   */


  AmpWorker.prototype.sendMessage_ = function sendMessage_(method, args, opt_localWin) {
    var _this2 = this;

    return this.fetchPromise_.then(function () {
      return new Promise(function (resolve, reject) {
        var id = _this2.counter_++;
        _this2.messages_[id] = { method: method, resolve: resolve, reject: reject };

        var scope = _this2.idForWindow_(opt_localWin || _this2.win_);

        /** @type {ToWorkerMessageDef} */
        var message = { method: method, args: args, scope: scope, id: id };
        _this2.worker_. /*OK*/postMessage(message);
      });
    });
  };

  /**
   * Receives the result of a method invocation from the worker and resolves
   * the Promise returned from the corresponding `sendMessage_()` call.
   * @param {!MessageEvent} event
   * @private
   */


  AmpWorker.prototype.receiveMessage_ = function receiveMessage_(event) {
    var _event$data =
    /** @type {FromWorkerMessageDef} */event.data,
        method = _event$data.method,
        returnValue = _event$data.returnValue,
        id = _event$data.id;


    var message = this.messages_[id];
    if (!message) {
      (0, _log.dev)().error(TAG, 'Received unexpected message (' + method + ', ' + id + ') ' + 'from worker.');
      return;
    }
    (0, _log.dev)().assert(method == message.method, 'Received mismatched method ' + ('(' + method + ', ' + id + '), expected ' + message.method + '.'));

    message.resolve(returnValue);

    delete this.messages_[id];
  };

  /**
   * @return {boolean}
   * @visibleForTesting
   */


  AmpWorker.prototype.hasPendingMessages = function hasPendingMessages() {
    return Object.keys(this.messages_).length > 0;
  };

  /**
   * Returns an identifier for `win`, unique for set of windows seen so far.
   * @param {!Window} win
   * @return {number}
   * @private
   */


  AmpWorker.prototype.idForWindow_ = function idForWindow_(win) {
    var index = this.windows_.indexOf(win);
    if (index >= 0) {
      return index;
    } else {
      return this.windows_.push(win) - 1;
    }
  };

  /**
   * @return {!Promise}
   * @visibleForTesting
   */


  AmpWorker.prototype.fetchPromiseForTesting = function fetchPromiseForTesting() {
    return this.fetchPromise_;
  };

  return AmpWorker;
}();

},{"../log":28,"../mode":30,"../service":41,"../service/extension-location":42,"../services":43,"./web-worker-defines":57}],57:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   method: string,
 *   args: !Array,
 *   scope: number,
 *   id: number,
 * }}
 */
var ToWorkerMessageDef = exports.ToWorkerMessageDef = void 0;

/**
 * @typedef {{
 *   method: string,
 *   returnValue: *,
 *   id: number,
 * }}
 */
var FromWorkerMessageDef = exports.FromWorkerMessageDef = void 0;

},{}],58:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Generated from CAJA Sanitizer library commit 110311969a9e3d8acfe38526fe9d925485648fc8 */

// Copyright (C) 2010 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview
 * Implements RFC 3986 for parsing/formatting URIs.
 *
 * @author mikesamuel@gmail.com
 * \@provides URI
 * \@overrides window
 */

var URI = function () {

  /**
   * creates a uri from the string form.  The parser is relaxed, so special
   * characters that aren't escaped but don't cause ambiguities will not cause
   * parse failures.
   *
   * @return {URI|null}
   */
  function parse(uriStr) {
    var m = ('' + uriStr).match(URI_RE_);
    if (!m) {
      return null;
    }
    return new URI(nullIfAbsent(m[1]), nullIfAbsent(m[2]), nullIfAbsent(m[3]), nullIfAbsent(m[4]), nullIfAbsent(m[5]), nullIfAbsent(m[6]), nullIfAbsent(m[7]));
  }

  /**
   * creates a uri from the given parts.
   *
   * @param scheme {string} an unencoded scheme such as "http" or null
   * @param credentials {string} unencoded user credentials or null
   * @param domain {string} an unencoded domain name or null
   * @param port {number} a port number in [1, 32768].
   *    -1 indicates no port, as does null.
   * @param path {string} an unencoded path
   * @param query {Array.<string>|string|null} a list of unencoded cgi
   *   parameters where even values are keys and odds the corresponding values
   *   or an unencoded query.
   * @param fragment {string} an unencoded fragment without the "#" or null.
   * @return {URI}
   */
  function create(scheme, credentials, domain, port, path, query, fragment) {
    var uri = new URI(encodeIfExists2(scheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_), encodeIfExists2(credentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_), encodeIfExists(domain), port > 0 ? port.toString() : null, encodeIfExists2(path, URI_DISALLOWED_IN_PATH_), null, encodeIfExists(fragment));
    if (query) {
      if ('string' === typeof query) {
        uri.setRawQuery(query.replace(/[^?&=0-9A-Za-z_\-~.%]/g, encodeOne));
      } else {
        uri.setAllParameters(query);
      }
    }
    return uri;
  }
  function encodeIfExists(unescapedPart) {
    if ('string' == typeof unescapedPart) {
      return encodeURIComponent(unescapedPart);
    }
    return null;
  };
  /**
   * if unescapedPart is non null, then escapes any characters in it that aren't
   * valid characters in a url and also escapes any special characters that
   * appear in extra.
   *
   * @param unescapedPart {string}
   * @param extra {RegExp} a character set of characters in [\01-\177].
   * @return {string|null} null iff unescapedPart == null.
   */
  function encodeIfExists2(unescapedPart, extra) {
    if ('string' == typeof unescapedPart) {
      return encodeURI(unescapedPart).replace(extra, encodeOne);
    }
    return null;
  };
  /** converts a character in [\01-\177] to its url encoded equivalent. */
  function encodeOne(ch) {
    var n = ch.charCodeAt(0);
    return '%' + '0123456789ABCDEF'.charAt(n >> 4 & 0xf) + '0123456789ABCDEF'.charAt(n & 0xf);
  }

  /**
   * {@updoc
   *  $ normPath('foo/./bar')
   *  # 'foo/bar'
   *  $ normPath('./foo')
   *  # 'foo'
   *  $ normPath('foo/.')
   *  # 'foo'
   *  $ normPath('foo//bar')
   *  # 'foo/bar'
   * }
   */
  function normPath(path) {
    return path.replace(/(^|\/)\.(?:\/|$)/g, '$1').replace(/\/{2,}/g, '/');
  }

  var PARENT_DIRECTORY_HANDLER = new RegExp(''
  // A path break
  + '(/|^)'
  // followed by a non .. path element
  // (cannot be . because normPath is used prior to this RegExp)
  + '(?:[^./][^/]*|\\.{2,}(?:[^./][^/]*)|\\.{3,}[^/]*)'
  // followed by .. followed by a path break.
  + '/\\.\\.(?:/|$)');

  var PARENT_DIRECTORY_HANDLER_RE = new RegExp(PARENT_DIRECTORY_HANDLER);

  var EXTRA_PARENT_PATHS_RE = /^(?:\.\.\/)*(?:\.\.$)?/;

  /**
   * Normalizes its input path and collapses all . and .. sequences except for
   * .. sequences that would take it above the root of the current parent
   * directory.
   * {@updoc
   *  $ collapse_dots('foo/../bar')
   *  # 'bar'
   *  $ collapse_dots('foo/./bar')
   *  # 'foo/bar'
   *  $ collapse_dots('foo/../bar/./../../baz')
   *  # 'baz'
   *  $ collapse_dots('../foo')
   *  # '../foo'
   *  $ collapse_dots('../foo').replace(EXTRA_PARENT_PATHS_RE, '')
   *  # 'foo'
   * }
   */
  function collapse_dots(path) {
    if (path === null) {
      return null;
    }
    var p = normPath(path);
    // Only /../ left to flatten
    var r = PARENT_DIRECTORY_HANDLER_RE;
    // We replace with $1 which matches a / before the .. because this
    // guarantees that:
    // (1) we have at most 1 / between the adjacent place,
    // (2) always have a slash if there is a preceding path section, and
    // (3) we never turn a relative path into an absolute path.
    for (var q; (q = p.replace(r, '$1')) != p; p = q) {};
    return p;
  }

  /**
   * resolves a relative url string to a base uri.
   * @return {URI}
   */
  function _resolve(baseUri, relativeUri) {
    // there are several kinds of relative urls:
    // 1. //foo - replaces everything from the domain on.  foo is a domain name
    // 2. foo - replaces the last part of the path, the whole query and fragment
    // 3. /foo - replaces the the path, the query and fragment
    // 4. ?foo - replace the query and fragment
    // 5. #foo - replace the fragment only

    var absoluteUri = baseUri.clone();
    // we satisfy these conditions by looking for the first part of relativeUri
    // that is not blank and applying defaults to the rest

    var overridden = relativeUri.hasScheme();

    if (overridden) {
      absoluteUri.setRawScheme(relativeUri.getRawScheme());
    } else {
      overridden = relativeUri.hasCredentials();
    }

    if (overridden) {
      absoluteUri.setRawCredentials(relativeUri.getRawCredentials());
    } else {
      overridden = relativeUri.hasDomain();
    }

    if (overridden) {
      absoluteUri.setRawDomain(relativeUri.getRawDomain());
    } else {
      overridden = relativeUri.hasPort();
    }

    var rawPath = relativeUri.getRawPath();
    var simplifiedPath = collapse_dots(rawPath);
    if (overridden) {
      absoluteUri.setPort(relativeUri.getPort());
      simplifiedPath = simplifiedPath && simplifiedPath.replace(EXTRA_PARENT_PATHS_RE, '');
    } else {
      overridden = !!rawPath;
      if (overridden) {
        // resolve path properly
        if (simplifiedPath.charCodeAt(0) !== 0x2f /* / */) {
            // path is relative
            var absRawPath = collapse_dots(absoluteUri.getRawPath() || '').replace(EXTRA_PARENT_PATHS_RE, '');
            var slash = absRawPath.lastIndexOf('/') + 1;
            simplifiedPath = collapse_dots((slash ? absRawPath.substring(0, slash) : '') + collapse_dots(rawPath)).replace(EXTRA_PARENT_PATHS_RE, '');
          }
      } else {
        simplifiedPath = simplifiedPath && simplifiedPath.replace(EXTRA_PARENT_PATHS_RE, '');
        if (simplifiedPath !== rawPath) {
          absoluteUri.setRawPath(simplifiedPath);
        }
      }
    }

    if (overridden) {
      absoluteUri.setRawPath(simplifiedPath);
    } else {
      overridden = relativeUri.hasQuery();
    }

    if (overridden) {
      absoluteUri.setRawQuery(relativeUri.getRawQuery());
    } else {
      overridden = relativeUri.hasFragment();
    }

    if (overridden) {
      absoluteUri.setRawFragment(relativeUri.getRawFragment());
    }

    return absoluteUri;
  }

  /**
   * a mutable URI.
   *
   * This class contains setters and getters for the parts of the URI.
   * The <tt>getXYZ</tt>/<tt>setXYZ</tt> methods return the decoded part -- so
   * <code>uri.parse('/foo%20bar').getPath()</code> will return the decoded path,
   * <tt>/foo bar</tt>.
   *
   * <p>The raw versions of fields are available too.
   * <code>uri.parse('/foo%20bar').getRawPath()</code> will return the raw path,
   * <tt>/foo%20bar</tt>.  Use the raw setters with care, since
   * <code>URI::toString</code> is not guaranteed to return a valid url if a
   * raw setter was used.
   *
   * <p>All setters return <tt>this</tt> and so may be chained, a la
   * <code>uri.parse('/foo').setFragment('part').toString()</code>.
   *
   * <p>You should not use this constructor directly -- please prefer the factory
   * functions {@link uri.parse}, {@link uri.create}, {@link uri.resolve}
   * instead.</p>
   *
   * <p>The parameters are all raw (assumed to be properly escaped) parts, and
   * any (but not all) may be null.  Undefined is not allowed.</p>
   *
   * @constructor
   */
  function URI(rawScheme, rawCredentials, rawDomain, port, rawPath, rawQuery, rawFragment) {
    this.scheme_ = rawScheme;
    this.credentials_ = rawCredentials;
    this.domain_ = rawDomain;
    this.port_ = port;
    this.path_ = rawPath;
    this.query_ = rawQuery;
    this.fragment_ = rawFragment;
    /**
     * @type {Array|null}
     */
    this.paramCache_ = null;
  }

  /** returns the string form of the url. */
  URI.prototype.toString = function () {
    var out = [];
    if (null !== this.scheme_) {
      out.push(this.scheme_, ':');
    }
    if (null !== this.domain_) {
      out.push('//');
      if (null !== this.credentials_) {
        out.push(this.credentials_, '@');
      }
      out.push(this.domain_);
      if (null !== this.port_) {
        out.push(':', this.port_.toString());
      }
    }
    if (null !== this.path_) {
      out.push(this.path_);
    }
    if (null !== this.query_) {
      out.push('?', this.query_);
    }
    if (null !== this.fragment_) {
      out.push('#', this.fragment_);
    }
    return out.join('');
  };

  URI.prototype.clone = function () {
    return new URI(this.scheme_, this.credentials_, this.domain_, this.port_, this.path_, this.query_, this.fragment_);
  };

  URI.prototype.getScheme = function () {
    // HTML5 spec does not require the scheme to be lowercased but
    // all common browsers except Safari lowercase the scheme.
    return this.scheme_ && decodeURIComponent(this.scheme_).toLowerCase();
  };
  URI.prototype.getRawScheme = function () {
    return this.scheme_;
  };
  URI.prototype.setScheme = function (newScheme) {
    this.scheme_ = encodeIfExists2(newScheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);
    return this;
  };
  URI.prototype.setRawScheme = function (newScheme) {
    this.scheme_ = newScheme ? newScheme : null;
    return this;
  };
  URI.prototype.hasScheme = function () {
    return null !== this.scheme_;
  };

  URI.prototype.getCredentials = function () {
    return this.credentials_ && decodeURIComponent(this.credentials_);
  };
  URI.prototype.getRawCredentials = function () {
    return this.credentials_;
  };
  URI.prototype.setCredentials = function (newCredentials) {
    this.credentials_ = encodeIfExists2(newCredentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);

    return this;
  };
  URI.prototype.setRawCredentials = function (newCredentials) {
    this.credentials_ = newCredentials ? newCredentials : null;
    return this;
  };
  URI.prototype.hasCredentials = function () {
    return null !== this.credentials_;
  };

  URI.prototype.getDomain = function () {
    return this.domain_ && decodeURIComponent(this.domain_);
  };
  URI.prototype.getRawDomain = function () {
    return this.domain_;
  };
  URI.prototype.setDomain = function (newDomain) {
    return this.setRawDomain(newDomain && encodeURIComponent(newDomain));
  };
  URI.prototype.setRawDomain = function (newDomain) {
    this.domain_ = newDomain ? newDomain : null;
    // Maintain the invariant that paths must start with a slash when the URI
    // is not path-relative.
    return this.setRawPath(this.path_);
  };
  URI.prototype.hasDomain = function () {
    return null !== this.domain_;
  };

  URI.prototype.getPort = function () {
    return this.port_ && decodeURIComponent(this.port_);
  };
  URI.prototype.setPort = function (newPort) {
    if (newPort) {
      newPort = Number(newPort);
      if (newPort !== (newPort & 0xffff)) {
        throw new Error('Bad port number ' + newPort);
      }
      this.port_ = '' + newPort;
    } else {
      this.port_ = null;
    }
    return this;
  };
  URI.prototype.hasPort = function () {
    return null !== this.port_;
  };

  URI.prototype.getPath = function () {
    return this.path_ && decodeURIComponent(this.path_);
  };
  URI.prototype.getRawPath = function () {
    return this.path_;
  };
  URI.prototype.setPath = function (newPath) {
    return this.setRawPath(encodeIfExists2(newPath, URI_DISALLOWED_IN_PATH_));
  };
  URI.prototype.setRawPath = function (newPath) {
    if (newPath) {
      newPath = String(newPath);
      this.path_ =
      // Paths must start with '/' unless this is a path-relative URL.
      !this.domain_ || /^\//.test(newPath) ? newPath : '/' + newPath;
    } else {
      this.path_ = null;
    }
    return this;
  };
  URI.prototype.hasPath = function () {
    return null !== this.path_;
  };

  URI.prototype.getQuery = function () {
    // From http://www.w3.org/Addressing/URL/4_URI_Recommentations.html
    // Within the query string, the plus sign is reserved as shorthand notation
    // for a space.
    return this.query_ && decodeURIComponent(this.query_).replace(/\+/g, ' ');
  };
  URI.prototype.getRawQuery = function () {
    return this.query_;
  };
  URI.prototype.setQuery = function (newQuery) {
    this.paramCache_ = null;
    this.query_ = encodeIfExists(newQuery);
    return this;
  };
  URI.prototype.setRawQuery = function (newQuery) {
    this.paramCache_ = null;
    this.query_ = newQuery ? newQuery : null;
    return this;
  };
  URI.prototype.hasQuery = function () {
    return null !== this.query_;
  };

  /**
   * sets the query given a list of strings of the form
   * [ key0, value0, key1, value1, ... ].
   *
   * <p><code>uri.setAllParameters(['a', 'b', 'c', 'd']).getQuery()</code>
   * will yield <code>'a=b&c=d'</code>.
   */
  URI.prototype.setAllParameters = function (params) {
    if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
      if (!(params instanceof Array) && (params instanceof Object || Object.prototype.toString.call(params) !== '[object Array]')) {
        var newParams = [];
        var i = -1;
        for (var k in params) {
          var v = params[k];
          if ('string' === typeof v) {
            newParams[++i] = k;
            newParams[++i] = v;
          }
        }
        params = newParams;
      }
    }
    this.paramCache_ = null;
    var queryBuf = [];
    var separator = '';
    for (var j = 0; j < params.length;) {
      var k = params[j++];
      var v = params[j++];
      queryBuf.push(separator, encodeURIComponent(k.toString()));
      separator = '&';
      if (v) {
        queryBuf.push('=', encodeURIComponent(v.toString()));
      }
    }
    this.query_ = queryBuf.join('');
    return this;
  };
  URI.prototype.checkParameterCache_ = function () {
    if (!this.paramCache_) {
      var q = this.query_;
      if (!q) {
        this.paramCache_ = [];
      } else {
        var cgiParams = q.split(/[&\?]/);
        var out = [];
        var k = -1;
        for (var i = 0; i < cgiParams.length; ++i) {
          var m = cgiParams[i].match(/^([^=]*)(?:=(.*))?$/);
          // From http://www.w3.org/Addressing/URL/4_URI_Recommentations.html
          // Within the query string, the plus sign is reserved as shorthand
          // notation for a space.
          out[++k] = decodeURIComponent(m[1]).replace(/\+/g, ' ');
          out[++k] = decodeURIComponent(m[2] || '').replace(/\+/g, ' ');
        }
        this.paramCache_ = out;
      }
    }
  };
  /**
   * sets the values of the named cgi parameters.
   *
   * <p>So, <code>uri.parse('foo?a=b&c=d&e=f').setParameterValues('c', ['new'])
   * </code> yields <tt>foo?a=b&c=new&e=f</tt>.</p>
   *
   * @param key {string}
   * @param values {Array.<string>} the new values.  If values is a single string
   *   then it will be treated as the sole value.
   */
  URI.prototype.setParameterValues = function (key, values) {
    // be nice and avoid subtle bugs where [] operator on string performs charAt
    // on some browsers and crashes on IE
    if (typeof values === 'string') {
      values = [values];
    }

    this.checkParameterCache_();
    var newValueIndex = 0;
    var pc = this.paramCache_;
    var params = [];
    for (var i = 0, k = 0; i < pc.length; i += 2) {
      if (key === pc[i]) {
        if (newValueIndex < values.length) {
          params.push(key, values[newValueIndex++]);
        }
      } else {
        params.push(pc[i], pc[i + 1]);
      }
    }
    while (newValueIndex < values.length) {
      params.push(key, values[newValueIndex++]);
    }
    this.setAllParameters(params);
    return this;
  };
  URI.prototype.removeParameter = function (key) {
    return this.setParameterValues(key, []);
  };
  /**
   * returns the parameters specified in the query part of the uri as a list of
   * keys and values like [ key0, value0, key1, value1, ... ].
   *
   * @return {Array.<string>}
   */
  URI.prototype.getAllParameters = function () {
    this.checkParameterCache_();
    return this.paramCache_.slice(0, this.paramCache_.length);
  };
  /**
   * returns the value<b>s</b> for a given cgi parameter as a list of decoded
   * query parameter values.
   * @return {Array.<string>}
   */
  URI.prototype.getParameterValues = function (paramNameUnescaped) {
    this.checkParameterCache_();
    var values = [];
    for (var i = 0; i < this.paramCache_.length; i += 2) {
      if (paramNameUnescaped === this.paramCache_[i]) {
        values.push(this.paramCache_[i + 1]);
      }
    }
    return values;
  };
  /**
   * returns a map of cgi parameter names to (non-empty) lists of values.
   * @return {Object.<string,Array.<string>>}
   */
  URI.prototype.getParameterMap = function (paramNameUnescaped) {
    this.checkParameterCache_();
    var paramMap = {};
    for (var i = 0; i < this.paramCache_.length; i += 2) {
      var key = this.paramCache_[i++],
          value = this.paramCache_[i++];
      if (!(key in paramMap)) {
        paramMap[key] = [value];
      } else {
        paramMap[key].push(value);
      }
    }
    return paramMap;
  };
  /**
   * returns the first value for a given cgi parameter or null if the given
   * parameter name does not appear in the query string.
   * If the given parameter name does appear, but has no '<tt>=</tt>' following
   * it, then the empty string will be returned.
   * @return {string|null}
   */
  URI.prototype.getParameterValue = function (paramNameUnescaped) {
    this.checkParameterCache_();
    for (var i = 0; i < this.paramCache_.length; i += 2) {
      if (paramNameUnescaped === this.paramCache_[i]) {
        return this.paramCache_[i + 1];
      }
    }
    return null;
  };

  URI.prototype.getFragment = function () {
    return this.fragment_ && decodeURIComponent(this.fragment_);
  };
  URI.prototype.getRawFragment = function () {
    return this.fragment_;
  };
  URI.prototype.setFragment = function (newFragment) {
    this.fragment_ = newFragment ? encodeURIComponent(newFragment) : null;
    return this;
  };
  URI.prototype.setRawFragment = function (newFragment) {
    this.fragment_ = newFragment ? newFragment : null;
    return this;
  };
  URI.prototype.hasFragment = function () {
    return null !== this.fragment_;
  };

  function nullIfAbsent(matchPart) {
    return 'string' == typeof matchPart && matchPart.length > 0 ? matchPart : null;
  }

  /**
   * a regular expression for breaking a URI into its component parts.
   *
   * <p>http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#RFC2234 says
   * As the "first-match-wins" algorithm is identical to the "greedy"
   * disambiguation method used by POSIX regular expressions, it is natural and
   * commonplace to use a regular expression for parsing the potential five
   * components of a URI reference.
   *
   * <p>The following line is the regular expression for breaking-down a
   * well-formed URI reference into its components.
   *
   * <pre>
   * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
   *  12            3  4          5       6  7        8 9
   * </pre>
   *
   * <p>The numbers in the second line above are only to assist readability; they
   * indicate the reference points for each subexpression (i.e., each paired
   * parenthesis). We refer to the value matched for subexpression <n> as $<n>.
   * For example, matching the above expression to
   * <pre>
   *     http://www.ics.uci.edu/pub/ietf/uri/#Related
   * </pre>
   * results in the following subexpression matches:
   * <pre>
   *    $1 = http:
   *    $2 = http
   *    $3 = //www.ics.uci.edu
   *    $4 = www.ics.uci.edu
   *    $5 = /pub/ietf/uri/
   *    $6 = <undefined>
   *    $7 = <undefined>
   *    $8 = #Related
   *    $9 = Related
   * </pre>
   * where <undefined> indicates that the component is not present, as is the
   * case for the query component in the above example. Therefore, we can
   * determine the value of the five components as
   * <pre>
   *    scheme    = $2
   *    authority = $4
   *    path      = $5
   *    query     = $7
   *    fragment  = $9
   * </pre>
   *
   * <p>msamuel: I have modified the regular expression slightly to expose the
   * credentials, domain, and port separately from the authority.
   * The modified version yields
   * <pre>
   *    $1 = http              scheme
   *    $2 = <undefined>       credentials -\
   *    $3 = www.ics.uci.edu   domain       | authority
   *    $4 = <undefined>       port        -/
   *    $5 = /pub/ietf/uri/    path
   *    $6 = <undefined>       query without ?
   *    $7 = Related           fragment without #
   * </pre>
   */
  var URI_RE_ = new RegExp("^" + "(?:" + "([^:/?#]+)" + // scheme
  ":)?" + "(?://" + "(?:([^/?#]*)@)?" + // credentials
  "([^/?#:@]*)" + // domain
  "(?::([0-9]+))?" + // port
  ")?" + "([^?#]+)?" + // path
  "(?:\\?([^#]*))?" + // query
  "(?:#(.*))?" + // fragment
  "$");

  var URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_ = /[#\/\?@]/g;
  var URI_DISALLOWED_IN_PATH_ = /[\#\?]/g;

  URI.parse = parse;
  URI.create = create;
  URI.resolve = _resolve;
  URI.collapse_dots = collapse_dots; // Visible for testing.

  // lightweight string-based api for loadModuleMaker
  URI.utils = {
    mimeTypeOf: function mimeTypeOf(uri) {
      var uriObj = parse(uri);
      if (/\.html$/.test(uriObj.getPath())) {
        return 'text/html';
      } else {
        return 'application/javascript';
      }
    },
    resolve: function resolve(base, uri) {
      if (base) {
        return _resolve(parse(base), parse(uri)).toString();
      } else {
        return '' + uri;
      }
    }
  };

  return URI;
}();

// Exports for closure compiler.
if (typeof window !== 'undefined') {}
;
// Copyright Google Inc.
// Licensed under the Apache Licence Version 2.0
// Autogenerated at Mon Nov 09 11:02:37 PST 2015
// @overrides window
// @provides html4
var html4 = {};
html4.atype = {
  'NONE': 0,
  'URI': 1,
  'URI_FRAGMENT': 11,
  'SCRIPT': 2,
  'STYLE': 3,
  'HTML': 12,
  'ID': 4,
  'IDREF': 5,
  'IDREFS': 6,
  'GLOBAL_NAME': 7,
  'LOCAL_NAME': 8,
  'CLASSES': 9,
  'FRAME_TARGET': 10,
  'MEDIA_QUERY': 13
};
html4['atype'] = html4.atype;
html4.ATTRIBS = {
  '*::class': 9,
  '*::dir': 0,
  '*::draggable': 0,
  '*::hidden': 0,
  '*::id': 4,
  '*::inert': 0,
  '*::itemprop': 0,
  '*::itemref': 6,
  '*::itemscope': 0,
  '*::lang': 0,
  '*::onblur': 2,
  '*::onchange': 2,
  '*::onclick': 2,
  '*::ondblclick': 2,
  '*::onerror': 2,
  '*::onfocus': 2,
  '*::onkeydown': 2,
  '*::onkeypress': 2,
  '*::onkeyup': 2,
  '*::onload': 2,
  '*::onmousedown': 2,
  '*::onmousemove': 2,
  '*::onmouseout': 2,
  '*::onmouseover': 2,
  '*::onmouseup': 2,
  '*::onreset': 2,
  '*::onscroll': 2,
  '*::onselect': 2,
  '*::onsubmit': 2,
  '*::ontouchcancel': 2,
  '*::ontouchend': 2,
  '*::ontouchenter': 2,
  '*::ontouchleave': 2,
  '*::ontouchmove': 2,
  '*::ontouchstart': 2,
  '*::onunload': 2,
  '*::spellcheck': 0,
  '*::style': 3,
  '*::tabindex': 0,
  '*::title': 0,
  '*::translate': 0,
  'a::accesskey': 0,
  'a::coords': 0,
  'a::href': 1,
  'a::hreflang': 0,
  'a::name': 7,
  'a::onblur': 2,
  'a::onfocus': 2,
  'a::shape': 0,
  'a::target': 10,
  'a::type': 0,
  'area::accesskey': 0,
  'area::alt': 0,
  'area::coords': 0,
  'area::href': 1,
  'area::nohref': 0,
  'area::onblur': 2,
  'area::onfocus': 2,
  'area::shape': 0,
  'area::target': 10,
  'audio::controls': 0,
  'audio::loop': 0,
  'audio::mediagroup': 5,
  'audio::muted': 0,
  'audio::preload': 0,
  'audio::src': 1,
  'bdo::dir': 0,
  'blockquote::cite': 1,
  'br::clear': 0,
  'button::accesskey': 0,
  'button::disabled': 0,
  'button::name': 8,
  'button::onblur': 2,
  'button::onfocus': 2,
  'button::type': 0,
  'button::value': 0,
  'canvas::height': 0,
  'canvas::width': 0,
  'caption::align': 0,
  'col::align': 0,
  'col::char': 0,
  'col::charoff': 0,
  'col::span': 0,
  'col::valign': 0,
  'col::width': 0,
  'colgroup::align': 0,
  'colgroup::char': 0,
  'colgroup::charoff': 0,
  'colgroup::span': 0,
  'colgroup::valign': 0,
  'colgroup::width': 0,
  'command::checked': 0,
  'command::command': 5,
  'command::disabled': 0,
  'command::icon': 1,
  'command::label': 0,
  'command::radiogroup': 0,
  'command::type': 0,
  'data::value': 0,
  'del::cite': 1,
  'del::datetime': 0,
  'details::open': 0,
  'dir::compact': 0,
  'div::align': 0,
  'dl::compact': 0,
  'fieldset::disabled': 0,
  'font::color': 0,
  'font::face': 0,
  'font::size': 0,
  'form::accept': 0,
  'form::action': 1,
  'form::autocomplete': 0,
  'form::enctype': 0,
  'form::method': 0,
  'form::name': 7,
  'form::novalidate': 0,
  'form::onreset': 2,
  'form::onsubmit': 2,
  'form::target': 10,
  'h1::align': 0,
  'h2::align': 0,
  'h3::align': 0,
  'h4::align': 0,
  'h5::align': 0,
  'h6::align': 0,
  'hr::align': 0,
  'hr::noshade': 0,
  'hr::size': 0,
  'hr::width': 0,
  'iframe::align': 0,
  'iframe::frameborder': 0,
  'iframe::height': 0,
  'iframe::marginheight': 0,
  'iframe::marginwidth': 0,
  'iframe::width': 0,
  'img::align': 0,
  'img::alt': 0,
  'img::border': 0,
  'img::height': 0,
  'img::hspace': 0,
  'img::ismap': 0,
  'img::name': 7,
  'img::src': 1,
  'img::usemap': 11,
  'img::vspace': 0,
  'img::width': 0,
  'input::accept': 0,
  'input::accesskey': 0,
  'input::align': 0,
  'input::alt': 0,
  'input::autocomplete': 0,
  'input::checked': 0,
  'input::disabled': 0,
  'input::inputmode': 0,
  'input::ismap': 0,
  'input::list': 5,
  'input::max': 0,
  'input::maxlength': 0,
  'input::min': 0,
  'input::multiple': 0,
  'input::name': 8,
  'input::onblur': 2,
  'input::onchange': 2,
  'input::onfocus': 2,
  'input::onselect': 2,
  'input::pattern': 0,
  'input::placeholder': 0,
  'input::readonly': 0,
  'input::required': 0,
  'input::size': 0,
  'input::src': 1,
  'input::step': 0,
  'input::type': 0,
  'input::usemap': 11,
  'input::value': 0,
  'ins::cite': 1,
  'ins::datetime': 0,
  'label::accesskey': 0,
  'label::for': 5,
  'label::onblur': 2,
  'label::onfocus': 2,
  'legend::accesskey': 0,
  'legend::align': 0,
  'li::type': 0,
  'li::value': 0,
  'map::name': 7,
  'menu::compact': 0,
  'menu::label': 0,
  'menu::type': 0,
  'meter::high': 0,
  'meter::low': 0,
  'meter::max': 0,
  'meter::min': 0,
  'meter::optimum': 0,
  'meter::value': 0,
  'ol::compact': 0,
  'ol::reversed': 0,
  'ol::start': 0,
  'ol::type': 0,
  'optgroup::disabled': 0,
  'optgroup::label': 0,
  'option::disabled': 0,
  'option::label': 0,
  'option::selected': 0,
  'option::value': 0,
  'output::for': 6,
  'output::name': 8,
  'p::align': 0,
  'pre::width': 0,
  'progress::max': 0,
  'progress::min': 0,
  'progress::value': 0,
  'q::cite': 1,
  'select::autocomplete': 0,
  'select::disabled': 0,
  'select::multiple': 0,
  'select::name': 8,
  'select::onblur': 2,
  'select::onchange': 2,
  'select::onfocus': 2,
  'select::required': 0,
  'select::size': 0,
  'source::type': 0,
  'table::align': 0,
  'table::bgcolor': 0,
  'table::border': 0,
  'table::cellpadding': 0,
  'table::cellspacing': 0,
  'table::frame': 0,
  'table::rules': 0,
  'table::summary': 0,
  'table::width': 0,
  'tbody::align': 0,
  'tbody::char': 0,
  'tbody::charoff': 0,
  'tbody::valign': 0,
  'td::abbr': 0,
  'td::align': 0,
  'td::axis': 0,
  'td::bgcolor': 0,
  'td::char': 0,
  'td::charoff': 0,
  'td::colspan': 0,
  'td::headers': 6,
  'td::height': 0,
  'td::nowrap': 0,
  'td::rowspan': 0,
  'td::scope': 0,
  'td::valign': 0,
  'td::width': 0,
  'textarea::accesskey': 0,
  'textarea::autocomplete': 0,
  'textarea::cols': 0,
  'textarea::disabled': 0,
  'textarea::inputmode': 0,
  'textarea::name': 8,
  'textarea::onblur': 2,
  'textarea::onchange': 2,
  'textarea::onfocus': 2,
  'textarea::onselect': 2,
  'textarea::placeholder': 0,
  'textarea::readonly': 0,
  'textarea::required': 0,
  'textarea::rows': 0,
  'textarea::wrap': 0,
  'tfoot::align': 0,
  'tfoot::char': 0,
  'tfoot::charoff': 0,
  'tfoot::valign': 0,
  'th::abbr': 0,
  'th::align': 0,
  'th::axis': 0,
  'th::bgcolor': 0,
  'th::char': 0,
  'th::charoff': 0,
  'th::colspan': 0,
  'th::headers': 6,
  'th::height': 0,
  'th::nowrap': 0,
  'th::rowspan': 0,
  'th::scope': 0,
  'th::valign': 0,
  'th::width': 0,
  'thead::align': 0,
  'thead::char': 0,
  'thead::charoff': 0,
  'thead::valign': 0,
  'tr::align': 0,
  'tr::bgcolor': 0,
  'tr::char': 0,
  'tr::charoff': 0,
  'tr::valign': 0,
  'track::default': 0,
  'track::kind': 0,
  'track::label': 0,
  'track::srclang': 0,
  'ul::compact': 0,
  'ul::type': 0,
  'video::controls': 0,
  'video::height': 0,
  'video::loop': 0,
  'video::mediagroup': 5,
  'video::muted': 0,
  'video::poster': 1,
  'video::preload': 0,
  'video::src': 1,
  'video::width': 0
};
html4['ATTRIBS'] = html4.ATTRIBS;
html4.eflags = {
  'OPTIONAL_ENDTAG': 1,
  'EMPTY': 2,
  'CDATA': 4,
  'RCDATA': 8,
  'UNSAFE': 16,
  'FOLDABLE': 32,
  'SCRIPT': 64,
  'STYLE': 128,
  'VIRTUALIZED': 256
};
html4['eflags'] = html4.eflags;
html4.ELEMENTS = {
  'a': 0,
  'abbr': 0,
  'acronym': 0,
  'address': 0,
  'applet': 272,
  'area': 2,
  'article': 0,
  'aside': 0,
  'audio': 0,
  'b': 0,
  'base': 274,
  'basefont': 274,
  'bdi': 0,
  'bdo': 0,
  'big': 0,
  'blockquote': 0,
  'body': 305,
  'br': 2,
  'button': 0,
  'canvas': 0,
  'caption': 0,
  'center': 0,
  'cite': 0,
  'code': 0,
  'col': 2,
  'colgroup': 1,
  'command': 2,
  'data': 0,
  'datalist': 0,
  'dd': 1,
  'del': 0,
  'details': 0,
  'dfn': 0,
  'dialog': 272,
  'dir': 0,
  'div': 0,
  'dl': 0,
  'dt': 1,
  'em': 0,
  'fieldset': 0,
  'figcaption': 0,
  'figure': 0,
  'font': 0,
  'footer': 0,
  'form': 0,
  'frame': 274,
  'frameset': 272,
  'h1': 0,
  'h2': 0,
  'h3': 0,
  'h4': 0,
  'h5': 0,
  'h6': 0,
  'head': 305,
  'header': 0,
  'hgroup': 0,
  'hr': 2,
  'html': 305,
  'i': 0,
  'iframe': 4,
  'img': 2,
  'input': 2,
  'ins': 0,
  'isindex': 274,
  'kbd': 0,
  'keygen': 274,
  'label': 0,
  'legend': 0,
  'li': 1,
  'link': 274,
  'map': 0,
  'mark': 0,
  'menu': 0,
  'meta': 274,
  'meter': 0,
  'nav': 0,
  'nobr': 0,
  'noembed': 276,
  'noframes': 276,
  'noscript': 276,
  'object': 272,
  'ol': 0,
  'optgroup': 0,
  'option': 1,
  'output': 0,
  'p': 1,
  'param': 274,
  'pre': 0,
  'progress': 0,
  'q': 0,
  's': 0,
  'samp': 0,
  'script': 84,
  'section': 0,
  'select': 0,
  'small': 0,
  'source': 2,
  'span': 0,
  'strike': 0,
  'strong': 0,
  'style': 148,
  'sub': 0,
  'summary': 0,
  'sup': 0,
  'table': 0,
  'tbody': 1,
  'td': 1,
  'textarea': 8,
  'tfoot': 1,
  'th': 1,
  'thead': 1,
  'time': 0,
  'title': 280,
  'tr': 1,
  'track': 2,
  'tt': 0,
  'u': 0,
  'ul': 0,
  'var': 0,
  'video': 0,
  'wbr': 2
};
html4['ELEMENTS'] = html4.ELEMENTS;
html4.ELEMENT_DOM_INTERFACES = {
  'a': 'HTMLAnchorElement',
  'abbr': 'HTMLElement',
  'acronym': 'HTMLElement',
  'address': 'HTMLElement',
  'applet': 'HTMLAppletElement',
  'area': 'HTMLAreaElement',
  'article': 'HTMLElement',
  'aside': 'HTMLElement',
  'audio': 'HTMLAudioElement',
  'b': 'HTMLElement',
  'base': 'HTMLBaseElement',
  'basefont': 'HTMLBaseFontElement',
  'bdi': 'HTMLElement',
  'bdo': 'HTMLElement',
  'big': 'HTMLElement',
  'blockquote': 'HTMLQuoteElement',
  'body': 'HTMLBodyElement',
  'br': 'HTMLBRElement',
  'button': 'HTMLButtonElement',
  'canvas': 'HTMLCanvasElement',
  'caption': 'HTMLTableCaptionElement',
  'center': 'HTMLElement',
  'cite': 'HTMLElement',
  'code': 'HTMLElement',
  'col': 'HTMLTableColElement',
  'colgroup': 'HTMLTableColElement',
  'command': 'HTMLCommandElement',
  'data': 'HTMLElement',
  'datalist': 'HTMLDataListElement',
  'dd': 'HTMLElement',
  'del': 'HTMLModElement',
  'details': 'HTMLDetailsElement',
  'dfn': 'HTMLElement',
  'dialog': 'HTMLDialogElement',
  'dir': 'HTMLDirectoryElement',
  'div': 'HTMLDivElement',
  'dl': 'HTMLDListElement',
  'dt': 'HTMLElement',
  'em': 'HTMLElement',
  'fieldset': 'HTMLFieldSetElement',
  'figcaption': 'HTMLElement',
  'figure': 'HTMLElement',
  'font': 'HTMLFontElement',
  'footer': 'HTMLElement',
  'form': 'HTMLFormElement',
  'frame': 'HTMLFrameElement',
  'frameset': 'HTMLFrameSetElement',
  'h1': 'HTMLHeadingElement',
  'h2': 'HTMLHeadingElement',
  'h3': 'HTMLHeadingElement',
  'h4': 'HTMLHeadingElement',
  'h5': 'HTMLHeadingElement',
  'h6': 'HTMLHeadingElement',
  'head': 'HTMLHeadElement',
  'header': 'HTMLElement',
  'hgroup': 'HTMLElement',
  'hr': 'HTMLHRElement',
  'html': 'HTMLHtmlElement',
  'i': 'HTMLElement',
  'iframe': 'HTMLIFrameElement',
  'img': 'HTMLImageElement',
  'input': 'HTMLInputElement',
  'ins': 'HTMLModElement',
  'isindex': 'HTMLUnknownElement',
  'kbd': 'HTMLElement',
  'keygen': 'HTMLKeygenElement',
  'label': 'HTMLLabelElement',
  'legend': 'HTMLLegendElement',
  'li': 'HTMLLIElement',
  'link': 'HTMLLinkElement',
  'map': 'HTMLMapElement',
  'mark': 'HTMLElement',
  'menu': 'HTMLMenuElement',
  'meta': 'HTMLMetaElement',
  'meter': 'HTMLMeterElement',
  'nav': 'HTMLElement',
  'nobr': 'HTMLElement',
  'noembed': 'HTMLElement',
  'noframes': 'HTMLElement',
  'noscript': 'HTMLElement',
  'object': 'HTMLObjectElement',
  'ol': 'HTMLOListElement',
  'optgroup': 'HTMLOptGroupElement',
  'option': 'HTMLOptionElement',
  'output': 'HTMLOutputElement',
  'p': 'HTMLParagraphElement',
  'param': 'HTMLParamElement',
  'pre': 'HTMLPreElement',
  'progress': 'HTMLProgressElement',
  'q': 'HTMLQuoteElement',
  's': 'HTMLElement',
  'samp': 'HTMLElement',
  'script': 'HTMLScriptElement',
  'section': 'HTMLElement',
  'select': 'HTMLSelectElement',
  'small': 'HTMLElement',
  'source': 'HTMLSourceElement',
  'span': 'HTMLSpanElement',
  'strike': 'HTMLElement',
  'strong': 'HTMLElement',
  'style': 'HTMLStyleElement',
  'sub': 'HTMLElement',
  'summary': 'HTMLElement',
  'sup': 'HTMLElement',
  'table': 'HTMLTableElement',
  'tbody': 'HTMLTableSectionElement',
  'td': 'HTMLTableDataCellElement',
  'textarea': 'HTMLTextAreaElement',
  'tfoot': 'HTMLTableSectionElement',
  'th': 'HTMLTableHeaderCellElement',
  'thead': 'HTMLTableSectionElement',
  'time': 'HTMLTimeElement',
  'title': 'HTMLTitleElement',
  'tr': 'HTMLTableRowElement',
  'track': 'HTMLTrackElement',
  'tt': 'HTMLElement',
  'u': 'HTMLElement',
  'ul': 'HTMLUListElement',
  'var': 'HTMLElement',
  'video': 'HTMLVideoElement',
  'wbr': 'HTMLElement'
};
html4['ELEMENT_DOM_INTERFACES'] = html4.ELEMENT_DOM_INTERFACES;
html4.ueffects = {
  'NOT_LOADED': 0,
  'SAME_DOCUMENT': 1,
  'NEW_DOCUMENT': 2
};
html4['ueffects'] = html4.ueffects;
html4.URIEFFECTS = {
  'a::href': 2,
  'area::href': 2,
  'audio::src': 1,
  'blockquote::cite': 0,
  'command::icon': 1,
  'del::cite': 0,
  'form::action': 2,
  'img::src': 1,
  'input::src': 1,
  'ins::cite': 0,
  'q::cite': 0,
  'video::poster': 1,
  'video::src': 1
};
html4['URIEFFECTS'] = html4.URIEFFECTS;
html4.ltypes = {
  'UNSANDBOXED': 2,
  'SANDBOXED': 1,
  'DATA': 0
};
html4['ltypes'] = html4.ltypes;
html4.LOADERTYPES = {
  'a::href': 2,
  'area::href': 2,
  'audio::src': 2,
  'blockquote::cite': 2,
  'command::icon': 1,
  'del::cite': 2,
  'form::action': 2,
  'img::src': 1,
  'input::src': 1,
  'ins::cite': 2,
  'q::cite': 2,
  'video::poster': 1,
  'video::src': 2
};
html4['LOADERTYPES'] = html4.LOADERTYPES;
// export for Closure Compiler
if (typeof window !== 'undefined') {}
;
// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview
 * An HTML sanitizer that can satisfy a variety of security policies.
 *
 * <p>
 * The HTML sanitizer is built around a SAX parser and HTML element and
 * attributes schemas.
 *
 * If the cssparser is loaded, inline styles are sanitized using the
 * css property and value schemas.  Else they are remove during
 * sanitization.
 *
 * If it exists, uses parseCssDeclarations, sanitizeCssProperty,  cssSchema
 *
 * @author mikesamuel@gmail.com
 * @author jasvir@gmail.com
 * \@requires html4, URI
 * \@overrides window
 * \@provides html, html_sanitize
 */

// The Turkish i seems to be a non-issue, but abort in case it is.
if ('I'.toLowerCase() !== 'i') {
  throw 'I/i problem';
}

/**
 * \@namespace
 */
var html = function (html4) {

  // For closure compiler
  var parseCssDeclarations, sanitizeCssProperty, cssSchema;
  if ('undefined' !== typeof window) {
    parseCssDeclarations = window['parseCssDeclarations'];
    sanitizeCssProperty = window['sanitizeCssProperty'];
    cssSchema = window['cssSchema'];
  }

  // The keys of this object must be 'quoted' or JSCompiler will mangle them!
  // This is a partial list -- lookupEntity() uses the host browser's parser
  // (when available) to implement full entity lookup.
  // Note that entities are in general case-sensitive; the uppercase ones are
  // explicitly defined by HTML5 (presumably as compatibility).
  var ENTITIES = {
    'lt': '<',
    'LT': '<',
    'gt': '>',
    'GT': '>',
    'amp': '&',
    'AMP': '&',
    'quot': '"',
    'apos': '\'',
    'nbsp': '\xA0'
  };

  // Patterns for types of entity/character reference names.
  var decimalEscapeRe = /^#(\d+)$/;
  var hexEscapeRe = /^#x([0-9A-Fa-f]+)$/;
  // contains every entity per http://www.w3.org/TR/2011/WD-html5-20110113/named-character-references.html
  var safeEntityNameRe = /^[A-Za-z][A-Za-z0-9]+$/;
  // Used as a hook to invoke the browser's entity parsing. <textarea> is used
  // because its content is parsed for entities but not tags.
  // TODO(kpreid): This retrieval is a kludge and leads to silent loss of
  // functionality if the document isn't available.
  var entityLookupElement = 'undefined' !== typeof window && window['document'] ? window['document'].createElement('textarea') : null;
  /**
   * Decodes an HTML entity.
   *
   * {\@updoc
   * $ lookupEntity('lt')
   * # '<'
   * $ lookupEntity('GT')
   * # '>'
   * $ lookupEntity('amp')
   * # '&'
   * $ lookupEntity('nbsp')
   * # '\xA0'
   * $ lookupEntity('apos')
   * # "'"
   * $ lookupEntity('quot')
   * # '"'
   * $ lookupEntity('#xa')
   * # '\n'
   * $ lookupEntity('#10')
   * # '\n'
   * $ lookupEntity('#x0a')
   * # '\n'
   * $ lookupEntity('#010')
   * # '\n'
   * $ lookupEntity('#x00A')
   * # '\n'
   * $ lookupEntity('Pi')      // Known failure
   * # '\u03A0'
   * $ lookupEntity('pi')      // Known failure
   * # '\u03C0'
   * }
   *
   * @param {string} name the content between the '&' and the ';'.
   * @return {string} a single unicode code-point as a string.
   */
  function lookupEntity(name) {
    // TODO: entity lookup as specified by HTML5 actually depends on the
    // presence of the ";".
    if (ENTITIES.hasOwnProperty(name)) {
      return ENTITIES[name];
    }
    var m = name.match(decimalEscapeRe);
    if (m) {
      return String.fromCharCode(parseInt(m[1], 10));
    } else if (!!(m = name.match(hexEscapeRe))) {
      return String.fromCharCode(parseInt(m[1], 16));
    } else if (entityLookupElement && safeEntityNameRe.test(name)) {
      entityLookupElement.innerHTML = '&' + name + ';';
      var text = entityLookupElement.textContent;
      ENTITIES[name] = text;
      return text;
    } else {
      return '&' + name + ';';
    }
  }

  function decodeOneEntity(_, name) {
    return lookupEntity(name);
  }

  var nulRe = /\0/g;
  function stripNULs(s) {
    return s.replace(nulRe, '');
  }

  var ENTITY_RE_1 = /&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g;
  var ENTITY_RE_2 = /^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/;
  /**
   * The plain text of a chunk of HTML CDATA which possibly containing.
   *
   * {\@updoc
   * $ unescapeEntities('')
   * # ''
   * $ unescapeEntities('hello World!')
   * # 'hello World!'
   * $ unescapeEntities('1 &lt; 2 &amp;&AMP; 4 &gt; 3&#10;')
   * # '1 < 2 && 4 > 3\n'
   * $ unescapeEntities('&lt;&lt <- unfinished entity&gt;')
   * # '<&lt <- unfinished entity>'
   * $ unescapeEntities('/foo?bar=baz&copy=true')  // & often unescaped in URLS
   * # '/foo?bar=baz&copy=true'
   * $ unescapeEntities('pi=&pi;&#x3c0;, Pi=&Pi;\u03A0') // FIXME: known failure
   * # 'pi=\u03C0\u03c0, Pi=\u03A0\u03A0'
   * }
   *
   * @param {string} s a chunk of HTML CDATA.  It must not start or end inside
   *     an HTML entity.
   */
  function unescapeEntities(s) {
    return s.replace(ENTITY_RE_1, decodeOneEntity);
  }

  var ampRe = /&/g;
  var looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi;
  var ltRe = /[<]/g;
  var gtRe = />/g;
  var quotRe = /\"/g;

  /**
   * Escapes HTML special characters in attribute values.
   *
   * {\@updoc
   * $ escapeAttrib('')
   * # ''
   * $ escapeAttrib('"<<&==&>>"')  // Do not just escape the first occurrence.
   * # '&#34;&lt;&lt;&amp;&#61;&#61;&amp;&gt;&gt;&#34;'
   * $ escapeAttrib('Hello <World>!')
   * # 'Hello &lt;World&gt;!'
   * }
   */
  function escapeAttrib(s) {
    return ('' + s).replace(ampRe, '&amp;').replace(ltRe, '&lt;').replace(gtRe, '&gt;').replace(quotRe, '&#34;');
  }

  /**
   * Escape entities in RCDATA that can be escaped without changing the meaning.
   * {\@updoc
   * $ normalizeRCData('1 < 2 &&amp; 3 > 4 &amp;& 5 &lt; 7&8')
   * # '1 &lt; 2 &amp;&amp; 3 &gt; 4 &amp;&amp; 5 &lt; 7&amp;8'
   * }
   */
  function normalizeRCData(rcdata) {
    return rcdata.replace(looseAmpRe, '&amp;$1').replace(ltRe, '&lt;').replace(gtRe, '&gt;');
  }

  // TODO(felix8a): validate sanitizer regexs against the HTML5 grammar at
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/tokenization.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html

  // We initially split input so that potentially meaningful characters
  // like '<' and '>' are separate tokens, using a fast dumb process that
  // ignores quoting.  Then we walk that token stream, and when we see a
  // '<' that's the start of a tag, we use ATTR_RE to extract tag
  // attributes from the next token.  That token will never have a '>'
  // character.  However, it might have an unbalanced quote character, and
  // when we see that, we combine additional tokens to balance the quote.

  var ATTR_RE = new RegExp('^\\s*' + '(\\[[-.:\\w]+\\]|[-.:\\w]+)' + // 1 = Attribute name
  '(?:' + ('\\s*(=)\\s*' + // 2 = Is there a value?
  '(' + ( // 3 = Attribute value
  // TODO(felix8a): maybe use backref to match quotes
  '(\")[^\"]*(\"|$)' + // 4, 5 = Double-quoted string
  '|' + '(\')[^\']*(\'|$)' + // 6, 7 = Single-quoted string
  '|' +
  // Positive lookahead to prevent interpretation of
  // <foo a= b=c> as <foo a='b=c'>
  // TODO(felix8a): might be able to drop this case
  '(?=[a-z][-\\w]*\\s*=)' + '|' +
  // Unquoted value that isn't an attribute name
  // (since we didn't match the positive lookahead above)
  '[^\"\'\\s]*') + ')') + ')?', 'i');

  // false on IE<=8, true on most other browsers
  var splitWillCapture = 'a,b'.split(/(,)/).length === 3;

  // bitmask for tags with special parsing, like <script> and <textarea>
  var EFLAGS_TEXT = html4.eflags['CDATA'] | html4.eflags['RCDATA'];

  /**
   * Given a SAX-like event handler, produce a function that feeds those
   * events and a parameter to the event handler.
   *
   * The event handler has the form:{@code
   * {
   *   // Name is an upper-case HTML tag name.  Attribs is an array of
   *   // alternating upper-case attribute names, and attribute values.  The
   *   // attribs array is reused by the parser.  Param is the value passed to
   *   // the saxParser.
   *   startTag: function (name, attribs, param) { ... },
   *   endTag:   function (name, param) { ... },
   *   pcdata:   function (text, param) { ... },
   *   rcdata:   function (text, param) { ... },
   *   cdata:    function (text, param) { ... },
   *   startDoc: function (param) { ... },
   *   endDoc:   function (param) { ... }
   * }}
   *
   * @param {Object} handler a record containing event handlers.
   * @return {function(string, Object)} A function that takes a chunk of HTML
   *     and a parameter.  The parameter is passed on to the handler methods.
   */
  function makeSaxParser(handler) {
    // Accept quoted or unquoted keys (Closure compat)
    var hcopy = {
      cdata: handler.cdata || handler['cdata'],
      comment: handler.comment || handler['comment'],
      endDoc: handler.endDoc || handler['endDoc'],
      endTag: handler.endTag || handler['endTag'],
      pcdata: handler.pcdata || handler['pcdata'],
      rcdata: handler.rcdata || handler['rcdata'],
      startDoc: handler.startDoc || handler['startDoc'],
      startTag: handler.startTag || handler['startTag']
    };
    return function (htmlText, param) {
      return parse(htmlText, hcopy, param);
    };
  }

  // Parsing strategy is to split input into parts that might be lexically
  // meaningful (every ">" becomes a separate part), and then recombine
  // parts if we discover they're in a different context.

  // TODO(felix8a): Significant performance regressions from -legacy,
  // tested on
  //    Chrome 18.0
  //    Firefox 11.0
  //    IE 6, 7, 8, 9
  //    Opera 11.61
  //    Safari 5.1.3
  // Many of these are unusual patterns that are linearly slower and still
  // pretty fast (eg 1ms to 5ms), so not necessarily worth fixing.

  // TODO(felix8a): "<script> && && && ... <\/script>" is slower on all
  // browsers.  The hotspot is htmlSplit.

  // TODO(felix8a): "<p title='>>>>...'><\/p>" is slower on all browsers.
  // This is partly htmlSplit, but the hotspot is parseTagAndAttrs.

  // TODO(felix8a): "<a><\/a><a><\/a>..." is slower on IE9.
  // "<a>1<\/a><a>1<\/a>..." is faster, "<a><\/a>2<a><\/a>2..." is faster.

  // TODO(felix8a): "<p<p<p..." is slower on IE[6-8]

  var continuationMarker = {};
  function parse(htmlText, handler, param) {
    var m, p, tagName;
    var parts = htmlSplit(htmlText);
    var state = {
      noMoreGT: false,
      noMoreEndComments: false
    };
    parseCPS(handler, parts, 0, state, param);
  }

  function continuationMaker(h, parts, initial, state, param) {
    return function () {
      parseCPS(h, parts, initial, state, param);
    };
  }

  function parseCPS(h, parts, initial, state, param) {
    try {
      if (h.startDoc && initial == 0) {
        h.startDoc(param);
      }
      var m, p, tagName;
      for (var pos = initial, end = parts.length; pos < end;) {
        var current = parts[pos++];
        var next = parts[pos];
        switch (current) {
          case '&':
            if (ENTITY_RE_2.test(next)) {
              if (h.pcdata) {
                h.pcdata('&' + next, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
              }
              pos++;
            } else {
              if (h.pcdata) {
                h.pcdata("&amp;", param, continuationMarker, continuationMaker(h, parts, pos, state, param));
              }
            }
            break;
          case '<\/':
            if (m = /^([-\w:]+)[^\'\"]*/.exec(next)) {
              if (m[0].length === next.length && parts[pos + 1] === '>') {
                // fast case, no attribute parsing needed
                pos += 2;
                tagName = m[1].toLowerCase();
                if (h.endTag) {
                  h.endTag(tagName, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
                }
              } else {
                // slow case, need to parse attributes
                // TODO(felix8a): do we really care about misparsing this?
                pos = parseEndTag(parts, pos, h, param, continuationMarker, state);
              }
            } else {
              if (h.pcdata) {
                h.pcdata('&lt;/', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
              }
            }
            break;
          case '<':
            if (m = /^([-\w:]+)\s*\/?/.exec(next)) {
              if (m[0].length === next.length && parts[pos + 1] === '>') {
                // fast case, no attribute parsing needed
                pos += 2;
                tagName = m[1].toLowerCase();
                if (h.startTag) {
                  h.startTag(tagName, [], param, continuationMarker, continuationMaker(h, parts, pos, state, param));
                }
                // tags like <script> and <textarea> have special parsing
                var eflags = html4.ELEMENTS[tagName];
                if (eflags & EFLAGS_TEXT) {
                  var tag = { name: tagName, next: pos, eflags: eflags };
                  pos = parseText(parts, tag, h, param, continuationMarker, state);
                }
              } else {
                // slow case, need to parse attributes
                pos = parseStartTag(parts, pos, h, param, continuationMarker, state);
              }
            } else {
              if (h.pcdata) {
                h.pcdata('&lt;', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
              }
            }
            break;
          case '<\!--':
            // The pathological case is n copies of '<\!--' without '-->', and
            // repeated failure to find '-->' is quadratic.  We avoid that by
            // remembering when search for '-->' fails.
            if (!state.noMoreEndComments) {
              // A comment <\!--x--> is split into three tokens:
              //   '<\!--', 'x--', '>'
              // We want to find the next '>' token that has a preceding '--'.
              // pos is at the 'x--'.
              for (p = pos + 1; p < end; p++) {
                if (parts[p] === '>' && /--$/.test(parts[p - 1])) {
                  break;
                }
              }
              if (p < end) {
                if (h.comment) {
                  var comment = parts.slice(pos, p).join('');
                  h.comment(comment.substr(0, comment.length - 2), param, continuationMarker, continuationMaker(h, parts, p + 1, state, param));
                }
                pos = p + 1;
              } else {
                state.noMoreEndComments = true;
              }
            }
            if (state.noMoreEndComments) {
              if (h.pcdata) {
                h.pcdata('&lt;!--', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
              }
            }
            break;
          case '<\!':
            if (!/^\w/.test(next)) {
              if (h.pcdata) {
                h.pcdata('&lt;!', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
              }
            } else {
              // similar to noMoreEndComment logic
              if (!state.noMoreGT) {
                for (p = pos + 1; p < end; p++) {
                  if (parts[p] === '>') {
                    break;
                  }
                }
                if (p < end) {
                  pos = p + 1;
                } else {
                  state.noMoreGT = true;
                }
              }
              if (state.noMoreGT) {
                if (h.pcdata) {
                  h.pcdata('&lt;!', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
                }
              }
            }
            break;
          case '<?':
            // similar to noMoreEndComment logic
            if (!state.noMoreGT) {
              for (p = pos + 1; p < end; p++) {
                if (parts[p] === '>') {
                  break;
                }
              }
              if (p < end) {
                pos = p + 1;
              } else {
                state.noMoreGT = true;
              }
            }
            if (state.noMoreGT) {
              if (h.pcdata) {
                h.pcdata('&lt;?', param, continuationMarker, continuationMaker(h, parts, pos, state, param));
              }
            }
            break;
          case '>':
            if (h.pcdata) {
              h.pcdata("&gt;", param, continuationMarker, continuationMaker(h, parts, pos, state, param));
            }
            break;
          case '':
            break;
          default:
            if (h.pcdata) {
              h.pcdata(current, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
            }
            break;
        }
      }
      if (h.endDoc) {
        h.endDoc(param);
      }
    } catch (e) {
      if (e !== continuationMarker) {
        throw e;
      }
    }
  }

  // Split str into parts for the html parser.
  function htmlSplit(str) {
    // can't hoist this out of the function because of the re.exec loop.
    var re = /(<\/|<\!--|<[!?]|[&<>])/g;
    str += '';
    if (splitWillCapture) {
      return str.split(re);
    } else {
      var parts = [];
      var lastPos = 0;
      var m;
      while ((m = re.exec(str)) !== null) {
        parts.push(str.substring(lastPos, m.index));
        parts.push(m[0]);
        lastPos = m.index + m[0].length;
      }
      parts.push(str.substring(lastPos));
      return parts;
    }
  }

  function parseEndTag(parts, pos, h, param, continuationMarker, state) {
    var tag = parseTagAndAttrs(parts, pos);
    // drop unclosed tags
    if (!tag) {
      return parts.length;
    }
    if (h.endTag) {
      h.endTag(tag.name, param, continuationMarker, continuationMaker(h, parts, pos, state, param));
    }
    return tag.next;
  }

  function parseStartTag(parts, pos, h, param, continuationMarker, state) {
    var tag = parseTagAndAttrs(parts, pos);
    // drop unclosed tags
    if (!tag) {
      return parts.length;
    }
    if (h.startTag) {
      h.startTag(tag.name, tag.attrs, param, continuationMarker, continuationMaker(h, parts, tag.next, state, param));
    }
    // tags like <script> and <textarea> have special parsing
    if (tag.eflags & EFLAGS_TEXT) {
      return parseText(parts, tag, h, param, continuationMarker, state);
    } else {
      return tag.next;
    }
  }

  var endTagRe = {};

  // Tags like <script> and <textarea> are flagged as CDATA or RCDATA,
  // which means everything is text until we see the correct closing tag.
  function parseText(parts, tag, h, param, continuationMarker, state) {
    var end = parts.length;
    if (!endTagRe.hasOwnProperty(tag.name)) {
      endTagRe[tag.name] = new RegExp('^' + tag.name + '(?:[\\s\\/]|$)', 'i');
    }
    var re = endTagRe[tag.name];
    var first = tag.next;
    var p = tag.next + 1;
    for (; p < end; p++) {
      if (parts[p - 1] === '<\/' && re.test(parts[p])) {
        break;
      }
    }
    if (p < end) {
      p -= 1;
    }
    var buf = parts.slice(first, p).join('');
    if (tag.eflags & html4.eflags['CDATA']) {
      if (h.cdata) {
        h.cdata(buf, param, continuationMarker, continuationMaker(h, parts, p, state, param));
      }
    } else if (tag.eflags & html4.eflags['RCDATA']) {
      if (h.rcdata) {
        h.rcdata(normalizeRCData(buf), param, continuationMarker, continuationMaker(h, parts, p, state, param));
      }
    } else {
      throw new Error('bug');
    }
    return p;
  }

  // at this point, parts[pos-1] is either "<" or "<\/".
  function parseTagAndAttrs(parts, pos) {
    var m = /^([-\w:]+)/.exec(parts[pos]);
    var tag = {};
    tag.name = m[1].toLowerCase();
    tag.eflags = html4.ELEMENTS[tag.name];
    var buf = parts[pos].substr(m[0].length);
    // Find the next '>'.  We optimistically assume this '>' is not in a
    // quoted context, and further down we fix things up if it turns out to
    // be quoted.
    var p = pos + 1;
    var end = parts.length;
    for (; p < end; p++) {
      if (parts[p] === '>') {
        break;
      }
      buf += parts[p];
    }
    if (end <= p) {
      return void 0;
    }
    var attrs = [];
    while (buf !== '') {
      m = ATTR_RE.exec(buf);
      if (!m) {
        // No attribute found: skip garbage
        buf = buf.replace(/^[\s\S][^a-z\s]*/, '');
      } else if (m[4] && !m[5] || m[6] && !m[7]) {
        // Unterminated quote: slurp to the next unquoted '>'
        var quote = m[4] || m[6];
        var sawQuote = false;
        var abuf = [buf, parts[p++]];
        for (; p < end; p++) {
          if (sawQuote) {
            if (parts[p] === '>') {
              break;
            }
          } else if (0 <= parts[p].indexOf(quote)) {
            sawQuote = true;
          }
          abuf.push(parts[p]);
        }
        // Slurp failed: lose the garbage
        if (end <= p) {
          break;
        }
        // Otherwise retry attribute parsing
        buf = abuf.join('');
        continue;
      } else {
        // We have an attribute
        var aName = m[1].toLowerCase();
        var aValue = m[2] ? decodeValue(m[3]) : '';
        attrs.push(aName, aValue);
        buf = buf.substr(m[0].length);
      }
    }
    tag.attrs = attrs;
    tag.next = p + 1;
    return tag;
  }

  function decodeValue(v) {
    var q = v.charCodeAt(0);
    if (q === 0x22 || q === 0x27) {
      // " or '
      v = v.substr(1, v.length - 2);
    }
    return unescapeEntities(stripNULs(v));
  }

  /**
   * Returns a function that strips unsafe tags and attributes from html.
   * @param {function(string, Array.<string>): ?Array.<string>} tagPolicy
   *     A function that takes (tagName, attribs[]), where tagName is a key in
   *     html4.ELEMENTS and attribs is an array of alternating attribute names
   *     and values.  It should return a record (as follows), or null to delete
   *     the element.  It's okay for tagPolicy to modify the attribs array,
   *     but the same array is reused, so it should not be held between calls.
   *     Record keys:
   *        attribs: (required) Sanitized attributes array.
   *        tagName: Replacement tag name.
   * @return {function(string, Array)} A function that sanitizes a string of
   *     HTML and appends result strings to the second argument, an array.
   */
  function makeHtmlSanitizer(tagPolicy) {
    var stack;
    var ignoring;
    var emit = function emit(text, out) {
      if (!ignoring) {
        out.push(text);
      }
    };
    return makeSaxParser({
      'startDoc': function startDoc(_) {
        stack = [];
        ignoring = false;
      },
      'startTag': function startTag(tagNameOrig, attribs, out) {
        if (ignoring) {
          return;
        }
        if (!html4.ELEMENTS.hasOwnProperty(tagNameOrig)) {
          return;
        }
        var eflagsOrig = html4.ELEMENTS[tagNameOrig];
        if (eflagsOrig & html4.eflags['FOLDABLE']) {
          return;
        }

        var decision = tagPolicy(tagNameOrig, attribs);
        if (!decision) {
          ignoring = !(eflagsOrig & html4.eflags['EMPTY']);
          return;
        } else if ((typeof decision === 'undefined' ? 'undefined' : _typeof(decision)) !== 'object') {
          throw new Error('tagPolicy did not return object (old API?)');
        }
        if ('attribs' in decision) {
          attribs = decision['attribs'];
        } else {
          throw new Error('tagPolicy gave no attribs');
        }
        var eflagsRep;
        var tagNameRep;
        if ('tagName' in decision) {
          tagNameRep = decision['tagName'];
          eflagsRep = html4.ELEMENTS[tagNameRep];
        } else {
          tagNameRep = tagNameOrig;
          eflagsRep = eflagsOrig;
        }
        // TODO(mikesamuel): relying on tagPolicy not to insert unsafe
        // attribute names.

        // If this is an optional-end-tag element and either this element or its
        // previous like sibling was rewritten, then insert a close tag to
        // preserve structure.
        if (eflagsOrig & html4.eflags['OPTIONAL_ENDTAG']) {
          var onStack = stack[stack.length - 1];
          if (onStack && onStack.orig === tagNameOrig && (onStack.rep !== tagNameRep || tagNameOrig !== tagNameRep)) {
            out.push('<\/', onStack.rep, '>');
          }
        }

        if (!(eflagsOrig & html4.eflags['EMPTY'])) {
          stack.push({ orig: tagNameOrig, rep: tagNameRep });
        }

        out.push('<', tagNameRep);
        for (var i = 0, n = attribs.length; i < n; i += 2) {
          var attribName = attribs[i],
              value = attribs[i + 1];
          if (value !== null && value !== void 0) {
            out.push(' ', attribName, '="', escapeAttrib(value), '"');
          }
        }
        out.push('>');

        if (eflagsOrig & html4.eflags['EMPTY'] && !(eflagsRep & html4.eflags['EMPTY'])) {
          // replacement is non-empty, synthesize end tag
          out.push('<\/', tagNameRep, '>');
        }
      },
      'endTag': function endTag(tagName, out) {
        if (ignoring) {
          ignoring = false;
          return;
        }
        if (!html4.ELEMENTS.hasOwnProperty(tagName)) {
          return;
        }
        var eflags = html4.ELEMENTS[tagName];
        if (!(eflags & (html4.eflags['EMPTY'] | html4.eflags['FOLDABLE']))) {
          var index;
          if (eflags & html4.eflags['OPTIONAL_ENDTAG']) {
            for (index = stack.length; --index >= 0;) {
              var stackElOrigTag = stack[index].orig;
              if (stackElOrigTag === tagName) {
                break;
              }
              if (!(html4.ELEMENTS[stackElOrigTag] & html4.eflags['OPTIONAL_ENDTAG'])) {
                // Don't pop non optional end tags looking for a match.
                return;
              }
            }
          } else {
            for (index = stack.length; --index >= 0;) {
              if (stack[index].orig === tagName) {
                break;
              }
            }
          }
          if (index < 0) {
            return;
          } // Not opened.
          for (var i = stack.length; --i > index;) {
            var stackElRepTag = stack[i].rep;
            if (!(html4.ELEMENTS[stackElRepTag] & html4.eflags['OPTIONAL_ENDTAG'])) {
              out.push('<\/', stackElRepTag, '>');
            }
          }
          if (index < stack.length) {
            tagName = stack[index].rep;
          }
          stack.length = index;
          out.push('<\/', tagName, '>');
        }
      },
      'pcdata': emit,
      'rcdata': emit,
      'cdata': emit,
      'endDoc': function endDoc(out) {
        for (; stack.length; stack.length--) {
          out.push('<\/', stack[stack.length - 1].rep, '>');
        }
      }
    });
  }

  var ALLOWED_URI_SCHEMES = /^(?:https?|mailto)$/i;

  function safeUri(uri, effect, ltype, hints, naiveUriRewriter) {
    if (!naiveUriRewriter) {
      return null;
    }
    try {
      var parsed = URI.parse('' + uri);
      if (parsed) {
        if (!parsed.hasScheme() || ALLOWED_URI_SCHEMES.test(parsed.getScheme())) {
          var safe = naiveUriRewriter(parsed, effect, ltype, hints);
          return safe ? safe.toString() : null;
        }
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function log(logger, tagName, attribName, oldValue, newValue) {
    if (!attribName) {
      logger(tagName + " removed", {
        change: "removed",
        tagName: tagName
      });
    }
    if (oldValue !== newValue) {
      var changed = "changed";
      if (oldValue && !newValue) {
        changed = "removed";
      } else if (!oldValue && newValue) {
        changed = "added";
      }
      logger(tagName + "." + attribName + " " + changed, {
        change: changed,
        tagName: tagName,
        attribName: attribName,
        oldValue: oldValue,
        newValue: newValue
      });
    }
  }

  function lookupAttribute(map, tagName, attribName) {
    var attribKey;
    attribKey = tagName + '::' + attribName;
    if (map.hasOwnProperty(attribKey)) {
      return map[attribKey];
    }
    attribKey = '*::' + attribName;
    if (map.hasOwnProperty(attribKey)) {
      return map[attribKey];
    }
    return void 0;
  }
  function getAttributeType(tagName, attribName) {
    return lookupAttribute(html4.ATTRIBS, tagName, attribName);
  }
  function getLoaderType(tagName, attribName) {
    return lookupAttribute(html4.LOADERTYPES, tagName, attribName);
  }
  function getUriEffect(tagName, attribName) {
    return lookupAttribute(html4.URIEFFECTS, tagName, attribName);
  }

  /**
   * Sanitizes attributes on an HTML tag.
   * @param {string} tagName An HTML tag name in lowercase.
   * @param {Array.<?string>} attribs An array of alternating names and values.
   * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
   *     apply to URI attributes; it can return a new string value, or null to
   *     delete the attribute.  If unspecified, URI attributes are deleted.
   * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
   *     to attributes containing HTML names, element IDs, and space-separated
   *     lists of classes; it can return a new string value, or null to delete
   *     the attribute.  If unspecified, these attributes are kept unchanged.
   * @return {Array.<?string>} The sanitized attributes as a list of alternating
   *     names and values, where a null value means to omit the attribute.
   */
  function sanitizeAttribs(tagName, attribs, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
    // TODO(felix8a): it's obnoxious that domado duplicates much of this
    // TODO(felix8a): maybe consistently enforce constraints like target=
    for (var i = 0; i < attribs.length; i += 2) {
      var attribName = attribs[i];
      var value = attribs[i + 1];
      var oldValue = value;
      var atype = null,
          attribKey;
      if ((attribKey = tagName + '::' + attribName, html4.ATTRIBS.hasOwnProperty(attribKey)) || (attribKey = '*::' + attribName, html4.ATTRIBS.hasOwnProperty(attribKey))) {
        atype = html4.ATTRIBS[attribKey];
      }
      if (atype !== null) {
        switch (atype) {
          case html4.atype['NONE']:
            break;
          case html4.atype['SCRIPT']:
            value = null;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['STYLE']:
            if ('undefined' === typeof parseCssDeclarations) {
              value = null;
              if (opt_logger) {
                log(opt_logger, tagName, attribName, oldValue, value);
              }
              break;
            }
            var sanitizedDeclarations = [];
            parseCssDeclarations(value, {
              'declaration': function declaration(property, tokens) {
                var normProp = property.toLowerCase();
                sanitizeCssProperty(normProp, tokens, opt_naiveUriRewriter ? function (url) {
                  return safeUri(url, html4.ueffects.SAME_DOCUMENT, html4.ltypes.SANDBOXED, {
                    "TYPE": "CSS",
                    "CSS_PROP": normProp
                  }, opt_naiveUriRewriter);
                } : null);
                if (tokens.length) {
                  sanitizedDeclarations.push(normProp + ': ' + tokens.join(' '));
                }
              }
            });
            value = sanitizedDeclarations.length > 0 ? sanitizedDeclarations.join(' ; ') : null;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['ID']:
          case html4.atype['IDREF']:
          case html4.atype['IDREFS']:
          case html4.atype['GLOBAL_NAME']:
          case html4.atype['LOCAL_NAME']:
          case html4.atype['CLASSES']:
            value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['URI']:
            value = safeUri(value, getUriEffect(tagName, attribName), getLoaderType(tagName, attribName), {
              "TYPE": "MARKUP",
              "XML_ATTR": attribName,
              "XML_TAG": tagName
            }, opt_naiveUriRewriter);
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['URI_FRAGMENT']:
            if (value && '#' === value.charAt(0)) {
              value = value.substring(1); // remove the leading '#'
              value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
              if (value !== null && value !== void 0) {
                value = '#' + value; // restore the leading '#'
              }
            } else {
              value = null;
            }
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          default:
            value = null;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
        }
      } else {
        value = null;
        if (opt_logger) {
          log(opt_logger, tagName, attribName, oldValue, value);
        }
      }
      attribs[i + 1] = value;
    }
    return attribs;
  }

  /**
   * Creates a tag policy that omits all tags marked UNSAFE in html4-defs.js
   * and applies the default attribute sanitizer with the supplied policy for
   * URI attributes and NMTOKEN attributes.
   * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
   *     apply to URI attributes.  If not given, URI attributes are deleted.
   * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
   *     to attributes containing HTML names, element IDs, and space-separated
   *     lists of classes.  If not given, such attributes are left unchanged.
   * @return {function(string, Array.<?string>)} A tagPolicy suitable for
   *     passing to html.sanitize.
   */
  function makeTagPolicy(opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
    return function (tagName, attribs) {
      if (!(html4.ELEMENTS[tagName] & html4.eflags['UNSAFE'])) {
        return {
          'attribs': sanitizeAttribs(tagName, attribs, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger)
        };
      } else {
        if (opt_logger) {
          log(opt_logger, tagName, undefined, undefined, undefined);
        }
      }
    };
  }

  /**
   * Sanitizes HTML tags and attributes according to a given policy.
   * @param {string} inputHtml The HTML to sanitize.
   * @param {function(string, Array.<?string>)} tagPolicy A function that
   *     decides which tags to accept and sanitizes their attributes (see
   *     makeHtmlSanitizer above for details).
   * @return {string} The sanitized HTML.
   */
  function sanitizeWithPolicy(inputHtml, tagPolicy) {
    var outputArray = [];
    makeHtmlSanitizer(tagPolicy)(inputHtml, outputArray);
    return outputArray.join('');
  }

  /**
   * Strips unsafe tags and attributes from HTML.
   * @param {string} inputHtml The HTML to sanitize.
   * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
   *     apply to URI attributes.  If not given, URI attributes are deleted.
   * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
   *     to attributes containing HTML names, element IDs, and space-separated
   *     lists of classes.  If not given, such attributes are left unchanged.
   */
  function sanitize(inputHtml, opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
    var tagPolicy = makeTagPolicy(opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger);
    return sanitizeWithPolicy(inputHtml, tagPolicy);
  }

  // Export both quoted and unquoted names for Closure linkage.
  var html = {};
  html.escapeAttrib = html['escapeAttrib'] = escapeAttrib;
  html.makeHtmlSanitizer = html['makeHtmlSanitizer'] = makeHtmlSanitizer;
  html.makeSaxParser = html['makeSaxParser'] = makeSaxParser;
  html.makeTagPolicy = html['makeTagPolicy'] = makeTagPolicy;
  html.normalizeRCData = html['normalizeRCData'] = normalizeRCData;
  html.sanitize = html['sanitize'] = sanitize;
  html.sanitizeAttribs = html['sanitizeAttribs'] = sanitizeAttribs;
  html.sanitizeWithPolicy = html['sanitizeWithPolicy'] = sanitizeWithPolicy;
  html.unescapeEntities = html['unescapeEntities'] = unescapeEntities;
  return html;
}(html4);

var html_sanitize = html['sanitize'];

// Exports for Closure compiler.  Note this file is also cajoled
// for domado and run in an environment without 'window'
if (typeof window !== 'undefined') {}

var htmlSanitizer = exports.htmlSanitizer = html;

},{}],59:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cssEscape = cssEscape;
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */

/**
 * https://drafts.csswg.org/cssom/#serialize-an-identifier
 * @param {string} value
 * @return {string}
 */
function cssEscape(value) {
	if (arguments.length == 0) {
		throw new TypeError('`CSS.escape` requires an argument.');
	}
	var string = String(value);
	var length = string.length;
	var index = -1;
	var codeUnit;
	var result = '';
	var firstCodeUnit = string.charCodeAt(0);
	while (++index < length) {
		codeUnit = string.charCodeAt(index);
		// Note: there’s no need to special-case astral symbols, surrogate
		// pairs, or lone surrogates.

		// If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
		// (U+FFFD).
		if (codeUnit == 0x0000) {
			result += '\uFFFD';
			continue;
		}

		if (
		// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
		// U+007F, […]
		codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F ||
		// If the character is the first character and is in the range [0-9]
		// (U+0030 to U+0039), […]
		index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
		// If the character is the second character and is in the range [0-9]
		// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
		index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D) {
			// https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
			result += '\\' + codeUnit.toString(16) + ' ';
			continue;
		}

		if (
		// If the character is the first character and is a `-` (U+002D), and
		// there is no second character, […]
		index == 0 && length == 1 && codeUnit == 0x002D) {
			result += '\\' + string.charAt(index);
			continue;
		}

		// If the character is not handled by one of the above rules and is
		// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
		// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
		// U+005A), or [a-z] (U+0061 to U+007A), […]
		if (codeUnit >= 0x0080 || codeUnit == 0x002D || codeUnit == 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
			// the character itself
			result += string.charAt(index);
			continue;
		}

		// Otherwise, the escaped character.
		// https://drafts.csswg.org/cssom/#escape-a-character
		result += '\\' + string.charAt(index);
	}
	return result;
}

},{}]},{},[2])


})});//# sourceMappingURL=amp-bind-0.1.max.js.map
