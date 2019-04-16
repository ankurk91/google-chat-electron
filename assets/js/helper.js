var ipc = require('electron').ipcRenderer; 

document.addEventListener("click", (evt) => { 
    if (evt.target && evt.target.localName == "a" && evt.target.target == "_blank" && evt.target.href.startsWith("http")) { 
        ipc.send("open-link", evt.target.href); 
        evt.preventDefault(); 
    } 
}, true);

var fi = document.querySelector("link#favicon256"); 
ipc.send("favicon-changed", fi.href); 

var callback = function(mutationList) { 
    ipc.send("favicon-changed", fi.href); 
}; 

var observer = new MutationObserver(callback); 
observer.observe(fi, { attributes: true });

function newMessage() {
    const notification = {
        title: 'New Message',
        body: 'You received a new message',
        icon: __dirname + '/assets/icon/chat-favicon-new-notif-256dp.png'
    };

    const myNotification = new window.Notification(notification.title, notification);

    myNotification.onclick = () => {
        ipc.send('show');
    }
}