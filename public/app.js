angular.module('sortApp', [])

.controller('mainController', function($scope, $http) {
  $scope.sortType     = 'deck'; // set the default sort type
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
  
  $scope.prettyCard = function(card) {
    return JSON.stringify(card, undefined, 4);
  }

  $scope.saveToPc = function (filename) {

    var data = $scope.cards

    if (!filename) {
      filename = 'download.json';
    }

    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 2);
    }

    var blob = new Blob([data], {type: 'text/json'});

    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else{
        var e = document.createEvent('MouseEvents'),
            a = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
  };
  
  
});