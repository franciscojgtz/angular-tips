app.controller('tipsCtrl', function ($scope, $rootScope, $routeParams, $location, $http, $modal, $filter, Data) {
	
	$scope.tips = [];
	var today = new Date();
	$scope.currentDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
	$scope.selectedDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
	$scope.selectedMonth = $filter("date")(Date.now(), 'yyyy-MM');
	$scope.tip = {date:$scope.currentDate,tip:'',tipout:'',sales:'',hoursworked:'',hourlypay:'',userid:''};
	var sessionUser = {"userid": $rootScope.uid};
	$scope.user = $rootScope.uid;

	$scope.getTips = function(){
		Data.post('tips', sessionUser).then(function (results) {
			Data.toast(results);
				console.log(results);
				if (results.status == "success") {
					$scope.tips = results.data;
					console.log($scope.tips);//Added by FG
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
	
	$scope.getTips();	
				
	$scope.deleteTip = function(tip){
        if(confirm("Are you sure to remove the tip")){
            Data.delete("tips/"+tip.id).then(function(result){
				Data.toast(result);
                $scope.tips = _.without($scope.tips, _.findWhere($scope.tips, {id:tip.id}));
            });
        }
    };
	
	$scope.open = function (p,size) {console.log(p);
        var modalInstance = $modal.open({
          templateUrl: 'partials/edit_tip.html',
          controller: 'tipEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
		
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.tips.push(selectedObject);
                $scope.tips = $filter('orderBy')($scope.tips, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.tip = selectedObject.tip;
                p.sales = selectedObject.sales;
                p.hoursworked = selectedObject.hoursworked;
				p.hourlypay = selectedObject.hourlypay;
				p.tipout= selectedObject.tipout;
				p.date= selectedObject.date;
            }
        });
    };
	
	$scope.previousDay = function(selectedDate){
		var myDate = new Date(selectedDate);//date decreases by one
		$scope.selectedDate = $filter("date")(myDate, 'yyyy-MM-dd');
	};
	
	$scope.nextDay = function(selectedDate){
		var myDate = new Date(selectedDate);//date decreases by one
		myDate.setDate(myDate.getDate()+2);
		$scope.selectedDate = $filter("date")(myDate, 'yyyy-MM-dd');
	};
	
});