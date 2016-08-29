var utils = (function() {
  var dev = window.location.search.startsWith('?dev');

  return {
    isDev: function() {
      return dev;
    },

    isLocal: function() {
      return window.env === 'development'; 
    },

    getQueryValue: function(field) {
      var query = window.location.search.substring(4);
      var index = query.indexOf(field);

      if (index === -1) {
        return null;
      }

      var next = query.substring(index).indexOf('&');

      if (next === -1) {
        next = query.length;
      }

      return query.substring(index + field.length + 1, next + 1);
    },

    // '001' ... '100' --> 'behaviorName'
    behaviorKeyToName: function(strKey) {
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
    },

    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
