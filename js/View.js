let Count = -1;
let Check = true;
let Data = JSON.parse(localStorage.getItem('TimeData'));
let ChatData = JSON.parse(localStorage.getItem('Chats'));

console.log(localStorage);

const Name = localStorage.getItem('TimeName');
const LocalName = localStorage.getItem('LocalName'); // localStorage.getItem('LocalName')

bluetoothSerial.subscribe("\n", function(data) {
    const text = JSON.parse(data);
    const keys = Object.keys(text);
    const SenderKey = keys[0];
    const Message = text[SenderKey];

    ChatData[Name][SenderKey] = Message;

    localStorage.setItem('Chats', JSON.stringify(ChatData));

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

    location.href = './index.html';
});

document.getElementById('Send').addEventListener('click', function() {
    Count++;
    const Message = document.getElementById('Input').value.trim();
    const Sender = `${LocalName}-${Count}`;

    Data[Sender] = Message;
    ChatData[Name][Sender] = Message;

    localStorage.setItem('Chats', JSON.stringify(ChatData));
    localStorage.setItem('TimeData', JSON.stringify(Data));

    document.getElementById('Messages').innerHTML += `<div><H3 id="MessageR">${Message}</H3></div>`;
    document.getElementById('Input').value = '';
});