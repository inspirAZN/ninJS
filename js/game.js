/**
 *  ninJS.
 */
window.onload = function() {

  var win_w = 1400;
  var win_h = 700;
	// init 1400 x 700 area, black
	var bg = Crafty.init(win_w, win_h);
	
  /* 
   * Component definitions 
   */


  //setting up animation for movement of femaleNinja
  Crafty.c('NinjaGirl', {
      NinjaGirl: function() {
                //setup animations
                this.requires("SpriteAnimation")
                .animate("walk_up", 0,4.5,3)
                .animate("walk_down", 0,0,3)
                //when animation stops, player faces left
                .animate("face_left", 0, 1.5, 0)
                //change direction when a direction change event is received
                .bind("NewDirection",
                    function (direction) {
                        if (direction.y < 0) {
                            if (!this.isPlaying("walk_up"))
                                this.stop().animate("walk_up", 15, -1);
                        }
                        if (direction.y > 0) {
                            if (!this.isPlaying("walk_down"))
                                this.stop().animate("walk_down", 15, -1);
                        }
                        if(direction.x === 0 && direction.y === 0) {
                            this.stop().animate("face_left", 15, 0);
                        }
                });
            return this;
        }
    });
    
    var stop = false;
   //setting up animation for movement of maleNinja
    Crafty.c('NinjaBoy', {
        NinjaBoy: function() {
                //setup animations
                this.requires("SpriteAnimation")
                .requires("Collision")
                .animate("walk_up", 0,4.5,3)
                .animate("walk_down", 0,0,3)
                //when animation finishes, player faces right
                .animate("face_right", 0, 3, 0)
                //change direction when a direction change event is received
                .bind("NewDirection",
                    function (direction) {
                        if (direction.y < 0) {
                            if (!this.isPlaying("walk_up")) 
                                this.stop().animate("walk_up", 15, -1);
                        }
                        if (direction.y > 0) {
                            if (!this.isPlaying("walk_down"))
                                this.stop().animate("walk_down", 15, -1);
                        }
                        if(!direction.x && !direction.y) {
                            this.stop().animate("face_right", 15, 0);
                        }
                });
            return this;
        }
    });

    //create the shuriken component
  Crafty.c("ninjaStar", {
    ninjaStar: function() {
        //animations
        this.requires("SpriteAnimation")
                .animate("shoot", 0, 0, 3)

        this.bind("enterframe", function() {
            this.move(dir, 15);
            if(this.x > Crafty.viewport.width || this.x < 0) 
                this.destroy();
        });
        return this;
    }
});


     //setting up controls for right player
    Crafty.c("RightControls", {
        init: function() {
            this.requires('Multiway');
        },
         
        rightControls: function(speed) {
            this.multiway(speed, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: -90, LEFT_ARROW: 90})
            return this;
        }
         
    });
     
     //setting up controls for left player
    Crafty.c("LeftControls", {
        init: function() {
            this.requires('Multiway');
        },
         
        leftControls: function(speed) {
            this.multiway(speed, {W: -90, S: 90, A: -90, D: 90})
            return this;
        }
         
    });

	// load the sprites
	Crafty.sprite( 32 ,"images/FemaleNinjaSprite.png", {
		femaleNinja: [0,0,0,1.5],
		femaleFrontWalk: [1,0,1,1.5]
	});

	Crafty.sprite( 32 ,"images/MaleNinjaSprite.png", {
		maleNinja: [0,0,0,1.5],
	});

    Crafty.sprite( 16 ,"images/shuriken2.png", {
        shuriken: [0,0,0,1],
    });

    Crafty.sprite( 32, "images/wall.png", {
        wall: [0,0,0, 14]
    });

	
    // some grass
  var grass_w = 639;
	Crafty.sprite( grass_w/4 , "images/grass.png", {
	grass1: [0,0],
    grass2: [0,1],
    grass3: [0,2],
    grass4: [1,0]
	});

    //shuriken things
    var shuriken = Crafty.e("2D, DOM, shuriken");



    //firing the shuriken
    Crafty.c('NinjaStar', {
        NinjaStar: function() {
                //setup animations
                this.requires("SpriteAnimation")
                .animate("fire", 0,2,3)
                .bind("Fire",
                    function (shurikenFire) {
                        if (shurikenFire.x>0) {
                            if (!this.isPlaying("fire"))
                                this.stop().animate("fire", 15, -1);
                        }
                })

            return this;
        }
    });
    var shoot = false;

  // random grass ( -1 is for rounding error.. line separation when no -1 )
  for( var grass_Y = 0; grass_Y < win_h; grass_Y += (grass_w/4) - 1) {
    for( var grass_X = 0; grass_X < win_w; grass_X += (grass_w/4) - 1) {
      Crafty.e("2D, DOM, grass" + Crafty.math.randomInt(1,4) + ", sprite")
      .attr( {x: grass_X, y: grass_Y} );
    }
  }

  // wall
  //for( var wall_Y = 0; wall_Y < win_h;)

   

  /*
   * Main Entity Initialization
   */

   var __shuriSpd = 0;
   var male_ninja_score = 0;
   var female_ninja_score = 0;
   var borderTop =
      Crafty.e("2D, DOM, Collision, borderTop")
        .attr( {x: 0, y: 5, z: 0, w: win_w, h: 1});

	// female ninja
	var femaleNinja = 
  Crafty.e("2D, DOM, NinjaGirl, player, femaleNinja, RightControls, Collision, ShurikenShoot")
        .attr({ x: 1000, y: 250, z: 0 })
        .rightControls(2)
        .NinjaGirl()
        .bind("KeyDown", function(e) {
            //if shift is pressed, fire shuriken
          if( e.key === Crafty.keys["SHIFT"] ) {
            shoot = true;
              
            Crafty.e("2D, DOM, NinjaStar, shuriken, Collision")
            //this is important
                .attr({x: femaleNinja.x + 10, y: femaleNinja.y + 15})
                .NinjaStar()
                .bind("EnterFrame", function() {
                      if( shoot ) 
                        this.x -= 10;
                      if(this.x<=100)
                        this.destroy();
                })
                .onHit("maleNinja", function() {
                    this.destroy();
                    Crafty("RightPoints").each(function (){
                            this.text(++this.points + " Points") });
                    Crafty("LeftHealthBar").each(function (){
                            this.attr(this.w -= 10)});
                })
                .onHit("shuriken", function() {
                  this.destroy();
                });
          } 
        });

	// male ninja
	var maleNinja = 
  Crafty.e("2D, DOM, NinjaBoy, player, maleNinja, LeftControls, borderTop, Collision, ShurikenShoot")
		.attr({ x: 200, y: 250, z: 0 })
        .leftControls(2)
        .NinjaBoy()
        .bind("KeyDown", function(f) {
            //if space is pressed, fire shuriken
          if( f.key === Crafty.keys["SPACE"] ) {
            shoot = true;
              
            Crafty.e("2D, DOM, NinjaStar, shuriken, Collision")
            //this is important
                .attr({x: maleNinja.x + 10, y: maleNinja.y + 15})
                .NinjaStar()
                .bind("EnterFrame", function() {
                      if( shoot )
                        this.x += 10;
                      if (this.x >=1100)
                        this.destroy();
                })
                .onHit("femaleNinja", function() {
                    this.destroy();
                    Crafty("LeftPoints").each(function (){
                            this.text(++this.points + " Points") });
                    Crafty("RightHealthBar").each(function (){
                            this.attr(this.w -= 10)});
                    })
                .onHit("shuriken", function() {
                    this.destroy();
                })
          } 
        }); 

    //score boards
    Crafty.e("LeftPoints, DOM, 2D, Text")
        .attr({x:80, y:20, w:100, h:20, points:0})
        .text("0 Points");

    Crafty.e("RightPoints, DOM, 2D, Text")
        .attr({x:1080, y:20, w:100, h:20, points:0})
        .text("0 Points")

    //experimental health bars
    Crafty.e("LeftHealthBG, DOM, 2D, Color")
        .color('rgb(0,0,0)')
        .attr({x: 25, y: 595, w: 510, h: 30})
    Crafty.e("RightHealthBG, DOM, 2D, Color")
        .color('rgb(0,0,0)')
        .attr({x:735, y: 595, w: 510, h: 30})

    Crafty.e("LeftHealthBar, DOM, 2D, Color")
        .color('rgb(0,0,255)')
        .attr({x:30, y: 600, w: 500, h: 20})
    Crafty.e("RightHealthBar, DOM, 2D, Color")
        .color('rgb(0,0,255)')
        .attr({x:740, y: 600, w: 500, h: 20})
};
