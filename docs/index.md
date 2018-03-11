# foodWeb

foodWeb is an open source project that makes it simple to access the USDA's [Nutrient Standard Reference Database](https://www.ars.usda.gov/northeast-area/beltsville-md/beltsville-human-nutrition-research-center/nutrient-data-laboratory/docs/sr28-download-files/).

## Installation

```shell
$ npm i -S foodweb
$ yarn add foodweb
```

## Example

```js
var foodWeb = require('foodweb');

var item = foodWeb.search('cheez it')[0];

// kilocalories in 100 grams
var calories = item.data.kcal;
// kilocalories in a serving
var serving = Math.round((item.data.primaryWeight / 100) * calories);
// description of serving
var servingDescription = item.data.primaryWeightDesc;

console.log(servingDescription, 'is', serving, 'calories');
// 29 crackers is 135 calories
```

Note: While `foodWeb` works best in Node.js, it is fully compatible with client packagers like webpack. See [a demo here](https://food.js.org/example/)!

## Methods

### foodWeb.search(term, maxLength)

Search the pre-built index. For more advanced documentation (like using weighting or rough matches) read [this documentation](https://lunrjs.com/guides/searching.html).

```js
var foodWeb = require('foodweb');

var term = 'butter'; // the search term
var maxLength = 5; // the maximum number of items to return

foodWeb.search(term, maxLength);
/*
 [foodMatch {
     internal: {...},
     score: Number,
     data: foodItem {...}
 }, ...]
*/
```

Returns an array of `foodMatch` objects in descending relatedness.

## Objects

### foodWeb.internal

An instance from the [internal search library](https://lunrjs.com/guides/getting_started.html) used.

### foodMatch.internal

A score and metadata from the [internal search library](https://lunrjs.com/guides/getting_started.html) used.

### foodMatch.score

A fraction representing how close the search term was to the matched item.

### foodMatch.data

A `foodItem` object containing all of the information about the item.

### foodItem

The `foodItem` has children for all data about the item.

#### Children

* **ndb** 5-digit Nutrient Databank number that uniquely identifies a food item
* **title** Abbreviated description of food item
* **water** Water (N) 10.2 Water (g/100 g)
* **kcal** Food energy (kcal/100 g)
* **protein** Protein (g/100 g)
* **lipidTotal** Total lipid (fat) (g/100 g)
* **ash** Ash (g/100 g)
* **carb** Carbohydrate, by difference (g/100 g)
* **fiberTotalDietary** Total dietary fiber (g/100 g)
* **sugarTotal** Total sugars (g/100 g)
* **elCa** Calcium (mg/100 g)
* **elFe** Iron (mg/100 g)
* **elMg** Magnesium (mg/100 g)
* **elP** Phosphorus (mg/100 g)
* **elK** Potassium (mg/100 g)
* **elNa** Sodium (mg/100 g)
* **elZn** Zinc (mg/100 g)
* **elCu** Copper (mg/100 g)
* **elMa** Manganese (mg/100 g)
* **elSe** Selenium (μg/100 g)
* **vitaminC** Vitamin C (mg/100 g)
* **thiamin** Thiamin (mg/100 g)
* **riboflavin** Riboflavin (mg/100 g)
* **niacin** Niacin (mg/100 g)
* **pantothenicAcid** Pantothenic acid (mg/100 g)
* **vitaminB6** Vitamin B6 (mg/100 g)
* **folateTotal** Folate, total (μg/100 g)
* **folicAcid** Folic acid (μg/100 g)
* **foodFolate** Food folate (μg/100 g)
* **dietaryFolate** Folate (μg dietary folate equivalents/100 g)
* **cholineTotal** Choline, total (mg/100 g)
* **vitaminB12** Vitamin B12 (μg/100 g)
* **vitaminAIU** Vitamin A (IU/100 g)
* **vitaminA** Vitamin A (μg retinol activity equivalents/100g)
* **retinol** Retinol (μg/100 g)
* **alphaCarotene** Alpha-carotene (μg/100 g)
* **betaCarotene** Beta-carotene (μg/100 g)
* **betaCryptoxanthin** Beta-cryptoxanthin (μg/100 g)
* **lycopene** Lycopene (μg/100 g)
* **luteinZeazanthin** Lutein+zeazanthin (μg/100 g)
* **vitaminE** Vitamin E (alpha-tocopherol) (mg/100 g)
* **vitaminD** Vitamin D (μg/100 g)
* **vitaminDIU** Vitamin D (IU/100 g)
* **vitaminK** Vitamin K (phylloquinone) (μg/100 g)
* **saturatedFat** Saturated fatty acid (g/100 g)
* **monounsaturatedFat** Monounsaturated fatty acids (g/100 g)
* **polyunsaturatedFat** Polyunsaturated fatty acids (g/100 g)
* **cholesterol** Cholesterol (mg/100 g)
* **primaryWeight** First household weight
* **primaryWeightDesc** Description of household weight number 1
* **secondaryWeight** Second household weight
* **secondaryWeightDesc** Description of household weight number 2
* **refuse** Percent refuse

## License

MIT (C) [Russell Steadman](https://teamtofu.github.io/contact). Learn more in the [LICENSE](https://github.com/teamtofu/foodweb/blob/master/LICENSE) file.

The [source data](https://catalog.data.gov/dataset/usda-national-nutrient-database-for-standard-reference) is released by the USDA under a [Creative Commons 4.0 Attributional License](https://creativecommons.org/licenses/by/4.0/). The contents of the files were modified.

## Support Me

Like this project? Buy me a [cup of coffee](https://www.paypal.me/RussellSteadman/3). &#x2615; Here are more of my [projects](https://teamtofu.github.io/).