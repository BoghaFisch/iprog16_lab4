$(function() {

	window.app = App();
});

var App = function() {
	//We instantiate our model
	var model = new DinnerModel();

	// Create views
	var homeView = new HomeView($("#homeView"), model);
	var dinnerOverviewView = new DinnerOverviewView($("#dinnerOverview"), model);
	var selectDishView = new SelectDishView($("#selectDishView"), model);
	var dishDetailsView = new DishDetailsView($("#dishDetailsView"), model);
	var dinnerSummaryView = new DinnerSummaryView($("#dinnerSummaryView"), model);
	var dinnerInstructionsView = new DinnerInstructionsView($("#dinnerInstructionsView"), model);

	// Create controllers
	var homeViewController = new HomeViewController(this, homeView, model);
	var selectDishViewController = new SelectDishViewController(this, selectDishView, model);
	var dinnerOverviewViewController = new DinnerOverviewViewController(this, dinnerOverviewView, model);
	var dishDetailsController = new DishDetailsController(this, dishDetailsView, model);
	var dinnerSummaryViewController = new DinnerSummaryViewController(this, dinnerSummaryView, model);
	var dinnerInstructionsViewController = new DinnerInstructionsViewController(this, dinnerInstructionsView, model);

	// Hides all views
	this.hideAll = function() {
		homeView.hide();
		dinnerOverviewView.hide();
		selectDishView.hide();
		dishDetailsView.hide();
		dinnerSummaryView.hide();
		dinnerInstructionsView.hide();
	}
	// Call to show view
	this.showView = function(view, loading) {
		this.hideAll();
		if (view == "home") {
			homeView.show();
		}
		else if (view == "selectDish") {
			if (loading) {
				dinnerOverviewView.setLoading();
			}
			dinnerOverviewView.show();
			selectDishView.show();
		}
		else if (view == "dishDetails") {
			if (loading) {
				dinnerOverviewView.setLoading();
				dishDetailsView.setLoading();
			}
			dinnerOverviewView.show();
			dishDetailsView.show();
		}
		else if (view == "dinnerSummary") {
			dinnerSummaryView.show();
		}
		else if (view == "dinnerInstructions") {
			dinnerInstructionsView.show();
		}
	}
	this.hideAll();

	this.showView("selectDish");

}
