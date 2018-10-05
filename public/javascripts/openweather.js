var baseURL = "api.openweathermap.org/data/2.5/weather?";
var cityID  = "1835848";		// Seoul
var appKey  = "";	// use your api-key which get from openweathermap
var url = "http://" + baseURL + "id=" + cityID + "&appid=" + appKey;
var temp;
var num;
var icon;
var interval = 2000;
		
function get_weather(){	
		
	$.getJSON(url, function(data) {
				
		temp = (parseFloat(data.main.temp)-273.0).toFixed(1);
		num  = parseInt(data.weather[0].id);
			
		if     ( num >= 200 && num < 300 )	icon = "images/icon/2xx.png";
		else if( num >= 300 && num < 400 )	icon = "images/icon/3xx.png";
		else if( num >= 500 && num < 510 )	icon = "images/icon/50x.png";
		else if( num == 511              )	icon = "images/icon/511.png";
		else if( num >= 520 && num < 600 )	icon = "images/icon/52x.png";
		else if( num >= 600 && num < 700 )	icon = "images/icon/6xx.png";
		else if( num >= 700 && num < 800 )	icon = "images/icon/7xx.png";
		else if( num == 800              )	icon = "images/icon/800.png";
		else if( num == 801              )	icon = "images/icon/801.png";
		else if( num == 802              )	icon = "images/icon/802.png";
		else if( num == 803              )	icon = "images/icon/803.png";
		else if( num == 804              )	icon = "images/icon/804.png";
		else								icon = "images/icon/000.png";	
	});
	
	var temper = temp + "°C";
	
	//$('#disp_cal').text(calendar);
	$('#temper').text(temper);	
	$('#icon').attr('src',icon);
}

get_weather();
window.setInterval(get_weather, interval);

