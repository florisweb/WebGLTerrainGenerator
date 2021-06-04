



function _World({tileCount, worldSize}) {
	this.size = new Vector(worldSize, worldSize);

	this.scene = new THREE.Scene();


	this.setup = function() {
		this.update();
	}

	let prevFrameTime = new Date();

	this.update = function() {
		let dt = (new Date() - prevFrameTime) / 1000;
		Camera.update(dt);
		renderer.render(this.scene, Camera.camera);
		// camera.position.x += .1;
		// camera.lookAt(0, 0, 0);


		requestAnimationFrame(function () {World.update()});
		prevFrameTime = new Date();
	}

}