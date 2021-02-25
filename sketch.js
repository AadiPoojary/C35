//creating a variable circle
var circle;
var database;
var position;

function setup(){

    //creating a database
    database = firebase.database();
    
    //creating a canvas
    createCanvas(500,500);
    //creating a sprite circle
    circle = createSprite(250,250,10,10);
    //changing the circle color to red
    circle.shapeColor = "red";

    
    //('ball/position')
    //.ref : refer to a particular location
    var circlePosition = database.ref('ball/position');
    //.on is a listener which keeps listening to the changes in the database
    circlePosition.on("value", readPosition, showError);


}

function draw(){
    //clear screen and gives a background color
    background("white");

    //can move the ball only when the position is defined
    if(position !== undefined)
    
    //to move the circle in all directions using arrow keys
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//the write part of the database, to update values in database
function writePosition(x,y){
    //.set is used set a value in the database
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}

//the read part of the database, to read the updated values
function readPosition(data){
    position = data.val();
    circle.x = position.x;
    circle.y = position.y;
}

function showError(){
    console.log("it shows error in the database");
}