 let vertexShaderCode = `
uniform vec3 uColor;
varying vec2 vUV;
uniform float timeanim;
float PI = 3.141;
// varying vec3 vPosition;

void main() {
  vec3 pos= position;
  vUV = (uv-vec2(0.5))*0.9 + vec2(0.5);
  pos.y += sin(PI*uv.x)*0.01;
  pos.z += sin(PI*uv.x)*0.02;
  pos.y += sin(timeanim*0.03)*0.02;
  vUV.y -= sin(timeanim*0.02)*0.02;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`
export default vertexShaderCode