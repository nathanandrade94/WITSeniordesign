var BOSH_SERVICE = 'http://nathan-thinkpad-w541.local:7070/http-bind/';
var connection = null;

function log(msg) 
{
    $('#log').append('<div></div>').append(document.createTextNode(msg));
}

function onConnect(status)
{
    if (status == Strophe.Status.CONNECTING) {
	log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
	log('Strophe failed to connect.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
	log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
	log('Strophe is disconnected.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
	log('Strophe is connected.');
	log('ECHOBOT: Send a message to ' + connection.jid + 
	    ' to talk to me.');

	var message = "some message";
    var to = 'colin@nathan-thinkpad-w541';
    if (message && to) {
        var msg = $msg({
            to: to,
            type: 'chat'
        })
            .cnode(Strophe.xmlElement('body', message)).up()
            .c('active', { xmlns: "http://jabber.org/protocol/chatstates" });

        connection.send(msg);

        log('I sent ' + to + ': ' + message);
}
	connection.addHandler(onMessage, null, 'message', null, null, null); 
	connection.send($pres().tree());
    }
}

function onMessage(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
	var body = elems[0];

	log('ECHOBOT: I got a message from ' + from + ': ' + 
	    Strophe.getText(body));
    
	alert(from +"\n"+ Strophe.getText(body));
    }

    // we must return true to keep the handler alive.  
    // returning false would remove it after it finishes.
    return true;
}
$(document).ready(function () {
    connection = new Strophe.Connection(BOSH_SERVICE);


    $('#connect').bind('click', function () {
	var button = $('#connect').get(0);
	if (button.value == 'connect') {
	    button.value = 'disconnect';

	    connection.connect('nate@nathan-thinkpad-w541.local',
			       'design1',
			       onConnect);
	} else {
	    button.value = 'connect';
	    connection.disconnect();
	}
    });
    $('#BrokenHeadLight').bind('click', function (){
    	var message = "Broken Head Light";
	    var to = $('#to').get(0).value;
	    if (message && to) {
	        var msg = $msg({
	            to: to,
	            type: 'chat'
	        })
	            .cnode(Strophe.xmlElement('body', message)).up()
	            .c('active', { xmlns: "http://jabber.org/protocol/chatstates" });

	        connection.send(msg);

	        log('I sent ' + to + ': ' + message);
		}
	});
	$('#BrokenTailLight').bind('click', function (){
    	var message = "Broken Tail Light";
	    var to = $('#to').get(0).value;
	    if (message && to) {
	        var msg = $msg({
	            to: to,
	            type: 'chat'
	        })
	            .cnode(Strophe.xmlElement('body', message)).up()
	            .c('active', { xmlns: "http://jabber.org/protocol/chatstates" });

	        connection.send(msg);

	        log('I sent ' + to + ': ' + message);
		}	
	});
	$('#GasCapOpen').bind('click', function (){
    	var message = "Gas Cap Open";
	   	var to = $('#to').get(0).value;
	    if (message && to) {
	        var msg = $msg({
	            to: to,
	            type: 'chat'
	        })
	            .cnode(Strophe.xmlElement('body', message)).up()
	            .c('active', { xmlns: "http://jabber.org/protocol/chatstates" });

	        connection.send(msg);

	        log('I sent ' + to + ': ' + message);
		}	
	});
	$('#TrunkOpen').bind('click', function (){
    	var message = "Trunk Open";
	    var to = $('#to').get(0).value;
	    if (message && to) {
	        var msg = $msg({
	            to: to,
	            type: 'chat'
	        })
	            .cnode(Strophe.xmlElement('body', message)).up()
	            .c('active', { xmlns: "http://jabber.org/protocol/chatstates" });

	        connection.send(msg);

	        log('I sent ' + to + ': ' + message);
		}	
	});
});