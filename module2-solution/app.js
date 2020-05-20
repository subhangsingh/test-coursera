(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);      
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var first = this;
        first.items = ShoppingListCheckOffService.getItemsToBuy();
        first.errMsg = "Everything is bought!";
        first.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }
        first.check = function() {
            if(first.items.length == 0)
                return true;
            else 
                return false;    
        }       
    } 

    AlreadyBoughtController.$inject['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list = this;
        list.items = ShoppingListCheckOffService.getBoughtItems();
        list.errMsg = "Nothing bought yet.";
        list.check = function() {
            if(list.items.length == 0)
                return true;
            else 
                return false;    
        }
    }
    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [
            {
                name : "Cookies",
                quantity : 5
            },
            {
                name : "Chips" ,
                quantity : 10
            },
            {
                name : "Soft Drinks",
                quantity : 5
            },
            {
                name : "Beer",
                quantity : 10
            },
            {
                name : "Munchies",
                quantity : 10
            }
        ];
        var boughtItems = [];

        service.buyItem = function(index){
            boughtItems.push(toBuyItems[index]);
            toBuyItems.splice(index, 1);
        }
        service.getItemsToBuy = function(){
            return toBuyItems;
        }
        service.getBoughtItems = function(){
            return boughtItems;
        }
    }
    })();