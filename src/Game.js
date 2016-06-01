$( document ).ready(function() {
    console.log( "ready!" );
    
    var game = new Game();
    game.start();
});

/** 
 * Create a new Game.
 */
var Game = function() {
    var _this = this;
    
    // TODO: ships[] instead of hardcoded tie
    this.ships = []
    
    this.tieFighter1;
    this.moveTemplate = null;
    
    this.selectedShip;
    
    // listeners
    
    // add a template to the board when the selected dial value changes
    $("#selectedDirection, #selectedDistance").on('DOMSubtreeModified', function () {
        // add a template to the board based on what's selected
        if($('#selectedDirection').text() && $('#selectedDistance').text()) {
            _this.addTemplateToBoard();
        }
    });
    
    $('#moveOK').on('click', function(){
        console.log("moveOK");
        // TODO: log term, move 'selectedTie' instead of just moving tie1
        _this.moveTieWithTemplate();
    });
    
    $('#rotate').on('click', function(){
        console.log("rotate");
        // TODO: log term, move 'selectedTie' instead of just moving tie1
        _this.tieFighter1.turn(90);
    });
}

Game.prototype.start = function() {
    console.log("start");
    this.initialize();
}

Game.prototype.initialize = function() {
    console.log("initialize");
    
    // add the first tie to the board
    var tie1 = new Ship("tie-fo-fighter", "tie1");
    tie1.addToBoard(500, 850);
    
    var tie2 = new Ship("tie-fo-fighter", "tie2");
    tie2.addToBoard(200, 850);
    
    this.ships.push(tie1);
    this.ships.push(tie2);
    
    this.tieFighter1 = tie1;
}

Game.prototype.addTemplateToBoard = function() {
    var _this = this;
    
    // determine the selected ship
    $.each(_this.ships, function(index, element) {
        if(element.isSelected) {
            _this.selectedShip = element;
            //alert("SELECTED: " + _this.selectedShip.shipName);
        }
    });
    
    // TODO: these should be set on the dial on the ship object
    var movementTemplateVal = $('#selectedDirection').text() + "-" + $('#selectedDistance').text();
    console.log("templateVal: " + movementTemplateVal);
        
    // if there's already a template out there, remove it
    if(_this.moveTemplate != null) {
        _this.moveTemplate.removeFromBoard();
        _this.moveTemplate = null;
    }
        
    _this.moveTemplate = new MoveTemplate(movementTemplateVal);
    _this.moveTemplate.addToBoard(_this.selectedShip);
}

// TODO: this method needs to be on TieFighter.js
Game.prototype.moveTieWithTemplate = function() {
    var _this = this;
    //alert("selected: " + _this.selectedShip.shipName);
    // move the selectedShip
    _this.selectedShip.moveWithTemplate(_this.moveTemplate);
    
    // clear the dial badges and remove the template
    _this.selectedShip.dial.clearSelectedValues();
    _this.moveTemplate.removeFromBoard();
    _this.moveTemplate = null;
}
