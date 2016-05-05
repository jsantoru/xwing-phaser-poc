var MoveTemplate = function() {
    // constructor
    this.x = 0;
    this.y = 0;
    
    // TODO: when to set? is this the right place to track?
    // basically the location where to set the ship at the end of this template
    this.destinationX = 0;
    this.destinationY = 0;
    
    this.imagePath = "img/move-templates/straight-2.png";
    
    // TODO: data object of move template configs
    // - template image
    // - height
    // - width
    // - rotation (for k turns)
    
    this.templateConfig = {
        "straight-2" : {
            imagePath: "img/move-templates/straight-2.png",
            height: 100,
            width: 25
        }
        // TODO: the other templates...
    }
    
}

MoveTemplate.prototype.addToBoard = function(templateId, x, y) {
    console.log("MoveTemplate.addToBoard(), templateId: " + templateId);
    
    // get the template config
    var templateConfig = this.templateConfig[templateId];
    console.log("templateConfig: " + JSON.stringify(templateConfig));
    
    // create the image from the config
    if(templateConfig) {
        console.log("setting template");
        $('#board').prepend('<div id="moveTemplateDiv" class="moveTemplateDiv">' + 
            '<img id="moveTemplate" class="moveTemplate" src="' + templateConfig.imagePath + '"/></img>');
        $('#moveTemplateDiv').height(templateConfig.height).width(templateConfig.width);
        
        // move this template to the correct location 
        // relative to the location of the ship and the template size
        var adjustedXY = this.determineAdjustedXY("up", templateConfig, x, y)

        this.move(adjustedXY.x, adjustedXY.y);
    }
}

MoveTemplate.prototype.determineAdjustedXY = function(direction, templateConfig, x, y) {
    var adjustedX = x + templateConfig.width/2;
    var adjustedY = y - templateConfig.height;
    
    return {
        x: adjustedX,
        y: adjustedY
    }
}

MoveTemplate.prototype.removeFromBoard = function() {
    console.log("MoveTemplate.removeFromBoard()");
    $("#moveTemplateDiv").remove();
}

MoveTemplate.prototype.move = function(x, y) {
    console.log("move()");
    
    this.x = x;
    this.y = y;
    
    var xPixels = x + "px";
    var yPixels = y + "px";
    
    $('#moveTemplateDiv').css("top", yPixels);
    $('#moveTemplateDiv').css("left", xPixels);
}
