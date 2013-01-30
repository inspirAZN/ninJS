/**
<<<<<<< HEAD
 * Joseph test conflicttttttt
=======
 * Authors: Joseph Caluza, Brian Chung SHUT THE FRONT DOOR!
>>>>>>> some comments
 */
window.onload = function() {
	// init 600 x 700 area, black
	Crafty.init(600,700);
	Crafty.background("black");
	
	// load dat sprite
	Crafty.sprite( 28 ,"/Users/josephcaluza/Desktop/newgame/images/FemaleNinjaSprite.png", {
		ninja: [0,0,0,1.75],
	});
	
	// our hero
	var ninja = Crafty.e("2D, DOM, ninja, controls, Multiway").multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});	
};
