window.onerror = function(err){
	alert(err)
}

// function getCampaignIntervalData(time,callback){
// 	getCampaignFromFirebase(time,function(data){
// 		callback(data);
// 	})
// }

// function getVideoData(time,callback){
// 	getVideoFromFirebase(time,function(data){
// 		callback(data);
// 	})
// }

function getSOSData(time,callback){
	getSOSFromFirebase(time,function(data){
		callback(data);
	})
}

function getChannelData(channel,currentTime,callback){
	getFileBasedOnTime(channel,currentTime,function(data){
		callback(data);
	})
}