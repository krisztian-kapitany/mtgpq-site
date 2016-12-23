angular.module('sortApp', [])

.controller('mainController', function($scope, $http) {
  $scope.sortType     = 'title'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchEndpoint   = '';     // set the default search/filter term
  
  $scope.activeCard = ""
  $scope.cards = [];
  
  $http.get('./card-db.json').success(function(data){
        $scope.cards = data;
  });

  $scope.toggleActive = function(id) {
    $scope.activeCard = $scope.activeCard == id ? "" : id ;
  }

});