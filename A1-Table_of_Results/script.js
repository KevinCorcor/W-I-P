//on button click update and showhide
CSV = function(){
    var btn = document.getElementById("gCSV");
    var csv = document.querySelector(".csv");
    if (btn.innerHTML.toString() == "Hide CSV") {//no need to regenerate since it will be hidden
      btn.innerHTML = "Show CSV";
      csv.style.visibility = "hidden";
      //window.scrollBy(0, -230);//works fine but not ideal
    } else {
     	generateCSV();//generates csv data upon show, not completely necessary since it will be done automatically
      btn.innerHTML = "Hide CSV";
      csv.style.visibility = "visible";
     // window.scrollBy(0, 230);//works fine but not ideal
    }
}
  //Empty a cell for input
emptyCell = function() {
    var cell = document.querySelector("td:focus");//selected cell
    if (cell.innerHTML == '-') {//if it is already null empty it to allow input
      cell.innerHTML = null;
      var numUnSub = document.querySelector("div div div span");
      numUnSub.innerHTML--;//decrement number of unsubmitted assignments
    }
  }
  //calculate all the averages
calcFinalGrades = function() {
    var numUnSub = document.querySelector("div div div span");
    numUnSub.innerHTML = null;//reset every call
    var finalGrades = document.querySelectorAll("td:last-child");//final grades column
    var data = document.querySelectorAll("td:nth-child(3), td:nth-child(4), td:nth-child(5), td:nth-child(6), td:nth-child(7)");//assignments column
    var fG = 0;//final grade row
    var numAssignment = data.length / finalGrades.length;//amount of assignments
    var sum = 0;
    for (i = 0; i <= data.length; i++) {
      if ((i != 0) && (((i) % numAssignment) == 0)) {
        finalGrades[fG].innerHTML = Math.round(sum / numAssignment);
        passCheck(finalGrades, fG);
        finalGrades[fG].innerHTML += '%';
        sum = 0;
        fG++;
        finalGrades[fG].innerHTML = 0;
      }
      if (verifyInput(data, i)) {
        sum += parseFloat(data[i].innerHTML);
      }
      data[i].contentEditable = true;
      if(i==data.length-1){
      	generateCSV();
      }
    }
  }
  //check if the student has passed and if not style the cell red etc
passCheck = function(finalGrades, fG) {
    if (finalGrades[fG].innerHTML < 40) {
      finalGrades[fG].style.backgroundColor = "red";
      finalGrades[fG].style.color = "white";
      finalGrades[fG].style.borderColor = "#2d2d2d"
    }
    else{
    	finalGrades[fG].style.backgroundColor = "white";
      finalGrades[fG].style.color = "black";
      finalGrades[fG].style.borderColor = "#2d2d2d"
    }
  }
  //verify that the input is between 0 and 100
verifyInput = function(data, i) {
    if ((data[i].innerHTML >= 0) && (data[i].innerHTML <= 100) && (data[i].innerHTML != '')) {
      data[i].style.backgroundColor = "white";
      return parseFloat(data[i].innerHTML);
    } else {
      unSubCell(data, i);//default to unsubmitted assignment
      return 0;
    }
  }
  //style an unsubmitted assignment cell and increment a count of such cells
unSubCell = function(data, i) {
    data[i].innerHTML = '-';
    data[i].style.backgroundColor = "yellow";
    var numUnSub = document.querySelector("div div div span");
    numUnSub.innerHTML++;
  }
//generate csv
generateCSV = function() {
    var table = document.querySelectorAll("tbody tr td");
    var csv = document.querySelector(".csv");
   // csv.style.visibility = "visible";
    csv.style.width = "auto";
    csv.innerHTML = null;
    for (var value of table.values()) {
      if (value.innerHTML.endsWith("%")) {
        csv.innerHTML += value.innerHTML + "\n";
      } else {
        csv.innerHTML += value.innerHTML + ",";
      }
    }
  }
