/**
 *  ninJS.
 */
window.onload = function() {
	// init 600 x 700 area, black
	Crafty.init(600,700);
	//Crafty.background("black");
	
	// load dat sprite
	Crafty.sprite( 28 ,"/Users/josephcaluza/Desktop/newgame/images/FemaleNinjaSprite.png", {
		ninja: [0,0,0,1.75],
	});
	
	// some grass
	Crafty.sprite(32, "/Users/josephcaluza/Desktop/newgame/images/grass.png", {
		grass: [1,1],
	});

	//method to generate the map
	function generateWorld() {
    	//loop through all tiles
    	for (var i = 0; i < 25; i++) {
        	for (var j = 0; j < 21; j++) {

            	//place grass on all tiles
            	grassType = Crafty.math.randomInt(1, 4);
            	Crafty.e("2D, DOM, grass," + grassType)
                	.attr({ x: i * 16, y: j * 16, z:1 });
		}
	}
};
	// our hero
	var ninja = Crafty.e("2D, DOM, ninja, controls, Multiway").multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});

};
