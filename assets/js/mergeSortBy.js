var mergeSortBy = (function() {

  function mergeSort(array, property) {
    if (array.length < 2) {
      return array;
    }

    var middle = Math.floor(array.length / 2);
    var left   = array.slice(0, middle);
    var right  = array.slice(middle, array.length);

    return merge(mergeSort(left, property), mergeSort(right, property), property);
  }

  function merge(left, right, property) {
    var sorted = [];

    while (left.length > 0 && right.length > 0) {
      if (left[0][property] <= right[0][property]) {
        sorted.push(left.shift());
      } else {
        sorted.push(right.shift());
      }
    }

    while (left.length > 0) {
      sorted.push(left.shift());
    }

    while (right.length > 0) {
      sorted.push(right.shift());
    }

    return sorted;
  }

  return mergeSort;
})();
