parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"iMte":[function(require,module,exports) {

},{}],"GCpX":[function(require,module,exports) {
"use strict";var t={height:100,textSize:10,interval:10,gap:10,textPos:5,gapHeight:20,lineHeight:10,lineWidth:1,lineColor:"rgb(0, 0, 0)",textStyle:"#000000"},e=5,i=function(){function i(e){var i=document.createElement("canvas"),s=e.container,n=e.autoSize;s?(this.canvas=i,this.container=s,this.ctx=i.getContext("2d"),this.options=Object.assign({},t,e),this.init(),this.render(),n&&this.resizeObserve()):console.warn("container must be to set")}return i.prototype.init=function(t){var e=t||this.container;e?e.appendChild(this.canvas):console.log("container must be to set")},i.prototype.render=function(t){t&&this.setOption(t),this.setRect(),this.draw()},i.prototype.setRect=function(t){var e=this.canvas,i=this.container,s=this.options,n=s.width,o=s.height,h=i.getBoundingClientRect();e.width=this.width=n||h.width,t||(e.height=this.height=o||h.height)},i.prototype.draw=function(){var t=this.width,e=this.options,i=e.position,s=e.interval;/left|right/.test(i)&&(t=this.height),this.steps=Math.round(t/s),this.ctx.clearRect(0,0,this.width,this.height),this.drawBorderLine(),this.drawMark()},i.prototype.drawBorderLine=function(){var t=this.options.position,e=[0,0,this.width,this.height],i=e[0],s=e[1],n=e[2],o=e[3];switch(t){case"bottom":i=0,s=this.height;break;case"left":n=0;break;case"right":i=this.width;break;case"top":default:s=0,o=0}this.drawLine(i,s,n,o)},i.prototype.drawLine=function(t,e,i,s){var n=this.ctx,o=this.options,h=o.lineColor,r=o.lineWidth;n.beginPath(),n.moveTo(t,e),n.lineTo(i,s),n.strokeStyle=h,n.lineWidth=r,n.stroke()},i.prototype.drawText=function(t,e,i){var s=this.ctx,n=this.options,o=n.textStyle,h=n.textSize;s.font=h,s.fillStyle=o,s.textBaseline="middle",s.fillText(t,e,i)},i.prototype.drawMark=function(){for(var t=this,i=this.ctx,s=this.options,n=s.lineHeight,o=s.gapHeight,h=s.gap,r=s.interval,a=s.formatMarkText,c=s.position,d=s.textSize,p=s.textPos,l=s.textAlign,w=!1,g=!1,x=Number(d),v=1.5*x,u=function(s){var h=[0,0,0,0,0,0],d=h[0],g=h[1],u=h[2],f=h[3],b=h[4],y=h[5],m=a?a(s):s,k=i.measureText(m).width,z=Math.max(r,e);switch(c){case"left":d=0,u=(w?o:n)+.5,g=f=z*s+.5,b=(w?o:n)+p+.5,y=s>0&&"center"===l?g+v/4:g+v/2;break;case"right":d=t.width-(w?o:n)+.5,u=t.width,g=f=z*s+.5,y=s>0&&"center"===l?g+v/4:g+v/2,b=t.width-o-k-p;break;case"bottom":d=u=z*s+.5,g=t.height-(w?o:n)+.5,f=t.height,b=s>0&&"center"===l?d-k/2:d,y=t.height-o+.5-p;break;case"top":default:d=u=z*s+.5,g=0,f=(w?o:n)+.5,b=s>0&&"center"===l?d-k/2:d,y=o+.5+x+p}return{x:d,y:g,x1:u,y1:f,textX:b,textY:y,text:m}},f=0;f<this.steps;f++){g=(w=f>0&&!(f%h))||0===f;var b=u(f),y=b.x,m=b.y,k=b.x1,z=b.y1,O=b.textX,R=b.textY,S=b.text;this.drawLine(y,m,k,z),g&&this.drawText(S,O,R)}},i.prototype.setOption=function(t){this.options=Object.assign(this.options,t)},i.prototype.resizeObserve=function(){var t=this;if(window.ResizeObserver){var e=new window.ResizeObserver(function(e){for(var i=0,s=e;i<s.length;i++){var n=s[i];t.width!==n.contentRect.width&&t.setRect(!0),t.draw()}});e.observe&&e.observe(this.container)}},i}();module.exports=i;
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./style.css");var t=e(require("../dist/lib"));function e(t){return t&&t.__esModule?t:{default:t}}var n=document.getElementById("app"),a=document.getElementById("app-dark"),r=document.getElementById("app-left"),o=document.getElementById("app-right"),c=document.getElementById("points"),i=function(t){return t>=10?t:"0".concat(t)};console.log(i(23));var l=24,u=10,d=new t.default({container:n,gap:l,formatMarkText:function(t){var e=t>=l?Math.floor(t/l):0,n=t%24;return"00:0".concat(e,":").concat(i(n))}}),f=new t.default({container:a,gap:24,position:"bottom",textAlign:"center",lineHeight:6,gapHeight:6,interval:10,lineColor:"#999999",gapColor:"#eeeeee",textStyle:"#EEEEEE",formatMarkText:function(t){var e=t>=l?Math.floor(t/l):0,n=t%24;return"00:0".concat(e,":").concat(i(n))}}),g=new t.default({container:r,gap:l,position:"left",formatMarkText:function(t){var e=t>=l?Math.floor(t/l):0,n=t%24;return"00:0".concat(e,":").concat(i(n))}}),p=new t.default({container:o,gap:l,position:"right",formatMarkText:function(t){var e=t>=l?Math.floor(t/l):0,n=t%24;return"00:0".concat(e,":").concat(i(n))}});c.addEventListener("change",function(t){var e=u*t.target.value;console.log(l,e,l*e),d.draw({interval:e}),f.draw({interval:e,gap:Math.ceil(l*(e/10))}),g.draw({interval:e}),p.draw({interval:e})});
},{"./style.css":"iMte","../dist/lib":"GCpX"}]},{},["Focm"], null)
//# sourceMappingURL=/canvas-timeliner/example.b7588b45.js.map