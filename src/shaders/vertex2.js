let vertexShaderCode2 = `

uniform float uPointSize;
varying vec2 vTexCoords;

attribute vec3 initalPosition;
attribute float aAngle;
uniform float uProgress;
uniform float uTime;

void main() {

	#include <begin_vertex>
    // vec3 pos = position;
	// pos.z += sin(uProgress * aAngle) * 10.;
	transformed  = initalPosition +((position-initalPosition)*uProgress);

	#include <project_vertex>

    

	gl_PointSize = uPointSize;
	vTexCoords = position.xy;
	

	
	

}
`

export default vertexShaderCode2