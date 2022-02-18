music1="";
music2="";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
scoreleftWrist=0
scorerightWrist=0
song1status=""
song2status=""
function preload()
{
    music1=loadSound("music.mp3");
    music2=loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    

}
function draw()
{
    image(video, 0, 0, 600, 500);
    song1status=music1.isPlaying()
    song2status=music2.isPlaying()
    fill("#FF0000");
    stroke("#FF0000");



    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        music1.stop()
       if(song2status==false)
       {
           music2.play()
           document.getElementById("song").innerHTML="playing peter pan song"
       }
    }
    if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        music2.stop()
       if(song1status==false)
       {
           music1.play()
           document.getElementById("song").innerHTML="playing Harry Potter song"
       }
    }

}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
scoreleftWrist = results[0].pose.keypoints[9].score;
scorerightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist ="+ leftWristX +"leftWristY = " +leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist ="+ rightWristX +"rightWristY = " +rightWristY);
    }
}