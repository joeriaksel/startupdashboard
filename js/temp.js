function initLocalStorageControls(){
	console.log('localstore.js loaded correctly');

	var userMessage;
	 
	if (Modernizr.localstorage) { 
		userMessage = "Get all, ahem...some, company info at a glance";
		// $('#data-dashboard').show;
		console.log("Local storage available");

	} else { 

		userMessage = "Sorry, local storage is not available";
		// $('#data-dashboard').hide;
		console.log("Local storage not available");
	}

	$('.status-message').text(userMessage);

};



$(document).ready(function() {
	
	// initLocalStorageControls();

	// when user clicks, get company name
	$('#getCompanyName').click(function() {
		$('#jobsCanvas').html('');
		var companyName = $('#companyName').val();
	    console.log(companyName);
	    // Make a call to the  API to get data
	    $.ajax({
				type: "GET",    	
				    // crunchbase look up company profile
					url: 'http://api.crunchbase.com/v/1/company/' + companyName + '.js?api_key=t64qktqmy2s3hyq6g3g5cazf',

					// url: 'http://jsonp.jit.su/?url=http%3A%2F%2Fapi.crunchbase.com%2Fv%2F1%2Fcompany%2F' + companyName + '.js%3Fapi_key%3Dt64qktqmy2s3hyq6g3g5cazf',
					dataType: "jsonp",
		            success: function(theCompany) {
		            	console.log('Get message successfully returned');
		                console.log(theCompany.overview);
		                // return theCompany
		             displayCompanyProfile(theCompany);
		             googleTrends(companyName);
		             getJobs(companyName);
		            }
	        });
	    getJobs(companyName);


		function displayCompanyProfile(theCompany) {
			$('#companyTitle').html(theCompany.name);
			$('#companySummary').html(theCompany.description);
			$('#companyDescription').html(theCompany.overview);

			$('#companySector').html('Industry: ' + theCompany.tag_list);
			$('#companyLocation').html('Location: ' + theCompany.offices.city); // fix this
			$('#companyFounded').html('Founded: ' + theCompany.founded_year);
			$('#companyEmployees').html('Employees: ' + theCompany.number_of_employees);
			$('#companyFunding').html('Funding: ' + theCompany.total_money_raised);
			// $('#companyConnections').html();   // add LinkedIn if time
			$('#companyURL').html('Website: ' + theCompany.homepage_url);
		}
				


//fix google trends
	    // var googleTrends = 'http://www.google.com/trends/fetchComponent?q=' + companyName + '&cid=TIMESERIES_GRAPH_0&export=3';
	    // 	console.log(googleTrends);
	    function googleTrends(companyName){

	    	var trendsChart = "<iframe style='height: 330px; width: 500px;' src='http://www.google.com/trends/fetchComponent?q=" + companyName + "&cid=TIMESERIES_GRAPH_0&export=5'></iframe>";
	    	console.log(trendsChart);
	    	$('#googleTrendsCanvas').html(trendsChart);
	    }

	    function getJobs(companyName) {
		    // Make a call to the Adzuna API to get jobs data
		    $.ajax({
					type: "GET",    	
						// adzuna request job list by company name
						// url: 'http://api.adzuna.com:80/v1/api/jobs/gb/search/1?app_id=15020c9a&app_key=1815c85db70a2acdfcc2695cd24dbbd7&company=' + companyName,
						url: 'http://jsonp.jit.su/?url=http%3A%2F%2Fapi.adzuna.com%3A80%2Fv1%2Fapi%2Fjobs%2Fgb%2Fsearch%2F1%3Fapp_id%3D15020c9a%26app_key%3D1815c85db70a2acdfcc2695cd24dbbd7%26company%3D' + companyName,

			            success: function(theJobs) {
			            	console.log(theJobs);
			            
				            function jobsTable(theJobs){
				            	for (var i in theJobs.results) {
									var jobTitle = theJobs.results[i].title;

									$('#jobsCanvas').append(jobTitle + '<br>');
				            	}
				            }
				            jobsTable(theJobs);
			            }
		        });

	    }


	});
});








					// angellist lookup ID by looking for exact URL:
						// url: 'https://api.angel.co/1/search/slugs?query=' + companyName,
						// dataType: "jsonp",
						
						// or to return list of results by name of startup:
			            // url: 'https://api.angel.co/1/search?query=' + companyName + '&type=Startup',


			            // var startupId
						// angellist look up profile with id
						// url: 'https://api.angel.co/1/tags/' + startupId + '/startups'
						// dataType: "jsonp",

						
						// dataType: "jsonp",

			            // success: function (xml) {
			            //     alert(xml.data[0].city);
			            //     result = xml.code;
			            //     document.myform.result1.value = result;
			            // },


    		// url: 'https://api.angel.co/1/search?query=' + companyName + '&type=Startup',
	    	// url: 'http://api.crunchbase.com/v/1/company/' + companyName + '.js?api_key=t64qktqmy2s3hyq6g3g5cazf',

