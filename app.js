var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Gpio = require('onoff').Gpio;

var web_port = process.env.PORT || 3000;

var contents = [ 'weather.html', 'album.html', 'calendar.html', 'subway.html' ];
/*		
var page = [[ 'page1-1.html', 'page1-2.html', 'page1-3.html' ],
			[ 'page2-1.html', 'page2-2.html', 'page2-3.html' ],
			[ 'page3-1.html', 'page3-2.html', 'page3-3.html' ]];
*/

var chkIn = 0;

var gesture = new Gpio(17, 'in', 'both');	// to make event by gesture.py
var input1  = new Gpio(27, 'in');			// bit1 of var chkIn
var input0  = new Gpio(22, 'in');			// bit0 of var chkIn
											// chkIn = 0(00) up
gesture.watch(function (err, val)			// chkIn = 1(01) down
{											// chkIn = 2(10) left
	var _bit1 = input1.readSync();			// chkIn = 3(11) right
	var _bit0 = input0.readSync();
	
	if(_bit1 == 0)	chkIn &= ~2;
	else			chkIn |=  2;	
	
	if(_bit0 == 0)	chkIn &= ~1;
	else			chkIn |=  1;
	
	console.log('input : ' + chkIn );
	selContents();
});
	
var i = 0;
var cntUpDn = 0;
var flg_1st  = true;

function selContents()
{
			
	switch(chkIn)
	{
	case 0:
		if     (cntUpDn != 1)	cntUpDn++;
		else					cntUpDn = 1;
	
		if     (cntUpDn == 1)	io.emit('url data', "blank.html");
		else if(cntUpDn == 0)	io.emit('url data', contents[i]);
		
		break;
	
	case 1:
		if    (cntUpDn != -1)	cntUpDn--;
		else					cntUpDn = -1;
		
		if     (cntUpDn == -1)	io.emit('url data', "index.html");
		else if(cntUpDn ==  0)	io.emit('url data', contents[i]);
			
		break;
		
	case 2:
		if(cntUpDn == 0)
		{
			if(flg_1st == true)
			{
				flg_1st = false;	i=0;
			}
			else
			{
				if(i<=0)	i=3;	else	i--;			
			}
			io.emit('url data', contents[i]);
		}	
		break; 
		
	case 3:
		if(cntUpDn == 0)
		{
			if(flg_1st == true)
			{
				flg_1st = false;	i=0;
			}
			else
			{
				if(i>=3)	i=0;	else	i++;
			}
			io.emit('url data', contents[i]);
		}
		break;
		
	default:
		break;
	}
}

// set path ./public as web root
app.use(express.static(__dirname + '/public'));

http.listen(web_port, function(){
    console.log('listening on *:' + web_port);
});
