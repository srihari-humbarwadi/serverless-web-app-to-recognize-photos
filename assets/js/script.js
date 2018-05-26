function postimage(image){
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
			document.write(JSON.stringify(data) + "<br>" + status)
			}
	});
}

function upload(img){
   	var reader = new FileReader();
   	reader.readAsDataURL(img);
   	reader.onload = function () {
    	encodedimg = reader.result;
    	encodedimg = encodedimg.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    	console.log(encodedimg);
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
});