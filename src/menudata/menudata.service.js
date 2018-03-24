(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)

MenuDataService.$inject = ['$http','$q']
function MenuDataService($http,$q) {
  var service = this;
  var ApiBasePath = "https://davids-restaurant.herokuapp.com";
  service.getAllCategories = function () {
    var service = this;
    var promise = $http({
        method: "GET",
        url: (ApiBasePath +"/categories.json")
      }).then(function (result) {  
        return result.data;
      });
    return promise;
  };

   service.getItemsForCategory = function (categoryShortName) {
    var service = this;
    var promise = $http({
        method: "GET",
        url: (ApiBasePath +"/menu_items.json"),
        params: {
          category: categoryShortName
        }
      }).then(function (result) {
        console.log(result);
        return result.data.menu_items;
      });
      return promise;
  };
}

})();