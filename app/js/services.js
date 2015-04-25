'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.value('FIREBASE_URL', 'https://waitandeat-greg.firebaseio.com/')
//  or 
//.factory("FIREBASE_URL", function(){
// 	return "https://waitandeat-greg.firebaseio.com/"
// });

.factory("dataService", function($firebase, FIREBASE_URL){
	var dataRef = new Firebase(FIREBASE_URL);
	var fireData = $firebase(dataRef);

	return fireData
	
})
.factory("partyService", function(dataService){
	// var partiesRef = new Firebase(FIREBASE_URL + "parties");
	// var parties = $firebase(partiesRef);
	var users = dataService.$child("users");

	var partyServiceObject = {
		saveParty:function(party, userId){
			//date created
			party.dateCreated = new Date();
			users.$child(userId).$child("parties").$add(party);
		},
		getPartiesByUserId:function(userId){
			return users.$child(userId).$child("parties");
		}
	};
	return partyServiceObject
})
.factory("textMessageService", function(partyService, dataService){
	// var textMessageRef = new Firebase(FIREBASE_URL + "textMessages");
	// var textMessages = $firebase(textMessageRef);
	
	var textMessages = dataService.$child("textMessages")

	var textMessageServiceObject= {
		sendTextMessage: function(party, userId){
			var newTextMessage = {
			phoneNumber: party.phone,
			size: party.size,
			name: party.name
			};
			
			textMessages.$add(newTextMessage);
			// party.notified = "Yes";
			// partyService.parties.$save(party.$id)
			partyService.getPartiesByUserId(userId).$child(party.$id).$update({notified: "Yes"});
		}
	};
	return textMessageServiceObject
	
})
.factory("authService", function($firebaseSimpleLogin, $location, FIREBASE_URL, $rootScope, dataService){
	//Doesnt change because off the $firebaseSimpleLogin
	var authRef = new Firebase(FIREBASE_URL);
	var auth = $firebaseSimpleLogin(authRef);
	var emails = dataService.$child("emails");
	
	var authServiceObject = {
		register: function(user){
			auth.$createUser(user.email, user.password).then(function(data){
				console.log("reg",data);
				authServiceObject.login(user, function(){
					emails.$add({email: user.email});
				});
			})
			//Sign up errors
			.catch(function(error) {
  				console.log("Error:", error);
  				$rootScope.error = error.toString();
				});
		},
		login: function(user, optionalCallback){
			auth.$login("password", user).then(function(data){
				console.log("log",data);
				if (optionalCallback) {
		            optionalCallback();  
		          };
				//Redirect users to waitlist page
				$location.path("/waitlist")
			})
		},
		logout: function(){
			auth.$logout()
			//Redirect users to Landing Page
			$location.path("/")
		},
		getCurrentUser: function(){
			return auth.$getCurrentUser();
		}
	};
	
	$rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
	//Save currentUser on our rootScope
	$rootScope.currentUser = user;
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
	$rootScope.currentUser = null;
	});
	
	return authServiceObject
});


