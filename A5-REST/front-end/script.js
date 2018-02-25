
		//event.preventDefault();
$(document).ready(function(){
	$("#r").click(function(event){
		event.preventDefault();
		/*$request = $( "#select option:selected" ).text();
		$url="http://localhost/a5/api.php/RL/?"+$( "#select option:selected" ).text()+
		"/"+$("#identifier").val();
		console.log($url);
	    $.get($url, function(data, status){
    	    $("#get_results").html("Data: " + data + "\nStatus: " + status);
    	});*/
    	$.ajax({
		 	type:"GET",
		 	url: "../web-service/api.php/RL",
		 	data: $('#formR').serialize(),
		 	dataType: "text",
	      	success: function(result){
	      		//JSONObject myObject = new JSONObject(result);
	        	$("#get_results").html(result);
			},
			error: function(result){
				$("#get_results").html(result);
			}
		});
	});
	$("#po").click(function(event){
		event.preventDefault();
		$.ajax({
		 	type:"POST",
		 	url: "../web-service/api.php/RL",
		 	data: $('#formC').serialize(),
		 	dataType: "text",
	      	success: function(result){
	        	$("#post_results").html(result);
			},
			error: function(result){
				$("#post_results").html(result);
			}
		});

    });
    $("#pu").click(function(event){
		event.preventDefault();
		$.ajax({
		 	type:"PUT",
		 	url: "../web-service/api.php/RL",
		 	data: $('#formU').serialize(),
		 	dataType: "text",
	      	success: function(result){
	        	$("#put_results").html(result);
			},
			error: function(result){
				$("#put_results").html(result);
			}
		});

    });
    $("#del").click(function(event){
		event.preventDefault();
		$.ajax({
		 	type:"DELETE",
		 	url: "../web-service/api.php/RL",
		 	data: $('#formD').serialize(),
		 	dataType: "text",
	      	success: function(result){
	        	$("#del_results").html(result);
			},
			error: function(result){
				$("#del_results").html(result);
			}
		});

    });
});
