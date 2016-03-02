var DishDetailsView = function (container, model) {
  this.populate = function() {
    if (model.getDetailedDish() != null) {
      // Empty containers
      this.dishDescription.empty();
      this.dishIngredients.empty();
      this.preparationInstructions.empty();

      // Get the selected dish to show details for
      var selectedDish = model.getDetailedDish();
      var dishPrice = model.getDishPrice(selectedDish);

      // Add dish name, description and image to container
      this.dishDescription.append("<h3 id='dishDetailsHeader'>"+selectedDish.Title+"</h3>");
      this.dishDescription.append("<figure id='selectedDishFig'><img src='"+selectedDish.ImageURL+"' ><figcaption>"+selectedDish.Description+"</figcaption></figure>");
      this.dishDescription.append("<button class='btn btn-default' id='backToSelectButton' type='submit'>Back to Select Dish</button>");

      // Add the list of ingredients table header
      var numPeople = model.getNumberOfGuests();
      this.dishIngredients.append("<h4 id='ingredientsHeader'>INGREDIENTS FOR "+numPeople+" PEOPLE</h4>");
      this.dishIngredients.append("<hr class='breakLine'>");

      // Add table
      var ingredients = selectedDish.Ingredients;
      var tString = "<table id='dtIngredientsTable'>";
      for (var i = 0; i < ingredients.length; i++) {
        tString += "<tr><td class='ingredientAmount'>"+(ingredients[i].MetricQuantity * numPeople) + ingredients[i].MetricUnit + "</td><td class='ingredientName'>"
          + ingredients[i].Name + "</td><td class='ingredientPrice'>SEK"+ (ingredients[i].MetricQuantity * numPeople) + "</td></tr>";
      }
      tString += "</table>";
      this.dishIngredients.append(tString);
      this.dishIngredients.append("<hr class='breakLine'>");
      this.dishIngredients.append("<div class='row'>");
      this.dishIngredients.append("<div class='col-md-6'><button class='btn btn-default' id='confirmDishButton' type='submit'>Confirm Dish</button></div>");

      this.dishIngredients.append("<div class='col-md-6'>SEK "+dishPrice+"</div>");

      // Add preparation instructions
      this.preparationInstructions.append("<h3>Preparation</h3>");
      this.preparationInstructions.append(selectedDish.Instructions);
    }
  }
  this.setLoading = function() {
    // Empty containers
    this.dishDescription.empty();
    this.dishIngredients.empty();
    this.preparationInstructions.empty();

    // Append loading message
    this.dishDescription.append("<h3>Loading dish..</h3>");
    this.dishIngredients.append("<h3>Loading ingredients..</h3>");
  }
  this.setError = function() {
    // Empty containers
    this.dishDescription.empty();
    this.dishIngredients.empty();
    this.preparationInstructions.empty();

    // Append error messages to description and ingredients
    this.dishDescription.append("<h3>Error.. Please check your internet connection.</h3>");
    this.dishIngredients.append("<h3>Error.. Please check your internet connection.</h3>");
  }
  this.show = function() {
    // Show container
    container.show();
  }
  this.hide = function() {
    container.hide();
  }
  this.update = function(component, obj) {
    if (component == "error") {
      this.showError();
    }
    else if (component == "guests" || component == "detailedDish") {
       this.populate();
    }
  }
  // Set container variables
  this.container = container;
  this.dishDescription = $("#dishDescription");
  this.dishIngredients = $("#dishIngredients");
  this.preparationInstructions = $("#preparationInstructions");

  // Populate the container
  this.populate();

  // Add as model listener
  model.addObserver(this);
}
