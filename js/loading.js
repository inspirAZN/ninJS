<script>
// Scenes/loading.js defines the "loading" scene
// and loads our sprites

// Start Game will be called on document ready
function startGame() {

  Crafty.scene("main",function() {
    Crafty.background("#FFF");
    var player = Crafty.e("2D, Canvas, PlayerControls, Slide, hero1")
         .attr({x:0, y:0});

    var blob = Crafty.e("2D, Canvas, blob1")
         .attr({x:32, y:32});
  });

  Crafty.scene("loading");
}

</script>
