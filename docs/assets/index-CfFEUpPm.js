(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const g=(n=new URL(document.location),e=(r="",i=!1)=>{})=>{};var c;class p{constructor(e=g){if(this.routeChangeHandeler=e,this.navigate=this.navigate.bind(this),this.routeChangeHandeler(new URL(document.location),this.navigate),window.onpopstate=r=>{this.routeChangeHandeler(new URL(document.location),this.navigate)},!c)c=this;else throw new Error("Only one instance of Router is allowed");return c}navigate(e="",r=!1){r?history.replaceState("","",e):history.pushState("","",e),this.routeChangeHandeler(new URL(document.location),this.navigate)}}function m(n=document.createElement("a")){n&&(n.onclick=e=>{var r;e.preventDefault(),(r=c==null?void 0:c.navigate)==null||r.call(c,n.href,n.getAttribute("replace")=="true")})}function y(n=[],e=""){n.forEach(r=>{m(r),r.href==e?r.classList.add("active"):r.classList.remove("active")})}async function f(n){try{const e=await fetch(n);if(!e.ok)throw new Error(e.statusText);return e.text()}catch(e){return e}}function L(n="pathname",e=!1,r={},i=document.body){const t={};var a=(s,u)=>{},o=(s=!1)=>{};return new p(async(s,u)=>{const l=s[n];r[l]?(e||!navigator.onLine)&&t[l]?(o(!0),i.innerHTML=t[l]):(o(!0),i.innerHTML=await f(r[l]),t[l]=i.innerHTML):(o(!0),i.innerHTML=await f(r["*"]),t["*"]=i.innerHTML),o(!1),a(s,u)}),[(s=a)=>{a=s},(s=(u=!1)=>{})=>{o=s}]}const h="search",v=!1,d=document.querySelector("main"),w={"?/":"/test-website-easy-page.js/template/main.html","?/about":"/test-website-easy-page.js/template/about.html","*":"/test-website-easy-page.js/template/404.html"},[H,b]=L(h,v,w,d);H((n,e)=>{n[h]==""&&e("?/"),y(document.querySelectorAll("a"),document.location)});b(n=>{n?d.style.animation="pageTransition 0.5s ease-in-out":d.style.animation=""});