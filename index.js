var foodWeb = function () {
    this.getProductData = function () {
        return require('./json/src/foodDb');
    };
    this.getFoodGroup = function (groupId) {
        var foodGroup = require('./json/src/foodGroup');
        for (var i in foodGroup) {
            if (Number(foodGroup[i][0]) === Number(groupId)) {
                return foodGroup[i][1];
            }
        }
        return '';
    };
    this.lookUpProduct = function (search) {
        search = search.replace(/[^ \w]+/g,'').replace(/[\s]+/g,' ').toLowerCase().split(' ');
        var searchDb = require('./json/src/searchDb');
        var matching = [];
        for (var i in search) {
            var curTerm = [];
            for (var o in searchDb) {
                if (searchDb[o].key&&searchDb[o].key.indexOf(search[i]) !== -1) curTerm.push(searchDb[o].id);
            }
            matching.push(curTerm);
        }
        
        var instance = {};
        for (var i in matching) {
            for (var o in matching[i]) {
                if (typeof instance[matching[i][o]] === 'number') {
                    instance[matching[i][o]] += 1;
                } else {
                    instance[matching[i][o]] = 1;
                }
            }
        }

        var instanceArray = [];
        for (var i in instance) {
            instanceArray.push({id:i,num:instance[i]||0});
        }

        instanceArray.sort(function(a, b) {
            var shifter = a.num - b.num;
            return shifter>0?1:(shifter<0?-1:0);
        });

        return this.getProductById(instanceArray[0].id);
    };
    this.getProductById = function (productId) {
        var foodDb = this.getProductData();
        for (var i in foodDb) {
            if (Number(foodDb[i].id) === Number(productId)) return foodDb[i];
        }
        return null;
    };
};

module.exports = new foodWeb();