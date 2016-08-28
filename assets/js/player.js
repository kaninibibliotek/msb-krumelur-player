var player = (function() {

  var stage = new Stage();

  var testMask;
  var testMaskVertices = [];

  var masterSpeed = 1;
  var masterSize  = 1;

  var queue = [];

  masks.forEach(function(mask) {
    var color = constants.MASK_COLORS[mask.z];
    stage.addMask(new Scenery(mask.vertices, mask.z, color, mask.name));
  });

  /*
  effects.forEach(function(effectJson, i) {
    loader.loadEffect(effectJson, function(effect) {
      stage.addEffect(effect);
      console.log('Loaded effect:', effectJson.name, i+1, 'of', effects.length);
    });
  });
  */

  function start() {
    requestAnimationFrame(draw);

    // Connect to server to listen for new krumelurs
    var socket = io('http://localhost:3000');

    socket.on('connect', function(){
      console.log('Socket connected to Chamberlain. Listening for new krumelurs...');
    });

    socket.on('newKrumelur', function(krumelur) {
      console.log('New krumelur:', krumelur); 
      addKrumelur(krumelur.url, behaviorKeyToName(krumelur.behavior));
    });

    socket.on('disconnect', function(){
      console.log('Disconnected from Chamberlain') 
    });

    // Add a random krumelur every now and then
    delayedAddKrumelur(1000);

    
    //if (!locationUtils.isDev()) {

      // Listen for new krumelurs

    // Request new krumelurs at regular intervals
    /*
    setInterval(function() {
      var amount = Math.max(0, constants.MAX_KRUMELURER - stage.getKrumelurer().length);

      loader.requestActors(amount, onReceivedActor);
    }, constants.REQUEST_INTERVAL);

    // Add queued krumelur at reqular intervals
    setInterval(function() {
      if (queue.length > 0) {
        stage.addKrumelur(queue.shift());
      }
    }, constants.ADD_INTERVAL);

    loader.requestActors(constants.MAX_KRUMELURER, onReceivedActor);
    */

    function onReceivedActor(actor) {
      queue.push(actor);
    }
  }

  function delayedAddKrumelur(delay=0) {
    setTimeout(
      addRandomKrumelur, 
      delay,
      () => {
        const delay = 5000; 
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

  // '001' ... '100' --> 'behaviorName'
  function behaviorKeyToName(strKey) {
    const key = parseInt(strKey);
    
    if (key < 20) {
      return 'newton2';
    } else if (key < 40) {
      return 'newton3';
    } else if (key < 60) {
      return 'newton4';
    } else if (key < 80) {
      return 'newton5';
    } else if (key < 100) {
      return 'scaletestet';
    } else {
      return DEFAULT_BEHAVIOR; 
    }
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
    var imageUrl = 'files/' + locationUtils.getQueryValue('name');
    var behaviorName = locationUtils.getQueryValue('behavior');
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
