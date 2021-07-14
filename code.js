console.log('Запуск страницы');


const container = document.getElementById('main-container');

const matrix = [
    [{value: 5},{value: 5},{value: 5},{value: 5},{value: 5}],
    [{value: 5},{value: 5},{value: 5},{value: 5},{value: 5}],
    [{value: 5},{value: 5},{value: 5},{value: 5},{value: 5}],
    [{value: 5},{value: 5},{value: 5},{value: 5},{value: 5}],
    [{value: 5},{value: 5},{value: 5},{value: 5},{value: 5}]
],
position = {
    x: 3,
    y: 5
};



let step = 1,
value = 5;

container.appendChild(getFragment(
    createText('main-text', 'Матрица'),
    createTable('main-table', 5, 5,),
    createinputDiv(
        ['Position x:', position.x],
        ['Position y:', position.y],
        ['step:', step],
        ['value:', value]),
     createButton('input-btn', 'запустить', changeMatrix)
));

fillMatrix(document.querySelector('.main-table'), matrix);

function getFragment() {
    const fragment = document.createDocumentFragment();
    const arg = Array.from(arguments);

    arg.forEach(elem => fragment.appendChild(elem));
    console.log('Добавление фрагмента');
    return fragment;
}

function createText(pClass, text) {
    console.log('Создание текста');
    const p = document.createElement('p');

    p.classList.add(pClass);
    p.textContent = text;

    return p;
}

function createTable(pClass, x ,y) {
    console.log('Создание таблицы');
    const table = document.createElement('table');

    table.classList.add(pClass);
    // table.textContent = text;

    for(let i = x; i > 0; i--) {
        const tr = document.createElement('tr');

        table.appendChild(tr);
        for(let i = y; i > 0; i--) {
            const td = document.createElement('td');

            tr.appendChild(td);
        }
    }

    return table;
}

function createInput(iClass, type, def) {
    console.log('Создание поля для ввода');
    const input = document.createElement('input');

    input.classList.add(iClass);
    input.value = def;
    input.setAttribute('type', type);

    return input;
}

function createButton(bClass, text, func) {
    console.log('Создание кнопки');
    const btn = document.createElement('button');

    btn.classList.add(bClass);
    btn.textContent = text;

    btn.addEventListener('click', e => {
        console.log('нажатие кнопки');
        e.preventDefault();
        func();
    });

    return btn;
}

function createinputDiv() {
    console.log('Создание контейнера для ввода');
    const div = document.createElement('div');
    const arg = Array.from(arguments);
    div.classList.add('input-div');

    arg.forEach(elem => {
        div.appendChild(createText('input-text', elem[0]));
        div.appendChild(createInput('input', 'text', elem[1]));
    })

    return div;
}

function fillMatrix(table, matrix) {
    matrix.forEach((e, y) => {
        const tr = table.children[y];
        e.forEach((e, x) => {
            const th = tr.children[x];
            th.textContent = matrix[y][x].value;
            // console.log(e);
            th.classList.remove('actived');
            th.classList.remove('eneble');
            if(matrix[y][x].status){
            th.classList.add(matrix[y][x].status);}
        })
    })
}

function changeMatrix() {
    console.log('изменение матрицы');
    const input = document.querySelector('.input-div').children;
    const table = document.querySelector('.main-table');
    position.x = input[1].value;
    position.y = input[3].value;
    step = input[5].value;
    value = input[7].value;

    let num = value;

    console.log(position.x);
    console.log(position.y);

    noActived(table, matrix);

    matrix[position.y - 1][position.x - 1].status = 'actived';
    setTimeout(cheakActived, 100, table, step, num, matrix);
    // cheakActived(table, step, num, matrix);
}


function cheakActived(table, step, num, matrix) {
    console.log('цикл пошёл');
    const arr = [];
    matrix.forEach((e, y) => {
        e.forEach((e, x) => {
            if(e.status === 'actived') arr.push([e, y, x]);
        })
    })

    if(arr.length) goActived(table, step, num, matrix, arr);
}

function goActived(table, step, num, matrix, arr) {
    if(num === 0) return;
    arr.forEach(e => {
        // e[0].value -= num;
        // e[0].status = 'eneble';

        let i = 1;

        gogo(matrix, step, i, e, num);

    }
    )
    num--;
    fillMatrix(table, matrix);
    setTimeout(cheakActived, 100, table, step, num, matrix);
    // cheakActived(table, step, num, matrix);
}

function gogo(matrix, step, i, e, num) {
    console.log(i);
    if( e[0].status != 'eneble') {
    e[0].value -= num;
    e[0].status = 'eneble';
    }
    if(e[1] == 3 && e[2] == 0) {
        console.log('отдельная проверка');
        console.log(e[0]);
    }


        if (matrix[e[1]][e[2] - 1]) {
            const left = [matrix[e[1]][e[2] - 1], e[1], e[2] - 1];
            if(left[0].status !== 'eneble') {
                console.log(left[0]);
                if(i == step) {
                    left[0].status = 'actived';}
                else {
                // left[0].value -= num;
                // left[0].status = 'eneble';
                gogo(matrix, step, i + 1, left, num);
            }
            }
        }
        if (matrix[e[1]][e[2] + 1]) {
            const rigth = [matrix[e[1]][e[2] + 1], e[1], e[2] + 1];
            if(rigth[0].status !== 'eneble') {
                console.log(rigth[0]);
                if(i == step) rigth[0].status = 'actived';
                else {
                    // rigth[0].value -= num;
                    // rigth[0].status = 'eneble';
                gogo(matrix, step, i + 1, rigth, num);
            }
            }
        }
        if (matrix[e[1] - 1]) {
            const up = [matrix[e[1] - 1][e[2]], e[1] - 1, e[2]];
            if(up[0].status !== 'eneble') {
                console.log(up[0]);
                if(i == step) up[0].status = 'actived';
                else {
                    // up[0].value -= num;
                    // up[0].status = 'eneble';
                gogo(matrix, step, i + 1, up, num);
            }
            }
    }
        if (matrix[e[1] + 1]) {
            const down = [matrix[e[1] + 1][e[2]], e[1] + 1, e[2]];
            if(down[0].status !== 'eneble') {
                console.log(down[0]);
                if(i == step) down[0].status = 'actived';
                else {
                gogo(matrix, step, i + 1, down, num);
            }
            }
    }
}

function noActived(table, matrix) {
    matrix.forEach(e => {
        e.forEach(e => {
            e.status = '';
        })
    })
    fillMatrix(table, matrix);
}