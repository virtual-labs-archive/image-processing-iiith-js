function myFunction(imgs) {

var expandImg = document.getElementById("expandedImg");
var expandIPImg = document.getElementById("ip");
expandImg.src = imgs.src;
expandIPImg.src = imgs.src;
expandImg.parentElement.style.display = "block";
expandIPImg.parentElement.style.display = "block";
$("#ioHolder").hide();

}
function showDiv() {
document.getElementById('imageGrid').style.display = 'block';
}

function hideIg() {
document.getElementById('imageGrid').style.display = 'none';
}

function hideInst() {
document.getElementById('instructionCanvas').style.display = 'none';
}

function showInst1() {
document.getElementById('instructionCanvas2').style.display = 'block';
}

var canvas = document.getElementById('instructionCanvas');
var ctx = canvas.getContext('2d');
canvas.style.display = 'block';
canvas.style.padding.top = "1px";
canvas.style.padding.left= "1px";
canvas.style.border= "dashed grey 1px";
canvas.position = "relative";
canvas.height = 50;
ctx.fillStyle = "#c2c2c2";
ctx.font = "13px Georgia";
ctx.position = "relative";
ctx.top = canvas.height/2;
ctx.fillText("Select appropriate parameters and click on 'Run'.", 10, 25);

var canvas1 = document.getElementById('instructionCanvas2');
var ctx1 = canvas1.getContext('2d');
canvas1.style.display = "none";
canvas1.style.padding.top = "1px";
canvas1.style.padding.left= "1px";
canvas1.style.border= "dashed grey 1px";
canvas1.position = "relative";
canvas1.height = 50;
ctx1.fillStyle = "#c2c2c2";
ctx1.font = "13px Georgia";
ctx1.position = "relative";
ctx1.top = canvas.height/2;
ctx1.fillText("Note down the results.", 10, 25);

var c = document.getElementById("inputCanvas");
c.style.display = 'none' 
c.style.border = "solid red 2px";
c.style.position = "absolute";
c.style.left = "400px";
c.style.top = "70px";
c.style.width = "600px";
c.style.height = "700px";



$(document).ready(function() {
	$("#Processing").click(function() {
		if(!document.getElementById('hsi').checked && !document.getElementById('cmy').checked && !document.getElementById('rgb').checked ){alert("Please Select the Parameters")}
		else if(document.getElementById('hsi').checked){ $("#applyParam").show(); $('.HSI').show(); $('.CMY').hide();$('.RGB').hide(); $("#ioImages").hide();}
		else if(document.getElementById('cmy').checked){ $("#applyParam").show(); $('.CMY').show();$('.HSI').hide(); $('.RGB').hide(); $("#ioImages").hide();}
		else if(document.getElementById('rgb').checked){ $("#applyParam").show(); $('.RGB').show();$('.CMY').hide();$('.HSI').hide();$("#ioImages").hide();}
		$("#ioHolder").show();
		$("#ioImages").hide();
		$("#linear").show();
		$("#histogram").show();

});
});


$(document).ready(function() {
	$('#colorSpace').click(function() {
		$("#ioHolder").hide();
		$('#applyParam').hide();
		$("#ioImages").show();
		$("#linear").hide();
		$("#histogram").hide();
		$("#linearfunction").hide();
		$('#graph').hide();
});
});

$(document).ready(function() {
	$('#selectImg').click(function() {
		$("#ioHolder").hide();
		$('#applyParam').hide();
		$("#ioImages").show();
});
});

var canvas2 = document.getElementById("finalInput");
var ctx2 = canvas2.getContext("2d");
canvas2.style.border = "solid blue 3px";
canvas2.style.width = "150px";
canvas2.style.height = "150px";
canvas2.style.position = "relative";
canvas2.style.left = "550px";
canvas2.style.top = "130px";


var canvas3 = document.getElementById("finalOutput");
var ctx3 = canvas3.getContext("2d");
canvas3.style.border = "solid blue 3px";
canvas3.style.width = "150px";
canvas3.style.height = "150px";
canvas3.style.position = "relative";
canvas3.style.left = "450px";
canvas3.style.top = "130px";


document.getElementById("run").onclick = function() {

	var c3 = document.getElementById("redCanvas");
	var ctx3 = c3.getContext("2d");
	var img = document.getElementById("expandedImg");
	ctx3.drawImage(img, 0, 0);
	var imgData = ctx3.getImageData(0, 0, c3.width, c3.height);
	// invert colors
	var i;
	for (i = 0; i < imgData.data.length; i += 4) {
	imgData.data[i] = 255
	}
	ctx3.putImageData(imgData, 0,0);

	var c4 = document.getElementById("greenCanvas");
	var ctx4 = c4.getContext("2d");
	var img1 = document.getElementById("expandedImg");
	ctx4.drawImage(img1, 0, 0);
	var imgData1 = ctx4.getImageData(0, 0, c4.width, c4.height);
	// invert colors
	var i;
	for (i = 0; i < imgData1.data.length; i += 4) {
	imgData1.data[i + 1] = 255
	}
	ctx4.putImageData(imgData1, 0,0);

	var c5 = document.getElementById("blueCanvas");
	var ctx5 = c5.getContext("2d");
	var img2 = document.getElementById("expandedImg");
	ctx5.drawImage(img2, 0, 0);
	var imgData2 = ctx5.getImageData(0, 0, c5.width, c5.height);
	// invert colors
	var i;
	for (i = 0; i < imgData2.data.length; i += 4) {
	imgData2.data[i + 2] = 255
	}
	ctx5.putImageData(imgData2, 0,0);


	/*var c6 = document.getElementById("finalOutput");
	var ctx6 = c6.getContext("2d");
	var img6 = document.getElementById("expandedImg");
	ctx6.drawImage(img6, 0, 0);
	var imgData6 = ctx6.getImageData(0, 0, c6.width, c6.height);
	var i;
	if(slider2.value<0) slider2.value = -1 * slider2.value;
	for (i = 0; i < imgData6.data.length; i += 4) {
	imgData6.data[i] = slider2.value;
	}
	ctx6.putImageData(imgData6, 0,0);*/
};


var slider = document.getElementById("myRange");
var output = document.getElementById("slope");
output.innerHTML = slider.value;
slider.oninput = function() {
	//reloadDiv();
  output.innerHTML = this.value;
  document.getElementById("eqnslope").innerHTML = slider.value + " r + " + slider2.value;
   // drawGraph(slider.value,slider2.value);
    

}

var slider2 = document.getElementById("myOffsetRange");
var output2 = document.getElementById("offset");
output2.innerHTML = slider2.value; 

slider2.oninput = function() {
	//reloadDiv();
  output2.innerHTML = this.value;
  document.getElementById("eqnslope").innerHTML = slider.value + " r + " + slider2.value;
 // drawGraph(slider.value,slider2.value);
  
}


$(document).ready(function() {
	$("#linear").click(function(){
		$("#linearfunction").show();
		//$("#graph").show();
	});
});

/*function reloadDiv()
{ 
    $( "#graph" ).load(window.location.href + "#graph" );
}

function drawGraph(m, c) {

	var graphs = document.getElementById("graph");
	graphs.style.width = "225px";
	graphs.style.height = "225px"
	var graphctx = graphs.getContext('2d');

	var x_coordinate = 225-c/m;
	var y_coordinate = 225-c;

	graphctx.beginPath();

	graphctx.moveTo(x_coordinate, 0);
	graphctx.lineTo(0, y_coordinate );
	graphctx.strokeStyle = "white";
	graphctx.stroke();
}*/
$(document).ready(function() {
	$("#run").click(function(){
var c6 = document.getElementById("finalOutput");
	var ctx6 = c6.getContext("2d");
	var img6 = document.getElementById("expandedImg");
	ctx6.drawImage(img6, 0, 0);
	var imgData6 = ctx6.getImageData(0, 0, c6.width, c6.height);
	//ctx6.putImageData(imgData6, 0,0);
	if(document.getElementById('hsi').checked) {
			if(document.getElementById('hcr').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
					for (i = 0; i < imgData6.data.length; i += 4) {
					imgData6.data[i] = slider2.value;
					}
					ctx6.putImageData(imgData6, 0,0);
			}
			if(document.getElementById('smg').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
				for (i = 0; i < imgData6.data.length; i += 4) {
				imgData6.data[i] = slider2.value;
				}
				ctx6.putImageData(imgData6, 0,0);
			}
			if(document.getElementById('iyb').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
				for (i = 0; i < imgData6.data.length; i += 4) {
				imgData6.data[i] = slider2.value;
				}	
				ctx6.putImageData(imgData6, 0,0);
			}

			}




	else if(document.getElementById('cmy').checked) {
			if(document.getElementById('hcr').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
					for (i = 0; i < imgData6.data.length; i += 4) {
					imgData6.data[i] = 1- slider2.value;
					}
					ctx6.putImageData(imgData6, 0,0);
			}
			if(document.getElementById('smg').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
				for (i = 0; i < imgData6.data.length; i += 4) {
				imgData6.data[i + 1] = 1 - slider2.value;
				}
				//imgData6.data[i + 1] = 1 - imgData6.data[i + 1];
				ctx6.putImageData(imgData6, 0,0);
			}
			if(document.getElementById('iyb').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
				for (i = 0; i < imgData6.data.length; i += 4) {
				imgData6.data[i + 2] = 1 - slider2.value;
				}	
				//imgData6.data[i + 2] = 1 - imgData6.data[i + 2];
				ctx6.putImageData(imgData6, 0,0);
			}
	}
	else if(document.getElementById('rgb').checked) {
			if(document.getElementById('hcr').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
					for (i = 0; i < imgData6.data.length; i += 4) {
					imgData6.data[i] = slider2.value;
					}
					ctx6.putImageData(imgData6, 0,0);
			}
			if(document.getElementById('smg').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
				for (i = 0; i < imgData6.data.length; i += 4) {
				imgData6.data[i + 1] = slider2.value;
				}
				ctx6.putImageData(imgData6, 0,0);
			}
			if(document.getElementById('iyb').checked) {
				var i;
				if(slider2.value<0) slider2.value = -1 * slider2.value;
				for (i = 0; i < imgData6.data.length; i += 4) {
				imgData6.data[i + 2] = slider2.value;
				}	
				ctx6.putImageData(imgData6, 0,0);
			}
			
	}
	});
});
