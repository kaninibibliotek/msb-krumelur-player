function Stage() {
  // Inherits from PIXI.Container
  PIXI.Container.call(this);
}

Stage.prototype = Object.create(PIXI.Container.prototype);

Stage.prototype.addActor = function(actor) {
  this.addChild(actor);
};

Stage.prototype.removeActor = function(actor) {
  this.removeChild(actor);
};

Stage.prototype.update = function(frameDelta, masterSize) {
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].update(frameDelta, masterSize);
  }

  this.children = mergeSortBy(this.children, 'zIndex');
};

Stage.prototype.getDoneActors = function() {
  return this.children.filter(function(actor) {
    return actor.done;
  });
};

Stage.prototype.showScenery = function() {
  this.children.forEach(function(actor) {
    if (actor instanceof Scenery) {
      actor.show();
    }
  })
};

Stage.prototype.hideScenery = function() {
  this.children.forEach(function(actor) {
    if (actor instanceof Scenery) {
      actor.hide();
    }
  })
};

Stage.prototype.showSceneryLayer = function(zIndex) {
  this.children.forEach(function(actor) {
    if (actor instanceof Scenery && actor.zIndex === zIndex) {
      actor.show();
    }
  })
};

Stage.prototype.hideSceneryLayer = function(zIndex) {
  this.children.forEach(function(actor) {
    if (actor instanceof Scenery && actor.zIndex === zIndex) {
      actor.hide();
    }
  })
};

Stage.prototype.getKrumelurer = function() {
  return this.children.filter(function(actor) {
    return actor instanceof Krumelur;
  });
};

Stage.prototype.clearKrumelurer = function() {
  this.children = this.children.filter(function(actor) {
    return !(actor instanceof Krumelur);
  });
};
