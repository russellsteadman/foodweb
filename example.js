var food = require('./index.js');
var info = food.getProductData()[100];
console.log(info);
console.log(JSON.stringify(food.getFoodGroup(info.group)));
var cheezit = food.lookUpProduct('cheezit whole wheat')[0];
console.log(cheezit);
var brie = food.lookUpProduct('brie')[0];
console.log(brie);
var briePromise = food.fetchImage(brie.id);
briePromise.then(function (image) {
    console.log(image);
});
var cheezitPromise = food.fetchImage(cheezit.id);
cheezitPromise.then(function (image) {
    console.log(image);
});