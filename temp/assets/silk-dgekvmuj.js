import{r as s,j as a}from"./react-vendor-BsONkmb-.js";import{C as c,a as v,u as f,b as m}from"./three-vendor-C_NDsw7q.js";const x=e=>(e=e.replace("#",""),[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255]),d=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,p=`
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`,l=s.forwardRef(function({uniforms:r},t){const{viewport:o}=f();return s.useLayoutEffect(()=>{t.current&&t.current.scale.set(o.width,o.height,1)},[t,o]),m((n,i)=>{t.current.material.uniforms.uTime.value+=.1*i}),a.jsxs("mesh",{ref:t,children:[a.jsx("planeGeometry",{args:[1,1,1,1]}),a.jsx("shaderMaterial",{uniforms:r,vertexShader:d,fragmentShader:p})]})});l.displayName="SilkPlane";const S=({speed:e=5,scale:r=1,color:t="#7B7481",noiseIntensity:o=1.5,rotation:n=0})=>{const i=s.useRef(),u=s.useMemo(()=>({uSpeed:{value:e},uScale:{value:r},uNoiseIntensity:{value:o},uColor:{value:new c(...x(t))},uRotation:{value:n},uTime:{value:0}}),[e,r,o,t,n]);return a.jsx(v,{dpr:[1,2],frameloop:"always",children:a.jsx(l,{ref:i,uniforms:u})})};export{S as default};
