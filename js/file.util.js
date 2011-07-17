
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
    air.trace("Writing to file...");
    var data = xml;
    var file = new air.File();
    var stream = null;
    
    file = air.File.applicationStorageDirectory.resolvePath(filename);
    
    stream = new air.FileStream();
    stream.open(file, air.FileMode.WRITE);
    stream.writeUTFBytes(xml);
    stream.close();
}


function LoadXmlFromFile(filename) {
    var data = null;
    var file = new air.File();
    var stream = null;
    
    file = air.File.applicationStorageDirectory.resolvePath(filename);
    
    air.trace(file.nativePath);
    
    if (file.exists) {
        stream = new air.FileStream();
        stream.open(file, air.FileMode.READ);
        data = stream.readMultiByte(stream.bytesAvailable, air.File.systemCharset);
        stream.close();
    }
    
    return data;
}