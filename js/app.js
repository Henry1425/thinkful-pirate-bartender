var pantry = {
    strong: ["glug of rum", "slug of whisky", "splash of gin"],
    salty: ["olive on a stick", "salt-dusted rim", "rasher of bacon"],
    bitter: ["shake of bitters", "splash of tonic", "twist of lemon peel"],
    sweet: ["sugar cube", "spoonful of honey", "splash of cola"],
    fruity: ["slice of orange", "dash of cassis", "cherry on top"]
};

var Order = function (orderValues) {
    // get the user's choice of ingredients groups
    this.strong = orderValues[0];
    this.salty = orderValues[1];
    this.bitter = orderValues[2];
    this.sweet = orderValues[3];
    this.fruity = orderValues[4];
};
var Drink = function (pantry, drinkOrder) {
    var ingredientNumber,
        ingredientsArray = [];

    for (var userPreference in drinkOrder) {
        ingredientNumber = generateRandomNumber(0, 2);
        if (drinkOrder[userPreference]) {
            ingredientsArray.push(pantry[userPreference][ingredientNumber]);
        }
    }
    return ingredientsArray;
};

//changes the ingredient names from whichever case the are to "Title Case"
var toTitleCase = function (str) {
    // "/\w\S*/g" is a regular expression (http://www.regular-expressions.info/) which searches for all words in a phrase ignoring the spaces
    return str.replace(/\w\S*/g, function (txt) {
        //only the first letter in the word make Upper case and all the other letters apart from the first one ("substr(1)") to lower case
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Function to generate the random number
var generateRandomNumber = function (min, max) {
    //Returns a random integer between min (included) and max (included); Math.floor() will give you a non-uniform distribution!
    //random number generator details can be found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// use if statements to piece together name conditionally based on the ingredients that comprise it
var drinkNamer = function (concoction) {
    if (concoction.length > 0) {
        //split the concoction by space to be able to use the words
        var drinkNamerOutput = concoction[0].split(" ");
        //build the name of the new drink by getting the second word of the first ingredient and add extra words around it
        return "yer Sparkly " + toTitleCase(drinkNamerOutput[drinkNamerOutput.length - 1]) + " Grog";
    } else {
        return false;
    }
};

$(document).ready(function () {

    $('.output').hide();


    $('form').on('submit', function (event) {

        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();

        //set the empty orderValues array
        orderValues = [];

        //check if the each one of the ingredient types have been chosen and that to the orderValues array;
        $('select').each(function () {
            orderValues.push($(this).val() === 'yes' ? true : false);
        });

        //use the 2 constructors to create 2 new objects
        drinkOrder = new Order(orderValues); // create new order from DOM
        concoction = new Drink(pantry, drinkOrder); // mix drink with Drink constructor

        //if there is at least one ingredient selected then show the concoction
        if (concoction.length > 0) {

            //build the chosen ingredients from the ingredients array
            var buildTheHtmlOutput = "";
            $.each(concoction, function (key, value) {
                buildTheHtmlOutput += "<li>" + value + "</li>";
            });

            //show the output container
            $('.output').show();

            //populate it with the ingredients
            $(".output ul").html(buildTheHtmlOutput);

            // name the customer's beverage with drinkNamer();
            $(".output h3").html("Here be " + drinkNamer(concoction) + ", ye scurvy dog!");
        }
        //if there are no ingredients selected then show alert
        else {
            alert('Pick something for your poison!');
        }
    });
});
