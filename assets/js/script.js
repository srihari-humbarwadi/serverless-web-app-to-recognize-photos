function postimage(image){
	console.log('Making rekognition call');
	var API = "https://0peryay68h.execute-api.ap-northeast-1.amazonaws.com/predict/imagerek"
	imgdata = {
		"img" : image
	}
	$.ajax({
		type: "POST",
		url: API,
		crossDomain: true,
		data: JSON.stringify(imgdata),
		contentType: "application/json",
		dataType: "json",
		success: function(data, status){
			console.log(JSON.stringify(data) + "<br>" + status)
			var agerange = data[0].AgeRange,smile = data[0].Smile,eyeglasses = data[0].Eyeglasses,sunglasses = data[0].Sunglasses,gender = data[0].Gender,beard = data[0].Beard,mustache = data[0].Mustache,eyesopen = data[0].EyesOpen,mouthopen = data[0].MouthOpen,emotions = data[0].Emotions;
			// document.getElementById('api-res').innerHTML = JSON.stringify(data);
			// document.getElementById('api-res').innerHTML = JSON.stringify(agerange)+'<br>'+JSON.stringify(smile)+'<br>'+JSON.stringify(eyeglasses)+'<br>'+JSON.stringify(sunglasses)+'<br>'+JSON.stringify(gender)+'<br>'+JSON.stringify(beard)+'<br>'+JSON.stringify(mustache)+'<br>'+JSON.stringify(eyesopen)+'<br>'+JSON.stringify(mouthopen)+'<br>'+JSON.stringify(emotions);
			var age_res = agerange.Low +"-"+agerange.High;
			var smile_res = smile.Value==true?"are smiling":"are not smiling";
			var eyeglasses_res = eyeglasses.Value==true?"are wearing spectacles":"are not wearing any spectacles";
			var sunglasses_res = sunglasses.Value==true?"are wearing sunglasses":"are not wearing any sunglasses";
			var gender_res = gender.Value;
			var beard_res = beard.Value==true?"have a beard":"donot have a beard";
			var mustache_res = mustache.Value==true?"have a mustache":"donot have a mustache";
			var eyesopen_res = eyesopen.Value==true?"are open":"are not open";
			var mouthopen_res = mouthopen.Value==true?"is open":" is not open";

			result = "You are a " + gender_res + " and your age is in the range " + age_res + ".<br>" + "I see that your eyes " + eyesopen_res;
			if(sunglasses.Value == false && eyeglasses.Value == false){
				result += " and you are not wearing any glasses."
			}
			else if(eyeglasses.Value == true){
				result += " and you are wearning spectacles."
			}
			else if(sunglasses.Value == true){
				result += " and you are wearing some cool shades."
			}
			if(gender.Value == "Male"){
				if(beard.Value == true){
					result += " Ah thats a nice beard."
				}
				else if(mustache.Value == true){
					result += " I see a mustache!<br>"
				}
				else{
					result += " Are you even a man? where's your facial hair??.<br>"
				}
			}
			result += " You are " + smile_res + "<br>";
			if(mouthopen.Value == true)
			result += " You could just close your mouth and look more presentable!!<br>";
			document.getElementById('api-res').innerHTML = result;
			$('.modal').modal('open');
			}
	});
}

function upload(img){
   	var reader = new FileReader();
   	reader.readAsDataURL(img);
   	reader.onload = function () {
    	encodedimg = reader.result;
    	encodedimg = encodedimg.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    	//console.log(encodedimg);
    	postimage(encodedimg);
   		};
   	reader.onerror = function (error) {
     	console.log('Error: ', error);
   		};
}

document.getElementById('button').addEventListener('click', function() {
  var files = document.getElementById('img').files;
  if (files.length > 0) {
	upload(files[0]);
  }
});

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("img").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("preview-image").src = oFREvent.target.result;
    };
};

$(document).ready(function(){
$('.materialboxed').materialbox();
$('.modal').modal({
	dismissible: true,
	opacity: .5 
	});
});

