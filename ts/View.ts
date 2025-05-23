let Count = 0;
let isConnect = false;

const Me = "Me";
const Name = localStorage.getItem('TimeName');
const Chat = JSON.parse(localStorage.getItem('TimeChat'));

const MessagesPath = document.getElementById('Messages');

if (!Name || !Chat) {
    location.href = 'index.html';
}

//
// Подключение к устройству
//

document.getElementById('Up').innerHTML = `<H1>←</H1><H3>${Name}</H3>`;

for (let A in Chat) {
    const CheckerMe = `${Me}-${Count}`;
    const Checker = `${Name}-${Count}`;

    if (Count === 0) {
        Count++;
        continue;
    }
    else if (A === CheckerMe) {
        MessagesPath.innerHTML += `<div id="MessageR">${Chat[A]}</div>`;
    }
    else if (A === Checker) {
        MessagesPath.innerHTML += `<div id="MessageL">${Chat[A]}</div>`;
    }

    Count++;
}

document.getElementById('Send').addEventListener('click', () => {
    if (isConnect === false) return;

    const message = document.getElementById('Input').value;

    //
    // Функция отправки сообщения
    //
});