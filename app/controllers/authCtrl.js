app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
	//initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
	
    $scope.doLogin = function (user) {
		//console.log(user);//Added by FG
        Data.post('login', user).then(function (results) {console.log(results);
            Data.toast(results);
            if (results.status == "success") {
                $location.path('home');
            }
        });
    };
	
	$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    };
	
	$scope.signup = {email:'',password:'',name:''};
    $scope.signUp = function (user) { 
        Data.post('signUp', user).then(function (results) {console.log(results);
            Data.toast(results);
            if (results.status == "success") {
                $location.path('home');
            }
        });
    };
});