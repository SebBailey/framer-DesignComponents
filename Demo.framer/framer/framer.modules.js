require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Constraints":[function(require,module,exports){
var addReferenceEvents, buildConstraintsProtos, moveFromRef, pushParent;

moveFromRef = function(layer, reference, moveRef, layerRef, refType) {
  var originalConstraints, originalLayerValue, originalRefValue;
  originalConstraints = layer.constraintValues;
  originalRefValue = reference[layerRef];
  originalLayerValue = layer[moveRef];
  layer[moveRef] = reference[layerRef] + layer.constraintValues[refType].value;
  return layer.constraintValues = originalConstraints;
};

pushParent = function(layer, direction) {
  var originalHeight, originalX, originalY;
  if (direction === "down") {
    originalY = layer.y;
    originalHeight = layer.height;
    layer.onChange("y", function(value) {
      this.parent.height += value - originalY;
      originalY = value;
      return originalHeight = this.height;
    });
    layer.onChange("height", function(value) {
      this.parent.height += value - originalHeight;
      originalY = this.y;
      return originalHeight = value;
    });
  }
  if (direction === "right") {
    originalX = layer.x;
    originalWidth - layer.width;
    layer.onChange("x", function(value) {
      var originalWidth;
      this.parent.width += value - originalX;
      originalX = value;
      return originalWidth = this.width;
    });
    return layer.onChange("width", function(value) {
      var originalWidth;
      this.parent.width += value - originalWidth;
      originalX = this.x;
      return originalWidth = value;
    });
  }
};

addReferenceEvents = function(layer) {
  var originalConstraints, originalHeightRef, originalWidthRef, originalX, originalXRef, originalY, originalYRef, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reference;
  originalConstraints = layer.constraintValues;
  if ((((ref1 = layer.constraintValues) != null ? (ref2 = ref1.topRef) != null ? ref2.layer : void 0 : void 0) != null) || (((ref3 = layer.constraintValues) != null ? (ref4 = ref3.bottomRef) != null ? ref4.layer : void 0 : void 0) != null)) {
    reference = ((ref5 = layer.constraintValues) != null ? (ref6 = ref5.topRef) != null ? ref6.layer : void 0 : void 0) || ((ref7 = layer.constraintValues) != null ? (ref8 = ref7.bottomRef) != null ? ref8.layer : void 0 : void 0);
    originalYRef = reference.y;
    originalHeightRef = reference.height;
    originalY = layer.y;
    reference.onChange("y", function(value) {
      layer.y = originalY + (value - originalYRef);
      originalYRef = value;
      return originalY = layer.y;
    });
    if (((ref9 = layer.constraintValues) != null ? (ref10 = ref9.topRef) != null ? ref10.align : void 0 : void 0) !== "y") {
      reference.onChange("height", function(value) {
        layer.y = originalY + (value - originalHeightRef);
        originalHeightRef = value;
        return originalY = layer.y;
      });
    }
    if ((((ref11 = layer.constraintValues) != null ? ref11.topRef : void 0) != null) && (((ref12 = layer.constraintValues) != null ? ref12.bottomRef : void 0) != null)) {
      reference.onChange("height", function(value) {
        var ref13, ref14, ref15;
        layer.height = value - ((ref13 = layer.constraintValues) != null ? ref13.topRef.value : void 0) - ((ref14 = layer.constraintValues) != null ? ref14.bottomRef.value : void 0);
        layer.y = reference.y + ((ref15 = layer.constraintValues) != null ? ref15.topRef.value : void 0);
        return originalHeightRef = value;
      });
    }
  }
  if ((((ref13 = layer.constraintValues) != null ? (ref14 = ref13.leftRef) != null ? ref14.layer : void 0 : void 0) != null) || (((ref15 = layer.constraintValues) != null ? (ref16 = ref15.rightRef) != null ? ref16.layer : void 0 : void 0) != null)) {
    reference = ((ref17 = layer.constraintValues) != null ? (ref18 = ref17.leftRef) != null ? ref18.layer : void 0 : void 0) || ((ref19 = layer.constraintValues) != null ? (ref20 = ref19.rightRef) != null ? ref20.layer : void 0 : void 0);
    originalXRef = reference.x;
    originalWidthRef = reference.width;
    originalX = layer.x;
    reference.onChange("x", function(value) {
      layer.x = originalX + (value - originalXRef);
      originalXRef = value;
      return originalX = layer.x;
    });
    if (((ref21 = layer.constraintValues) != null ? (ref22 = ref21.left) != null ? ref22.align : void 0 : void 0) !== "x") {
      reference.onChange("width", function(value) {
        layer.x = originalX + (value - originalWidthRef);
        originalWidthRef = value;
        return originalX = layer.x;
      });
    }
    if ((((ref23 = layer.constraintValues) != null ? ref23.leftRef : void 0) != null) && (((ref24 = layer.constraintValues) != null ? ref24.rightRef : void 0) != null)) {
      return reference.onChange("width", function(value) {
        var ref25, ref26, ref27;
        layer.width = value - ((ref25 = layer.constraintValues) != null ? ref25.leftRef.value : void 0) - ((ref26 = layer.constraintValues) != null ? ref26.rightRef.value : void 0);
        layer.x = reference.x + ((ref27 = layer.constraintValues) != null ? ref27.leftRef.value : void 0);
        return originalWidthRef = value;
      });
    }
  }
};

buildConstraintsProtos = function(constructorName) {
  constructorName = eval(constructorName);
  constructorName.prototype.setConstraints = function(options, origin) {
    var align, i, layer, len, ref, ref1, value, values;
    if (options == null) {
      options = {};
    }
    this.constraintValues = {
      top: typeof options.top === "object" ? null : options.top != null ? options.top : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.top : null,
      left: typeof options.left === "object" ? null : options.left != null ? options.left : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.left : null,
      bottom: typeof options.bottom === "object" ? null : options.pushDown ? null : options.bottom != null ? options.bottom : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.bottom : null,
      right: typeof options.right === "object" ? null : options.pushRight ? null : options.right != null ? options.right : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.right : null,
      width: this.width,
      height: this.height,
      widthFactor: options.scaleX != null ? options.scaleX : options.widthFactor != null ? options.widthFactor : null,
      heightFactor: options.scaleY != null ? options.scaleY : options.heightFactor != null ? options.heightFactor : null,
      centerAnchorX: options.centerX != null ? options.centerX : options.centerAnchorX != null ? options.centerAnchorX : null,
      centerAnchorY: options.centerY != null ? options.centerY : options.centerAnchorY != null ? options.centerAnchorY : null,
      aspectRatioLocked: options.aspectRatioLocked != null ? options.aspectRatioLocked : (origin != null ? origin.constraintValues : void 0) ? origin.constraintValues.aspectRatioLocked : false
    };
    values = this.constraintValues;
    if ((values.top != null) && (values.bottom != null)) {
      this.constraintValues.heightFactor = null;
      this.constraintValues.centerAnchorY = null;
    }
    if ((values.left != null) && (values.right != null)) {
      this.constraintValues.widthFactor = null;
      this.constraintValues.centerAnchorX = null;
    }
    if ((values.left != null) && (values.right != null) && (values.top != null) && (values.bottom != null)) {
      this.constraintValues.aspectRatioLocked = false;
    }
    ref1 = [["top", "y", "maxY", "topRef", "bottom"], ["left", "x", "maxX", "leftRef", "right"], ["bottom", "maxY", "y", "bottomRef", "top"], ["right", "maxX", "x", "rightRef", "left"]];
    for (i = 0, len = ref1.length; i < len; i++) {
      ref = ref1[i];
      if (typeof options[ref[0]] === "object" && options[ref[0]] !== null && (options[ref[3]] == null)) {
        if (options[ref[0]].layer != null) {
          if ((this.parent != null) && (this.parent.selectChild(options[ref[0]].layer) != null)) {
            layer = this.parent.selectChild(options[ref[0]].layer);
          } else {
            layer = Layer.select(options[ref[0]].layer);
          }
        } else {
          layer = this.parent;
        }
        align = null;
        if ((options[ref[0]].value == null) && layer === this.parent) {
          value = this[ref[1]];
        } else if ((options[ref[0]].align != null) && (options[ref[0]].value != null)) {
          value = options[ref[0]].value;
          align = options[ref[0]].align;
        } else if (options[ref[0]].align != null) {
          value = 0;
          align = options[ref[0]].align;
        } else if ((options[ref[0]].value == null) && (options[ref[0]].align == null)) {
          value = this[ref[1]] - layer[ref[2]];
          align = ref[4];
        } else {
          value = options[ref[0]].value;
          align = ref[4];
        }
        if (align === "left") {
          align = "x";
        } else if (align === "right") {
          align = "maxX";
        } else if (align === "top") {
          align = "y";
        } else if (align === "bottom") {
          align = "maxY";
        }
        this.constraintValues[ref[3]] = {
          layer: layer,
          value: value,
          align: align
        };
        this.constraintValues[ref[0]] = null;
        this.constraintValues[ref[4]] = null;
      }
    }
    if (options.pushDown != null) {
      this.constraintValues.bottom = null;
      pushParent(this, "down");
    }
    if (options.pushRight != null) {
      this.constraintValues.right = null;
      pushParent(this, "right");
    }
    if (!(options.pushDown || this.constraintValues.topRef || this.constraintValues.bottomRef)) {
      this.constraintValues.bottom = options.bottom != null ? options.bottom : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.bottom : null;
    }
    if (!(options.pushRight || this.constraintValues.leftRef || this.constraintValues.rightRef)) {
      this.constraintValues.right = options.right != null ? options.right : (origin != null ? origin.constraintValues : void 0) != null ? origin.constraintValues.right : null;
    }
    if (this.constraintValues.top === null && this.constraintValues.bottom === null && this.constraintValues.centerAnchorY === null && !this.constraintValues.topRef && !this.constraintValues.bottomRef) {
      this.constraintValues.top = this.y;
    }
    if (this.constraintValues.left === null && this.constraintValues.right === null && this.constraintValues.centerAnchorX === null && !this.constraintValues.leftRef && !this.constraintValues.rightRef) {
      this.constraintValues.left = this.x;
    }
    return this.applyConstraints();
  };
  return constructorName.prototype.applyConstraints = function() {
    var aspectRatio, parent, ref1, ref2, ref3, ref4, values;
    if (!this.constraintValues) {
      return;
    }
    values = this.constraintValues;
    if (!this.parent) {
      parent = Screen;
    } else {
      parent = this.parent;
    }
    aspectRatio = this.width / this.height;
    if ((values.top != null) && typeof values.top !== "object") {
      this.y = values.top;
    } else if (values.top === null && (((ref1 = values.topRef) != null ? ref1.layer : void 0) != null)) {
      this.y = values.topRef.layer[values.topRef.align] + values.topRef.value;
    }
    if ((values.left != null) && typeof values.left !== "object") {
      this.x = values.left;
    } else if (values.left === null && (((ref2 = values.leftRef) != null ? ref2.layer : void 0) != null)) {
      this.x = values.leftRef.layer[values.leftRef.align] + values.leftRef.value;
    }
    if ((values.left != null) && (values.right != null)) {
      this.width = parent.width - this.x - values.right;
      if (values.aspectRatioLocked) {
        this.height = this.width / aspectRatio;
      }
    }
    if ((values.top != null) && (values.bottom != null)) {
      this.height = parent.height - this.y - values.bottom;
      if (values.aspectRatioLocked) {
        this.width = this.height * aspectRatio;
      }
    }
    if (values.widthFactor != null) {
      this.width = parent.width * values.widthFactor;
    }
    if (values.heightFactor != null) {
      this.height = parent.height * values.heightFactor;
    }
    if (values.right != null) {
      this.maxX = parent.width - values.right;
    } else if (values.right === null && (((ref3 = values.rightRef) != null ? ref3.layer : void 0) != null)) {
      this.maxX = values.rightRef.layer[values.rightRef.align] - values.rightRef.value;
    }
    if (values.bottom != null) {
      this.maxY = parent.height - values.bottom;
    } else if (values.bottom === null && (((ref4 = values.bottomRef) != null ? ref4.layer : void 0) != null)) {
      this.maxY = values.bottomRef.layer[values.bottomRef.align] - values.bottomRef.value;
    }
    if ((values.left == null) && (values.right == null) && (values.centerAnchorX != null)) {
      this.midX = parent.width * values.centerAnchorX;
    }
    if ((values.top == null) && (values.bottom == null) && (values.centerAnchorY != null)) {
      this.midY = parent.height * values.centerAnchorY;
    }
    this.constraintValues = values;
    return addReferenceEvents(this);
  };
};

buildConstraintsProtos("Layer");

buildConstraintsProtos("TextLayer");

buildConstraintsProtos("ScrollComponent");

buildConstraintsProtos("PageComponent");

buildConstraintsProtos("SliderComponent");

buildConstraintsProtos("RangeSliderComponent");

Object.defineProperty(Layer.prototype, "constraints", {
  get: function() {
    return this._constraints;
  },
  set: function(value) {
    this._constraints = value;
    this.emit("change:constraints", value);
    return this.setConstraints(value);
  }
});


},{}],"DesignComponents":[function(require,module,exports){
var Constraints, classEventName, className, component, componentState, components, customComponents, customStates, eventName, extendRangeSlider, extendSlider, fn, fn1, i, j, k, kit, l, layer, len, len1, len2, len3, name, parent, ref, stateChangeProps, type,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Constraints = require("Constraints");


/*
------------------
CUSTOM CLASSES
------------------
 */

kit = Layer.select("*UIKit*");

if (kit != null) {
  kit.x = Screen.width * 1000;
  kit.name = ".UIKit";
}

ref = Layer.selectAll("@*");
for (i = 0, len = ref.length; i < len; i++) {
  layer = ref[i];
  parent = layer.parent;
  name = layer.name.replace("@", "");
  parent[name] = layer;
}

customComponents = Layer.selectAll("Custom_*");

Layer.prototype.addDesignChildren = function(origin) {
  var child, j, len1, ref1, results;
  if (origin == null) {
    origin = this;
  }
  ref1 = origin.selectAllChildren("*");
  results = [];
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    child = ref1[j];
    parent = child.parent;
    results.push(parent[child.name] = child);
  }
  return results;
};

stateChangeProps = ["width", "height", "opacity", "scaleX", "scaleY", "scaleZ", "scale", "skewX", "skewY", "skew", "rotationX", "rotationY", "rotationZ", "rotation", "blur", "brightness", "saturate", "hueRotate", "contrast", "invert", "grayscale", "sepia", "blending", "backgroundBlur", "backgroundBrightness", "backgroundSaturate", "backgroundHueRotate", "backgroundContrast", "backgroundInvert", "backgroundGrayscale", "backgroundSepia", "shadow1", "shadow2", "shadow3", "shadow4", "shadow5", "shadow6", "shadow7", "shadow8", "shadow9", "shadowX", "shadowY", "shadowBlur", "shadowSpread", "shadowColor", "shadowType", "shadows", "backgroundColor", "color", "borderRadius", "borderColor", "borderWidth", "borderStyle", "image", "gradient", "text"];

fn = function(component, name) {
  return exports[name] = (function(superClass) {
    extend(_Class, superClass);

    function _Class(options1) {
      var base;
      this.options = options1 != null ? options1 : {};
      _Class.__super__.constructor.call(this, this.options);
      this.props = Object.assign(component.props, {
        parent: this.options.parent
      });
      this.parent = (base = this.options).parent != null ? base.parent : base.parent = Screen.content;
      this.addChildren();
      this.setChildProps();
      this.stateComponents = Layer.selectAll("*State_" + name + "*");
      this.addStates();
      this.originalProps = this.props;
      this.setConstraints(this.options.constraints, component);
      this.props = this.options;
      this.setConstraints();
      if (this.options.state != null) {
        this.animateState(this.options.state, false);
      }
    }

    _Class.prototype.setTextProps = function(parent) {
      var descendant, k, len2, ref1, results;
      ref1 = this.descendants;
      results = [];
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        descendant = ref1[k];
        if ((this.options[descendant.name] != null) && (this[descendant.name] != null)) {
          results.push(this[descendant.name].props = this.options[descendant.name]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    _Class.prototype.setChildProps = function(parent) {
      var key, ref1, results, value, width;
      ref1 = this.options;
      results = [];
      for (key in ref1) {
        value = ref1[key];
        if ((this[key] != null) && (this[key] instanceof Layer || this[key] instanceof TextLayer)) {
          if (this[key].constructor.name === "TextLayer" && this[key].autoSize !== true) {
            this[key].props = value;
            width = this[key].width;
            this[key].autoSize = true;
            results.push(this[key].width = width);
          } else {
            results.push(this[key].props = value);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    _Class.prototype.addChildren = function(parent, origin) {
      var child, k, len2, ref1, results;
      if (origin == null) {
        origin = component;
      }
      if (parent == null) {
        parent = this;
      }
      ref1 = origin.children;
      results = [];
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        child = ref1[k];
        results.push((function(_this) {
          return function(child) {
            var ref2;
            layer = child.copySingle();
            layer.parent = parent;
            _this[layer.name] = layer;
            layer.setConstraints(((ref2 = _this.options[layer.name]) != null ? ref2.constraints : void 0) || {}, child);
            if ((child.children != null) && child.children.length > 0) {
              return _this.addChildren(layer, child);
            }
          };
        })(this)(child));
      }
      return results;
    };

    _Class.prototype.addStates = function() {
      var fn1, k, len2, ref1, state;
      this.customStates = {
        array: []
      };
      ref1 = this.stateComponents;
      fn1 = (function(_this) {
        return function(state) {
          var dec, l, len3, len4, m, prop, ref2, results, stateIndex, stateName, stateProps;
          stateIndex = state.name.indexOf("State");
          if (stateIndex > 0) {
            stateName = state.name.slice(0, stateIndex - 1);
          } else {
            stateName = state.name.split("State_" + name + "_")[1];
          }
          _this.customStates[stateName] = {};
          _this.customStates.array.push(stateName);
          stateProps = {};
          for (l = 0, len3 = stateChangeProps.length; l < len3; l++) {
            prop = stateChangeProps[l];
            stateProps[prop] = state[prop];
          }
          _this.states[stateName] = stateProps;
          ref2 = state.descendants;
          results = [];
          for (m = 0, len4 = ref2.length; m < len4; m++) {
            dec = ref2[m];
            results.push((function(dec) {
              var fn2, len5, n, thisStateProps;
              thisStateProps = {};
              fn2 = function(prop) {
                return thisStateProps[prop] = dec[prop];
              };
              for (n = 0, len5 = stateChangeProps.length; n < len5; n++) {
                prop = stateChangeProps[n];
                fn2(prop);
              }
              return _this[dec.name].states[stateName] = thisStateProps;
            })(dec));
          }
          return results;
        };
      })(this);
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        state = ref1[k];
        fn1(state);
      }
      return this.addStateEvents();
    };

    _Class.prototype.addStateEvents = function() {
      var eventName, events, fn1, k, l, len2, len3, ref1, results, state;
      events = [];
      ref1 = this.stateComponents;
      fn1 = (function(_this) {
        return function(state) {
          var animate, eventName, stateName;
          if (state.name.includes("State_" + name + "_")) {
            if (state.name.includes("_State_" + name + "_")) {
              stateName = state.name.split("_State_" + name + "_")[0];
              eventName = state.name.split("_State_" + name + "_")[1];
            } else {
              eventName = state.name.replace("State_" + name + "_", "");
              stateName = eventName;
            }
            if (eventName.includes("_Animate" || eventName.includes("_true" || eventName.includes("_True")))) {
              animate = true;
              eventName = eventName.split("_")[0];
            } else {
              animate = false;
            }
            _this.customStates[stateName].animate = animate;
            if (!events.includes(eventName)) {
              return events.push(eventName);
            }
          }
        };
      })(this);
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        state = ref1[k];
        fn1(state);
      }
      results = [];
      for (l = 0, len3 = events.length; l < len3; l++) {
        eventName = events[l];
        results.push((function(_this) {
          return function(eventName) {
            if ((Events[eventName] != null) && _this.customStates.array.includes(eventName)) {
              return _this.on(Events[eventName], function(event, layer) {
                var animate;
                animate = this.customStates[eventName].animate;
                this.stateSwitch(eventName, {
                  animate: animate
                });
                return this.animateChildren();
              });
            } else if (Events[eventName] != null) {
              return _this.on(Events[eventName], function() {
                var animate, currentIndex, nextIndex, nextState;
                currentIndex = this.customStates.array.indexOf(this.states.current.name);
                nextIndex = currentIndex + 1;
                if (nextIndex === this.customStates.array.length) {
                  nextIndex = 0;
                }
                animate = this.customStates[this.customStates.array[nextIndex]].animate;
                nextState = this.customStates.array[nextIndex];
                this.stateSwitch(nextState, {
                  animate: animate
                });
                return this.animateChildren();
              });
            }
          };
        })(this)(eventName));
      }
      return results;
    };

    _Class.prototype.animateChildren = function(stateName, animate, options) {
      var dec, k, len2, ref1, results;
      if (options == null) {
        options = {};
      }
      if (stateName == null) {
        stateName = this.states.current.name;
      }
      if (animate == null) {
        animate = this.customStates[stateName].animate;
      }
      if (!animate) {
        options.time = 0;
      }
      ref1 = this.descendants;
      results = [];
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        dec = ref1[k];
        results.push((function(_this) {
          return function(dec) {
            return dec.stateSwitch(stateName, {
              animate: animate,
              options: options
            });
          };
        })(this)(dec));
      }
      return results;
    };

    _Class.prototype.animateState = function(state, animate, options) {
      var ref1, ref2;
      if (options == null) {
        options = {};
      }
      if ((state == null) || (((ref1 = this.customStates) != null ? ref1[state] : void 0) == null)) {
        return;
      }
      if ((animate == null) && (((ref2 = this.customStates) != null ? ref2[state] : void 0) != null)) {
        animate = this.customStates[state].animate;
      } else if (animate != null) {
        animate = animate;
      } else {
        animate = false;
      }
      if (!animate) {
        options.time = 0;
      }
      this.stateSwitch(state, {
        animate: animate,
        options: options
      });
      return this.animateChildren(state, animate, options);
    };

    _Class.define("constraints", {
      get: function() {
        return this.options.constraints;
      },
      set: function(value) {
        this.options.constraints = value;
        this.emit("change:constraints", this.options.constraints);
        return this.setConstraints(value);
      }
    });

    _Class.define("state", {
      get: function() {
        return this.options.state;
      },
      set: function(value) {
        this.options.state = value;
        this.emit("change:state", this.options.state);
        return this.animateState(value);
      }
    });

    return _Class;

  })(Layer);
};
for (j = 0, len1 = customComponents.length; j < len1; j++) {
  component = customComponents[j];
  name = component.name.replace("Custom_", "");
  fn(component, name);
}

customStates = Layer.selectAll("State_*");

for (k = 0, len2 = customStates.length; k < len2; k++) {
  componentState = customStates[k];
  classEventName = componentState.name.replace("State_", "");
  if (classEventName.includes("_")) {
    className = classEventName.split("_")[0];
    eventName = classEventName.split("_")[1];
  } else {
    className = classEventName;
  }
}


/*
------------------
EXISTING CLASSES
------------------
 */

components = Layer.selectAll("_*");

extendSlider = function(origin) {
  return exports.SliderComponent = (function(superClass) {
    extend(SliderComponent, superClass);

    function SliderComponent(options1) {
      this.options = options1 != null ? options1 : {};
      SliderComponent.__super__.constructor.call(this, this.options);
      this.knob.props = {
        shadows: origin.knob.shadows,
        backgroundColor: origin.knob.backgroundColor,
        borderRadius: origin.knob.borderRadius,
        frame: origin.knob.frame
      };
      this.fill.props = {
        shadows: origin.fill.shadows,
        backgroundColor: origin.fill.backgroundColor,
        borderRadius: origin.fill.borderRadius,
        frame: origin.fill.frame
      };
      this.props = {
        shadows: origin.shadows,
        backgroundColor: origin.backgroundColor,
        borderRadius: origin.borderRadius,
        size: origin.size
      };
      this.value = Utils.modulate(origin.knob.midX, [0, origin.width], [this.min, this.max]);
    }

    return SliderComponent;

  })(SliderComponent);
};

extendRangeSlider = function(origin) {
  return exports.RangeSliderComponent = (function(superClass) {
    extend(RangeSliderComponent, superClass);

    function RangeSliderComponent(options1) {
      this.options = options1 != null ? options1 : {};
      RangeSliderComponent.__super__.constructor.call(this, this.options);
      this.minKnob.props = {
        shadows: origin.minKnob.shadows,
        backgroundColor: origin.minKnob.backgroundColor,
        borderRadius: origin.minKnob.borderRadius,
        frame: origin.minKnob.frame
      };
      this.maxKnob.props = {
        shadows: origin.maxKnob.shadows,
        backgroundColor: origin.maxKnob.backgroundColor,
        borderRadius: origin.maxKnob.borderRadius,
        frame: origin.maxKnob.frame
      };
      this.fill.props = {
        shadows: origin.fill.shadows,
        backgroundColor: origin.fill.backgroundColor,
        borderRadius: origin.fill.borderRadius,
        frame: origin.fill.frame
      };
      this.props = {
        shadows: origin.shadows,
        backgroundColor: origin.backgroundColor,
        borderRadius: origin.borderRadius,
        size: origin.size
      };
      this.minValue = Utils.modulate(origin.minKnob.midX, [0, origin.width], [this.min, this.max]);
      this.maxValue = Utils.modulate(origin.maxKnob.midX, [0, origin.width], [this.min, this.max]);
    }

    return RangeSliderComponent;

  })(RangeSliderComponent);
};

fn1 = function(component) {
  component.addDesignChildren();
  if (type === "SliderComponent") {
    return extendSlider(component);
  } else if (type === "RangeSliderComponent") {
    return extendRangeSlider(component);
  }
};
for (l = 0, len3 = components.length; l < len3; l++) {
  component = components[l];
  type = component.name.replace("_", "");
  fn1(component);
}


},{"Constraints":"Constraints"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NlYmFzdGlhbmJhaWxleS9Eb2N1bWVudHMvQ2xlYXJTY29yZS9Sb2d1ZSBPbmUvR2l0SHViL2ZyYW1lci1EZXNpZ25Db21wb25lbnRzL0RlbW8uZnJhbWVyL21vZHVsZXMvRGVzaWduQ29tcG9uZW50cy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zZWJhc3RpYW5iYWlsZXkvRG9jdW1lbnRzL0NsZWFyU2NvcmUvUm9ndWUgT25lL0dpdEh1Yi9mcmFtZXItRGVzaWduQ29tcG9uZW50cy9EZW1vLmZyYW1lci9tb2R1bGVzL0NvbnN0cmFpbnRzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiQ29uc3RyYWludHMgPSByZXF1aXJlIFwiQ29uc3RyYWludHNcIlxuXG4jIyNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuQ1VTVE9NIENMQVNTRVNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuIyMjXG5cbmtpdCA9IExheWVyLnNlbGVjdCBcIipVSUtpdCpcIlxuaWYga2l0PyB0aGVuIGtpdC54ID0gU2NyZWVuLndpZHRoICogMTAwMDsga2l0Lm5hbWUgPSBcIi5VSUtpdFwiXG5cbmZvciBsYXllciBpbiBMYXllci5zZWxlY3RBbGwgXCJAKlwiXG5cdHBhcmVudCA9IGxheWVyLnBhcmVudFxuXHRuYW1lID0gbGF5ZXIubmFtZS5yZXBsYWNlIFwiQFwiLCBcIlwiXG5cdHBhcmVudFtuYW1lXSA9IGxheWVyXG5cbmN1c3RvbUNvbXBvbmVudHMgPSBMYXllci5zZWxlY3RBbGwgXCJDdXN0b21fKlwiXG5cbkxheWVyOjphZGREZXNpZ25DaGlsZHJlbiA9IChvcmlnaW4pIC0+XG5cdGlmICFvcmlnaW4/IHRoZW4gb3JpZ2luID0gQFxuXHRmb3IgY2hpbGQgaW4gb3JpZ2luLnNlbGVjdEFsbENoaWxkcmVuIChcIipcIilcblx0XHRwYXJlbnQgPSBjaGlsZC5wYXJlbnRcblx0XHRwYXJlbnRbY2hpbGQubmFtZV0gPSBjaGlsZFxuXG5cbnN0YXRlQ2hhbmdlUHJvcHMgPSBbXG5cdFwid2lkdGhcIiwgXCJoZWlnaHRcIixcblx0XCJvcGFjaXR5XCIsXG5cdFwic2NhbGVYXCIsIFwic2NhbGVZXCIsIFwic2NhbGVaXCIsIFwic2NhbGVcIixcblx0XCJza2V3WFwiLCBcInNrZXdZXCIsIFwic2tld1wiLFxuXHRcInJvdGF0aW9uWFwiLCBcInJvdGF0aW9uWVwiLCBcInJvdGF0aW9uWlwiLCBcInJvdGF0aW9uXCIsXG5cdFwiYmx1clwiLFxuXHRcImJyaWdodG5lc3NcIiwgXCJzYXR1cmF0ZVwiLCBcImh1ZVJvdGF0ZVwiLCBcImNvbnRyYXN0XCIsIFwiaW52ZXJ0XCIsIFwiZ3JheXNjYWxlXCIsIFwic2VwaWFcIiwgXCJibGVuZGluZ1wiLFxuXHRcImJhY2tncm91bmRCbHVyXCIsIFwiYmFja2dyb3VuZEJyaWdodG5lc3NcIiwgXCJiYWNrZ3JvdW5kU2F0dXJhdGVcIiwgXCJiYWNrZ3JvdW5kSHVlUm90YXRlXCIsIFwiYmFja2dyb3VuZENvbnRyYXN0XCIsIFwiYmFja2dyb3VuZEludmVydFwiLCBcImJhY2tncm91bmRHcmF5c2NhbGVcIiwgXCJiYWNrZ3JvdW5kU2VwaWFcIixcblx0XCJzaGFkb3cxXCIsIFwic2hhZG93MlwiLCBcInNoYWRvdzNcIiwgXCJzaGFkb3c0XCIsIFwic2hhZG93NVwiLCBcInNoYWRvdzZcIiwgXCJzaGFkb3c3XCIsIFwic2hhZG93OFwiLCBcInNoYWRvdzlcIixcblx0XCJzaGFkb3dYXCIsIFwic2hhZG93WVwiLCBcInNoYWRvd0JsdXJcIiwgXCJzaGFkb3dTcHJlYWRcIiwgXCJzaGFkb3dDb2xvclwiLCBcInNoYWRvd1R5cGVcIixcblx0XCJzaGFkb3dzXCIsXG5cdFwiYmFja2dyb3VuZENvbG9yXCIsIFwiY29sb3JcIixcblx0XCJib3JkZXJSYWRpdXNcIiwgXCJib3JkZXJDb2xvclwiLCBcImJvcmRlcldpZHRoXCIsIFwiYm9yZGVyU3R5bGVcIixcblx0XCJpbWFnZVwiLCBcImdyYWRpZW50XCIsXG5cdFwidGV4dFwiXG5dXG5cblxuXG5mb3IgY29tcG9uZW50IGluIGN1c3RvbUNvbXBvbmVudHNcblxuXHRuYW1lID0gY29tcG9uZW50Lm5hbWUucmVwbGFjZSBcIkN1c3RvbV9cIiwgXCJcIlxuXG5cdGRvIChjb21wb25lbnQsIG5hbWUpIC0+XG5cblx0XHRjbGFzcyBleHBvcnRzW25hbWVdIGV4dGVuZHMgTGF5ZXJcblxuXHRcdFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRcdEBwcm9wcyA9IE9iamVjdC5hc3NpZ24gY29tcG9uZW50LnByb3BzLCB7cGFyZW50OiBAb3B0aW9ucy5wYXJlbnR9XG5cdFx0XHRcdEBwYXJlbnQgPSBAb3B0aW9ucy5wYXJlbnQgPz0gU2NyZWVuLmNvbnRlbnRcblxuXHRcdFx0XHRAYWRkQ2hpbGRyZW4oKVxuXHRcdFx0XHRAc2V0Q2hpbGRQcm9wcygpXG5cdFx0XHRcdFxuXHRcdFx0XHRAc3RhdGVDb21wb25lbnRzID0gTGF5ZXIuc2VsZWN0QWxsIFwiKlN0YXRlXyN7bmFtZX0qXCJcblx0XHRcdFx0QGFkZFN0YXRlcygpXG5cblx0XHRcdFx0QG9yaWdpbmFsUHJvcHMgPSBAcHJvcHNcblxuXHRcdFx0XHRAc2V0Q29uc3RyYWludHMgQG9wdGlvbnMuY29uc3RyYWludHMsIGNvbXBvbmVudFxuXG5cdFx0XHRcdEBwcm9wcyA9IEBvcHRpb25zXG5cblx0XHRcdFx0QHNldENvbnN0cmFpbnRzKClcblxuXHRcdFx0XHRpZiBAb3B0aW9ucy5zdGF0ZT9cblx0XHRcdFx0XHQjIHN0YXRlID0gTGF5ZXIuc2VsZWN0IFwiI3tAb3B0aW9ucy5zdGF0ZX1fU3RhdGVfI3tuYW1lfSpcIlxuXHRcdFx0XHRcdEBhbmltYXRlU3RhdGUgQG9wdGlvbnMuc3RhdGUsIGZhbHNlXG5cblx0XHRcdFx0IyBAc2V0VGV4dFByb3BzKClcblxuXHRcdFx0c2V0VGV4dFByb3BzOiAocGFyZW50KSAtPlxuXHRcdFx0XHRmb3IgZGVzY2VuZGFudCBpbiBAZGVzY2VuZGFudHNcblxuXHRcdFx0XHRcdGlmIEBvcHRpb25zW2Rlc2NlbmRhbnQubmFtZV0/ICYmIEBbZGVzY2VuZGFudC5uYW1lXT9cblxuXHRcdFx0XHRcdFx0QFtkZXNjZW5kYW50Lm5hbWVdLnByb3BzID0gQG9wdGlvbnNbZGVzY2VuZGFudC5uYW1lXVxuXG5cdFx0XHRzZXRDaGlsZFByb3BzOiAocGFyZW50KSAtPlxuXG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIEBvcHRpb25zXG5cdFx0XHRcdFx0aWYgQFtrZXldPyAmJiAoQFtrZXldIGluc3RhbmNlb2YgTGF5ZXIgfHwgQFtrZXldIGluc3RhbmNlb2YgVGV4dExheWVyKVxuXG5cdFx0XHRcdFx0XHRpZiBAW2tleV0uY29uc3RydWN0b3IubmFtZSA9PSBcIlRleHRMYXllclwiICYmIEBba2V5XS5hdXRvU2l6ZSAhPSB0cnVlXG5cdFx0XHRcdFx0XHRcdEBba2V5XS5wcm9wcyA9IHZhbHVlXG5cdFx0XHRcdFx0XHRcdHdpZHRoID0gQFtrZXldLndpZHRoXG5cdFx0XHRcdFx0XHRcdEBba2V5XS5hdXRvU2l6ZSA9IHRydWVcblx0XHRcdFx0XHRcdFx0QFtrZXldLndpZHRoID0gd2lkdGhcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0QFtrZXldLnByb3BzID0gdmFsdWVcblxuXG5cblx0XHRcdGFkZENoaWxkcmVuOiAocGFyZW50LCBvcmlnaW4pIC0+XG5cblx0XHRcdFx0aWYgIW9yaWdpbj8gdGhlbiBvcmlnaW4gPSBjb21wb25lbnRcblx0XHRcdFx0aWYgIXBhcmVudD8gdGhlbiBwYXJlbnQgPSBAXG5cblx0XHRcdFx0Zm9yIGNoaWxkIGluIG9yaWdpbi5jaGlsZHJlblxuXG5cdFx0XHRcdFx0ZG8gKGNoaWxkKSA9PlxuXG5cdFx0XHRcdFx0XHRsYXllciA9IGNoaWxkLmNvcHlTaW5nbGUoKVxuXHRcdFx0XHRcdFx0bGF5ZXIucGFyZW50ID0gcGFyZW50XG5cblx0XHRcdFx0XHRcdEBbbGF5ZXIubmFtZV0gPSBsYXllclxuXG5cdFx0XHRcdFx0XHRsYXllci5zZXRDb25zdHJhaW50cyBAb3B0aW9uc1tsYXllci5uYW1lXT8uY29uc3RyYWludHMgfHwge30sIGNoaWxkXG5cblx0XHRcdFx0XHRcdCMgaWYgQG9wdGlvbnNbbGF5ZXIubmFtZV0/LmNvbnN0cmFpbnRzP1xuXHRcdFx0XHRcdFx0IyBcdGxheWVyLnNldENvbnN0cmFpbnRzIEBvcHRpb25zW2xheWVyLm5hbWVdLmNvbnN0cmFpbnRzLCBjaGlsZFxuXHRcdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0XHQjIFx0bGF5ZXIuc2V0Q29uc3RyYWludHMge30sIGNoaWxkXG5cblx0XHRcdFx0XHRcdGlmIGNoaWxkLmNoaWxkcmVuPyAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHRcdEBhZGRDaGlsZHJlbiBsYXllciwgY2hpbGRcblxuXG5cdFx0XHRhZGRTdGF0ZXM6ICgpIC0+XG5cblx0XHRcdFx0QGN1c3RvbVN0YXRlcyA9XG5cdFx0XHRcdFx0YXJyYXk6IFtdXG5cblx0XHRcdFx0Zm9yIHN0YXRlIGluIEBzdGF0ZUNvbXBvbmVudHNcblxuXHRcdFx0XHRcdGRvIChzdGF0ZSkgPT5cblxuXHRcdFx0XHRcdFx0c3RhdGVJbmRleCA9IHN0YXRlLm5hbWUuaW5kZXhPZihcIlN0YXRlXCIpXG5cdFx0XHRcdFx0XHRpZiBzdGF0ZUluZGV4ID4gMFxuXHRcdFx0XHRcdFx0XHRzdGF0ZU5hbWUgPSBzdGF0ZS5uYW1lLnNsaWNlIDAsIHN0YXRlSW5kZXgtMVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRzdGF0ZU5hbWUgPSBzdGF0ZS5uYW1lLnNwbGl0KFwiU3RhdGVfI3tuYW1lfV9cIilbMV1cblxuXHRcdFx0XHRcdFx0QGN1c3RvbVN0YXRlc1tzdGF0ZU5hbWVdID0ge31cblx0XHRcdFx0XHRcdEBjdXN0b21TdGF0ZXMuYXJyYXkucHVzaCBzdGF0ZU5hbWVcblxuXHRcdFx0XHRcdFx0c3RhdGVQcm9wcyA9IHt9XG5cblx0XHRcdFx0XHRcdGZvciBwcm9wIGluIHN0YXRlQ2hhbmdlUHJvcHNcblx0XHRcdFx0XHRcdFx0c3RhdGVQcm9wc1twcm9wXSA9IHN0YXRlW3Byb3BdXG5cblx0XHRcdFx0XHRcdEBzdGF0ZXNbc3RhdGVOYW1lXSA9IHN0YXRlUHJvcHNcblxuXHRcdFx0XHRcdFx0Zm9yIGRlYyBpbiBzdGF0ZS5kZXNjZW5kYW50c1xuXHRcdFx0XHRcdFx0XHRkbyAoZGVjKSA9PlxuXHRcdFx0XHRcdFx0XHRcdHRoaXNTdGF0ZVByb3BzID0ge31cblx0XHRcdFx0XHRcdFx0XHRmb3IgcHJvcCBpbiBzdGF0ZUNoYW5nZVByb3BzXG5cdFx0XHRcdFx0XHRcdFx0XHRkbyAocHJvcCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpc1N0YXRlUHJvcHNbcHJvcF0gPSBkZWNbcHJvcF1cblx0XHRcdFx0XHRcdFx0XHRAW2RlYy5uYW1lXS5zdGF0ZXNbc3RhdGVOYW1lXSA9IHRoaXNTdGF0ZVByb3BzXG5cblx0XHRcdFx0QGFkZFN0YXRlRXZlbnRzKClcblxuXHRcdFx0YWRkU3RhdGVFdmVudHM6ICgpIC0+XG5cblx0XHRcdFx0ZXZlbnRzID0gW11cblxuXHRcdFx0XHRmb3Igc3RhdGUgaW4gQHN0YXRlQ29tcG9uZW50c1xuXG5cdFx0XHRcdFx0ZG8gKHN0YXRlKSA9PlxuXG5cdFx0XHRcdFx0XHRpZiBzdGF0ZS5uYW1lLmluY2x1ZGVzIFwiU3RhdGVfI3tuYW1lfV9cIlxuXG5cdFx0XHRcdFx0XHRcdGlmIHN0YXRlLm5hbWUuaW5jbHVkZXMgXCJfU3RhdGVfI3tuYW1lfV9cIlxuXHRcdFx0XHRcdFx0XHRcdHN0YXRlTmFtZSA9IHN0YXRlLm5hbWUuc3BsaXQoXCJfU3RhdGVfI3tuYW1lfV9cIilbMF1cblx0XHRcdFx0XHRcdFx0XHRldmVudE5hbWUgPSBzdGF0ZS5uYW1lLnNwbGl0KFwiX1N0YXRlXyN7bmFtZX1fXCIpWzFdXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRldmVudE5hbWUgPSBzdGF0ZS5uYW1lLnJlcGxhY2UgXCJTdGF0ZV8je25hbWV9X1wiLCBcIlwiXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGVOYW1lID0gZXZlbnROYW1lXG5cblx0XHRcdFx0XHRcdFx0aWYgZXZlbnROYW1lLmluY2x1ZGVzIFwiX0FuaW1hdGVcIiB8fCBldmVudE5hbWUuaW5jbHVkZXMgXCJfdHJ1ZVwiIHx8IGV2ZW50TmFtZS5pbmNsdWRlcyBcIl9UcnVlXCJcblx0XHRcdFx0XHRcdFx0XHRhbmltYXRlID0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdGV2ZW50TmFtZSA9IGV2ZW50TmFtZS5zcGxpdChcIl9cIilbMF1cblx0XHRcdFx0XHRcdFx0ZWxzZSBhbmltYXRlID0gZmFsc2VcblxuXHRcdFx0XHRcdFx0XHRAY3VzdG9tU3RhdGVzW3N0YXRlTmFtZV0uYW5pbWF0ZSA9IGFuaW1hdGVcblxuXHRcdFx0XHRcdFx0XHR1bmxlc3MgZXZlbnRzLmluY2x1ZGVzIGV2ZW50TmFtZSB0aGVuIGV2ZW50cy5wdXNoIGV2ZW50TmFtZVxuXG5cdFx0XHRcdGZvciBldmVudE5hbWUgaW4gZXZlbnRzXG5cblx0XHRcdFx0XHRkbyAoZXZlbnROYW1lKSA9PlxuXG5cdFx0XHRcdFx0XHRpZiBFdmVudHNbZXZlbnROYW1lXT8gJiYgQGN1c3RvbVN0YXRlcy5hcnJheS5pbmNsdWRlcyBldmVudE5hbWVcblxuXHRcdFx0XHRcdFx0XHRAb24gRXZlbnRzW2V2ZW50TmFtZV0sIChldmVudCwgbGF5ZXIpIC0+XG5cblx0XHRcdFx0XHRcdFx0XHRhbmltYXRlID0gQGN1c3RvbVN0YXRlc1tldmVudE5hbWVdLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0XHRAc3RhdGVTd2l0Y2goZXZlbnROYW1lLCB7YW5pbWF0ZTogYW5pbWF0ZX0pXG5cdFx0XHRcdFx0XHRcdFx0QGFuaW1hdGVDaGlsZHJlbigpXG5cblx0XHRcdFx0XHRcdGVsc2UgaWYgRXZlbnRzW2V2ZW50TmFtZV0/XG5cblx0XHRcdFx0XHRcdFx0QG9uIEV2ZW50c1tldmVudE5hbWVdLCAtPlxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRJbmRleCA9IEBjdXN0b21TdGF0ZXMuYXJyYXkuaW5kZXhPZihAc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcdFx0XHRcdFx0XHRuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKyAxXG5cdFx0XHRcdFx0XHRcdFx0aWYgbmV4dEluZGV4ID09IEBjdXN0b21TdGF0ZXMuYXJyYXkubGVuZ3RoIHRoZW4gbmV4dEluZGV4ID0gMFxuXHRcdFx0XHRcdFx0XHRcdGFuaW1hdGUgPSBAY3VzdG9tU3RhdGVzW0BjdXN0b21TdGF0ZXMuYXJyYXlbbmV4dEluZGV4XV0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRcdG5leHRTdGF0ZSA9IEBjdXN0b21TdGF0ZXMuYXJyYXlbbmV4dEluZGV4XVxuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUsIHthbmltYXRlOiBhbmltYXRlfSlcblx0XHRcdFx0XHRcdFx0XHRAYW5pbWF0ZUNoaWxkcmVuKClcblxuXHRcdFx0YW5pbWF0ZUNoaWxkcmVuOiAoc3RhdGVOYW1lLCBhbmltYXRlLCBvcHRpb25zPXt9KSAtPlxuXHRcdFx0XHR1bmxlc3Mgc3RhdGVOYW1lPyB0aGVuIHN0YXRlTmFtZSA9IEBzdGF0ZXMuY3VycmVudC5uYW1lXG5cdFx0XHRcdHVubGVzcyBhbmltYXRlPyB0aGVuIGFuaW1hdGUgPSBAY3VzdG9tU3RhdGVzW3N0YXRlTmFtZV0uYW5pbWF0ZVxuXHRcdFx0XHRpZiAhYW5pbWF0ZSB0aGVuIG9wdGlvbnMudGltZSA9IDBcblx0XHRcdFx0Zm9yIGRlYyBpbiBAZGVzY2VuZGFudHNcblx0XHRcdFx0XHRkbyAoZGVjKSA9PlxuXHRcdFx0XHRcdFx0ZGVjLnN0YXRlU3dpdGNoKHN0YXRlTmFtZSwge2FuaW1hdGU6IGFuaW1hdGUsIG9wdGlvbnM6IG9wdGlvbnN9KVxuXG5cdFx0XHRhbmltYXRlU3RhdGU6IChzdGF0ZSwgYW5pbWF0ZSwgb3B0aW9ucz17fSkgLT5cblxuXHRcdFx0XHRpZiAhc3RhdGU/IHx8ICFAY3VzdG9tU3RhdGVzP1tzdGF0ZV0/IHRoZW4gcmV0dXJuXG5cdFx0XHRcdGlmICFhbmltYXRlPyAmJiBAY3VzdG9tU3RhdGVzP1tzdGF0ZV0/IHRoZW4gYW5pbWF0ZSA9IEBjdXN0b21TdGF0ZXNbc3RhdGVdLmFuaW1hdGUgZWxzZSBpZiBhbmltYXRlPyB0aGVuIGFuaW1hdGUgPSBhbmltYXRlIGVsc2UgYW5pbWF0ZSA9IGZhbHNlXG5cdFx0XHRcdGlmICFhbmltYXRlIHRoZW4gb3B0aW9ucy50aW1lID0gMFxuXG5cdFx0XHRcdEBzdGF0ZVN3aXRjaChzdGF0ZSwge2FuaW1hdGU6IGFuaW1hdGUsIG9wdGlvbnM6IG9wdGlvbnN9KVxuXHRcdFx0XHRAYW5pbWF0ZUNoaWxkcmVuKHN0YXRlLCBhbmltYXRlLCBvcHRpb25zKVxuXG5cdFx0XHRAZGVmaW5lIFwiY29uc3RyYWludHNcIixcblx0XHRcdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25zdHJhaW50c1xuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0XHRAb3B0aW9ucy5jb25zdHJhaW50cyA9IHZhbHVlXG5cdFx0XHRcdFx0QGVtaXQoXCJjaGFuZ2U6Y29uc3RyYWludHNcIiwgQG9wdGlvbnMuY29uc3RyYWludHMpXG5cdFx0XHRcdFx0QHNldENvbnN0cmFpbnRzIHZhbHVlXG5cblx0XHRcdEBkZWZpbmUgXCJzdGF0ZVwiLFxuXHRcdFx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXRlXG5cdFx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRcdEBvcHRpb25zLnN0YXRlID0gdmFsdWVcblx0XHRcdFx0XHRAZW1pdChcImNoYW5nZTpzdGF0ZVwiLCBAb3B0aW9ucy5zdGF0ZSlcblx0XHRcdFx0XHRAYW5pbWF0ZVN0YXRlIHZhbHVlXG5cblxuXG5jdXN0b21TdGF0ZXMgPSBMYXllci5zZWxlY3RBbGwgXCJTdGF0ZV8qXCJcblxuZm9yIGNvbXBvbmVudFN0YXRlIGluIGN1c3RvbVN0YXRlc1xuXG5cdGNsYXNzRXZlbnROYW1lID0gY29tcG9uZW50U3RhdGUubmFtZS5yZXBsYWNlIFwiU3RhdGVfXCIsIFwiXCJcblx0aWYgY2xhc3NFdmVudE5hbWUuaW5jbHVkZXMgXCJfXCJcblx0XHRjbGFzc05hbWUgPSBjbGFzc0V2ZW50TmFtZS5zcGxpdChcIl9cIilbMF1cblx0XHRldmVudE5hbWUgPSBjbGFzc0V2ZW50TmFtZS5zcGxpdChcIl9cIilbMV1cblx0ZWxzZVxuXHRcdGNsYXNzTmFtZSA9IGNsYXNzRXZlbnROYW1lXG5cblxuIyMjXG4tLS0tLS0tLS0tLS0tLS0tLS1cbkVYSVNUSU5HIENMQVNTRVNcbi0tLS0tLS0tLS0tLS0tLS0tLVxuIyMjXG5cblxuY29tcG9uZW50cyA9IExheWVyLnNlbGVjdEFsbCBcIl8qXCJcblxuZXh0ZW5kU2xpZGVyID0gKG9yaWdpbikgLT5cblx0Y2xhc3MgZXhwb3J0cy5TbGlkZXJDb21wb25lbnQgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnRcblxuXHRcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRAa25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5rbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ua25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ua25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5rbm9iLmZyYW1lXG5cblx0XHRcdEBmaWxsLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLmZpbGwuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5maWxsLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5maWxsLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLmZpbGwuZnJhbWVcblxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRzaXplOiBvcmlnaW4uc2l6ZVxuXG5cdFx0XHRAdmFsdWUgPSBVdGlscy5tb2R1bGF0ZSBvcmlnaW4ua25vYi5taWRYLCBbMCwgb3JpZ2luLndpZHRoXSwgW0BtaW4sIEBtYXhdXG5cblxuZXh0ZW5kUmFuZ2VTbGlkZXIgPSAob3JpZ2luKSAtPlxuXHRjbGFzcyBleHBvcnRzLlJhbmdlU2xpZGVyQ29tcG9uZW50IGV4dGVuZHMgUmFuZ2VTbGlkZXJDb21wb25lbnRcblxuXHRcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XHRAbWluS25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5taW5Lbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ubWluS25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ubWluS25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5taW5Lbm9iLmZyYW1lXG5cdFx0XHRAbWF4S25vYi5wcm9wcyA9XG5cdFx0XHRcdHNoYWRvd3M6IG9yaWdpbi5tYXhLbm9iLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4ubWF4S25vYi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBvcmlnaW4ubWF4S25vYi5ib3JkZXJSYWRpdXNcblx0XHRcdFx0ZnJhbWU6IG9yaWdpbi5tYXhLbm9iLmZyYW1lXG5cblx0XHRcdEBmaWxsLnByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLmZpbGwuc2hhZG93c1xuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG9yaWdpbi5maWxsLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IG9yaWdpbi5maWxsLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRmcmFtZTogb3JpZ2luLmZpbGwuZnJhbWVcblxuXHRcdFx0QHByb3BzID1cblx0XHRcdFx0c2hhZG93czogb3JpZ2luLnNoYWRvd3Ncblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBvcmlnaW4uYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdGJvcmRlclJhZGl1czogb3JpZ2luLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRzaXplOiBvcmlnaW4uc2l6ZVxuXHRcdFx0XHRcblx0XHRcdEBtaW5WYWx1ZSA9IFV0aWxzLm1vZHVsYXRlIG9yaWdpbi5taW5Lbm9iLm1pZFgsIFswLCBvcmlnaW4ud2lkdGhdLCBbQG1pbiwgQG1heF1cblx0XHRcdEBtYXhWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlIG9yaWdpbi5tYXhLbm9iLm1pZFgsIFswLCBvcmlnaW4ud2lkdGhdLCBbQG1pbiwgQG1heF1cblxuXG5cbmZvciBjb21wb25lbnQgaW4gY29tcG9uZW50c1xuXG5cdHR5cGUgPSBjb21wb25lbnQubmFtZS5yZXBsYWNlIFwiX1wiLCBcIlwiXG5cblx0ZG8gKGNvbXBvbmVudCkgLT5cblxuXHRcdGNvbXBvbmVudC5hZGREZXNpZ25DaGlsZHJlbigpXG5cblx0XHRpZiB0eXBlID09IFwiU2xpZGVyQ29tcG9uZW50XCJcblx0XHRcdGV4dGVuZFNsaWRlciBjb21wb25lbnRcblx0XHRlbHNlIGlmIHR5cGUgPT0gXCJSYW5nZVNsaWRlckNvbXBvbmVudFwiXG5cdFx0XHRleHRlbmRSYW5nZVNsaWRlciBjb21wb25lbnRcblxuXG5cblxuXG5cblxuXG5cbiIsIlxubW92ZUZyb21SZWYgPSAobGF5ZXIsIHJlZmVyZW5jZSwgbW92ZVJlZiwgbGF5ZXJSZWYsIHJlZlR5cGUpIC0+XG5cblx0b3JpZ2luYWxDb25zdHJhaW50cyA9IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNcblxuXHRvcmlnaW5hbFJlZlZhbHVlID0gcmVmZXJlbmNlW2xheWVyUmVmXVxuXHRvcmlnaW5hbExheWVyVmFsdWUgPSBsYXllclttb3ZlUmVmXVxuXG5cdGxheWVyW21vdmVSZWZdID0gcmVmZXJlbmNlW2xheWVyUmVmXSArIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNbcmVmVHlwZV0udmFsdWVcblxuXHQjIHJlZmVyZW5jZS5vbkNoYW5nZSBsYXllclJlZiwgKHZhbHVlKSAtPlxuXHQjIFx0bGF5ZXJbbW92ZVJlZl0gPSBvcmlnaW5hbExheWVyVmFsdWUgKyAodmFsdWUgLSBvcmlnaW5hbFJlZlZhbHVlKVxuXG5cdGxheWVyLmNvbnN0cmFpbnRWYWx1ZXMgPSBvcmlnaW5hbENvbnN0cmFpbnRzXG5cblxucHVzaFBhcmVudCA9IChsYXllciwgZGlyZWN0aW9uKSAtPlxuXG5cdGlmIGRpcmVjdGlvbiA9PSBcImRvd25cIlxuXHRcdG9yaWdpbmFsWSA9IGxheWVyLnlcblx0XHRvcmlnaW5hbEhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cdFx0bGF5ZXIub25DaGFuZ2UgXCJ5XCIsICh2YWx1ZSkgLT5cblx0XHRcdEBwYXJlbnQuaGVpZ2h0ICs9IHZhbHVlIC0gb3JpZ2luYWxZXG5cdFx0XHRvcmlnaW5hbFkgPSB2YWx1ZVxuXHRcdFx0b3JpZ2luYWxIZWlnaHQgPSBAaGVpZ2h0XG5cdFx0bGF5ZXIub25DaGFuZ2UgXCJoZWlnaHRcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC5oZWlnaHQgKz0gdmFsdWUgLSBvcmlnaW5hbEhlaWdodFxuXHRcdFx0b3JpZ2luYWxZID0gQHlcblx0XHRcdG9yaWdpbmFsSGVpZ2h0ID0gdmFsdWVcblx0XG5cdGlmIGRpcmVjdGlvbiA9PSBcInJpZ2h0XCJcblx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cdFx0b3JpZ2luYWxXaWR0aCAtIGxheWVyLndpZHRoXG5cblx0XHRsYXllci5vbkNoYW5nZSBcInhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0QHBhcmVudC53aWR0aCArPSB2YWx1ZSAtIG9yaWdpbmFsWFxuXHRcdFx0b3JpZ2luYWxYID0gdmFsdWVcblx0XHRcdG9yaWdpbmFsV2lkdGggPSBAd2lkdGhcblx0XHRsYXllci5vbkNoYW5nZSBcIndpZHRoXCIsICh2YWx1ZSkgLT5cblx0XHRcdEBwYXJlbnQud2lkdGggKz0gdmFsdWUgLSBvcmlnaW5hbFdpZHRoXG5cdFx0XHRvcmlnaW5hbFggPSBAeFxuXHRcdFx0b3JpZ2luYWxXaWR0aCA9IHZhbHVlXG5cblxuYWRkUmVmZXJlbmNlRXZlbnRzID0gKGxheWVyKSAtPlxuXG5cdG9yaWdpbmFsQ29uc3RyYWludHMgPSBsYXllci5jb25zdHJhaW50VmFsdWVzXG5cblx0aWYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmPy5sYXllcj8gfHwgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmPy5sYXllcj9cblxuXHRcdHJlZmVyZW5jZSA9IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZj8ubGF5ZXIgfHwgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmPy5sYXllclxuXG5cdFx0b3JpZ2luYWxZUmVmID0gcmVmZXJlbmNlLnlcblx0XHRvcmlnaW5hbEhlaWdodFJlZiA9IHJlZmVyZW5jZS5oZWlnaHRcblx0XHRvcmlnaW5hbFkgPSBsYXllci55XG5cblx0XHRyZWZlcmVuY2Uub25DaGFuZ2UgXCJ5XCIsICh2YWx1ZSkgLT5cblx0XHRcdGxheWVyLnkgPSBvcmlnaW5hbFkgKyAodmFsdWUgLSBvcmlnaW5hbFlSZWYpXG5cdFx0XHRvcmlnaW5hbFlSZWYgPSB2YWx1ZVxuXHRcdFx0b3JpZ2luYWxZID0gbGF5ZXIueVxuXG5cdFx0dW5sZXNzIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZj8uYWxpZ24gPT0gXCJ5XCJcblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcImhlaWdodFwiLCAodmFsdWUpIC0+XG5cdFx0XHRcdGxheWVyLnkgPSBvcmlnaW5hbFkgKyAodmFsdWUgLSBvcmlnaW5hbEhlaWdodFJlZilcblx0XHRcdFx0b3JpZ2luYWxIZWlnaHRSZWYgPSB2YWx1ZVxuXHRcdFx0XHRvcmlnaW5hbFkgPSBsYXllci55XG5cblx0XHRpZiBsYXllci5jb25zdHJhaW50VmFsdWVzPy50b3BSZWY/ICYmIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmJvdHRvbVJlZj9cblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcImhlaWdodFwiLCAodmFsdWUpIC0+XG5cdFx0XHRcdGxheWVyLmhlaWdodCA9IHZhbHVlIC0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8udG9wUmVmLnZhbHVlIC0gbGF5ZXIuY29uc3RyYWludFZhbHVlcz8uYm90dG9tUmVmLnZhbHVlXG5cdFx0XHRcdGxheWVyLnkgPSByZWZlcmVuY2UueSArIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnRvcFJlZi52YWx1ZVxuXHRcdFx0XHRvcmlnaW5hbEhlaWdodFJlZiA9IHZhbHVlXG5cblx0aWYgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdFJlZj8ubGF5ZXI/IHx8IGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LnJpZ2h0UmVmPy5sYXllcj9cblx0XHRyZWZlcmVuY2UgPSBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmPy5sYXllciB8fCBsYXllci5jb25zdHJhaW50VmFsdWVzPy5yaWdodFJlZj8ubGF5ZXJcblxuXHRcdG9yaWdpbmFsWFJlZiA9IHJlZmVyZW5jZS54XG5cdFx0b3JpZ2luYWxXaWR0aFJlZiA9IHJlZmVyZW5jZS53aWR0aFxuXHRcdG9yaWdpbmFsWCA9IGxheWVyLnhcblxuXHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcInhcIiwgKHZhbHVlKSAtPlxuXHRcdFx0bGF5ZXIueCA9IG9yaWdpbmFsWCArICh2YWx1ZSAtIG9yaWdpbmFsWFJlZilcblx0XHRcdG9yaWdpbmFsWFJlZiA9IHZhbHVlXG5cdFx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cblx0XHR1bmxlc3MgbGF5ZXIuY29uc3RyYWludFZhbHVlcz8ubGVmdD8uYWxpZ24gPT0gXCJ4XCJcblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcIndpZHRoXCIsICh2YWx1ZSkgLT5cblx0XHRcdFx0bGF5ZXIueCA9IG9yaWdpbmFsWCArICh2YWx1ZSAtIG9yaWdpbmFsV2lkdGhSZWYpXG5cdFx0XHRcdG9yaWdpbmFsV2lkdGhSZWYgPSB2YWx1ZVxuXHRcdFx0XHRvcmlnaW5hbFggPSBsYXllci54XG5cblx0XHRpZiBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmPyAmJiBsYXllci5jb25zdHJhaW50VmFsdWVzPy5yaWdodFJlZj9cblx0XHRcdHJlZmVyZW5jZS5vbkNoYW5nZSBcIndpZHRoXCIsICh2YWx1ZSkgLT5cblx0XHRcdFx0bGF5ZXIud2lkdGggPSB2YWx1ZSAtIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXM/LmxlZnRSZWYudmFsdWUgLSBsYXllci5jb25zdHJhaW50VmFsdWVzPy5yaWdodFJlZi52YWx1ZVxuXHRcdFx0XHRsYXllci54ID0gcmVmZXJlbmNlLnggKyBsYXllci5jb25zdHJhaW50VmFsdWVzPy5sZWZ0UmVmLnZhbHVlXG5cdFx0XHRcdG9yaWdpbmFsV2lkdGhSZWYgPSB2YWx1ZVxuXG5cbmJ1aWxkQ29uc3RyYWludHNQcm90b3MgPSAoY29uc3RydWN0b3JOYW1lKSAtPlxuXG5cdGNvbnN0cnVjdG9yTmFtZSA9IGV2YWwgY29uc3RydWN0b3JOYW1lXG5cblx0Y29uc3RydWN0b3JOYW1lOjpzZXRDb25zdHJhaW50cyA9IChvcHRpb25zPXt9LCBvcmlnaW4pIC0+XG5cblx0XHRAY29uc3RyYWludFZhbHVlcyA9XG5cdFx0XHR0b3A6IGlmIHR5cGVvZiBvcHRpb25zLnRvcCA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMudG9wPyB0aGVuIG9wdGlvbnMudG9wIGVsc2UgaWYgb3JpZ2luPy5jb25zdHJhaW50VmFsdWVzPyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLnRvcCBlbHNlIG51bGxcblx0XHRcdGxlZnQ6IGlmIHR5cGVvZiBvcHRpb25zLmxlZnQgPT0gXCJvYmplY3RcIiB0aGVuIG51bGwgZWxzZSBpZiBvcHRpb25zLmxlZnQ/IHRoZW4gb3B0aW9ucy5sZWZ0IGVsc2UgaWYgb3JpZ2luPy5jb25zdHJhaW50VmFsdWVzPyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLmxlZnQgZWxzZSBudWxsXG5cdFx0XHRib3R0b206IGlmIHR5cGVvZiBvcHRpb25zLmJvdHRvbSA9PSBcIm9iamVjdFwiIHRoZW4gbnVsbCBlbHNlIGlmIG9wdGlvbnMucHVzaERvd24gdGhlbiBudWxsIGVsc2UgaWYgb3B0aW9ucy5ib3R0b20/IHRoZW4gb3B0aW9ucy5ib3R0b20gZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMuYm90dG9tIGVsc2UgbnVsbFxuXHRcdFx0cmlnaHQ6IGlmIHR5cGVvZiBvcHRpb25zLnJpZ2h0ID09IFwib2JqZWN0XCIgdGhlbiBudWxsIGVsc2UgaWYgb3B0aW9ucy5wdXNoUmlnaHQgdGhlbiBudWxsICBlbHNlIGlmIG9wdGlvbnMucmlnaHQ/IHRoZW4gb3B0aW9ucy5yaWdodCBlbHNlIGlmIG9yaWdpbj8uY29uc3RyYWludFZhbHVlcz8gdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy5yaWdodCBlbHNlIG51bGxcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0d2lkdGhGYWN0b3I6IGlmIG9wdGlvbnMuc2NhbGVYPyB0aGVuIG9wdGlvbnMuc2NhbGVYIGVsc2UgaWYgb3B0aW9ucy53aWR0aEZhY3Rvcj8gdGhlbiBvcHRpb25zLndpZHRoRmFjdG9yIGVsc2UgbnVsbFxuXHRcdFx0aGVpZ2h0RmFjdG9yOiBpZiBvcHRpb25zLnNjYWxlWT8gdGhlbiBvcHRpb25zLnNjYWxlWSBlbHNlIGlmIG9wdGlvbnMuaGVpZ2h0RmFjdG9yPyB0aGVuIG9wdGlvbnMuaGVpZ2h0RmFjdG9yIGVsc2UgbnVsbFxuXHRcdFx0Y2VudGVyQW5jaG9yWDogaWYgb3B0aW9ucy5jZW50ZXJYPyB0aGVuIG9wdGlvbnMuY2VudGVyWCBlbHNlIGlmIG9wdGlvbnMuY2VudGVyQW5jaG9yWD8gdGhlbiBvcHRpb25zLmNlbnRlckFuY2hvclggZWxzZSBudWxsXG5cdFx0XHRjZW50ZXJBbmNob3JZOiBpZiBvcHRpb25zLmNlbnRlclk/IHRoZW4gb3B0aW9ucy5jZW50ZXJZIGVsc2UgaWYgb3B0aW9ucy5jZW50ZXJBbmNob3JZPyB0aGVuIG9wdGlvbnMuY2VudGVyQW5jaG9yWSBlbHNlIG51bGxcblx0XHRcdGFzcGVjdFJhdGlvTG9ja2VkOiBpZiBvcHRpb25zLmFzcGVjdFJhdGlvTG9ja2VkPyB0aGVuIG9wdGlvbnMuYXNwZWN0UmF0aW9Mb2NrZWQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXMgdGhlbiBvcmlnaW4uY29uc3RyYWludFZhbHVlcy5hc3BlY3RSYXRpb0xvY2tlZCBlbHNlIGZhbHNlXG5cblx0XHQjIHJlc2V0c1xuXHRcdHZhbHVlcyA9IEBjb25zdHJhaW50VmFsdWVzXG5cdFx0aWYgdmFsdWVzLnRvcD8gJiYgdmFsdWVzLmJvdHRvbT9cblx0XHRcdEBjb25zdHJhaW50VmFsdWVzLmhlaWdodEZhY3RvciA9IG51bGxcblx0XHRcdEBjb25zdHJhaW50VmFsdWVzLmNlbnRlckFuY2hvclkgPSBudWxsXG5cdFx0aWYgdmFsdWVzLmxlZnQ/ICYmIHZhbHVlcy5yaWdodD9cblx0XHRcdEBjb25zdHJhaW50VmFsdWVzLndpZHRoRmFjdG9yID0gbnVsbFxuXHRcdFx0QGNvbnN0cmFpbnRWYWx1ZXMuY2VudGVyQW5jaG9yWCA9IG51bGxcblx0XHRpZiB2YWx1ZXMubGVmdD8gJiYgdmFsdWVzLnJpZ2h0PyAmJiB2YWx1ZXMudG9wPyAmJiB2YWx1ZXMuYm90dG9tP1xuXHRcdFx0QGNvbnN0cmFpbnRWYWx1ZXMuYXNwZWN0UmF0aW9Mb2NrZWQgPSBmYWxzZVxuXG5cdFx0Zm9yIHJlZiBpbiBbW1widG9wXCIsIFwieVwiLCBcIm1heFlcIiwgXCJ0b3BSZWZcIiwgXCJib3R0b21cIl0sIFtcImxlZnRcIiwgXCJ4XCIsIFwibWF4WFwiLCBcImxlZnRSZWZcIiwgXCJyaWdodFwiXSwgW1wiYm90dG9tXCIsIFwibWF4WVwiLCBcInlcIiwgXCJib3R0b21SZWZcIiwgXCJ0b3BcIl0sIFtcInJpZ2h0XCIsIFwibWF4WFwiLCBcInhcIiwgXCJyaWdodFJlZlwiLCBcImxlZnRcIl1dXG5cblx0XHRcdGlmIHR5cGVvZiBvcHRpb25zW3JlZlswXV0gPT0gXCJvYmplY3RcIiAmJiBvcHRpb25zW3JlZlswXV0gIT0gbnVsbCAmJiAhb3B0aW9uc1tyZWZbM11dP1xuXG5cdFx0XHRcdGlmIG9wdGlvbnNbcmVmWzBdXS5sYXllcj9cblx0XHRcdFx0XHRpZiBAcGFyZW50PyAmJiBAcGFyZW50LnNlbGVjdENoaWxkKG9wdGlvbnNbcmVmWzBdXS5sYXllcik/XG5cdFx0XHRcdFx0XHRsYXllciA9IEBwYXJlbnQuc2VsZWN0Q2hpbGQgb3B0aW9uc1tyZWZbMF1dLmxheWVyXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0bGF5ZXIgPSBMYXllci5zZWxlY3Qgb3B0aW9uc1tyZWZbMF1dLmxheWVyXG5cdFx0XHRcdGVsc2UgbGF5ZXIgPSBAcGFyZW50XG5cblx0XHRcdFx0YWxpZ24gPSBudWxsXG5cblx0XHRcdFx0aWYgIW9wdGlvbnNbcmVmWzBdXS52YWx1ZT8gJiYgbGF5ZXIgPT0gQHBhcmVudFxuXHRcdFx0XHRcdHZhbHVlID0gQFtyZWZbMV1dXG5cdFx0XHRcdGVsc2UgaWYgb3B0aW9uc1tyZWZbMF1dLmFsaWduPyAmJiBvcHRpb25zW3JlZlswXV0udmFsdWU/XG5cdFx0XHRcdFx0dmFsdWUgPSBvcHRpb25zW3JlZlswXV0udmFsdWVcblx0XHRcdFx0XHRhbGlnbiA9IG9wdGlvbnNbcmVmWzBdXS5hbGlnblxuXHRcdFx0XHRlbHNlIGlmIG9wdGlvbnNbcmVmWzBdXS5hbGlnbj9cblx0XHRcdFx0XHR2YWx1ZSA9IDBcblx0XHRcdFx0XHRhbGlnbiA9IG9wdGlvbnNbcmVmWzBdXS5hbGlnblxuXHRcdFx0XHRlbHNlIGlmICFvcHRpb25zW3JlZlswXV0udmFsdWU/ICYmICFvcHRpb25zW3JlZlswXV0uYWxpZ24/XG5cdFx0XHRcdFx0dmFsdWUgPSBAW3JlZlsxXV0gLSBsYXllcltyZWZbMl1dXG5cdFx0XHRcdFx0YWxpZ24gPSByZWZbNF1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHZhbHVlID0gb3B0aW9uc1tyZWZbMF1dLnZhbHVlXG5cdFx0XHRcdFx0YWxpZ24gPSByZWZbNF1cblxuXHRcdFx0XHRpZiBhbGlnbiA9PSBcImxlZnRcIiB0aGVuIGFsaWduID0gXCJ4XCJcblx0XHRcdFx0ZWxzZSBpZiBhbGlnbiA9PSBcInJpZ2h0XCIgdGhlbiBhbGlnbiA9IFwibWF4WFwiXG5cdFx0XHRcdGVsc2UgaWYgYWxpZ24gPT0gXCJ0b3BcIiB0aGVuIGFsaWduID0gXCJ5XCJcblx0XHRcdFx0ZWxzZSBpZiBhbGlnbiA9PSBcImJvdHRvbVwiIHRoZW4gYWxpZ24gPSBcIm1heFlcIlxuXG5cdFx0XHRcdEBjb25zdHJhaW50VmFsdWVzW3JlZlszXV0gPVxuXHRcdFx0XHRcdGxheWVyOiBsYXllclxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRcdGFsaWduOiBhbGlnblxuXG5cdFx0XHRcdEBjb25zdHJhaW50VmFsdWVzW3JlZlswXV0gPSBudWxsXG5cdFx0XHRcdEBjb25zdHJhaW50VmFsdWVzW3JlZls0XV0gPSBudWxsXG5cblx0XHRcdFx0IyBtb3ZlRnJvbVJlZiBALCBsYXllciwgcmVmWzFdLCByZWZbMl0sIHJlZlszXVxuXG5cdFx0aWYgb3B0aW9ucy5wdXNoRG93bj9cblx0XHRcdEBjb25zdHJhaW50VmFsdWVzLmJvdHRvbSA9IG51bGxcblx0XHRcdHB1c2hQYXJlbnQgQCwgXCJkb3duXCJcblx0XHRpZiBvcHRpb25zLnB1c2hSaWdodD9cblx0XHRcdEBjb25zdHJhaW50VmFsdWVzLnJpZ2h0ID0gbnVsbFxuXHRcdFx0cHVzaFBhcmVudCBALCBcInJpZ2h0XCJcblxuXHRcdHVubGVzcyBvcHRpb25zLnB1c2hEb3duIHx8IEBjb25zdHJhaW50VmFsdWVzLnRvcFJlZiB8fCBAY29uc3RyYWludFZhbHVlcy5ib3R0b21SZWZcblx0XHRcdEBjb25zdHJhaW50VmFsdWVzLmJvdHRvbSA9IGlmIG9wdGlvbnMuYm90dG9tPyB0aGVuIG9wdGlvbnMuYm90dG9tIGVsc2UgaWYgb3JpZ2luPy5jb25zdHJhaW50VmFsdWVzPyB0aGVuIG9yaWdpbi5jb25zdHJhaW50VmFsdWVzLmJvdHRvbSBlbHNlIG51bGxcblx0XHR1bmxlc3Mgb3B0aW9ucy5wdXNoUmlnaHQgfHwgQGNvbnN0cmFpbnRWYWx1ZXMubGVmdFJlZiB8fCBAY29uc3RyYWludFZhbHVlcy5yaWdodFJlZlxuXHRcdFx0QGNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgPSBpZiBvcHRpb25zLnJpZ2h0PyB0aGVuIG9wdGlvbnMucmlnaHQgZWxzZSBpZiBvcmlnaW4/LmNvbnN0cmFpbnRWYWx1ZXM/IHRoZW4gb3JpZ2luLmNvbnN0cmFpbnRWYWx1ZXMucmlnaHQgZWxzZSBudWxsXG5cblx0XHRpZiBAY29uc3RyYWludFZhbHVlcy50b3AgPT0gbnVsbCAmJiBAY29uc3RyYWludFZhbHVlcy5ib3R0b20gPT0gbnVsbCAmJiBAY29uc3RyYWludFZhbHVlcy5jZW50ZXJBbmNob3JZID09IG51bGwgJiYgIUBjb25zdHJhaW50VmFsdWVzLnRvcFJlZiAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMuYm90dG9tUmVmXG5cdFx0XHRAY29uc3RyYWludFZhbHVlcy50b3AgPSBAeVxuXHRcdGlmIEBjb25zdHJhaW50VmFsdWVzLmxlZnQgPT0gbnVsbCAmJiBAY29uc3RyYWludFZhbHVlcy5yaWdodCA9PSBudWxsICYmIEBjb25zdHJhaW50VmFsdWVzLmNlbnRlckFuY2hvclggPT0gbnVsbCAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMubGVmdFJlZiAmJiAhQGNvbnN0cmFpbnRWYWx1ZXMucmlnaHRSZWZcblx0XHRcdEBjb25zdHJhaW50VmFsdWVzLmxlZnQgPSBAeFxuXG5cdFx0QGFwcGx5Q29uc3RyYWludHMoKVxuXG5cblx0Y29uc3RydWN0b3JOYW1lOjphcHBseUNvbnN0cmFpbnRzID0gLT5cblxuXHRcdHJldHVybiBpZiAhQGNvbnN0cmFpbnRWYWx1ZXNcblxuXHRcdHZhbHVlcyA9IEBjb25zdHJhaW50VmFsdWVzXG5cblx0XHRpZiAhQHBhcmVudCB0aGVuIHBhcmVudCA9IFNjcmVlbiBlbHNlIHBhcmVudCA9IEBwYXJlbnRcblxuXHRcdGFzcGVjdFJhdGlvID0gQHdpZHRoIC8gQGhlaWdodFxuXG5cdFx0IyBwb3NpdGlvblxuXHRcdGlmIHZhbHVlcy50b3A/ICYmIHR5cGVvZiB2YWx1ZXMudG9wICE9IFwib2JqZWN0XCJcblx0XHRcdEB5ID0gdmFsdWVzLnRvcFxuXHRcdGVsc2UgaWYgdmFsdWVzLnRvcCA9PSBudWxsICYmIHZhbHVlcy50b3BSZWY/LmxheWVyP1xuXHRcdFx0QHkgPSB2YWx1ZXMudG9wUmVmLmxheWVyW3ZhbHVlcy50b3BSZWYuYWxpZ25dICsgdmFsdWVzLnRvcFJlZi52YWx1ZVxuXG5cdFx0aWYgdmFsdWVzLmxlZnQ/ICYmIHR5cGVvZiB2YWx1ZXMubGVmdCAhPSBcIm9iamVjdFwiXG5cdFx0XHRAeCA9IHZhbHVlcy5sZWZ0XG5cdFx0ZWxzZSBpZiB2YWx1ZXMubGVmdCA9PSBudWxsICYmIHZhbHVlcy5sZWZ0UmVmPy5sYXllcj9cblx0XHRcdEB4ID0gdmFsdWVzLmxlZnRSZWYubGF5ZXJbdmFsdWVzLmxlZnRSZWYuYWxpZ25dICsgdmFsdWVzLmxlZnRSZWYudmFsdWVcblxuXHRcdCMgc2l6ZVxuXHRcdGlmIHZhbHVlcy5sZWZ0PyAmJiB2YWx1ZXMucmlnaHQ/XG5cdFx0XHRAd2lkdGggPSBwYXJlbnQud2lkdGggLSBAeCAtIHZhbHVlcy5yaWdodFxuXHRcdFx0aWYgdmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkXG5cdFx0XHRcdEBoZWlnaHQgPSBAd2lkdGggLyBhc3BlY3RSYXRpb1xuXHRcdGlmIHZhbHVlcy50b3A/ICYmIHZhbHVlcy5ib3R0b20/XG5cdFx0XHRAaGVpZ2h0ID0gcGFyZW50LmhlaWdodCAtIEB5IC0gdmFsdWVzLmJvdHRvbVxuXHRcdFx0aWYgdmFsdWVzLmFzcGVjdFJhdGlvTG9ja2VkXG5cdFx0XHRcdEB3aWR0aCA9IEBoZWlnaHQgKiBhc3BlY3RSYXRpb1xuXG5cdFx0IyBpZiB2YWx1ZXMubGVmdFJlZj8gJiYgdmFsdWVzLnJpZ2h0UmVmP1xuXHRcdCMgXHRAd2lkdGggPSBwYXJlbnQud2lkdGggLSB2YWx1ZXMubGVmdFJlZi52YWx1ZSAtIHZhbHVlcy5yaWdodFJlZi52YWx1ZVxuXHRcdCMgaWYgdmFsdWVzLnRvcFJlZj8gJiYgdmFsdWVzLmJvdHRvbVJlZj9cblx0XHQjIFx0QGhlaWdodCA9IHBhcmVudC5oZWlnaHQgLSB2YWx1ZXMudG9wUmVmLnZhbHVlIC0gdmFsdWVzLmJvdHRvbVJlZi52YWx1ZVxuXG5cdFx0aWYgdmFsdWVzLndpZHRoRmFjdG9yP1xuXHRcdFx0QHdpZHRoID0gcGFyZW50LndpZHRoICogdmFsdWVzLndpZHRoRmFjdG9yXG5cdFx0aWYgdmFsdWVzLmhlaWdodEZhY3Rvcj9cblx0XHRcdEBoZWlnaHQgPSBwYXJlbnQuaGVpZ2h0ICogdmFsdWVzLmhlaWdodEZhY3RvclxuXG5cdFx0IyBtYXggcG9zaXRpb25cblx0XHRpZiB2YWx1ZXMucmlnaHQ/IFxuXHRcdFx0QG1heFggPSBwYXJlbnQud2lkdGggLSB2YWx1ZXMucmlnaHRcblx0XHRlbHNlIGlmIHZhbHVlcy5yaWdodCA9PSBudWxsICYmIHZhbHVlcy5yaWdodFJlZj8ubGF5ZXI/XG5cdFx0XHRAbWF4WCA9IHZhbHVlcy5yaWdodFJlZi5sYXllclt2YWx1ZXMucmlnaHRSZWYuYWxpZ25dIC0gdmFsdWVzLnJpZ2h0UmVmLnZhbHVlXG5cdFx0aWYgdmFsdWVzLmJvdHRvbT9cblx0XHRcdEBtYXhZID0gcGFyZW50LmhlaWdodCAtIHZhbHVlcy5ib3R0b21cblx0XHRlbHNlIGlmIHZhbHVlcy5ib3R0b20gPT0gbnVsbCAmJiB2YWx1ZXMuYm90dG9tUmVmPy5sYXllcj9cblx0XHRcdEBtYXhZID0gdmFsdWVzLmJvdHRvbVJlZi5sYXllclt2YWx1ZXMuYm90dG9tUmVmLmFsaWduXSAtIHZhbHVlcy5ib3R0b21SZWYudmFsdWVcblxuXHRcdCMgY2VudGVyIHBvc2l0aW9uXG5cdFx0aWYgIXZhbHVlcy5sZWZ0PyAmJiAhdmFsdWVzLnJpZ2h0PyAmJiB2YWx1ZXMuY2VudGVyQW5jaG9yWD9cblx0XHRcdEBtaWRYID0gcGFyZW50LndpZHRoICogdmFsdWVzLmNlbnRlckFuY2hvclhcblx0XHRpZiAhdmFsdWVzLnRvcD8gJiYgIXZhbHVlcy5ib3R0b20/ICYmIHZhbHVlcy5jZW50ZXJBbmNob3JZP1xuXHRcdFx0QG1pZFkgPSBwYXJlbnQuaGVpZ2h0ICogdmFsdWVzLmNlbnRlckFuY2hvcllcblxuXHRcdEBjb25zdHJhaW50VmFsdWVzID0gdmFsdWVzXG5cblx0XHRhZGRSZWZlcmVuY2VFdmVudHMoQClcblxuXG5idWlsZENvbnN0cmFpbnRzUHJvdG9zKFwiTGF5ZXJcIilcbmJ1aWxkQ29uc3RyYWludHNQcm90b3MoXCJUZXh0TGF5ZXJcIilcbmJ1aWxkQ29uc3RyYWludHNQcm90b3MoXCJTY3JvbGxDb21wb25lbnRcIilcbmJ1aWxkQ29uc3RyYWludHNQcm90b3MoXCJQYWdlQ29tcG9uZW50XCIpXG5idWlsZENvbnN0cmFpbnRzUHJvdG9zKFwiU2xpZGVyQ29tcG9uZW50XCIpXG5idWlsZENvbnN0cmFpbnRzUHJvdG9zKFwiUmFuZ2VTbGlkZXJDb21wb25lbnRcIilcbiMgYnVpbGRDb25zdHJhaW50c1Byb3RvcyhcIk1vYmlsZVNjcm9sbEZpeExheWVyXCIpXG5cblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoTGF5ZXIucHJvdG90eXBlLCBcImNvbnN0cmFpbnRzXCIsIHtcblxuXHRnZXQ6IC0+IHJldHVybiBAX2NvbnN0cmFpbnRzXG5cdHNldDogKHZhbHVlKSAtPlxuXHRcdEBfY29uc3RyYWludHMgPSB2YWx1ZVxuXHRcdEBlbWl0IFwiY2hhbmdlOmNvbnN0cmFpbnRzXCIsIHZhbHVlXG5cdFx0QHNldENvbnN0cmFpbnRzIHZhbHVlXG5cbn0pXG5cblxuXG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURDQSxJQUFBOztBQUFBLFdBQUEsR0FBYyxTQUFDLEtBQUQsRUFBUSxTQUFSLEVBQW1CLE9BQW5CLEVBQTRCLFFBQTVCLEVBQXNDLE9BQXRDO0FBRWIsTUFBQTtFQUFBLG1CQUFBLEdBQXNCLEtBQUssQ0FBQztFQUU1QixnQkFBQSxHQUFtQixTQUFVLENBQUEsUUFBQTtFQUM3QixrQkFBQSxHQUFxQixLQUFNLENBQUEsT0FBQTtFQUUzQixLQUFNLENBQUEsT0FBQSxDQUFOLEdBQWlCLFNBQVUsQ0FBQSxRQUFBLENBQVYsR0FBc0IsS0FB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
