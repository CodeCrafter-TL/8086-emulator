const hover = document.querySelector('div[hover]');

setInterval(() => {
    hover.style.opacity = (hover.style.opacity === '1' ? '0' : '1');
}, 400);