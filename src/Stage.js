function Stage() {
  this.container = new PIXI.Container();

  this.actors = [];
}

Stage.prototype.addActor = function(actor) {
  this.container.addChild(actor.sprite);

  this.actors.push(actor);
};

Stage.prototype.removeActor = function(actor) {
  this.container.removeChild(actor.sprite);

  var idx = this.actors.indexOf(actor);

  if (idx >= 0) {
    this.actors.splice(idx, 1);
  }
};

Stage.prototype.update = function(frameDelta) {
  this.actors.forEach(function(actor) {
    actor.update(frameDelta);
  });
};
