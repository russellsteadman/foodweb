var lunr = require('lunr');
var namesIndex = require('./json/namesIndex.json');
var fullData = require('./json/full.json');

var idx = lunr.Index.load(namesIndex);

/*
Field name Type Description
NDB_No. A 5* 5-digit Nutrient Databank number that uniquely identifies a food item. If this field is defined as numeric, the leading zero will be lost.
Shrt_Desc A 60 60-character abbreviated description of food item.†
Water N 10.2 Water (g/100 g)
Energ_Kcal N 10 Food energy (kcal/100 g)
Protein N 10.2 Protein (g/100 g)
Lipid_Tot N 10.2 Total lipid (fat) (g/100 g)
Ash N 10.2 Ash (g/100 g)
Carbohydrt N 10.2 Carbohydrate, by difference (g/100 g)
Fiber_TD N 10.1 Total dietary fiber (g/100 g)
Sugar_Tot N 10.2 Total sugars (g/100 g)
Calcium N 10 Calcium (mg/100 g)
Iron N 10.2 Iron (mg/100 g)
Magnesium N 10 Magnesium (mg/100 g)
Phosphorus N 10 Phosphorus (mg/100 g)
Potassium N 10 Potassium (mg/100 g)
Sodium N 10 Sodium (mg/100 g)
Zinc N 10.2 Zinc (mg/100 g)
Copper N 10.3 Copper (mg/100 g)
Manganese N 10.3 Manganese (mg/100 g)
Selenium N 10.1 Selenium (μg/100 g)
Vit_C N 10.1 Vitamin C (mg/100 g)
Thiamin N 10.3 Thiamin (mg/100 g)
Riboflavin N 10.3 Riboflavin (mg/100 g)
Niacin N 10.3 Niacin (mg/100 g)
Panto_acid N 10.3 Pantothenic acid (mg/100 g)
Vit_B6 N 10.3 Vitamin B6 (mg/100 g)
Folate_Tot N 10 Folate, total (μg/100 g)
Folic_acid N 10 Folic acid (μg/100 g)
Food_Folate N 10 Food folate (μg/100 g)
Folate_DFE N 10 Folate (μg dietary folate equivalents/100 g)
Choline_Tot N 10 Choline, total (mg/100 g)
Vit_B12 N 10.2 Vitamin B12 (μg/100 g)
Vit_A_IU N 10 Vitamin A (IU/100 g)
Vit_A_RAE N 10 Vitamin A (μg retinol activity equivalents/100g)
Retinol N 10 Retinol (μg/100 g)
Alpha_Carot N 10 Alpha-carotene (μg/100 g)
Beta_Carot N 10 Beta-carotene (μg/100 g)
Beta_Crypt N 10 Beta-cryptoxanthin (μg/100 g)
Lycopene N 10 Lycopene (μg/100 g)
Lut+Zea N 10 Lutein+zeazanthin (μg/100 g)
Vit_E N 10.2 Vitamin E (alpha-tocopherol) (mg/100 g)
Vit_D_mcg N 10.1 Vitamin D (μg/100 g)
Vit_D_IU N 10 Vitamin D (IU/100 g)
Vit_K N 10.1 Vitamin K (phylloquinone) (μg/100 g)
FA_Sat N 10.3 Saturated fatty acid (g/100 g)
FA_Mono N 10.3 Monounsaturated fatty acids (g/100 g)
FA_Poly N 10.3 Polyunsaturated fatty acids (g/100 g)
Cholestrl N 10.3 Cholesterol (mg/100 g)
GmWt_1 N 9.2 First household weight for this item from the
Weight file.‡
GmWt_Desc1 A 120 Description of household weight number 1.
GmWt_2 N 9.2 Second household weight for this item from the
Weight file.‡
GmWt_Desc2 A 120 Description of household weight number 2.
Refuse_Pct N 2 Percent refuse.§

* Primary key for the Abbreviated file.
† For a 200-character description and other descriptive information, link to the Food
Description file.
‡ For the complete list and description of the measure, link to the Weight file.
§ For a description of refuse, link to the Food Description file.*/

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