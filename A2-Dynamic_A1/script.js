calcFinalGrades = function() {
	cE();
   var finalGrades = document.querySelectorAll("td:last-child");//final grades column
   var data = document.querySelectorAll("td:nth-child(n+3)");
   var fG = 0;//final grade row
   var numAssignment = (data.length-(finalGrades.length))/finalGrades.length;//amount of assignments
   var sum = 0;
	var dash = true;
/*	var dashes =0;
	 for(var value of data.values()){
    	if(value.innerHTML=="-"){
			dashes++;
		}
	 }*/
     for (i = 0; i <= data.length; i++) {
 	  if(numAssignment == 0){
   	  for(var value of finalGrades.values()){
            value.innerHTML="-";
            value.style.backgroundColor = "red";
            value.style.color = "white";
        }
     }else{
       	if ((i != 0) && (((i) % (numAssignment+1)) == numAssignment)){ ///modular arithmetic
         	  if(!dash){
					  finalGrades[fG].innerHTML = Math.round(sum / numAssignment);
         		passCheck(finalGrades, fG);
					  dash=true;
				  }else{
					  finalGrades[fG].innerHTML = "-";
					  finalGrades[fG].style.backgroundColor="white";
            finalGrades[fG].style.color="black";
				  }
				sum = 0;
				fG++;
				finalGrades[fG].innerHTML = 0;
       	}else{
            if (verifyInput(data, i)) {
				    sum += parseFloat(data[i].innerHTML);
					dash=false;
           	}
         }
     	 }
	}
}
cE = function(){//onkeyup caclFG is contradicting id and name input
	var numcols = document.querySelectorAll("th").length;
	var info = document.querySelectorAll("td:nth-last-child(n+2), th");
   for (var cell of info.values()) {
  		if(cell.innerHTML == ""){
			cell.innerHTML = "-";
		}
      cell.contentEditable = true;
  	}
}
emptyCell = function() {
    var cell = document.querySelector("td:focus");//selected cell
    if (cell.innerHTML.toString().includes('-')) {//if it is already null empty it to allow input
    	cell.innerHTML = null;
    }
  }
verifyInput = function(data, i) {
    if ((data[i].innerHTML >= 0) && (data[i].innerHTML <= 100) && (data[i].innerHTML != '')) {
      //data[i].style.backgroundColor = "white";
      return parseFloat(data[i].innerHTML);
    }else {
      //unSubCell(data, i);//default to unsubmitted assignment
     		data[i].innerHTML="-";
		 return 0;//check
    }
  }
passCheck = function(finalGrades, fG) {
	if(finalGrades[fG].innerHTML.toString().endsWith("%")){
		finalGrades[fG].innerHTML =finalGrades[fG].innerHTML.substring(0,finalGrades[fG].innerHTML.toString().length-1);
		}
	if (finalGrades[fG].innerHTML < 40&&finalGrades[fG].style.backgroundColor != "yellow") {
      finalGrades[fG].style.backgroundColor = "red";
      finalGrades[fG].style.color = "white";
      finalGrades[fG].style.borderColor = "#2d2d2d"
    }else if (finalGrades[fG].innerHTML >= 40 && finalGrades[fG].style.backgroundColor != "yellow"){
      finalGrades[fG].style.backgroundColor = "white";
      finalGrades[fG].style.color = "black";
      finalGrades[fG].style.borderColor = "#2d2d2d"
    }
    if(finalGrades[fG].innerHTML!="-"){
			finalGrades[fG].innerHTML +="%";
  	}
  }
//cookies
setCookie = function() {
	var d = new Date();
	var exdays;
	var cname = "ck1";
 	var cvalue = "";
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();//redundant
   var table = document.querySelectorAll("th, td");
   var ths =  document.querySelectorAll("th");
   var trs = document.querySelectorAll("tbody tr");
    for (var value of table.values()) {
   		if (value.innerHTML.endsWith("%")) {
        cvalue += value.innerHTML+ ",";
			value.innerHTML="";
      } else if(value.outerHTML.toString().includes("td")){
        cvalue += value.innerHTML + ",";
			value.innerHTML="";
      }
	}
   document.cookie = cname + "="+ ths.length+","+trs.length+"," + cvalue +";" + expires + ";path=/";
	calcFinalGrades();
}
getCookie = function() {
   var ths =  document.querySelectorAll("th");
   var table = document.querySelectorAll("td");
   var cookies = document.cookie.split(';');
  	var cooky = "";
	cooky=cookies[0].toString();
	cooky=cooky.substring(cooky.indexOf('=')+1);
	var ckar = cooky.split(',');
   var boo =forT(ckar[0],ckar[1]);
   if(boo==1){
      var i =0;
      var table = document.querySelectorAll("td");
	   for(var k = 2; k<ckar.length-1; k++){
         table[i].innerHTML=ckar[k].toString();
         i++;
      }
      cE();
	   calcFinalGrades();
   }	//check usage
}
forT=function(s,d){
   var l =  document.querySelectorAll("th").length;
   while(l<s){
      var col = document.querySelectorAll("td:nth-child(2)");//redundant
	   var lastAssignment = document.querySelectorAll("td:nth-last-child(2), th:nth-last-child(2)");
  	   var finalGrades = document.querySelectorAll("td:last-child");
	   var data = document.querySelectorAll("td:nth-child(n+3)");
	   var numAssignment = (data.length-(finalGrades.length))/finalGrades.length;
   	for(var q = 0; q<lastAssignment.length; q++){
      	if(q!=0){
		      lastAssignment[q].outerHTML +="<td contenteditable='true'>-</td>";
		   }else{
			   lastAssignment[q].outerHTML +="<th>Assignment "+(numAssignment+1)+"</th>";
		   }
      }
      l++;
   }
   while(l>s){
      var col = document.querySelectorAll("td:nth-child(2)");//redundant
	   var lastAssignment = document.querySelectorAll("td:nth-last-child(2), th:nth-last-child(2)");
  	   var finalGrades = document.querySelectorAll("td:last-child");
   	var ths =  document.querySelectorAll("th");
	   var data = document.querySelectorAll("td:nth-child(n+3)");
	   var numAssignment = (data.length-(finalGrades.length))/finalGrades.length;
//	console.log(lastAssignment.length);
      for(var i = 0; i<lastAssignment.length&&4<=ths.length; i++){
            lastAssignment[i].innerHTML=null;
            lastAssignment[i].outerHTML=null;
      }l--;
  }
  var f =  document.querySelectorAll("tbody tr").length;
  while(f<d){
      var table = document.getElementById("tbody");
      var numcols = document.querySelectorAll("th");
      var row = table.insertRow();
      for(var i=0; i< numcols.length; i++){
         var cell = row.insertCell(0);
      }
      f++;
      //insRow();
   }
   while(f>d){
      var table = document.getElementById("tbody");
	   var row = document.querySelectorAll("tbody tr");
		table.deleteRow(row.length-1);
      f--;
   }
   return 1;
}
//make ID and names editable onload
insCol = function(){
	var col = document.querySelectorAll("td:nth-child(2)");
	var lastAssignment = document.querySelectorAll("td:nth-last-child(2), th:nth-last-child(2)");
  	var finalGrades = document.querySelectorAll("td:last-child");
	var data = document.querySelectorAll("td:nth-child(n+3)");
	var numAssignment = (data.length-(finalGrades.length))/finalGrades.length;
	for(var q = 0; q<lastAssignment.length; q++){
   	if(q!=0){
			 lastAssignment[q].outerHTML +="<td contenteditable='true'>-</td>";
         /*if( lastAssignment[q].style.backgroundColor=="yellow"){
            var da= document.querySelectorAll("td:nth-last-child(2)");
            da[q].style.backgroundColor = "yellow";
         }*/
		}else{
			lastAssignment[q].outerHTML +="<th>Assignment "+(numAssignment+1)+"</th>";
		}
	}
		var ths = document.querySelectorAll("th");
	//var child =  document.querySelector("th:focus");
	var trs = document.querySelectorAll("tbody tr");
	var i=0;
	for (var j = 0; j < trs.length; j++) {///modular arithmetic
		if(trs[j].children[ths.length-1].style.backgroundColor=="yellow"){
						trs[j].children[ths.length-2].style.backgroundColor="yellow";
			}
		}

   cE();
   calcFinalGrades();
  // return true;
   //hiLigthR();
}
insRow = function(){
	var table = document.getElementById("tbody");
   var numcols = document.querySelectorAll("th");
   var row = table.insertRow();
   for(var i=0; i< numcols.length; i++){
 		var cell = row.insertCell(0);
	}
	var ths = document.querySelectorAll("th");
	//var child =  document.querySelector("th:focus");
	var trs = document.querySelectorAll("tbody tr");
	var i=0;
	for (var j = 0; j < ths.length; j++) {///modular arithmetic
		if(ths[j].style.backgroundColor=="yellow"){
			for(var value of trs.values()){
				value.children[j].style.backgroundColor="yellow";
			}
		}
	}

   cE();
   calcFinalGrades();

}
//check if the student has passed and if not style the cell red etc
deleteR = function(){

	var p = document.querySelectorAll("p");
	p[0].innerHTML="";
	p[1].innerHTML="";
	var table = document.getElementById("tbody");
	var ths = document.querySelectorAll("th");
	var row = document.querySelectorAll("tbody tr");
	for(var k = 0; k<ths.length;k++){

			p[0].innerHTML+= row[row.length-1].children[k].innerHTML+",";
		console.log(row[row.length-1].children[k].innerHTML);

	}
	console.log(p[0].innerHTML);
	p[1].innerHTML=(row.length-1);
	if(row.length>1){
		table.deleteRow(row.length-1);
	}
}
deleteC = function(){
   var col = document.querySelectorAll("td:nth-child(2)");
	var lastAssignment = document.querySelectorAll("td:nth-last-child(2), th:nth-last-child(2)");
  	var finalGrades = document.querySelectorAll("td:last-child");
   var ths =  document.querySelectorAll("th");
	var data = document.querySelectorAll("td:nth-child(n+3)");
	var numAssignment = (data.length-(finalGrades.length))/finalGrades.length;
   for(var i = 0; i<lastAssignment.length&&5<=ths.length; i++){
      lastAssignment[i].innerHTML=null;
      lastAssignment[i].outerHTML=null;
   }
	cE();
   calcFinalGrades();
}
/*hiLigth= function(){
	hiLigthC();
	hiLigthR();

}*/
hiLigthR = function(){
	var tds =  document.querySelectorAll("td");
 	var ths =  document.querySelectorAll("th");
	var child = document.querySelector("td:focus");
	var parent = child.parentElement;
	var finalGrades = document.querySelectorAll("td:last-child");//console.log(parent.childElementNodes.length);
	if(parent.children[0].style=="yellow"){
		for(var i=0; i<parent.children.length; i++){
			parent.children[i].style="yellow";
		}
	}else{
		var k = 0;
		while( (parent.previousElementSibling) != null ){
			parent = parent.previousElementSibling;
			k++;
		}
		parent = child.parentElement;
		var i=1;
		while( (child.previousElementSibling) != null ){
		   child = child.previousElementSibling;
			i++;
		}
		if(i==2){
			if(child.style.backgroundColor=="yellow"){
				ch = parent.children;
			   var j=0;
				while(ch[j] != null){
					ch[j].style.backgroundColor="white";
   				j++;
				}
				var y =finalGrades[k].innerHTML.substring(0,1);
				passCheck(finalGrades,k);
			}else{
			   ch = parent.children;
			   var j=0;
			   while(ch[j] != null){
				   ch[j].style.backgroundColor="yellow";
				   ch[j].style.color="black";
					j++;
            }
			}
		}
	}
}
hiLigthC = function(){
//   var data = document.querySelectorAll("th:nth-last-child(n+2), td:nth-last-child(n+2)");
	var ths = document.querySelectorAll("th");
	var child =  document.querySelector("th:focus");
	var trs = document.querySelectorAll("tr");
	var i=0;
	while( (child = child.previousElementSibling) != null){
   	i++;
	}
	console.log(i);
   var sum = 0;
	for (j = 0; j < trs.length&&i<ths.length-1; j++) {///modular arithmetic
		if(trs[j].children[i].style.backgroundColor=="yellow"){
			trs[j].children[i].style.backgroundColor="white";
			ths[i].style.backgroundColor="#6d6d6d";
		}else{
			trs[j].children[i].style.backgroundColor="yellow";
		}
	}
	cE();
   calcFinalGrades();
}

dselR = function(){//check
	var table = document.getElementById("tbody");
	var row = document.querySelectorAll("tbody tr");
	var ths = document.querySelectorAll("th");
	var p = document.querySelectorAll("p");
	p[0].innerHTML="";
	p[1].innerHTML="";
	for(var t =0; t<row.length; t++){
		if(row[t].children[ths.length-1].style.backgroundColor == "yellow"){
			for(var k = 0; k<ths.length;k++){
				p[0].innerHTML+= row[t].children[k].innerHTML+",";
				console.log(row[row.length-1].children[k].innerHTML);
			}
		}
	}
	console.log(p[0].innerHTML);
	p[1].innerHTML=(row.length-1);

	for(var i =0; i<row.length; i++){
		if(row[i].children[ths.length-1].style.backgroundColor == "yellow"){
			table.deleteRow(i);

		}
	}
}
dselC = function(){
	var ths = document.querySelectorAll("th");
	//var child =  document.querySelector("th:focus");
	var trs = document.querySelectorAll("tbody tr");
	var i=0;
	for (var j = 2; j < ths.length; j++) {///modular arithmetic
		if(ths[j].style.backgroundColor=="yellow"){
			ths[j].innerHTML=null;
			ths[j].outerHTML=null;
			for(var value of trs.values()){
				value.children[j].innerHTML=null;
				value.children[j].outerHTML=null;
			}
		}
	}
	cE();
   calcFinalGrades();
}
softd = function(){

    var p = document.querySelectorAll("p");
    if(p[0].innerHTML!=""){
    var ar = p[0].innerHTML.split(",");
    var table = document.getElementById("tbody");
     var numcols = document.querySelectorAll("th");
    var q = p[1].innerHTML;
     var row = table.insertRow(q);
     for(var i=0; i< numcols.length; i++){
      var cell = row.insertCell(0);
    //	cell.innerHTML=ar[i];
    }
    for(var k=0; k<numcols.length; k++){
      row.children[k].innerHTML=ar[k];
    }

    p[0].innerHTML="";
    p[1].innerHTML="";
     cE();
     calcFinalGrades();
     }
}
