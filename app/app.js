// JavaScript source code
var app = angular.module('tipTrackerApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'toaster']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
		when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl',
			resolve:['checkAuthNotLoggedIn', '$q', function(checkAuthNotLoggedIn, $q){
					var deferred = $q.defer(); 
					checkAuthNotLoggedIn(deferred);
					return deferred.promise;
					}]
        })
			.when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl',
			resolve:['checkAuthNotLoggedIn', '$q', function(checkAuthNotLoggedIn, $q){
					var deferred = $q.defer(); 
					checkAuthNotLoggedIn(deferred);
					return deferred.promise;
					}]	
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl',
				resolve:['checkAuthNotLoggedIn', '$q', function(checkAuthNotLoggedIn, $q){
					var deferred = $q.defer(); 
					checkAuthNotLoggedIn(deferred);
					return deferred.promise;
					}]
            })
			.when('/home', {
            title: 'home',
            templateUrl: 'partials/home.html',
            controller: 'tipsCtrl',
				resolve:['checkAuth', '$q', function(checkAuth, $q){//added from website
				//console.log($q);//Added by FG
					var deferred = $q.defer(); //console.log(deferred);//Added by FG
					checkAuth(deferred);//console.log(deferred);
					return deferred.promise;
					}]
        })
			.when('/addtip', {
            title: 'Add Tip',
            templateUrl: 'partials/add_tip.html',
            controller: 'addTipCtrl',
				resolve:['checkAuth', '$q', function(checkAuth, $q){//added from website
				//console.log($q);//Added by FG
					var deferred = $q.defer(); //console.log(deferred);//Added by FG
					checkAuth(deferred);//console.log(deferred);
					return deferred.promise;
					}]
        })
			.when('/tips', {
                title: 'Tips',
                templateUrl: 'partials/tips.html',
                controller: 'tipsCtrl',
				resolve:['checkAuth', '$q', function(checkAuth, $q){//added from website
				//console.log($q);//Added by FG
					var deferred = $q.defer(); //console.log(deferred);//Added by FG
					checkAuth(deferred);//console.log(deferred);
					return deferred.promise;
					}]
            })
			.when('/monthlytips', {
                title: 'Monthly Tips',
                templateUrl: 'partials/monthlytips.html',
                controller: 'tipsCtrl',
				resolve:['checkAuth', '$q', function(checkAuth, $q){//added from website
				//console.log($q);//Added by FG
					var deferred = $q.defer(); //console.log(deferred);//Added by FG
					checkAuth(deferred);//console.log(deferred);
					return deferred.promise;
					}]
            })
			.when('/edittip', {
                title: 'Tips',
                templateUrl: 'partials/edit_tip.html',
                controller: '',
				resolve:['checkAuth', '$q', function(checkAuth, $q){//added from website
				//console.log($q);//Added by FG
					var deferred = $q.defer(); //console.log(deferred);//Added by FG
					checkAuth(deferred);//console.log(deferred);
					return deferred.promise;
					}]
            })
			.when('/averages', {
                title: 'Averages',
                templateUrl: 'partials/averages.html',
                controller: 'averagesCtrl',
				resolve:['checkAuth', '$q', function(checkAuth, $q){//added from website
				//console.log($q);//Added by FG
					var deferred = $q.defer(); //console.log(deferred);//Added by FG
					checkAuth(deferred);//console.log(deferred);
					return deferred.promise;
					}]
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
				resolve:['checkAuthNotLoggedIn', '$q', function(checkAuthNotLoggedIn, $q){
					var deferred = $q.defer(); 
					checkAuthNotLoggedIn(deferred);
					return deferred.promise;
					}],
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
  
  .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;

			//added by FG
			$rootScope.uid = "";
			$rootScope.name = "";
			$rootScope.email = "";
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
					
					var url = $location.url();
					if (url == '/tips') {
						$location.path(url);//added by FG
                    } else if(url == '/addtip'){
						$location.path(url == '/addtip');//added by FG
					} else if(url == '/averages'){
						$location.path(url == '/averages');//added by FG
					} else if(url == '/home'){
						$location.path(url);//added by FG
					} else {
                        $location.path("/home");
                    }
					
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });