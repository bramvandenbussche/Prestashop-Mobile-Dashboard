
function GetTemplateByName(_templateName) {
    var data = null;
    var file = new air.File();
    var stream = null;
    
    file = air.File.applicationDirectory.resolvePath("templates/" + _templateName + ".tpl");
    
    stream = new air.FileStream();
    stream.open(file, air.FileMode.READ);
    data = stream.readMultiByte(stream.bytesAvailable, air.File.systemCharset);
    stream.close();
    
    return data;
}


function SaveXmlToFile(xml, filename) {

}


function LoadXmlFromFile(filename) {
    var data = null;
    var file = new air.File();
    var stream = null;
    
    file = air.File.applicationStorageDirectory.resolvePath(filename);
    
    if (file != undefined) {
        stream = new air.FileStream();
        stream.open(file, air.FileMode.READ);
        data = stream.readMultiByte(stream.bytesAvailable, air.File.systemCharset);
        stream.close();
    }
    
    return data;
}