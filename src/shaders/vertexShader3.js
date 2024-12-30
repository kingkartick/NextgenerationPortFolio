 let vertexShaderCode = `

 

 
 varying vec2 vUv;
 
 void main() {
   vUv = uv;
   vec3 pos= position;
  //  float wave  = sin(pos.y * 3);
  //  pos.z += wave ;
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }
 
 `
export default vertexShaderCode