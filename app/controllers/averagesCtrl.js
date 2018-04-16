app.controller('averagesCtrl', function ($scope, $rootScope, $routeParams, $location, $http, $modal, $filter, Data, Tips) {
	
	$scope.currentDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
	$scope.currentMonth = $filter("date")(Date.now(), 'MM');
	$scope.tips = [];
	$scope.averages = [];
	$scope.totals = [];
	
	Tips.getTips().then(function(data){
		/*$scope.tips = data;
		$scope.tips = $filter('orderBy')(data, 'date', true);

		var totalTips = 0;
		var totalTipsThisYear = 0;
		angular.forEach(data, function(value, key) {
			
			//total amount of tips obtained
			totalTips +=value.tip;console.log(totalTips);

			var todayDate = new Date($scope.currentDate);//console.log(todayDate);
			var inputDate = new Date(value.date);//console.log(inputDate);
			//myDate.setDate(myDate.getDate()+2);
			//$scope.selectedDate = $filter("date")(myDate, 'yyyy-MM-dd');
			if(todayDate.getDate() >= (inputDate.getDate() - 7))
			{
				console.log(todayDate.getDate());
				console.log(inputDate.getDate() - 7);
				console.log(value.date);
			}
			var month;
			var year;
			var month = $filter("date")(value.date, 'MM');
			var year = $filter("date")(value.date, 'yyyy');
			//console.log(year);
			
		});
		$scope.totals.push({latestTip : $scope.tips[0] });
		$scope.totals.push({totalTips :  totalTips});
		//console.log('totalTips : ' + totalTips);
		//console.log($scope.totals[0].totalTips);*/

	});

	
});