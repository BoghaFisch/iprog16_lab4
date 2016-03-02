var DinnerSummaryView = function (container, model) {

  this.populate = function() {
    var dsView = $("#dinnerSummaryView");

    this.container.empty();

    // Append top navigation banner
    this.container.append("<div class='row myDinnerBanner'><div class='col-md-6'><h3>My Dinner: "+model.getNumberOfGuests()
      +" people</h3></div><div class='col-md-6'><button type='submit' class='btn btn-default pull-right backToEditButton' id='sBackToEdit'>Go back and edit dinner</button></div></div>");

    // Get menu
    var menu = model.getFullMenu();
    var menuTableString = "<table id='dinnerSummaryTable'><tr><td class='col-md-2'></td>";

    // Append dish-figures, captions and prices
    for (var i = 0; i < menu.length; i++) {
      if (menu[i] != null) {
        menuTableString += "<td class='col-md-2'><figure class='dishSummaryFigure'><img class='dishSummaryImage' src='"+menu[i].ImageURL
          +"'><figcaption style='text-align:center;' class='dishName'>"+menu[i].Title+"</figcaption><figcaption class='dishPrice' style='text-align:right;'>"+
          model.getDishPrice(menu[i])+" SEK</figcaption></figure></td>";
      }
      else {
        menuTableString += "<td class='col-md-2'><figure class='dishSummaryFigure'><img class='dishSummaryImage' src='images/noimage.jpg'><figcaption style='text-align:center;' class='dishName'>"
          +"None selected</figcaption><figcaption class='dishPrice' style='text-align:right;'>0 SEK</figcaption></figure></td>";
      }
    }

    // Append dishes total price
    menuTableString += "<td class='col-md-2' id='priceSummary'><p>Total: <br />"+model.getTotalMenuPrice()+" SEK</p></td></tr></table>";

    this.container.append(menuTableString);
    this.container.append("<hr class='breakLine'>");
    this.container.append("<div id='printButtonDiv'><button type='submit' class='btn btn-default' id='printRecipeButton'>Print Full Recipe</button></div>");
  }

  // Shows view
  this.show = function() {
    // Show container
    container.show();
  }

  // hides view
  this.hide = function() {
    container.hide();
  }

  this.update = function(component, obj) {
    if (component == "menu" || component == "guests")
      this.populate();
  }
  // The container
  this.container = container;

  // Initialize table by populating it
  this.populate();

  model.addObserver(this);
}
