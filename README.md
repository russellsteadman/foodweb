# foodWeb

foodWeb is an open source project that makes it simple to access the USDA's [Nutrient Standard Reference Database](https://iapreview.ars.usda.gov/Services/docs.htm?docid=8964).

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

This contains all of the information from the database including calories, nutrient makeup, and serving sizes. Read the [full documentation here](https://food.js.org/) to learn more.

## License

MIT (C) [Russell Steadman](https://teamtofu.github.io/contact). Learn more in the [LICENSE](https://github.com/teamtofu/foodweb/blob/master/LICENSE) file.

The [source data](https://catalog.data.gov/dataset/usda-national-nutrient-database-for-standard-reference) is released by the USDA under a [Creative Commons 4.0 Attributional License](https://creativecommons.org/licenses/by/4.0/). The contents of the files were modified.

## Support Me

Like this project? Buy me a [cup of coffee](https://www.paypal.me/RussellSteadman/3). &#x2615; Here are more of my [projects](https://teamtofu.github.io/).