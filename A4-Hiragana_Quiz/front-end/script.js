//some global vairables
var sel = $("td[type=selected] div");
var ans = [];
var qs = [];
var counter = 0;
//onload
$(document).ready(function(){
	$("#loginsub").click(function(event){
		event.preventDefault();

	      $.ajax({type:"POST", url: "../web-service/login.php", data: $('#loginform').serialize(),  dataType: "text",
	      	success: function(result){
	        $(".info").html(result);
	        $("#loginform").hide();
	         $("#logout").show();
	         $('#stats').show();

	    },error: function(result){console.log(result)}});


	});
	$("#signupsub").click(function(event){
		event.preventDefault();

	      $.ajax({type:"POST", url: "../web-service/signup.php", data: $('#signupform').serialize(),  dataType: "text",
	      	success: function(result){
	        $(".info").append(result);

	    },error: function(result){console.log(result)}});
	  });

	$("#logout").click(function(event){
		event.preventDefault();
	      $.ajax({type:"POST", url: "../web-service/logout.php", dataType: "text", success: function(result){
		        $(".info").html(result);
		        $("#loginform").show();
	    	    $("#logout").hide();
	    	    $("#stats").hide();
	    	    $(".res").remove();
	    },error: function(result){console.log(result)}});

	});
	$("#stats").click(function(event){
		event.preventDefault();
	      $.ajax({type:"POST", url: "../web-service/stats.php", dataType: "text", success: function(result){

		       displayR(result);

		        $("img").hover(function(){
    	var src = $(this).attr("src").toString();
		if(src.includes(".png")){
			src = src.replace(".png", ".gif");
      		src = src.replace("Static", "GIF");
     	   	$(this).attr("src",src);
  		}else{
    		src = src.replace(".gif", ".png");
        	src = src.replace("GIF", "Static");
        	$(this).attr("src",src);
   		}
   		$("td").click(function(){
    	console.log($(this).children("div").val().toString().substring(1,$(this).find("div").text().toString().indexOf('/')));
    	var i = $(this).find("div").text().toString().indexOf('/');
       	var src = $(this).find("div").text().toString().substring(1,i);
        var x = document.createElement('audio');
    	x.setAttribute('src', 'Hiragana/Sound/basic_sounds/'+src+'.mp3');
    	x.play();

	});
    });
	    	    $("#stats").hide();
	    },error: function(result){console.log(result)}});

	});

	//gif animate
	$("img").hover(function(){
    	var src = $(this).attr("src").toString();
		if(src.includes(".png")){
			src = src.replace(".png", ".gif");
      		src = src.replace("Static", "GIF");
     	   	$(this).attr("src",src);
  		}else{
    		src = src.replace(".gif", ".png");
        	src = src.replace("GIF", "Static");
        	$(this).attr("src",src);
   		}
    });
	//audio
	$("td").click(function(){
    	console.log($(this).text().toString().substring(1));
       	var src = $(this).text().toString().substring(1);
        var x = document.createElement('audio');
    	x.setAttribute('src', 'Hiragana/Sound/basic_sounds/'+src+'.mp3');
    	x.play();

	});

	//selecting rows
	$("tbody th").click(function(){
		console.log($(this).parent().css("background-color").toString());
		if($(this).siblings("td").css("background-color").toString()=="transparent")
		{
			$(this).siblings("td").css("background-color","yellow");
			$(this).siblings("td").attr('type', 'selected');
		}else{
			$(this).siblings("td").css("background-color","transparent");
			$(this).siblings("td").attr('type', 'unselected');
		}
		sel = $("td[type=selected] div");
	});
	//selecting every cell
	$("thead th:first-child").click(function(){
		if($("td").css("background-color").toString()=="transparent")
		{
			$("td").css("background-color","yellow");
			$("td").attr('type', 'selected');
		}else{
			$("td").css("background-color","transparent");
			$("td").attr('type', 'unselected');
		}
		sel = $("td[type=selected] div");
	});
	//select columns
	$("thead th:nth-child(n+2)").click(function(){
		var len = $(this).prevUntil("tbody").length+1;
		if($("tbody tr > td:nth-child("+len+")").css("background-color")=="transparent"){
			$("tbody tr > td:nth-child("+len+")").css("background-color","yellow");
			$("tbody tr > td:nth-child("+len+")").attr('type', 'selected');
		}else{
			$("tbody tr > td:nth-child("+len+")").css("background-color","transparent");
			$("tbody tr > td:nth-child("+len+")").attr('type', 'unselected');
		}
		sel = $("td[type=selected] div");
	});
});
displayR = function(result){
	//console.log(result)
	var sets = result.split("#");
	var chars = sets[0].toString().split(",");
	//console.log(chars);
	var att = sets[1].toString().split(",");
	//console.log(att);
	var scr = sets[2].toString().split(",");
	//console.log(scr);
	var tds = document.querySelectorAll("td:not(:empty)");
	for(var i =0; i<tds.length;i++){
		var score =parseInt(scr[i]);
		var attempt = parseInt(att[i]);
		tds[i].innerHTML+='<p class = "res">'+score+'/'+attempt+'</p>';
	}
}
offloadLogin = function(){
	$("#loginform2").show();
	$("#loginsub2").click(function(event){
		event.preventDefault();
		$.ajax({type:"POST", url: "../web-service/login.php", data: $('#loginform2').serialize(),  dataType: "text",
	      	success: function(result){
	        $(".quizee").append(result);
	        $("#loginform2").hide();
	        $("#login").hide();
	         $("#logout2").show();
	         $("#save").show();

	       // $(".info").append('<button id="logout">logout</button>');
	    },error: function(result){console.log(result)}});

	    $("#logout2").click(function(event){
		event.preventDefault();
	      $.ajax({type:"POST", url: "../web-service/logout.php", dataType: "text", success: function(result){
		        $(".quizee").append(result);
		        $("#loginform2").show();
	    	    $("#logout2").hide();
	    },error: function(result){console.log(result)}});
		});
	});
}
//begin the quiz
startQuiz = function(){
	//check have enough characters been selected
	if(sel.length<10){
		alert("Please select more characters");
		return;
	}
	//hide the data
	$("#page").hide();
	//add quiz containers
	$(".quizee").append('<div class="num"></div>');
	$(".quizee").append('<div class="options"></div>');
	$(".quizee").append('<br><div class="question"></div>');
	$(".quizee").append('<br><button class="btn">Next</button>');
	//if the button is clicked
	$(".btn").click(function(){
		if(submitAns()){//if an answer has been selected
			quiz(sel,ans,counter);//present a new question
		}
	});
	quiz(sel,ans,counter);//present a new question
}
submitAns = function(){
	if($(".selected").length==0){//make sure an answer was chosen
		alert("Please select an answer");
		return false;
	}
	var an = $('.selected').attr("name").toString();
	var el = $(".question div");
	if(an==el.attr("name").toString()){//check if it is correct or not
		ans[counter]=1;
	}
	else{
		ans[counter]=0;
	}
	qs[counter]=an;
	counter++;
	if(counter==10){//10 questions
		$(".quizee").empty();
		var total=0;
		for(var i in ans){
			total += ans[i];
		}
		$(".quizee").append('<div class="result"><h1>'+total*10+'%</h1></div>');
		$(".quizee").append('<button id="save">Save Results</button>');
		$(".quizee").append('<button class="quiz" onclick="endQuiz();">Finish</button>');
		$(".quizee").append('<div id="quize"></div>');
		$(".quizee").append('Create User(OR click "Save Results" to login):<br><form id="signupform2" method="post">Username: <input name="username2" id="username" value="" type="text"><br>Password: <input name="password2" id="password" value="" type="password"><input name="signupsub2" id="signupsub2" value="Sign-Up" type="submit"></form>');

		$("#save").click(function(event){
		event.preventDefault();
		var anstr=ans.toString();
		var qstr =qs.toString();
		//console.log(qstr);
	      $.ajax({type:"POST", url: "../web-service/save.php", data:{answers:anstr, questions:qstr}, dataType: "text", success: function(result){
		        $(".quizee").append(result);
		        $("#signupsub2").hide();
		        //$("#loginform").show();
	    	    $("#save").hide();
	    },error: function(result){console.log(result)}});
		});
		$("#signupsub2").click(function(event){
		event.preventDefault();
	      $.ajax({type:"POST", url: "../web-service/signup.php", data: $('#signupform2').serialize(),  dataType: "text",
	      	success: function(result){
	        $(".quizee").append(result);

	    },error: function(result){console.log(result)}});
	  });
	}
	return true;
}
endQuiz = function(){//finish the quiz showing a result
	$(".quizee").empty();
	counter=0;//reset globals
	ans=[];
	sel=[];
	$("#page").show();
}
quiz = function(chars, answers, counts){
	chars = shuffle(chars);
	x = (Math.random() < 0.5);
	$(".num").html((1+counter));
    if(x){
    	$(".options").html('<br><img name="'+sel[0].innerHTML+'" src="Hiragana/Static/'
			+sel[0].innerHTML+'.png"><img name="'+sel[1].innerHTML+'" src="Hiragana/Static/'
			+sel[1].innerHTML+'.png"><img name="'+sel[2].innerHTML+'" src="Hiragana/Static/'
			+sel[2].innerHTML+'.png"><img name="'+sel[3].innerHTML+'" src="Hiragana/Static/'
			+sel[3].innerHTML+'.png">');
		var ran = Math.floor(Math.random() * 4);
		$(".question").html('<div name="'+sel[ran].innerHTML+
			'"><h1>Which character above has the following associated romaji?<br>"'
			+sel[ran].innerHTML+'"</h1></div>');
    }else{
    	$(".options").html('<br><h1 name="'+sel[0].innerHTML+'" >'
    		+sel[0].innerHTML+'</h1><h1 name="'+sel[1].innerHTML+'" >'
    		+sel[1].innerHTML+'</h1><h1 name="'+sel[2].innerHTML+'" >'
    		+sel[2].innerHTML+'</h1><h1 name="'+sel[3].innerHTML+'" >'
    		+sel[3].innerHTML+'</h1>');
    	var ran2 = Math.floor(Math.random() * 4);
    	$(".question").html('<div name="'+sel[ran2].innerHTML+'"><h1>Which romaji above has the following associated character?</h1><img src="Hiragana/Static/'
			+sel[ran2].innerHTML+'.png"></div>');
    }
    $('.options img, .options h1').click(function(){//http://stackoverflow.com/questions/24692655/how-to-highlight-an-image-after-selection-using-css-or-jquery
   		$('.selected').removeClass('selected');//http://jsfiddle.net/hP3JH/
    	$(this).addClass('selected');
	});
}
function shuffle(array) {//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
