song1 = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, moddelLoaded);
    poseNet.on('pose', gotPoses);
}
function moddelLoaded(){
    console.log("Posenet has been initialized sucessfully!")
}
function gotPoses(results){
    if(results.length > 0){
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    if(scoreLeftWrist > 1){
        song1.stop()
        song2.stop()
        song1.play()
    }
    if(scoreRightWrist > 1){
        song1.stop()
        song2.stop()
        song2.play()
    } 
    
}
