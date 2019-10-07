/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Controller.js":
/*!***************************!*\
  !*** ./src/Controller.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controller; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller =
/*#__PURE__*/
function () {
  function Controller(gameMain) {
    _classCallCheck(this, Controller);

    this.gameMain = gameMain;
    this.keyStates = new Map();
    this.keyMap = new Map(); //response for a key code

    this.mapLeftMove = this.mapLeftMove.bind(this);
    this.mapRightMove = this.mapRightMove.bind(this);
    this.mapJump = this.mapJump.bind(this);
    this.mapInputResponses();
  }

  _createClass(Controller, [{
    key: "mapInputResponses",
    value: function mapInputResponses() {
      this.mapJump("Space"); //coresponds to e.code

      this.mapJump("KeyW");
      this.mapJump("ArrowUp");
      this.mapRightMove("ArrowRight");
      this.mapRightMove("KeyD");
      this.mapLeftMove("ArrowLeft");
      this.mapLeftMove("KeyA");
    }
  }, {
    key: "mapRightMove",
    value: function mapRightMove(input) {
      var mario = this.gameMain.game.mario;
      this.map(input, function (keyState) {
        mario.walk.rightDirection = keyState;
      });
    }
  }, {
    key: "mapLeftMove",
    value: function mapLeftMove(input) {
      var mario = this.gameMain.game.mario;
      this.map(input, function (keyState) {
        mario.walk.leftDirection = -keyState;
      });
    }
  }, {
    key: "mapJump",
    value: function mapJump(input) {
      var mario = this.gameMain.game.mario;
      this.map(input, function (keyState) {
        if (keyState && mario.vel.y <= 0) {
          mario.isGrounded = false;
          mario.jump.start();
        } else {
          mario.jump.cancel();
        }
      });
    }
  }, {
    key: "map",
    value: function map(code, callback) {
      this.keyMap.set(code, callback);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(e) {
      // only need to know code and type of input
      e.preventDefault();
      if (!this.keyMap.has(e.code)) return;
      var keyState = e.type === 'keydown' ? 1 : 0;
      if (this.keyStates.get(e.code) === keyState) return;
      this.keyStates.set(e.code, keyState);
      this.keyMap.get(e.code)(keyState);
    }
  }, {
    key: "listenForInput",
    value: function listenForInput() {
      var _this = this;

      window.addEventListener("keydown", function (e) {
        _this.handleEvent(e);
      });
      window.addEventListener("keyup", function (e) {
        _this.handleEvent(e);
      });
    }
  }]);

  return Controller;
}();



/***/ }),

/***/ "./src/Game_Main.js":
/*!**************************!*\
  !*** ./src/Game_Main.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameMain; });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller */ "./src/Controller.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GameMain =
/*#__PURE__*/
function () {
  function GameMain(game, display) {
    _classCallCheck(this, GameMain);

    this.game = game;
    this.display = display;
    this.pauseStatus = false;
    this.animate = this.animate.bind(this);
    this.run = this.run.bind(this);
    this.pause = this.pause.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  _createClass(GameMain, [{
    key: "start",
    value: function start() {
      //starting player position
      this.game.mario.pos.set(145, 250); // //testing for maping out area
      // this.display.camera.pos.x = 4000;

      this.lastTime = 0;
      this.accumulatedTime = 0; // this.display.loadWorld();

      var controller = new _Controller__WEBPACK_IMPORTED_MODULE_0__["default"](this);
      controller.listenForInput(); //start fixed timestep of 1/60

      this.deltaTime = 1 / 60;
      this.run();
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.pauseStatus) {
        this.run();
      } else {
        this.pause();
      }
    }
  }, {
    key: "run",
    value: function run() {
      this.pauseStatus = false;
      this.id = requestAnimationFrame(this.animate);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.pauseStatus = true;
      cancelAnimationFrame(this.id);
    }
  }, {
    key: "animate",
    value: function animate(time) {
      this.accumulatedTime += (time - this.lastTime) / 1000;
      if (this.accumulatedTime > 1) this.accumulatedTime = 1;

      while (this.accumulatedTime > this.deltaTime) {
        this.game.update(this.deltaTime);
        this.display.drawWorld(this.game);
        this.accumulatedTime -= this.deltaTime;
      }

      this.lastTime = time;
      this.id = requestAnimationFrame(this.animate);
    }
  }]);

  return GameMain;
}();



/***/ }),

/***/ "./src/audio/music.mp3":
/*!*****************************!*\
  !*** ./src/audio/music.mp3 ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/music.mp3";

/***/ }),

/***/ "./src/display/Camera.js":
/*!*******************************!*\
  !*** ./src/display/Camera.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Camera; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Camera = function Camera(height, width) {
  _classCallCheck(this, Camera);

  this.pos = new _util__WEBPACK_IMPORTED_MODULE_0__["Vector"](0, 0);
  this.width = width, this.height = height;
};



/***/ }),

/***/ "./src/display/Display.js":
/*!********************************!*\
  !*** ./src/display/Display.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Display; });
/* harmony import */ var _Sprite_Sheet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite_Sheet.js */ "./src/display/Sprite_Sheet.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Camera */ "./src/display/Camera.js");
/* harmony import */ var _sprites_background_sheet1_sprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprites/background_sheet1_sprites */ "./src/display/sprites/background_sheet1_sprites.js");
/* harmony import */ var _sprites_mario_sprites__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sprites/mario_sprites */ "./src/display/sprites/mario_sprites.js");
/* harmony import */ var _sprites_enemy_sprites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sprites/enemy_sprites */ "./src/display/sprites/enemy_sprites.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var Display =
/*#__PURE__*/
function () {
  function Display(canvas, height, width) {
    _classCallCheck(this, Display);

    canvas.height = height;
    canvas.width = width;
    this.camera = new _Camera__WEBPACK_IMPORTED_MODULE_2__["default"](height, width);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.height = height;
    this.width = width;
    this.backgroundColor = "#0F5EF1";
    this.spriteSheets = new Map();
    this.loadedSheets = new Set();
    this.loadWorld = this.loadWorld.bind(this);
  }

  _createClass(Display, [{
    key: "loadWorld",
    value: function loadWorld() {
      var spriteSheets = this.spriteSheets;
      var loadedSheets = this.loadedSheets;

      _files__WEBPACK_IMPORTED_MODULE_1__["thanksImage"].onload = function () {
        var thanksSheet = new _Sprite_Sheet_js__WEBPACK_IMPORTED_MODULE_0__["default"](_files__WEBPACK_IMPORTED_MODULE_1__["thanksImage"], 600, 400);
        thanksSheet.addSprite("thanks", 0, 0);
        spriteSheets.set("thanks", thanksSheet);
        loadedSheets.add("thanks");
      };

      _files__WEBPACK_IMPORTED_MODULE_1__["backgroundImage"].onload = function () {
        var backgroundSheet = new _Sprite_Sheet_js__WEBPACK_IMPORTED_MODULE_0__["default"](_files__WEBPACK_IMPORTED_MODULE_1__["backgroundImage"], 29, 29);
        _sprites_background_sheet1_sprites__WEBPACK_IMPORTED_MODULE_3__["default"].sprites.forEach(function (sprite) {
          backgroundSheet.addSprite(sprite.name, sprite.x, sprite.y);
        });
        spriteSheets.set("background", backgroundSheet);
        loadedSheets.add("background");
      };

      _files__WEBPACK_IMPORTED_MODULE_1__["backgroundFirstLayerImage"].onload = function () {
        loadedSheets.add("backgroundLastLayer");
      };

      _files__WEBPACK_IMPORTED_MODULE_1__["marioImage"].onload = function () {
        _sprites_mario_sprites__WEBPACK_IMPORTED_MODULE_4__["default"].marios.forEach(function (mario) {
          var marioSheet = new _Sprite_Sheet_js__WEBPACK_IMPORTED_MODULE_0__["default"](_files__WEBPACK_IMPORTED_MODULE_1__["marioImage"], mario.width, mario.height);
          mario.sprites.forEach(function (sprite) {
            if (sprite.type === "flip") {
              marioSheet.addSpriteFlipped(sprite.name, sprite.x, sprite.y);
            } else {
              marioSheet.addSprite(sprite.name, sprite.x, sprite.y);
            }
          });
          spriteSheets.set(mario.SpriteSheet, marioSheet);
        });
        loadedSheets.add("mario");
      };

      _files__WEBPACK_IMPORTED_MODULE_1__["enemiesImage"].onload = function () {
        _sprites_enemy_sprites__WEBPACK_IMPORTED_MODULE_5__["default"].enemies.forEach(function (enemy) {
          var enemySheet = new _Sprite_Sheet_js__WEBPACK_IMPORTED_MODULE_0__["default"](_files__WEBPACK_IMPORTED_MODULE_1__["enemiesImage"], enemy.width, enemy.height);
          enemy.sprites.forEach(function (sprite) {
            if (sprite.type === "flip") {
              enemySheet.addSpriteFlipped(sprite.name, sprite.x, sprite.y);
            } else {
              enemySheet.addSprite(sprite.name, sprite.x, sprite.y);
            }
          });
          spriteSheets.set(enemy.SpriteSheet, enemySheet);
        });
        loadedSheets.add("enemies");
      };
    }
  }, {
    key: "drawWorld",
    value: function drawWorld(game) {
      var _this = this;

      if (this.finishedLoading()) {
        //draw first layer of background
        this.ctx.drawImage(_files__WEBPACK_IMPORTED_MODULE_1__["backgroundFirstLayerImage"], -this.camera.pos.x / 4.6, 0);
        var backgroundSheet = this.spriteSheets.get("background"); // only draw the tiles that the camera is viewing

        var cameraPanel = game.cameraView(this.camera, backgroundSheet);
        this.ctx.drawImage(cameraPanel, -this.camera.pos.x % 29, 0);
        game.objects.forEach(function (object) {
          return object.draw(_this.ctx, _this.spriteSheets, _this.camera);
        });
        if (game.mario.pos.x > 5000) this.spriteSheets.get("thanks").draw("thanks", this.ctx, 5900 - this.camera.pos.x, 0 - this.camera.pos.y);
      }
    }
  }, {
    key: "finishedLoading",
    value: function finishedLoading() {
      return this.loadedSheets.has("background") && this.loadedSheets.has("backgroundLastLayer") && this.loadedSheets.has("mario") && this.loadedSheets.has("enemies") && this.loadedSheets.has("thanks");
    }
  }]);

  return Display;
}();



/***/ }),

/***/ "./src/display/Sprite_Sheet.js":
/*!*************************************!*\
  !*** ./src/display/Sprite_Sheet.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpriteSheet; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpriteSheet =
/*#__PURE__*/
function () {
  function SpriteSheet(image, tileWidth, tileHeight) {
    _classCallCheck(this, SpriteSheet);

    this.image = image;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.sprites = new Map(); //store sprites in key/value object
  }

  _createClass(SpriteSheet, [{
    key: "addSprite",
    value: function addSprite(sprite, offsetX, offsetY) {
      //clip from spritesheet and store into sprites;
      var clip = document.createElement('canvas');
      clip.width = this.tileWidth;
      clip.height = this.tileHeight;
      var ctx = clip.getContext('2d');
      ctx.drawImage(this.image, offsetX, offsetY, this.tileWidth, this.tileHeight, 0, 0, this.tileWidth * 2, this.tileHeight * 2);
      this.sprites.set(sprite, clip);
    }
  }, {
    key: "addSpriteFlipped",
    value: function addSpriteFlipped(sprite, offsetX, offsetY) {
      //add sprite flipped horizontally
      var clip = document.createElement('canvas');
      clip.width = this.tileWidth;
      clip.height = this.tileHeight;
      var ctx = clip.getContext('2d');
      ctx.translate(this.tileWidth, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(this.image, offsetX, offsetY, this.tileWidth, this.tileHeight, 0, 0, this.tileWidth * 2, this.tileHeight * 2);
      this.sprites.set(sprite, clip);
    }
  }, {
    key: "draw",
    value: function draw(sprite, ctx, x, y) {
      var spriteImg = this.sprites.get(sprite);
      ctx.drawImage(spriteImg, x, y); // debugger
    }
  }]);

  return SpriteSheet;
}();



/***/ }),

/***/ "./src/display/sprites/background_sheet1_sprites.js":
/*!**********************************************************!*\
  !*** ./src/display/sprites/background_sheet1_sprites.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  "width": 29,
  "height": 29,
  "sprites": [//transparent sky
  {
    "name": "transparent",
    "x": 155,
    "y": 165
  }, // {
  //     "name": "sky",
  //     "x": 510,
  //     "y": 570
  // },
  {
    "name": "groundTop",
    "x": 445,
    "y": 202
  }, {
    "name": "groundSoil",
    "x": 445,
    "y": 220
  }, {
    "name": "groundMidLeftEdge",
    "x": 427,
    "y": 220
  }, {
    "name": "groundMidRightEdge",
    "x": 462,
    "y": 220
  }, {
    "name": "groundTopRightEdge",
    "x": 462,
    "y": 202
  }, {
    "name": "groundTopLeftEdge",
    "x": 427,
    "y": 202
  }, {
    "name": "groundTopRightPatch",
    "x": 358,
    "y": 383
  }, {
    "name": "groundTopLeftPatch",
    "x": 374.5,
    "y": 382.5
  }, {
    "name": "groundTopFloatingLeft",
    "x": 427,
    "y": 253
  }, {
    "name": "groundTopFloatingRight",
    "x": 462,
    "y": 253
  }, {
    "name": "groundTopFloatingRightSoil",
    "x": 462,
    "y": 271
  }, {
    "name": "groundTopFloatingLeftSoil",
    "x": 427,
    "y": 271
  }, {
    "name": "platformLeft",
    "x": 37.5,
    "y": 1
  }, {
    "name": "platformMiddle",
    "x": 55,
    "y": 1
  }, {
    "name": "platformRight",
    "x": 72.5,
    "y": 1
  }, {
    "name": "mysteryBox1",
    "x": 173.3,
    "y": 181.3
  }, {
    "name": "mysteryBox2",
    "x": 190.3,
    "y": 181.3
  }, {
    "name": "mysteryBox3",
    "x": 207.3,
    "y": 181.3
  }, {
    "name": "mysteryBox4",
    "x": 224.3,
    "y": 181.3
  }, {
    "name": "grass1",
    "x": 90,
    "y": 464
  }, {
    "name": "grass2",
    "x": 124,
    "y": 464
  }, {
    "name": "grass3",
    "x": 158,
    "y": 464
  }, {
    "name": "grass4",
    "x": 192,
    "y": 464
  }, {
    "name": "singlePlatform",
    "x": 173.5,
    "y": 164
  }, // {
  //     "name": "happyCloud",
  //     "x": 257.8,
  //     "y": 13.8
  // },
  {
    "name": "mushroom",
    "x": 292,
    "y": 30
  }]
});

/***/ }),

/***/ "./src/display/sprites/enemy_sprites.js":
/*!**********************************************!*\
  !*** ./src/display/sprites/enemy_sprites.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  "enemies": [{
    "SpriteSheet": "bullet",
    "width": 140,
    "height": 128,
    "sprites": [{
      "name": "bulletLeft",
      "x": 7,
      "y": 1162
    }]
  }, {
    "SpriteSheet": "dragonHalfFlattened",
    "width": 43,
    "height": 34,
    "sprites": [{
      "name": "halfFlattenedWalkLeft1",
      "x": 169,
      "y": 325
    }, {
      "name": "halfFlattenedWalkLeft2",
      "x": 130,
      "y": 325
    }, {
      "name": "halfFlattenedWalkRight1",
      "type": "flip",
      "x": 169,
      "y": 325
    }, {
      "name": "halfFlattenedWalkRight2",
      "type": "flip",
      "x": 130,
      "y": 325
    }]
  }, {
    "SpriteSheet": "dragonFlattened",
    "width": 43,
    "height": 20,
    "sprites": [{
      "name": "flattenedLeft",
      "x": 89,
      "y": 328
    }, {
      "name": "flattenedRight",
      "type": "flip",
      "x": 89,
      "y": 328
    }]
  }, {
    "SpriteSheet": "dragonRegular",
    "width": 43,
    "height": 63,
    "sprites": [{
      "name": "regularWalkLeft1",
      "x": 249,
      "y": 318
    }, {
      "name": "regularWalkLeft2",
      "x": 209,
      "y": 318
    }, {
      "name": "regularWalkRight1",
      "type": "flip",
      "x": 209,
      "y": 318
    }, {
      "name": "regularWalkRight2",
      "type": "flip",
      "x": 249,
      "y": 318
    }]
  }]
});

/***/ }),

/***/ "./src/display/sprites/mario_sprites.js":
/*!**********************************************!*\
  !*** ./src/display/sprites/mario_sprites.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  "marios": [{
    "SpriteSheet": "mushroomMario",
    "width": 36,
    "height": 56,
    "sprites": [{
      "name": "idleRight",
      "x": 207,
      "y": 76
    }, {
      "name": "walkingRight1",
      "x": 327,
      "y": 76
    }, {
      "name": "walkingRight2",
      "x": 367,
      "y": 76
    }, {
      "name": "idleLeft",
      "type": "flip",
      "x": 207,
      "y": 76
    }, {
      "name": "walkingLeft1",
      "type": "flip",
      "x": 327,
      "y": 76
    }, {
      "name": "walkingLeft2",
      "type": "flip",
      "x": 367,
      "y": 76
    }, {
      "name": "jumpingRight",
      "x": 207,
      "y": 116
    }, {
      "name": "jumpingLeft",
      "type": "flip",
      "x": 207,
      "y": 116
    }, {
      "name": "fallingRight",
      "x": 247,
      "y": 116
    }, {
      "name": "fallingLeft",
      "type": "flip",
      "x": 247,
      "y": 116
    }]
  }, {
    "SpriteSheet": "regularMario",
    "width": 60,
    "height": 60,
    "sprites": [{
      "name": "idleRight",
      "x": 209,
      "y": 0
    }, {
      "name": "lose",
      "x": 9,
      "y": 38
    }, {
      "name": "walkingRight",
      "x": 328,
      "y": 0
    }, {
      "name": "idleLeft",
      "x": 168,
      "y": 0
    }, {
      "name": "walkingLeft",
      "x": 49,
      "y": 0
    }, {
      "name": "jumpingRight",
      "x": 208,
      "y": 40
    }, {
      "name": "jumpingLeft",
      "x": 168,
      "y": 40
    }, {
      "name": "transparent",
      "x": 0,
      "y": 0
    }]
  }]
});

/***/ }),

/***/ "./src/display/tilemap.js":
/*!********************************!*\
  !*** ./src/display/tilemap.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  "backgrounds": [{
    "tile": "groundTop",
    "type": "ground",
    "ranges": [[0, 125, 12, 1], [130, 18, 10, 1], [153, 25, 6, 1], [0, 5, 10, 1], [33, 5, 9, 5], [202, 20, 12, 1]]
  }, {
    "tile": "groundSoil",
    "type": "ground",
    "ranges": [[0, 125, 13, 1], [130, 18, 11, 3], [153, 25, 7, 7], [0, 5, 11, 2], [33, 5, 10, 4], [202, 20, 13, 1]]
  }, {
    "tile": "groundTopRightEdge",
    "type": "ground",
    "ranges": [[5, 1, 10, 1], [37, 1, 9, 1], [78, 1, 12, 1], [110, 1, 12, 1], [135, 1, 10, 1], [145, 1, 10, 1], [158, 1, 6, 1], [222, 1, 12, 1], [177, 1, 6, 1]]
  }, {
    "tile": "groundTopLeftEdge",
    "type": "ground",
    "ranges": [[32, 1, 9, 1], [93, 1, 12, 1], [130, 1, 10, 1], [140, 1, 10, 1], [152, 1, 6, 1], [162, 1, 6, 1], [202, 1, 12, 1]]
  }, {
    "tile": "groundMidRightEdge",
    "type": "ground",
    "ranges": [[5, 1, 11, 1], [5, 1, 11, 1], [37, 1, 10, 2], [78, 1, 13, 1], [110, 1, 13, 1], [135, 1, 11, 1], [145, 1, 11, 3], [158, 1, 7, 1], [222, 1, 13, 1], [177, 1, 7, 7]]
  }, {
    "tile": "groundMidLeftEdge",
    "type": "ground",
    "ranges": [[32, 1, 10, 2], [93, 1, 13, 1], [130, 1, 11, 3], [140, 1, 11, 1], [152, 1, 7, 7], [162, 1, 7, 1], [202, 1, 13, 1]]
  }, {
    "tile": "groundTopRightPatch",
    "type": "ground",
    "ranges": [[5, 1, 12, 1], [37, 1, 12, 1], [135, 1, 12, 1], [158, 1, 8, 1]]
  }, {
    "tile": "groundTopLeftPatch",
    "type": "ground",
    "ranges": [[32, 1, 12, 1], [140, 1, 12, 1], [162, 1, 8, 1]]
  }, {
    "tile": "groundTopFloatingLeft",
    "type": "floatingPlatform",
    "ranges": [[73, 1, 8, 1], [100, 1, 7, 1], [113, 1, 6, 1]]
  }, {
    "tile": "groundTop",
    "type": "floatingPlatform",
    "ranges": [[74, 3, 8, 1], [101, 5, 7, 1], [114, 10, 6, 1], [136, 4, 12, 1], [159, 3, 8, 1]]
  }, {
    "tile": "groundTopFloatingRight",
    "type": "floatingPlatform",
    "ranges": [[77, 1, 8, 1], [106, 1, 7, 1], [124, 1, 6, 1]]
  }, {
    "tile": "groundTopFloatingLeftSoil",
    "ranges": [[73, 1, 9, 3], [100, 1, 8, 4], [113, 1, 7, 10]]
  }, {
    "tile": "groundSoil",
    "ranges": [[74, 3, 9, 3], [101, 5, 8, 4], [114, 10, 7, 10]]
  }, {
    "tile": "groundTopFloatingRightSoil",
    "ranges": [[77, 1, 9, 3], [106, 1, 8, 4], [124, 1, 7, 10]]
  }, {
    "tile": "platformMiddle",
    //    "type": "floatingPlatform",
    "type": "ground",
    "ranges": [[14, 11, 8, 1], [82, 1, 7, 1], [87, 1, 7, 1], [186, 7, 6, 1]]
  }, {
    "tile": "platformLeft",
    //    "type": "floatingPlatform",
    "type": "ground",
    "ranges": [[8, 1, 8, 1], [13, 1, 8, 1], [28, 1, 6, 1], [81, 1, 7, 1], [86, 1, 7, 1], [148, 1, 8, 1], [148, 1, 3, 1], [185, 1, 6, 1]]
  }, {
    "tile": "platformRight",
    //    "type": "floatingPlatform",
    "type": "ground",
    "ranges": [[9, 1, 8, 1], [25, 1, 8, 1], [29, 1, 6, 1], [83, 1, 7, 1], [88, 1, 7, 1], [149, 1, 8, 1], [149, 1, 3, 1], [193, 1, 6, 1]]
  }, {
    "tile": "mysteryBox",
    "type": "box",
    "item": "mushroom",
    "ranges": [[19, 1, 4, 1]]
  }, {
    "tile": "grass1",
    "ranges": [[7, 1, 11, 1], [45, 1, 11, 1], [60, 1, 11, 1], [96, 1, 11, 1], [169, 1, 5, 1]]
  }, {
    "tile": "grass2",
    "ranges": [[8, 2, 11, 1], [46, 3, 11, 1], [61, 3, 11, 1], [97, 1, 11, 1], [170, 3, 5, 1]]
  }, // {
  //     "tile": "grass3",
  //     "ranges": [
  //     ]
  // },
  {
    "tile": "grass4",
    "ranges": [[10, 1, 11, 1], [49, 1, 11, 1], [64, 1, 11, 1], [98, 1, 11, 1], [173, 1, 5, 1]]
  }, {
    "tile": "singlePlatform",
    // "type": "floatingPlatform",
    "type": "ground",
    "ranges": [[70, 1, 9, 1], [40, 3, 7, 1], [45, 3, 7, 1], [109, 1, 9, 1], [109, 1, 4, 1], [137, 1, 7, 1], [160, 1, 3, 1], [181, 1, 8, 1], [196, 1, 8, 1], [199, 1, 10, 1]]
  }, {
    "tile": "transparent",
    "ranges": [[79, 14, 12, 2], [111, 2, 12, 2], [125, 5, 12, 2], [136, 4, 10, 2], [146, 3, 10, 4], [159, 3, 6, 2]]
  }],
  "enemies": [{
    "name": "dragon",
    "x": 1900,
    "y": 200,
    "x1Limit": 1200,
    "x2Limit": 1900,
    "trigger": 600
  }, {
    "name": "dragon",
    "x": 1200,
    "y": 200,
    "x1Limit": 1200,
    "x2Limit": 1900,
    "trigger": 600
  }, {
    "name": "dragon",
    "x": 2900,
    "y": 200,
    "x1Limit": 2700,
    "x2Limit": 3100,
    "trigger": 2000
  }, {
    "name": "dragon",
    "x": 4000,
    "y": 200,
    "x1Limit": 3950,
    "x2Limit": 4050,
    "trigger": 3500
  }, {
    "name": "dragon",
    "x": 5100,
    "y": 0,
    "x1Limit": 4700,
    "x2Limit": 5120,
    "trigger": 4000
  }, {
    "name": "dragon",
    "x": 4700,
    "y": 0,
    "x1Limit": 4700,
    "x2Limit": 5120,
    "trigger": 4000
  }, {
    "name": "bullet",
    "x": 1300,
    "y": 100,
    "trigger": 700
  }, {
    "name": "bullet",
    "x": 3700,
    "y": 40,
    "trigger": 3300
  }, {
    "name": "bullet",
    "x": 4400,
    "y": 150,
    "trigger": 4000
  }, {
    "name": "bullet",
    "x": 5100,
    "y": 50,
    "trigger": 4700
  }, {
    "name": "bullet",
    "x": 4800,
    "y": 50,
    "trigger": 4400
  }]
});

/***/ }),

/***/ "./src/files.js":
/*!**********************!*\
  !*** ./src/files.js ***!
  \**********************/
/*! exports provided: backgroundImage, thanksImage, titleScreenImage, backgroundFirstLayerImage, music, marioImage, enemiesImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundImage", function() { return backgroundImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "thanksImage", function() { return thanksImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleScreenImage", function() { return titleScreenImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundFirstLayerImage", function() { return backgroundFirstLayerImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "music", function() { return music; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marioImage", function() { return marioImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enemiesImage", function() { return enemiesImage; });
/* harmony import */ var _imgs_background_assets_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgs/background_assets.png */ "./src/imgs/background_assets.png");
/* harmony import */ var _imgs_background_assets_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_imgs_background_assets_png__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _imgs_mario_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgs/mario.png */ "./src/imgs/mario.png");
/* harmony import */ var _imgs_mario_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_imgs_mario_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _imgs_enemies_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imgs/enemies.png */ "./src/imgs/enemies.png");
/* harmony import */ var _imgs_enemies_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_imgs_enemies_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _imgs_background_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./imgs/background.png */ "./src/imgs/background.png");
/* harmony import */ var _imgs_background_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_imgs_background_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _imgs_thank_you_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imgs/thank_you.png */ "./src/imgs/thank_you.png");
/* harmony import */ var _imgs_thank_you_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_imgs_thank_you_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _imgs_super_mario_world_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./imgs/super-mario-world.png */ "./src/imgs/super-mario-world.png");
/* harmony import */ var _imgs_super_mario_world_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_imgs_super_mario_world_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _audio_music_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./audio/music.mp3 */ "./src/audio/music.mp3");
/* harmony import */ var _audio_music_mp3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_audio_music_mp3__WEBPACK_IMPORTED_MODULE_6__);







var backgroundImage = new Image();
backgroundImage.src = _imgs_background_assets_png__WEBPACK_IMPORTED_MODULE_0___default.a;
var thanksImage = new Image();
thanksImage.src = _imgs_thank_you_png__WEBPACK_IMPORTED_MODULE_4___default.a;
var titleScreenImage = new Image();
titleScreenImage.src = _imgs_super_mario_world_png__WEBPACK_IMPORTED_MODULE_5___default.a;
var backgroundFirstLayerImage = new Image();
backgroundFirstLayerImage.src = _imgs_background_png__WEBPACK_IMPORTED_MODULE_3___default.a;
var music = new Audio(_audio_music_mp3__WEBPACK_IMPORTED_MODULE_6___default.a);
var marioImage = new Image();
marioImage.src = _imgs_mario_png__WEBPACK_IMPORTED_MODULE_1___default.a;
var enemiesImage = new Image();
enemiesImage.src = _imgs_enemies_png__WEBPACK_IMPORTED_MODULE_2___default.a;

/***/ }),

/***/ "./src/game/Collider.js":
/*!******************************!*\
  !*** ./src/game/Collider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Collider; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Collider =
/*#__PURE__*/
function () {
  function Collider(tileMap) {
    _classCallCheck(this, Collider);

    this.tileMap = tileMap;
    this.tileSize = 29;
    this.handleMatchingTiles = this.handleMatchingTiles;
  }

  _createClass(Collider, [{
    key: "checkX",
    value: function checkX(gameObj) {
      if (gameObj.status === "ignoreCollisions") return;

      if (gameObj.pos.x < 0) {
        gameObj.pos.x = 0;
        gameObj.vel.x = 0;
      }

      var x;

      if (gameObj.vel.x > 0) {
        x = gameObj.getRight(); //mario right side
      } else if (gameObj.vel.x < 0) {
        x = gameObj.pos.x; //mario bottom side
      } else {
        return;
      }

      var matchingTiles = this.findMatchingTiles(x, x, gameObj.pos.y, gameObj.getBottom());
      this.handleMatchingTilesX(gameObj, matchingTiles);
    }
  }, {
    key: "handleMatchingTilesX",
    value: function handleMatchingTilesX(gameObj, matchingTiles) {
      var _this = this;

      matchingTiles.forEach(function (match) {
        if (match.tile.type === "ground" || match.tile.type === "box") {
          _this.handleGroundCollisionX(gameObj, match); // } else if (match.tile.type === "floatingPlatform") {
          //no x detection needed for floating platform

        }
      });
    }
  }, {
    key: "handleGroundCollisionX",
    value: function handleGroundCollisionX(gameObj, match) {
      if (gameObj.vel.x > 0) {
        if (gameObj.getRight() > match.left) {
          gameObj.pos.x = match.left - gameObj.width;
          gameObj.vel.x = 0;
        }
      }

      if (gameObj.vel.x < 0) {
        if (gameObj.pos.x < match.right) {
          gameObj.pos.x = match.right;
          gameObj.vel.x = 0;
        }
      }
    }
  }, {
    key: "checkY",
    value: function checkY(gameObj) {
      var y; // 3 cases of velocity 

      if (gameObj.vel.y === 0 || gameObj.status === "ignoreCollisions") {
        return;
      } else if (gameObj.vel.y > 0) {
        //object moving down, check bottom of object
        y = gameObj.getBottom();
      } else if (gameObj.vel.y < 0) {
        //object moving up, check top of object
        y = gameObj.pos.y;
      }

      var xStart = gameObj.pos.x;
      var xEnd = gameObj.getRight();
      var matchingTiles = this.findMatchingTiles(xStart, xEnd, y, y);
      this.handleMatchingTilesY(gameObj, matchingTiles);
    }
  }, {
    key: "handleMatchingTilesY",
    value: function handleMatchingTilesY(gameObj, matchingTiles) {
      var _this2 = this;

      matchingTiles.forEach(function (match) {
        if (match.tile.type === "ground") {
          _this2.handleGroundCollisionY(gameObj, match);
        } else if (match.tile.type === "floatingPlatform" || match.tile.type === "box") {
          _this2.handleFloatingPlatformY(gameObj, match);
        }
      });
    }
  }, {
    key: "handleGroundCollisionY",
    value: function handleGroundCollisionY(gameObj, match) {
      if (gameObj.vel.y > 0) {
        if (gameObj.getBottom() > match.top) {
          gameObj.pos.y = match.top - gameObj.height;
          gameObj.vel.y = 0;
          gameObj.isGrounded = true;
        }
      }

      if (gameObj.vel.y < 0) {
        if (gameObj.pos.y < match.bottom) {
          gameObj.pos.y = match.bottom;
          gameObj.vel.y = 0;
          if (gameObj.jump) gameObj.jump.cancel();
        }
      }
    }
  }, {
    key: "handleFloatingPlatformY",
    value: function handleFloatingPlatformY(gameObj, match) {
      if (gameObj.vel.y > 0) {
        if (gameObj.getBottom() > match.top && gameObj.getLastBottom() <= match.top) {
          gameObj.pos.y = match.top - gameObj.height;
          gameObj.vel.y = 0;
          gameObj.isGrounded = true;
        }
      }
    }
  }, {
    key: "findMatchingTiles",
    value: function findMatchingTiles(left, right, top, bottom) {
      var _this3 = this;

      var matchingTiles = [];
      this.toIndexRange(left, right).forEach(function (indexX) {
        _this3.toIndexRange(top, bottom).forEach(function (indexY) {
          var match = _this3.getByIndex(indexX, indexY);

          if (match) {
            matchingTiles.push(match);
          }
        });
      });
      return matchingTiles;
    }
  }, {
    key: "toIndexRange",
    value: function toIndexRange(pos1, pos2) {
      var posMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
      var range = [];
      var pos = pos1;

      do {
        range.push(Math.floor(pos / this.tileSize));
        pos += this.tileSize;
      } while (pos < posMax);

      return range;
    }
  }, {
    key: "getByIndex",
    value: function getByIndex(indexX, indexY) {
      var tile;
      if (this.tileMap[indexX]) tile = this.tileMap[indexX][indexY];

      if (tile) {
        // top left corner, bottom right corner
        var left = indexX * this.tileSize;
        var right = left + this.tileSize;
        var top = indexY * this.tileSize;
        var bottom = top + this.tileSize;
        return {
          tile: tile,
          left: left,
          right: right,
          top: top,
          bottom: bottom
        };
      }
    }
  }]);

  return Collider;
}();



/***/ }),

/***/ "./src/game/Game.js":
/*!**************************!*\
  !*** ./src/game/Game.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _objects_Mario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/Mario */ "./src/game/objects/Mario.js");
/* harmony import */ var _objects_Dragon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/Dragon */ "./src/game/objects/Dragon.js");
/* harmony import */ var _objects_Bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objects/Bullet */ "./src/game/objects/Bullet.js");
/* harmony import */ var _objects_Mystery_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objects/Mystery_Box */ "./src/game/objects/Mystery_Box.js");
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collider */ "./src/game/Collider.js");
/* harmony import */ var _display_tilemap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../display/tilemap */ "./src/display/tilemap.js");
/* harmony import */ var _behaviors_Spawn_Enemies__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./behaviors/Spawn_Enemies */ "./src/game/behaviors/Spawn_Enemies.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var Game =
/*#__PURE__*/
function () {
  function Game(height, width) {
    _classCallCheck(this, Game);

    this.height = height;
    this.width = width;
    this.gravity = 20;
    this.objects = new Set();
    this.mario = new _objects_Mario__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.objects.add(this.mario);
    this.addSpawns();
    this.restarting = false;
    this.totalTime = 0;
    this.tileMap = [];
    this.tileSize = 29;
    this.collider = new _Collider__WEBPACK_IMPORTED_MODULE_4__["default"](this.tileMap);
    this.setTilemapLayer = this.setTilemapLayer.bind(this);
    this.cameraView = this.cameraView.bind(this);
    this.restartLevel = this.restartLevel.bind(this);
    this.checkEnemyCollision = this.checkEnemyCollision.bind(this);
    this.setTilemapLayer();
  }

  _createClass(Game, [{
    key: "update",
    value: function update(deltaTime) {
      var _this = this;

      this.objects.forEach(function (object) {
        object.update(deltaTime, _this.totalTime, _this.objects); //updates velocities

        object.frames = (object.frames + 1) % 60;
        object.lastPos.x = object.pos.x;
        object.lastPos.y = object.pos.y;
        object.pos.x += object.vel.x * deltaTime;

        _this.collider.checkX(object);

        object.vel.y += _this.gravity;
        object.pos.y += object.vel.y * deltaTime;

        _this.collider.checkY(object);

        if (object !== _this.mario) _this.checkEnemyCollision(object);
      });
      this.totalTime += deltaTime;
    }
  }, {
    key: "checkEnemyCollision",
    value: function checkEnemyCollision(object) {
      if (this.mario.overlaps(object)) {
        object.collides(this.mario);
      }
    }
  }, {
    key: "addSpawns",
    value: function addSpawns() {
      var enemies = new Set();
      var newEnemy;
      _display_tilemap__WEBPACK_IMPORTED_MODULE_5__["default"].enemies.forEach(function (enemy) {
        if (enemy.name === "dragon") {
          newEnemy = new _objects_Dragon__WEBPACK_IMPORTED_MODULE_1__["default"](enemy.x, enemy.y, //initial spawn
          enemy.x1Limit, enemy.x2Limit // walk path
          );
        } else if (enemy.name === "bullet") {
          newEnemy = new _objects_Bullet__WEBPACK_IMPORTED_MODULE_2__["default"](enemy.x, enemy.y //initial spawn
          );
        }

        newEnemy.trigger = enemy.trigger;
        enemies.add(newEnemy);
      });
      this.mario.addBehavior(new _behaviors_Spawn_Enemies__WEBPACK_IMPORTED_MODULE_6__["default"](this.objects, enemies));
    }
  }, {
    key: "setTilemapLayer",
    value: function setTilemapLayer() {
      var _this2 = this;

      _display_tilemap__WEBPACK_IMPORTED_MODULE_5__["default"].backgrounds.forEach(function (background) {
        background.ranges.forEach(function (range) {
          var _range = _slicedToArray(range, 4),
              xStart = _range[0],
              xLength = _range[1],
              yStart = _range[2],
              yLength = _range[3];

          var xEnd = xStart + xLength;
          var yEnd = yStart + yLength;

          for (var x = xStart; x < xEnd; x++) {
            for (var y = yStart; y < yEnd; y++) {
              var tile = {
                name: background.tile,
                type: background.type
              };

              _this2.setTile(x, y, tile);

              if (background.tile === "mysteryBox") {
                var box = new _objects_Mystery_Box__WEBPACK_IMPORTED_MODULE_3__["default"](x, y, tile);

                _this2.objects.add(box);
              }
            }
          }
        });
      });
    }
  }, {
    key: "restartLevel",
    value: function restartLevel(camera) {
      var _this3 = this;

      if (this.mario.status === "ignoreCollisions" && !this.restarting) {
        this.restarting = true;
        var game = this;
        setTimeout(function () {
          game.removeEnemies();
          game.mario.lives = 1;
          game.mario.pos.set(145, 100);
          game.mario.invincible.cancel();
          camera.pos.x = 0;
          game.addSpawns();

          _this3.setTilemapLayer();

          game.restarting = false;
        }, 1500);
      }
    }
  }, {
    key: "removeEnemies",
    value: function removeEnemies() {
      var _this4 = this;

      this.objects.forEach(function (object) {
        if (object !== _this4.mario) _this4.objects["delete"](object);
      });
    }
  }, {
    key: "setTile",
    value: function setTile(x, y, tile) {
      if (!this.tileMap[x]) this.tileMap[x] = [];
      this.tileMap[x][y] = tile;
    }
  }, {
    key: "getTile",
    value: function getTile(x, y) {
      if (this.tileMap[x]) return this.tileMap[x][y];
    }
  }, {
    key: "cameraView",
    value: function cameraView(camera, backgroundSpriteSheet) {
      var _this5 = this;

      // center camera on mario
      //scrolling commented out for testing
      this.restartLevel(camera);

      if (this.mario.pos.x > 300 && this.mario.frame !== "lose") {
        camera.pos.x = this.mario.pos.x - 300;
      }

      var cameraPanel = document.createElement('canvas');
      cameraPanel.width = camera.width + this.tileSize;
      cameraPanel.height = camera.height;
      var panelCtx = cameraPanel.getContext('2d'); // first need to figure out what tile columns to draw

      var columnStart = this.getTileIndex(camera.pos.x);
      var columnEnd = columnStart + this.getTileIndex(camera.width); // draw what the camera is focusing on

      var _loop = function _loop(x) {
        var column = _this5.tileMap[x];

        if (column) {
          column.forEach(function (tile, y) {
            if (tile.name === "mysteryBox") {
              backgroundSpriteSheet.draw("transparent", panelCtx, (x - columnStart) * _this5.tileSize, y * _this5.tileSize);
            } else {
              backgroundSpriteSheet.draw(tile.name, panelCtx, (x - columnStart) * _this5.tileSize, y * _this5.tileSize);
            }
          });
        }
      };

      for (var x = columnStart; x <= columnEnd; x++) {
        _loop(x);
      }

      var marioPosX = this.getTileIndex(this.mario.pos.x) + 1;
      var marioPosY = this.getTileIndex(this.mario.pos.y) + 1;
      var tileName = this.getTile(marioPosX, marioPosY);
      if (tileName) tileName = tileName.name; // console.log("x: ", marioPosX, ", y: ", marioPosY, ", tilename: ", tileName);
      //draw camera by pixel for a smooth transition

      return cameraPanel;
    }
  }, {
    key: "getTileIndex",
    value: function getTileIndex(pos) {
      return Math.floor(pos / this.tileSize);
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./src/game/behaviors/Auto_Move.js":
/*!*****************************************!*\
  !*** ./src/game/behaviors/Auto_Move.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoMove; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var AutoMove =
/*#__PURE__*/
function (_Behavior) {
  _inherits(AutoMove, _Behavior);

  function AutoMove() {
    var _this;

    var moveLeftLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var moveRightLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9999999;
    var startingDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

    _classCallCheck(this, AutoMove);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoMove).call(this, 'autoMove'));
    _this.startingDirection = startingDirection;
    _this.moveLeftLimit = moveLeftLimit;
    _this.moveRightLimit = moveRightLimit;
    return _this;
  }

  _createClass(AutoMove, [{
    key: "update",
    value: function update(object, deltaTime) {
      //100 left limit
      // pos.x = 200
      // 300 right limit
      // if (object.frame === "mushroom") debugger
      if (object.pos.x < this.moveLeftLimit) {
        object.vel.x = object.speed * deltaTime;
      } else if (object.pos.x > this.moveRightLimit) {
        object.vel.x = -object.speed * deltaTime;
      } else if (object.vel.x === 0) {
        object.vel.x = this.startingDirection * object.speed * deltaTime;
      } // object.vel.x = this.speed * this.direction * deltaTime;

    }
  }]);

  return AutoMove;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/behaviors/Behavior.js":
/*!****************************************!*\
  !*** ./src/game/behaviors/Behavior.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Behavior; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Behavior =
/*#__PURE__*/
function () {
  function Behavior(name) {
    _classCallCheck(this, Behavior);

    this.name = name;
  }

  _createClass(Behavior, [{
    key: "update",
    value: function update() {
      console.warn("You forgot to update ".concat(this.name, " behavior"));
    }
  }]);

  return Behavior;
}();



/***/ }),

/***/ "./src/game/behaviors/Box_Jump.js":
/*!****************************************!*\
  !*** ./src/game/behaviors/Box_Jump.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoxJump; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var BoxJump =
/*#__PURE__*/
function (_Behavior) {
  _inherits(BoxJump, _Behavior);

  function BoxJump() {
    var _this;

    _classCallCheck(this, BoxJump);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BoxJump).call(this, 'boxJump'));
    _this.maxDuration = 0.1;
    _this.vel = 150;
    _this.duration = 0;
    return _this;
  }

  _createClass(BoxJump, [{
    key: "start",
    value: function start() {
      this.duration = this.maxDuration;
    }
  }, {
    key: "update",
    value: function update(box, deltaTime, objects) {
      if (this.duration > 0) {
        box.vel.y = -this.vel;
        this.duration -= deltaTime;
      }

      if (box.vel.y > 0) {
        if (box.getTop() > box.originalPos) {
          box.pos.y = box.originalPos;
          box.vel.y = 0;

          if (this.duration < 0) {
            box.setToTile(objects);
            objects["delete"](box);
          }
        }
      }
    }
  }]);

  return BoxJump;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/behaviors/Ignore_Gravity.js":
/*!**********************************************!*\
  !*** ./src/game/behaviors/Ignore_Gravity.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IgnoreGravity; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var IgnoreGravity =
/*#__PURE__*/
function (_Behavior) {
  _inherits(IgnoreGravity, _Behavior);

  function IgnoreGravity() {
    var _this;

    _classCallCheck(this, IgnoreGravity);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IgnoreGravity).call(this, 'ignoreGravity'));
    _this.gravity = 20;
    return _this;
  }

  _createClass(IgnoreGravity, [{
    key: "update",
    value: function update(object, deltaTime) {
      object.vel.y -= this.gravity;
    }
  }]);

  return IgnoreGravity;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/behaviors/Invincible.js":
/*!******************************************!*\
  !*** ./src/game/behaviors/Invincible.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Invincible; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Invincible =
/*#__PURE__*/
function (_Behavior) {
  _inherits(Invincible, _Behavior);

  function Invincible() {
    var _this;

    _classCallCheck(this, Invincible);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Invincible).call(this, 'invincible'));
    _this.maxDuration = 2;
    _this.duration = 0;
    return _this;
  }

  _createClass(Invincible, [{
    key: "start",
    value: function start() {
      this.duration = this.maxDuration;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.duration = 0;
    }
  }, {
    key: "update",
    value: function update(mario, deltaTime) {
      if (this.duration > 0) {
        mario.invinciblity = true;
        this.duration -= deltaTime;
      } else {
        mario.invinciblity = false;
      }
    }
  }]);

  return Invincible;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/behaviors/Jump.js":
/*!************************************!*\
  !*** ./src/game/behaviors/Jump.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Jump; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Jump =
/*#__PURE__*/
function (_Behavior) {
  _inherits(Jump, _Behavior);

  function Jump() {
    var _this;

    _classCallCheck(this, Jump);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Jump).call(this, 'jump'));
    _this.maxDuration = 0.2;
    _this.vel = 300;
    _this.duration = 0;
    _this.isGrounded = true;
    return _this;
  }

  _createClass(Jump, [{
    key: "start",
    value: function start() {
      if (this.isGrounded) this.duration = this.maxDuration;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.isGrounded = false;
      this.duration = 0;
    }
  }, {
    key: "update",
    value: function update(mario, deltaTime) {
      if (mario.frame === "lose") return;

      if (this.duration > 0) {
        mario.vel.y = -this.vel;
        this.duration -= deltaTime;
      }

      if (mario.isGrounded) this.isGrounded = true;
    }
  }]);

  return Jump;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/behaviors/Jump_On_Lose.js":
/*!********************************************!*\
  !*** ./src/game/behaviors/Jump_On_Lose.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JumpOnLose; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var JumpOnLose =
/*#__PURE__*/
function (_Behavior) {
  _inherits(JumpOnLose, _Behavior);

  function JumpOnLose() {
    var _this;

    _classCallCheck(this, JumpOnLose);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JumpOnLose).call(this, 'jumpOnLose'));
    _this.maxDuration = 0.3;
    _this.vel = 300;
    _this.duration = 0;
    return _this;
  }

  _createClass(JumpOnLose, [{
    key: "start",
    value: function start() {
      this.duration = this.maxDuration;
    }
  }, {
    key: "update",
    value: function update(mario, deltaTime) {
      if (this.duration > 0) {
        mario.vel.y = -this.vel;
        this.duration -= deltaTime;
      }
    }
  }]);

  return JumpOnLose;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/behaviors/Spawn_Enemies.js":
/*!*********************************************!*\
  !*** ./src/game/behaviors/Spawn_Enemies.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpawnEnemies; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var SpawnEnemies =
/*#__PURE__*/
function (_Behavior) {
  _inherits(SpawnEnemies, _Behavior);

  function SpawnEnemies(gameObjects, enemies) {
    var _this;

    _classCallCheck(this, SpawnEnemies);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpawnEnemies).call(this, 'spawnEnemies'));
    _this.enemies = enemies;
    _this.gameObjects = gameObjects;
    return _this;
  }

  _createClass(SpawnEnemies, [{
    key: "update",
    value: function update(mario, deltaTime) {
      var _this2 = this;

      this.enemies.forEach(function (enemy) {
        if (mario.pos.x >= enemy.trigger) _this2.spawnEnemy(enemy);
      });
    }
  }, {
    key: "addEnemy",
    value: function addEnemy(enemy) {
      this.enemyPositions.add(enemy);
    }
  }, {
    key: "spawnEnemy",
    value: function spawnEnemy(enemy) {
      this.gameObjects.add(enemy);
      this.enemies["delete"](enemy);
    }
  }]);

  return SpawnEnemies;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]); // this.objects.add(dragon);
// this.objects.add(bullet);




/***/ }),

/***/ "./src/game/behaviors/Stomp.js":
/*!*************************************!*\
  !*** ./src/game/behaviors/Stomp.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stomp; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Stomp =
/*#__PURE__*/
function (_Behavior) {
  _inherits(Stomp, _Behavior);

  function Stomp() {
    var _this;

    _classCallCheck(this, Stomp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stomp).call(this, 'stomp'));
    _this.bouncing = false;
    _this.bounceSpeed = 400;
    return _this;
  }

  _createClass(Stomp, [{
    key: "bounce",
    value: function bounce() {
      this.bouncing = true;
    }
  }, {
    key: "update",
    value: function update(mario) {
      if (this.bouncing) {
        mario.vel.y = -this.bounceSpeed;
        this.bouncing = false;
      }
    }
  }]);

  return Stomp;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/behaviors/Walk.js":
/*!************************************!*\
  !*** ./src/game/behaviors/Walk.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Walk; });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/game/behaviors/Behavior.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Walk =
/*#__PURE__*/
function (_Behavior) {
  _inherits(Walk, _Behavior);

  function Walk() {
    var _this;

    _classCallCheck(this, Walk);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Walk).call(this, 'walk'));
    _this.leftDirection = 0;
    _this.rightDirection = 0;
    _this.speed = 10000;
    _this.distance = 0;
    return _this;
  }

  _createClass(Walk, [{
    key: "update",
    value: function update(mario, deltaTime) {
      if (mario.frame === "lose") return;
      mario.vel.x = (this.leftDirection + this.rightDirection) * this.speed * deltaTime;
      this.distance += mario.vel.x; // mario.vel.x = this.speed * this.direction * deltaTime;
    }
  }]);

  return Walk;
}(_Behavior__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/objects/Bullet.js":
/*!************************************!*\
  !*** ./src/game/objects/Bullet.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bullet; });
/* harmony import */ var _Game_Object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game_Object */ "./src/game/objects/Game_Object.js");
/* harmony import */ var _behaviors_Ignore_Gravity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../behaviors/Ignore_Gravity */ "./src/game/behaviors/Ignore_Gravity.js");
/* harmony import */ var _behaviors_Auto_Move__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../behaviors/Auto_Move */ "./src/game/behaviors/Auto_Move.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Bullet =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Bullet, _GameObject);

  function Bullet(xSpawn, ySpawn) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this));

    _this.pos.set(xSpawn, ySpawn);

    _this.initialPos = xSpawn;
    _this.width = 140;
    _this.height = 128;

    _this.addBehavior(new _behaviors_Ignore_Gravity__WEBPACK_IMPORTED_MODULE_1__["default"]());

    _this.addBehavior(new _behaviors_Auto_Move__WEBPACK_IMPORTED_MODULE_2__["default"]());

    _this.frame = "bulletLeft";
    _this.status = "ignoreCollisions";
    _this.falling = false;
    _this.speed = 10000;
    return _this;
  }

  _createClass(Bullet, [{
    key: "update",
    value: function update(deltaTime, totalTime, objects) {
      var _this2 = this;

      this.behaviors.forEach(function (behavior) {
        behavior.update(_this2, deltaTime); //takes in object and deltaTime
      });
      if (this.pos.x < this.initialPos - 1200 || this.pos.y > 400) objects["delete"](this);
    }
  }, {
    key: "collides",
    value: function collides(mario) {
      if (mario.invinciblity) return;

      if (!this.falling) {
        if (mario.vel.y > this.vel.y && mario.getBottom() > this.getTop() && mario.getLastBottom() <= this.getTop()) {
          mario.stomp.bounce();
          this.vel.y += 40;
          this.vel.x = 0;
          this.removeBehavior("ignoreGravity");
          this.removeBehavior("autoMove");
          this.falling = true;
        } else {
          mario.lives -= 1;
          mario.invincible.start();
          mario.invinciblity = true;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, spriteSheets, camera) {
      spriteSheets.get("bullet").draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    }
  }]);

  return Bullet;
}(_Game_Object__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/objects/Dragon.js":
/*!************************************!*\
  !*** ./src/game/objects/Dragon.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dragon; });
/* harmony import */ var _Game_Object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game_Object */ "./src/game/objects/Game_Object.js");
/* harmony import */ var _behaviors_Auto_Move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../behaviors/Auto_Move */ "./src/game/behaviors/Auto_Move.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Dragon =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Dragon, _GameObject);

  function Dragon(xSpawn, ySpawn, moveLeftLimit, moveRightLimit) {
    var _this;

    _classCallCheck(this, Dragon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dragon).call(this));

    _this.pos.set(xSpawn, ySpawn);

    _this.width = 43;
    _this.height = 63;
    _this.speed = 8000;

    _this.addBehavior(new _behaviors_Auto_Move__WEBPACK_IMPORTED_MODULE_1__["default"](moveLeftLimit, moveRightLimit));

    _this.stompedCount = 0;
    _this.status = "dragonRegular";
    _this.facing = "left";
    _this.frame = "regularWalkLeft1";
    _this.regularWalkLeftFrames = ["regularWalkLeft1", "regularWalkLeft2"];
    _this.regularWalkRightFrames = ["regularWalkRight1", "regularWalkRight2"];
    _this.halfWalkLeftFrames = ["halfFlattenedWalkLeft1", "halfFlattenedWalkLeft2"];
    _this.halfWalkRightFrames = ["halfFlattenedWalkRight1", "halfFlattenedWalkRight2"];
    return _this;
  }

  _createClass(Dragon, [{
    key: "collides",
    value: function collides(mario) {
      if (mario.invinciblity) return;

      if (this.stompedCount !== 2) {
        if (mario.vel.y > this.vel.y) {
          mario.stomp.bounce();
          this.stompedCount += 1;
        } else {
          mario.lives -= 1;
          mario.invincible.start();
          mario.invinciblity = true;
        }
      }
    }
  }, {
    key: "update",
    value: function update(deltaTime, totalTime, objects) {
      var _this2 = this;

      this.behaviors.forEach(function (behavior) {
        behavior.update(_this2, deltaTime); //takes in object and deltaTime
      });
      this.decideStatus(totalTime, objects);
    }
  }, {
    key: "decideStatus",
    value: function decideStatus(totalTime, objects) {
      var _this3 = this;

      if (this.stompedCount === 2 && this.speed !== 0) {
        setTimeout(function () {
          objects["delete"](_this3);
        }, 5000);
        this.speed = 0;
        this.vel.x = 0;
        this.status = "dragonFlattened";
        this.width = 43;
        this.height = 20;
        this.frame = this.facing === "left" ? "flattenedLeft" : "flattenedRight";
      } else if (this.stompedCount === 1) {
        this.status = "dragonHalfFlattened";
        this.width = 43;
        this.height = 34;
        this.facing = this.vel.x > 0 ? "right" : "left";
        var frames = this.facing === "left" ? this.halfWalkLeftFrames : this.halfWalkRightFrames;
        this.frame = this.animationFrame(frames, totalTime, 0.20);
      } else if (this.stompedCount === 0) {
        this.facing = this.vel.x > 0 ? "right" : "left";

        var _frames = this.facing === "left" ? this.regularWalkLeftFrames : this.regularWalkRightFrames;

        this.frame = this.animationFrame(_frames, totalTime, 0.20);
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, spriteSheets, camera) {
      spriteSheets.get(this.status).draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    }
  }]);

  return Dragon;
}(_Game_Object__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/objects/Game_Object.js":
/*!*****************************************!*\
  !*** ./src/game/objects/Game_Object.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameObject; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./src/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GameObject =
/*#__PURE__*/
function () {
  function GameObject() {
    _classCallCheck(this, GameObject);

    this.behaviors = [];
    this.vel = new _util__WEBPACK_IMPORTED_MODULE_0__["Vector"]();
    this.pos = new _util__WEBPACK_IMPORTED_MODULE_0__["Vector"]();
    this.lastPos = new _util__WEBPACK_IMPORTED_MODULE_0__["Vector"]();
    this.width = 0;
    this.height = 0;
    this.isGrounded = true;
    this.frames = 0;
    this.trigger = 0;
  } // top and left positions of object are already defined by pos.x and pos.y


  _createClass(GameObject, [{
    key: "getRight",
    value: function getRight() {
      return this.pos.x + this.width;
    }
  }, {
    key: "getLeft",
    value: function getLeft() {
      return this.pos.x;
    }
  }, {
    key: "getTop",
    value: function getTop() {
      return this.pos.y;
    }
  }, {
    key: "getBottom",
    value: function getBottom() {
      return this.pos.y + this.height;
    }
  }, {
    key: "getLastBottom",
    value: function getLastBottom() {
      return this.lastPos.y + this.height;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      var _this = this;

      this.behaviors.forEach(function (behavior) {
        behavior.update(_this, deltaTime); //takes in object and deltaTime
      });
    }
  }, {
    key: "addBehavior",
    value: function addBehavior(behavior) {
      this.behaviors.push(behavior);
      this[behavior.name] = behavior;
    }
  }, {
    key: "removeBehavior",
    value: function removeBehavior(behavior) {
      var _this2 = this;

      this.behaviors.forEach(function (beh, idx) {
        if (beh.name === behavior) _this2.behaviors.splice(idx, 1);
      });
    }
  }, {
    key: "animationFrame",
    value: function animationFrame(frames, totalTime, frameRate) {
      var frameIdx = Math.floor(totalTime / frameRate) % frames.length;
      return frames[frameIdx];
    }
  }, {
    key: "draw",
    value: function draw(spriteSheets, camera) {}
  }, {
    key: "collides",
    value: function collides(object) {}
  }]);

  return GameObject;
}();



/***/ }),

/***/ "./src/game/objects/Mario.js":
/*!***********************************!*\
  !*** ./src/game/objects/Mario.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mario; });
/* harmony import */ var _Game_Object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game_Object */ "./src/game/objects/Game_Object.js");
/* harmony import */ var _behaviors_Jump__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../behaviors/Jump */ "./src/game/behaviors/Jump.js");
/* harmony import */ var _behaviors_Jump_On_Lose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../behaviors/Jump_On_Lose */ "./src/game/behaviors/Jump_On_Lose.js");
/* harmony import */ var _behaviors_Walk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../behaviors/Walk */ "./src/game/behaviors/Walk.js");
/* harmony import */ var _behaviors_Stomp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../behaviors/Stomp */ "./src/game/behaviors/Stomp.js");
/* harmony import */ var _behaviors_Invincible__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../behaviors/Invincible */ "./src/game/behaviors/Invincible.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Mario =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Mario, _GameObject);

  function Mario() {
    var _this;

    _classCallCheck(this, Mario);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mario).call(this));
    _this.width = 29;
    _this.height = 40;
    _this.lives = 1;
    _this.invinciblity = false;

    _this.addBehavior(new _behaviors_Jump__WEBPACK_IMPORTED_MODULE_1__["default"]());

    _this.JumpOnLose = new _behaviors_Jump_On_Lose__WEBPACK_IMPORTED_MODULE_2__["default"]();

    _this.addBehavior(_this.JumpOnLose);

    _this.addBehavior(new _behaviors_Walk__WEBPACK_IMPORTED_MODULE_3__["default"]());

    _this.addBehavior(new _behaviors_Stomp__WEBPACK_IMPORTED_MODULE_4__["default"]());

    _this.addBehavior(new _behaviors_Invincible__WEBPACK_IMPORTED_MODULE_5__["default"]());

    _this.status = "idle"; //other statuses are walking, jumping 

    _this.mario = "regularMario";
    _this.facing = "right";
    _this.frame = "idleRight";
    _this.walkRightFrames = ["walkingRight", "idleRight"];
    _this.walkRightFramesMushroom = ["walkingRight1", "walkingRight2", "idleRight"];
    _this.walkLeftFrames = ["walkingLeft", "idleLeft"];
    _this.walkLeftFramesMushroom = ["walkingLeft1", "walkingLeft2", "idleLeft"];
    return _this;
  }

  _createClass(Mario, [{
    key: "update",
    value: function update(deltaTime, totalTime) {
      var _this2 = this;

      this.behaviors.forEach(function (behavior) {
        behavior.update(_this2, deltaTime); //takes in object and deltaTime
      });
      this.decideStatus(totalTime);
    }
  }, {
    key: "decideStatus",
    value: function decideStatus(totalTime) {
      if (this.pos.y > 400) this.lives = 0;

      if (this.lives === 0) {
        this.width = 29;
        this.height = 40;
        this.mario = "regularMario";
        this.status = "ignoreCollisions";
        if (this.status === "ignoreCollisions" && this.frame !== "lose") this.JumpOnLose.start();
        this.frame = "lose";
        return;
      } else if (this.lives === 1) {
        this.width = 29;
        this.height = 40;
        this.mario = "regularMario";
      } else if (this.lives === 2) {
        this.width = 34;
        this.height = 56;
        this.mario = "mushroomMario";
      }

      if (!this.isGrounded) {
        if (this.mario === "regularMario" || this.vel.y < 0) {
          this.status = "jumping";

          if (this.vel.x > 0) {
            this.facing = "right";
            this.frame = "jumpingRight";
          } else if (this.vel.x === 0) {
            this.frame = this.facing === "right" ? "jumpingRight" : "jumpingLeft";
          } else {
            this.facing = "left";
            this.frame = "jumpingLeft";
          }
        } else {
          this.status = "falling";

          if (this.vel.x > 0) {
            this.facing = "right";
            this.frame = "fallingRight";
          } else if (this.vel.x === 0) {
            this.frame = this.facing === "right" ? "fallingRight" : "fallingLeft";
          } else {
            this.facing = "left";
            this.frame = "fallingLeft";
          }
        }
      } else if (this.vel.x > 0) {
        this.status = "walking";
        this.facing = "right";
        var totalDistance = Math.abs(this.walk.distance / 800);

        if (this.lives === 2) {
          var frameIdx = Math.floor(totalDistance % this.walkRightFramesMushroom.length);
          this.frame = this.walkRightFramesMushroom[frameIdx];
        } else {
          var _frameIdx = Math.floor(totalDistance % this.walkRightFrames.length);

          this.frame = this.walkRightFrames[_frameIdx];
        }
      } else if (this.vel.x < 0) {
        this.status = "walking";
        this.facing = "left";

        var _totalDistance = Math.abs(this.walk.distance / 800);

        if (this.lives === 2) {
          var _frameIdx2 = Math.floor(_totalDistance % this.walkLeftFramesMushroom.length);

          this.frame = this.walkLeftFramesMushroom[_frameIdx2];
        } else {
          var _frameIdx3 = Math.floor(_totalDistance % this.walkLeftFrames.length);

          this.frame = this.walkLeftFrames[_frameIdx3];
        }
      } else {
        if (this.status === "idle") return;

        if (this.facing === "right") {
          this.frame = "idleRight";
          this.status = "idle";
        } else if (this.facing === "left") {
          this.frame = "idleLeft";
          this.status = "idle";
        }
      }

      if (this.invinciblity && this.lives === 1) {
        if (Math.floor(totalTime / 0.2) % 2) this.frame = "transparent";
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, spriteSheets, camera) {
      // ctx.strokeStyle = 'red';
      // ctx.beginPath();
      // ctx.rect(this.pos.x - camera.pos.x, 
      //     this.pos.y - camera.pos.y,
      //     this.width, this.height);
      // ctx.stroke();
      // if(this.invinciblity) {
      //     spriteSheets.get(this.mario).draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
      // } else {
      spriteSheets.get(this.mario).draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y); // }
    }
  }, {
    key: "overlaps",
    value: function overlaps(object) {
      return this.getBottom() > object.getTop() && this.getTop() < object.getBottom() && this.getLeft() < object.getRight() && this.getRight() > object.getLeft();
    }
  }]);

  return Mario;
}(_Game_Object__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/objects/Mushroom.js":
/*!**************************************!*\
  !*** ./src/game/objects/Mushroom.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mushroom; });
/* harmony import */ var _Game_Object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game_Object */ "./src/game/objects/Game_Object.js");
/* harmony import */ var _behaviors_Auto_Move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../behaviors/Auto_Move */ "./src/game/behaviors/Auto_Move.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Mushroom =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Mushroom, _GameObject);

  function Mushroom(x, y) {
    var _this;

    _classCallCheck(this, Mushroom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mushroom).call(this));
    _this.width = 29;
    _this.height = 29;
    _this.pos.x = x;
    _this.pos.y = y - _this.height;
    _this.frame = "mushroom";
    _this.status = "spawning";
    _this.speed = 5000;

    _this.addBehavior(new _behaviors_Auto_Move__WEBPACK_IMPORTED_MODULE_1__["default"](400, 700, 1));

    _this.mushroomSpawn = ["mushroom1", "mushroom2", "mushroom3", "mushroom"];
    return _this;
  }

  _createClass(Mushroom, [{
    key: "collides",
    value: function collides(mario) {
      mario.lives = 2;
      this.status = "delete";
    }
  }, {
    key: "update",
    value: function update(deltaTime, totalTime, objects) {
      var _this2 = this;

      this.behaviors.forEach(function (behavior) {
        behavior.update(_this2, deltaTime, objects); //takes in object and deltaTime
      });
      this.decideStatus(totalTime, objects);
    }
  }, {
    key: "decideStatus",
    value: function decideStatus(totalTime, objects) {
      if (this.status === "spawning") {// this.frame = this.animationFrame(this.mushroomSpawn, totalTime, 0.20);
      } else if (this.status === "delete") {
        objects["delete"](this);
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, spriteSheets, camera) {
      spriteSheets.get("background").draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    }
  }]);

  return Mushroom;
}(_Game_Object__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/game/objects/Mystery_Box.js":
/*!*****************************************!*\
  !*** ./src/game/objects/Mystery_Box.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MysteryBox; });
/* harmony import */ var _Game_Object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game_Object */ "./src/game/objects/Game_Object.js");
/* harmony import */ var _behaviors_Box_Jump__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../behaviors/Box_Jump */ "./src/game/behaviors/Box_Jump.js");
/* harmony import */ var _Mushroom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Mushroom */ "./src/game/objects/Mushroom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var MysteryBox =
/*#__PURE__*/
function (_GameObject) {
  _inherits(MysteryBox, _GameObject);

  function MysteryBox(x, y, tile) {
    var _this;

    _classCallCheck(this, MysteryBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MysteryBox).call(this)); // this.item = item;

    _this.tile = tile;

    _this.addBehavior(new _behaviors_Box_Jump__WEBPACK_IMPORTED_MODULE_1__["default"]());

    _this.width = 29;
    _this.height = 29;
    _this.pos.x = _this.width * x;
    _this.pos.y = _this.height * y;
    _this.originalPos = _this.height * y;
    _this.frame = "mysteryBox1";
    _this.hit = false;
    _this.status = "ignoreCollisions";
    _this.boxIdleAnimation = ["mysteryBox1", "mysteryBox2", "mysteryBox3", "mysteryBox4"];
    return _this;
  }

  _createClass(MysteryBox, [{
    key: "collides",
    value: function collides(mario) {
      if (mario.vel.y < 0) {
        if (mario.pos.y < this.getBottom()) {
          mario.pos.y = this.getBottom();
          mario.vel.y = 0;
          mario.jump.cancel();
          this.status = "collided";
          this.boxJump.start();
        }
      }
    }
  }, {
    key: "update",
    value: function update(deltaTime, totalTime, objects) {
      var _this2 = this;

      this.behaviors.forEach(function (behavior) {
        behavior.update(_this2, deltaTime, objects); //takes in object and deltaTime
      });
      this.decideStatus(totalTime, objects);
    }
  }, {
    key: "decideStatus",
    value: function decideStatus(totalTime, objects) {
      if (this.status === "ignoreCollisions") {
        this.frame = this.animationFrame(this.boxIdleAnimation, totalTime, 0.20);
      } else {
        this.frame = "singlePlatform";
      }
    }
  }, {
    key: "setToTile",
    value: function setToTile(objects) {
      this.tile.name = "singlePlatform";
      this.tile.type = "ground";
      var mushroom = new _Mushroom__WEBPACK_IMPORTED_MODULE_2__["default"](this.pos.x, this.pos.y);
      objects.add(mushroom);
    }
  }, {
    key: "draw",
    value: function draw(ctx, spriteSheets, camera) {
      spriteSheets.get("background").draw(this.frame, ctx, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    }
  }]);

  return MysteryBox;
}(_Game_Object__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/imgs/background.png":
/*!*********************************!*\
  !*** ./src/imgs/background.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/background.png";

/***/ }),

/***/ "./src/imgs/background_assets.png":
/*!****************************************!*\
  !*** ./src/imgs/background_assets.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/background_assets.png";

/***/ }),

/***/ "./src/imgs/enemies.png":
/*!******************************!*\
  !*** ./src/imgs/enemies.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/enemies.png";

/***/ }),

/***/ "./src/imgs/mario.png":
/*!****************************!*\
  !*** ./src/imgs/mario.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/mario.png";

/***/ }),

/***/ "./src/imgs/super-mario-world.png":
/*!****************************************!*\
  !*** ./src/imgs/super-mario-world.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/super-mario-world.png";

/***/ }),

/***/ "./src/imgs/thank_you.png":
/*!********************************!*\
  !*** ./src/imgs/thank_you.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/thank_you.png";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/Game.js */ "./src/game/Game.js");
/* harmony import */ var _display_Display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display/Display.js */ "./src/display/Display.js");
/* harmony import */ var _Game_Main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game_Main.js */ "./src/Game_Main.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./files */ "./src/files.js");




document.addEventListener("DOMContentLoaded", function () {
  var height = 400;
  var width = 700;
  var canvas = document.getElementById("canvas");
  var game = new _game_Game_js__WEBPACK_IMPORTED_MODULE_0__["default"](height, width);
  var display = new _display_Display_js__WEBPACK_IMPORTED_MODULE_1__["default"](canvas, height, width);
  display.loadWorld();
  var gameMain = new _Game_Main_js__WEBPACK_IMPORTED_MODULE_2__["default"](game, display);
  var sound = document.querySelector(".sound");
  var noSound = document.querySelector(".noSound");
  sound.addEventListener("click", function () {
    _files__WEBPACK_IMPORTED_MODULE_3__["music"].play();
    gameMain.start();
    noSound.parentNode.removeChild(noSound);
    sound.parentNode.removeChild(sound);
  }, {
    once: true
  });
  noSound.addEventListener("click", function () {
    gameMain.start();
    sound.parentNode.removeChild(sound);
    noSound.parentNode.removeChild(noSound);
  }, {
    once: true
  });

  _files__WEBPACK_IMPORTED_MODULE_3__["titleScreenImage"].onload = function () {
    display.ctx.drawImage(_files__WEBPACK_IMPORTED_MODULE_3__["titleScreenImage"], 100, 10, 500, 200);
  };
});

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector =
/*#__PURE__*/
function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }]);

  return Vector;
}();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map