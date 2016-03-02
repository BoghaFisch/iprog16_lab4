var DinnerInstructionsViewController = function(app, view, model ) {
  view.container.on("click", "#iBackToEdit", function() {
    app.showView("selectDish");
  });
}
