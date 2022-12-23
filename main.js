img = "";
objects = [];
status="";
human = "";

function preload(){
    alert = createAudio("alert_alert.mp3");
    found = createAudio("found.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide(); 
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"; 
}



function modelLoaded(){
    console.log("Model is loaded");
    status = true;
    
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}


function draw(){
    
    image(camera, 0, 0, 380, 380);
    
    
   
   
    if(status != ""){
        
        r =  random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(camera, gotResult);
        for(i=0; i <objects.length; i++){
            human = objects[i].label;
        if(human!="person"){
            found.stop();
            alert.play();
            alert.loop();
        }else{
            alert.stop()
            found.play();
            found.loop();
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Baby Found!";
        }
            
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%" , objects[i].x +15, objects[i].y-15);

            noFill();

            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}