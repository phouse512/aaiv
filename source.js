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

