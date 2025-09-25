document.addEventListener('DOMContentLoaded', () => {

    function d6(num = 1, adder = 0) {
        const array = new Uint8Array(parseInt(num));
        self.crypto.getRandomValues(array);
        return array.map(r => (r % 6) + 1).reduce((p, a) => p + a, 0) + parseInt(adder);
    }

    function dieIcon(value) {
        const map = ['one', 'two', 'three', 'four', 'five', 'six'];
        return `<i class="fa-solid fa-dice-${map[value - 1]} text-danger"></i>`;
    }

    function rollResult(total, target) {
        switch (true) {
            case total == 3: return 'Critical Success';
            case total == 18: return 'Critical Failure';
            case total == target: return 'Success';
            case total < target: return `Success by ${target - total}`;
            default: return `Failure by ${total - target}`;
        }
    }

    // Initialize tooltips.
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => new bootstrap.Tooltip(element));

    // Initialize die roll chart.
    const dieRolls = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const successProb = [0.46, 1.85, 4.63, 9.26, 16.20, 25.93, 37.5, 50, 62.5, 74.07, 83.8, 90.74, 95.37, 98.15, 99.54, 100];
    let rollData = {
        labels: dieRolls,
        datasets: [{
            data: successProb,
            fill: true,
            pointRadius: new Array(16).fill(3),
            segment: {},
        }],
    };
    let rollChart = new Chart(
        document.getElementById('rollChart'),
        {
            type: 'line',
            data: rollData,
            options: {
                animation: false,
                clip: false,
                events: [],
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                },
            },
        }
    );

    // Initialize die roller triggers.
    const modal = new bootstrap.Modal(document.getElementById('die-roller-modal'));
    document.querySelectorAll('.roll').forEach(element => element.addEventListener('click', event => {
        const skill = event.target.getAttribute('data-skill');
        if (skill) {
            const rolls = [d6(), d6(), d6()];
            const total = rolls[0] + rolls[1] + rolls[2];
            const target = parseInt(event.target.innerText);
            document.getElementById('die-roller-modal-title').innerText = skill;
            document.getElementById('die-roller-modal-target').innerText = target;
            document.getElementById('die-roller-modal-prob').innerText = successProb[target - 3];
            document.getElementById('die-roller-modal-roll').innerHTML = rolls.map(dieIcon).join(' ') + ' ' + total;
            document.getElementById('die-roller-modal-result').innerText = rollResult(total, target);
            document.getElementById('die-roller-modal-result').setAttribute('data-result', total <= target ? 'success' : 'failure');
            rollData.datasets[0].pointRadius.fill(3);
            rollData.datasets[0].pointRadius[total - 3] = 10;
            rollData.datasets[0].pointBorderColor = (context) => context.dataIndex <= target - 3 ? '#0D6EFD' : '#DC3545';
            rollData.datasets[0].pointBackgroundColor = (context) => context.dataIndex <= target - 3 ? '#0D6EFD' : '#DC3545';
            rollData.datasets[0].segment.borderColor = (context) => context.p1DataIndex <= target - 3 ? '#0D6EFD40' : '#DC354540';
            rollData.datasets[0].segment.backgroundColor = (context) => context.p1DataIndex <= target - 3 ? '#0D6EFD40' : '#DC354540';
            rollChart.update();
            modal.show();
        }
    }));

    // Initialize keyboard shortcuts.
    const keyMap = {
        c: 'characteristics',
        b: 'background',
        d: 'disads',
        e: 'equipment',
        o: 'combat',
        p: 'powers',
        s: 'skills',
    };
    document.addEventListener('keypress', event => {
        if (event.key in keyMap) {
            bootstrap.Tab.getInstance(document.querySelector(`#${keyMap[event.key]}_button`)).show();
        }
        if (event.key == 't') {
            let html = document.querySelector('html');
            html.setAttribute('data-bs-theme', html.getAttribute('data-bs-theme') == 'light' ? 'dark' : 'light');
        }
    });

    // Hit location chart roller.
    document.querySelectorAll('.roll-hit-location').forEach(element => element.addEventListener('click', event => {
        let roll = d6(event.target.getAttribute('data-dice'), event.target.getAttribute('data-adder'));
        const locations = document.querySelectorAll('[data-roll]');
        locations.forEach((location) => location.classList.remove('table-primary'));
        for (const location of locations) {
            if (roll <= location.getAttribute('data-roll')) {
                location.classList.add('table-primary');
                setTimeout(() => location.classList.remove('table-primary'), 30000);
                break;
            }
        }
    }));

    // Portrait image decoder.
    //
    // We don't actually care about the image file name. It is rendered in the
    // portrait block only so that we can extract the extension here for use in
    // the inline image's MIME type.
    //
    // There is an odd bug in the template renderer, in that IMAGE_RELATIVE_URL
    // only works inside an IF_IMAGE block but an IF_IMAGE block with a newline
    // will break subsequent IF_IMAGE blocks that contain IMAGE_RELATIVE_URL.
    // As a result, if we want nice formatting (i.e., line breaks) in the
    // portrait block where IF_IMAGE is used, then we must also consume the
    // IMAGE_RELATIVE_URL tag there.
    if (typeof imageHex !== 'undefined') {
        document.getElementById('portrait-image').src =
            'data:image/' + imageName.split('.').pop() + ';base64,' + btoa([...imageHex].reduce((acc, _, i) =>
                acc += !(i - 1 & 1) ? String.fromCharCode(parseInt(imageHex.substring(i - 1, i + 1), 16)) : '', ''));
    }

    // Apply initial light/dark theme based on user's browser preference.
    document.querySelector('html').setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

});
