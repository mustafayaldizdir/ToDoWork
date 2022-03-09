//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');

const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

let items;

//load items
loadItems();

eventListeners();


function eventListeners() {

    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener('click', deleteItem);

    //delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {

    items = getItemFromLS();

    items.forEach(function (item) {
        createItem(item);
    })
}

function getItemFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {

    items = getItemFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));

}

function deleteItemFromLS(text) {
    items = getItemFromLS();
    items.forEach(function (item, index) {
        if(item === text){
            items.splice(index, 1)
        }

    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-success';
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    //add to li
    li.appendChild(a);

    //add li to ul
    taskList.appendChild(li);
}

function deleteAllItems(e) {

    // taskList.innerHTML = '';
    if (confirm('are you sure')) {
        // taskList.childNodes.forEach(function (item) {
        //     if (item.nodeType === 1) {
        //         item.remove();
        //     }
        // });
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }



    e.preventDefault();
}

function deleteItem(e) {


    if (e.target.className === 'fas fa-times') {
        if (confirm('Sure?')) {
            e.target.parentElement.parentElement.remove();

            //delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }

    }

    e.preventDefault();
}

function addNewItem(e) {


    createItem(input.value);

    //save to LS
    setItemToLS(input.value);

    //clear input
    input.value = '';

    e.preventDefault();
}