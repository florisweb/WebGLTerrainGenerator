<!DOCTYPE html>
<html>
	<head>
		<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport'/>
		<title>WebGLTerrainGenerator</title>
		<style>
			body {
				margin: none;
				padding: none;
				background: #000;
			}

			canvas {
				position: fixed;
				left:  0;
				top: 0;
			}
			
		</style>
	</head>
	<body>
	

		
		<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/102/three.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js'></script>


		<script>
			let scene = new THREE.Scene();
			let camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			camera.position.z = 5;
			// camera.position.x = .5;
			// camera.position.y = 1.3;



			let renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setClearColor('#e5e5e5');
			renderer.setSize(window.innerWidth, window.innerHeight);

			document.body.appendChild(renderer.domElement);
			window.addEventListener('resize', function() {
				renderer.setSize(window.innerWidth, window.innerHeight);
				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

			});




			let geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
			let material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
			let mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 2;
			mesh.position.y = 1;
			scene.add(mesh);



			let light = new THREE.PointLight(0xffffff, 1, 300);
			light.position.set(10, 0, 25);
			scene.add(light);




			function render() {
				renderer.render(scene, camera);
				requestAnimationFrame(render);
			}
			render();




		</script>
	</body>
</html>
