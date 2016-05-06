function Stage() {
  PIXI.Container.call(this);

  loader.requestActors(10, this.onReceivedActors.bind(this));
}

Stage.prototype = Object.create(PIXI.Container.prototype);

Stage.prototype.onReceivedActors = function(actors) {
  for (var i = 0; i < actors.length; i++) {
    this.addActor(actors[i]);
  }
};

Stage.prototype.addActor = function(actor) {
  this.addChild(actor);
};

Stage.prototype.removeActor = function(actor) {
  this.removeChild(actor);
};

Stage.prototype.update = function(frameDelta, masterSize) {
  var done = [];
  var i;

  for (i = 0; i < this.children.length; i++) {
    var actor = this.children[i];

    actor.update(frameDelta, masterSize);

    if (actor.done) {
      done.push(actor);
    }
  }

  if (done.length > 0) {
    for (i = 0; i < done.length; i++) {
      this.removeActor(done[i]);
    }

    loader.requestActors(done.length, this.onReceivedActors.bind(this));
  }

  this.children = mergeSortBy(this.children, 'zIndex');
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
