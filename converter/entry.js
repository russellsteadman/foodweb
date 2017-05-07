var fs = require('fs');
var ascii = require('./component/ascii');

var foodDes = ascii.convert(fs.readFileSync('./../db/FOOD_DES.txt','ascii'), true);

var searchDb = [];

for (var i in foodDes) {
    var a = foodDes[i];
    foodDes[i] = {};
    foodDes[i].id = a[0]; //NDB_NO
    foodDes[i].group = a[1]; //FOOD GROUP
    if (a[5]) foodDes[i].maker = a[5];
    if (a[6]) foodDes[i].hasExtra = a[6];
    if (a[8]) foodDes[i].refuse = a[8];
    foodDes[i].about = {};
    foodDes[i].about.long = a[2];
    foodDes[i].about.short = a[3];
    if (a[2]) foodDes[i].keywords = a[2].replace(/[^ \w]+/g,'').replace(/[\s]+/g,' ').toLowerCase().split(' ');
    if (a[7]) foodDes[i].about.refuse = a[7];
    foodDes[i].name = {};
    if (a[9]) foodDes[i].name.sci = a[9];
    if (a[4]) foodDes[i].name.alias = a[4];
    foodDes[i].factor = {};
    if (a[10]) foodDes[i].factor.n = a[10];
    if (a[11]) foodDes[i].factor.pro = a[11];
    if (a[12]) foodDes[i].factor.fat = a[12];
    if (a[13]) foodDes[i].factor.cho = a[13];
    searchDb.push({id: a[0], key: foodDes[i].keywords});
}

fs.writeFileSync('./../json/src/searchDb.json', JSON.stringify(searchDb));

var footNote = ascii.convert(fs.readFileSync('./../db/FOOTNOTE.txt','ascii'));

for (var i in foodDes) {
    for (var o in footNote) {
        foodDes[i].footnote = {};
        if (foodDes[i].id === footNote[o][0]) {
            if (footNote[o][1]) foodDes[i].footnote.number = footNote[o][1];
            if (footNote[o][2]) foodDes[i].footnote.type = footNote[o][2];
            if (footNote[o][3]) foodDes[i].footnote.nutrient = footNote[o][3];
            if (footNote[o][4]) foodDes[i].footnote.text = footNote[o][4];
        }
    }
}

var foodGroup = ascii.convert(fs.readFileSync('./../db/FD_GROUP.txt','ascii'));
fs.writeFileSync('./../json/src/foodGroup.json', JSON.stringify(foodGroup));

fs.writeFileSync('./../json/src/foodDb.json', JSON.stringify(foodDes));
