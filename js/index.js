let Data = GetData();

function GetData() {
    window.resolveLocalFileSystemURL(cordova.file.dataDrectory + 'Data.json', (fileEntry) => {
        fileEntry.file((file) => {
            const reader = new FileReader;

            reader.onloadend = () => {
                Data = JSON.parse(reader.result)
            };

            reader.readAsText(file);
        });
    });
}

window.onload = function() {}