/**
 *  ninJS.
 */
window.onload = function() {

  var win_w = 1400;
  var win_h = 700;
	// init 1400 x 700 area, black
	var bg = Crafty.init(win_w, win_h);
	
	// load the sprites
	Crafty.sprite( 32 ,"images/FemaleNinjaSprite.png", {
		femaleNinja: [0,0,0,1.5],
		femaleFrontWalk: [1,0,1,1.5]
	});

	Crafty.sprite( 32 ,"images/MaleNinjaSprite.png", {
		maleNinja: [0,0,0,1.5],
	});
	
  var grass_w = 639;
	// some grass
	Crafty.sprite( grass_w/4 , "images/grass.png", {
		grass1: [0,0],
    grass2: [0,1],
    grass3: [0,2],
    grass4: [1,0]
	});

  Crafty.e("2D, DOM, grass2, sprite");


  // random grass ( -1 is for rounding error.. line separation when no -1 )
  for( var grass_Y = 0; grass_Y < win_h; grass_Y += (grass_w/4) - 1) {
    for( var grass_X = 0; grass_X < win_w; grass_X += (grass_w/4) - 1) {
      Crafty.e("2D, DOM, grass" + Crafty.math.randomInt(1,4) + ", sprite")
      .attr( {x: grass_X, y: grass_Y} );
    }
  }
  


  	//trial animation (forward)

  	Crafty.e("2D, DOM, SpriteAnimation, femaleNinja")
    	.animate('PlayerRunning', 0, 0, 1.5) //setup animation
    	.animate('PlayerRunning', 0, 0, 1.75)
    	.animate('PlayerRunning', 0, 0, 2)
    	.animate('PlayerRunning', 0, 0, 3)
    	.animate('PlayerRunning', 40, -1) // start animation
    	.attr({x: 300, y:300});

    //trial animation (backward)

    Crafty.e("2D, DOM, SpriteAnimation, femaleNinja")
    	.animate('PlayerRunning2', 0, 4.5, 1) //setup animation
    	.animate('PlayerRunning2', 0, 4.5, 2)
    	.animate('PlayerRunning2', 0, 4.5, 2.5)
    	.animate('PlayerRunning2', 0, 4.5, 3)
    	.animate('PlayerRunning2', 40, -1) // start animation
    	.attr({x: 340, y:300});

    //trial animation (left)

    Crafty.e("2D, DOM, SpriteAnimation, femaleNinja")
    	.animate('PlayerRunning3', 0, 1.5, 1) //setup animation
    	.animate('PlayerRunning3', 0, 1.5, 2)
    	.animate('PlayerRunning3', 0, 1.5, 2.5)
    	.animate('PlayerRunning3', 0, 1.5, 3)
    	.animate('PlayerRunning3', 40, -1) // start animation
    	.attr({x: 380, y:300});

    //trial animation (right) something is wrong with this row of sprites

    Crafty.e("2D, DOM, SpriteAnimation, femaleNinja")
    	.animate('PlayerRunning4', 0, 3, 1) //setup animation
    	.animate('PlayerRunning4', 0, 3, 2)
    	.animate('PlayerRunning4', 0, 3, 2.5)
    	.animate('PlayerRunning4', 0, 3, 3)
    	.animate('PlayerRunning4', 40, -1) // start animation
    	.attr({x: 420, y:300});


	// female ninja
	var femaleNinja = Crafty.e("2D, DOM, femaleNinja, controls, Multiway").multiway(4, {W: -90, S: 90, A: -90, D: 90})
		.attr({x: 200, y: 350});

	// male ninja
	var maleNinja = Crafty.e("2D, DOM, maleNinja, controls, Multiway")
		.multiway(4, {UP_ARROW: -90, DOWN_ARROW: 90, LEFT_ARROW: -90, RIGHT_ARROW: 90})
		.attr({x: 1050, y: 350});


	 //seeing sprite positions	
	 var femaleFrontWalk = Crafty.e("2D, DOM, femaleFrontWalk")
		.attr({x: 500, y: 500});

};
