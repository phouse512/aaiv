function displayEventSelectBox(){
	$.ajax({
		url: 'listEvents.php',
		type: 'GET',
		success: function(data, textStatus, xhr){
            var events = data.getElementsByTagName("event");
            var html= '<option value="">choose event..</option>';

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
	hideErrors();
	valid = 0;

	firstName = $('input[name=firstname]').val();
	lastName = $('input[name=lastname]').val();
	emailAddress = $('input[name=email]').val();
	dorm = $('input[name=dorm]').val();
	year = $('.styled').val();
	eventName = $('.styled-event').val();

	valid = validateForm(firstName, lastName, emailAddress, year, eventName, dorm);
	if(valid < 1){
		insertUser(firstName, lastName, emailAddress, year, eventName, dorm);
	}
}

function validateForm(firstName, lastName, emailAddress, year, eventName){
	output = 0;

	if (isBlank(firstName)){
		output += 1;
		if ($("#error-first").css("visibility") == "hidden"){
			$("#error-first").css("visibility", "visible").hide().fadeIn(2500);
		}
	}

	if (isBlank(lastName)){
		output += 1;
		if ($("#error-last").css("visibility") == "hidden"){
			$("#error-last").css("visibility", "visible").hide().fadeIn(2500);
		}
	}

	if (year == ""){
		output += 1;
		if ($("#error-year").css("visibility") == "hidden"){
			$("#error-year").css("visibility", "visible").hide().fadeIn(2500);
		}
	}

	if (eventName == ""){
		output += 1;
		alert('No event selected');
	}

    if(isBlank(emailAddress)){
    	output += 1;
    	$("#error-email > p").text("Please enter valid email");
    	if($("#error-email").css("visibility") == "hidden"){
    		$("#error-email").css("visibility", "visible").hide().fadeIn(2500);
    	}
    }

	//INSERT EMAIL VALIDATION HERE
	$.ajax({
		url: 'validateEmail.php',
		type: 'POST',
		data: ({email: emailAddress}),
		success: function(data, textStatus, xhr){
            console.log(data);
            if(data == "exists"){
          		$("#error-email > p").text("Email already exists");
            	if($("#error-email").css("visibility") == "hidden"){
            		$("#error-email").css("visibility", "visible").hide().fadeIn(2500);
            	}
            	output += 1;
            }
            
		},
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		},
		async: false
	});

	return output;
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function hideErrors() {
	if ($("#error-first").css("visibility") == "visible"){
		$('#error-first').css({visibility: 'hidden'});
	}

	if ($("#error-last").css("visibility") == "visible"){
		$('#error-last').css({visibility: 'hidden'});
	}
	if ($("#error-email").css("visibility") == "visible"){
		$('#error-email').css({visibility: 'hidden'});
	}
	if ($("#error-year").css("visibility") == "visible"){
		$('#error-year').css({visibility: 'hidden'});
	}
}

function insertUser(firstName, lastName, emailAddress, year, eventName, dormitory){
	$.ajax({
		url: 'createUser.php',
		type: 'POST',
		data: ({email: emailAddress,
				first: firstName,
				last: lastName,
				eventID: eventName,
				study: year,
				dorm: dormitory}),
		success: function(data, textStatus, xhr){
            displayConfirmation();

		},
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		}
	});
}

function displayConfirmation(){
	$('#slick-login').fadeOut(500);
	$('#success').fadeIn(500);

	$('#success').delay(4000).fadeOut("slow");
	$('#slick-login').delay(4000).fadeIn("slow");
}

