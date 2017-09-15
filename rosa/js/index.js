$(document).ready(function(){
	$("#click").on("click",function(){
		$.getJSON("/js/quoteMachine.json", function(json){
			$("#textHere").html(JSON.stringify(json));
		});
						
	});


});
