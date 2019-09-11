var grid = document.querySelector(".grid");
    var pop = document.querySelector(".pop");
    var closeButton = document.querySelector(".close-button");
  
   function toggleGrid() {
	   if(grid){
       grid.classList.toggle("show-grid");}
   }
function showgrid(){
var grid = document.querySelector(".grid");
    var pop = document.querySelector(".pop");
    var closeButton = document.querySelector(".close-button");
  
   function toggleGrid() {
       grid.classList.toggle("show-grid");
   }
   function windowOnClick(event) {
       if (event.target === grid) {
           toggleGrid();
       }
   }
   pop.addEventListener("click", toggleGrid);
   closeButton.addEventListener("click", toggleGrid());   
   window.addEventListener("click", windowOnClick);
}
function myfunc(e) {
 
var id= e[3];
 
  
  document.getElementById("input").innerHTML ="<canvas id='canvas' style='border: 1px solid; width:300px; height:300px;'></canvas>" ;
  var canvas=document.getElementById('canvas');
  var can=document.getElementById('out');
canvas.width=canvas.scrollWidth;
can.width=can.scrollWidth;
canvas.height=canvas.scrollHeight;
can.height=can.scrollHeight;
var ctx=canvas.getContext('2d');
var context=can.getContext('2d');
var image= new Image();
image.onload=function(){
ctx.drawImage(image,0,0,canvas.width,canvas.height);
context.drawImage(image,0,0,can.width,can.height);	
}
image.src= "images/p"+id+".jpg";
  document.getElementById("text").innerHTML="Select appropriate parameters and click on 'Run'."
  toggleGrid();
 
 }
 var z=0;

   function mynon()
{	z=2;
	document.getElementById("linear_box").innerHTML = "<p style='color:white;font-family:courier;'>Log function<br><br>f(r):<br> <span id='logc'></span> xlog10(1+r)</p><div class='slidecontainer'><p>c:</p><input type='range' min='0' max='254' value='50' class='slider' id='log'></div>";
var slider3 = document.getElementById("log");
var output3 = document.getElementById("logc");
slider3.oninput = function() {
  output3.innerHTML = this.value;
  
  
}
}
   function myclip()
{
  z=3;
document.getElementById("linear_box").innerHTML="<p style='color:white;font-family:courier;'>Clipper</p><p style='color:white;font-family:courier;'>Window</p><p style='color:white;font-family:courier;'>&nbsp&nbsp&nbsp&nbsp&nbspStart:<input type='number' id='clips' value='0' style='width:3em' > &nbsp&nbsp&nbsp End:<input type='number' id='clipe' style='width:3em' value='255'> </p><div class='slidecontainer'><p style='color:white;font-family:courier;'>slope(m): <span id='logm'></span></p><input type='range' min='0.00' max='1.00' value='0.5' step='0.01'  class='slider' id='slidm'></div>";
var slider3 = document.getElementById("slidm");
var output3 = document.getElementById("logm");
slider3.oninput = function() {
  output3.innerHTML =this.value;
  }
  
  
  
}

	function mywindow()
	{
		z=4;
		document.getElementById("linear_box").innerHTML="<p style='color:white; font-family:courier;'>Windowing</p><p style='color:white;font-family:courier;'>Window</p><p style='color:white;font-family:courier;'>&nbsp&nbsp&nbsp&nbsp&nbspStart:<input type='number' id='windows' value='0' style='width:3em' >  &nbsp&nbsp&nbsp End:<input type='number' id='windowe' style='width:3em' value='255'> </p><div class='slidecontainer'><p style='color:white; font-family:courier;'>slope(m): <span id='winm'></span></p><input type='range' min='0.00' max='1.00' value='0.5' step='0.01'  class='slider' id='winslidm'></div>  "
var slider3 = document.getElementById("winslidm");
var output3 = document.getElementById("winm");
slider3.oninput = function() {
  output3.innerHTML =this.value;
  }		
		
		
		
		
	}

	
  function mylin()
{	z=1;
	document.getElementById("linear_box").innerHTML = "<p style='color:white;font-family:courier;'>f(r): <span id='idm'></span>r+<span id='idc'></span></p><div class='slidecontainer'><p style='color:white;font-family:courier;'>slope(m):</p><input type='range' min='-57.3' max='57.3' value='50' class='slider' id='m'><br><p style='color:white;font-family:courier;'>offset(c):</p><input type='range' min='-255' max='255' value='50' class='slider' id='c'>";
var slider1 = document.getElementById("m");

var output1 = document.getElementById("idm");
var slider2 = document.getElementById("c");
var output2 = document.getElementById("idc");
output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;
slider1.oninput = function() {
  output1.innerHTML = this.value;
  
  
}
slider2.oninput = function() {
  output2.innerHTML = this.value;	
}
}
  function run()
{

	
var canvas=document.getElementById('canvas');
if(canvas && canvas.getContext("2d"))
{ 
var context= canvas.getContext("2d");
for(var i=0; i< 10; i++) {
  var myimg = "img" + i;
  var imgsrc=document.getElementById('myimg')
}
var Img=context.getImageData(0,0,canvas.width,canvas.height);
var pixel=Img.data;
var init=1;
while(init<context.canvas.height){
	switch(z){
	case 1:{
	var slope=parseFloat(document.getElementById("idm").innerHTML);
	var offset=parseFloat(document.getElementById("idc").innerHTML);
	drawlin(slope,offset);
	for(var j=0;j<5;j++){
	var row=(init+j)*context.canvas.width*4;
	for(var i=0;i<context.canvas.width*4;i+=4){
	
	
		pixel[row+i]=(slope*pixel[row+i])+offset;
		pixel[row+i+1]=(slope*pixel[row+i+1])+offset;
		pixel[row+i+2]=(slope*pixel[row+i+2])+offset;
		
		
	}
		
		
	}
	init+=5;
	}break;
	case 2:{
	var log=parseFloat(document.getElementById("logc").innerHTML);
	
	drawnon(log);
	for(var j=0;j<5;j++){
	var row=(init+j)*context.canvas.width*4;
	for(var i=0;i<context.canvas.width*4;i+=4){
	
	
		pixel[row+i]=log*Math.log10(1+pixel[row+i]);
		
		pixel[row+i+1]=log*Math.log10(1+pixel[row+i+1]);
		pixel[row+i+2]=log*Math.log10(1+pixel[row+i+2]);
		
		
	}
		
		
	}
	init+=5;
	}break;
	case 3:{
	var clope=parseFloat(document.getElementById("logm").innerHTML)
	var clstrt=parseInt(document.getElementById("clips").value);
	
	var clend=parseInt(document.getElementById("clipe").value);
	
	drawclip(clope,clstrt,clend);
	
for(var j=0;j<5;j++){
	var row=(init+j)*context.canvas.width*4;
	for(var i=0;i<context.canvas.width*4;i+=4){
	
	for(var c=0;c<3;c++){
		 if( pixel[row+i+c]<clstrt)
		 	pixel[row+i+c]=0;
		else if (clstrt<=pixel[row+i+c] && pixel[row+i+c]<=clend)
			pixel[row+i+c]=clope*pixel[row+i+c];
		else if( pixel[row+i+c]>clend)
			pixel[row+i+c]=255 ;
		}
				
	}
		
	}	
	init+=5;
	}break;
		case 4:{
	var winde=parseFloat(document.getElementById("winm").innerHTML)
	var winds=parseInt(document.getElementById("windows").value);
	
	var wend=parseInt(document.getElementById("windowe").value);
	drawindow(winde,winds,wend);
	
	
for(var j=0;j<5;j++){
	var row=(init+j)*context.canvas.width*4;
	for(var i=0;i<context.canvas.width*4;i+=4){
	
	for(var c=0;c<3;c++){
		 if( pixel[row+i+c]<winds)
		 	pixel[row+i+c]=0;
		else if (winds<=pixel[row+i+c] && pixel[row+i+c]<=wend)
			pixel[row+i+c]=clope*pixel[row+i+c];
		else if( pixel[row+i+c]>wend)
			pixel[row+i+c]=0 ;
		}
				
	}
		
	}	
	init+=5;
	}
	
	}
	}
	document.getElementById("text").innerHTML="Click on 'Reset' to start from the beginning."
	}
	

	

var output=document.getElementById('out');
var ctx=output.getContext("2d");
context.putImageData(Img,0,0);
	


}

function drawlin(m,co){
	var c=document.getElementById("graph");
	var ctx=c.getContext('2d');
	ctx.clearRect(0,0,c.width,c.height);
	var y=co;


	ctx.moveTo(0,255-co);
	ctx.strokeStyle = 'blue'
	ctx.stroke();
		ctx.beginPath();
	for(x=1;x<256;x++)
	{	
		y=(m*x)+co;
		
		ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();
		
		
	}
	

}

function drawnon(log){
	
		var c=document.getElementById("graph");
	var ctx=c.getContext('2d');
	ctx.clearRect(0,0,c.width,c.height);
	
	
	ctx.beginPath();
ctx.moveTo(0, 255);
	
	for(x=1;x<256;x++)
	{	
		y=log * (Math.log(1+x)/Math.LN10);
		
		ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();
		
		
	}
	
	
}
function drawclip(s,a,b){
	var c=document.getElementById("graph");
	var ctx=c.getContext('2d');
	ctx.clearRect(0,0,c.width,c.height);
	ctx.beginPath();
ctx.moveTo(0, 255);
	for(x=1;x<256;x++)
	{	if(x<a){
		 	y=0;	ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();}
		else if (a<=x && x<=b){
			y=s*x;	ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();}
		else if( x>b){
			y=255 ;	ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();}
		
		
	
		
		
	}
	

}
function drawindow(s,a,b){
	var c=document.getElementById("graph");
	var ctx=c.getContext('2d');
	ctx.clearRect(0,0,c.width,c.height);
	ctx.beginPath();
ctx.moveTo(0, 255);
	for(x=1;x<256;x++)
	{	if(x<a){
		 	y=0;	ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();}
		else if (a<=x && x<=b){
			y=s*x;	ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();}
		else if( x>b){
			y=0 ;	ctx.lineTo(x,255-y);
	ctx.strokeStyle = 'blue'
	ctx.stroke();}
		
		
	
		
		
	}
	

}