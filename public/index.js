
let btns = {};

//получение списка
const getEqs = async () => {
    try {
        const response = await axios.get('/api/getEq');
        console.log(response);
        if (!response) return;

        const { data: { eqs } } = response;

        const groupedEqs = groupByNumber(eqs);
        const list = document.querySelector('.eqs__list');

        for (const num in groupedEqs) { 
            addRow(groupedEqs[num], list);
        }
    } catch (error) {
        console.error(error);
    }
}
 //группировка по номеру 
const groupByNumber = (arr) => {
    return arr.reduce((prev, curr) => {
        const num = curr.number.trim();
        (prev[num] = prev[num] || []).push(curr);

        return prev;
    }, {})
}

const addRow = (group, parent) => {
    if (group.length == 1) {
        let row = parent.appendChild(document.createElement('div'));
        row.classList.add('table__row');

        row.appendChild(document.createElement('div')).innerHTML =  group[0].number;
        row.appendChild(document.createElement('div')).innerHTML = group[0].name;
        row.appendChild(document.createElement('div')).innerHTML = group[0].ip;

        let btn = row.appendChild(document.createElement('button'));
        btn.innerHTML = group[0].number;
        btn.classList.add('btn__power');
        btn.active = group[0].active;
        if (btn.active) btn.classList.add('active');
        
        btn.addEventListener('click', () => changeCondition(group[0].id));

        btns[group[0].id] = btn;
    } else {
        let details = parent.appendChild(document.createElement('details'));
        details.classList.add('details')

        let summary = details.appendChild(document.createElement('summary'));
        summary.classList.add('details__summary');
        summary.classList.add('table__row');
        summary.innerHTML = group[0].number;

        let detailsContent = details.appendChild(document.createElement('div'));
        detailsContent.classList.add('details__content');

        group.forEach(el => {
            addRow([el], detailsContent);
        });
    }
}


const changeCondition = async (id) => {
    const btn = btns[id];
    try {
        const response = await axios.post('/api/command', { id, command: btn.active ? 'off' : 'on'});

        console.log(response);

        btn.classList.toggle('active');
        btn.active = !btn.active;
    } catch (error) {
        console.error(error);
    }
}

const runCommandAll = async (command) => {
    try {
        const response = await axios.post('/api/commandAll', { command });

        if (!response.data) return;

        response.data.forEach((el, idx) => {
            if (el.value) {
                const isOn = command == 'on';
                btns[idx + 3].active = isOn;
                

                if (isOn) {
                    btns[idx + 3].classList.add('active');
                } else {
                    btns[idx + 3].classList.remove('active');
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
}

window.onload = () => {
    getEqs()
}