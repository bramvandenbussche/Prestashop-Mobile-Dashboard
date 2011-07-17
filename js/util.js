
var html_status_none = '&nbsp;';
var html_status_loading = '<img src="images/loading.gif" align="absmiddle" alt="loading" /> Loading data...';
var html_status_render = '<img src="images/loading.gif" align="absmiddle" alt="loading" /> Rendering data...';

function SetStatus(status) {
    switch (status) {
        case "none":
            $("#status").html(html_status_none);
            break;
        
        case "loading":
            $("#status").html(html_status_loading);
            break;
            
        case "render":
            $("#status").html(html_status_render);
            break;
    }
}

function AddPrePendingZeros(str, nrOfZeros) {
    var totalNrOfZeros = '';
    for (i = 0; i <= nrOfZeros; i++) {
        totalNrOfZeros += '0';    }
    
    return Right(totalNrOfZeros + str, nrOfZeros);
}

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function SerializeList(list, rootnodename) {
    var str = '<?xml version="1.0" encoding="UTF-8"?>';
    
    str += '<' + rootnodename + '>';
 
    for (key in list) {
        str += list[key].Serialize();
    }
    str += '</' + rootnodename + '>';
    
    return str;
}