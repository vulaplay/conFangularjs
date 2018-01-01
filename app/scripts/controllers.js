'use strict';

angular.module('confusionApp')

.controller('MenuController',['$scope','menuFactory', 
    function($scope,menuFactory) {
  //controller names also start with capital letter

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.showMenu = false;
  $scope.message = "Loading...";

  $scope.dishes = menuFactory.getDishes().query(
    function(response){
      $scope.dishes = response;
      $scope.showMenu = true;
    },
    function(response){
      $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
    }
  ); 


  //$scope.dishes = dishes;
  //no longer needed with scope as attached to scope above

  $scope.select = function(setTab) {
    $scope.tab = setTab;
    
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };

 /*$scope.isSelected = function (tab){
      if (tab = $scope.tab){
          return true;
      } else {
          return false;
      }
  } my attempt*/

   $scope.isSelected = function(checkTab){
      return ($scope.tab === checkTab);
    //triple equals is strict equality, checks values as well as type
  };

  $scope.toggleDetails = function(){
    $scope.showDetails = !$scope.showDetails;
  };

  

}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                       agree:false, email:"", datetime:""};

    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
   
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
    
    
    $scope.message = "Loading...";
    //also accessable to feebackcontroller


}]) 


.controller('FeedbackController', ['$scope','feedbackService', function($scope,feedbackService) {

  $scope.showFeedback = true;

  $scope.sendFeedback = function() {
    console.log($scope.feedback);
    if ($scope.feedback.agree && 
      ($scope.feedback.mychannel == "")&& 
      !$scope.feedback.mychannel) {
          $scope.invalidChannelSelection = true;
          console.log('incorrect');
    } else {
      $scope.invalidChannelSelection = false;

      $scope.feedback.datetime = new Date();
      
      //ajax call to server
      feedbackService.submitFeedback().save($scope.feedback,
          function(response){
            $scope.feedback = {mychannel:"", firstName:"", lastName:"",agree:false, email:"",datetime:""};
            $scope.feedback.mychannel="";

            $scope.feedbackForm.$setPristine();    
            console.log($scope.feedback);
          },
          function(response){
            $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
            $scope.showFeedback = false;
          }
        ); 
    }
  };
}])

//state params provided by ui-router or $stateProvider to pass paramaters?
.controller('DishDetailController',['$scope','$stateParams','menuFactory', function($scope,$stateParams,menuFactory) {

  
  $scope.showDish = false;
  $scope.message = "Loading...";

  //var dish = menuFactory.getDish(3);
  $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
    function(response){
      $scope.dish = response;
      $scope.showDish = true;
    },
    function(response){
      $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
    }
  );

  /* .then(
    function(response){

      $scope.dish = response.data;
      $scope.showDish = true;
      console.log(response);
    },
    function(response){
      $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
    }
  ); */
  
  $scope.comment = {rating:5,comment:"",author:"",date:""};
  
  $scope.submitComment = function() {
    
      $scope.comment.date = new Date();

      //$scope.addNewComment()
      $scope.dish.comments.push($scope.comment);
      menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
     console.log($scope.dish.comments);

      $scope.comment = {rating:"",author:"",comment:"",date:""};
      $scope.comment.rating = 5;

      $scope.commentsForm.$setPristine();
      console.log($scope.comment);
  };
}])

  .controller('IndexController',['$scope','$stateParams','menuFactory','corporateFactory', function($scope,$stateParams,menuFactory,corporateFactory) {

    
    $scope.showHomeDish = false;
    $scope.showHomeExec = false;
    $scope.showHomePromo = false;

    $scope.message = "Loading...";
    
    $scope.homeDish = menuFactory.getDishes().get({id:0})
      .$promise.then(
        function(response){
          $scope.homeDish = response;
          $scope.showHomeDish = true;
        },
        function(response){
          $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
        }
      )
    ;
    /* .then(
      function(response){
        $scope.homeDish = response.data;
        $scope.showHomeDish = true;
      },
      function(response){
        $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
      }
    ); */

    //var homePromo = menuFactory.getPromotion(0); 

    $scope.homePromo = menuFactory.getPromotions().get({id:0})
      .$promise.then(
        function(response){
          $scope.homePromo = response;
          $scope.showHomePromo = true;
        },
        function(response){
          $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
        }
      );
    
    //$scope.exec = corporateFactory.getLeader(3);

    $scope.exec = corporateFactory.getLeaders().get({id:3})
      .$promise.then(
        function(response){
          $scope.exec = response;
          $scope.showHomeExec = true;
        },
        function(response){
          $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
        }
      );
    //need corp
  
  }])

  .controller('AboutController',['$scope','corporateFactory', function($scope,corporateFactory) {
    
    //$scope.execs = corporateFactory.getLeaders();
    $scope.showExecs = false;
    $scope.message = "Loading...";

    $scope.execs = corporateFactory.getLeaders().query(
        function(response){
          $scope.execs = response;
          $scope.showExecs = true;
        },
        function(response){
          $scope.message = "Dafuq! There's a problem... it's this: "+response.status+" "+response.statusText;
        }
      );

  
  }])

;