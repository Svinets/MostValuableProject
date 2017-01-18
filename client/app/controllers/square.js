angular.module('draw.square', [])

.controller('squareController', function($scope, $location, $window, Squares) {
  $scope.message = 'Hello from the square page!';
  $scope.data = {};

  $scope.loadSquare = function() {
    $scope.data.URI = $window.localStorage.URI;
    Squares.getGuesses({
      _id: $window.localStorage.squareID
    }).then(function(square) {
      $scope.data.guesses = square.guesses.reverse();
    });
  }

  //posts their guess to the db
  //a list of guesses is built up
  //inside of each square's 'guesses' array
  $scope.takeAGuess = function() {
    //console.log($window.localStorage.squareID);
    //console.log($scope.guess);
    Squares.takeGuess({
      _id: $window.localStorage.squareID,
      guess: $window.localStorage.playerUserName + ' : ' + $scope.guess
    });

    //console.log($window.localStorage.squareID);
    Squares.getGuesses({
      _id: $window.localStorage.squareID
    }).then(function(square) {
      $scope.data.guesses = square.guesses.reverse();
      
    });
    $scope.guess = '';
  }

  //make a function where if the guess is correct,
  //the square is unplayable and the square's image
  //on the page is greyed out and covered with
  //text stating who won and what it is

  $scope.noClue = function() {
    $location.path('/squares');
  }
});