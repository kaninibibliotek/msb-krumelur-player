function Stage() {
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
      actor.changeColor(0xFF0000);
    }
  })
};

Stage.prototype.hideScenery = function() {
  this.children.forEach(function(actor) {
    if (actor instanceof Scenery) {
      actor.changeColor(0xFFFFFF);
    }
  })
};

Stage.prototype.getKrumelurer = function() {
  return this.children.filter(function(actor) {
    return actor instanceof Krumelur;
  });
};
