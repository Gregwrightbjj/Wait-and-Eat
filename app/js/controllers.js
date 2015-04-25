'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('LandingPageController', [function() {

	}])
//WaitList Controller
	.controller('WaitListController', ["$scope","partyService","textMessageService", "authService", function($scope, partyService, textMessageService, authService) {
		//Bind users parties to $scope.parties
		authService.getCurrentUser().then(function(user){
			if (user){
				$scope.parties = partyService.getPartiesByUserId(user.id);
			};
		})
		
		//Object to store data from the waitlist form.
		$scope.newParty = {
			name: "",
			phone: "",
			size: "",
			done: false,
			notified: "No"
		};

		//Function to send a text message to a party.
		$scope.saveParty = function(){
			partyService.saveParty($scope.newParty, $scope.currentUser.id)
			//blanks the input fields
			$scope.newParty = {
			name: "",
			phone: "",
			size: "",
			done: false,
			notified: "No"
			};
		};
		//Function to send a text message to a party.
		$scope.sendTextMessage = function(party){
			textMessageService.sendTextMessage(party, $scope.currentUser.id);
		};

	}])
//Auth Controller	
	.controller('AuthController', ["$scope","authService", function($scope, authService){
		
		//Object bound to inputs on the register and login pages
		$scope.user = {email: "", password:""};
		
		//Method to register a new user using the authService
		$scope.register = function(){
			authService.register($scope.user);
		};
		//Method to log in a user using the authService
		$scope.login = function(){
			authService.login($scope.user);
		};

		//Method to log out a user using the authService
		$scope.logout = function(){
			authService.logout();
		};
		
	}])
	//Carousel
	.controller('CarouselDemoCtrl', [ "$scope",function ($scope) {
		
  $scope.myInterval = 5000;
  $scope.slides = [
    {
      image: "http://www.buffalo.edu/content/dam/www/news/imported/hires/O'Leary-Khan-AmburApp.jpg",
      title: "Ditch the clipboard",
      text: "Use our simple app to manage your waiting list from your PC, tablet, or phone."
    },
    {
      image: 'http://www.ipadenclosures.com/php-oak/themes/global/admin_images/trade_show/photo-1-e1400864804203-2.jpg',
      title: "Get your Voice back",
      text: "No more expensive 'Table Trackers'. You can text a party with just a tap."
    },
    {
      image: 'http://i.huffpost.com/gen/1811836/images/o-CELL-PHONE-facebook.jpg',
      title: "Customers will love you",
      text: "Now they can go to the bathroom, car, etc. and still know their table is ready."
    }
  ];

	}])
	//Tablecontroller
		.controller('TableController', ["$scope","partyService","textMessageService", "authService", function($scope, partyService, textMessageService, authService) {
		//Bind users parties to $scope.parties
		authService.getCurrentUser().then(function(user){
			if (user){
				$scope.parties = partyService.getPartiesByUserId(user.id);
			};
		})
		
		//Object to store data from the waitlist form.
		$scope.newTable = {
			name: "",
			phone: "",
			size: "",
			done: false,
			notified: "No"
		};

		//Function to send a text message to a party.
		$scope.saveTable = function(){
			partyService.saveParty($scope.newParty, $scope.currentUser.id)
			//blanks the input fields
			$scope.newTable = {
			name: "",
			phone: "",
			size: "",
			done: false,
			notified: "No"
			};
		};
		//Function to send a text message to a party.
		$scope.sendTextMessage = function(party){
			textMessageService.sendTextMessage(party, $scope.currentUser.id);
		};

	}]);
	