var food = require('./index.js');
var info = food.getProductData()[100];
console.log(info);
console.log(JSON.stringify(food.getFoodGroup(info.group)));
console.log(food.lookUpProduct('cracker cheezit'));