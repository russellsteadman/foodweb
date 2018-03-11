var Lunr  = require('lunr');
var FoodNames = require('./../json/names');
var fs = require('fs');
var path = require('path');

var foodSearch = Lunr(function () {
    this.ref('i');
    this.field('a');

    FoodNames.map(function (name, index) {
        this.add({
            a: name,
            i: index
        });
    }.bind(this));
});

fs.writeFileSync(path.join(__dirname, './../json/namesIndex.json'), JSON.stringify(foodSearch));