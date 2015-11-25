//! Author: Martin K. Schröder <mkschreder.uk@gmail.com>
JUCI.app
.directive("juciInputIpv4Address", function () {
	return {
		templateUrl: "/widgets/juci-input-ipv4-address.html",
		controller: "juciInputIpv4Address",
		restrict: 'E',
		scope: {
				ngModel: "="
		},
		require: "ngModel"
	};
})
.controller("juciInputIpv4Address", function($scope, $attrs, $parse){
	$scope.data = { parts: [ "0", "0", "0", "0" ] };
		
	var ngModel = $parse($attrs.ngModel);
	
	// extract model into the parts
	$scope.$watch("ngModel", function(value){
		if(!value) return; 
		var parts = value.split("."); 
		parts.forEach(function(v, i){
			$scope.data.parts[i] = v; 
		}); 
	},true); 
	
	// reassemble model when parts change 
	$scope.updateModel = function() {
		console.log("Assemble parts: "+$scope.data.parts); 
		var ipaddr = Object.keys($scope.data.parts).map(function(x){ return $scope.data.parts[x] }).join("."); 
		if($scope.ngModel != ipaddr) ngModel.assign($scope.$parent, ipaddr); 
	};

	$scope.onPaste = function(ev){
		var ip = ev.originalEvent.clipboardData.getData('text/plain'); 
		if(!ip) return; 
		var parts = ip.split("."); 
		if(parts.length != 4) return; 
		parts.forEach(function(v, i){ $scope.data.parts[i] = v; }); 
		$scope.updateModel(); 
	}
}); 
