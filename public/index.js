var socket;


socket = io.connect('http://localhost:8080');

var message = document.getElementById('message')
var handle = document.getElementById('handle')
var btn = document.getElementById('send')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')

// Emit events
sendmsg =  function (event) {
    event.preventDefault();
    console.log("hello" + event);
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
};

message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value);
})



// Listen for events
socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong class="badge badge-success m-1">' + data.handle + '</strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('draw_msg', dataDraw);



function setup() {
    let a = color(0, 100, 100);
    var cnv = createCanvas(windowWidth/2, windowHeight-100);
    cnv.parent('canvas');
    background(a);
}

function dataDraw(data) {
    let b = color(130, 224, 170);
    noStroke();
    fill(b);
    ellipse(data.x, data.y, 25, 25);
}

function mouseDragged() {
    let c = color(93, 173, 226);
    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('draw_msg', data);
    noStroke();
    fill(c);
    ellipse(mouseX, mouseY, 25, 25);
}

