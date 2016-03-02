var SelectDishViewController = function(app, view, model ) {
  view.container.on("click", ".dishResultsImage", function(event) {
    var type = $("#selectType").val();
    var id = event.target.id;
    id = id.replace("dish", "");
    model.setDetailedDish(id, type);
    app.showView("dishDetails", true);
  });
  $('#selectType').on('change', function() {
    var filter = $("#searchBox").val();
    view.setLoading();
    if (filter != "")
      model.getAllDishes(this.value, filter);
    else {
      model.getAllDishes(this.value);
    }
  });
  $('#submitSearch').click(function(event) {
    event.preventDefault();
    var filter = $("#searchBox").val();
    var type = $("#selectType").val();
    view.setLoading();
    model.getAllDishes(type, filter);
  });
}
