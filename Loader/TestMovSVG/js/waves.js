import * as THREE from 'three';


function wavesBuffer( objects, waveSize, magnitude ){

  
  const theTime =  performance.now() * .001 ;
  var positions = objects[0].geometry.attributes.position.array;

  var x, y, z, index;
  x = y = z = index = 0;

  let center = new THREE.Vector2(0,0);

  for ( var i = 0, l = objects[0].geometry.attributes.position.array.length; i < l; i ++ ) {

	
	var dist = new THREE.Vector2(x, y).sub(center);

    positions[ index ++ ] = x;
    positions[ index ++ ] = y;
    positions[ index ++ ] = z;

    x += dist.x;
    y += dist.v;
    z += Math.sin( dist.length()/- waveSize + (theTime)) * magnitude;

  }

  objects[0].geometry.attributes.position.needsUpdate = true

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