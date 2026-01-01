var $l=Object.defineProperty,zl=Object.defineProperties;var Gl=Object.getOwnPropertyDescriptors;var qo=Object.getOwnPropertySymbols;var Hl=Object.prototype.hasOwnProperty,Kl=Object.prototype.propertyIsEnumerable;var $o=(n,t,e)=>t in n?$l(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,ot=(n,t)=>{for(var e in t||(t={}))Hl.call(t,e)&&$o(n,e,t[e]);if(qo)for(var e of qo(t))Kl.call(t,e)&&$o(n,e,t[e]);return n},$t=(n,t)=>zl(n,Gl(t));var b=(n,t,e)=>new Promise((r,s)=>{var o=h=>{try{l(e.next(h))}catch(f){s(f)}},a=h=>{try{l(e.throw(h))}catch(f){s(f)}},l=h=>h.done?r(h.value):Promise.resolve(h.value).then(o,a);l((e=e.apply(n,t)).next())});const Wl=()=>{};var zo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Ql=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},oc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,y=(o&3)<<4|l>>4;let w=(l&15)<<2|f>>6,S=f&63;h||(S=64,a||(w=64)),r.push(e[m],e[y],e[w],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(ic(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Ql(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const y=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||y==null)throw new Xl;const w=o<<2|l>>4;if(r.push(w),f!==64){const S=l<<4&240|f>>2;if(r.push(S),y!==64){const k=f<<6&192|y;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Xl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yl=function(n){const t=ic(n);return oc.encodeByteArray(t,!0)},fr=function(n){return Yl(n).replace(/\./g,"")},Jl=function(n){try{return oc.decodeString(n,!0)}catch(t){}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th=()=>Zl().__FIREBASE_DEFAULTS__,eh=()=>{if(typeof process=="undefined"||typeof zo=="undefined")return;const n=zo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},nh=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=n&&Jl(n[1]);return t&&JSON.parse(t)},Js=()=>{try{return Wl()||th()||eh()||nh()}catch(n){return}},rh=n=>{var t,e;return(e=(t=Js())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},sh=n=>{const t=rh(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},ac=()=>{var n;return(n=Js())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch(t){return!1}}function oh(n){return b(this,null,function*(){return(yield fetch(n,{credentials:"include"})).ok})}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=ot({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[fr(JSON.stringify(e)),fr(JSON.stringify(a)),""].join(".")}const yn={};function ch(){const n={prod:[],emulator:[]};for(const t of Object.keys(yn))yn[t]?n.emulator.push(t):n.prod.push(t);return n}function uh(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let Go=!1;function lh(n,t){if(typeof window=="undefined"||typeof document=="undefined"||!Zs(window.location.host)||yn[n]===t||yn[n]||Go)return;yn[n]=t;function e(w){return`__firebase__banner__${w}`}const r="__firebase__banner",o=ch().prod.length>0;function a(){const w=document.getElementById(r);w&&w.remove()}function l(w){w.style.display="flex",w.style.background="#7faaf0",w.style.position="fixed",w.style.bottom="5px",w.style.left="5px",w.style.padding=".5em",w.style.borderRadius="5px",w.style.alignItems="center"}function h(w,S){w.setAttribute("width","24"),w.setAttribute("id",S),w.setAttribute("height","24"),w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.style.marginLeft="-6px"}function f(){const w=document.createElement("span");return w.style.cursor="pointer",w.style.marginLeft="16px",w.style.fontSize="24px",w.innerHTML=" &times;",w.onclick=()=>{Go=!0,a()},w}function m(w,S){w.setAttribute("id",S),w.innerText="Learn more",w.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",w.setAttribute("target","__blank"),w.style.paddingLeft="5px",w.style.textDecoration="underline"}function y(){const w=uh(r),S=e("text"),k=document.getElementById(S)||document.createElement("span"),O=e("learnmore"),D=document.getElementById(O)||document.createElement("a"),K=e("preprendIcon"),G=document.getElementById(K)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(w.created){const W=w.element;l(W),m(D,O);const lt=f();h(G,K),W.append(G,k,D,lt),document.body.appendChild(W)}o?(k.innerText="Preview backend disconnected.",G.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(G.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",y):y()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hh(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fh(){var t;const n=(t=Js())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch(e){return!1}}function dh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function mh(){return!fh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function cc(){try{return typeof indexedDB=="object"}catch(n){return!1}}function uc(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}function ph(){return!(typeof navigator=="undefined"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh="FirebaseError";class fe extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=gh,Object.setPrototypeOf(this,fe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cr.prototype.create)}}class Cr{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?_h(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new fe(s,l,r)}}function _h(n,t){return n.replace(yh,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const yh=/\{\$([^}]+)}/g;function vn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Ho(o)&&Ho(a)){if(!vn(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Ho(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh=1e3,Th=2,Ih=4*60*60*1e3,wh=.5;function Ko(n,t=Eh,e=Th){const r=t*Math.pow(e,n),s=Math.round(wh*r*(Math.random()-.5)*2);return Math.min(Ih,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(n){return n&&n._delegate?n._delegate:n}class zt{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new ih;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch(s){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var s;const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(s=t==null?void 0:t.optional)!=null?s:!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Rh(t))try{this.getOrInitializeService({instanceIdentifier:Ie})}catch(e){}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch(o){}}}}clearInstance(t=Ie){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}delete(){return b(this,null,function*(){const t=Array.from(this.instances.values());yield Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])})}isComponentSet(){return this.component!=null}isInitialized(t=Ie){return this.instances.has(t)}getOptions(t=Ie){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){var a;const r=this.normalizeInstanceIdentifier(e),s=(a=this.onInitCallbacks.get(r))!=null?a:new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch(o){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:vh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch(s){}return r||null}normalizeInstanceIdentifier(t=Ie){return this.component?this.component.multipleInstances?t:Ie:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function vh(n){return n===Ie?void 0:n}function Rh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Ah(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const Ch={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},bh=z.INFO,Ph={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},Vh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=Ph[t];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ti{constructor(t){this.name=t,this._logLevel=bh,this._logHandler=Vh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ch[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...t),this._logHandler(this,z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...t),this._logHandler(this,z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,z.INFO,...t),this._logHandler(this,z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,z.WARN,...t),this._logHandler(this,z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...t),this._logHandler(this,z.ERROR,...t)}}const Dh=(n,t)=>t.some(e=>n instanceof e);let Wo,Qo;function Nh(){return Wo||(Wo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function kh(){return Qo||(Qo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const lc=new WeakMap,Ps=new WeakMap,hc=new WeakMap,_s=new WeakMap,ei=new WeakMap;function Mh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(ee(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&lc.set(e,n)}).catch(()=>{}),ei.set(t,n),t}function Oh(n){if(Ps.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ps.set(n,t)}let Vs={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Ps.get(n);if(t==="objectStoreNames")return n.objectStoreNames||hc.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return ee(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function xh(n){Vs=n(Vs)}function Lh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(ys(this),t,...e);return hc.set(r,t.sort?t.sort():[t]),ee(r)}:kh().includes(n)?function(...t){return n.apply(ys(this),t),ee(lc.get(this))}:function(...t){return ee(n.apply(ys(this),t))}}function Fh(n){return typeof n=="function"?Lh(n):(n instanceof IDBTransaction&&Oh(n),Dh(n,Nh())?new Proxy(n,Vs):n)}function ee(n){if(n instanceof IDBRequest)return Mh(n);if(_s.has(n))return _s.get(n);const t=Fh(n);return t!==n&&(_s.set(n,t),ei.set(t,n)),t}const ys=n=>ei.get(n);function fc(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=ee(a);return r&&a.addEventListener("upgradeneeded",h=>{r(ee(a.result),h.oldVersion,h.newVersion,ee(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}const Uh=["get","getKey","getAll","getAllKeys","count"],Bh=["put","add","delete","clear"],Es=new Map;function Xo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Es.get(t))return Es.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Bh.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Uh.includes(e)))return;const o=function(a,...l){return b(this,null,function*(){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(l.shift())),(yield Promise.all([f[e](...l),s&&h.done]))[0]})};return Es.set(t,o),o}xh(n=>$t(ot({},n),{get:(t,e,r)=>Xo(t,e)||n.get(t,e,r),has:(t,e)=>!!Xo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(qh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function qh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Ds="@firebase/app",Yo="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt=new ti("@firebase/app"),$h="@firebase/app-compat",zh="@firebase/analytics-compat",Gh="@firebase/analytics",Hh="@firebase/app-check-compat",Kh="@firebase/app-check",Wh="@firebase/auth",Qh="@firebase/auth-compat",Xh="@firebase/database",Yh="@firebase/data-connect",Jh="@firebase/database-compat",Zh="@firebase/functions",tf="@firebase/functions-compat",ef="@firebase/installations",nf="@firebase/installations-compat",rf="@firebase/messaging",sf="@firebase/messaging-compat",of="@firebase/performance",af="@firebase/performance-compat",cf="@firebase/remote-config",uf="@firebase/remote-config-compat",lf="@firebase/storage",hf="@firebase/storage-compat",ff="@firebase/firestore",df="@firebase/ai",mf="@firebase/firestore-compat",pf="firebase",gf="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns="[DEFAULT]",_f={[Ds]:"fire-core",[$h]:"fire-core-compat",[Gh]:"fire-analytics",[zh]:"fire-analytics-compat",[Kh]:"fire-app-check",[Hh]:"fire-app-check-compat",[Wh]:"fire-auth",[Qh]:"fire-auth-compat",[Xh]:"fire-rtdb",[Yh]:"fire-data-connect",[Jh]:"fire-rtdb-compat",[Zh]:"fire-fn",[tf]:"fire-fn-compat",[ef]:"fire-iid",[nf]:"fire-iid-compat",[rf]:"fire-fcm",[sf]:"fire-fcm-compat",[of]:"fire-perf",[af]:"fire-perf-compat",[cf]:"fire-rc",[uf]:"fire-rc-compat",[lf]:"fire-gcs",[hf]:"fire-gcs-compat",[ff]:"fire-fst",[mf]:"fire-fst-compat",[df]:"fire-vertex","fire-js":"fire-js",[pf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=new Map,yf=new Map,ks=new Map;function Jo(n,t){try{n.container.addComponent(t)}catch(e){Gt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function ie(n){const t=n.name;if(ks.has(t))return Gt.debug(`There were multiple attempts to register component ${t}.`),!1;ks.set(t,n);for(const e of dr.values())Jo(e,n);for(const e of yf.values())Jo(e,n);return!0}function Mn(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Ef(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ne=new Cr("app","Firebase",Tf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(t,e,r){this._isDeleted=!1,this._options=ot({},t),this._config=ot({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ne.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf=gf;function Af(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=ot({name:Ns,automaticDataCollectionEnabled:!0},t),s=r.name;if(typeof s!="string"||!s)throw ne.create("bad-app-name",{appName:String(s)});if(e||(e=ac()),!e)throw ne.create("no-options");const o=dr.get(s);if(o){if(vn(e,o.options)&&vn(r,o.config))return o;throw ne.create("duplicate-app",{appName:s})}const a=new Sh(s);for(const h of ks.values())a.addComponent(h);const l=new If(e,r,a);return dr.set(s,l),l}function dc(n=Ns){const t=dr.get(n);if(!t&&n===Ns&&ac())return Af();if(!t)throw ne.create("no-app",{appName:n});return t}function Mt(n,t,e){var a;let r=(a=_f[n])!=null?a:n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const l=[`Unable to register library "${r}" with version "${t}":`];s&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Gt.warn(l.join(" "));return}ie(new zt(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vf="firebase-heartbeat-database",Rf=1,Rn="firebase-heartbeat-store";let Ts=null;function mc(){return Ts||(Ts=fc(vf,Rf,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Rn)}catch(e){}}}}).catch(n=>{throw ne.create("idb-open",{originalErrorMessage:n.message})})),Ts}function Sf(n){return b(this,null,function*(){try{const e=(yield mc()).transaction(Rn),r=yield e.objectStore(Rn).get(pc(n));return yield e.done,r}catch(t){if(t instanceof fe)Gt.warn(t.message);else{const e=ne.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Gt.warn(e.message)}}})}function Zo(n,t){return b(this,null,function*(){try{const r=(yield mc()).transaction(Rn,"readwrite");yield r.objectStore(Rn).put(t,pc(n)),yield r.done}catch(e){if(e instanceof fe)Gt.warn(e.message);else{const r=ne.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Gt.warn(r.message)}}})}function pc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf=1024,bf=30;class Pf{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Df(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}triggerHeartbeat(){return b(this,null,function*(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ta();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>bf){const a=Nf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Gt.warn(r)}})}getHeartbeatsHeader(){return b(this,null,function*(){var t;try{if(this._heartbeatsCache===null&&(yield this._heartbeatsCachePromise),((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ta(),{heartbeatsToSend:r,unsentEntries:s}=Vf(this._heartbeatsCache.heartbeats),o=fr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Gt.warn(e),""}})}}function ta(){return new Date().toISOString().substring(0,10)}function Vf(n,t=Cf){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),ea(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),ea(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Df{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return b(this,null,function*(){return cc()?uc().then(()=>!0).catch(()=>!1):!1})}read(){return b(this,null,function*(){if(yield this._canUseIndexedDBPromise){const e=yield Sf(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}})}overwrite(t){return b(this,null,function*(){var r;if(yield this._canUseIndexedDBPromise){const s=yield this.read();return Zo(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!=null?r:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return})}add(t){return b(this,null,function*(){var r;if(yield this._canUseIndexedDBPromise){const s=yield this.read();return Zo(this.app,{lastSentHeartbeatDate:(r=t.lastSentHeartbeatDate)!=null?r:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return})}}function ea(n){return fr(JSON.stringify({version:2,heartbeats:n})).length}function Nf(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kf(n){ie(new zt("platform-logger",t=>new jh(t),"PRIVATE")),ie(new zt("heartbeat",t=>new Pf(t),"PRIVATE")),Mt(Ds,Yo,n),Mt(Ds,Yo,"esm2020"),Mt("fire-js","")}kf("");var Mf="firebase",Of="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mt(Mf,Of,"app");const gc="@firebase/installations",ni="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=1e4,yc=`w:${ni}`,Ec="FIS_v2",xf="https://firebaseinstallations.googleapis.com/v1",Lf=60*60*1e3,Ff="installations",Uf="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Re=new Cr(Ff,Uf,Bf);function Tc(n){return n instanceof fe&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ic({projectId:n}){return`${xf}/projects/${n}/installations`}function wc(n){return{token:n.token,requestStatus:2,expiresIn:qf(n.expiresIn),creationTime:Date.now()}}function Ac(n,t){return b(this,null,function*(){const r=(yield t.json()).error;return Re.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})})}function vc({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function jf(n,{refreshToken:t}){const e=vc(n);return e.append("Authorization",$f(t)),e}function Rc(n){return b(this,null,function*(){const t=yield n();return t.status>=500&&t.status<600?n():t})}function qf(n){return Number(n.replace("s","000"))}function $f(n){return`${Ec} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(r,s){return b(this,arguments,function*({appConfig:n,heartbeatServiceProvider:t},{fid:e}){const o=Ic(n),a=vc(n),l=t.getImmediate({optional:!0});if(l){const y=yield l.getHeartbeatsHeader();y&&a.append("x-firebase-client",y)}const h={fid:e,authVersion:Ec,appId:n.appId,sdkVersion:yc},f={method:"POST",headers:a,body:JSON.stringify(h)},m=yield Rc(()=>fetch(o,f));if(m.ok){const y=yield m.json();return{fid:y.fid||e,registrationStatus:2,refreshToken:y.refreshToken,authToken:wc(y.authToken)}}else throw yield Ac("Create Installation",m)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(n){return new Promise(t=>{setTimeout(t,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=/^[cdef][\w-]{21}$/,Ms="";function Kf(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const e=Wf(n);return Hf.test(e)?e:Ms}catch(n){return Ms}}function Wf(n){return Gf(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function br(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc=new Map;function bc(n,t){const e=br(n);Pc(e,t),Qf(e,t)}function Pc(n,t){const e=Cc.get(n);if(e)for(const r of e)r(t)}function Qf(n,t){const e=Xf();e&&e.postMessage({key:n,fid:t}),Yf()}let we=null;function Xf(){return!we&&"BroadcastChannel"in self&&(we=new BroadcastChannel("[Firebase] FID Change"),we.onmessage=n=>{Pc(n.data.key,n.data.fid)}),we}function Yf(){Cc.size===0&&we&&(we.close(),we=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf="firebase-installations-database",Zf=1,Se="firebase-installations-store";let Is=null;function ri(){return Is||(Is=fc(Jf,Zf,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(Se)}}})),Is}function mr(n,t){return b(this,null,function*(){const e=br(n),s=(yield ri()).transaction(Se,"readwrite"),o=s.objectStore(Se),a=yield o.get(e);return yield o.put(t,e),yield s.done,(!a||a.fid!==t.fid)&&bc(n,t.fid),t})}function Vc(n){return b(this,null,function*(){const t=br(n),r=(yield ri()).transaction(Se,"readwrite");yield r.objectStore(Se).delete(t),yield r.done})}function Pr(n,t){return b(this,null,function*(){const e=br(n),s=(yield ri()).transaction(Se,"readwrite"),o=s.objectStore(Se),a=yield o.get(e),l=t(a);return l===void 0?yield o.delete(e):yield o.put(l,e),yield s.done,l&&(!a||a.fid!==l.fid)&&bc(n,l.fid),l})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n){return b(this,null,function*(){let t;const e=yield Pr(n.appConfig,r=>{const s=td(r),o=ed(n,s);return t=o.registrationPromise,o.installationEntry});return e.fid===Ms?{installationEntry:yield t}:{installationEntry:e,registrationPromise:t}})}function td(n){const t=n||{fid:Kf(),registrationStatus:0};return Dc(t)}function ed(n,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Re.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=nd(n,e);return{installationEntry:e,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:rd(n)}:{installationEntry:t}}function nd(n,t){return b(this,null,function*(){try{const e=yield zf(n,t);return mr(n.appConfig,e)}catch(e){throw Tc(e)&&e.customData.serverCode===409?yield Vc(n.appConfig):yield mr(n.appConfig,{fid:t.fid,registrationStatus:0}),e}})}function rd(n){return b(this,null,function*(){let t=yield na(n.appConfig);for(;t.registrationStatus===1;)yield Sc(100),t=yield na(n.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:r}=yield si(n);return r||e}return t})}function na(n){return Pr(n,t=>{if(!t)throw Re.create("installation-not-found");return Dc(t)})}function Dc(n){return sd(n)?{fid:n.fid,registrationStatus:0}:n}function sd(n){return n.registrationStatus===1&&n.registrationTime+_c<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(r,s){return b(this,arguments,function*({appConfig:n,heartbeatServiceProvider:t},e){const o=od(n,e),a=jf(n,e),l=t.getImmediate({optional:!0});if(l){const y=yield l.getHeartbeatsHeader();y&&a.append("x-firebase-client",y)}const h={installation:{sdkVersion:yc,appId:n.appId}},f={method:"POST",headers:a,body:JSON.stringify(h)},m=yield Rc(()=>fetch(o,f));if(m.ok){const y=yield m.json();return wc(y)}else throw yield Ac("Generate Auth Token",m)})}function od(n,{fid:t}){return`${Ic(n)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ii(n,t=!1){return b(this,null,function*(){let e;const r=yield Pr(n.appConfig,o=>{if(!Nc(o))throw Re.create("not-registered");const a=o.authToken;if(!t&&ud(a))return o;if(a.requestStatus===1)return e=ad(n,t),o;{if(!navigator.onLine)throw Re.create("app-offline");const l=hd(o);return e=cd(n,l),l}});return e?yield e:r.authToken})}function ad(n,t){return b(this,null,function*(){let e=yield ra(n.appConfig);for(;e.authToken.requestStatus===1;)yield Sc(100),e=yield ra(n.appConfig);const r=e.authToken;return r.requestStatus===0?ii(n,t):r})}function ra(n){return Pr(n,t=>{if(!Nc(t))throw Re.create("not-registered");const e=t.authToken;return fd(e)?$t(ot({},t),{authToken:{requestStatus:0}}):t})}function cd(n,t){return b(this,null,function*(){try{const e=yield id(n,t),r=$t(ot({},t),{authToken:e});return yield mr(n.appConfig,r),e}catch(e){if(Tc(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))yield Vc(n.appConfig);else{const r=$t(ot({},t),{authToken:{requestStatus:0}});yield mr(n.appConfig,r)}throw e}})}function Nc(n){return n!==void 0&&n.registrationStatus===2}function ud(n){return n.requestStatus===2&&!ld(n)}function ld(n){const t=Date.now();return t<n.creationTime||n.creationTime+n.expiresIn<t+Lf}function hd(n){const t={requestStatus:1,requestTime:Date.now()};return $t(ot({},n),{authToken:t})}function fd(n){return n.requestStatus===1&&n.requestTime+_c<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(n){return b(this,null,function*(){const t=n,{installationEntry:e,registrationPromise:r}=yield si(t);return r?r.catch(console.error):ii(t).catch(console.error),e.fid})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(n,t=!1){return b(this,null,function*(){const e=n;return yield pd(e),(yield ii(e,t)).token})}function pd(n){return b(this,null,function*(){const{registrationPromise:t}=yield si(n);t&&(yield t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(n){if(!n||!n.options)throw ws("App Configuration");if(!n.name)throw ws("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!n.options[e])throw ws(e);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function ws(n){return Re.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc="installations",_d="installations-internal",yd=n=>{const t=n.getProvider("app").getImmediate(),e=gd(t),r=Mn(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Ed=n=>{const t=n.getProvider("app").getImmediate(),e=Mn(t,kc).getImmediate();return{getId:()=>dd(e),getToken:s=>md(e,s)}};function Td(){ie(new zt(kc,yd,"PUBLIC")),ie(new zt(_d,Ed,"PRIVATE"))}Td();Mt(gc,ni);Mt(gc,ni,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr="analytics",Id="firebase_id",wd="origin",Ad=60*1e3,vd="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",oi="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=new ti("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Pt=new Cr("analytics","Analytics",Rd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(n){if(!n.startsWith(oi)){const t=Pt.create("invalid-gtag-resource",{gtagURL:n});return wt.warn(t.message),""}return n}function Mc(n){return Promise.all(n.map(t=>t.catch(e=>e)))}function Cd(n,t){let e;return window.trustedTypes&&(e=window.trustedTypes.createPolicy(n,t)),e}function bd(n,t){const e=Cd("firebase-js-sdk-policy",{createScriptURL:Sd}),r=document.createElement("script"),s=`${oi}?l=${n}&id=${t}`;r.src=e?e==null?void 0:e.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Pd(n){let t=[];return Array.isArray(window[n])?t=window[n]:window[n]=t,t}function Vd(n,t,e,r,s,o){return b(this,null,function*(){const a=r[s];try{if(a)yield t[a];else{const h=(yield Mc(e)).find(f=>f.measurementId===s);h&&(yield t[h.appId])}}catch(l){wt.error(l)}n("config",s,o)})}function Dd(n,t,e,r,s){return b(this,null,function*(){try{let o=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const l=yield Mc(e);for(const h of a){const f=l.find(y=>y.measurementId===h),m=f&&t[f.appId];if(m)o.push(m);else{o=[];break}}}o.length===0&&(o=Object.values(t)),yield Promise.all(o),n("event",r,s||{})}catch(o){wt.error(o)}})}function Nd(n,t,e,r){function s(o,...a){return b(this,null,function*(){try{if(o==="event"){const[l,h]=a;yield Dd(n,t,e,l,h)}else if(o==="config"){const[l,h]=a;yield Vd(n,t,e,r,l,h)}else if(o==="consent"){const[l,h]=a;n("consent",l,h)}else if(o==="get"){const[l,h,f]=a;n("get",l,h,f)}else if(o==="set"){const[l]=a;n("set",l)}else n(o,...a)}catch(l){wt.error(l)}})}return s}function kd(n,t,e,r,s){let o=function(...a){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(o=window[s]),window[s]=Nd(o,n,t,e),{gtagCore:o,wrappedGtag:window[s]}}function Md(n){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(oi)&&e.src.includes(n))return e;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od=30,xd=1e3;class Ld{constructor(t={},e=xd){this.throttleMetadata=t,this.intervalMillis=e}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,e){this.throttleMetadata[t]=e}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Oc=new Ld;function Fd(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}function Ud(n){return b(this,null,function*(){var a;const{appId:t,apiKey:e}=n,r={method:"GET",headers:Fd(e)},s=vd.replace("{app-id}",t),o=yield fetch(s,r);if(o.status!==200&&o.status!==304){let l="";try{const h=yield o.json();(a=h.error)!=null&&a.message&&(l=h.error.message)}catch(h){}throw Pt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()})}function Bd(r){return b(this,arguments,function*(n,t=Oc,e){const{appId:s,apiKey:o,measurementId:a}=n.options;if(!s)throw Pt.create("no-app-id");if(!o){if(a)return{measurementId:a,appId:s};throw Pt.create("no-api-key")}const l=t.getThrottleMetadata(s)||{backoffCount:0,throttleEndTimeMillis:Date.now()},h=new $d;return setTimeout(()=>b(this,null,function*(){h.abort()}),Ad),xc({appId:s,apiKey:o,measurementId:a},l,h,t)})}function xc(o,a,l){return b(this,arguments,function*(n,{throttleEndTimeMillis:t,backoffCount:e},r,s=Oc){var m;const{appId:h,measurementId:f}=n;try{yield jd(r,t)}catch(y){if(f)return wt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${f} provided in the "measurementId" field in the local Firebase config. [${y==null?void 0:y.message}]`),{appId:h,measurementId:f};throw y}try{const y=yield Ud(n);return s.deleteThrottleMetadata(h),y}catch(y){const w=y;if(!qd(w)){if(s.deleteThrottleMetadata(h),f)return wt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${f} provided in the "measurementId" field in the local Firebase config. [${w==null?void 0:w.message}]`),{appId:h,measurementId:f};throw y}const S=Number((m=w==null?void 0:w.customData)==null?void 0:m.httpStatus)===503?Ko(e,s.intervalMillis,Od):Ko(e,s.intervalMillis),k={throttleEndTimeMillis:Date.now()+S,backoffCount:e+1};return s.setThrottleMetadata(h,k),wt.debug(`Calling attemptFetch again in ${S} millis`),xc(n,k,r,s)}})}function jd(n,t){return new Promise((e,r)=>{const s=Math.max(t-Date.now(),0),o=setTimeout(e,s);n.addEventListener(()=>{clearTimeout(o),r(Pt.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function qd(n){if(!(n instanceof fe)||!n.customData)return!1;const t=Number(n.customData.httpStatus);return t===429||t===500||t===503||t===504}class $d{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}function zd(n,t,e,r,s){return b(this,null,function*(){if(s&&s.global){n("event",e,r);return}else{const o=yield t,a=$t(ot({},r),{send_to:o});n("event",e,a)}})}function Gd(n,t,e,r){return b(this,null,function*(){if(r&&r.global){const s={};for(const o of Object.keys(e))s[`user_properties.${o}`]=e[o];return n("set",s),Promise.resolve()}else{const s=yield t;n("config",s,{update:!0,user_properties:e})}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(){return b(this,null,function*(){if(cc())try{yield uc()}catch(n){return wt.warn(Pt.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return wt.warn(Pt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0})}function Kd(n,t,e,r,s,o,a){return b(this,null,function*(){var w;const l=Bd(n);l.then(S=>{e[S.measurementId]=S.appId,n.options.measurementId&&S.measurementId!==n.options.measurementId&&wt.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${S.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(S=>wt.error(S)),t.push(l);const h=Hd().then(S=>{if(S)return r.getId()}),[f,m]=yield Promise.all([l,h]);Md(o)||bd(o,f.measurementId),s("js",new Date);const y=(w=a==null?void 0:a.config)!=null?w:{};return y[wd]="firebase",y.update=!0,m!=null&&(y[Id]=m),s("config",f.measurementId,y),f.measurementId})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(t){this.app=t}_delete(){return delete Ue[this.app.options.appId],Promise.resolve()}}let Ue={},sa=[];const ia={};let As="dataLayer",Qd="gtag",oa,ai,aa=!1;function Xd(){const n=[];if(dh()&&n.push("This is a browser extension environment."),ph()||n.push("Cookies are not available."),n.length>0){const t=n.map((r,s)=>`(${s+1}) ${r}`).join(" "),e=Pt.create("invalid-analytics-context",{errorInfo:t});wt.warn(e.message)}}function Yd(n,t,e){Xd();const r=n.options.appId;if(!r)throw Pt.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)wt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Pt.create("no-api-key");if(Ue[r]!=null)throw Pt.create("already-exists",{id:r});if(!aa){Pd(As);const{wrappedGtag:o,gtagCore:a}=kd(Ue,sa,ia,As,Qd);ai=o,oa=a,aa=!0}return Ue[r]=Kd(n,sa,ia,t,oa,As,e),new Wd(n)}function E_(n=dc()){n=Bt(n);const t=Mn(n,pr);return t.isInitialized()?t.getImmediate():Jd(n)}function Jd(n,t={}){const e=Mn(n,pr);if(e.isInitialized()){const s=e.getImmediate();if(vn(t,e.getOptions()))return s;throw Pt.create("already-initialized")}return e.initialize({options:t})}function Zd(n,t,e){n=Bt(n),Gd(ai,Ue[n.app.options.appId],t,e).catch(r=>wt.error(r))}function tm(n,t,e,r){n=Bt(n),zd(ai,Ue[n.app.options.appId],t,e,r).catch(s=>wt.error(s))}const ca="@firebase/analytics",ua="0.10.19";function em(){ie(new zt(pr,(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return Yd(r,s,e)},"PUBLIC")),ie(new zt("analytics-internal",n,"PRIVATE")),Mt(ca,ua),Mt(ca,ua,"esm2020");function n(t){try{const e=t.getProvider(pr).getImmediate();return{logEvent:(r,s,o)=>tm(e,r,s,o),setUserProperties:(r,s)=>Zd(e,r,s)}}catch(e){throw Pt.create("interop-component-reg-failed",{reason:e})}}}em();var la=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var re,Lc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,p){function _(){}_.prototype=p.prototype,T.F=p.prototype,T.prototype=new _,T.prototype.constructor=T,T.D=function(I,E,v){for(var g=Array(arguments.length-2),At=2;At<arguments.length;At++)g[At-2]=arguments[At];return p.prototype[E].apply(I,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,p,_){_||(_=0);const I=Array(16);if(typeof p=="string")for(var E=0;E<16;++E)I[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;E<16;++E)I[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=T.g[0],_=T.g[1],E=T.g[2];let v=T.g[3],g;g=p+(v^_&(E^v))+I[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(E^p&(_^E))+I[1]+3905402710&4294967295,v=p+(g<<12&4294967295|g>>>20),g=E+(_^v&(p^_))+I[2]+606105819&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(p^E&(v^p))+I[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(v^_&(E^v))+I[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(E^p&(_^E))+I[5]+1200080426&4294967295,v=p+(g<<12&4294967295|g>>>20),g=E+(_^v&(p^_))+I[6]+2821735955&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(p^E&(v^p))+I[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(v^_&(E^v))+I[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(E^p&(_^E))+I[9]+2336552879&4294967295,v=p+(g<<12&4294967295|g>>>20),g=E+(_^v&(p^_))+I[10]+4294925233&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(p^E&(v^p))+I[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(v^_&(E^v))+I[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(E^p&(_^E))+I[13]+4254626195&4294967295,v=p+(g<<12&4294967295|g>>>20),g=E+(_^v&(p^_))+I[14]+2792965006&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(p^E&(v^p))+I[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^v&(_^E))+I[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(p^_))+I[6]+3225465664&4294967295,v=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(v^p))+I[11]+643717713&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(E^v))+I[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^v&(_^E))+I[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(p^_))+I[10]+38016083&4294967295,v=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(v^p))+I[15]+3634488961&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(E^v))+I[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^v&(_^E))+I[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(p^_))+I[14]+3275163606&4294967295,v=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(v^p))+I[3]+4107603335&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(E^v))+I[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^v&(_^E))+I[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(p^_))+I[2]+4243563512&4294967295,v=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(v^p))+I[7]+1735328473&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(E^v))+I[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^v)+I[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^E)+I[8]+2272392833&4294967295,v=p+(g<<11&4294967295|g>>>21),g=E+(v^p^_)+I[11]+1839030562&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^p)+I[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^v)+I[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^E)+I[4]+1272893353&4294967295,v=p+(g<<11&4294967295|g>>>21),g=E+(v^p^_)+I[7]+4139469664&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^p)+I[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^v)+I[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^E)+I[0]+3936430074&4294967295,v=p+(g<<11&4294967295|g>>>21),g=E+(v^p^_)+I[3]+3572445317&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^p)+I[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^v)+I[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^E)+I[12]+3873151461&4294967295,v=p+(g<<11&4294967295|g>>>21),g=E+(v^p^_)+I[15]+530742520&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^p)+I[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~v))+I[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~E))+I[7]+1126891415&4294967295,v=p+(g<<10&4294967295|g>>>22),g=E+(p^(v|~_))+I[14]+2878612391&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~p))+I[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~v))+I[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~E))+I[3]+2399980690&4294967295,v=p+(g<<10&4294967295|g>>>22),g=E+(p^(v|~_))+I[10]+4293915773&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~p))+I[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~v))+I[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~E))+I[15]+4264355552&4294967295,v=p+(g<<10&4294967295|g>>>22),g=E+(p^(v|~_))+I[6]+2734768916&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~p))+I[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~v))+I[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~E))+I[11]+3174756917&4294967295,v=p+(g<<10&4294967295|g>>>22),g=E+(p^(v|~_))+I[2]+718787259&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~p))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+p&4294967295,T.g[1]=T.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+v&4294967295}r.prototype.v=function(T,p){p===void 0&&(p=T.length);const _=p-this.blockSize,I=this.C;let E=this.h,v=0;for(;v<p;){if(E==0)for(;v<=_;)s(this,T,v),v+=this.blockSize;if(typeof T=="string"){for(;v<p;)if(I[E++]=T.charCodeAt(v++),E==this.blockSize){s(this,I),E=0;break}}else for(;v<p;)if(I[E++]=T[v++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=p},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var p=1;p<T.length-8;++p)T[p]=0;p=this.o*8;for(var _=T.length-8;_<T.length;++_)T[_]=p&255,p/=256;for(this.v(T),T=Array(16),p=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)T[p++]=this.g[_]>>>I&255;return T};function o(T,p){var _=l;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=p(T)}function a(T,p){this.h=p;const _=[];let I=!0;for(let E=T.length-1;E>=0;E--){const v=T[E]|0;I&&v==p||(_[E]=v,I=!1)}this.g=_}var l={};function h(T){return-128<=T&&T<128?o(T,function(p){return new a([p|0],p<0?-1:0)}):new a([T|0],T<0?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return y;if(T<0)return D(f(-T));const p=[];let _=1;for(let I=0;T>=_;I++)p[I]=T/_|0,_*=4294967296;return new a(p,0)}function m(T,p){if(T.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(T.charAt(0)=="-")return D(m(T.substring(1),p));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=f(Math.pow(p,8));let I=y;for(let v=0;v<T.length;v+=8){var E=Math.min(8,T.length-v);const g=parseInt(T.substring(v,v+E),p);E<8?(E=f(Math.pow(p,E)),I=I.j(E).add(f(g))):(I=I.j(_),I=I.add(f(g)))}return I}var y=h(0),w=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-D(this).m();let T=0,p=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);T+=(I>=0?I:4294967296+I)*p,p*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(k(this))return"0";if(O(this))return"-"+D(this).toString(T);const p=f(Math.pow(T,6));var _=this;let I="";for(;;){const E=lt(_,p).g;_=K(_,E.j(p));let v=((_.g.length>0?_.g[0]:_.h)>>>0).toString(T);if(_=E,k(_))return v+I;for(;v.length<6;)v="0"+v;I=v+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function k(T){if(T.h!=0)return!1;for(let p=0;p<T.g.length;p++)if(T.g[p]!=0)return!1;return!0}function O(T){return T.h==-1}n.l=function(T){return T=K(this,T),O(T)?-1:k(T)?0:1};function D(T){const p=T.g.length,_=[];for(let I=0;I<p;I++)_[I]=~T.g[I];return new a(_,~T.h).add(w)}n.abs=function(){return O(this)?D(this):this},n.add=function(T){const p=Math.max(this.g.length,T.g.length),_=[];let I=0;for(let E=0;E<=p;E++){let v=I+(this.i(E)&65535)+(T.i(E)&65535),g=(v>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=g>>>16,v&=65535,g&=65535,_[E]=g<<16|v}return new a(_,_[_.length-1]&-2147483648?-1:0)};function K(T,p){return T.add(D(p))}n.j=function(T){if(k(this)||k(T))return y;if(O(this))return O(T)?D(this).j(D(T)):D(D(this).j(T));if(O(T))return D(this.j(D(T)));if(this.l(S)<0&&T.l(S)<0)return f(this.m()*T.m());const p=this.g.length+T.g.length,_=[];for(var I=0;I<2*p;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<T.g.length;E++){const v=this.i(I)>>>16,g=this.i(I)&65535,At=T.i(E)>>>16,pe=T.i(E)&65535;_[2*I+2*E]+=g*pe,G(_,2*I+2*E),_[2*I+2*E+1]+=v*pe,G(_,2*I+2*E+1),_[2*I+2*E+1]+=g*At,G(_,2*I+2*E+1),_[2*I+2*E+2]+=v*At,G(_,2*I+2*E+2)}for(T=0;T<p;T++)_[T]=_[2*T+1]<<16|_[2*T];for(T=p;T<2*p;T++)_[T]=0;return new a(_,0)};function G(T,p){for(;(T[p]&65535)!=T[p];)T[p+1]+=T[p]>>>16,T[p]&=65535,p++}function W(T,p){this.g=T,this.h=p}function lt(T,p){if(k(p))throw Error("division by zero");if(k(T))return new W(y,y);if(O(T))return p=lt(D(T),p),new W(D(p.g),D(p.h));if(O(p))return p=lt(T,D(p)),new W(D(p.g),p.h);if(T.g.length>30){if(O(T)||O(p))throw Error("slowDivide_ only works with positive integers.");for(var _=w,I=p;I.l(T)<=0;)_=St(_),I=St(I);var E=st(_,1),v=st(I,1);for(I=st(I,2),_=st(_,2);!k(I);){var g=v.add(I);g.l(T)<=0&&(E=E.add(_),v=g),I=st(I,1),_=st(_,1)}return p=K(T,E.j(p)),new W(E,p)}for(E=y;T.l(p)>=0;){for(_=Math.max(1,Math.floor(T.m()/p.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),v=f(_),g=v.j(p);O(g)||g.l(T)>0;)_-=I,v=f(_),g=v.j(p);k(v)&&(v=w),E=E.add(v),T=K(T,g)}return new W(E,T)}n.B=function(T){return lt(this,T).h},n.and=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)&T.i(I);return new a(_,this.h&T.h)},n.or=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)|T.i(I);return new a(_,this.h|T.h)},n.xor=function(T){const p=Math.max(this.g.length,T.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)^T.i(I);return new a(_,this.h^T.h)};function St(T){const p=T.g.length+1,_=[];for(let I=0;I<p;I++)_[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(_,T.h)}function st(T,p){const _=p>>5;p%=32;const I=T.g.length-_,E=[];for(let v=0;v<I;v++)E[v]=p>0?T.i(v+_)>>>p|T.i(v+_+1)<<32-p:T.i(v+_);return new a(E,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Lc=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,re=a}).apply(typeof la!="undefined"?la:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var er=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Fc,mn,Uc,or,Os,Bc,jc,qc;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof er=="object"&&er];for(var c=0;c<i.length;++c){var u=i[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,c){if(c)t:{var u=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var A=i[d];if(!(A in u))break t;u=u[A]}i=i[i.length-1],d=u[i],c=c(d),c!=d&&c!=null&&t(u,i,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(c){var u=[],d;for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&u.push([d,c[d]]);return u}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function h(i,c,u){return i.call.apply(i.bind,arguments)}function f(i,c,u){return f=h,f.apply(null,arguments)}function m(i,c){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function y(i,c){function u(){}u.prototype=c.prototype,i.Z=c.prototype,i.prototype=new u,i.prototype.constructor=i,i.Ob=function(d,A,R){for(var V=Array(arguments.length-2),B=2;B<arguments.length;B++)V[B-2]=arguments[B];return c.prototype[A].apply(d,V)}}var w=typeof AsyncContext!="undefined"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function S(i){const c=i.length;if(c>0){const u=Array(c);for(let d=0;d<c;d++)u[d]=i[d];return u}return[]}function k(i,c){for(let d=1;d<arguments.length;d++){const A=arguments[d];var u=typeof A;if(u=u!="object"?u:A?Array.isArray(A)?"array":u:"null",u=="array"||u=="object"&&typeof A.length=="number"){u=i.length||0;const R=A.length||0;i.length=u+R;for(let V=0;V<R;V++)i[u+V]=A[V]}else i.push(A)}}class O{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function D(i){a.setTimeout(()=>{throw i},0)}function K(){var i=T;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class G{constructor(){this.h=this.g=null}add(c,u){const d=W.get();d.set(c,u),this.h?this.h.next=d:this.g=d,this.h=d}}var W=new O(()=>new lt,i=>i.reset());class lt{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let St,st=!1,T=new G,p=()=>{const i=Promise.resolve(void 0);St=()=>{i.then(_)}};function _(){for(var i;i=K();){try{i.h.call(i.g)}catch(u){D(u)}var c=W;c.j(i),c.h<100&&(c.h++,i.next=c.g,c.g=i)}st=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var v=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};a.addEventListener("test",u,c),a.removeEventListener("test",u,c)}catch(u){}return i}();function g(i){return/^[\s\xa0]*$/.test(i)}function At(i,c){E.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,c)}y(At,E),At.prototype.init=function(i,c){const u=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget,c||(u=="mouseover"?c=i.fromElement:u=="mouseout"&&(c=i.toElement)),this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&At.Z.h.call(this)},At.prototype.h=function(){At.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var pe="closure_listenable_"+(Math.random()*1e6|0),hl=0;function fl(i,c,u,d,A){this.listener=i,this.proxy=null,this.src=c,this.type=u,this.capture=!!d,this.ha=A,this.key=++hl,this.da=this.fa=!1}function Bn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function jn(i,c,u){for(const d in i)c.call(u,i[d],d,i)}function dl(i,c){for(const u in i)c.call(void 0,i[u],u,i)}function Bi(i){const c={};for(const u in i)c[u]=i[u];return c}const ji="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function qi(i,c){let u,d;for(let A=1;A<arguments.length;A++){d=arguments[A];for(u in d)i[u]=d[u];for(let R=0;R<ji.length;R++)u=ji[R],Object.prototype.hasOwnProperty.call(d,u)&&(i[u]=d[u])}}function qn(i){this.src=i,this.g={},this.h=0}qn.prototype.add=function(i,c,u,d,A){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const V=Wr(i,c,d,A);return V>-1?(c=i[V],u||(c.fa=!1)):(c=new fl(c,this.src,R,!!d,A),c.fa=u,i.push(c)),c};function Kr(i,c){const u=c.type;if(u in i.g){var d=i.g[u],A=Array.prototype.indexOf.call(d,c,void 0),R;(R=A>=0)&&Array.prototype.splice.call(d,A,1),R&&(Bn(c),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Wr(i,c,u,d){for(let A=0;A<i.length;++A){const R=i[A];if(!R.da&&R.listener==c&&R.capture==!!u&&R.ha==d)return A}return-1}var Qr="closure_lm_"+(Math.random()*1e6|0),Xr={};function $i(i,c,u,d,A){if(Array.isArray(c)){for(let R=0;R<c.length;R++)$i(i,c[R],u,d,A);return null}return u=Hi(u),i&&i[pe]?i.J(c,u,l(d)?!!d.capture:!1,A):ml(i,c,u,!1,d,A)}function ml(i,c,u,d,A,R){if(!c)throw Error("Invalid event type");const V=l(A)?!!A.capture:!!A;let B=Jr(i);if(B||(i[Qr]=B=new qn(i)),u=B.add(c,u,d,V,R),u.proxy)return u;if(d=pl(),u.proxy=d,d.src=i,d.listener=u,i.addEventListener)v||(A=V),A===void 0&&(A=!1),i.addEventListener(c.toString(),d,A);else if(i.attachEvent)i.attachEvent(Gi(c.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function pl(){function i(u){return c.call(i.src,i.listener,u)}const c=gl;return i}function zi(i,c,u,d,A){if(Array.isArray(c))for(var R=0;R<c.length;R++)zi(i,c[R],u,d,A);else d=l(d)?!!d.capture:!!d,u=Hi(u),i&&i[pe]?(i=i.i,R=String(c).toString(),R in i.g&&(c=i.g[R],u=Wr(c,u,d,A),u>-1&&(Bn(c[u]),Array.prototype.splice.call(c,u,1),c.length==0&&(delete i.g[R],i.h--)))):i&&(i=Jr(i))&&(c=i.g[c.toString()],i=-1,c&&(i=Wr(c,u,d,A)),(u=i>-1?c[i]:null)&&Yr(u))}function Yr(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[pe])Kr(c.i,i);else{var u=i.type,d=i.proxy;c.removeEventListener?c.removeEventListener(u,d,i.capture):c.detachEvent?c.detachEvent(Gi(u),d):c.addListener&&c.removeListener&&c.removeListener(d),(u=Jr(c))?(Kr(u,i),u.h==0&&(u.src=null,c[Qr]=null)):Bn(i)}}}function Gi(i){return i in Xr?Xr[i]:Xr[i]="on"+i}function gl(i,c){if(i.da)i=!0;else{c=new At(c,this);const u=i.listener,d=i.ha||i.src;i.fa&&Yr(i),i=u.call(d,c)}return i}function Jr(i){return i=i[Qr],i instanceof qn?i:null}var Zr="__closure_events_fn_"+(Math.random()*1e9>>>0);function Hi(i){return typeof i=="function"?i:(i[Zr]||(i[Zr]=function(c){return i.handleEvent(c)}),i[Zr])}function gt(){I.call(this),this.i=new qn(this),this.M=this,this.G=null}y(gt,I),gt.prototype[pe]=!0,gt.prototype.removeEventListener=function(i,c,u,d){zi(this,i,c,u,d)};function Tt(i,c){var u,d=i.G;if(d)for(u=[];d;d=d.G)u.push(d);if(i=i.M,d=c.type||c,typeof c=="string")c=new E(c,i);else if(c instanceof E)c.target=c.target||i;else{var A=c;c=new E(d,i),qi(c,A)}A=!0;let R,V;if(u)for(V=u.length-1;V>=0;V--)R=c.g=u[V],A=$n(R,d,!0,c)&&A;if(R=c.g=i,A=$n(R,d,!0,c)&&A,A=$n(R,d,!1,c)&&A,u)for(V=0;V<u.length;V++)R=c.g=u[V],A=$n(R,d,!1,c)&&A}gt.prototype.N=function(){if(gt.Z.N.call(this),this.i){var i=this.i;for(const c in i.g){const u=i.g[c];for(let d=0;d<u.length;d++)Bn(u[d]);delete i.g[c],i.h--}}this.G=null},gt.prototype.J=function(i,c,u,d){return this.i.add(String(i),c,!1,u,d)},gt.prototype.K=function(i,c,u,d){return this.i.add(String(i),c,!0,u,d)};function $n(i,c,u,d){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();let A=!0;for(let R=0;R<c.length;++R){const V=c[R];if(V&&!V.da&&V.capture==u){const B=V.listener,it=V.ha||V.src;V.fa&&Kr(i.i,V),A=B.call(it,d)!==!1&&A}}return A&&!d.defaultPrevented}function _l(i,c){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(i,c||0)}function Ki(i){i.g=_l(()=>{i.g=null,i.i&&(i.i=!1,Ki(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class yl extends I{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Ki(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ye(i){I.call(this),this.h=i,this.g={}}y(Ye,I);var Wi=[];function Qi(i){jn(i.g,function(c,u){this.g.hasOwnProperty(u)&&Yr(c)},i),i.g={}}Ye.prototype.N=function(){Ye.Z.N.call(this),Qi(this)},Ye.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ts=a.JSON.stringify,El=a.JSON.parse,Tl=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Xi(){}function Yi(){}var Je={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function es(){E.call(this,"d")}y(es,E);function ns(){E.call(this,"c")}y(ns,E);var ge={},Ji=null;function zn(){return Ji=Ji||new gt}ge.Ia="serverreachability";function Zi(i){E.call(this,ge.Ia,i)}y(Zi,E);function Ze(i){const c=zn();Tt(c,new Zi(c))}ge.STAT_EVENT="statevent";function to(i,c){E.call(this,ge.STAT_EVENT,i),this.stat=c}y(to,E);function It(i){const c=zn();Tt(c,new to(c,i))}ge.Ja="timingevent";function eo(i,c){E.call(this,ge.Ja,i),this.size=c}y(eo,E);function tn(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},c)}function en(){this.g=!0}en.prototype.ua=function(){this.g=!1};function Il(i,c,u,d,A,R){i.info(function(){if(i.g)if(R){var V="",B=R.split("&");for(let Q=0;Q<B.length;Q++){var it=B[Q].split("=");if(it.length>1){const ht=it[0];it=it[1];const Nt=ht.split("_");V=Nt.length>=2&&Nt[1]=="type"?V+(ht+"="+it+"&"):V+(ht+"=redacted&")}}}else V=null;else V=R;return"XMLHTTP REQ ("+d+") [attempt "+A+"]: "+c+`
`+u+`
`+V})}function wl(i,c,u,d,A,R,V){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+A+"]: "+c+`
`+u+`
`+R+" "+V})}function Ne(i,c,u,d){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+vl(i,u)+(d?" "+d:"")})}function Al(i,c){i.info(function(){return"TIMEOUT: "+c})}en.prototype.info=function(){};function vl(i,c){if(!i.g)return c;if(!c)return null;try{const R=JSON.parse(c);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var u=R[i];if(!(u.length<2)){var d=u[1];if(Array.isArray(d)&&!(d.length<1)){var A=d[0];if(A!="noop"&&A!="stop"&&A!="close")for(let V=1;V<d.length;V++)d[V]=""}}}}return ts(R)}catch(R){return c}}var Gn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},no={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ro;function rs(){}y(rs,Xi),rs.prototype.g=function(){return new XMLHttpRequest},ro=new rs;function nn(i){return encodeURIComponent(String(i))}function Rl(i){var c=1;i=i.split(":");const u=[];for(;c>0&&i.length;)u.push(i.shift()),c--;return i.length&&u.push(i.join(":")),u}function Wt(i,c,u,d){this.j=i,this.i=c,this.l=u,this.S=d||1,this.V=new Ye(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new so}function so(){this.i=null,this.g="",this.h=!1}var io={},ss={};function is(i,c,u){i.M=1,i.A=Kn(Dt(c)),i.u=u,i.R=!0,oo(i,null)}function oo(i,c){i.F=Date.now(),Hn(i),i.B=Dt(i.A);var u=i.B,d=i.S;Array.isArray(d)||(d=[String(d)]),To(u.i,"t",d),i.C=0,u=i.j.L,i.h=new so,i.g=Fo(i.j,u?c:null,!i.u),i.P>0&&(i.O=new yl(f(i.Y,i,i.g),i.P)),c=i.V,u=i.g,d=i.ba;var A="readystatechange";Array.isArray(A)||(A&&(Wi[0]=A.toString()),A=Wi);for(let R=0;R<A.length;R++){const V=$i(u,A[R],d||c.handleEvent,!1,c.h||c);if(!V)break;c.g[V.key]=V}c=i.J?Bi(i.J):{},i.u?(i.v||(i.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,c)):(i.v="GET",i.g.ea(i.B,i.v,null,c)),Ze(),Il(i.i,i.v,i.B,i.l,i.S,i.u)}Wt.prototype.ba=function(i){i=i.target;const c=this.O;c&&Yt(i)==3?c.j():this.Y(i)},Wt.prototype.Y=function(i){try{if(i==this.g)t:{const B=Yt(this.g),it=this.g.ya(),Q=this.g.ca();if(!(B<3)&&(B!=3||this.g&&(this.h.h||this.g.la()||Co(this.g)))){this.K||B!=4||it==7||(it==8||Q<=0?Ze(3):Ze(2)),os(this);var c=this.g.ca();this.X=c;var u=Sl(this);if(this.o=c==200,wl(this.i,this.v,this.B,this.l,this.S,B,c),this.o){if(this.U&&!this.L){e:{if(this.g){var d,A=this.g;if((d=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(d)){var R=d;break e}}R=null}if(i=R)Ne(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,as(this,i);else{this.o=!1,this.m=3,It(12),_e(this),rn(this);break t}}if(this.R){i=!0;let ht;for(;!this.K&&this.C<u.length;)if(ht=Cl(this,u),ht==ss){B==4&&(this.m=4,It(14),i=!1),Ne(this.i,this.l,null,"[Incomplete Response]");break}else if(ht==io){this.m=4,It(15),Ne(this.i,this.l,u,"[Invalid Chunk]"),i=!1;break}else Ne(this.i,this.l,ht,null),as(this,ht);if(ao(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),B!=4||u.length!=0||this.h.h||(this.m=1,It(16),i=!1),this.o=this.o&&i,!i)Ne(this.i,this.l,u,"[Invalid Chunked Response]"),_e(this),rn(this);else if(u.length>0&&!this.W){this.W=!0;var V=this.j;V.g==this&&V.aa&&!V.P&&(V.j.info("Great, no buffering proxy detected. Bytes received: "+u.length),ps(V),V.P=!0,It(11))}}else Ne(this.i,this.l,u,null),as(this,u);B==4&&_e(this),this.o&&!this.K&&(B==4?Mo(this.j,this):(this.o=!1,Hn(this)))}else jl(this.g),c==400&&u.indexOf("Unknown SID")>0?(this.m=3,It(12)):(this.m=0,It(13)),_e(this),rn(this)}}}catch(B){}finally{}};function Sl(i){if(!ao(i))return i.g.la();const c=Co(i.g);if(c==="")return"";let u="";const d=c.length,A=Yt(i.g)==4;if(!i.h.i){if(typeof TextDecoder=="undefined")return _e(i),rn(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<d;R++)i.h.h=!0,u+=i.h.i.decode(c[R],{stream:!(A&&R==d-1)});return c.length=0,i.h.g+=u,i.C=0,i.h.g}function ao(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Cl(i,c){var u=i.C,d=c.indexOf(`
`,u);return d==-1?ss:(u=Number(c.substring(u,d)),isNaN(u)?io:(d+=1,d+u>c.length?ss:(c=c.slice(d,d+u),i.C=d+u,c)))}Wt.prototype.cancel=function(){this.K=!0,_e(this)};function Hn(i){i.T=Date.now()+i.H,co(i,i.H)}function co(i,c){if(i.D!=null)throw Error("WatchDog timer not null");i.D=tn(f(i.aa,i),c)}function os(i){i.D&&(a.clearTimeout(i.D),i.D=null)}Wt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Al(this.i,this.B),this.M!=2&&(Ze(),It(17)),_e(this),this.m=2,rn(this)):co(this,this.T-i)};function rn(i){i.j.I==0||i.K||Mo(i.j,i)}function _e(i){os(i);var c=i.O;c&&typeof c.dispose=="function"&&c.dispose(),i.O=null,Qi(i.V),i.g&&(c=i.g,i.g=null,c.abort(),c.dispose())}function as(i,c){try{var u=i.j;if(u.I!=0&&(u.g==i||cs(u.h,i))){if(!i.L&&cs(u.h,i)&&u.I==3){try{var d=u.Ba.g.parse(c)}catch(Q){d=null}if(Array.isArray(d)&&d.length==3){var A=d;if(A[0]==0){t:if(!u.v){if(u.g)if(u.g.F+3e3<i.F)Jn(u),Xn(u);else break t;ms(u),It(18)}}else u.xa=A[1],0<u.xa-u.K&&A[2]<37500&&u.F&&u.A==0&&!u.C&&(u.C=tn(f(u.Va,u),6e3));ho(u.h)<=1&&u.ta&&(u.ta=void 0)}else Ee(u,11)}else if((i.L||u.g==i)&&Jn(u),!g(c))for(A=u.Ba.g.parse(c),c=0;c<A.length;c++){let Q=A[c];const ht=Q[0];if(!(ht<=u.K))if(u.K=ht,Q=Q[1],u.I==2)if(Q[0]=="c"){u.M=Q[1],u.ba=Q[2];const Nt=Q[3];Nt!=null&&(u.ka=Nt,u.j.info("VER="+u.ka));const Te=Q[4];Te!=null&&(u.za=Te,u.j.info("SVER="+u.za));const Jt=Q[5];Jt!=null&&typeof Jt=="number"&&Jt>0&&(d=1.5*Jt,u.O=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const Zt=i.g;if(Zt){const tr=Zt.g?Zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(tr){var R=d.h;R.g||tr.indexOf("spdy")==-1&&tr.indexOf("quic")==-1&&tr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(us(R,R.h),R.h=null))}if(d.G){const gs=Zt.g?Zt.g.getResponseHeader("X-HTTP-Session-Id"):null;gs&&(d.wa=gs,X(d.J,d.G,gs))}}u.I=3,u.l&&u.l.ra(),u.aa&&(u.T=Date.now()-i.F,u.j.info("Handshake RTT: "+u.T+"ms")),d=u;var V=i;if(d.na=Lo(d,d.L?d.ba:null,d.W),V.L){fo(d.h,V);var B=V,it=d.O;it&&(B.H=it),B.D&&(os(B),Hn(B)),d.g=V}else No(d);u.i.length>0&&Yn(u)}else Q[0]!="stop"&&Q[0]!="close"||Ee(u,7);else u.I==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Ee(u,7):ds(u):Q[0]!="noop"&&u.l&&u.l.qa(Q),u.A=0)}}Ze(4)}catch(Q){}}var bl=class{constructor(i,c){this.g=i,this.map=c}};function uo(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function lo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function ho(i){return i.h?1:i.g?i.g.size:0}function cs(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function us(i,c){i.g?i.g.add(c):i.h=c}function fo(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}uo.prototype.cancel=function(){if(this.i=mo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function mo(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const u of i.g.values())c=c.concat(u.G);return c}return S(i.i)}var po=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pl(i,c){if(i){i=i.split("&");for(let u=0;u<i.length;u++){const d=i[u].indexOf("=");let A,R=null;d>=0?(A=i[u].substring(0,d),R=i[u].substring(d+1)):A=i[u],c(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Qt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;i instanceof Qt?(this.l=i.l,sn(this,i.j),this.o=i.o,this.g=i.g,on(this,i.u),this.h=i.h,ls(this,Io(i.i)),this.m=i.m):i&&(c=String(i).match(po))?(this.l=!1,sn(this,c[1]||"",!0),this.o=an(c[2]||""),this.g=an(c[3]||"",!0),on(this,c[4]),this.h=an(c[5]||"",!0),ls(this,c[6]||"",!0),this.m=an(c[7]||"")):(this.l=!1,this.i=new un(null,this.l))}Qt.prototype.toString=function(){const i=[];var c=this.j;c&&i.push(cn(c,go,!0),":");var u=this.g;return(u||c=="file")&&(i.push("//"),(c=this.o)&&i.push(cn(c,go,!0),"@"),i.push(nn(u).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.u,u!=null&&i.push(":",String(u))),(u=this.h)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(cn(u,u.charAt(0)=="/"?Nl:Dl,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",cn(u,Ml)),i.join("")},Qt.prototype.resolve=function(i){const c=Dt(this);let u=!!i.j;u?sn(c,i.j):u=!!i.o,u?c.o=i.o:u=!!i.g,u?c.g=i.g:u=i.u!=null;var d=i.h;if(u)on(c,i.u);else if(u=!!i.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var A=c.h.lastIndexOf("/");A!=-1&&(d=c.h.slice(0,A+1)+d)}if(A=d,A==".."||A==".")d="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){d=A.lastIndexOf("/",0)==0,A=A.split("/");const R=[];for(let V=0;V<A.length;){const B=A[V++];B=="."?d&&V==A.length&&R.push(""):B==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),d&&V==A.length&&R.push("")):(R.push(B),d=!0)}d=R.join("/")}else d=A}return u?c.h=d:u=i.i.toString()!=="",u?ls(c,Io(i.i)):u=!!i.m,u&&(c.m=i.m),c};function Dt(i){return new Qt(i)}function sn(i,c,u){i.j=u?an(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function on(i,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);i.u=c}else i.u=null}function ls(i,c,u){c instanceof un?(i.i=c,Ol(i.i,i.l)):(u||(c=cn(c,kl)),i.i=new un(c,i.l))}function X(i,c,u){i.i.set(c,u)}function Kn(i){return X(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function an(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function cn(i,c,u){return typeof i=="string"?(i=encodeURI(i).replace(c,Vl),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Vl(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var go=/[#\/\?@]/g,Dl=/[#\?:]/g,Nl=/[#\?]/g,kl=/[#\?@]/g,Ml=/#/g;function un(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function ye(i){i.g||(i.g=new Map,i.h=0,i.i&&Pl(i.i,function(c,u){i.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}n=un.prototype,n.add=function(i,c){ye(this),this.i=null,i=ke(this,i);let u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(c),this.h+=1,this};function _o(i,c){ye(i),c=ke(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function yo(i,c){return ye(i),c=ke(i,c),i.g.has(c)}n.forEach=function(i,c){ye(this),this.g.forEach(function(u,d){u.forEach(function(A){i.call(c,A,d,this)},this)},this)};function Eo(i,c){ye(i);let u=[];if(typeof c=="string")yo(i,c)&&(u=u.concat(i.g.get(ke(i,c))));else for(i=Array.from(i.g.values()),c=0;c<i.length;c++)u=u.concat(i[c]);return u}n.set=function(i,c){return ye(this),this.i=null,i=ke(this,i),yo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=Eo(this,i),i.length>0?String(i[0]):c):c};function To(i,c,u){_o(i,c),u.length>0&&(i.i=null,i.g.set(ke(i,c),S(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(let d=0;d<c.length;d++){var u=c[d];const A=nn(u);u=Eo(this,u);for(let R=0;R<u.length;R++){let V=A;u[R]!==""&&(V+="="+nn(u[R])),i.push(V)}}return this.i=i.join("&")};function Io(i){const c=new un;return c.i=i.i,i.g&&(c.g=new Map(i.g),c.h=i.h),c}function ke(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function Ol(i,c){c&&!i.j&&(ye(i),i.i=null,i.g.forEach(function(u,d){const A=d.toLowerCase();d!=A&&(_o(this,d),To(this,A,u))},i)),i.j=c}function xl(i,c){const u=new en;if(a.Image){const d=new Image;d.onload=m(Xt,u,"TestLoadImage: loaded",!0,c,d),d.onerror=m(Xt,u,"TestLoadImage: error",!1,c,d),d.onabort=m(Xt,u,"TestLoadImage: abort",!1,c,d),d.ontimeout=m(Xt,u,"TestLoadImage: timeout",!1,c,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else c(!1)}function Ll(i,c){const u=new en,d=new AbortController,A=setTimeout(()=>{d.abort(),Xt(u,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:d.signal}).then(R=>{clearTimeout(A),R.ok?Xt(u,"TestPingServer: ok",!0,c):Xt(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),Xt(u,"TestPingServer: error",!1,c)})}function Xt(i,c,u,d,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),d(u)}catch(R){}}function Fl(){this.g=new Tl}function hs(i){this.i=i.Sb||null,this.h=i.ab||!1}y(hs,Xi),hs.prototype.g=function(){return new Wn(this.i,this.h)};function Wn(i,c){gt.call(this),this.H=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}y(Wn,gt),n=Wn.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=c,this.readyState=1,hn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(c.body=i),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ln(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,hn(this)),this.g&&(this.readyState=3,hn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream!="undefined"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;wo(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function wo(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?ln(this):hn(this),this.readyState==3&&wo(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,ln(this))},n.Na=function(i){this.g&&(this.response=i,ln(this))},n.ga=function(){this.g&&ln(this)};function ln(i){i.readyState=4,i.l=null,i.j=null,i.B=null,hn(i)}n.setRequestHeader=function(i,c){this.A.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=c.next();return i.join(`\r
`)};function hn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Wn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Ao(i){let c="";return jn(i,function(u,d){c+=d,c+=":",c+=u,c+=`\r
`}),c}function fs(i,c,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=Ao(u),typeof i=="string"?u!=null&&nn(u):X(i,c,u))}function tt(i){gt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}y(tt,gt);var Ul=/^https?$/i,Bl=["POST","PUT"];n=tt.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,c,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ro.g(),this.g.onreadystatechange=w(f(this.Ca,this));try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(R){vo(this,R);return}if(i=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var A in d)u.set(A,d[A]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())u.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(R=>R.toLowerCase()=="content-type"),A=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Bl,c,void 0)>=0)||d||A||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,V]of u)this.g.setRequestHeader(R,V);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){vo(this,R)}};function vo(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.o=5,Ro(i),Qn(i)}function Ro(i){i.A||(i.A=!0,Tt(i,"complete"),Tt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,Tt(this,"complete"),Tt(this,"abort"),Qn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qn(this,!0)),tt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?So(this):this.Xa())},n.Xa=function(){So(this)};function So(i){if(i.h&&typeof o!="undefined"){if(i.v&&Yt(i)==4)setTimeout(i.Ca.bind(i),0);else if(Tt(i,"readystatechange"),Yt(i)==4){i.h=!1;try{const R=i.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var u;if(!(u=c)){var d;if(d=R===0){let V=String(i.D).match(po)[1]||null;!V&&a.self&&a.self.location&&(V=a.self.location.protocol.slice(0,-1)),d=!Ul.test(V?V.toLowerCase():"")}u=d}if(u)Tt(i,"complete"),Tt(i,"success");else{i.o=6;try{var A=Yt(i)>2?i.g.statusText:""}catch(V){A=""}i.l=A+" ["+i.ca()+"]",Ro(i)}}finally{Qn(i)}}}}function Qn(i,c){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const u=i.g;i.g=null,c||Tt(i,"ready");try{u.onreadystatechange=null}catch(d){}}}n.isActive=function(){return!!this.g};function Yt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Yt(this)>2?this.g.status:-1}catch(i){return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch(i){return""}},n.La=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),El(c)}};function Co(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch(c){return null}}function jl(i){const c={};i=(i.g&&Yt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(g(i[d]))continue;var u=Rl(i[d]);const A=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const R=c[A]||[];c[A]=R,R.push(u)}dl(c,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function fn(i,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||c}function bo(i){this.za=0,this.i=[],this.j=new en,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=fn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=fn("baseRetryDelayMs",5e3,i),this.Za=fn("retryDelaySeedMs",1e4,i),this.Ta=fn("forwardChannelMaxRetries",2,i),this.va=fn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new uo(i&&i.concurrentRequestLimit),this.Ba=new Fl,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=bo.prototype,n.ka=8,n.I=1,n.connect=function(i,c,u,d){It(0),this.W=i,this.H=c||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.J=Lo(this,null,this.W),Yn(this)};function ds(i){if(Po(i),i.I==3){var c=i.V++,u=Dt(i.J);if(X(u,"SID",i.M),X(u,"RID",c),X(u,"TYPE","terminate"),dn(i,u),c=new Wt(i,i.j,c),c.M=2,c.A=Kn(Dt(u)),u=!1,a.navigator&&a.navigator.sendBeacon)try{u=a.navigator.sendBeacon(c.A.toString(),"")}catch(d){}!u&&a.Image&&(new Image().src=c.A,u=!0),u||(c.g=Fo(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Hn(c)}xo(i)}function Xn(i){i.g&&(ps(i),i.g.cancel(),i.g=null)}function Po(i){Xn(i),i.v&&(a.clearTimeout(i.v),i.v=null),Jn(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function Yn(i){if(!lo(i.h)&&!i.m){i.m=!0;var c=i.Ea;St||p(),st||(St(),st=!0),T.add(c,i),i.D=0}}function ql(i,c){return ho(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=c.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=tn(f(i.Ea,i,c),Oo(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const A=new Wt(this,this.j,i);let R=this.o;if(this.U&&(R?(R=Bi(R),qi(R,this.U)):R=this.U),this.u!==null||this.R||(A.J=R,R=null),this.S)t:{for(var c=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,c>4096){c=u;break t}if(c===4096||u===this.i.length-1){c=u+1;break t}}c=1e3}else c=1e3;c=Do(this,A,c),u=Dt(this.J),X(u,"RID",i),X(u,"CVER",22),this.G&&X(u,"X-HTTP-Session-Id",this.G),dn(this,u),R&&(this.R?c="headers="+nn(Ao(R))+"&"+c:this.u&&fs(u,this.u,R)),us(this.h,A),this.Ra&&X(u,"TYPE","init"),this.S?(X(u,"$req",c),X(u,"SID","null"),A.U=!0,is(A,u,null)):is(A,u,c),this.I=2}}else this.I==3&&(i?Vo(this,i):this.i.length==0||lo(this.h)||Vo(this))};function Vo(i,c){var u;c?u=c.l:u=i.V++;const d=Dt(i.J);X(d,"SID",i.M),X(d,"RID",u),X(d,"AID",i.K),dn(i,d),i.u&&i.o&&fs(d,i.u,i.o),u=new Wt(i,i.j,u,i.D+1),i.u===null&&(u.J=i.o),c&&(i.i=c.G.concat(i.i)),c=Do(i,u,1e3),u.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),us(i.h,u),is(u,d,c)}function dn(i,c){i.H&&jn(i.H,function(u,d){X(c,d,u)}),i.l&&jn({},function(u,d){X(c,d,u)})}function Do(i,c,u){u=Math.min(i.i.length,u);const d=i.l?f(i.l.Ka,i.l,i):null;t:{var A=i.i;let B=-1;for(;;){const it=["count="+u];B==-1?u>0?(B=A[0].g,it.push("ofs="+B)):B=0:it.push("ofs="+B);let Q=!0;for(let ht=0;ht<u;ht++){var R=A[ht].g;const Nt=A[ht].map;if(R-=B,R<0)B=Math.max(0,A[ht].g-100),Q=!1;else try{R="req"+R+"_"||"";try{var V=Nt instanceof Map?Nt:Object.entries(Nt);for(const[Te,Jt]of V){let Zt=Jt;l(Jt)&&(Zt=ts(Jt)),it.push(R+Te+"="+encodeURIComponent(Zt))}}catch(Te){throw it.push(R+"type="+encodeURIComponent("_badmap")),Te}}catch(Te){d&&d(Nt)}}if(Q){V=it.join("&");break t}}V=void 0}return i=i.i.splice(0,u),c.G=i,V}function No(i){if(!i.g&&!i.v){i.Y=1;var c=i.Da;St||p(),st||(St(),st=!0),T.add(c,i),i.A=0}}function ms(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=tn(f(i.Da,i),Oo(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,ko(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=tn(f(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,It(10),Xn(this),ko(this))};function ps(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function ko(i){i.g=new Wt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var c=Dt(i.na);X(c,"RID","rpc"),X(c,"SID",i.M),X(c,"AID",i.K),X(c,"CI",i.F?"0":"1"),!i.F&&i.ia&&X(c,"TO",i.ia),X(c,"TYPE","xmlhttp"),dn(i,c),i.u&&i.o&&fs(c,i.u,i.o),i.O&&(i.g.H=i.O);var u=i.g;i=i.ba,u.M=1,u.A=Kn(Dt(c)),u.u=null,u.R=!0,oo(u,i)}n.Va=function(){this.C!=null&&(this.C=null,Xn(this),ms(this),It(19))};function Jn(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function Mo(i,c){var u=null;if(i.g==c){Jn(i),ps(i),i.g=null;var d=2}else if(cs(i.h,c))u=c.G,fo(i.h,c),d=1;else return;if(i.I!=0){if(c.o)if(d==1){u=c.u?c.u.length:0,c=Date.now()-c.F;var A=i.D;d=zn(),Tt(d,new eo(d,u)),Yn(i)}else No(i);else if(A=c.m,A==3||A==0&&c.X>0||!(d==1&&ql(i,c)||d==2&&ms(i)))switch(u&&u.length>0&&(c=i.h,c.i=c.i.concat(u)),A){case 1:Ee(i,5);break;case 4:Ee(i,10);break;case 3:Ee(i,6);break;default:Ee(i,2)}}}function Oo(i,c){let u=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(u*=2),u*c}function Ee(i,c){if(i.j.info("Error code "+c),c==2){var u=f(i.bb,i),d=i.Ua;const A=!d;d=new Qt(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||sn(d,"https"),Kn(d),A?xl(d.toString(),u):Ll(d.toString(),u)}else It(2);i.I=0,i.l&&i.l.pa(c),xo(i),Po(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),It(2)):(this.j.info("Failed to ping google.com"),It(1))};function xo(i){if(i.I=0,i.ja=[],i.l){const c=mo(i.h);(c.length!=0||i.i.length!=0)&&(k(i.ja,c),k(i.ja,i.i),i.h.i.length=0,S(i.i),i.i.length=0),i.l.oa()}}function Lo(i,c,u){var d=u instanceof Qt?Dt(u):new Qt(u);if(d.g!="")c&&(d.g=c+"."+d.g),on(d,d.u);else{var A=a.location;d=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;const R=new Qt(null);d&&sn(R,d),c&&(R.g=c),A&&on(R,A),u&&(R.h=u),d=R}return u=i.G,c=i.wa,u&&c&&X(d,u,c),X(d,"VER",i.ka),dn(i,d),d}function Fo(i,c,u){if(c&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Aa&&!i.ma?new tt(new hs({ab:u})):new tt(i.ma),c.Fa(i.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Uo(){}n=Uo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Zn(){}Zn.prototype.g=function(i,c){return new Ct(i,c)};function Ct(i,c){gt.call(this),this.g=new bo(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(i?i["X-WebChannel-Client-Profile"]=c.sa:i={"X-WebChannel-Client-Profile":c.sa}),this.g.U=i,(i=c&&c.Qb)&&!g(i)&&(this.g.u=i),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new Me(this)}y(Ct,gt),Ct.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ct.prototype.close=function(){ds(this.g)},Ct.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.v&&(u={},u.__data__=ts(i),i=u);c.i.push(new bl(c.Ya++,i)),c.I==3&&Yn(c)},Ct.prototype.N=function(){this.g.l=null,delete this.j,ds(this.g),delete this.g,Ct.Z.N.call(this)};function Bo(i){es.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){t:{for(const u in c){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}y(Bo,es);function jo(){ns.call(this),this.status=1}y(jo,ns);function Me(i){this.g=i}y(Me,Uo),Me.prototype.ra=function(){Tt(this.g,"a")},Me.prototype.qa=function(i){Tt(this.g,new Bo(i))},Me.prototype.pa=function(i){Tt(this.g,new jo)},Me.prototype.oa=function(){Tt(this.g,"b")},Zn.prototype.createWebChannel=Zn.prototype.g,Ct.prototype.send=Ct.prototype.o,Ct.prototype.open=Ct.prototype.m,Ct.prototype.close=Ct.prototype.close,qc=function(){return new Zn},jc=function(){return zn()},Bc=ge,Os={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Gn.NO_ERROR=0,Gn.TIMEOUT=8,Gn.HTTP_ERROR=6,or=Gn,no.COMPLETE="complete",Uc=no,Yi.EventType=Je,Je.OPEN="a",Je.CLOSE="b",Je.ERROR="c",Je.MESSAGE="d",gt.prototype.listen=gt.prototype.J,mn=Yi,tt.prototype.listenOnce=tt.prototype.K,tt.prototype.getLastError=tt.prototype.Ha,tt.prototype.getLastErrorCode=tt.prototype.ya,tt.prototype.getStatus=tt.prototype.ca,tt.prototype.getResponseJson=tt.prototype.La,tt.prototype.getResponseText=tt.prototype.la,tt.prototype.send=tt.prototype.ea,tt.prototype.setWithCredentials=tt.prototype.Fa,Fc=tt}).apply(typeof er!="undefined"?er:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const ha="@firebase/firestore",fa="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}yt.UNAUTHENTICATED=new yt(null),yt.GOOGLE_CREDENTIALS=new yt("google-credentials-uid"),yt.FIRST_PARTY=new yt("first-party-uid"),yt.MOCK_USER=new yt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ke="12.7.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce=new ti("@firebase/firestore");function Oe(){return Ce.logLevel}function N(n,...t){if(Ce.logLevel<=z.DEBUG){const e=t.map(ci);Ce.debug(`Firestore (${Ke}): ${n}`,...e)}}function Ht(n,...t){if(Ce.logLevel<=z.ERROR){const e=t.map(ci);Ce.error(`Firestore (${Ke}): ${n}`,...e)}}function je(n,...t){if(Ce.logLevel<=z.WARN){const e=t.map(ci);Ce.warn(`Firestore (${Ke}): ${n}`,...e)}}function ci(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch(t){return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,$c(n,r,e)}function $c(n,t,e){let r=`FIRESTORE (${Ke}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch(s){r+=" CONTEXT: "+e}throw Ht(r),new Error(r)}function H(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||$c(t,s,r)}function U(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends fe{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class nm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(yt.UNAUTHENTICATED))}shutdown(){}}class rm{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class sm{constructor(t){this.t=t,this.currentUser=yt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new se;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new se,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(()=>b(this,null,function*(){yield h.promise,yield s(this.currentUser)}))},l=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new se)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new zc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string",2055,{h:t}),new yt(t)}}class im{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=yt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class om{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new im(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(yt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class da{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class am{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ef(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){H(this.o===void 0,3512);const r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new da(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(H(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new da(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(n){const t=typeof self!="undefined"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=cm(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function j(n,t){return n<t?-1:n>t?1:0}function xs(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return vs(s)===vs(o)?j(s,o):vs(s)?1:-1}return j(n.length,t.length)}const um=55296,lm=57343;function vs(n){const t=n.charCodeAt(0);return t>=um&&t<=lm}function qe(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma="__name__";class kt{constructor(t,e,r){e===void 0?e=0:e>t.length&&L(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&L(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return kt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof kt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=kt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return j(t.length,e.length)}static compareSegments(t,e){const r=kt.isNumericId(t),s=kt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?kt.extractNumericId(t).compare(kt.extractNumericId(e)):xs(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return re.fromString(t.substring(4,t.length-2))}}class J extends kt{construct(t,e,r){return new J(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new M(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new J(e)}static emptyPath(){return new J([])}}const hm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class mt extends kt{construct(t,e,r){return new mt(t,e,r)}static isValidIdentifier(t){return hm.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),mt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ma}static keyField(){return new mt([ma])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new M(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new M(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new M(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new M(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new mt(e)}static emptyPath(){return new mt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.path=t}static fromPath(t){return new x(J.fromString(t))}static fromName(t){return new x(J.fromString(t).popFirst(5))}static empty(){return new x(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&J.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return J.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new x(new J(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fm(n,t,e){if(!e)throw new M(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function dm(n,t,e,r){if(t===!0&&r===!0)throw new M(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function pa(n){if(!x.isDocumentKey(n))throw new M(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Gc(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function li(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":L(12329,{type:typeof n})}function be(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new M(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=li(n);throw new M(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n,t){const e={typeString:n};return t&&(e.value=t),e}function On(n,t){if(!Gc(n))throw new M(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new M(P.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga=-62135596800,_a=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*_a);return new Y(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<ga)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/_a}_compareTo(t){return this.seconds===t.seconds?j(this.nanoseconds,t.nanoseconds):j(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(On(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-ga;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:rt("string",Y._jsonSchemaVersion),seconds:rt("number"),nanoseconds:rt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(t){return new F(t)}static min(){return new F(new Y(0,0))}static max(){return new F(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=-1;function mm(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=F.fromTimestamp(r===1e9?new Y(e+1,0):new Y(e,r));return new oe(s,x.empty(),t)}function pm(n){return new oe(n.readTime,n.key,Sn)}class oe{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new oe(F.min(),x.empty(),Sn)}static max(){return new oe(F.max(),x.empty(),Sn)}}function gm(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=x.comparator(n.documentKey,t.documentKey),e!==0?e:j(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _m="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ym{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(n){return b(this,null,function*(){if(n.code!==P.FAILED_PRECONDITION||n.message!==_m)throw n;N("LocalStore","Unexpectedly lost primary lease")})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new C((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof C?e:C.resolve(e)}catch(e){return C.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):C.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):C.reject(e)}static resolve(t){return new C((e,r)=>{e(t)})}static reject(t){return new C((e,r)=>{r(t)})}static waitFor(t){return new C((e,r)=>{let s=0,o=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=C.resolve(!1);for(const r of t)e=e.next(s=>s?C.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new C((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{a[f]=m,++l,l===o&&r(a)},m=>s(m))}})}static doWhile(t,e){return new C((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function Em(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Qe(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Vr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hi=-1;function Dr(n){return n==null}function gr(n){return n===0&&1/n==-1/0}function Tm(n){return typeof n=="number"&&Number.isInteger(n)&&!gr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc="";function Im(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ya(t)),t=wm(n.get(e),t);return ya(t)}function wm(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case Hc:e+="";break;default:e+=o}}return e}function ya(n){return n+Hc+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ea(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function de(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Kc(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(t,e){this.comparator=t,this.root=e||dt.EMPTY}insert(t,e){return new Z(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,dt.BLACK,null,null))}remove(t){return new Z(this.comparator,this.root.remove(t,this.comparator).copy(null,null,dt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new nr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new nr(this.root,t,this.comparator,!1)}getReverseIterator(){return new nr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new nr(this.root,t,this.comparator,!0)}}class nr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class dt{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r!=null?r:dt.RED,this.left=s!=null?s:dt.EMPTY,this.right=o!=null?o:dt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new dt(t!=null?t:this.key,e!=null?e:this.value,r!=null?r:this.color,s!=null?s:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return dt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return dt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,dt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,dt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw L(27949);return t+(this.isRed()?0:1)}}dt.EMPTY=null,dt.RED=!0,dt.BLACK=!1;dt.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new dt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t){this.comparator=t,this.data=new Z(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ta(this.data.getIterator())}getIteratorFrom(t){return new Ta(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof ut)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new ut(this.comparator);return e.data=t,e}}class Ta{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this.fields=t,t.sort(mt.comparator)}static empty(){return new bt([])}unionWith(t){let e=new ut(mt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new bt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return qe(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException!="undefined"&&o instanceof DOMException?new Wc("Invalid base64 string: "+o):o}}(t);return new pt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new pt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return j(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}pt.EMPTY_BYTE_STRING=new pt("");const Am=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ae(n){if(H(!!n,39018),typeof n=="string"){let t=0;const e=Am.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ce(n){return typeof n=="string"?pt.fromBase64String(n):pt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="server_timestamp",Xc="__type__",Yc="__previous_value__",Jc="__local_write_time__";function fi(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Xc])==null?void 0:r.stringValue)===Qc}function Nr(n){const t=n.mapValue.fields[Yc];return fi(t)?Nr(t):t}function Cn(n){const t=ae(n.mapValue.fields[Jc].timestampValue);return new Y(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(t,e,r,s,o,a,l,h,f,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=m}}const _r="(default)";class bn{constructor(t,e){this.projectId=t,this.database=e||_r}static empty(){return new bn("","")}get isDefaultDatabase(){return this.database===_r}isEqual(t){return t instanceof bn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc="__type__",Rm="__max__",rr={mapValue:{}},tu="__vector__",yr="value";function ue(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?fi(n)?4:Cm(n)?9007199254740991:Sm(n)?10:11:L(28295,{value:n})}function jt(n,t){if(n===t)return!0;const e=ue(n);if(e!==ue(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Cn(n).isEqual(Cn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=ae(s.timestampValue),l=ae(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return ce(s.bytesValue).isEqual(ce(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return et(s.geoPointValue.latitude)===et(o.geoPointValue.latitude)&&et(s.geoPointValue.longitude)===et(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return et(s.integerValue)===et(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=et(s.doubleValue),l=et(o.doubleValue);return a===l?gr(a)===gr(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return qe(n.arrayValue.values||[],t.arrayValue.values||[],jt);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(Ea(a)!==Ea(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!jt(a[h],l[h])))return!1;return!0}(n,t);default:return L(52216,{left:n})}}function Pn(n,t){return(n.values||[]).find(e=>jt(e,t))!==void 0}function $e(n,t){if(n===t)return 0;const e=ue(n),r=ue(t);if(e!==r)return j(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,t.booleanValue);case 2:return function(o,a){const l=et(o.integerValue||o.doubleValue),h=et(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return Ia(n.timestampValue,t.timestampValue);case 4:return Ia(Cn(n),Cn(t));case 5:return xs(n.stringValue,t.stringValue);case 6:return function(o,a){const l=ce(o),h=ce(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const m=j(l[f],h[f]);if(m!==0)return m}return j(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const l=j(et(o.latitude),et(a.latitude));return l!==0?l:j(et(o.longitude),et(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return wa(n.arrayValue,t.arrayValue);case 10:return function(o,a){var w,S,k,O;const l=o.fields||{},h=a.fields||{},f=(w=l[yr])==null?void 0:w.arrayValue,m=(S=h[yr])==null?void 0:S.arrayValue,y=j(((k=f==null?void 0:f.values)==null?void 0:k.length)||0,((O=m==null?void 0:m.values)==null?void 0:O.length)||0);return y!==0?y:wa(f,m)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===rr.mapValue&&a===rr.mapValue)return 0;if(o===rr.mapValue)return 1;if(a===rr.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let y=0;y<h.length&&y<m.length;++y){const w=xs(h[y],m[y]);if(w!==0)return w;const S=$e(l[h[y]],f[m[y]]);if(S!==0)return S}return j(h.length,m.length)}(n.mapValue,t.mapValue);default:throw L(23264,{he:e})}}function Ia(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return j(n,t);const e=ae(n),r=ae(t),s=j(e.seconds,r.seconds);return s!==0?s:j(e.nanos,r.nanos)}function wa(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=$e(e[s],r[s]);if(o)return o}return j(e.length,r.length)}function ze(n){return Ls(n)}function Ls(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=ae(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return ce(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return x.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Ls(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Ls(e.fields[a])}`;return s+"}"}(n.mapValue):L(61005,{value:n})}function ar(n){switch(ue(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Nr(n);return t?16+ar(t):16;case 5:return 2*n.stringValue.length;case 6:return ce(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+ar(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return de(r.fields,(o,a)=>{s+=o.length+ar(a)}),s}(n.mapValue);default:throw L(13486,{value:n})}}function Fs(n){return!!n&&"integerValue"in n}function di(n){return!!n&&"arrayValue"in n}function Aa(n){return!!n&&"nullValue"in n}function va(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function cr(n){return!!n&&"mapValue"in n}function Sm(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Zc])==null?void 0:r.stringValue)===tu}function En(n){if(n.geoPointValue)return{geoPointValue:ot({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:ot({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return de(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=En(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=En(n.arrayValue.values[e]);return t}return ot({},n)}function Cm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Rm}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.value=t}static empty(){return new Rt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!cr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=En(e)}setAll(t){let e=mt.emptyPath(),r={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=En(a):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());cr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return jt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];cr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){de(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new Rt(En(this.value))}}function eu(n){const t=[];return de(n.fields,(e,r)=>{const s=new mt([e]);if(cr(r)){const o=eu(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new bt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new Et(t,0,F.min(),F.min(),F.min(),Rt.empty(),0)}static newFoundDocument(t,e,r,s){return new Et(t,1,e,F.min(),r,s,0)}static newNoDocument(t,e){return new Et(t,2,e,F.min(),F.min(),Rt.empty(),0)}static newUnknownDocument(t,e){return new Et(t,3,e,F.min(),F.min(),Rt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Rt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Et&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(t,e){this.position=t,this.inclusive=e}}function Ra(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),e.key):r=$e(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sa(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!jt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(t,e="asc"){this.field=t,this.dir=e}}function bm(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{}class at extends nu{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Vm(t,e,r):e==="array-contains"?new km(t,r):e==="in"?new Mm(t,r):e==="not-in"?new Om(t,r):e==="array-contains-any"?new xm(t,r):new at(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Dm(t,r):new Nm(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison($e(e,this.value)):e!==null&&ue(this.value)===ue(e)&&this.matchesComparison($e(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class qt extends nu{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new qt(t,e)}matches(t){return ru(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function ru(n){return n.op==="and"}function su(n){return Pm(n)&&ru(n)}function Pm(n){for(const t of n.filters)if(t instanceof qt)return!1;return!0}function Us(n){if(n instanceof at)return n.field.canonicalString()+n.op.toString()+ze(n.value);if(su(n))return n.filters.map(t=>Us(t)).join(",");{const t=n.filters.map(e=>Us(e)).join(",");return`${n.op}(${t})`}}function iu(n,t){return n instanceof at?function(r,s){return s instanceof at&&r.op===s.op&&r.field.isEqual(s.field)&&jt(r.value,s.value)}(n,t):n instanceof qt?function(r,s){return s instanceof qt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&iu(a,s.filters[l]),!0):!1}(n,t):void L(19439)}function ou(n){return n instanceof at?function(e){return`${e.field.canonicalString()} ${e.op} ${ze(e.value)}`}(n):n instanceof qt?function(e){return e.op.toString()+" {"+e.getFilters().map(ou).join(" ,")+"}"}(n):"Filter"}class Vm extends at{constructor(t,e,r){super(t,e,r),this.key=x.fromName(r.referenceValue)}matches(t){const e=x.comparator(t.key,this.key);return this.matchesComparison(e)}}class Dm extends at{constructor(t,e){super(t,"in",e),this.keys=au("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Nm extends at{constructor(t,e){super(t,"not-in",e),this.keys=au("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function au(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(r=>x.fromName(r.referenceValue))}class km extends at{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return di(e)&&Pn(e.arrayValue,this.value)}}class Mm extends at{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Pn(this.value.arrayValue,e)}}class Om extends at{constructor(t,e){super(t,"not-in",e)}matches(t){if(Pn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Pn(this.value.arrayValue,e)}}class xm extends at{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!di(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Pn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lm{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function Ca(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Lm(n,t,e,r,s,o,a)}function mi(n){const t=U(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Us(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Dr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>ze(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>ze(r)).join(",")),t.Te=e}return t.Te}function pi(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!bm(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!iu(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Sa(n.startAt,t.startAt)&&Sa(n.endAt,t.endAt)}function Bs(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Fm(n,t,e,r,s,o,a,l){return new kr(n,t,e,r,s,o,a,l)}function gi(n){return new kr(n)}function ba(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Um(n){return n.collectionGroup!==null}function Tn(n){const t=U(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ut(mt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Tr(o,r))}),e.has(mt.keyField().canonicalString())||t.Ie.push(new Tr(mt.keyField(),r))}return t.Ie}function Ot(n){const t=U(n);return t.Ee||(t.Ee=Bm(t,Tn(n))),t.Ee}function Bm(n,t){if(n.limitType==="F")return Ca(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Tr(s.field,o)});const e=n.endAt?new Er(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Er(n.startAt.position,n.startAt.inclusive):null;return Ca(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function js(n,t,e){return new kr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Mr(n,t){return pi(Ot(n),Ot(t))&&n.limitType===t.limitType}function cu(n){return`${mi(Ot(n))}|lt:${n.limitType}`}function xe(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>ou(s)).join(", ")}]`),Dr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>ze(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>ze(s)).join(",")),`Target(${r})`}(Ot(n))}; limitType=${n.limitType})`}function Or(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of Tn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,l,h){const f=Ra(a,l,h);return a.inclusive?f<=0:f<0}(r.startAt,Tn(r),s)||r.endAt&&!function(a,l,h){const f=Ra(a,l,h);return a.inclusive?f>=0:f>0}(r.endAt,Tn(r),s))}(n,t)}function jm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function uu(n){return(t,e)=>{let r=!1;for(const s of Tn(n)){const o=qm(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function qm(n,t,e){const r=n.field.isKeyField()?x.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?$e(h,f):L(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return L(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){de(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return Kc(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m=new Z(x.comparator);function Kt(){return $m}const lu=new Z(x.comparator);function pn(...n){let t=lu;for(const e of n)t=t.insert(e.key,e);return t}function hu(n){let t=lu;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function Ae(){return In()}function fu(){return In()}function In(){return new Ve(n=>n.toString(),(n,t)=>n.isEqual(t))}const zm=new Z(x.comparator),Gm=new ut(x.comparator);function q(...n){let t=Gm;for(const e of n)t=t.add(e);return t}const Hm=new ut(j);function Km(){return Hm}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:gr(t)?"-0":t}}function du(n){return{integerValue:""+n}}function mu(n,t){return Tm(t)?du(t):_i(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(){this._=void 0}}function Wm(n,t,e){return n instanceof Ir?function(s,o){const a={fields:{[Xc]:{stringValue:Qc},[Jc]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&fi(o)&&(o=Nr(o)),o&&(a.fields[Yc]=o),{mapValue:a}}(e,t):n instanceof Vn?gu(n,t):n instanceof Dn?_u(n,t):function(s,o){const a=pu(s,o),l=Pa(a)+Pa(s.Ae);return Fs(a)&&Fs(s.Ae)?du(l):_i(s.serializer,l)}(n,t)}function Qm(n,t,e){return n instanceof Vn?gu(n,t):n instanceof Dn?_u(n,t):e}function pu(n,t){return n instanceof Nn?function(r){return Fs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class Ir extends xr{}class Vn extends xr{constructor(t){super(),this.elements=t}}function gu(n,t){const e=yu(t);for(const r of n.elements)e.some(s=>jt(s,r))||e.push(r);return{arrayValue:{values:e}}}class Dn extends xr{constructor(t){super(),this.elements=t}}function _u(n,t){let e=yu(t);for(const r of n.elements)e=e.filter(s=>!jt(s,r));return{arrayValue:{values:e}}}class Nn extends xr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Pa(n){return et(n.integerValue||n.doubleValue)}function yu(n){return di(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(t,e){this.field=t,this.transform=e}}function Ym(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof Vn&&s instanceof Vn||r instanceof Dn&&s instanceof Dn?qe(r.elements,s.elements,jt):r instanceof Nn&&s instanceof Nn?jt(r.Ae,s.Ae):r instanceof Ir&&s instanceof Ir}(n.transform,t.transform)}class Jm{constructor(t,e){this.version=t,this.transformResults=e}}class xt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new xt}static exists(t){return new xt(void 0,t)}static updateTime(t){return new xt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ur(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Lr{}function Eu(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Iu(n.key,xt.none()):new xn(n.key,n.data,xt.none());{const e=n.data,r=Rt.empty();let s=new ut(mt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new me(n.key,r,new bt(s.toArray()),xt.none())}}function Zm(n,t,e){n instanceof xn?function(s,o,a){const l=s.value.clone(),h=Da(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof me?function(s,o,a){if(!ur(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Da(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Tu(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function wn(n,t,e,r){return n instanceof xn?function(o,a,l,h){if(!ur(o.precondition,a))return l;const f=o.value.clone(),m=Na(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof me?function(o,a,l,h){if(!ur(o.precondition,a))return l;const f=Na(o.fieldTransforms,h,a),m=a.data;return m.setAll(Tu(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(y=>y.field))}(n,t,e,r):function(o,a,l){return ur(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function tp(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=pu(r.transform,s||null);o!=null&&(e===null&&(e=Rt.empty()),e.set(r.field,o))}return e||null}function Va(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&qe(r,s,(o,a)=>Ym(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class xn extends Lr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class me extends Lr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Tu(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Da(n,t,e){const r=new Map;H(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,Qm(a,l,e[s]))}return r}function Na(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,Wm(o,a,t))}return r}class Iu extends Lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ep extends Lr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&Zm(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=wn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=wn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=fu();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Eu(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),q())}isEqual(t){return this.batchId===t.batchId&&qe(this.mutations,t.mutations,(e,r)=>Va(e,r))&&qe(this.baseMutations,t.baseMutations,(e,r)=>Va(e,r))}}class yi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){H(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=function(){return zm}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new yi(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt,$;function ip(n){switch(n){case P.OK:return L(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return L(15467,{code:n})}}function wu(n){if(n===void 0)return Ht("GRPC error has no .code"),P.UNKNOWN;switch(n){case nt.OK:return P.OK;case nt.CANCELLED:return P.CANCELLED;case nt.UNKNOWN:return P.UNKNOWN;case nt.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case nt.INTERNAL:return P.INTERNAL;case nt.UNAVAILABLE:return P.UNAVAILABLE;case nt.UNAUTHENTICATED:return P.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case nt.NOT_FOUND:return P.NOT_FOUND;case nt.ALREADY_EXISTS:return P.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return P.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case nt.ABORTED:return P.ABORTED;case nt.OUT_OF_RANGE:return P.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return P.UNIMPLEMENTED;case nt.DATA_LOSS:return P.DATA_LOSS;default:return L(39323,{code:n})}}($=nt||(nt={}))[$.OK=0]="OK",$[$.CANCELLED=1]="CANCELLED",$[$.UNKNOWN=2]="UNKNOWN",$[$.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",$[$.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",$[$.NOT_FOUND=5]="NOT_FOUND",$[$.ALREADY_EXISTS=6]="ALREADY_EXISTS",$[$.PERMISSION_DENIED=7]="PERMISSION_DENIED",$[$.UNAUTHENTICATED=16]="UNAUTHENTICATED",$[$.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",$[$.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",$[$.ABORTED=10]="ABORTED",$[$.OUT_OF_RANGE=11]="OUT_OF_RANGE",$[$.UNIMPLEMENTED=12]="UNIMPLEMENTED",$[$.INTERNAL=13]="INTERNAL",$[$.UNAVAILABLE=14]="UNAVAILABLE",$[$.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function op(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap=new re([4294967295,4294967295],0);function ka(n){const t=op().encode(n),e=new Lc;return e.update(t),new Uint8Array(e.digest())}function Ma(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new re([e,r],0),new re([s,o],0)]}class Ei{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new gn(`Invalid padding: ${e}`);if(r<0)throw new gn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new gn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new gn(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=re.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(re.fromNumber(r)));return s.compare(ap)===1&&(s=new re([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=ka(t),[r,s]=Ma(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new Ei(o,s,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.ge===0)return;const e=ka(t),[r,s]=Ma(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class gn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Ln.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Fr(F.min(),s,new Z(j),Kt(),q())}}class Ln{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Ln(r,e,q(),q(),q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class Au{constructor(t,e){this.targetId=t,this.Ce=e}}class vu{constructor(t,e,r=pt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Oa{constructor(){this.ve=0,this.Fe=xa(),this.Me=pt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=q(),e=q(),r=q();return this.Fe.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:L(38017,{changeType:o})}}),new Ln(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=xa()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,H(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class cp{constructor(t){this.Ge=t,this.ze=new Map,this.je=Kt(),this.Je=sr(),this.He=sr(),this.Ye=new Z(j)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:L(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((r,s)=>{this.rt(s)&&e(s)})}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(Bs(o))if(r===0){const a=new x(o.path);this.et(e,a,Et.newNoDocument(a,F.min()))}else H(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,f)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=ce(r).toUint8Array()}catch(h){if(h instanceof Wc)return je("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new Ei(a,s,o)}catch(h){return je(h instanceof gn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)}),s}Tt(t){const e=new Map;this.ze.forEach((o,a)=>{const l=this.ot(a);if(l){if(o.current&&Bs(l.target)){const h=new x(l.target.path);this.It(h).has(a)||this.Et(a,h)||this.et(a,h,Et.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.qe())}});let r=q();this.He.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const f=this.ot(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(t));const s=new Fr(t,e,this.Ye,this.je,r);return this.je=Kt(),this.Je=sr(),this.He=sr(),this.Ye=new Z(j),s}Xe(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Oa,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new ut(j),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new ut(j),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Oa),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function sr(){return new Z(x.comparator)}function xa(){return new Z(x.comparator)}const up={asc:"ASCENDING",desc:"DESCENDING"},lp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},hp={and:"AND",or:"OR"};class fp{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function qs(n,t){return n.useProto3Json||Dr(t)?t:{value:t}}function wr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Ru(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function dp(n,t){return wr(n,t.toTimestamp())}function Lt(n){return H(!!n,49232),F.fromTimestamp(function(e){const r=ae(e);return new Y(r.seconds,r.nanos)}(n))}function Ti(n,t){return $s(n,t).canonicalString()}function $s(n,t){const e=function(s){return new J(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Su(n){const t=J.fromString(n);return H(Du(t),10190,{key:t.toString()}),t}function zs(n,t){return Ti(n.databaseId,t.path)}function Rs(n,t){const e=Su(t);if(e.get(1)!==n.databaseId.projectId)throw new M(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new M(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new x(bu(e))}function Cu(n,t){return Ti(n.databaseId,t)}function mp(n){const t=Su(n);return t.length===4?J.emptyPath():bu(t)}function Gs(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function bu(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function La(n,t,e){return{name:zs(n,t),fields:e.value.mapValue.fields}}function pp(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:L(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?(H(m===void 0||typeof m=="string",58123),pt.fromBase64String(m||"")):(H(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),pt.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(f){const m=f.code===void 0?P.UNKNOWN:wu(f.code);return new M(m,f.message||"")}(a);e=new vu(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Rs(n,r.document.name),o=Lt(r.document.updateTime),a=r.document.createTime?Lt(r.document.createTime):F.min(),l=new Rt({mapValue:{fields:r.document.fields}}),h=Et.newFoundDocument(s,o,a,l),f=r.targetIds||[],m=r.removedTargetIds||[];e=new lr(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Rs(n,r.document),o=r.readTime?Lt(r.readTime):F.min(),a=Et.newNoDocument(s,o),l=r.removedTargetIds||[];e=new lr([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Rs(n,r.document),o=r.removedTargetIds||[];e=new lr([],o,s,null)}else{if(!("filter"in t))return L(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new sp(s,o),l=r.targetId;e=new Au(l,a)}}return e}function gp(n,t){let e;if(t instanceof xn)e={update:La(n,t.key,t.value)};else if(t instanceof Iu)e={delete:zs(n,t.key)};else if(t instanceof me)e={update:La(n,t.key,t.data),updateMask:Rp(t.fieldMask)};else{if(!(t instanceof ep))return L(16599,{Vt:t.type});e={verify:zs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const l=a.transform;if(l instanceof Ir)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Vn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Dn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Nn)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw L(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:dp(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:L(27497)}(n,t.precondition)),e}function _p(n,t){return n&&n.length>0?(H(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?Lt(s.updateTime):Lt(o);return a.isEqual(F.min())&&(a=Lt(o)),new Jm(a,s.transformResults||[])}(e,t))):[]}function yp(n,t){return{documents:[Cu(n,t.path)]}}function Ep(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Cu(n,s);const o=function(f){if(f.length!==0)return Vu(qt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(m=>function(w){return{field:Le(w.field),direction:wp(w.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=qs(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{ft:e,parent:s}}function Tp(n){let t=mp(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){H(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(y){const w=Pu(y);return w instanceof qt&&su(w)?w.getFilters():[w]}(e.where));let a=[];e.orderBy&&(a=function(y){return y.map(w=>function(k){return new Tr(Fe(k.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(w))}(e.orderBy));let l=null;e.limit&&(l=function(y){let w;return w=typeof y=="object"?y.value:y,Dr(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(y){const w=!!y.before,S=y.values||[];return new Er(S,w)}(e.startAt));let f=null;return e.endAt&&(f=function(y){const w=!y.before,S=y.values||[];return new Er(S,w)}(e.endAt)),Fm(t,s,a,o,l,"F",h,f)}function Ip(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Pu(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Fe(e.unaryFilter.field);return at.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Fe(e.unaryFilter.field);return at.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Fe(e.unaryFilter.field);return at.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Fe(e.unaryFilter.field);return at.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}}(n):n.fieldFilter!==void 0?function(e){return at.create(Fe(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return qt.create(e.compositeFilter.filters.map(r=>Pu(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}}(e.compositeFilter.op))}(n):L(30097,{filter:n})}function wp(n){return up[n]}function Ap(n){return lp[n]}function vp(n){return hp[n]}function Le(n){return{fieldPath:n.canonicalString()}}function Fe(n){return mt.fromServerFormat(n.fieldPath)}function Vu(n){return n instanceof at?function(e){if(e.op==="=="){if(va(e.value))return{unaryFilter:{field:Le(e.field),op:"IS_NAN"}};if(Aa(e.value))return{unaryFilter:{field:Le(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(va(e.value))return{unaryFilter:{field:Le(e.field),op:"IS_NOT_NAN"}};if(Aa(e.value))return{unaryFilter:{field:Le(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Le(e.field),op:Ap(e.op),value:e.value}}}(n):n instanceof qt?function(e){const r=e.getFilters().map(s=>Vu(s));return r.length===1?r[0]:{compositeFilter:{op:vp(e.op),filters:r}}}(n):L(54877,{filter:n})}function Rp(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Du(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(t,e,r,s,o=F.min(),a=F.min(),l=pt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new te(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(t){this.yt=t}}function Cp(n){const t=Tp({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?js(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(){this.Cn=new Pp}addToCollectionParentIndex(t,e){return this.Cn.add(e),C.resolve()}getCollectionParents(t,e){return C.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return C.resolve()}deleteFieldIndex(t,e){return C.resolve()}deleteAllFieldIndexes(t){return C.resolve()}createTargetIndexes(t,e){return C.resolve()}getDocumentsMatchingTarget(t,e){return C.resolve(null)}getIndexType(t,e){return C.resolve(0)}getFieldIndexes(t,e){return C.resolve([])}getNextCollectionGroupToUpdate(t){return C.resolve(null)}getMinOffset(t,e){return C.resolve(oe.min())}getMinOffsetFromCollectionGroup(t,e){return C.resolve(oe.min())}updateCollectionGroup(t,e,r){return C.resolve()}updateIndexEntries(t,e){return C.resolve()}}class Pp{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ut(J.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ut(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Nu=41943040;class vt{static withCacheSize(t){return new vt(t,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vt.DEFAULT_COLLECTION_PERCENTILE=10,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,vt.DEFAULT=new vt(Nu,vt.DEFAULT_COLLECTION_PERCENTILE,vt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),vt.DISABLED=new vt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Ge(0)}static cr(){return new Ge(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua="LruGarbageCollector",Vp=1048576;function Ba([n,t],[e,r]){const s=j(n,e);return s===0?j(t,r):s}class Dp{constructor(t){this.Ir=t,this.buffer=new ut(Ba),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Ba(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Np{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){N(Ua,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,()=>b(this,null,function*(){this.Rr=null;try{yield this.localStore.collectGarbage(this.garbageCollector)}catch(e){Qe(e)?N(Ua,"Ignoring IndexedDB error during garbage collection: ",e):yield We(e)}yield this.Vr(3e5)}))}}class kp{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return C.resolve(Vr.ce);const r=new Dp(e);return this.mr.forEachTarget(t,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(t,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.mr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Fa)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Fa):this.yr(t,e))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let r,s,o,a,l,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(y=>(y>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),s=this.params.maximumSequenceNumbersToCollect):s=y,a=Date.now(),this.nthSequenceNumber(t,s))).next(y=>(r=y,l=Date.now(),this.removeTargets(t,r,e))).next(y=>(o=y,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(y=>(f=Date.now(),Oe()<=z.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${y} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:y})))}}function Mp(n,t){return new kp(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(){this.changes=new Ve(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Et.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?C.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&wn(r.mutation,s,bt.empty(),Y.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,q()).next(()=>r))}getLocalViewOfDocuments(t,e,r=q()){const s=Ae();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=pn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=Ae();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,q()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,s){let o=Kt();const a=In(),l=function(){return In()}();return e.forEach((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof me)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),wn(m.mutation,f,m.mutation.getFieldMask(),Y.now())):a.set(f.key,bt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>a.set(f,m)),e.forEach((f,m)=>{var y;return l.set(f,new xp(m,(y=a.get(f))!=null?y:null))}),l))}recalculateAndSaveOverlays(t,e){const r=In();let s=new Z((a,l)=>a-l),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||bt.empty();m=l.applyToLocalView(f,m),r.set(h,m);const y=(s.get(l.batchId)||q()).add(h);s=s.insert(l.batchId,y)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,m=h.value,y=fu();m.forEach(w=>{if(!o.has(w)){const S=Eu(e.get(w),r.get(w));S!==null&&y.set(w,S),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,y))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(a){return x.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Um(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):C.resolve(Ae());let l=Sn,h=o;return a.next(f=>C.forEach(f,(m,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),o.get(m)?C.resolve():this.remoteDocumentCache.getEntry(t,m).next(w=>{h=h.insert(m,w)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,q())).next(m=>({batchId:l,changes:hu(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new x(e)).next(r=>{let s=pn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=pn();return this.indexManager.getCollectionParents(t,o).next(l=>C.forEach(l,h=>{const f=function(y,w){return new kr(w,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next(m=>{m.forEach((y,w)=>{a=a.insert(y,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,Et.newInvalidDocument(m)))});let l=pn();return a.forEach((h,f)=>{const m=o.get(h);m!==void 0&&wn(m.mutation,f,bt.empty(),Y.now()),Or(e,f)&&(l=l.insert(h,f))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return C.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Lt(s.createTime)}}(e)),C.resolve()}getNamedQuery(t,e){return C.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,function(s){return{name:s.name,query:Cp(s.bundledQuery),readTime:Lt(s.readTime)}}(e)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(){this.overlays=new Z(x.comparator),this.qr=new Map}getOverlay(t,e){return C.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Ae();return C.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.St(t,e,o)}),C.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.qr.delete(r)),C.resolve()}getOverlaysForCollection(t,e,r){const s=Ae(),o=e.length+1,a=new x(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return C.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new Z((f,m)=>f-m);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=Ae(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const l=Ae(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>l.set(f,m)),!(l.size()>=s)););return C.resolve(l)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new rp(e,r));let o=this.qr.get(e);o===void 0&&(o=q(),this.qr.set(e,o)),this.qr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(){this.sessionToken=pt.EMPTY_BYTE_STRING}getSessionToken(t){return C.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(){this.Qr=new ut(ft.$r),this.Ur=new ut(ft.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const r=new ft(t,e);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Gr(new ft(t,e))}zr(t,e){t.forEach(r=>this.removeReference(r,e))}jr(t){const e=new x(new J([])),r=new ft(e,t),s=new ft(e,t+1),o=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),o.push(a.key)}),o}Jr(){this.Qr.forEach(t=>this.Gr(t))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new x(new J([])),r=new ft(e,t),s=new ft(e,t+1);let o=q();return this.Ur.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ft(t,0),r=this.Qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ft{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return x.comparator(t.key,e.key)||j(t.Yr,e.Yr)}static Kr(t,e){return j(t.Yr,e.Yr)||x.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new ut(ft.$r)}checkEmpty(t){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new np(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new ft(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(t,e){return C.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ei(r),o=s<0?0:s;return C.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?hi:this.tr-1)}getAllMutationBatches(t){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ft(e,0),s=new ft(e,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([r,s],a=>{const l=this.Xr(a.Yr);o.push(l)}),C.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ut(j);return e.forEach(s=>{const o=new ft(s,0),a=new ft(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,a],l=>{r=r.add(l.Yr)})}),C.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const a=new ft(new x(o),0);let l=new ut(j);return this.Zr.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.Yr)),!0)},a),C.resolve(this.ti(l))}ti(t){const e=[];return t.forEach(r=>{const s=this.Xr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){H(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return C.forEach(e.mutations,s=>{const o=new ft(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Zr=r})}ir(t){}containsKey(t,e){const r=new ft(e,0),s=this.Zr.firstAfterOrEqual(r);return C.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,C.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{constructor(t){this.ri=t,this.docs=function(){return new Z(x.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ri(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return C.resolve(r?r.document.mutableCopy():Et.newInvalidDocument(e))}getEntries(t,e){let r=Kt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Et.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Kt();const a=e.path,l=new x(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||gm(pm(m),r)<=0||(s.has(m.key)||Or(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return C.resolve(o)}getAllFromCollectionGroup(t,e,r,s){L(9500)}ii(t,e){return C.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new $p(this)}getSize(t){return C.resolve(this.size)}}class $p extends Op{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(r)}),C.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(t){this.persistence=t,this.si=new Ve(e=>mi(e),pi),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.oi=0,this._i=new Ii,this.targetCount=0,this.ai=Ge.ur()}forEachTarget(t,e){return this.si.forEach((r,s)=>e(s)),C.resolve()}getLastRemoteSnapshotVersion(t){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return C.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.oi&&(this.oi=e),C.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Ge(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,C.resolve()}updateTargetData(t,e){return this.Pr(e),C.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,C.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.si.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.si.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),C.waitFor(o).next(()=>s)}getTargetCount(t){return C.resolve(this.targetCount)}getTargetData(t,e){const r=this.si.get(e)||null;return C.resolve(r)}addMatchingKeys(t,e,r){return this._i.Wr(e,r),C.resolve()}removeMatchingKeys(t,e,r){this._i.zr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),C.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),C.resolve()}getMatchingKeysForTargetId(t,e){const r=this._i.Hr(e);return C.resolve(r)}containsKey(t,e){return C.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(t,e){this.ui={},this.overlays={},this.ci=new Vr(0),this.li=!1,this.li=!0,this.hi=new Bp,this.referenceDelegate=t(this),this.Pi=new zp(this),this.indexManager=new bp,this.remoteDocumentCache=function(s){return new qp(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new Sp(e),this.Ii=new Fp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Up,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ui[t.toKey()];return r||(r=new jp(e,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);const s=new Gp(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(o=>this.referenceDelegate.di(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ai(t,e){return C.or(Object.values(this.ui).map(r=>()=>r.containsKey(t,e)))}}class Gp extends ym{constructor(t){super(),this.currentSequenceNumber=t}}class wi{constructor(t){this.persistence=t,this.Ri=new Ii,this.Vi=null}static mi(t){return new wi(t)}get fi(){if(this.Vi)return this.Vi;throw L(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.fi.delete(r.toString()),C.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.fi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),C.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.fi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.fi,r=>{const s=x.fromPath(r);return this.gi(t,s).next(o=>{o||e.removeEntry(s,F.min())})}).next(()=>(this.Vi=null,e.apply(t)))}updateLimboDocument(t,e){return this.gi(t,e).next(r=>{r?this.fi.delete(e.toString()):this.fi.add(e.toString())})}Ti(t){return 0}gi(t,e){return C.or([()=>C.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Ar{constructor(t,e){this.persistence=t,this.pi=new Ve(r=>Im(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Mp(this,e)}static mi(t,e){return new Ar(t,e)}Ei(){}di(t){return C.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}wr(t){let e=0;return this.pr(t,r=>{e++}).next(()=>e)}pr(t,e){return C.forEach(this.pi,(r,s)=>this.br(t,r,s).next(o=>o?C.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ii(t,a=>this.br(t,a,e).next(l=>{l||(r++,o.removeEntry(a,F.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),C.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),C.resolve()}removeReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),C.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),C.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=ar(t.data.value)),e}br(t,e,r){return C.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Es=r,this.ds=s}static As(t,e){let r=q(),s=q();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Ai(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return mh()?8:Em(hh())>0?6:4}()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ys(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ws(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Hp;return this.Ss(t,e,a).next(l=>{if(o.result=l,this.Vs)return this.bs(t,e,a,l.size)})}).next(()=>o.result)}bs(t,e,r,s){return r.documentReadCount<this.fs?(Oe()<=z.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",xe(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),C.resolve()):(Oe()<=z.DEBUG&&N("QueryEngine","Query:",xe(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Oe()<=z.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",xe(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ot(e))):C.resolve())}ys(t,e){if(ba(e))return C.resolve(null);let r=Ot(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=js(e,null,"F"),r=Ot(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=q(...o);return this.ps.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.Ds(e,l);return this.Cs(e,f,a,h.readTime)?this.ys(t,js(e,null,"F")):this.vs(t,f,e,h)}))})))}ws(t,e,r,s){return ba(e)||s.isEqual(F.min())?C.resolve(null):this.ps.getDocuments(t,r).next(o=>{const a=this.Ds(e,o);return this.Cs(e,a,r,s)?C.resolve(null):(Oe()<=z.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),xe(e)),this.vs(t,a,e,mm(s,Sn)).next(l=>l))})}Ds(t,e){let r=new ut(uu(t));return e.forEach((s,o)=>{Or(t,o)&&(r=r.add(o))}),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Ss(t,e,r){return Oe()<=z.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",xe(e)),this.ps.getDocumentsMatchingQuery(t,e,oe.min(),r)}vs(t,e,r,s){return this.ps.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi="LocalStore",Wp=3e8;class Qp{constructor(t,e,r,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new Z(j),this.xs=new Ve(o=>mi(o),pi),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Lp(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ms))}}function Xp(n,t,e,r){return new Qp(n,t,e,r)}function Mu(n,t){return b(this,null,function*(){const e=U(n);return yield e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Bs(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let h=q();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){l.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(f=>({Ls:f,removedBatchIds:a,addedBatchIds:l}))})})})}function Yp(n,t){const e=U(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.Ns.newChangeBuffer({trackRemovals:!0});return function(l,h,f,m){const y=f.batch,w=y.keys();let S=C.resolve();return w.forEach(k=>{S=S.next(()=>m.getEntry(h,k)).next(O=>{const D=f.docVersions.get(k);H(D!==null,48541),O.version.compareTo(D)<0&&(y.applyToRemoteDocument(O,f),O.isValidDocument()&&(O.setReadTime(f.commitVersion),m.addEntry(O)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(h,y))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=q();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function Ou(n){const t=U(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function Jp(n,t){const e=U(n),r=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const l=[];t.targetChanges.forEach((m,y)=>{const w=s.get(y);if(!w)return;l.push(e.Pi.removeMatchingKeys(o,m.removedDocuments,y).next(()=>e.Pi.addMatchingKeys(o,m.addedDocuments,y)));let S=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(y)!==null?S=S.withResumeToken(pt.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):m.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(m.resumeToken,r)),s=s.insert(y,S),function(O,D,K){return O.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=Wp?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(w,S,m)&&l.push(e.Pi.updateTargetData(o,S))});let h=Kt(),f=q();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),l.push(Zp(o,a,t.documentUpdates).next(m=>{h=m.ks,f=m.qs})),!r.isEqual(F.min())){const m=e.Pi.getLastRemoteSnapshotVersion(o).next(y=>e.Pi.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(m)}return C.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.Ms=s,o))}function Zp(n,t,e){let r=q(),s=q();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=Kt();return e.forEach((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(F.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):N(vi,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{ks:a,qs:s}})}function tg(n,t){const e=U(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=hi),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function eg(n,t){const e=U(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.Pi.getTargetData(r,t).next(o=>o?(s=o,C.resolve(s)):e.Pi.allocateTargetId(r).next(a=>(s=new te(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r})}function Hs(n,t,e){return b(this,null,function*(){const r=U(n),s=r.Ms.get(t),o=e?"readwrite":"readwrite-primary";try{e||(yield r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Qe(a))throw a;N(vi,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)})}function ja(n,t,e){const r=U(n);let s=F.min(),o=q();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,m){const y=U(h),w=y.xs.get(m);return w!==void 0?C.resolve(y.Ms.get(w)):y.Pi.getTargetData(f,m)}(r,a,Ot(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,t,e?s:F.min(),e?o:q())).next(l=>(ng(r,jm(t),l),{documents:l,Qs:o})))}function ng(n,t,e){let r=n.Os.get(t)||F.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Os.set(t,r)}class qa{constructor(){this.activeTargetIds=Km()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class rg{constructor(){this.Mo=new qa,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,r){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new qa,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="ConnectivityMonitor";class za{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N($a,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){N($a,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ir=null;function Ks(){return ir===null?ir=function(){return 268435456+Math.round(2147483648*Math.random())}():ir++,"0x"+ir.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss="RestConnection",ig={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class og{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===_r?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(t,e,r,s,o){const a=Ks(),l=this.zo(t,e.toUriEncodedString());N(Ss,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(h,s,o);const{host:f}=new URL(l),m=Zs(f);return this.Jo(t,l,h,r,m).then(y=>(N(Ss,`Received RPC '${t}' ${a}: `,y),y),y=>{throw je(Ss,`RPC '${t}' ${a} failed with error: `,y,"url: ",l,"request:",r),y})}Ho(t,e,r,s,o,a){return this.Go(t,e,r,s,o)}jo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ke}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}zo(t,e){const r=ig[t];return`${this.Uo}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t="WebChannelConnection";class cg extends og{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,o){const a=Ks();return new Promise((l,h)=>{const f=new Fc;f.setWithCredentials(!0),f.listenOnce(Uc.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case or.NO_ERROR:const y=f.getResponseJson();N(_t,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(y)),l(y);break;case or.TIMEOUT:N(_t,`RPC '${t}' ${a} timed out`),h(new M(P.DEADLINE_EXCEEDED,"Request time out"));break;case or.HTTP_ERROR:const w=f.getStatus();if(N(_t,`RPC '${t}' ${a} failed with status:`,w,"response text:",f.getResponseText()),w>0){let S=f.getResponseJson();Array.isArray(S)&&(S=S[0]);const k=S==null?void 0:S.error;if(k&&k.status&&k.message){const O=function(K){const G=K.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(G)>=0?G:P.UNKNOWN}(k.status);h(new M(O,k.message))}else h(new M(P.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new M(P.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:t,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{N(_t,`RPC '${t}' ${a} completed.`)}});const m=JSON.stringify(s);N(_t,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",m,r,15)})}T_(t,e,r){const s=Ks(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=qc(),l=jc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.jo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");N(_t,`Creating RPC '${t}' stream ${s}: ${m}`,h);const y=a.createWebChannel(m,h);this.I_(y);let w=!1,S=!1;const k=new ag({Yo:D=>{S?N(_t,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(w||(N(_t,`Opening RPC '${t}' stream ${s} transport.`),y.open(),w=!0),N(_t,`RPC '${t}' stream ${s} sending:`,D),y.send(D))},Zo:()=>y.close()}),O=(D,K,G)=>{D.listen(K,W=>{try{G(W)}catch(lt){setTimeout(()=>{throw lt},0)}})};return O(y,mn.EventType.OPEN,()=>{S||(N(_t,`RPC '${t}' stream ${s} transport opened.`),k.o_())}),O(y,mn.EventType.CLOSE,()=>{S||(S=!0,N(_t,`RPC '${t}' stream ${s} transport closed`),k.a_(),this.E_(y))}),O(y,mn.EventType.ERROR,D=>{S||(S=!0,je(_t,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),k.a_(new M(P.UNAVAILABLE,"The operation could not be completed")))}),O(y,mn.EventType.MESSAGE,D=>{var K;if(!S){const G=D.data[0];H(!!G,16349);const W=G,lt=(W==null?void 0:W.error)||((K=W[0])==null?void 0:K.error);if(lt){N(_t,`RPC '${t}' stream ${s} received error:`,lt);const St=lt.status;let st=function(_){const I=nt[_];if(I!==void 0)return wu(I)}(St),T=lt.message;st===void 0&&(st=P.INTERNAL,T="Unknown error status: "+St+" with message "+lt.message),S=!0,k.a_(new M(st,T)),y.close()}else N(_t,`RPC '${t}' stream ${s} received:`,G),k.u_(G)}}),O(l,Bc.STAT_EVENT,D=>{D.stat===Os.PROXY?N(_t,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===Os.NOPROXY&&N(_t,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.__()},0),k}terminate(){this.c_.forEach(t=>t.close()),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter(e=>e===t)}}function Cs(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return new fp(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Mi=t,this.timerId=e,this.d_=r,this.A_=s,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),t())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga="PersistentStream";class Lu{constructor(t,e,r,s,o,a,l,h){this.Mi=t,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new xu(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}stop(){return b(this,null,function*(){this.x_()&&(yield this.close(0))})}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(t){this.Q_(),this.stream.send(t)}k_(){return b(this,null,function*(){if(this.O_())return this.close(0)})}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}close(t,e){return b(this,null,function*(){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Ht(e.toString()),Ht("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,yield this.listener.r_(e)})}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===e&&this.G_(r,s)},r=>{t(()=>{const s=new M(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(t,e){const r=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(()=>b(this,null,function*(){this.state=0,this.start()}))}z_(t){return N(Ga,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget(()=>this.D_===t?e():(N(Ga,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ug extends Lu{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=pp(this.serializer,t),r=function(o){if(!("targetChange"in o))return F.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?Lt(a.readTime):F.min()}(t);return this.listener.H_(e,r)}Y_(t){const e={};e.database=Gs(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=Bs(h)?{documents:yp(o,h)}:{query:Ep(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Ru(o,a.resumeToken);const f=qs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(F.min())>0){l.readTime=wr(o,a.snapshotVersion.toTimestamp());const f=qs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,t);const r=Ip(this.serializer,t);r&&(e.labels=r),this.q_(e)}Z_(t){const e={};e.database=Gs(this.serializer),e.removeTarget=t,this.q_(e)}}class lg extends Lu{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return H(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){H(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=_p(t.writeResults,t.commitTime),r=Lt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=Gs(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>gp(this.serializer,r))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{}class fg extends hg{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Go(t,$s(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(P.UNKNOWN,o.toString())})}Ho(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Ho(t,$s(e,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(P.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class dg{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ht(e),this.aa=!1):N("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe="RemoteStore";class mg{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo(a=>{r.enqueueAndForget(()=>b(this,null,function*(){De(this)&&(N(Pe,"Restarting streams for network reachability change."),yield function(h){return b(this,null,function*(){const f=U(h);f.Ea.add(4),yield Fn(f),f.Ra.set("Unknown"),f.Ea.delete(4),yield Br(f)})}(this))}))}),this.Ra=new dg(r,s)}}function Br(n){return b(this,null,function*(){if(De(n))for(const t of n.da)yield t(!0)})}function Fn(n){return b(this,null,function*(){for(const t of n.da)yield t(!1)})}function Fu(n,t){const e=U(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),bi(e)?Ci(e):Xe(e).O_()&&Si(e,t))}function Ri(n,t){const e=U(n),r=Xe(e);e.Ia.delete(t),r.O_()&&Uu(e,t),e.Ia.size===0&&(r.O_()?r.L_():De(e)&&e.Ra.set("Unknown"))}function Si(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(F.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Xe(n).Y_(t)}function Uu(n,t){n.Va.Ue(t),Xe(n).Z_(t)}function Ci(n){n.Va=new cp({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),Xe(n).start(),n.Ra.ua()}function bi(n){return De(n)&&!Xe(n).x_()&&n.Ia.size>0}function De(n){return U(n).Ea.size===0}function Bu(n){n.Va=void 0}function pg(n){return b(this,null,function*(){n.Ra.set("Online")})}function gg(n){return b(this,null,function*(){n.Ia.forEach((t,e)=>{Si(n,t)})})}function _g(n,t){return b(this,null,function*(){Bu(n),bi(n)?(n.Ra.ha(t),Ci(n)):n.Ra.set("Unknown")})}function yg(n,t,e){return b(this,null,function*(){if(n.Ra.set("Online"),t instanceof vu&&t.state===2&&t.cause)try{yield function(s,o){return b(this,null,function*(){const a=o.cause;for(const l of o.targetIds)s.Ia.has(l)&&(yield s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))})}(n,t)}catch(r){N(Pe,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),yield vr(n,r)}else if(t instanceof lr?n.Va.Ze(t):t instanceof Au?n.Va.st(t):n.Va.tt(t),!e.isEqual(F.min()))try{const r=yield Ou(n.localStore);e.compareTo(r)>=0&&(yield function(o,a){const l=o.Va.Tt(a);return l.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ia.get(f);m&&o.Ia.set(f,m.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,f)=>{const m=o.Ia.get(h);if(!m)return;o.Ia.set(h,m.withResumeToken(pt.EMPTY_BYTE_STRING,m.snapshotVersion)),Uu(o,h);const y=new te(m.target,h,f,m.sequenceNumber);Si(o,y)}),o.remoteSyncer.applyRemoteEvent(l)}(n,e))}catch(r){N(Pe,"Failed to raise snapshot:",r),yield vr(n,r)}})}function vr(n,t,e){return b(this,null,function*(){if(!Qe(t))throw t;n.Ea.add(1),yield Fn(n),n.Ra.set("Offline"),e||(e=()=>Ou(n.localStore)),n.asyncQueue.enqueueRetryable(()=>b(this,null,function*(){N(Pe,"Retrying IndexedDB access"),yield e(),n.Ea.delete(1),yield Br(n)}))})}function ju(n,t){return t().catch(e=>vr(n,e,t))}function jr(n){return b(this,null,function*(){const t=U(n),e=le(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:hi;for(;Eg(t);)try{const s=yield tg(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,Tg(t,s)}catch(s){yield vr(t,s)}qu(t)&&$u(t)})}function Eg(n){return De(n)&&n.Ta.length<10}function Tg(n,t){n.Ta.push(t);const e=le(n);e.O_()&&e.X_&&e.ea(t.mutations)}function qu(n){return De(n)&&!le(n).x_()&&n.Ta.length>0}function $u(n){le(n).start()}function Ig(n){return b(this,null,function*(){le(n).ra()})}function wg(n){return b(this,null,function*(){const t=le(n);for(const e of n.Ta)t.ea(e.mutations)})}function Ag(n,t,e){return b(this,null,function*(){const r=n.Ta.shift(),s=yi.from(r,t,e);yield ju(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),yield jr(n)})}function vg(n,t){return b(this,null,function*(){t&&le(n).X_&&(yield function(r,s){return b(this,null,function*(){if(function(a){return ip(a)&&a!==P.ABORTED}(s.code)){const o=r.Ta.shift();le(r).B_(),yield ju(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),yield jr(r)}})}(n,t)),qu(n)&&$u(n)})}function Ha(n,t){return b(this,null,function*(){const e=U(n);e.asyncQueue.verifyOperationInProgress(),N(Pe,"RemoteStore received new credentials");const r=De(e);e.Ea.add(3),yield Fn(e),r&&e.Ra.set("Unknown"),yield e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),yield Br(e)})}function Rg(n,t){return b(this,null,function*(){const e=U(n);t?(e.Ea.delete(2),yield Br(e)):t||(e.Ea.add(2),yield Fn(e),e.Ra.set("Unknown"))})}function Xe(n){return n.ma||(n.ma=function(e,r,s){const o=U(e);return o.sa(),new ug(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Xo:pg.bind(null,n),t_:gg.bind(null,n),r_:_g.bind(null,n),H_:yg.bind(null,n)}),n.da.push(t=>b(this,null,function*(){t?(n.ma.B_(),bi(n)?Ci(n):n.Ra.set("Unknown")):(yield n.ma.stop(),Bu(n))}))),n.ma}function le(n){return n.fa||(n.fa=function(e,r,s){const o=U(e);return o.sa(),new lg(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Ig.bind(null,n),r_:vg.bind(null,n),ta:wg.bind(null,n),na:Ag.bind(null,n)}),n.da.push(t=>b(this,null,function*(){t?(n.fa.B_(),yield jr(n)):(yield n.fa.stop(),n.Ta.length>0&&(N(Pe,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new se,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new Pi(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Vi(n,t){if(Ht("AsyncQueue",`${t}: ${n}`),Qe(n))return new M(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{static emptySet(t){return new Be(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||x.comparator(e.key,r.key):(e,r)=>x.comparator(e.key,r.key),this.keyedMap=pn(),this.sortedSet=new Z(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Be)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Be;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(){this.ga=new Z(x.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):L(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,r)=>{t.push(r)}),t}}class He{constructor(t,e,r,s,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new He(t,e,Be.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Mr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(t=>t.Da())}}class Cg{constructor(){this.queries=Wa(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=U(e),o=s.queries;s.queries=Wa(),o.forEach((a,l)=>{for(const h of l.Sa)h.onError(r)})})(this,new M(P.ABORTED,"Firestore shutting down"))}}function Wa(){return new Ve(n=>cu(n),Mr)}function bg(n,t){return b(this,null,function*(){const e=U(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.ba()&&t.Da()&&(r=2):(o=new Sg,r=t.Da()?0:1);try{switch(r){case 0:o.wa=yield e.onListen(s,!0);break;case 1:o.wa=yield e.onListen(s,!1);break;case 2:yield e.onFirstRemoteStoreListen(s)}}catch(a){const l=Vi(a,`Initialization of query '${xe(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&Di(e)})}function Pg(n,t){return b(this,null,function*(){const e=U(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=t.Da()?0:1:!o.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}})}function Vg(n,t){const e=U(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&Di(e)}function Dg(n,t,e){const r=U(n),s=r.queries.get(t);if(s)for(const o of s.Sa)o.onError(e);r.queries.delete(t)}function Di(n){n.Ca.forEach(t=>{t.next()})}var Ws,Qa;(Qa=Ws||(Ws={})).Ma="default",Qa.Cache="cache";class Ng{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new He(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=He.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Ws.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(t){this.key=t}}class Gu{constructor(t){this.key=t}}class kg{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=q(),this.mutatedKeys=q(),this.eu=uu(t),this.tu=new Be(this.eu)}get nu(){return this.Ya}ru(t,e){const r=e?e.iu:new Ka,s=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,y)=>{const w=s.get(m),S=Or(this.query,y)?y:null,k=!!w&&this.mutatedKeys.has(w.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;w&&S?w.data.isEqual(S.data)?k!==O&&(r.track({type:3,doc:S}),D=!0):this.su(w,S)||(r.track({type:2,doc:S}),D=!0,(h&&this.eu(S,h)>0||f&&this.eu(S,f)<0)&&(l=!0)):!w&&S?(r.track({type:0,doc:S}),D=!0):w&&!S&&(r.track({type:1,doc:w}),D=!0,(h||f)&&(l=!0)),D&&(S?(a=a.add(S),o=O?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,Cs:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort((m,y)=>function(S,k){const O=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Rt:D})}};return O(S)-O(k)}(m.type,y.type)||this.eu(m.doc,y.doc)),this.ou(r),s=s!=null?s:!1;const l=e&&!s?this._u():[],h=this.Xa.size===0&&this.current&&!s?1:0,f=h!==this.Za;return this.Za=h,a.length!==0||f?{snapshot:new He(this.query,t.tu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ka,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=q(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const e=[];return t.forEach(r=>{this.Xa.has(r)||e.push(new Gu(r))}),this.Xa.forEach(r=>{t.has(r)||e.push(new zu(r))}),e}cu(t){this.Ya=t.Qs,this.Xa=q();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return He.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ni="SyncEngine";class Mg{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Og{constructor(t){this.key=t,this.hu=!1}}class xg{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Ve(l=>cu(l),Mr),this.Iu=new Map,this.Eu=new Set,this.du=new Z(x.comparator),this.Au=new Map,this.Ru=new Ii,this.Vu={},this.mu=new Map,this.fu=Ge.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}function Lg(n,t,e=!0){return b(this,null,function*(){const r=Yu(n);let s;const o=r.Tu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=yield Hu(r,t,e,!0),s})}function Fg(n,t){return b(this,null,function*(){const e=Yu(n);yield Hu(e,t,!0,!1)})}function Hu(n,t,e,r){return b(this,null,function*(){const s=yield eg(n.localStore,Ot(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=yield Ug(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Fu(n.remoteStore,s),l})}function Ug(n,t,e,r,s){return b(this,null,function*(){n.pu=(y,w,S)=>function(O,D,K,G){return b(this,null,function*(){let W=D.view.ru(K);W.Cs&&(W=yield ja(O.localStore,D.query,!1).then(({documents:T})=>D.view.ru(T,W)));const lt=G&&G.targetChanges.get(D.targetId),St=G&&G.targetMismatches.get(D.targetId)!=null,st=D.view.applyChanges(W,O.isPrimaryClient,lt,St);return Ya(O,D.targetId,st.au),st.snapshot})}(n,y,w,S);const o=yield ja(n.localStore,t,!0),a=new kg(t,o.Qs),l=a.ru(o.documents),h=Ln.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(l,n.isPrimaryClient,h);Ya(n,e,f.au);const m=new Mg(t,e,a);return n.Tu.set(t,m),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),f.snapshot})}function Bg(n,t,e){return b(this,null,function*(){const r=U(n),s=r.Tu.get(t),o=r.Iu.get(s.targetId);if(o.length>1)return r.Iu.set(s.targetId,o.filter(a=>!Mr(a,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||(yield Hs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&Ri(r.remoteStore,s.targetId),Qs(r,s.targetId)}).catch(We))):(Qs(r,s.targetId),yield Hs(r.localStore,s.targetId,!0))})}function jg(n,t){return b(this,null,function*(){const e=U(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Ri(e.remoteStore,r.targetId))})}function qg(n,t,e){return b(this,null,function*(){const r=Qg(n);try{const s=yield function(a,l){const h=U(a),f=Y.now(),m=l.reduce((S,k)=>S.add(k.key),q());let y,w;return h.persistence.runTransaction("Locally write mutations","readwrite",S=>{let k=Kt(),O=q();return h.Ns.getEntries(S,m).next(D=>{k=D,k.forEach((K,G)=>{G.isValidDocument()||(O=O.add(K))})}).next(()=>h.localDocuments.getOverlayedDocuments(S,k)).next(D=>{y=D;const K=[];for(const G of l){const W=tp(G,y.get(G.key).overlayedDocument);W!=null&&K.push(new me(G.key,W,eu(W.value.mapValue),xt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,K,l)}).next(D=>{w=D;const K=D.applyToLocalDocumentSet(y,O);return h.documentOverlayCache.saveOverlays(S,D.batchId,K)})}).then(()=>({batchId:w.batchId,changes:hu(y)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,h){let f=a.Vu[a.currentUser.toKey()];f||(f=new Z(j)),f=f.insert(l,h),a.Vu[a.currentUser.toKey()]=f}(r,s.batchId,e),yield Un(r,s.changes),yield jr(r.remoteStore)}catch(s){const o=Vi(s,"Failed to persist write");e.reject(o)}})}function Ku(n,t){return b(this,null,function*(){const e=U(n);try{const r=yield Jp(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Au.get(o);a&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?H(a.hu,14607):s.removedDocuments.size>0&&(H(a.hu,42227),a.hu=!1))}),yield Un(e,r,t)}catch(r){yield We(r)}})}function Xa(n,t,e){const r=U(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach((o,a)=>{const l=a.view.va(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=U(a);h.onlineState=l;let f=!1;h.queries.forEach((m,y)=>{for(const w of y.Sa)w.va(l)&&(f=!0)}),f&&Di(h)}(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}function $g(n,t,e){return b(this,null,function*(){const r=U(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),o=s&&s.key;if(o){let a=new Z(x.comparator);a=a.insert(o,Et.newNoDocument(o,F.min()));const l=q().add(o),h=new Fr(F.min(),new Map,new Z(j),a,l);yield Ku(r,h),r.du=r.du.remove(o),r.Au.delete(t),ki(r)}else yield Hs(r.localStore,t,!1).then(()=>Qs(r,t,e)).catch(We)})}function zg(n,t){return b(this,null,function*(){const e=U(n),r=t.batch.batchId;try{const s=yield Yp(e.localStore,t);Qu(e,r,null),Wu(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),yield Un(e,s)}catch(s){yield We(s)}})}function Gg(n,t,e){return b(this,null,function*(){const r=U(n);try{const s=yield function(a,l){const h=U(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,l).next(y=>(H(y!==null,37113),m=y.keys(),h.mutationQueue.removeMutationBatch(f,y))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(r.localStore,t);Qu(r,t,e),Wu(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),yield Un(r,s)}catch(s){yield We(s)}})}function Wu(n,t){(n.mu.get(t)||[]).forEach(e=>{e.resolve()}),n.mu.delete(t)}function Qu(n,t,e){const r=U(n);let s=r.Vu[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Qs(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach(r=>{n.Ru.containsKey(r)||Xu(n,r)})}function Xu(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(Ri(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),ki(n))}function Ya(n,t,e){for(const r of e)r instanceof zu?(n.Ru.addReference(r.key,t),Hg(n,r)):r instanceof Gu?(N(Ni,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,t),n.Ru.containsKey(r.key)||Xu(n,r.key)):L(19791,{wu:r})}function Hg(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Eu.has(r)||(N(Ni,"New document in limbo: "+e),n.Eu.add(r),ki(n))}function ki(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new x(J.fromString(t)),r=n.fu.next();n.Au.set(r,new Og(e)),n.du=n.du.insert(e,r),Fu(n.remoteStore,new te(Ot(gi(e.path)),r,"TargetPurposeLimboResolution",Vr.ce))}}function Un(n,t,e){return b(this,null,function*(){const r=U(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,h)=>{a.push(r.pu(h,t,e).then(f=>{var m;if((f||e)&&r.isPrimaryClient){const y=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,y?"current":"not-current")}if(f){s.push(f);const y=Ai.As(h.targetId,f);o.push(y)}}))}),yield Promise.all(a),r.Pu.H_(s),yield function(h,f){return b(this,null,function*(){const m=U(h);try{yield m.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>C.forEach(f,w=>C.forEach(w.Es,S=>m.persistence.referenceDelegate.addReference(y,w.targetId,S)).next(()=>C.forEach(w.ds,S=>m.persistence.referenceDelegate.removeReference(y,w.targetId,S)))))}catch(y){if(!Qe(y))throw y;N(vi,"Failed to update sequence numbers: "+y)}for(const y of f){const w=y.targetId;if(!y.fromCache){const S=m.Ms.get(w),k=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(k);m.Ms=m.Ms.insert(w,O)}}})}(r.localStore,o))})}function Kg(n,t){return b(this,null,function*(){const e=U(n);if(!e.currentUser.isEqual(t)){N(Ni,"User change. New user:",t.toKey());const r=yield Mu(e.localStore,t);e.currentUser=t,function(o,a){o.mu.forEach(l=>{l.forEach(h=>{h.reject(new M(P.CANCELLED,a))})}),o.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),yield Un(e,r.Ls)}})}function Wg(n,t){const e=U(n),r=e.Au.get(t);if(r&&r.hu)return q().add(r.key);{let s=q();const o=e.Iu.get(t);if(!o)return s;for(const a of o){const l=e.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function Yu(n){const t=U(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ku.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Wg.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=$g.bind(null,t),t.Pu.H_=Vg.bind(null,t.eventManager),t.Pu.yu=Dg.bind(null,t.eventManager),t}function Qg(n){const t=U(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=zg.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Gg.bind(null,t),t}class Rr{constructor(){this.kind="memory",this.synchronizeTabs=!1}initialize(t){return b(this,null,function*(){this.serializer=Ur(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),yield this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)})}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Xp(this.persistence,new Kp,t.initialUser,this.serializer)}Cu(t){return new ku(wi.mi,this.serializer)}Du(t){return new rg}terminate(){return b(this,null,function*(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),yield this.persistence.shutdown()})}}Rr.provider={build:()=>new Rr};class Xg extends Rr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){H(this.persistence.referenceDelegate instanceof Ar,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Np(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?vt.withCacheSize(this.cacheSizeBytes):vt.DEFAULT;return new ku(r=>Ar.mi(r,e),this.serializer)}}class Xs{initialize(t,e){return b(this,null,function*(){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Xa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Kg.bind(null,this.syncEngine),yield Rg(this.remoteStore,this.syncEngine.isPrimaryClient))})}createEventManager(t){return function(){return new Cg}()}createDatastore(t){const e=Ur(t.databaseInfo.databaseId),r=function(o){return new cg(o)}(t.databaseInfo);return function(o,a,l,h){return new fg(o,a,l,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,l){return new mg(r,s,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>Xa(this.syncEngine,e,0),function(){return za.v()?new za:new sg}())}createSyncEngine(t,e){return function(s,o,a,l,h,f,m){const y=new xg(s,o,a,l,h,f);return m&&(y.gu=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return b(this,null,function*(){var t,e;yield function(s){return b(this,null,function*(){const o=U(s);N(Pe,"RemoteStore shutting down."),o.Ea.add(5),yield Fn(o),o.Aa.shutdown(),o.Ra.set("Unknown")})}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()})}}Xs.provider={build:()=>new Xs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Ht("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const he="FirestoreClient";class Jg{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=yt.UNAUTHENTICATED,this.clientId=ui.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,a=>b(this,null,function*(){N(he,"Received user=",a.uid),yield this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,a=>(N(he,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new se;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(()=>b(this,null,function*(){try{this._onlineComponents&&(yield this._onlineComponents.terminate()),this._offlineComponents&&(yield this._offlineComponents.terminate()),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Vi(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}function bs(n,t){return b(this,null,function*(){n.asyncQueue.verifyOperationInProgress(),N(he,"Initializing OfflineComponentProvider");const e=n.configuration;yield t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(s=>b(this,null,function*(){r.isEqual(s)||(yield Mu(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t})}function Ja(n,t){return b(this,null,function*(){n.asyncQueue.verifyOperationInProgress();const e=yield Zg(n);N(he,"Initializing OnlineComponentProvider"),yield t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>Ha(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ha(t.remoteStore,s)),n._onlineComponents=t})}function Zg(n){return b(this,null,function*(){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(he,"Using user provided OfflineComponentProvider");try{yield bs(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;je("Error using user provided cache. Falling back to memory cache: "+e),yield bs(n,new Rr)}}else N(he,"Using default OfflineComponentProvider"),yield bs(n,new Xg(void 0));return n._offlineComponents})}function Ju(n){return b(this,null,function*(){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(he,"Using user provided OnlineComponentProvider"),yield Ja(n,n._uninitializedComponentsProvider._online)):(N(he,"Using default OnlineComponentProvider"),yield Ja(n,new Xs))),n._onlineComponents})}function t_(n){return Ju(n).then(t=>t.syncEngine)}function e_(n){return b(this,null,function*(){const t=yield Ju(n),e=t.eventManager;return e.onListen=Lg.bind(null,t.syncEngine),e.onUnlisten=Bg.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Fg.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=jg.bind(null,t.syncEngine),e})}function n_(n,t,e={}){const r=new se;return n.asyncQueue.enqueueAndForget(()=>b(this,null,function*(){return function(o,a,l,h,f){const m=new Yg({next:w=>{m.Nu(),a.enqueueAndForget(()=>Pg(o,y));const S=w.docs.has(l);!S&&w.fromCache?f.reject(new M(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&w.fromCache&&h&&h.source==="server"?f.reject(new M(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(w)},error:w=>f.reject(w)}),y=new Ng(gi(l.path),m,{includeMetadataChanges:!0,qa:!0});return bg(o,y)}(yield e_(n),n.asyncQueue,t,e,r)})),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Za=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl="firestore.googleapis.com",tc=!0;class ec{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new M(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=tl,this.ssl=tc}else this.host=t.host,this.ssl=(e=t.ssl)!=null?e:tc;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Nu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Vp)throw new M(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}dm("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Zu((r=t.experimentalLongPollingOptions)!=null?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new M(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Mi{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ec({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new M(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ec(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new nm;switch(r.type){case"firstParty":return new om(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}_restart(){return b(this,null,function*(){this._terminateTask==="notTerminated"?yield this._terminate():this._terminateTask="notTerminated"})}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Za.get(e);r&&(N("ComponentProvider","Removing Datastore"),Za.delete(e),r.terminate())}(this),Promise.resolve()}}function r_(n,t,e,r={}){var f;n=be(n,Mi);const s=Zs(t),o=n._getSettings(),a=$t(ot({},o),{emulatorOptions:n._getEmulatorOptions()}),l=`${t}:${e}`;s&&(oh(`https://${l}`),lh("Firestore",!0)),o.host!==tl&&o.host!==l&&je("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=$t(ot({},o),{host:l,ssl:s,emulatorOptions:r});if(!vn(h,a)&&(n._setSettings(h),r.mockUserToken)){let m,y;if(typeof r.mockUserToken=="string")m=r.mockUserToken,y=yt.MOCK_USER;else{m=ah(r.mockUserToken,(f=n._app)==null?void 0:f.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new M(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new yt(w)}n._authCredentials=new rm(new zc(m,y))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Oi(this.firestore,t,this._query)}}class ct{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ct(this.firestore,t,this._key)}toJSON(){return{type:ct._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(On(e,ct._jsonSchema))return new ct(t,r||null,new x(J.fromString(e.referencePath)))}}ct._jsonSchemaVersion="firestore/documentReference/1.0",ct._jsonSchema={type:rt("string",ct._jsonSchemaVersion),referencePath:rt("string")};class kn extends Oi{constructor(t,e,r){super(t,e,gi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ct(this.firestore,null,new x(t))}withConverter(t){return new kn(this.firestore,t,this._path)}}function I_(n,t,...e){if(n=Bt(n),arguments.length===1&&(t=ui.newId()),fm("doc","path",t),n instanceof Mi){const r=J.fromString(t,...e);return pa(r),new ct(n,null,new x(r))}{if(!(n instanceof ct||n instanceof kn))throw new M(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(t,...e));return pa(r),new ct(n.firestore,n instanceof kn?n.converter:null,new x(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="AsyncQueue";class rc{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new xu(this,"async_queue_retry"),this._c=()=>{const r=Cs();r&&N(nc,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=Cs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Cs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new se;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Xu.push(t),this.lc()))}lc(){return b(this,null,function*(){if(this.Xu.length!==0){try{yield this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Qe(t))throw t;N(nc,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}})}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(r=>{throw this.nc=r,this.rc=!1,Ht("INTERNAL UNHANDLED ERROR: ",sc(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=Pi.createAndSchedule(this,t,e,r,o=>this.hc(o));return this.tc.push(s),s}uc(){this.nc&&L(47125,{Pc:sc(this.nc)})}verifyOperationInProgress(){}Tc(){return b(this,null,function*(){let t;do t=this.ac,yield t;while(t!==this.ac)})}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then(()=>{this.tc.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function sc(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class qr extends Mi{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new rc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return b(this,null,function*(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new rc(t),this._firestoreClient=void 0,yield t}})}}function w_(n,t){const e=typeof n=="object"?n:dc(),r=typeof n=="string"?n:_r,s=Mn(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=sh("firestore");o&&r_(s,...o)}return s}function el(n){if(n._terminated)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||s_(n),n._firestoreClient}function s_(n){var r,s,o;const t=n._freezeSettings(),e=function(l,h,f,m){return new vm(l,h,f,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Zu(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(s=t.localCache)!=null&&s._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new Jg(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Vt(pt.fromBase64String(t))}catch(e){throw new M(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Vt(pt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Vt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(On(t,Vt._jsonSchema))return Vt.fromBase64String(t.bytes)}}Vt._jsonSchemaVersion="firestore/bytes/1.0",Vt._jsonSchema={type:rt("string",Vt._jsonSchemaVersion),bytes:rt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new M(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new mt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new M(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new M(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return j(this._lat,t._lat)||j(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ft._jsonSchemaVersion}}static fromJSON(t){if(On(t,Ft._jsonSchema))return new Ft(t.latitude,t.longitude)}}Ft._jsonSchemaVersion="firestore/geoPoint/1.0",Ft._jsonSchema={type:rt("string",Ft._jsonSchemaVersion),latitude:rt("number"),longitude:rt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:Ut._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(On(t,Ut._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new Ut(t.vectorValues);throw new M(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ut._jsonSchemaVersion="firestore/vectorValue/1.0",Ut._jsonSchema={type:rt("string",Ut._jsonSchemaVersion),vectorValues:rt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_=/^__.*__$/;class o_{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new me(t,this.data,this.fieldMask,e,this.fieldTransforms):new xn(t,this.data,e,this.fieldTransforms)}}class nl{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new me(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function rl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{Ac:n})}}class xi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new xi(ot(ot({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.gc(t),r}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Sr(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(rl(this.Ac)&&i_.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class a_{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Ur(t)}Cc(t,e,r,s=!1){return new xi({Ac:t,methodName:e,Dc:r,path:mt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sl(n){const t=n._freezeSettings(),e=Ur(n._databaseId);return new a_(n._databaseId,!!t.ignoreUndefinedProperties,e)}function c_(n,t,e,r,s,o={}){const a=n.Cc(o.merge||o.mergeFields?2:0,t,e,s);Fi("Data must be an object, but it was:",a,r);const l=il(r,a);let h,f;if(o.merge)h=new bt(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const y of o.mergeFields){const w=Ys(t,y,e);if(!a.contains(w))throw new M(P.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);al(m,w)||m.push(w)}h=new bt(m),f=a.fieldTransforms.filter(y=>h.covers(y.field))}else h=null,f=a.fieldTransforms;return new o_(new Rt(l),h,f)}class Gr extends zr{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Gr}}class Li extends zr{constructor(t,e){super(t),this.Fc=e}_toFieldTransform(t){const e=new Nn(t.serializer,mu(t.serializer,this.Fc));return new Xm(t.path,e)}isEqual(t){return t instanceof Li&&this.Fc===t.Fc}}function u_(n,t,e,r){const s=n.Cc(1,t,e);Fi("Data must be an object, but it was:",s,r);const o=[],a=Rt.empty();de(r,(h,f)=>{const m=Ui(t,h,e);f=Bt(f);const y=s.yc(m);if(f instanceof Gr)o.push(m);else{const w=Hr(f,y);w!=null&&(o.push(m),a.set(m,w))}});const l=new bt(o);return new nl(a,l,s.fieldTransforms)}function l_(n,t,e,r,s,o){const a=n.Cc(1,t,e),l=[Ys(t,r,e)],h=[s];if(o.length%2!=0)throw new M(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<o.length;w+=2)l.push(Ys(t,o[w])),h.push(o[w+1]);const f=[],m=Rt.empty();for(let w=l.length-1;w>=0;--w)if(!al(f,l[w])){const S=l[w];let k=h[w];k=Bt(k);const O=a.yc(S);if(k instanceof Gr)f.push(S);else{const D=Hr(k,O);D!=null&&(f.push(S),m.set(S,D))}}const y=new bt(f);return new nl(m,y,a.fieldTransforms)}function Hr(n,t){if(ol(n=Bt(n)))return Fi("Unsupported field value:",t,n),il(n,t);if(n instanceof zr)return function(r,s){if(!rl(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const l of r){let h=Hr(l,s.wc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=Bt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return mu(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=Y.fromDate(r);return{timestampValue:wr(s.serializer,o)}}if(r instanceof Y){const o=new Y(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wr(s.serializer,o)}}if(r instanceof Ft)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Vt)return{bytesValue:Ru(s.serializer,r._byteString)};if(r instanceof ct){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Ti(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ut)return function(a,l){return{mapValue:{fields:{[Zc]:{stringValue:tu},[yr]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw l.Sc("VectorValues must only contain numeric values.");return _i(l.serializer,f)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${li(r)}`)}(n,t)}function il(n,t){const e={};return Kc(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):de(n,(r,s)=>{const o=Hr(s,t.mc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function ol(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Y||n instanceof Ft||n instanceof Vt||n instanceof ct||n instanceof zr||n instanceof Ut)}function Fi(n,t,e){if(!ol(e)||!Gc(e)){const r=li(e);throw r==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+r)}}function Ys(n,t,e){if((t=Bt(t))instanceof $r)return t._internalPath;if(typeof t=="string")return Ui(n,t);throw Sr("Field path arguments must be of type string or ",n,!1,void 0,e)}const h_=new RegExp("[~\\*/\\[\\]]");function Ui(n,t,e){if(t.search(h_)>=0)throw Sr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new $r(...t.split("."))._internalPath}catch(r){throw Sr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Sr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new M(P.INVALID_ARGUMENT,l+n+h)}function al(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new ct(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new f_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(ul("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class f_ extends cl{data(){return super.data()}}function ul(n,t){return typeof t=="string"?Ui(n,t):t instanceof $r?t._internalPath:t._delegate._internalPath}class d_{convertValue(t,e="none"){switch(ue(t)){case 0:return null;case 1:return t.booleanValue;case 2:return et(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ce(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return de(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[yr].arrayValue)==null?void 0:s.values)==null?void 0:o.map(a=>et(a.doubleValue));return new Ut(e)}convertGeoPoint(t){return new Ft(et(t.latitude),et(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Nr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Cn(t));default:return null}}convertTimestamp(t){const e=ae(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=J.fromString(t);H(Du(r),9688,{name:t});const s=new bn(r.get(1),r.get(3)),o=new x(r.popFirst(5));return s.isEqual(e)||Ht(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class _n{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class ve extends cl{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new hr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(ul("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=ve._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}ve._jsonSchemaVersion="firestore/documentSnapshot/1.0",ve._jsonSchema={type:rt("string",ve._jsonSchemaVersion),bundleSource:rt("string","DocumentSnapshot"),bundleName:rt("string"),bundle:rt("string")};class hr extends ve{data(t={}){return super.data(t)}}class An{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new _n(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new hr(this._firestore,this._userDataWriter,r.key,r,new _n(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new M(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const h=new hr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new _n(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new hr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new _n(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:p_(l.type),doc:h,oldIndex:f,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=An._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ui.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function p_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A_(n){n=be(n,ct);const t=be(n.firestore,qr);return n_(el(t),n._key).then(e=>__(t,n,e))}An._jsonSchemaVersion="firestore/querySnapshot/1.0",An._jsonSchema={type:rt("string",An._jsonSchemaVersion),bundleSource:rt("string","QuerySnapshot"),bundleName:rt("string"),bundle:rt("string")};class g_ extends d_{constructor(t){super(),this.firestore=t}convertBytes(t){return new Vt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ct(this.firestore,null,e)}}function v_(n,t,e){n=be(n,ct);const r=be(n.firestore,qr),s=m_(n.converter,t);return ll(r,[c_(sl(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,xt.none())])}function R_(n,t,e,...r){n=be(n,ct);const s=be(n.firestore,qr),o=sl(s);let a;return a=typeof(t=Bt(t))=="string"||t instanceof $r?l_(o,"updateDoc",n._key,t,e,r):u_(o,"updateDoc",n._key,t),ll(s,[a.toMutation(n._key,xt.exists(!0))])}function ll(n,t){return function(r,s){const o=new se;return r.asyncQueue.enqueueAndForget(()=>b(this,null,function*(){return qg(yield t_(r),s,o)})),o.promise}(el(n),t)}function __(n,t,e){const r=e.docs.get(t._key),s=new g_(n);return new ve(n,s,t._key,r,new _n(e.hasPendingWrites,e.fromCache),t.converter)}function S_(n){return new Li("increment",n)}(function(t,e=!0){(function(s){Ke=s})(wf),ie(new zt("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new qr(new sm(r.getProvider("auth-internal")),new am(a,r.getProvider("app-check-internal")),function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new M(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new bn(f.options.projectId,m)}(a,s),a);return o=ot({useFetchStreams:e},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Mt(ha,fa,t),Mt(ha,fa,"esm2020")})();export{w_ as a,A_ as b,S_ as c,I_ as d,E_ as g,Af as i,v_ as s,R_ as u};
