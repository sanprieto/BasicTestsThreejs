import * as THREE from 'three';


function wavesBuffer( objects, waveSize, magnitude, speed ){

    const theTime =  performance.now() * speed ;
    for ( var o = 0; o < objects.children.length; o++ ) {

      var pos = objects.children[o].geometry.attributes.position;
      let center = new THREE.Vector3(0,4,0);
      var vec3 = new THREE.Vector3(); // re-use

        for ( let i = 0, l = pos.count; i < l; i ++ ) {


            vec3.fromBufferAttribute(pos, i);
            vec3.sub(center);
            var z = Math.sin( vec3.length() /- waveSize + (theTime)) * magnitude;
            pos.setZ(i, z);
        }
        pos.needsUpdate = true;
    }
}

function waves( objects, waveSize, magnitude ){

	const theTime =  performance.now() * .001 ;

	for ( var o = 0; o < objects.children.length; o++ ) {

      var center = new THREE.Vector2(0,0);
      var vLength = objects.children[o].geometry.vertices.length;

      for (var i = 0; i < vLength; i++) {
        if(( i > 30 )&&( i < 170 )){

          var v = objects.children[o].geometry.vertices[i];
          var dist = new THREE.Vector2(v.x, v.y).sub(center);
          v.z = Math.sin(dist.length()/- waveSize + (theTime)) * magnitude;

        }

      }
	    objects.children[o].geometry.verticesNeedUpdate = true;
	}
}

export { waves, wavesBuffer }