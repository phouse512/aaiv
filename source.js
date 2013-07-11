var currentSuggest = 2;

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
	alert(eventName);

	valid = validateForm(firstName, lastName, emailAddress, year, eventName, dorm);
	if(valid[0] < 1){
		insertUser(firstName, lastName, emailAddress, year, eventName, dorm);
	} else if( valid[0] == 10){
		updateAttendance(valid[1], eventName);
	}
}

function updateAttendance(userID, eventID){
	alert(userID);
	alert(eventID);
}

function validateForm(firstName, lastName, emailAddress, year, eventName){
	var output = new Array();
	output[0] = 0;

	if (isBlank(firstName)){
		output[0] += 1;
		if ($("#error-first").css("visibility") == "hidden"){
			$("#error-first").css("visibility", "visible").hide().fadeIn(2500);
		}
	}

	if (isBlank(lastName)){
		output[0] += 1;
		if ($("#error-last").css("visibility") == "hidden"){
			$("#error-last").css("visibility", "visible").hide().fadeIn(2500);
		}
	}

	if (year == ""){
		output[0] += 1;
		if ($("#error-year").css("visibility") == "hidden"){
			$("#error-year").css("visibility", "visible").hide().fadeIn(2500);
		}
	}

	if (eventName == ""){
		output[0] += 1;
		alert('No event selected');
	}

    if(isBlank(emailAddress)){
    	output[0] += 1;
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
            if(data != "none"){
            	output[0] = 10;
            	output[1] = data;
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
	$('#slick-login').fadeOut(750);
	$('#success').fadeIn(750);
	
	$('#success').delay(4000).fadeOut("slow");
	$('#slick-login').delay(4000).fadeIn("slow");
	clearForm();
}

function clearForm(){
	firstName = $('input[type=text]').val("");
	$('#year-select').prop('selectedIndex', 0);
	$('#year-select').trigger('update');
}

function displayUserSuggestion(xmlString){
    users = xmlString.getElementsByTagName("user");
    var html= '';

    for (var i=0;i<users.length; i++){
    	id = users[i].getElementsByTagName("user_id")[0].textContent;
    	firstName = users[i].getElementsByTagName("first_name")[0].textContent;
    	lastName = users[i].getElementsByTagName("last_name")[0].textContent;
    	year = users[i].getElementsByTagName("year")[0].textContent;
    	email = users[i].getElementsByTagName("email")[0].textContent;
    	if (i == (users.length-1)){
    		html += '<div id="user_' + id + '" class="user-suggestions-bottom"><div class="column">' + firstName + '</div><div class = "column">' + lastName + '</div><div class="column">' + year + '</div><div class="column">' + email + '</div></div>';
    	} else{
    		html += '<div id="user_' + id + '" class="user-suggestions"><div class="column">' + firstName + '</div><div class = "column">' + lastName + '</div><div class="column">' + year + '</div><div class="column">' + email + '</div></div>';
    	}
    }

    select = $("#suggest1");
    $(select).html(html);
    select.stop(true,true).slideToggle(600, "swing");
    select.stop(true,true).slideToggle(600, "swing");


    /*if (currentSuggest == 2){
    	select = $("#suggest1");
    	select2 = $("#suggest2");
    	$(select).html(html);
    	$(select2).html(html);
    	select.stop(true,true).fadeToggle(750, "swing");
    	select2.stop(true,true).fadeToggle(750, "swing");
    	currentSuggest = 1;
    } else{
    	select = $("#suggest2");
    	select2 = $("#suggest1");
    	$(select).html(html);
    	$(select2).html(html);
    	select.stop(true,true).fadeToggle(750, "swing");
    	select2.stop(true,true).fadeToggle(750, "swing");
    	currentSuggest = 2;
    }*/
}

function onChange(){
	firstName = $('input[name=firstname]').val();
	lastName = $('input[name=lastname]').val();
	emailAddress = $('input[name=email]').val();
	year = $('.styled').val();

	$.ajax({
		url: 'userSuggestion.php',
		type: 'POST',
		data: ({email: emailAddress,
				first_name: firstName,
				last_name: lastName,
				year: year}),
		success: function(data, textStatus, xhr){
			$("#suggest").html('');
            displayUserSuggestion(data);
		},
		error: function(xhr, textStatus, errorThrown){
			alert(textStatus);
		}
	});
}
