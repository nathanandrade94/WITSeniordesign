var xmppconn = {
connection: null,
handle_message: function (message) {
var full_jid = $(message).attr('from');
//alert(full_jid);
var uname  = Strophe.getNodeFromJid(full_jid);
var body1 = $(message).find('body');
	if (body1.length > 0) {
		body1 = body1.text();
    }
    else {
    	body1 = null;
    }
var div = $("<div></div>");
body1 = uname+': '+body1;
div.append(body1);
div.prependTo('#chatarea');// showing messages in div
return true;
}
};
var conn = new Strophe.Connection('http://nathan-thinkpad-w541:7070/http-bind/'); //Note how I have used the BOSH url
var jid = "test@nathan-thinkpad-w541"; //Note how I have used desktop in my case it is my server name
var sendjid = "nate@nathan-thinkpad-w541";
var pwd = 'design1';
conn.connect(jid, pwd, function (status) {
	if (status === Strophe.Status.CONNECTED) {
		$(document).trigger('connected');
	}
	else if (status === Strophe.Status.DISCONNECTED) {
		$(document).trigger('disconnected');
	}
	xmppconn.connection = conn;
                });
$(document).bind('connected', function () {      
xmppconn.connection.addHandler(xmppconn.handle_message,
null, "message", "chat");
xmppconn.connection.send($pres());

 var msg = $msg({to: sendjid, type: 'chat'}).c('body').t(text);
conn.send(msg);//This is the connection object
});