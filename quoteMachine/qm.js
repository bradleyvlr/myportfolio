$(document).ready(function(){
	var previousColor = -2;
	var colors = ["#345","#593","#841","#d29","#54a","#1f3","#c30","#4d4d00"];
	var currentQuote="";
	var currentAuthor="";
	$(".newQuote").on("click", function(){
		var colorCode = Math.floor(Math.random()*(colors.length-1));
		if (colorCode == previousColor){
			colorCode += 1;
		}
		previousColor = colorCode;
		$.getJSON("/js/quoteMachine.json", function(json){
			var quoteMax = json.length;
			var quoteCode = Math.floor(Math.random()*quoteMax);
			currentAuthor = json[quoteCode].author;
			currentQuote = json[quoteCode].quote;
			$("#authorGoesHere").html(currentAuthor);
			$("#quoteGoesHere").html('"' + currentQuote + '"');
			document.getElementById("tweetme").setAttribute("href","https://twitter.com/intent/tweet?" + encodeURIComponent('"' + currentQuote + '  "' + currentAuthor));
			var bgColor = (colors[colorCode]);
			$("body").animate({backgroundColor:bgColor});
			$("button").animate({backgroundColor:colors[colorCode]},"slow");
			$("a").animate({backgroundColor:colors[colorCode]},"slow");
			$("p").animate({color:colors[colorCode]},"slow");
			
		});
	});
});
