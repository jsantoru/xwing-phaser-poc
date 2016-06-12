var ActivationPanel = function() {
    var _this = this;
    
    // move handler
    $('#moveOK').on('click', function(){
        console.log("moveOK");
        window.game.selectedShip.moveWithTemplate(window.game.moveTemplate);
        _this.updateStateAfterMove();
    });
}

ActivationPanel.prototype.updateStateAfterMove = function() {
    // after moving the ship it should no longer be selected
    window.game.selectedShip.toggleSelect();
    
    // the ships dial vals should now be reset
    window.game.selectedShip.dial.direction = "";
    window.game.selectedShip.dial.distance = "";
    
    // remove the template
    window.game.moveTemplate.removeFromBoard();
}
