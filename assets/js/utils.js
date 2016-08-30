var utils = (function() {

  var api = {
    isDev: function() {
      return isDev;
    },

    isLocal: function() {
      return window.env === 'development'; 
    },
    getQueryValue: function(name) {
      var matches = (new RegExp('[?&;]' + name + '=*([^&;#]*)')).exec(document.URL);

      if (matches) {
        var match = decodeURI(matches[1]);
        // '?foo' return true, "?foo=bar' returns 'bar'
        return match === '' ? true : match; 
      } else {
        return null; 
      }

    },
    // '001' ... '100' --> 'behaviorName'
    behaviorKeyToName: function(strKey) {
      const key = parseInt(strKey);
      
      if (key < 20) {
        return 'walkaround_01';
      } else if (key < 40) {
        return 'walkaround_02';
      } else if (key < 60) {
        return 'walkaround_03';
      } else if (key < 80) {
        return 'walkaround_04';
      } else if (key < 100) {
        return 'walkaround_01';
      } else {
        // Default behavior
        return 'walkaround_01';
      }
    },

    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };

  var isDev = !!api.getQueryValue('dev');

  return api;
})();
