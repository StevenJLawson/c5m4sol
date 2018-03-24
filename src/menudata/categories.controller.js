(function(){
'use strict';
angular.module('MenuApp')
.controller('CategoriesController',CategoriesController);

CategoriesController.$inject = ['MenuDataService','items'];
function CategoriesController(MenuDataService, items){
	var catCtrl = this;
	catCtrl.items = items;
	console.log(catCtrl.items);

}

})();