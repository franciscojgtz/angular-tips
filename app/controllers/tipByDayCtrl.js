app.controller('tipByDayCtrl', function ($scope, $rootScope, $routeParams, $location, $http, $modal, $filter, Data) {
	var today = new Date();
	$scope.currentDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
	$scope.selectedDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
	$scope.tip = {date:$scope.selectedDate,tip:'',tipout:'',sales:'',hoursworked:'',hourlypay:'',userid:''};
	
	$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    };
	
	$scope.getTipByDate = function () {
		Data.get('tipByDate').then(function(data){
			$scope.todayTips = data.data;
			Data.toast(data);
		});
	};
	
	var sessionUser = {"userid": $rootScope.uid};
	
	$scope.getTips = function(){
		Data.post('tips', sessionUser).then(function (results) {
			Data.toast(results);
				console.log(results);
				if (results.status == "success") {
					$scope.tips = results.data;
					//console.log("success");//Added by FG
					$location.path('home');
				}
		});
	};
	
	$scope.getTips();
	
});