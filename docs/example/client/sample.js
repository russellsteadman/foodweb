var food;
var add = function (name, attributes, inner) {
    var element = document.createElement(name);
    if (typeof attributes === 'object') {
        for (var i in attributes) {
            element.setAttribute(i, attributes[i]);
        }
    }
    if (inner) element.innerHTML = inner;
    return element;
};

var toBody = function (element) {
    document.body.appendChild(element);
};

var textChange = function () {
    var text = document.getElementById('search').value;

    var search = food.search(text);
    var items = [];

    for (var i in search) {
        if (items.length === 5) break;
        items.push(search[i].data);
    }

    console.log(items);

    setList(items);
};

var setList = function (items) {
    var list = document.getElementById('search-list');
    list.innerHTML = '';

    for (var i in items) {
        var item = add('li', {class: 'list-group-item', id: 'list-item-'+i}, items[i].title);
        list.appendChild(item);
        item.addEventListener('click', listClick.bind(this, items[i]));
    }
};

var listClick = function (foodItems) {
    var foodItem = document.getElementById('food-item');
    foodItem.innerHTML = '';

    for (var i in foodItems) {
        var item = add('li', {class: 'list-group-item', id: 'list-item-'+i});
        foodItem.appendChild(item);
        item.appendChild(add('b', {}, i + '&nbsp;'));
        item.appendChild(add('span', {}, foodItems[i]));
    }
};

import('./../../../index').then(function (foodWeb) {
    food = foodWeb;

    document.body.innerHTML = '';

    toBody(add('h1', {class: 'my-3 text-center'}, 'foodWeb Example'));

    var button = add('button', {class: 'btn btn-outline-dark btn-block my-3'}, 'Back to food.js.org');
    toBody(button);
    button.addEventListener('click', function () {window.location.assign('/');});

    var input = add('input', {class: 'my-3 form-control', id: 'search', placeholder:'cheez it'});
    toBody(input);
    input.addEventListener('input', textChange);

    var list = add('ul', {class: 'list-group', id: 'search-list', style: 'cursor: pointer;'});
    toBody(list);

    var foodItem = add('ul', {class: 'my-3 list-group', id: 'food-item'});
    toBody(foodItem);
});