app.controller('addTipCtrl', function ($scope, $rootScope, $routeParams, $location, $http, $filter, Data) {
	//console.log($rootScope.uid);//Added by FG
	var today = new Date();
	$scope.currentDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
	
	$scope.addtip = {date:$scope.currentDate,tip:'',tipout:'',sales:'',hoursworked:'',hourlypay:'',userid:''};
	//$scope.addtip.date = $scope.currentDate;
	
	$scope.addTip = function (tip) {
		//console.log(tip);
		tip.userid = $rootScope.uid;
		Data.post('addTip', tip).then(function (results) {
					Data.toast(results);
					//console.log(results);
					if (results.status == "success") {
						//console.log("success");//Added by FG
						$location.path('tips');
					}
				});
	};
	
	$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    };
});