webpackHotUpdate("styles",{

/***/ "./components/NavBar.module.scss":
/*!***************************************!*\
  !*** ./components/NavBar.module.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"navbar":"fuxdV00pF31zTKuD9E_Ys","profile":"_33BjSGUtaKulHM4CWO-ADT","active":"y3B4Xg3xU0GEa7Yg28BaF","icon":"_1w89JypjixWmRxVoMH4cW1"};;
    if (true) {
      var injectCss = function injectCss(prev, href) {
        var link = prev.cloneNode();
        link.href = href;
        link.onload = function() {
          prev.parentNode.removeChild(prev);
        };
        prev.stale = true;
        prev.parentNode.insertBefore(link, prev);
      };
      module.hot.dispose(function() {
        window.__webpack_reload_css__ = true;
      });
      if (window.__webpack_reload_css__) {
        module.hot.__webpack_reload_css__ = false;
        console.log("[HMR] Reloading stylesheets...");
        var prefix = document.location.protocol + '//' + document.location.host;
        document
          .querySelectorAll("link[href][rel=stylesheet]")
          .forEach(function(link) {
            if (!link.href.match(prefix) || link.stale) return;
            injectCss(link, link.href.split("?")[0] + "?unix=1586486234715");
          });
      }
    }
  

/***/ })

})
//# sourceMappingURL=styles.49f370b4ab4149d5108a.hot-update.js.map