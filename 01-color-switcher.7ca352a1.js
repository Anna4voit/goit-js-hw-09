!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),a=document.querySelector("body");e.disabled=!0,t.addEventListener("click",(function(d){e.disabled=!1,t.disabled=!0,n=setInterval((function(){a.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(a){t.disabled=!1,e.disabled=!0,clearInterval(n)}));var n=null}();
//# sourceMappingURL=01-color-switcher.7ca352a1.js.map
