'use strict';

angular.module('confusionApp')

.controller('MenuController',['$scope','menuFactory', 
    function($scope,menuFactory) {
  //controller names also start with capital letter

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;

  $scope.dishes = menuFactory.getDishes();
  
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
                       agree:false, email:"" };

    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
   
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
    //also accessable to feebackcontroller

}]) 


.controller('FeedbackController', ['$scope', function($scope) {

  $scope.sendFeedback = function() {
      console.log($scope.feedback);
      if ($scope.feedback.agree && 
        ($scope.feedback.mychannel == "")&& 
        !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
      } else {
        $scope.invalidChannelSelection = false;

        //ajax call to server
        
        $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                           agree:false, email:"" };
        $scope.feedback.mychannel="";

        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
  };
}])

.controller('DishDetailController',['$scope','menuFactory', function($scope,menuFactory) {

  var dish = menuFactory.getDish(3);
  
  $scope.dish = dish;


  $scope.comment = {rating:"",comment:"",author:"",date:""};
  $scope.comment.rating = 5;
  
  $scope.submitComment = function() {
    
    $scope.comment.date = new Date();

    //$scope.addNewComment()
    $scope.dish.comments.push($scope.comment);
    
    console.log($scope.dish.comments);

    $scope.comment = {rating:"",author:"",comment:"",date:""};
    $scope.comment.rating = 5;

    $scope.commentsForm.$setPristine();
    console.log($scope.comment);
  };
}])

;