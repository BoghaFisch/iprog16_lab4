//HomeView Object constructor
var HomeView = function (container, model) {


	this.show = function() {

		// change css
		$("#pageBody").css('background-image', 'url(images/peopleEating.jpg)');
		$("#pageHeader").css('background-color', 'rgba(233,206,132, 0.8)');

		// Show container
		container.show();
	}
	this.hide = function() {
		$("#pageBody").css('background-image', 'url()');
		$("#pageHeader").css('background-color', '#FFF');

		// hide container
		container.hide();
	}
	// The button to press to create a new dinner
	this.newDinnerButton = $("#newDinnerButton");
	
	this.container = container;
}
