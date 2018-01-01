'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/") //if change sserver update this
        .service('menuFactory',['$resource','baseURL', function($resource,baseURL) {
    
                this.getDishes = function(){
                    
                    return $resource(baseURL+"dishes/:id",null,{'update':{method:'PUT'}});
                    
                };
    
/*                 this.getDish = function (index) {
                    
                    return $resource.get(baseURL+"dishes/"+index);
                }; */
    
                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotions = function(){
                    
                    //return promotions;
                    return $resource(baseURL+"promotions/:id",null,{'update':{method:'PUT'}});
                    
                };
                        
        }])

        .factory('corporateFactory',['$resource','baseURL',  function($resource,baseURL) {
    
            var corpfac = {};
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
			
/* 			corpfac.getLeaders = function(){
				
				return leadership;
			};
			
			corpfac.getLeader = function (index) {
				
				return leadership[index];
            }; */
            
            corpfac.getLeaders = function(){
                    
                return $resource(baseURL+"leadership/:id",null,{'update':{method:'PUT'}});
                
            };
			
			return corpfac;

    
    
        }])

        .service('feedbackService',['$resource','baseURL', function($resource,baseURL) {

            this.submitFeedback = function(){
                    
                return $resource(baseURL+"feedback/:id",null,{'save':{method:'POST'}});
                
            };

        }])

;
