objects = [];
status = "";

function preload(){

}
function setup(){
canvas = createCanvas(350, 350);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}
function draw(){
image(video, 0, 0, 350, 350);
if (status != ""){
    objectDetector.detect(video, gotResult);
   
    for (i =0; i < objects.length; i++){
        fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      var thing = document.getElementById("object_name").value;
        if (objects[i].label == thing){
            
            document.getElementById("status").innerHTML = "Status : Objects Detected!";
            document.getElementById("number_of_objects").innerHTML = "The object you wanted is detected! ";
    speak1();
            
           }
           else {
            document.getElementById("status").innerHTML = "Status : Objects Detected!";
            document.getElementById("number_of_objects").innerHTML = "The object you wanted is not detected! "; 
           speak2();
        }
    }
        }
       
}
function speak1(){
    var synth = window.speechSynthesis;

    var utterThis1 = new SpeechSynthesisUtterance("The object that you wanted is detected");

    synth.speak(utterThis1);

    
}
function speak2(){
    var synth = window.speechSynthesis;

    var utterThis2 = new SpeechSynthesisUtterance("The object that you wanted is not detected");

    synth.speak(utterThis2);

}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Objects Detecting";
}
function modelLoaded(){
 console.log("Model is successfully Loaded!!");
 status = true;
}

function gotResult(error, results){
    if (error){
    console.log(error);
    }
    console.log(results);
    objects = results;
    }
    