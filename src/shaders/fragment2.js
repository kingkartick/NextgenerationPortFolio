let fragmentShaderCode2 = `

uniform sampler2D uTexture;
varying vec2 vTexCoords;
uniform float uNbLines;
uniform float uNbColumns;
uniform float uProgress;
uniform float uniformPointSize;

float circle(vec2 uv , float border){
	float radius = 0.5;
	float dist = radius - distance(uv,vec2(0.5));
	return smoothstep(0.0,border,dist);
}

void main() {
	vec2 uv = gl_PointCoord;
	uv.y*=-1.0 ;
	uv /= vec2(uNbColumns, uNbLines);
	float texOffsetU = vTexCoords.x/uNbColumns;
	float texOffsetV = vTexCoords.y/uNbLines;
	uv += vec2(texOffsetU,texOffsetV);

	uv+=vec2(0.5);


	vec4 texture = texture2D(uTexture,uv);

	  // Set the fragment color to a constant white
    gl_FragColor = vec4(texture);
	gl_FragColor.a*=circle(gl_PointCoord,0.2);
	gl_FragColor.a*= uProgress;


     // Set the point size based on the uniform variable
  

  
}



`

export default fragmentShaderCode2