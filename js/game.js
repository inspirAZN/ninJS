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
    Crafty.c("FireControls", {
        init: function() {
            this.requires('Multiway');
        },
         
        fireControls: function(speed) {
            //this.multiway(speed, {SPACE: 0})
            this.bind("KeyDown", function(e) {
              if( e.keydown === Crafty.keys['SPACE'] ) {
                shoot = true;
                alert("ITS TRUE");
              }
            }).bind("EnterFrame", function() {
              if( shoot )
                this.x += speed;
            });
            return this;
        }
         
    });

    Crafty.c("bullet", {
    bullet: function(dir) {
        this.bind("enterframe", function() {
            this.move(dir, 15);
            if(this.x > Crafty.viewport.width || this.x < 0) 
                this.destroy();
        });
        return this;
    }
});

    Crafty.c('ShurikenShoot', {
      ShurikenShoot: function() {
            Crafty.e("2D, DOM, NinjaStar, shuriken, Collision")
            .attr({x: maleNinja.x + 30, y: maleNinja.y})
        
            .NinjaStar()
            .bind("KeyDown", function(e) {
              if( e.key === Crafty.keys["SPACE"] ) {
                shoot = true;
                //alert("ITS TRUE");
              }
        }).bind("EnterFrame", function() {
              if( shoot )
                this.x += 10;
        }).onHit("femaleNinja", function() {
          this.destroy();
        });
      }
    });

    // creating unlimited shuriken



  	//trial animation (forward)

  //Crafty.e("2D, DOM, grass2, sprite");


  // random grass ( -1 is for rounding error.. line separation when no -1 )
  for( var grass_Y = 0; grass_Y < win_h; grass_Y += (grass_w/4) - 1) {
    for( var grass_X = 0; grass_X < win_w; grass_X += (grass_w/4) - 1) {
      Crafty.e("2D, DOM, grass" + Crafty.math.randomInt(1,4) + ", sprite")
      .attr( {x: grass_X, y: grass_Y} );
    }
  }

   

  /*
   * Main Entity Initialization
   */

   var __shuriSpd = 0;
   var male_ninja_score = 0;
   var female_ninja_score = 0;
	// female ninja
	var femaleNinja = 
  Crafty.e("2D, DOM, NinjaGirl, player, femaleNinja, RightControls, Collision")
        .attr({ x: 1000, y: 250, z: 0 })
                .rightControls(2)
                .NinjaGirl();

	// male ninja
	var maleNinja = 
  Crafty.e("2D, DOM, NinjaBoy, player, maleNinja, LeftControls, Collision, ShurikenShoot")
		.attr({ x: 200, y: 250, z: 0 })
        .leftControls(2)
        .NinjaBoy()
        .bind("KeyDown", function(e) {
          if( e.key === Crafty.keys["SPACE"] ) {
             //this.ShurikenShoot();   
                //shuriken
                var bulletX = this.x + 10;
                var bulletY = this.y;

                Crafty.e("2D, DOM, ShurikenShoot, Collision")
                    .attr({
                        x:bulletX,
                        y:bulletY,
                        speed:10
                    }

                        )
            Crafty.e("2D, DOM, NinjaStar, shuriken, Collision")
            .attr({x: maleNinja.x + 30, y: maleNinja.y})
            //.fireControls(5)
            .NinjaStar()
            .bind("KeyDown", function(e) {
                  if( e.key === Crafty.keys['SPACE'] ) {
                    shoot = true;
                    //alert("ITS TRUE");
                  }
            }).bind("EnterFrame", function() {
                  if( shoot )
                    this.x += 10;
            }).onHit("femaleNinja", function() {
              this.destroy();
            });
            Crafty.e("2D, Collision, DOM, shuriken, NinjaStar, FireControls")
            .attr( {x: maleNinja.x, y: maleNinja.y, __shuriSpd: 10 } ) 
            .NinjaStar()
            .fireControls(15)
            .bind("EnterFrame", function() {
              this.x += __shuriSpd;
            })
            .onHit("femaleNinja", function() {
              male_ninja_score++; this.destroy(); 
            });
          }
    });

    
    //shuriken
    Crafty.e("2D, DOM, NinjaStar, shuriken, Collision")
        .attr({x: maleNinja.x + 30, y: maleNinja.y})
        //.fireControls(5)
        .NinjaStar()
        .bind("KeyDown", function(e) {
              if( e.key === Crafty.keys['SPACE'] ) {
                shoot = true;
                //alert("ITS TRUE");
              }
        }).bind("EnterFrame", function() {
              if( shoot )
                this.x += 10;
        }).onHit("femaleNinja", function() {
          this.destroy();
        });


  var borderTop =
  Crafty.e("2D, DOM, Collision, borderTop")
    .attr( {x: 0, y: 5, z: 0, w: win_w, h: 1});


};
