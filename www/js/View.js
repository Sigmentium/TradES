let Count = -1;
let Check = true;
let Data = JSON.parse(localStorage.getItem('TimeData'));
let ChatData = JSON.parse(localStorage.getItem('Chats'));

const Name = localStorage.getItem('TimeName');
const Device = localStorage.getItem('TimeDevice');

bluetoothSerial.connet(Device);
bluetoothSerial.subscribe("\n", function(data) {
    // const text = JSON.parse(data);
    // const keys = Object.keys(text);
    // const SenderKey = keys[0];
    // const Message = text[SenderKey];

    // ChatData[Name][SenderKey] = Message;

    // localStorage.setItem('Chats', JSON.stringify(ChatData));

    alert(data);
    alert(JSON.parse(data));
    document.getElementById('Messages').innerHTML += `<div><H3>${Message}</H3></div>`;
});

if (!Data || !Name) {
    location.href = './index.html';
}
else {
    document.getElementById('Up').innerHTML += `<H2 id="Back" class="Des">←</H2><H2>${Name}</H2>`;
}

for (let A of Object.keys(Data)) {
    Count++;
    const Checker = `${LocalName}-${Count}`;

    if (A === Checker) {
        Count++;
        document.getElementById('Messages').innerHTML += `<div><H3 id="MessageR">${Data[A]}</H3></div>`;
    }
    else {
        document.getElementById('Messages').innerHTML += `<div><H3 id="MessageL">${Data[A]}</H3></div>`;
    }
}

document.getElementById('Back').addEventListener('click', function() {
    localStorage.removeItem('TimeData');
    localStorage.removeItem('TimeName');
    localStorage.removeItem('TimeDevice');

    location.href = './index.html';
});

document.getElementById('Send').addEventListener('click', function() {
    Count++;
    const Message = document.getElementById('Input').value.trim();
    const Sender = `${LocalName}-${Count}`;

    Data[Sender] = Message;
    ChatData[Name][Sender] = Message;

    document.getElementById('Messages').innerHTML += `<H3>${Data}</H3>`;
    document.getElementById('Messages').innerHTML += `<H3>${ChatData}</H3>`;

    localStorage.setItem('Chats', JSON.stringify(ChatData));
    localStorage.setItem('TimeData', JSON.stringify(Data));

    bluetoothSerial.write(Message + '\n');

    document.getElementById('Messages').innerHTML += `<div><H3 id="MessageR">${Message}</H3></div>`;
    document.getElementById('Input').value = '';
});