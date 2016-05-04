var player = (function() {

  var renderer = PIXI.autoDetectRenderer(
    5760,
    1080,
    {
      view:        document.getElementsByTagName('canvas')[0],
      transparent: true
    }
  );

  var stage = new Stage();

  var testMask;
  var testMaskVertices = [];

  var masterSpeed = 1;
  var masterSize  = 1;

  maskVertices.forEach(function(vertices) {
    stage.addActor(new Scenery(vertices));
  });

  function draw() {
    requestAnimationFrame(draw);

    stage.update(masterSpeed, masterSize);

    renderer.render(stage);
  }

  requestAnimationFrame(draw);

  return {
    setSpeed: function(newSpeed) {
      masterSpeed = Math.max(0.1, Math.min(newSpeed, 2));
    },

    setSize: function(newSize) {
      masterSize = Math.max(0.1, Math.min(newSize, 2));
    },

    // TODO should ask loader for stuff instead
    addActor: function(actor) {
      stage.addActor(actor);
    },

    showScenery: function() {
      stage.showScenery();
    },

    hideScenery: function() {
      stage.hideScenery();
    },

    addTestMaskPoint: function(x, y) {
      testMaskVertices.push({
        x: x,
        y: y
      });

      stage.removeActor(testMask);

      testMask = new TestMask(testMaskVertices);

      stage.addActor(testMask);

      settings.showJsonMask(testMaskVertices);
    },

    removeTestMask: function() {
      stage.removeActor(testMask);

      testMaskVertices = [];
    }
  }
})();
