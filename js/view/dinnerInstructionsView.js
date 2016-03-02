var DinnerInstructionsView = function (container, model) {

  this.populateTable = function() {
    this.container.empty();

    var menu = model.getFullMenu();

    // Append top navigation banner
    this.container.append("<div class='row myDinnerBanner'><div class='col-md-6'><h3>My Dinner: "+model.getNumberOfGuests()
      +" people</h3></div><div class='col-md-6'><button type='submit' class='btn btn-default pull-right backToEditButton' id='iBackToEdit'>Go back and edit dinner</button></div></div>");

    // Create preparations-list
    var ditString = "<table id='dinnerInstructionsTable'>";
    for (var i = 0; i < menu.length; i++) {
      if (menu[i] != null) {
        ditString += "<tr>";

        // Add image column
        ditString += "<td class='col-md-2 imageCol'><img class='instructionsImage' src='"+menu[i].ImageURL+"'></td>";

        // Add Dinner Description
        ditString += "<td class='col-md-4 desciptionCol'><h3>"+menu[i].Title+"</h3>"+menu[i].Description+"</td>";

        // Add preparations
        ditString += "<td class='col-md-6 preparationCol'><h4>Preparation</h4>"+menu[i].Instructions+"</td></tr>";
      }
    }

    // Close table
    ditString += "</table>";

    // Append html to container
    this.container.append(ditString);
  }
  this.setLoading = function() {
    container.empty();
  }

  // Shows view
  this.show = function() {

    // Show container
    container.show();
  }
  // Hides view
  this.hide = function() {
    container.hide();
  }
  this.update = function(component, obj) {
    if (component == "menu" || "guests")
      this.populateTable();
  }
  this.container = container;
  this.populateTable();
  this.backToEditButton = $("#iBackToEdit");
  model.addObserver(this);
}
