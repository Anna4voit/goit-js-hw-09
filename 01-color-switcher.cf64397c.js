const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");e.disabled=!0,t.addEventListener("click",(function(n){e.disabled=!1,t.disabled=!0,a=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(d){t.disabled=!1,e.disabled=!0,clearInterval(a)}));let a=null;
//# sourceMappingURL=01-color-switcher.cf64397c.js.map
