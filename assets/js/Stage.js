function Stage() {
  // Inherits from PIXI.Container
  PIXI.Container.call(this);

  this.krumelurer = [];
  this.masks = [];
  this.effects = [];

  this.dev = {
    effectTrigger: 100    // 100 = no effect, <100 = effect  
  };
}

Stage.prototype = Object.create(PIXI.Container.prototype);

Stage.prototype.addKrumelur = function(krumelur) {
  console.log('stage.addKrumelur', krumelur);
  this.krumelurer.push(krumelur);

  this.addChild(krumelur);
};

Stage.prototype.addMask = function(mask) {
  this.masks.push(mask);

  this.addChild(mask);
};

Stage.prototype.addEffect = function(effect) {
  this.effects.push(effect);

  this.addChild(effect);
};

Stage.prototype.removeKrumelur = function(krumelur) {
  this.krumelurer.splice(this.krumelurer.indexOf(krumelur), 1);

  this.removeChild(krumelur);
};

Stage.prototype.removeMask = function(mask) {
  this.masks.splice(this.masks.indexOf(mask), 1);

  this.removeChild(mask);
};

Stage.prototype.removeEffect = function(effect) {
  this.effects.splice(this.effects.indexOf(effect), 1);

  this.removeChild(effect);
};

Stage.prototype.update = function(frameDelta, masterSize) {
  var triggers = [];

  // Effects are triggered by a Krumelur opacity value < 100
  this.krumelurer.forEach(function(krumelur) {
    krumelur.update(frameDelta, masterSize);

    if (krumelur.opacity !== 100) {
      triggers.push(krumelur.opacity);
    }
  });

  this.effects.forEach(function(effect) {
    if (triggers.includes(effect.trigger)) {
      effect.start();
    }

    effect.update(frameDelta, masterSize);
  });

  // Dev stuff
  if (utils.isDev()) {
    if (this.dev.effectTrigger < 100) {
      var effectToTrigger = this.effects.find(function(effect) {
        return effect.trigger === this.dev.effectTrigger; 
      }, this)  
      if (effectToTrigger) {
        effectToTrigger.start(); 
        this.dev.effectTrigger = 100; // Only trigger once
      }
    } 
  }

  this.children = mergeSortBy(this.children, 'zIndex');
};

Stage.prototype.getDoneActors = function() {
  return this.krumelurer.filter(function(actor) {
    return actor.done;
  });
};

Stage.prototype.showScenery = function() {
  this.masks.forEach(function(mask) {
    mask.show();
  });
};

Stage.prototype.hideScenery = function() {
  this.masks.forEach(function(mask) {
    mask.hide();
  });
};

Stage.prototype.showSceneryLayer = function(zIndex) {
  this.masks.forEach(function(mask) {
    if (mask.zIndex === zIndex) {
      mask.show();
    }
  });
};

Stage.prototype.hideSceneryLayer = function(zIndex) {
  this.masks.forEach(function(mask) {
    if (mask.zIndex === zIndex) {
      mask.hide();
    }
  });
};

Stage.prototype.showSceneryWithName = function(name) {
  this.masks.forEach(function(mask) {
    if (mask.name === name.toLowerCase()) {
      mask.show();
    }
  });
};

Stage.prototype.hideSceneryWithName = function(name) {
  this.masks.forEach(function(mask) {
    if (mask.name === name.toLowerCase()) {
      mask.hide();
    }
  });
};

Stage.prototype.enableSceneryLayer = function(zIndex) {
  this.masks.forEach(function(mask) {
    if (mask.zIndex === zIndex) {
      mask.enable();
    }
  });
};

Stage.prototype.disableSceneryLayer = function(zIndex) {
  this.masks.forEach(function(mask) {
    if (mask.zIndex === zIndex) {
      mask.disable();
    }
  });
};

Stage.prototype.enableSceneryWithName = function(name) {
  this.masks.forEach(function(mask) {
    if (mask.name === name.toLowerCase()) {
      mask.enable();
    }
  });
};

Stage.prototype.disableSceneryWithName = function(name) {
  this.masks.forEach(function(mask) {
    if (mask.name === name.toLowerCase()) {
      mask.disable();
    }
  });
};

Stage.prototype.triggerEffectOnce = function(trigger) {
  this.dev.effectTrigger = trigger;
};

Stage.prototype.getKrumelurer = function() {
  return this.krumelurer;
};

Stage.prototype.clearKrumelurer = function() {
  this.krumelurer = [];
};
