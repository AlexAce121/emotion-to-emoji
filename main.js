prediction_1 = "";
prediction_2 = "";

Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function Take_Snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="image" src="'+data_uri+'"/>';
});
}

console.log(ml5.version , "ml5.version");

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xg1ORMdvh/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    var Speak_Data_1 = "The First Prediction Is : " + prediction_1;
    var Speak_Data_2 = "The Second Prediction Is : " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(Speak_Data_1 + Speak_Data_2);
    synth.speak(utterThis);
}

function Check_Snapshot() {
    var img = document.getElementById("image");
    classifier.classify(img , Got_Result);
}

function Got_Result(error , result){
  if (error) {
      console.error(error);
  }  
  else{
     console.log(result);
     document.getElementById("result_emotion_name1").innerHTML = result[0].label;
     document.getElementById("result_emotion_name2").innerHTML = result[1].label;
     prediction_1 = result[0].label;
     prediction_2 = result[1].label;
     speak();
     if (result[0].label=="Happy") {
         document.getElementById("Update_emoji_1").innerHTML = "&#128522;"
     }

     if (result[0].label=="Sad") {
        document.getElementById("Update_emoji_1").innerHTML = "&#128532;"
    }

    if (result[0].label=="Surprised") {
        document.getElementById("Update_emoji_1").innerHTML = "&#128562;"
    }

    if (result[0].label=="Laughter") {
        document.getElementById("Update_emoji_1").innerHTML = "&#128512;"
    }

    if (result[0].label=="Angry") {
        document.getElementById("Update_emoji_1").innerHTML = "&#128545;"
    }

    if (result[1].label=="Happy") {
        document.getElementById("Update_emoji_2").innerHTML = "&#128522;"
    }

    if (result[1].label=="Sad") {
       document.getElementById("Update_emoji_2").innerHTML = "&#128532;"
   }

   if (result[1].label=="Surprised") {
       document.getElementById("Update_emoji_2").innerHTML = "&#128562;"
   }

   if (result[1].label=="Laughter") {
       document.getElementById("Update_emoji_2").innerHTML = "&#128512;"
   }

   if (result[1].label=="Angry") {
       document.getElementById("Update_emoji_2").innerHTML = "&#128545;"
   }

  }
}

    


