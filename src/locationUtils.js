var locationUtils = (function() {
  var dev = window.location.search.startsWith('?dev');

  return {
    isDev: function() {
      return dev;
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
    }
  };
})();
