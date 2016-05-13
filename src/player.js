var player = (function() {

  var MAX_KRUMELURER = 10;

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

  function onReceivedActors(actors) {
    var index = 0;

    var id = setInterval(function() {
      stage.addActor(actors[index]);

      if (++index >= actors.length) {
        clearInterval(id);
      }
    }, 1000);
  }

  function draw() {
    requestAnimationFrame(draw);

    stage.update(masterSpeed, masterSize);

    var done = stage.getDoneActors();

    for (var i = 0; i < done.length; i++) {
      stage.removeActor(done[i]);
    }

    renderer.render(stage);
  }

  setInterval(function() {
    var amount = Math.max(0, MAX_KRUMELURER - stage.getKrumelurer().length);

    loader.requestActors(amount, onReceivedActors);
  }, 5000);

  loader.requestActors(MAX_KRUMELURER, onReceivedActors);

  requestAnimationFrame(draw);

  return {
    setSpeed: function(newSpeed) {
      masterSpeed = Math.max(0.1, Math.min(newSpeed, 2));
    },

    setSize: function(newSize) {
      masterSize = Math.max(0.1, Math.min(newSize, 2));
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
