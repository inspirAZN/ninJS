/**
 *  ninJS.
 */
window.onload = function() {
	// init 600 x 700 area, black
	var bg = Crafty.init(600,700);
	
<<<<<<< HEAD
	// load dat sprite
	Crafty.sprite( 28 ,"images/FemaleNinjaSprite.png", {
		ninja: [0,0,0,1.75],
	});
	
	// some grass
	Crafty.sprite(70, "images/grass.png", {
		grass: [6,6]
=======
	// load the sprites
	Crafty.sprite( 28 ,"/Users/josephcaluza/Desktop/newgame/images/FemaleNinjaSprite.png", {
		femaleNinja: [0,0,0,1.75],
	});

	Crafty.sprite( 32 ,"/Users/josephcaluza/Desktop/newgame/images/MaleNinjaSprite.png", {
		maleNinja: [0,0,0,1.5],
	});
	
	// some grass
	Crafty.sprite(639, "/Users/josephcaluza/Desktop/newgame/images/grass.png", {
		grass: [0,0]
>>>>>>> added ninja dude
	});

  // Add grass
  var grass_X = 0;
  var grass_Y = 0;
  for( var i = 0; i < 700; i += 60 ) {
    grass_Y = i;
    for( var j = 0; j < 600; j +=70 ) {
      grass_X = j;
      Crafty.e("2D, DOM, grass, sprite")
      .attr( {x: grass_X, y: grass_Y} );
    }
  }

	//var grass = Crafty.e("2D, DOM, grass, sprite")

	// our hero
	var femaleNinja = Crafty.e("2D, DOM, femaleNinja, controls, Multiway").multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90});

	var maleNinja = Crafty.e("2D, DOM, maleNinja, controls, Multiway, attribute")
		.multiway(3, {W: -90, S: 90});
};
