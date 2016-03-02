var SelectDishView = function (container, model) {

  this.populateTable = function(dishes) {

    this.dishesResultsTable.empty();
    var resultsString = "<tr id='firstRow'>";
    for (var i = 0; i < dishes.length; i++) {
      // For every 4th dish, make a new row in the beginning
      if (i % 5 == 0) {
        resultsString += "</tr><tr>";
      }
      // Append the image, name and description to table
      resultsString += "<td><figure class='dishResultsFigure'><a href='#'><img class='dishResultsImage' id='dish"+dishes[i].RecipeID+"' src='"+dishes[i].ImageURL+"'></a><figcaption style='text-align:center;'>"+dishes[i].Title+"</figcaption></figure>";
      resultsString += "<div class='dishDescription'>"+dishes[i].Subcategory+"</div></td>";

    }
    // Add remaining td's for sizing
    while (i % 5 != 0) {
      resultsString += "<td></td>";
      i++;
    }
    resultsString +="</tr>";
    this.dishesResultsTable.append(resultsString);
  }
  this.setLoading = function() {
    this.dishesResultsTable.empty();
    this.dishesResultsTable.append("<h3>Searching..</h3>");
  }
  this.setError = function() {
    this.dishesResultsTable.empty();
    this.dishesResultsTable.append("<h3>Error.. Please check your internet connection.</h3>");
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
      this.setError();
    }
    else if (component == "dishes") {
      this.populateTable(obj);
    }
  }
  this.container = container;
  this.dishesResultsTable = $("#dishesResultsTable");

  // Add itself as listener
  model.addObserver(this);

  // Finally, populate the dishes table
  model.getAllDishes("starter");
}
