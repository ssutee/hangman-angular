if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}

function include(arr,obj) {
  return (arr.indexOf(obj) != -1);
}

function HangmanCtrl($scope) {
  $scope.lifeTimes = 0;
  $scope.inputText = "";
  $scope.displayStarsText = "";
  $scope.isReady = false;
  
  $scope.chooseWordRandomly = function() {
    var words = [
    "AGILE",
    "SCRUM",
    "ITERATION",
    "PRODUCT", 
    "OWNER",
    "MASTER",
    "SCRUM", 
    "TEAM",
    "USER", 
    "STORY",
    "SPRINT",
    "PRODUCT", 
    "BACKLOG",
    "RELEASE",
    "SPRINT",
    "TIMEBOXING",
    "BURN", 
    "DOWN", 
    "CHART",
    "TEST",
    "PAIR",
    "STANDUP", 
    "MEETING",
    "ALLIANCE",
    "RETROSPECTIVE"
    ];
    return words[Math.floor((Math.random()*words.length)+1)].toLowerCase();
  }
  
  $scope.setNewGame = function(word) {
    $scope.lifeTimes = 5;
    $scope.correctCharacters = [];
    $scope.targetWord = word;
    $scope.displayStarsText = $scope.displayStars();
    $scope.isReady = true;
  }
  
  $scope.displayStars = function() {
    if (!$scope.targetWord) {
      return '';
    }
    var result = '';
    var index;
    for(index=0; index < $scope.targetWord.length; ++index) {
      if (include($scope.correctCharacters, $scope.targetWord[index])) {
        result += $scope.targetWord[index];
      } else {
        result += '*';
      }
    }
    return result;
  }
  
  $scope.enterCharacter = function(c) {
    var index, found = false;
    for (index=0; index < $scope.targetWord.length; ++index) {
      if ($scope.targetWord[index] == c.toLowerCase()) {
        $scope.correctCharacters.push(c.toLowerCase());
        found = true
        break;
      }
    }
    if (!found) {
      $scope.lifeTimes -= 1;
    }
    $scope.displayStarsText = $scope.displayStars();
    $scope.inputText = "";
  }
  
  $scope.isWin = function() {
    if ($scope.lifeTimes > 0 && $scope.displayStars() == $scope.targetWord) {
      return true;
    }
    return false;
  }
  
  $scope.isLose = function() {
    if ($scope.lifeTimes < 1 && $scope.isReady) {
      return true;
    }
    return false;
  }
}
