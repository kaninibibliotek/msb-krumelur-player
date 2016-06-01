var player = (function() {

  var renderer = PIXI.autoDetectRenderer(
    constants.DISPLAY_WIDTH,
    constants.DISPLAY_HEIGHT,
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

  var queue = [];

  maskVertices.forEach(function(vertices) {
    stage.addActor(new Scenery(vertices));
  });

  function draw() {
    requestAnimationFrame(draw);

    stage.update(masterSpeed, masterSize);

    var done = stage.getDoneActors();

    for (var i = 0; i < done.length; i++) {
      stage.removeActor(done[i]);
    }

    renderer.render(stage);
  }

  if (locationUtils.isDev()) {
    addTestKrumelur();
  } else {
    // Request new krumelurs at regular intervals
    setInterval(function() {
      var amount = Math.max(0, constants.MAX_KRUMELURER - stage.getKrumelurer().length);

      loader.requestActors(amount, onReceivedActor);
    }, constants.REQUEST_INTERVAL);

    // Add queued krumelur at reqular intervals
    setInterval(function() {
      if (queue.length > 0) {
        stage.addActor(queue.shift());
      }
    }, constants.ADD_INTERVAL);

    loader.requestActors(constants.MAX_KRUMELURER, onReceivedActor);
  }

  function onReceivedActor(actor) {
    queue.push(actor);
  }

  function addTestKrumelur() {
    var imageUrl = 'krumelurer/' + locationUtils.getQueryValue('name');
    var behavior = __behaviors__[locationUtils.getQueryValue('behavior')];

    if (imageUrl && behavior) {
      loader.createKrumelur(imageUrl, behavior, function(krumelur) {
        stage.addActor(krumelur);
      });
    }
  }

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
    },

    addTestKrumelur: function() {
      addTestKrumelur();
    },

    clearKrumelurer: function() {
      stage.clearKrumelurer();
    }
  };
})();
