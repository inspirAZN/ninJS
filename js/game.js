/**
 *  ninJS.
 */
window.onload = function() {
	// init 600 x 700 area, black
	var bg = Crafty.init(600,700);
	
	// load dat sprite
	Crafty.sprite( 28 ,"images/FemaleNinjaSprite.png", {
		ninja: [0,0,0,1.75],
	});
	
	// some grass
	Crafty.sprite(70, "images/grass.png", {
		grass: [6,6]
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
	var ninja = Crafty.e("2D, DOM, ninja, controls, Multiway").multiway(3, {UP_ARROW: -90, DOWN_ARROW: 90});
};
