var settings = (function() {
  var settingsElem = document.getElementsByClassName('settings')[0];

  var speedInput = settingsElem.getElementsByClassName('input-speed')[0];
  var sizeInput  = settingsElem.getElementsByClassName('input-size')[0];
  var speedLabel = settingsElem.getElementsByClassName('label-speed')[0];
  var sizeLabel  = settingsElem.getElementsByClassName('label-size')[0];

  var toggleMasksCheckBox = settingsElem.getElementsByClassName('toggle-masks')[0];
  var maskJsonElem        = settingsElem.getElementsByClassName('mask-json')[0]

  var hidden = true;

  function setSpeedLabel(value) {
    speedLabel.innerHTML = value;
  }

  function setSizeLabel(value) {
    sizeLabel.innerHTML = value;
  }

  setSpeedLabel(1);
  setSizeLabel(1);

  speedInput.addEventListener('input', function(ev) {
    player.setSpeed(speedInput.value);
    setSpeedLabel(speedInput.value);
  });

  sizeInput.addEventListener('input', function(ev) {
    player.setSize(sizeInput.value);
    setSizeLabel(sizeInput.value);
  });

  toggleMasksCheckBox.addEventListener('change', function(ev) {
    player.showMasks(toggleMasksCheckBox.checked);
  });

  return {
    toggle: function() {
      hidden = !hidden;

      if (hidden) {
        settingsElem.setAttribute('style', 'display: none;');
      } else {
        settingsElem.setAttribute('style', 'display: block;');
      }
    },

    showJsonMask: function(maskPoints) {
      maskJsonElem.innerHTML = JSON.stringify(maskPoints, null, 2);
    }
  }
})();
