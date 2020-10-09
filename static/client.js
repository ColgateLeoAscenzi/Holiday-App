const socket = io();


var myUserNum = -1;
var myName = ""

socket.on("welcome", function(userNum){
    console.log("I am user number: "+userNum+", I guess...");
    myUserNum = userNum;

    myName = buildRandomName(userNum);
    socket.emit("hello", myName);
});

socket.on("new-user-join", function(playerCount){
    console.log("A new user joined. That makes "+playerCount+" of you.");
});

function buildRandomName(playerNum){
    let name = "";
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let bound = 10+Math.floor(Math.random()*playerNum);

    for(let i = 0; i < bound; i++){
        name+=letters[Math.floor(Math.random() * letters.length)];
    }

    return name;
}
