window.onload = function() {
	Crafty.init(600,700);
	Crafty.background("black");

	Crafty.sprite( 28 ,"/Users/josephcaluza/Desktop/newgame/images/FemaleNinjaSprite.png", {
		ninja: [0,0,0,1.75],
	});

	var ninja = Crafty.e("2D, DOM, ninja, controls, Multiway").multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});	
};
