//useful for sending content as a file, when the content is generated on the fly and not read directly from hdd

var VirtualFile = function(content, mime){
	var ret = {};
	this.content = content;
	this.mime = mime || "text/plain";
}

module.exports = VirtualFile;