var foodWeb = function () {
    var loadedFoodDb = null;
    this.getProductData = function () {
        if (!loadedFoodDb) loadedFoodDb = require('./json/src/foodDb');
        return loadedFoodDb;
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

        var points = {};

        var give = function (to,amt) {
            to = String(Number(to));
            if (typeof points[to] === 'number') {
                points[to] += amt;
            } else {
                points[to] = amt;
            }
        };

        var singleFilter = function (value, index) {return this.indexOf(value) == index};
        search = search.filter(singleFilter, search);

        for (var i in search) {
            for (var o in searchDb) {
                if (searchDb[o].key) {
                searchDb[o].key = searchDb[o].key.filter(singleFilter, searchDb[o].key);
                for (var u in searchDb[o].key) {
                    if (searchDb[o].key[u] === search[i]) {
                        if (Number(i) === 0) {
                            give(searchDb[o].id, 2);
                        } else {
                            give(searchDb[o].id, 1);
                        }
                        break;
                    } else if ((searchDb[o].key[u].indexOf(search[i]) !== -1 || search[i].indexOf(searchDb[o].key[u]) !== -1) && searchDb[o].key[u].length - 2 >= search[i].length) {
                        give(searchDb[o].id, .5);
                        break;
                    }
                }
                }
            }
        }

        var instanceArray = [];
        for (var i in points) {
            instanceArray.push({id:i,num:points[i]||0});
        }

        instanceArray = instanceArray.sort(function(a, b) {
            var shifter = a.num - b.num;
            return shifter>0?-1:(shifter<0?1:0);
        });

        for (var i in instanceArray) {
            instanceArray[i] = this.getProductById(instanceArray[i].id);
        }

        return instanceArray;
    };
    this.getProductById = function (productId) {
        this.getProductData();
        for (var i in loadedFoodDb) {
            if (Number(loadedFoodDb[i].id) === Number(productId)) return loadedFoodDb[i];
        }
        return null;
    };

    var fetcher = function (query) {
        require('es6-promise').polyfill();
        require('isomorphic-fetch');
        var apiurl = 'https://commons.wikimedia.org/w/api.php';
        return fetch(apiurl+'?action=query&list=search&srsearch='+query+'&srnamespace=6&format=json')
        .then(function(res) {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        })
        .then(function (res) {
            if (!res.query.search[0]) throw new Error("Couldn't find a matching image.");
            var imgtitle = encodeURIComponent(res.query.search[0].title);
            if (!imgtitle) throw new Error("No image results.");
            return fetch(apiurl+'?action=query&titles='+imgtitle+'&prop=imageinfo&iiprop=url|size&iiurlheight=512&format=json');
        })
        .then(function (res) {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        })
        .then(function (res) {
            var page = res.query.pages[Object.keys(res.query.pages)[0]];
            var img = page.imageinfo[0];
            return {
                mediaId: page.pageid,
                image: {
                    thumbUrl: img.thumburl,
                    thumbWidth: img.thumbwidth,
                    thumbHeight: img.thumbheight,
                    url: img.url,
                    width: img.width,
                    height: img.height
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    };

    this.fetchImage = function (productId) {
        var product = this.getProductById(productId);
        var query = encodeURIComponent(product.keywords.join(' '));
        var groupName = this.getFoodGroup(productId);
        fetcher(query, );
    };
};

module.exports = new foodWeb();