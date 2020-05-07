(function () {
'use strict';
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = [$scope];
function LunchCheckController ($scope)  {
    $scope.str = "";
    $scope.msg = "";
    $scope.dispMsg = function () {
        $scope.msg =check($scope.str);
    };
}
function check(string) {
    var temp = string.split(',');
    var temp2 = string.split('');
    if(temp.length === 1 && temp2.length === 0 )
        return "Please enter data first";
    else if( temp.length <= 3)
        return "Enjoy!";
    else 
        return "Too much!";       
};
})();