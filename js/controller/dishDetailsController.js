var DishDetailsController = function(app, view, model ) {
  view.container.on("click", "#backToSelectButton", function() {
    model.setDetailedDish(null);
    app.showView("selectDish");
  });
  view.container.on("click", "#confirmDishButton", function() {
    model.addDishToMenu(model.getDetailedDish().RecipeID, model.getDetailedDishType());
    model.setDetailedDish(null);
    app.showView("selectDish", true);
  });
}
