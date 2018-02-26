window.onerror = function(msg, file, line, col, error) {
	//this will show any error message
	alert(msg);
}; 

//app is not using this deviceID
var app = {};
app.ifLoginRequested = false;
app.deviceid = document.URL.split("?")[1];
app.groupName = document.URL.split("?")[2];	
if(!app.deviceid){ app.deviceid = ""; alert('Could not get deviceid')}
if(!app.groupName){ app.groupName = ""; alert('Could not get groupname')}

// app.deviceid = 'pl_a_tower';
app.imageElements = {};
app.videoElements = {};
app.imageElements.image1 = '<img id="img1" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
app.imageElements.image2 = '<img id="img2" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
app.imageElements.image3 = '<img id="img3" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
// app.imageElements.image4 = '<img id="img4" class="imgs" onerror="this.onerror=null;this.src=\'default.png\';"></img>';
app.imageElements.image5 = '<img id="img5" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';
app.imageElements.image7 = '<img id="img7" class="imgs" onerror="this.onerror=null;this.src=\'../advt/default.png\';"></img>';

app.videoElements.video1 = '<video id="vid1" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video2 = '<video id="vid2" class="vids" width="100%" height="100%" autoplay muted loop poster=\'../advt/default.png\'></video>';
app.videoElements.video3 = '<video id="vid3" class="vids" width="100%" height="100%" autoplay muted loop poster=\'../advt/default.png\'></video>';
// app.videoElements.video4 = '<video id="vid4" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video5 = '<video id="vid5" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video6 = '<video id="vid6" class="vids" width="100%" height="100%" autoplay muted loop ></video>';
app.videoElements.video7 = '<video id="vid7" class="vids" width="100%" height="100%" autoplay muted loop poster=\'../advt/default.png\'></video>';
app.resourceFolder = app.groupName;
app.advtFolder = 'advt';


app.visibleCampaign = "campaign1";
app.campaignInterval;
app.campaignIntervalTime;

app.firstChannelInterval;
app.firstChannelIntervalTime;

app.secondChannelInterval;
app.secondChannelIntervalTime;

// app.thirdChannelInterval;
// app.thirdChannelIntervalTime;

app.fourthChannelInterval;
app.fourthChannelIntervalTime;

app.videoAndSOSInterval;
app.videoAndSOSlIntervalTime;

app.videoInterval;
app.videoIntervalTime;

app.sosInterval;
app.sosIntervalTime;


app.masterPlanInterval;

app.isuserloggedin = false;

app.listToShow = 1;

var URL = "..";

window.onload = function(){

	;(function($) {
	    $.fn.textfill = function(options) {
	        var fontSize = options.maxFontPixels;
	        var ourText = $('span:visible:first', this);
	        var maxHeight = $(this).height();
	        var maxWidth = $(this).width();
	        var textHeight;
	        var textWidth;
	        do {
	            ourText.css('font-size', fontSize + 'vw');
	            textHeight = ourText.height();
	            textWidth = ourText.width();
	            fontSize = fontSize - 0.1;
	        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 0.1);
	        return this;
	    }
	})(jQuery);

	;(function($) {
	    $.fn.textfillWeather = function(options) {
	        var fontSize = options.maxFontPixels;
	        var ourText = $('div:visible:first', this);
	        // var maxHeight = $('div:visible:first', this).height();
	        var maxWidth = $('div:visible:first', this)	.innerWidth();
	        var textHeight;
	        var textWidth;
	        do {
	            ourText.css('font-size', fontSize + 'vw');
	            // textHeight = ourText.height();
	            textWidth = ourText[0].scrollWidth;
	            fontSize = fontSize - 0.1;
	        } while ((textWidth > maxWidth) && fontSize > 1);
	        return this;
	    }
	})(jQuery);

	;(function($) {
	    $.fn.textverticalalign = function(options) {
	        var initialTop = options.initialTop;
	        var ourText = $('span:visible:first', this);
	        var totalHeight = $('body').height()
	        var textTop;
	        do {
	            ourText.css('top', initialTop + 'vw');
	            textTop = ourText.position().top;
	            textBottom = totalHeight - ourText.height() - ourText.position().top;
	            // textHeight = ourText.height();
	            initialTop = initialTop - 0.1;
	        } while ((textBottom <= textTop) && initialTop > 0);
	        return this;
	    }
	})(jQuery);


	function loadConfig(callback){
		//  LGD
		configData = {
			"url":"..",
			"master_plan_interval":60000,
			"firstChannelIntervalTime" : 20,
			"secondChannelIntervalTime" : 20,
			// "thirdChannelIntervalTime" : 20,
			"fourthChannelIntervalTime" : 20,
			"fullscreenChannelIntervalTime" : 10,
			"videoAndSOSIntervalTime" : 1,
			"videoIntervalTime" : 1,
			"sosIntervalTime" : 1,
			"campaignIntervalTime" : 60
		}
		callback(200,configData)
	}

	loadConfig(function(statusCode, configData){
		if(statusCode == 200){
			URL = configData.url;
			
			app.masterPlanInterval = configData.master_plan_interval;
			app.campaignIntervalTime = configData.campaignIntervalTime;
			app.firstChannelIntervalTime = configData.firstChannelIntervalTime;
			app.secondChannelIntervalTime = configData.secondChannelIntervalTime;
			// app.thirdChannelIntervalTime = configData.thirdChannelIntervalTime;
			app.fourthChannelIntervalTime = configData.fourthChannelIntervalTime;
			app.fullscreenChannelIntervalTime = configData.fullscreenChannelIntervalTime;
			app.videoAndSOSIntervalTime = configData.videoAndSOSIntervalTime;
			app.videoIntervalTime = configData.videoIntervalTime;
			app.sosIntervalTime = configData.sosIntervalTime;
			// initializeFirebase();
			// function(){
			// recheckData = setInterval(function(){
				// if(ifFirebaseIsEstablished()){
					// getAvailableCampaign(function(campaignName){
						campaignName = "campaign1";
						// initializeChannels();
						// recheck();
						// function recheck(){
							// if(!db) {setTimeout(recheck,500); console.log('rechecking')}
							// else {
								initializeApp(campaignName);
								checkForVideoAndSOS();
							// }
							
						// }

						
					// })
					// clearInterval(recheckData)
				// }
				// else console.warn('Rechecking for data...')
			// },100)
			// });
		}else{
			alert('config error');
		}
	});

	if(moment().year() >= 2017){
		$(".myHeader .myAppTimeLabel").text(moment().format('Do MMM,YY hh:mm A'))
	}
	updateTime();
  	function updateTime() {
	    setTimeout(function() {
			if(moment().year() >= 2017){
	    		$(".myHeader .myAppTimeLabel").text(moment().format('Do MMM,YY hh:mm A'))
	    	}
	        updateTime();       // repeat
	    }, 60 * 1000)
	}

	// function getWeather(){
	// 	$.simpleWeather({
	// 	    location: 'Noida, UP',
	// 	    woeid: '',
	// 	    unit: 'c',
	// 	    success: function(weather) {
	// 	      html = 	`<div class="row" style="height:100%">
	// 	      				<div class="col-xs-12" style="padding:0;">
	// 	      					<div id="weatherContent"><i class="icon-`+weather.code+`"></i> `+weather.temp+`&deg;`+weather.units.temp+" "+weather.currently+`</div>
	//       					</div>`
	// 			    //   		<div class="col-xs-6" style="padding:0;height:100%;">
	// 			    //   			<div style="padding:0;font-size:1.5vw;height:50%;margin-left:10px;font-weight:700">
	// 			    //   				`+weather.currently+ `
	// 	      // 					</div>
	// 	      // 					<div style="padding:0;font-size:1.5vw;font-weight:700;height:50%;margin-left:10px;line-height:1;">
	// 			    //   				`+weather.city+ `
	// 	      // 					</div>
	//       	// 				</div>
	//   					// </div>`
		  
	// 	      $("#weather").html(html);
	// 	      $('#weather > div > div:nth-child(1)').textfillWeather({ maxFontPixels: 1.5});
	// 	    },
	// 	    error: function(error) {
	// 	    	console.debug(error);
	// 	      $("#weather").html('<p>'+error+'</p>');
	// 	    }
	//   	});
	// }

	function getWeather(){
		$.ajax({
			url : 'http://api.openweathermap.org/data/2.5/weather?id=7279602&APPID=41d1f5866f18791648facda241386923&units=metric',
			success : function(weather){
			      html = 	`<div class="row" style="height:100%">
	  				<div class="col-xs-12" style="padding:0;">
	  					<div id="weatherContent">`+weather.main.temp+`&deg; C `+weather.weather[0].main+`</div>
					</div>`
		      $("#weather").html(html);
		      $('#weather > div > div:nth-child(1)').textfillWeather({ maxFontPixels: 1.5});
			},
			error : function(jqXHR, textstatus){
				console.log(textstatus);
			}
		})
	}
	getWeather();
	updateWeather();
  	function updateWeather() {
	    setTimeout(function() {
	    	if($("#weather").children().length == 0){
				getWeather();
				updateWeather();
			}
	    }, 300 * 1000)
	}


	function getCurrentISODate(){
		start = moment(new Date());
		remainder = start.minute() % 20;
		return new moment(start).subtract(remainder,'minutes').startOf('minute').toISOString();
	}

	function getResType(resourceName){
		var resourceType = 'image'
		if(resourceName != ""){
			if(resourceName.split('.')[1].toUpperCase() == "JPG" || resourceName.split('.')[1].toUpperCase() == "JPEG" || resourceName.split('.')[1].toUpperCase() == "PNG"){
				resourceType = 'image'
			}else if(resourceName.split('.')[1].toUpperCase() == "MP4"){
				resourceType = 'video'
			}
		}else{
			resourceType = "image";
		}
		return resourceType;
	}


	function getAvailableCampaign(callback){
		getCampaignIntervalData(new moment(new Date()).startOf('hour').toISOString(),function(campaignData){
			app.visibleCampaign = "campaign1";
			app.firstChannelIntervalTime = 0.016667;
			if(campaignData && campaignData.campName){
				if(campaignData.campName =="campaign1"){
					$(".campaign1").show();
					$(".campaign2").hide();
					app.visibleCampaign = "campaign1";
				}else if(campaignData.campName == "campaign2"){
					$(".campaign2").show();
					$(".campaign1").hide();
					app.visibleCampaign = "campaign2";
				}else{
					app.visibleCampaign = "campaign1"
				}
			}else{
				app.visibleCampaign = "campaign1"
			}

			callback(app.visibleCampaign);
		});
	}


	function checkForVideoAndSOS(){
		// time as 1 mnute for video
		
		app.checkSOSData = function(){	
			getSOSData(new moment(new Date()).startOf('minute').toISOString(),function(sosData){
				if(!(Object.keys(sosData).length === 0 && sosData.constructor === Object)){
					// hide video and show sos
					$(".sosContent").show();
					$(".contentHolder5").empty();
					$(".contentHolder5").append('<div class="warningText"><span>'+ sosData.data.text +'</span></div>');
					$('.warningText').textfill({ maxFontPixels: 2 });
					$('.warningText').textverticalalign({ initialTop: 27 });
					app.sosIntervalTime = (((30 * 60) - new moment(new Date()).seconds()) * 1000)/60000
				}else{
					$(".videoContentRow").hide();
					$(".sosContent").hide();
					$(".contentHolder6").empty();
					app.sosIntervalTime = ((60 - new moment(new Date()).seconds()) * 1000)/60000
				}
			})
			clearTimeout(app.sosInterval);
			app.sosInterval = setTimeout(function(){
				app.checkSOSData();
			},app.sosIntervalTime * 60000)
		}
		app.checkSOSData();
	}



	function initializeApp(campaignName){
		console.log('Initializing channels.....')
		app.visibleCampaign = campaignName;
		$(".loadingText").text('Just there...')
// initializeFirstChannel()

		function initializeFirstChannel(){
			getChannelData('ch1_p',getCurrentISODate(),function(firstChannelData){

				clearTimeout(app.firstChannelInterval);
				if(!(Object.keys(firstChannelData).length === 0 && firstChannelData.constructor === Object)){
						console.log('channel 1 updated')
						$(".ovalWrapper").text(firstllArray.indexOf(firstChannelData.resName)+1 + "/" + firstllArray.length);
						if(getResType(firstChannelData.resName) == "image"){
							$("." + app.visibleCampaign + " .contentHolder1").empty();
							$("." + app.visibleCampaign + " .contentHolder1").append(app.imageElements.image1);
							$("." + app.visibleCampaign + " .contentHolder1 #img1").attr('src', URL + "/" + app.resourceFolder + "/" + firstChannelData.resName);
							$("." + app.visibleCampaign + " .contentHolder1 #vid1").hide();
							$("." + app.visibleCampaign + " .contentHolder1 #img1").show();
						}else if(getResType(firstChannelData.resName) == "video"){
							console.log($("." + app.visibleCampaign + " .contentHolder1"));
							$("." + app.visibleCampaign + " .contentHolder1").empty();
							$("." + app.visibleCampaign + " .contentHolder1").append(app.videoElements.video1);
							$("." + app.visibleCampaign + " .contentHolder1 #vid1").append('<source src="' + URL + "/" + app.resourceFolder + "/" + firstChannelData.resName + '" type="video/mp4">');
							$("." + app.visibleCampaign + " .contentHolder1 #img1").hide();
							$("." + app.visibleCampaign + " .contentHolder1 #vid1").show();
						}

					if(firstChannelData.duration){
						endTimeFOrCurrentSlot = moment(new Date());
						remainder = firstChannelData.duration - endTimeFOrCurrentSlot.minute() % firstChannelData.duration;
						nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
						if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 
						currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();
						duration = nextEndTimeMinute - currentTimeMinute;
						app.firstChannelIntervalTime = duration;
					}
					else{
						console.log("Got planned Data for " + "channel1");
						endTimeFOrCurrentSlot = moment(new Date());
						remainder = 20 - endTimeFOrCurrentSlot.minute() % 20;
						nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
						if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

						currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

						duration = nextEndTimeMinute - currentTimeMinute;
						app.firstChannelIntervalTime = duration;
					}
				}

				console.warn("ch1-> "+app.firstChannelIntervalTime)
				app.firstChannelInterval = setTimeout(function(){
					initializeFirstChannel();
				},app.firstChannelIntervalTime * 60000);
				$(".loadingDiv").hide()
			});
		}

		function initializeSecondChannel(){
			getChannelData('ch2_p',getCurrentISODate(),function(secondChannelData){
				clearTimeout(app.secondChannelInterval);
				if(!(Object.keys(secondChannelData).length === 0 && secondChannelData.constructor === Object)){
						console.log('channel 2 updated')
						$("#contentList li").removeClass('ellip-line-active')
						$.map($("#contentList li"),function(key,val){
							if(key.innerText == secondChannelData.resName.split("_")[0]) $(key).addClass('ellip-line-active')
						})
						if(getResType(secondChannelData.resName) == "image"){
							$("." + app.visibleCampaign + " .contentHolder2").empty();
							$("." + app.visibleCampaign + " .contentHolder2").append(app.imageElements.image2);
							$("." + app.visibleCampaign + " .contentHolder2 #img2").attr('src', URL + "/" + app.advtFolder + "/" + secondChannelData.resName);
							$("." + app.visibleCampaign + " .contentHolder2 #vid2").hide();
							$("." + app.visibleCampaign + " .contentHolder2 #img2").show();

						}else if(getResType(secondChannelData.resName) == "video"){
							$("." + app.visibleCampaign + " .contentHolder2").empty();
							$("." + app.visibleCampaign + " .contentHolder2").append(app.videoElements.video2);
							$("." + app.visibleCampaign + " .contentHolder2 #vid2").append('<source src="' + URL + "/" + app.advtFolder + "/" + secondChannelData.resName + '" type="video/mp4">');
							$("." + app.visibleCampaign + " .contentHolder2 #img2").hide();
							$("." + app.visibleCampaign + " .contentHolder2 #vid2").show();
						}

					
						if(secondChannelData.duration){
							// if user starts in between time then calcultae remaining time 
							// for that slot and get next content after that duration
							endTimeFOrCurrentSlot = moment(new Date());
							remainder = 5 - endTimeFOrCurrentSlot.minute() % 5;
							nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							duration = nextEndTimeMinute - currentTimeMinute;
							app.secondChannelIntervalTime = duration;
						}else{

							// if user starts in between time then calcultae remaining time 
							// for that slot and get next content after that duration
							endTimeFOrCurrentSlot = moment(new Date());
							remainder = 20 - endTimeFOrCurrentSlot.minute() % 20;
							nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
							if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

							currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

							duration = nextEndTimeMinute - currentTimeMinute;
							app.secondChannelIntervalTime = duration;
						}
				}
				console.warn("ch2-> "+app.secondChannelIntervalTime)
				app.secondChannelInterval = setTimeout(function(){
					initializeSecondChannel();
				},app.secondChannelIntervalTime * 60000)
			});
		}

		// function initializeThirdChannel(){
		// 	getChannelData('ch3_p',getCurrentISODate(),function(thirdChannelData){
		// 		clearTimeout(app.thirdChannelInterval);
		// 		if(!(Object.keys(thirdChannelData).length === 0 && thirdChannelData.constructor === Object)){
		// 				console.log('channel 3 updated')
		// 				if(getResType(thirdChannelData.resName) == "image"){
		// 					$("." + app.visibleCampaign + " .contentHolder3").empty();
		// 					$("." + app.visibleCampaign + " .contentHolder3").append(app.imageElements.image3);
		// 					$("." + app.visibleCampaign + " .contentHolder3 #img3").attr('src', URL + "/" + app.advtFolder + "/" + thirdChannelData.resName);
		// 					$("." + app.visibleCampaign + " .contentHolder3 #vid3").hide();
		// 					$("." + app.visibleCampaign + " .contentHolder3 #img3").show();

		// 				}else if(getResType(thirdChannelData.resName) == "video"){
		// 					$("." + app.visibleCampaign + " .contentHolder3").empty();
		// 					$("." + app.visibleCampaign + " .contentHolder3").append(app.videoElements.video3);
		// 					$("." + app.visibleCampaign + " .contentHolder3 #vid3").append('<source src="' + URL + "/" + app.advtFolder + "/" + thirdChannelData.resName + '" type="video/mp4">');
		// 					$("." + app.visibleCampaign + " .contentHolder3 #img3").hide();
		// 					$("." + app.visibleCampaign + " .contentHolder3 #vid3").show();
		// 				}
		// 				if(thirdChannelData.duration){
		// 					// if user starts in between time then calcultae remaining time 
		// 					// for that slot and get next content after that duration
		// 					endTimeFOrCurrentSlot = moment(new Date());
		// 					remainder = 5 - endTimeFOrCurrentSlot.minute() % 5;
		// 					nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
		// 					if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

		// 					currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

		// 					duration = nextEndTimeMinute - currentTimeMinute;
		// 					app.thirdChannelIntervalTime = duration;
		// 				}else{
		// 					// if user starts in between time then calcultae remaining time 
		// 					// for that slot and get next content after that duration
		// 					endTimeFOrCurrentSlot = moment(new Date());
		// 					remainder = 20 - endTimeFOrCurrentSlot.minute() % 20;
		// 					nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
		// 					if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 

		// 					currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();

		// 					duration = nextEndTimeMinute - currentTimeMinute;
		// 					app.thirdChannelIntervalTime = duration;
		// 				}
		// 		}
		// 		console.warn("ch3-> "+app.thirdChannelIntervalTime)
		// 		app.thirdChannelInterval = setTimeout(function(){
		// 			console.log('started')
		// 			initializeThirdChannel();
		// 		},app.thirdChannelIntervalTime * 60000)
		// 		$(".loadingDiv").hide()
		// 	});
		// }

		initializeFullscreenChannel();
		function initializeFullscreenChannel(){
			getChannelData('fs',new moment(new Date()).startOf('hour').toISOString(),function(fullscreenChannelData){
				clearTimeout(app.fullscreenChannelInterval);
				if(!(Object.keys(fullscreenChannelData).length === 0 && fullscreenChannelData.constructor === Object)){
						app.slide();
						$(".advertisingText").show();
						console.log('fullscreenChannel updated')
						if(getResType(fullscreenChannelData.resName) == "image"){
							$(".contentHolder7").empty();
							$(".contentHolder7").append(app.imageElements.image7);
							$(".contentHolder7 #img7").attr('src', URL + "/" + app.advtFolder + "/" + fullscreenChannelData.resName);
							$(".contentHolder7 #vid7").hide();
							$(".contentHolder7 #img7").show();

						}else if(getResType(fullscreenChannelData.resName) == "video"){
							$(".contentHolder7").empty();
							$(".contentHolder7").append(app.videoElements.video7);
							$(".contentHolder7 #vid7").append('<source src="' + URL + "/" + app.advtFolder + "/" + fullscreenChannelData.resName + '" type="video/mp4">');
							$(".contentHolder7 #img7").hide();
							$(".contentHolder7 #vid7").show();
						}

						// if user starts in between time then calcultae remaining time 
						// for that slot and get next content after that duration
						endTimeFOrCurrentSlot = moment(new Date());
						remainder = 10 - endTimeFOrCurrentSlot.minute() % 10;
						nextEndTimeMinute = moment(endTimeFOrCurrentSlot).add(remainder,"minutes").startOf('minute').minute()
						if(nextEndTimeMinute == 0) nextEndTimeMinute = 60; 
						currentTimeMinute = moment(moment(new Date()).startOf('minute').toISOString()).minute();
						duration = nextEndTimeMinute - currentTimeMinute;
						app.fullscreenChannelIntervalTime = duration;

						slideToggleTimeout();
						function slideToggleTimeout(){
							cntr = 14;
							cntrInterval = setInterval(function(){
								$(".advertisingText span:nth-child(2)").text("(" + cntr-- + ")")
							},1000)
							setTimeout(function(){
								clearInterval(cntrInterval)
								app.slide();
							$(".fullscreenRow").hide();
							$(".advertisingText").hide();
							},.25 * 60000)
						}
				}
				console.warn("fullscreenChannel-> "+app.fullscreenChannelIntervalTime)
				app.fullscreenChannelInterval = setTimeout(function(){
					initializeFullscreenChannel();
				},app.fullscreenChannelIntervalTime * 60000)
			});
		}

		function initializeFourthChannel(){
			getChannelData('ticker',getCurrentISODate(),function(fourthChannelData){
				clearTimeout(app.fourthChannelInterval);
				if(!(Object.keys(fourthChannelData).length === 0 && fourthChannelData.constructor === Object)){
						console.log('channel 4 updated')
							$(".contentHolder4").empty();
							$(".contentHolder4>div.marquee").empty();
							$(".contentHolder4").append('<div class="marquee"></div>');
							$(".contentHolder4>div.marquee").append('<p>' + fourthChannelData.text + '</p>');
							$(".contentHolder4>div.marquee").marquee({duration: 10000});
				}
				console.warn("ch4-> "+app.fourthChannelIntervalTime)
				app.fourthChannelInterval = setTimeout(function(){
					initializeFourthChannel();
				},app.fourthChannelIntervalTime * 60000)
			});
		}

		app.slide = function(){
			slideOutELement = ""
			slideInElement = ""
			// if($(".multiContent div.multiContentRow").position().left == 0){
			if($(".multiContent div.multiContentRow")[0].style.left == "0px" || 
				$(".multiContent div.multiContentRow")[0].style.left == ""){
				slideOutELement = 'multiContentRow';
				slideInElement = 'fullscreenRow';
				$(".fullscreenRow").show();
			}else{
				slideOutELement = 'fullscreenRow';
				slideInElement = 'multiContentRow';
			}

			$(".multiContent div." + slideOutELement).animate({
			        left: '-100%'
			    }, 500, function() {
			        // $(".multiContent div." + slideOutELement).css('left', '100%');
			        $(".multiContent div.multiContentRow")[0].style.left = "100%";
			        $(".multiContent div.fullscreenRow")[0].style.left = "100%";
			    });

		    $('.multiContent div.' + slideInElement ).animate({
		        left: '0'
		    }, 500);
		}

		app.authorizeUser = function(){
		    firebase.auth().signInWithEmailAndPassword("lgd.beta.slave@gmail.com", "LGDsl@ve").then(function(data){
		      // console.log('signed in')
		      app.isuserloggedin = true;
		    }).catch(function(err){
		    	app.ifLoginRequested = false;
		    	console.log(err)
		    })
		}
		
		// db.collection("ch1_g").doc(app.deviceid).collection('data')
		firebase.firestore().collection("ch1_g").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	        	app.ifLoginRequested = true;
			    app.authorizeUser()
			  }
	       	   	firstll = new CircularList();
    	      	firstllArray = [];
        	  	querySnapshot.forEach(function(doc) {
	              	value = doc.data();
	              	firstllArray.push(value.resName);
		            firstll.add(value.resName, value.duration);
		        });
		        try{
		        	tag_sc = "";
		        	if($(".contentHolder1").children()[0].tagName == "video"){
		        		tag_sc = $(".contentHolder1 video source")[0].src
		        	}else if($(".contentHolder1").children()[0].tagName == "IMG"){
		        		tag_sc = $(".contentHolder1 img")[0].src
		        	}
		        	fileName = tag_sc.match(/(?:[^/][\d\w\-\.]+)$(?<=(?:.jpg)|(?:.mp4))/)[0]
			        $(".ovalWrapper").text(firstllArray.indexOf(fileName)+1 + "/" + firstllArray.length);
		        }catch(ex){console.log('error while updating general channel doc count ' + ex)}
            console.log("Initializing Channel 1 general...=>" + querySnapshot.size);
	    });

	    firebase.firestore().collection("ch1_p").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	      	if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	      		app.ifLoginRequested = true;
			    app.authorizeUser()
			  }
      		console.log("Initializing Channel 1 planned...=>" + querySnapshot.size);
          	initializeFirstChannel();
      	});  


		firebase.firestore().collection("ch2_p").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	          if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	          	app.ifLoginRequested = true;
			    app.authorizeUser();
			  }
	          	secondll = new CircularList();
		          	querySnapshot.forEach(function(doc) {
		              	value = doc.data();
	              		secondll.add(value.resName, value.duration);
		        	});
	              	console.log("Initializing Channel 2 planned...=>" + querySnapshot.size);
	          	initializeSecondChannel();
      	});

	    // firebase.firestore().collection("ch3_p").doc(app.groupName).collection('data')
	    //   .onSnapshot(function(querySnapshot) {
	    //       if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	    //       	app.ifLoginRequested = true;
			  //   app.authorizeUser();
			  // }
	    //       	thirdll = new CircularList();
		   //        	querySnapshot.forEach(function(doc) {
	    //         		value = doc.data();
		   //            	thirdll.add(value.resName, value.duration);
		   //      	});
     //          	console.log("Initializing Channel 3 general...=>" + querySnapshot.size);
	    //       	initializeThirdChannel();
     //  	});

		var listItem1 = "";
		var listItem2 = "";
	    firebase.firestore().collection("ch2_sh1").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	        	app.ifLoginRequested = true;
			    app.authorizeUser();
			  }
	          secondllSH1 = new CircularList();
		            querySnapshot.forEach(function(doc) {
		               value = doc.data();
		               if(typeof(value.resName.split("_")[0]) != 'undefined')
		              		listItem1 += "<li>" + value.resName.split("_")[0] + "</li>"
		               secondllSH1.add(value.resName, value.duration);
		            });
		        if(app.listToShow == 1){
		            $("#contentList").empty()
		          	$("#contentList").append(listItem1);
		          	$("#contentList li").addClass('ellip-line');
		        }
                console.log("Initializing Channel 2 shared1 ...=>" + querySnapshot.size);
	    });

	    firebase.firestore().collection("ch2_sh2").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	        if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	        	app.ifLoginRequested = true;
			    app.authorizeUser();
			  }
			  // listItem = "<li>heelo.jpg</li><li>aksd.jpg</li><li>kwehfiwjef.jpg</li>"
	          secondllSH2 = new CircularList();
	          		querySnapshot.forEach(function(doc) {
	              		value = doc.data();
	              		if(typeof(value.resName.split("_")[0]) != 'undefined')
		              		listItem2 += "<li>" + value.resName.split("_")[0] + "</li>"
	              		secondllSH2.add(value.resName, value.duration);
	        		});
	        	if(app.listToShow == 2){
		          	$("#contentList").empty()
		          	$("#contentList").append(listItem2);
		          	$("#contentList li").addClass('ellip-line');
	          	}


              	console.log("Initializing Channel 2 shared2...=>" + querySnapshot.size);
	    });

	    // firebase.firestore().collection("ch3_sh1").doc(app.groupName).collection('data')
	    //   .onSnapshot(function(querySnapshot) {
	    //     if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	    //     	app.ifLoginRequested = true;
			  //   app.authorizeUser();
			  // }
	    //       thirdllSH1 = new CircularList();
	    //       		querySnapshot.forEach(function(doc) {
	    //           		value = doc.data();
	    //           		thirdllSH1.add(value.resName, value.duration);
	    //     		});
     //          	console.log("Initializing Channel 3 shared1...=>" + querySnapshot.size);
	    // });

	    // firebase.firestore().collection("ch3_sh2").doc(app.groupName).collection('data')
	    //   .onSnapshot(function(querySnapshot) {
	    //     if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	    //     	app.ifLoginRequested = true;
			  //   app.authorizeUser();
			  // }
	    //       thirdllSH2 = new CircularList();
	    //       		querySnapshot.forEach(function(doc) {
	    //           		value = doc.data();
	    //           		thirdllSH2.add(value.resName, value.duration);
	    //     		});
     //          	console.log("Initializing Channel 3 shared2...=>" + querySnapshot.size);
	    // });

	    // firebase.firestore().collection("ticker").doc(app.deviceid)
	    firebase.firestore().collection("ticker").doc(app.groupName)
	      .onSnapshot(function(querySnapshot) {
	          	if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	          		app.ifLoginRequested = true;
		    		app.authorizeUser();
			  	}
          	initializeFourthChannel();
      	});

	    firebase.firestore().collection("sos").doc(app.groupName).collection('data')
	      .onSnapshot(function(querySnapshot) {
	          	if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
	          		app.ifLoginRequested = true;
			    	app.authorizeUser();
			  	}
      	});  
	}
}