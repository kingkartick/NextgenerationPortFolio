
let fragmentShaderCode =
 `
 uniform sampler2D textureSampler;
 uniform float glitchIntensity;
 varying vec2 vUv;
 
 void main() {
  
  vec2 uv = vUv;
  vec4 baseState = texture2D(textureSampler, uv);

  if (glitchIntensity > 0.0) {
    float segment = floor(uv.y * 12.0); 
    float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
    vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;

    vec4 redGlitch = texture2D(textureSampler, uv + offset);
    vec4 greenGlitch = texture2D(textureSampler, uv - offset);
    vec4 blueGlitch = texture2D(textureSampler, uv);

    if (mod(segment, 3.0) == 0.0) {
        gl_FragColor = vec4(redGlitch.r, greenGlitch.g, baseState.b, 1.0);
    } else if (mod(segment, 3.0) == 1.0) {
        gl_FragColor = vec4(baseState.r, greenGlitch.g, blueGlitch.b, 1.0);
    } else {
        gl_FragColor = vec4(redGlitch.r, baseState.g, blueGlitch.b, 1.0);
    }
} else {
    gl_FragColor = baseState; 
}


 }`

export default fragmentShaderCode