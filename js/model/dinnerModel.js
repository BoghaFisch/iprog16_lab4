//DinnerModel Object constructor
var DinnerModel = function() {

	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu

  // The api key
  var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";

  // Dish to be shown in dish details
  var detailedDish = null;
  var detailedDishType = null;

  // menu[0] == starter, menu[1] == main course, menu[2] == dessert
  var menu = [null, null, null];

  // The number of guests
  var numberOfGuests = 4;

  // Array of listeners
  var listeners = [];

  this.addObserver = function(observer) {
    listeners.push(observer);
  }
  var notifyObservers = function(component, obj) {
    if (obj) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].update(component, obj);
      }
    }
    else {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].update(component);
      }
    }
  }

  this.getDetailedDish = function() {
    return detailedDish;
  }
  this.getDetailedDishType = function() {
    return detailedDishType;
  }
  this.setDetailedDish = function(id, type) {

    if (id == null) {
        detailedDish = null;
        detailedDishType = null;
        notifyObservers("detailedDish");
    }
    else {
      var recipeId = id;
      var url = "http://api.bigoven.com/recipe/" + recipeId + "?api_key=" + apiKey;
      $.ajax({
          type: "GET",
          dataType: 'json',
          cache: false,
          url: url,
          success: function (data) {
              detailedDish = data;
              detailedDishType = type;
              notifyObservers("detailedDish");
          },
          error: function() {
            notifyObservers("error");
          }
      });
    }
  }
	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
    notifyObservers("guests");
	}

	// Return number of guests
	this.getNumberOfGuests = function() {
    return numberOfGuests;
	}

	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
		return menu[type];
	}
	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
    var rMenu = [];
    for (var i = 0; i < menu.length; i++) {
      rMenu.push(menu[i]);
    }
		return rMenu;
	}
  this.menuFull = function() {
    for (var i = 0; i < menu.length; i++) {
      if (menu[i] == null) {
        return false;
      }
    }
    return true;
  }
	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
    var rIngredients = [];
    for (var i = 0; i < menu.length; i++) {
      if (menu[i] != null) {
        for (var j = 0; j < menu[i].ingredients.length; j++) {
          rIngredients.push(menu[i].ingredients[j]);
        }
      }
    }
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var totPrice = 0;
    for (var i = 0; i < menu.length; i++) {
      if (menu[i] != null) {
        totPrice += this.getDishPrice(menu[i]);
      }
    }
    return totPrice;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id, type) {
    var recipeId = id;
    var url = "http://api.bigoven.com/recipe/" + recipeId + "?api_key=" + apiKey;
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
            if (type == "starter") {
              menu[0] = data;
            }
            else if (type == "main dish"){
              menu[1] = data;
            }
            else if (type == "dessert") {
              menu[2] = data;
            }
            notifyObservers("menu");
        },
        error: function() {
          notifyObservers("error");
        }
    });
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		for (var i = 0; i < menu.length; i++) {
      if (menu[i] != null) {
        if (menu[i].RecipeID == id) {
          menu[i] = null;
        }
      }
    }
    notifyObservers("menu");
	}


  this.getAllDishes = function (type,filter) {
    var titleKeyword = type;
    if (filter) {
      var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
            + titleKeyword
            + "&title_kw="+filter
            + "&api_key="+apiKey;
    }
    else {
      var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
            + titleKeyword
            + "&api_key="+apiKey;
    }

    $.ajax({
          type: "GET",
          dataType: 'json',
          cache: false,
          url: url,
          success: function (data) {
            notifyObservers("dishes", data.Results);
          },
          error: function() {
            notifyObservers("error");
          }
      });
  }

	//function that returns a dish of specific ID
	this.getDish = function (id) {
    var recipeId = id;
    var url = "http://api.bigoven.com/recipe/" + recipeId + "?api_key=" + apiKey;
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
            notifyObservers("getDish", data);
        },
        error: function() {
          notifyObservers("error");
        }
    });
	}
  // Returns the total price for the dish
  this.getDishPrice = function(dish) {
    var price = 0;
    for (var i = 0; i < dish.Ingredients.length; i++) {
      price += dish.Ingredients[i].MetricQuantity;
    }
    price = price * numberOfGuests;
    return price;
  }
}
