var lunr = require('lunr');
var namesIndex = require('./json/namesIndex.json');
var fullData = require('./json/full.json');

var idx = lunr.Index.load(namesIndex);

var foodItem = function (rawList) {
    var terms = ['ndb', 'title', 'water', 'kcal', 'protein', 'lipidTotal', 'ash', 'carb', 'fiberTotalDietary', 'sugarTotal', 'elCa', 'elFe', 'elMg', 'elP', 'elK', 'elNa', 'elZn', 'elCu', 'elMa', 'elSe', 'vitaminC', 'thiamin','riboflavin', 'niacin', 'pantothenicAcid', 'vitaminB6', 'folateTotal', 'folicAcid', 'foodFolate', 'dietaryFolate', 'cholineTotal', 'vitaminB12', 'vitaminAIU', 'vitaminA', 'retinol', 'alphaCarotene', 'betaCarotene', 'betaCryptoxanthin', 'lycopene', 'luteinZeazanthin', 'vitaminE', 'vitaminD', 'vitaminDIU', 'vitaminK', 'saturatedFat', 'monounsaturatedFat', 'polyunsaturatedFat', 'cholesterol', 'primaryWeight', 'primaryWeightDesc', 'secondaryWeight', 'secondaryWeightDesc', 'refuse'];
    
    for (var i in terms) {
        this[terms[i]] = rawList[i];
    }
};

var foodMatch = function (match) {
    this.internal = match;
    this.score = match.score;
    this.data = new foodItem(fullData[Number(match.ref)]);
};

var foodWeb = {};

foodWeb.internal = idx;

foodWeb.search = function (term, maxLength) {
    if (typeof maxLength !== 'number' || isNaN(maxLength)) maxLength = Infinity;
    return idx.search(term).reduce(function (a, b, c) {
        if (c >= maxLength) return a;
        a.push(new foodMatch(b));
        return a;
    }, []);
};

module.exports = foodWeb;