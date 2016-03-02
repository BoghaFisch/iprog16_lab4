var HomeViewController = function(app, view, model ) {

  // Switch to selectDishView
  view.newDinnerButton.click(function() {
    app.showView("selectDish");
  });
}
