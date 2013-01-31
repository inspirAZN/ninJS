/**
 *  ninJS.
 */
window.onload = function() {
	// init 600 x 700 area, black
	var bg = Crafty.init(600,700);
	
	// load dat sprite
	Crafty.sprite( 28 ,"/Users/josephcaluza/Desktop/newgame/images/FemaleNinjaSprite.png", {
		ninja: [0,0,0,1.75],
	});
	
	// some grass
	Crafty.sprite(70, "/Users/josephcaluza/Desktop/newgame/images/grass.png", {
		grass: [6,6]
	});

	var grass = Crafty.e("2D, DOM, grass, sprite")

	// our hero
	var ninja = Crafty.e("2D, DOM, ninja, controls, Multiway").multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90});
};
