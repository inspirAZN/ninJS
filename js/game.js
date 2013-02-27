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
     
    Crafty.c("RightControls", {
        init: function() {
            this.requires('Multiway');
        },
         
        rightControls: function(speed) {
            this.multiway(speed, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: -90, LEFT_ARROW: 90})
            return this;
        }
         
    });
     
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

    Crafty.c("FireControls", {
        init: function() {
            this.requires('Multiway');
        },
         
        fireControls: function(speed) {
            this.multiway(speed, {SPACE: 0})
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
     * Trial Animation BEGIN ******
     */

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

    //male ninja trial animations

    //trial animation (forward)

    Crafty.e("2D, DOM, SpriteAnimation, maleNinja")
        .animate('PlayerRunning', 0, 0, 1.5) //setup animation
        .animate('PlayerRunning', 0, 0, 1.75)
        .animate('PlayerRunning', 0, 0, 2)
        .animate('PlayerRunning', 0, 0, 3)
        .animate('PlayerRunning', 40, -1) // start animation
        .attr({x: 460, y:300});

    //trial animation (backward)

    Crafty.e("2D, DOM, SpriteAnimation, maleNinja")
        .animate('PlayerRunning2', 0, 4.5, 1) //setup animation
        .animate('PlayerRunning2', 0, 4.5, 2)
        .animate('PlayerRunning2', 0, 4.5, 2.5)
        .animate('PlayerRunning2', 0, 4.5, 3)
        .animate('PlayerRunning2', 40, -1) // start animation
        .attr({x: 500, y:300});

    //trial animation (left)

    //shuriken trial animations
    Crafty.e("2D, DOM, SpriteAnimation, shuriken")
        .animate('shurikenFire', 0, 0, 1) //setup animation
        .animate('shurikenFire', 0, 1, 2)
        .animate('shurikenFire', 0, 2, 3)
        .animate('shurikenFire', 40, -1) // start animation
        .attr({x: 600, y:300});

    //trial animation (fire to the left)
     Crafty.e("2D, DOM, SpriteAnimation, shuriken")
        .animate('shurikenFire2', 0, 2, 2)//setup animation
        .animate('shurikenFire2', 0, 0, 1)
        .animate('shurikenFire2', 5, -1) // start animation
        .attr({x: 640, y:300});
    
    //trial animation (fire to the right)

    Crafty.e("2D, DOM, SpriteAnimation, maleNinja")
        .animate('PlayerRunning', 0, 0, 1.5) //setup animation
        .animate('PlayerRunning', 0, 0, 1.75)
        .animate('PlayerRunning', 0, 0, 2)
        .animate('PlayerRunning', 0, 0, 3)
        .animate('PlayerRunning', 40, -1) // start animation
        .attr({x: 460, y:300});

    /*
     * Trial Animation END ******
     */

  /*
   * Main Entity Initialization
   */

    // female ninja
    var femaleNinja = 
  Crafty.e("2D, DOM, NinjaGirl, player, femaleNinja, RightControls, Collision")
        .attr({ x: 1000, y: 250, z: 0 })
                .rightControls(2)
                .NinjaGirl();

    // male ninja
    var maleNinja = 
  Crafty.e("2D, DOM, NinjaBoy, player, maleNinja, LeftControls, Collision")
        .attr({ x: 200, y: 250, z: 0 })
        .leftControls(2)
        .NinjaBoy();
    
    //shuriken
    var shuriken = Crafty.e("2D, DOM, shuriken, NinjaStar, FireControls")
        .attr({x: maleNinja.x, y: maleNinja.y})
        .fireControls(15)
        .NinjaStar;

  var borderTop =
  Crafty.e("2D, DOM, Collision, borderTop")
    .attr( {x: 0, y: 5, z: 0, w: win_w, h: 1});


};