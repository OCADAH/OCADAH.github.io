0; // this is a comment, which means javascript will not try to execute this part
134151855;
12341.1515;
Infinity;
-13434;
-Infinity;
-0;

var kitty; // delcared a variable for store space in memory;

kitty = 5; // definition with a data type of number with the value 5

var Kitty = 24; // semi are end of statement, this line has a definition and declaration

console.log(kitty);

kitty = Kitty; // = assignment operator right to left

console.log(kitty); 

var doggy; // declared a variable but not defined a value
console.log(doggy); // undefined

// numbers, undefined, strings

var prose = 'I LOVE "KITTIES" and Potatoes'; // ' is a string delimiter
var moreprose = "But I don't have a 'kitten' and can't eat potatoes everyday";

// booleans are either true or false

var x = true;
x = false;

// objects
var ball = {}; // empty object
ball = null; // null is a datatype in javascript

// operators
5 + 5;
kitty = 5 + 5;
var kitty; // becomes undefined because we are now referring to a new place in memory

kitty = 5 +"5"; // string concatenation operator
console.log(kitty);

console.log(kitty + "MAYOOO");