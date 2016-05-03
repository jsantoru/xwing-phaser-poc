$( document ).ready(function() {
    console.log( "ready!" );
    
    // helper function for rotation
    // TODO: move out
    jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
        return $(this);
    };
    
    var game = new Game();
    game.start();
});

/** 
 * Create a new Game.
 */
var Game = function() {
    var _this = this;
    this.tieFighter1;
    this.moveTemplate = null;
    
    // TODO: move out? they still need access to the tie in order to turn it
    // listeners
    $("#movementTemplate").change(function() {
        var movementTemplateVal = $("#movementTemplate").val() + "-" + $("#dialDistance").val();
        console.log("templateVal: " + movementTemplateVal);
        
        //_this.tieFighter1.turn(90);
        
        if(_this.moveTemplate != null) {
            _this.moveTemplate.removeFromBoard();
            _this.moveTemplate = null;
        }
        
        _this.moveTemplate = new MoveTemplate();
        _this.moveTemplate.addToBoard(movementTemplateVal, _this.tieFighter1.x, _this.tieFighter1.y);
    });

    $("#dialDistance").change(function() {
        var movementTemplateVal = $("#movementTemplate").val() + "-" + $("#dialDistance").val();
        console.log("templateVal: " + movementTemplateVal);
        
        _this.tieFighter1.turn(90);
    });
}

Game.prototype.start = function() {
    console.log("start");
    this.initialize();
}

Game.prototype.initialize = function() {
    console.log("initialize");
    
    // TODO: add the dial to the board, instead of in html?
    // TODO: have the tie have a dial?
    
    // add the first tie to the board
    var tie1 = new TieFighter();
    tie1.addToBoard(200, 900);
    
    this.tieFighter1 = tie1;
}
