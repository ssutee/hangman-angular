describe('Hangman', function() {
  var model;
  var controller;
  
  beforeEach(function() {
    model = {};
    controller = new HangmanCtrl(model);    
    model.setNewGame('test');
  });
  
  it ('should start with 5 life-times.', function() {
    expect(5).toBe(model.lifeTimes); 
  });
  
  it ('should display number of stars equal to length of the target word.', function() {
    expect(model.displayStars().length).toBe(model.targetWord.length);
  });
  
  it ('should stars have correct format.', function() {
    expect(model.displayStars()).toBe('****')
  });
  
  it ('should stars have correct format when user enters a correct character.', function() {
    model.enterCharacter('t');
    expect(model.displayStars()).toBe('t**t')    
  });
  
  it ('should decrease life-times if user enters an incorrect character.', function() {
    model.enterCharacter('x');
    expect(4).toBe(model.lifeTimes);
  });

  it ('should not decrease life-times if user enters an correct character.', function() {
    model.enterCharacter('e');
    expect(5).toBe(model.lifeTimes);
  });

  it ('should win if user enter an correct word by using less than 6 times.', function() {
    model.enterCharacter('t');
    model.enterCharacter('e');
    expect(model.displayStars()).toBe('te*t')
    model.enterCharacter('s');
    expect(true).toBe(model.isWin());
  });

  it ('should lose if user enter an incorrect character 6 times.', function() {
    model.enterCharacter('x');
    model.enterCharacter('u');
    model.enterCharacter('i');
    model.enterCharacter('o');
    model.enterCharacter('p');  
    model.enterCharacter('m');    
    expect(true).toBe(model.isLose());
  });

  it ('should have new word, empty correct character list, and 6 life-times after new game.', function() {
    model.enterCharacter('t');
    model.enterCharacter('x');    
    model.enterCharacter('e');
    expect(model.displayStars()).toBe('te*t')
    model.enterCharacter('s');
    expect(true).toBe(model.isWin());
    
    model.setNewGame('scrum');
    expect(5).toBe(model.lifeTimes);
    expect('scrum').toBe(model.targetWord);
    expect(0).toBe(model.correctCharacters.length);
  });
  
  it ('should not be ready if not setNewGame', function() {
    model = {};
    controller = new HangmanCtrl(model);    
    expect(false).toBe(model.isReady);
  });

  it ('should be ready if not setNewGame', function() {
    expect(true).toBe(model.isReady);
  });
  
});