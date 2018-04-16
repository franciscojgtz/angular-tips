//this code was found on the website
//this helps stop the flash when trying 
//to access the dashboard
app.factory("checkAuth", function(Data){
	return function (deferred) {
		Data.get('session').then(function (results) {	
			if (results.uid) {
				deferred.resolve('complete: loggedin');
			} else {
				deferred.reject('incomplete: not loggedin');
			}
		})
	}
});

app.factory("checkAuthNotLoggedIn", function(Data){
	return function (deferred) {
		Data.get('session').then(function (results) {	
			if (results.uid) {		
				deferred.reject('incomplete: not loggedin');
			} else {
				deferred.resolve('complete: loggedin');
			}
		})
	}
});