const hover = document.querySelector('div[hover]');
const text = document.querySelector("p[text]");
let temp = null;
let now_y = 0;
let count = 0;

function updateHover() {
    if (temp) {
        temp.remove();
    }
    if (now_y !== text.clientTop + text.clientHeight || !now_y) {
        now_y = text.clientTop + text.clientHeight;
    }
    if (count > 0) {
        now_y += 4;
    }

    temp = document.createElement("p");
    temp.innerHTML = text.innerHTML.split('<br>').pop();
    temp.setAttribute("temp", "");
    temp.style.opacity = 0;
    temp.style.position = "absolute";
    setTimeout(() => {
        hover.style.left = temp.clientWidth + 10 + "px";
        hover.style.top = now_y + 'px';
    }, 10);
    document.body.appendChild(temp);
    count += 1;
}

document.addEventListener("keypress", (event) => {
    let key = event.key;
    if (key === "Enter") {
        text.innerHTML += "<br>";
    } else if (key === "Backspace") {
        text.innerHTML = text.innerHTML.slice(0, -1);
    } else {
        text.innerHTML += key;
    }
    updateHover();
})

updateHover();

setInterval(() => {
    hover.style.opacity = (hover.style.opacity === '1' ? '0' : '1');
}, 400);