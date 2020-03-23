import * as THREE from 'three';


function createGradient( scene ){


    var geom = new THREE.PlaneGeometry(10,10,20,20);

    var rev = true;

    var cols = [{
      stop: 0,
      color: new THREE.Color(0xf7b000)
    }, {
      stop: .5,
      color: new THREE.Color(0xdd0080)
    }, {
      stop: 1,
      color: new THREE.Color(0x77c8db)
    }];

    setGradient(geom, cols, 'x', rev);

    function setGradient(geometry, colors, axis, reverse){

      geometry.computeBoundingBox();

      var bbox = geometry.boundingBox;
      var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);

      var vertexIndices = ['a', 'b', 'c'];
      var face, vertex, normalized = new THREE.Vector3(),
        normalizedAxis = 0;

      for (var c = 0; c < colors.length - 1; c++) {

        var colorDiff = colors[c + 1].stop - colors[c].stop;

        for (var i = 0; i < geometry.faces.length; i++) {
          face = geometry.faces[i];
          for (var v = 0; v < 3; v++) {
            vertex = geometry.vertices[face[vertexIndices[v]]];
            normalizedAxis = normalized.subVectors(vertex, bbox.min).divide(size)[axis];
            if (reverse) {
              normalizedAxis = 1 - normalizedAxis;
            }
            if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop) {
              var localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff;
              face.vertexColors[v] = colors[c].color.clone().lerp(colors[c + 1].color, localNormalizedAxis);
            }
          }
        }
      }
    }

    var mat = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
      wireframe: false
    });
    var obj = new THREE.Mesh(geom, mat);
    scene.add(obj);

    return obj;
}


function createImg( scene, x, y, z, texture, scale  ){

    x = typeof x  === 'undefined' ? 0 : x;
    y = typeof y  === 'undefined' ? 0 : y;
    z = typeof z  === 'undefined' ? 0 : z;

    scale = typeof scale === 'undefined' ? 1 : scale;

    const geometry = new THREE.PlaneBufferGeometry( 40, 40, 180, 180 );
    const material = new THREE.MeshBasicMaterial( { map: texture, transparent: true, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    const proporcion = texture.image.width /  texture.image.height;
    plane.scale.x = scale;
    plane.scale.y = scale/ proporcion ;

    plane.position.set( x,y,z);
    scene.add(plane);

    return plane;
}


export {  createImg, createGradient };