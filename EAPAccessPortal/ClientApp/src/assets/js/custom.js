// JavaScript Document

//SIDEBAR Navigation Togle
$(document).ready(function(){
	$(".expand-nav").click(function(){
		$(".left-side").toggleClass("show-sidebar");
		
	});
	$(".left-side").click(function() {
	
		$(".left-side").toggleClass("show-sidebar");
		$(".ham.ham2").toggleClass("active");
		});
});

