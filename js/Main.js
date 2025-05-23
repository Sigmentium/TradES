let TimeChat;
let Chats = JSON.parse(localStorage.getItem('Chats')) || {};
let TimeName;
let TimeDevice;
const ChatsPath = document.getElementById('Chats');
function GetChat(name) {
    TimeChat = { ...Chats[name] };
    localStorage.setItem('TimeChat', JSON.stringify(TimeChat));
    localStorage.setItem('TimeName', name);
    location.href = 'View';
}
function SaveData(data) {
    localStorage.setItem('Chats', JSON.stringify(data));
    window.location.reload();
}
for (let A of Object.keys(Chats)) {
    ChatsPath.innerHTML += `<div id="Chat" onclick="GetChat('${A}')"><H3>${A}</H3></div>`;
}
document.getElementById('Create').addEventListener('click', () => {
    //
    // Ищем устройства
    //
    document.getElementById('Overlay').style.display = 'block';
    document.getElementById('Device').style.display = 'block';
});
document.getElementById('SelectDevice').addEventListener('click', () => {
    if (!TimeDevice) {
        alert('Необходимо указать устройство');
        return;
    }
    document.getElementById('Device').style.display = 'none';
    document.getElementById('New').style.display = 'block';
});
document.getElementById('NewChat').addEventListener('click', () => {
    if (!TimeName) {
        alert('Необходимо указать имя');
        return;
    }
    Chats[TimeDevice] = {
        "Device": TimeDevice
    };
    SaveData(Chats);
});
document.getElementById('Overlay').addEventListener('click', () => {
    TimeName = undefined;
    TimeDevice = undefined;
    document.getElementById('Overlay').style.display = 'none';
    document.getElementById('Device').style.display = 'none';
    document.getElementById('New').style.display = 'none';
});
