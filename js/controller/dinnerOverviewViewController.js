var DinnerOverviewViewController = function(app, view, model ) {
  view.numberOfGuestsInput.change(function() {
    model.setNumberOfGuests(view.numberOfGuestsInput.val());
  });
  view.confirmButton.click(function(){
    model.setDetailedDish(null);
    app.showView("dinnerSummary");
  });
  view.container.on("click", "#rmStarter", function() {
    model.removeDishFromMenu(model.getFullMenu()[0].RecipeID);
  });
  view.container.on("click", "#rmMain", function() {
    model.removeDishFromMenu(model.getFullMenu()[1].RecipeID);
  });
  view.container.on("click", "#rmDessert", function() {
    model.removeDishFromMenu(model.getFullMenu()[2].RecipeID);
  });
}
