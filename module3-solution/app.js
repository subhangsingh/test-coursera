(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);    

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
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var list = this;
        list.searchTerm = "";
        list.errMsg = "";
        // list.found = [];

        list.getMatchedMenuItems = function(searchTerm){
            var promise = MenuSearchService.searchItems(searchTerm);
            promise.then(function(items){
                // console.log(list.searchTerm);
                // console.log(items);
                if(searchTerm!=="" && items.length>0){
                    list.found = items;
                    list.errMsg = "";
                }
                else{
                    list.errMsg = "Nothing found";
                    list.found = [];
                }    
                // console.log(list.found);    
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
        this.searchItems = function(searchTerm){
            return $http({
                method : 'GET',
                url : (ApiBasePath + "/menu_items.json")
            }).then(function(result){
                // console.log(result.data.menu_items);
                var items = [];
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