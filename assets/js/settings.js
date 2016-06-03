var settings = (function() {
  var settingsElem = document.getElementsByClassName('settings')[0];

  // Sliders
  var speedInput = settingsElem.getElementsByClassName('input-speed')[0];
  var sizeInput  = settingsElem.getElementsByClassName('input-size')[0];
  var speedLabel = settingsElem.getElementsByClassName('label-speed')[0];
  var sizeLabel  = settingsElem.getElementsByClassName('label-size')[0];

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

  // Toggle for all masks
  var toggleMasksCheckBox = settingsElem.getElementsByClassName('toggle-masks')[0];

  // Toggles for masks by name or layer
  var selectName = settingsElem.getElementsByClassName('mask-name-select')[0];
  var showName = settingsElem.getElementsByClassName('mask-name-show')[0];
  var hideName = settingsElem.getElementsByClassName('mask-name-hide')[0];
  var enableName = settingsElem.getElementsByClassName('mask-name-enable')[0];
  var disableName = settingsElem.getElementsByClassName('mask-name-disable')[0];

  var selectLayer = settingsElem.getElementsByClassName('mask-layer-select')[0];
  var showLayer = settingsElem.getElementsByClassName('mask-layer-show')[0];
  var hideLayer = settingsElem.getElementsByClassName('mask-layer-hide')[0];
  var enableLayer = settingsElem.getElementsByClassName('mask-layer-enable')[0];
  var disableLayer = settingsElem.getElementsByClassName('mask-layer-disable')[0];

  // Populate selection lists
  var uniqueZ = [];

  masks.forEach(function(mask) {
    selectName.add(new Option(mask.name));

    if (uniqueZ.indexOf(mask.z) === -1) {
      uniqueZ.push(mask.z);
    }
  });

  uniqueZ.forEach(function(z) {
    selectLayer.add(new Option(z));
  });

  // Show/hide by name
  showName.addEventListener('click', function(ev) {
    player.showSceneryWithName(selectName.selectedOptions[0].text);
  });

  hideName.addEventListener('click', function(ev) {
    player.hideSceneryWithName(selectName.selectedOptions[0].text);
  });

  enableName.addEventListener('click', function(ev) {
    player.enableSceneryWithName(selectName.selectedOptions[0].text);
  });

  disableName.addEventListener('click', function(ev) {
    player.disableSceneryWithName(selectName.selectedOptions[0].text);
  });

  // Show/hide by layer
  showLayer.addEventListener('click', function(ev) {
    player.showSceneryLayer(parseInt(selectLayer.selectedOptions[0].text));
  });

  hideLayer.addEventListener('click', function(ev) {
    player.hideSceneryLayer(parseInt(selectLayer.selectedOptions[0].text));
  });

  enableLayer.addEventListener('click', function(ev) {
    player.enableSceneryLayer(parseInt(selectLayer.selectedOptions[0].text));
  });

  disableLayer.addEventListener('click', function(ev) {
    player.disableSceneryLayer(parseInt(selectLayer.selectedOptions[0].text));
  });

  // Mask JSON data
  var maskJsonElem     = settingsElem.getElementsByClassName('mask-json')[0];
  var selectButtonElem = settingsElem.getElementsByClassName('button-select')[0];

  selectButtonElem.addEventListener('click', function(ev) {
    maskJsonElem.select();
  });

  toggleMasksCheckBox.addEventListener('change', function(ev) {
    if (toggleMasksCheckBox.checked) {
      player.showScenery();
    } else {
      player.hideScenery();
    }
  });

  // API
  var hidden = true;

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
