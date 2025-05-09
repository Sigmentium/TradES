let Data, TimeData;
let Device;

const Chats = document.getElementById('Chats');

function SaveChat(data) {
    localStorage.setItem('Chats', JSON.stringify(data));

    location.href = 'View.html';
}

function GetChat(name) {
    TimeData = JSON.parse(localStorage.getItem('Chats'));
    TimeData = TimeData[name];

    localStorage.setItem('TimeName', name);
    localStorage.setItem('TimeData', JSON.stringify(TimeData));
    localStorage.setItem('TimeDevice', Device);

    location.href = 'View.html';
}

window.onload = () => {
    if (!localStorage.getItem('Chats')) {
        alert('У вас отсутствуют чаты!\nЧтобы создать новый чат, нажмите + в правом верхнем углу экрана.');

        SaveChat({});
        
        window.location.reload();
    }
    else {
        Data = JSON.parse(localStorage.getItem('Chats'));

        for (let A of Object.keys(Data)) {
            Chats.innerHTML += `<div id="Chat" onclick="GetChat('${A}')"><H3>${A}</H3></div>`;
        }
    }
}

document.getElementById('Create').addEventListener('click', function() {
    document.getElementById('Overlay').style.display = 'block';
    document.getElementById('Device').style.display = 'block';

    bluetoothSerial.scan(function(devices) {
        devices.forEach(function(device) {
            // let Option = document.createElement('option');
            // Option.value = device.id;
            // Option.text = device.name;

            // <option value="${device.id}">${device.name}</option>

            document.getElementById('SelectedDevice').innerHTML += `<option value="${device.id}">${device.name}</option>`;
        });
    });
});

document.getElementById('SelectDevice').addEventListener('click', function() {
    const SelectedDevice = document.getElementById('SelectedDevice').value;

    if (SelectedDevice == null) {
        alert('Для начала надо выбрать устройство');
    }
    else {
        Device = SelectedDevice;
    }
});

document.getElementById('NewChat').addEventListener('click', function() {
    const Name = document.getElementById('Name').value;

    for (let A in Data) {
        if (A === Name) {
            alert('Чат с таким названием уже существует!');
            return;
        }
    }

    Data[Name] = {};
    SaveChat(Data);

    alert('Успешное создание!');

    window.location.reload();
});

document.getElementById('Overlay').addEventListener('click', function() {
    document.getElementById('Overlay').style.display = 'none';
    document.getElementById('Device').style.display = 'none';
    document.getElementById('New').style.display = 'none';
});