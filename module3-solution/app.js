(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");    

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',  
            templateUrl : 'foundItems.html',
            scope : {
                foundItems : '<',
                onEmpty: '<',
                onRemove : '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };
        return ddo;
    }
    
    NarrowItDownController.$inject = ['MenuSearchService','ApiBasePath'];
    function NarrowItDownController(MenuSearchService){
        var list = this;
        list.searchTerm = "";
        list.errMsg = "";
        list.found = [];

        list.getMatchedMenuItems = function(){
            var promise = MenuSearchService.searchItems(list.searchTerm);
            promise.then(function(items){
                console.log(items);
                if(list.searchTerm!=="" && items.length>0)
                    list.found = items;
                else    
                    list.errMsg = "Nothing found";
                
                    console.log(list.found);    
            }).catch(function(error){
                list.errMsg = error.message;
            })
        }
        
        list.remove = function(index){
            list.found.splice(index,1);
        }
    };

    MenuSearchService.$inject = ['$http','ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var items = [];
        this.searchItems = function(searchTerm){
            return $http({
                method : 'GET',
                url : (ApiBasePath + "/menu_items.json")
            }).then(function(result){
                // console.log(result.data.menu_items);
                for(var i = 0; i<result.data.menu_items.length; i++){
                    var desc = result.data.menu_items[i].description;
                    // console.log(desc);
                    if(desc.toLowerCase().indexOf(searchTerm)!== -1){
                        items.push(result.data.menu_items[i]);
                    }
                }
                // console.log(items);
                return items;
            })    
        }
    };
    
    })();