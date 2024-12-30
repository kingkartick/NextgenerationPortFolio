
let fragmentShaderCode =
 `
uniform sampler2D textureimg;
varying vec2 vUV;
uniform float distancefromcent;
uniform float waveintensity;
uniform  float timeanim;
uniform float glitchIntensity;



void main() {
  vec2 uv = vUV;

  float wave1 = sin(uv.x * 10.0 + (timeanim) * 0.1 + 0.2 * 5.0) * waveintensity;
  float wave2 = sin(uv.y * 12.0 + (timeanim) * 0.5 + 0.2 * 4.0) * waveintensity;
  float wave3 = cos(uv.x * 8.0 + (timeanim) * 0.9+ 0.2 * 3.0) * waveintensity;
  float wave4 = cos(uv.y * 9.0 + (timeanim) * 0.9 + 0.2 * 3.5) * waveintensity;

  uv.y += wave1 + wave2;
  uv.x += wave3 + wave4;

  vec4 text = texture2D(textureimg,uv);
  float bw = (text.r + text.b + text.g )/3.;
  vec4 another = vec4(bw,bw,bw,1.);

  if (glitchIntensity > 0.0) {
    float segment = floor(uv.y * 12.0); 
    float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453); 
    vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;

    vec4 redGlitch = texture2D(textureimg, uv + offset);
    vec4 greenGlitch = texture2D(textureimg, uv - offset);
    vec4 blueGlitch = texture2D(textureimg, uv);
    if (mod(segment, 3.0) == 0.0) {
      gl_FragColor = vec4(redGlitch.r, greenGlitch.g, text.b, 1.0);
      } else if (mod(segment, 3.0) == 1.0) {
          gl_FragColor = vec4(text.r, greenGlitch.g, blueGlitch.b, 1.0);
      } else {
          gl_FragColor = vec4(redGlitch.r, text.g, blueGlitch.b, 1.0);
      }
    } else {
    gl_FragColor = mix(another,text,distancefromcent);; 
   }  
 
  gl_FragColor.a = clamp(distancefromcent,0.4,2.);
}`

export default fragmentShaderCode