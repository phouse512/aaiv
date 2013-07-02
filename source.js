function displayEventSelectBox(){
	$.ajax({
		url: 'listEvents.php',
		type: 'GET',
		success: function(data, textStatus, xhr){
            var events = data.getElementsByTagName("event");
            var html= '';

            for (var i=0;i<events.length; i++){
            	id = events[i].getElementsByTagName("event_id")[0].textContent;
            	name = events[i].getElementsByTagName("event_name")[0].textContent;
            	date = events[i].getElementsByTagName("event_date")[0].textContent;

            	html += '<option value="' + id + '">' + name + " " + date + '</option>'
            }
            select = $(".styled-event")[0];
            $(select).html(html);
		},
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		}
	});
}

function submitButton(){
	//hideErrors();

	firstName = $('input[name=firstname]').val();
	lastName = $('input[name=lastname]').val();
	emailAddress = $('input[name=email]').val();
	dorm = $('input[name=dorm]').val();
	year = $('.styled').val();
	eventName = $('.styled-event').val();

	valid = validateForm(firstName, lastName, emailAddress, year, eventName);
	hideErrors();
}

function validateForm(firstName, lastName, emailAddress, year, eventName){
	output = 0;

	if (isBlank(firstName)){
		output += 1;
		$("#error-first").css("visibility", "visible").hide().fadeIn(2500);
	}

	if (isBlank(lastName)){
		output += 1;
		$("#error-last").css("visibility", "visible").hide().fadeIn(2500);
	}

	if (year == ""){
		output += 1;
		$("#error-year").css("visibility", "visible").hide().fadeIn(2500);
	}

	if (eventName == ""){
		output += 1;
		alert('No event selected');
	}

	//INSERT EMAIL VALIDATION HERE

	return output;
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function hideErrors() {

	$('#error-first').fadeOut(function(){
		$(this).show().css({visibility:'hidden'});
	});
	$('#error-last').fadeOut(function(){
		$(this).show().css({visibility:'hidden'});
	});
	$('#error-email').fadeOut(function(){
		$(this).show().css({visibility:'hidden'});
	});
	$('#error-year').fadeOut(function(){
		$(this).show().css({visibility:'hidden'});
	});
}
