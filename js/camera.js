

function _Camera() {
	this.camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	this.camera.position.z = 60;
	this.camera.position.x = 0;
	this.camera.position.y = 60;
	this.camera.lookAt(0, 0, 0);

	this.position = new Vector(0, 0, 0);
	this.velocity = new Vector(0, 0, 0);

	this.rotation = new Vector(0, 0, 0);
	this.angularVelocity = new Vector(0, 0, 0);

	this.zoom = 60;

	this.update = function(_dt) {
		this.position.add(this.velocity.copy().scale(_dt));
		this.rotation.add(this.angularVelocity.copy().scale(_dt));

		World.scene.position.x = this.position.value[0];
		World.scene.position.y = this.position.value[1];
		World.scene.position.z = this.position.value[2];
		
		World.scene.rotation.x = this.rotation.value[0];
		World.scene.rotation.y = this.rotation.value[1];
		World.scene.rotation.z = this.rotation.value[2];

		this.camera.position.z = this.zoom;
		this.camera.position.y = this.zoom;
	}





	this.resize = function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}
}