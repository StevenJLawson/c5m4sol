(function(){
'use strict';
angular.module('MenuApp')
.controller('ItemsController',ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items){
	var itemsCtrl = this;
	itemsCtrl.items = items;
	console.log("in items controller");
	console.log(itemsCtrl.items)
}

})();