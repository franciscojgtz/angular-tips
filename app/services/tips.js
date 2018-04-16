app.factory("Tips", function(Data, $rootScope){
	var sessionUser = {"userid": $rootScope.uid};
		
	return{
		getTips : function() {
			return Data.post('tips', sessionUser).then(function (results) {
				Data.toast(results);
				if (results.status == "success") {
					return results.data;
				}
			});
		}
	}

});
	
	