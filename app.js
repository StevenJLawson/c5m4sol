(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    restrict: "E",
    templateUrl: 'foundItems.html',
    controller: FoundItemsDirectiveController,
    bindToController: true,
    controllerAs: 'itemsFound',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
  };
  return ddo;
}

function FoundItemsDirectiveController(){
  var itemsFound = this;

  itemsFound.removeIt = function (index){
    console.log("REMOVE IT B "+index);
    itemsFound.onRemove({index: index});
  }

}


NarrowItDownController.$inject = ['$scope', '$element','MenuSearchService'];
function NarrowItDownController($scope, $element,MenuSearchService) {
  var $narrow = this;

 $narrow.searchTerm = '';

 $narrow.search = function(searchTerm){
   console.log("searching for "+searchTerm);
   if(searchTerm === ''){
      $narrow.foundItems = [];
      var warningElem = $element.find('div.error');
              warningElem.slideDown(200);
   }else{
     var warningElem = $element.find('div.error');
        warningElem.slideUp(200);
     var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
     promise.then(function (response){
       $narrow.foundItems = response;
     });
  }
 }


  $narrow.removeItem = function (itemIndex) {
    console.log("REMOVE IT A "+itemIndex);
    $narrow.foundItems.splice(itemIndex, 1);
  };
}




MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var found = [];

  var promise = service.getMatchedMenuItems

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath +"/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      found = result.data.menu_items;
      console.log(searchTerm);
      found =  found.filter(function (item){
        return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      console.log(found.length)
      return found
    });
    return response
  };

}


})();
