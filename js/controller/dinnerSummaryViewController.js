var DinnerSummaryViewController = function(app, view, model ) {
  view.container.on("click", "#printRecipeButton", function() {
    app.showView("dinnerInstructions");
  });
  view.container.on("click", ".backToEditButton", function() {
    app.showView("selectDish");
  });
}
