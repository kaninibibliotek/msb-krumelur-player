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
  this.children.forEach(function(actor) {
    actor.update(frameDelta, masterSize);
  });

  // TODO Array.sort is unstable, replace it
  this.children.sort(function(a, b) {
    return a.zIndex - b.zIndex;
  });
};
