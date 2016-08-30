var player = (function() {

  var stage = new Stage();

  var testMask;
  var testMaskVertices = [];

  var masterSpeed = 1;
  var masterSize  = .1;

  var queue = [];

  masks.forEach(function(mask) {
    var color = constants.MASK_COLORS[mask.z];
    stage.addMask(new Scenery(mask.vertices, mask.z, color, mask.name));
  });

  if (utils.getQueryValue('noEffects') === null) {
    effects.forEach(function(effectJson, i) {
      loader.loadEffect(effectJson, function(effect) {
        stage.addEffect(effect);
        console.log('Loaded effect:', effectJson.name, i+1, 'of', effects.length);
      });
    });
  }

  function start() {
    requestAnimationFrame(draw);

    // Connect to server to listen for new krumelurs
    var socketUrl = utils.isLocal() ? 'http://localhost:3000' : constants.CHAMBERLAIN_URL;
    var socket = io(socketUrl);

    socket.on('connect', function(){
      console.log(`Socket connected to ${socketUrl}. Listening for new krumelurs...`);
    });

    socket.on('newKrumelur', function(krumelur) {
      console.log('New krumelur:', krumelur.url); 

      const delay = utils.getQueryValue('newKrumelurDelay') || constants.NEW_KRUMELUR_DELAY;

      setTimeout(
        addKrumelur,
        delay,
        krumelur.url,
        utils.behaviorKeyToName(krumelur.behavior)
      );
    });

    socket.on('disconnect', function(){
      console.log('Disconnected from Chamberlain') 
    });

    // Add a random krumelur every now and then
    //delayedAddKrumelur(1000);
  }

  function delayedAddKrumelur(delay) {
    setTimeout(
      addRandomKrumelur, 
      delay,
      () => {
        const maxDelay = utils.getQueryValue('randomKrumelurDelayMax') || constants.RANDOM_KRUMELUR_DELAY_MAX; 
        const delay = utils.getRandomInt(0, maxDelay);
        delayedAddKrumelur(delay);
      }
    ) 
  }

  function addRandomKrumelur(callback) {
    loader.requestActors(1, krumelur  => {
      stage.addKrumelur(krumelur);
      callback();
    });
  }

  function draw() {
    requestAnimationFrame(draw);

    stage.update(masterSpeed, masterSize);

    var done = stage.getDoneActors();

    for (var i = 0; i < done.length; i++) {
      stage.removeKrumelur(done[i]);
    }

    renderer.render(stage);
  }


  // Load from querystring ?dev&name=krumelur.png&behavior=crazy
  function addTestKrumelur() {
    var imageUrl = 'files/' + utils.getQueryValue('name');
    var behaviorName = utils.getQueryValue('behavior');
    addKrumelur(imageUrl, behaviorName);
  }

  function addKrumelur(imageUrl, behaviorName) {
    console.log('addKrumelur', imageUrl, behaviorName); 
    var behavior = window.behaviors[behaviorName];
    loadKrumelur(imageUrl, behavior);
  }

  function loadKrumelur(imageUrl, behavior) {
    if (imageUrl && behavior) {
      loader.createKrumelur(imageUrl, behavior, function(krumelur) {
        stage.addKrumelur(krumelur);
      });
    } else {
      console.warn('loadKrumelur(): error loading krumelur', imageUrl, ' with behavior', behavior);
    }
  }

  return {
    start: function() {
      start(); 
    },
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

    showSceneryLayer: function(zIndex) {
      stage.showSceneryLayer(zIndex);
    },

    hideSceneryLayer: function(zIndex) {
      stage.hideSceneryLayer(zIndex);
    },

    showSceneryWithName: function(name) {
      stage.showSceneryWithName(name);
    },

    hideSceneryWithName: function(name) {
      stage.hideSceneryWithName(name);
    },

    enableSceneryLayer: function(zIndex) {
      stage.enableSceneryLayer(zIndex);
    },

    disableSceneryLayer: function(zIndex) {
      stage.disableSceneryLayer(zIndex);
    },

    enableSceneryWithName: function(name) {
      stage.enableSceneryWithName(name);
    },

    disableSceneryWithName: function(name) {
      stage.disableSceneryWithName(name);
    },

    triggerEffectOnce: function(trigger) {
      stage.triggerEffectOnce(trigger); 
    },

    addTestMaskPoint: function(x, y) {
      testMaskVertices.push({
        x: x,
        y: y
      });

      stage.removeMask(testMask);

      testMask = new TestMask(testMaskVertices);

      stage.addMask(testMask);

      settings.showJsonMask(testMaskVertices);
    },

    undoTestMaskPoint: function() {
      testMaskVertices.pop();

      stage.removeMask(testMask);

      testMask = new TestMask(testMaskVertices);

      stage.addMask(testMask);

      settings.showJsonMask(testMaskVertices);
    },

    removeTestMask: function() {
      stage.removeMask(testMask);

      testMaskVertices = [];
    },

    addKrumelur: function(imageUrl, behavior) {
      addKrumelur(imageUrl, behavior);
    },

    addTestKrumelur: function() {
      addTestKrumelur();
    },

    clearKrumelurer: function() {
      stage.clearKrumelurer();
    }
  };

  // Kick everything off!
  main();
})();
