app.controller('tipEditCtrl', function ($scope, $rootScope, $routeParams, $location, $http, $filter, $modalInstance, item, Data) {
	
	
	
  $scope.tip = angular.copy(item);

        //console.log($scope.tip);
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Tip' : 'Add Tip';
        $scope.buttonText = (item.id > 0) ? 'Update Tip' : 'Add New Tip';
		
        var original = item;
        $scope.isClean = function() {//console.log(angular.equals(original, $scope.product));
            return angular.equals(original, $scope.tip);
        }
        $scope.saveTip = function (tip) {//console.log(tip);
            //tip.uid = $tip.uid;//Not sure what this is for. I'll figure it out later
            if(tip.id > 0){//console.log(tip);
                Data.put('tips/'+tip.id, tip).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(tip);
                        x.save = 'update';
                        $modalInstance.close(x);
						
                    }else{
                        console.log(result);
                    }
                });
            }else{
                //product.status = 'Active';
				tip.userid = $rootScope.uid;
                Data.post('addTip', tip).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(tip);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});