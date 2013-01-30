<script type="text/javascript">

Crafty.init(800, 600);
Crafty.background('rgb(127,127,150)');
var rand_x = Crafty.math.randomInt(10, 790);
var rand_y = Crafty.math.randomInt(10, 590);
var dick_length = 1; // dicks for later

function moreDicks(dick_length) {
var dickReturn = "";
var i = 0;

while ( i < dick_length ) {
dickReturn += "=";
i++
}
return dickReturn;
}

// Snake 
Crafty.e("Dicks, 2D, DOM, Text, Collision, PlayerControls, Slide")
//.color('rgb(255,0,0)')
.attr({ x:0, y:0, w:10, h: 10, dick_length:0})
.text("C=8") 
.fourway(4, { W: -90, S: 90, A: 180, D: 0 } )
.onHit('Food', function() {
Crafty("Dicks").each(function() { 
++dick_length;
Crafty("Points").each(function() {
this.text( ++this.points + " Dick Points" );
});

// move food once hit
Crafty("Food").each(function() {
this.attr({ x: Crafty.math.randomInt(10, 790), y: Crafty.math.randomInt(10, 590), w:10, h:10 });
});
this.text( "C" + moreDicks(dick_length) + "8"); 
this.textColor( '#'+Math.floor(Math.random()*16777215).toString(16) );
});
});

// Food
Crafty.e("Food, 2D, DOM, Color, ")
.color('rgb(255, 255, 255)')
.attr({ x: Crafty.math.randomInt(10, 790), y: Crafty.math.randomInt(10, 590), w:10, h:10 });
// Scoreboard
Crafty.e("Points, DOM, 2D, Text")
.attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
.text("0 Dick Points");

</script>

