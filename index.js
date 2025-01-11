const hover = document.querySelector('div[hover]');

setInterval(() => {
    hover.style.opacity = (hover.style.opacity === '1' ? '0' : '1');
}, 400);

const text = document.querySelector('p[text]');

text.setAttribute('data-text', text.innerHTML);