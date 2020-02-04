let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
//console.log(map.hasOwnProperty("one"));
// → true

// console.log(map.prototype.call(hasOwnProperty, "one"));
console.log("this!!!", hasOwnProperty.call(map, "one"));
