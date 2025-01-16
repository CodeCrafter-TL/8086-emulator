const hover = document.querySelector('div[hover]');
hover.style.opacity = 0;
const text = document.querySelector("p[text]");
console.log(text.clientTop, text.clientHeight)
let temp = null;
let now_y = 0;
let count = 0;

function liveServer() {
    let comments = [];
    for (let i = 0; i < document.body.childNodes.length; i++) {
        const node = document.body.childNodes[i];

        if (node.nodeType === Node.COMMENT_NODE) {
            comments.push(node.nodeValue.trim());
        }
    }

    if (comments.includes("Code injected by live-server")) {
        return true;
    } else {
        return false;
    }
}

function updateHover() {
    if (temp) {
        temp.remove();
    }
    if (!liveServer()) {
        if (now_y !== text.clientHeight || !now_y) {
            now_y = text.clientHeight;
        }
        if (count > 0) {
            now_y += 4;
        }
        count += 1;
    } else {
        if (now_y !== text.clientHeight || !now_y) {
            now_y = text.clientHeight + 4;
        }
        // if (count > 0) {
        //     now_y = text.clientHeight + 4;
        // }
    }

    temp = document.createElement("p");
    temp.innerHTML = text.innerHTML.split('<br>').pop();
    temp.setAttribute("temp", "");
    temp.style.opacity = 0;
    temp.style.position = "absolute";
    document.body.appendChild(temp);
    setTimeout(() => {
        hover.style.opacity = 1;
        hover.style.left = temp.clientWidth + 10 + "px";
        hover.style.top = now_y + 'px';
    }, 50);
}

document.addEventListener("keypress", (event) => {
    let key = event.key;
    if (key === "Enter") {
        text.innerHTML += "<br><span style=\"color: black; width: 0.1px;\">1</span>";
    } else if (key === "Backspace") {
        text.innerHTML = text.innerHTML.slice(0, -1);
    } else {
        if (text.innerHTML.endsWith("<span style=\"color: black; width: 0.1px;\">1</span>")) {
            text.innerHTML = text.innerHTML.replace("<span style=\"color: black; width: 0.1px;\">1</span>", "");
        }
        text.innerHTML += key;
    }
    updateHover();
})

updateHover();

setInterval(() => {
    hover.style.opacity = (hover.style.opacity === '1' ? '0' : '1');
}, 400);