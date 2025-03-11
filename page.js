function configColor(color, selector) {
    if (color) {
        let style = document.createElement('style');
        style.textContent = selector + ' { color: ' + color + ' !important; }';
        document.head.appendChild(style);
        console.log(style);
    }
}

function configFont(font, selector) {
    if (font?.name) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = font?.uri ?? 'https://fonts.googleapis.com/css2?display=swap&family=' + encodeURIComponent(font.name);
        document.head.appendChild(link);
        let style = document.createElement('style');
        style.textContent = selector + ' { font-family: "' + font.name + '"; }';
        document.head.appendChild(style);
    }
}

function configTheme(config) {
    if (config.theme) {
        document.querySelector('html').setAttribute('data-bs-theme', config.theme);
    }
}

const configJson = '__CONFIG_JSON__'.trim();
if (configJson.length > 0) {
    try {
        const config = JSON.parse(configJson);
        configTheme(config);
        configFont(config.font?.default, '*');
        configFont(config.font?.header, 'table thead tr th');
        configFont(config.font?.title, 'h1');
        configColor(config.color?.default, '*');
        configColor(config.color?.header, 'table thead tr th');
        configColor(config.color?.title, 'h1');
    } catch (error) {
        console.log(configJson);
        console.log(error);
        alert('JSON config is invalid. To customize this template, save your config override to the Background > Campaing Use field.');
    }
}

addEventListener('keypress', (event) => {
    switch (event.key) {
        case 't':
            let html = document.querySelector('html');
            html.setAttribute('data-bs-theme', html.getAttribute('data-bs-theme') == 'light' ? 'dark' : 'light');
            break;
    }
});
