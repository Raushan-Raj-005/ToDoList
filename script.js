const inputTextEl = document.querySelector('#inputText');
const inputbtn = document.querySelector('#inputbtn')
const resultId = document.querySelector('#resultId')
let editTodo = null;
let todolist = () => {
    const inputText = inputTextEl.value;
    if (inputText <= '') {
        alert('plsese enter a valid text')
        return false
    }


    if (inputbtn.value === 'Edit') {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        inputbtn.value = 'Add'
        inputbtn.style.backgroundColor = 'gray'
        inputTextEl.value = '';


    }
    else {
        const li = document.createElement('li')
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p)

        // editbtn 
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit', 'btn')
        editBtn.innerText = 'Edit';
        li.appendChild(editBtn);

        // delete btn 
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add('btn', 'delete')
        li.appendChild(deleteBtn);
        resultId.appendChild(li);


        inputTextEl.value = '';
        saveLocalTodos(inputText);
    }



}

const updateToDo = (e) => {
    // console.log(e.target.innerHTML);
    if (e.target.innerHTML == "Remove") {
        resultId.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    if (e.target.innerHTML === 'Edit') {
        inputTextEl.value = e.target.previousElementSibling.innerHTML;

        inputTextEl.focus()
        inputbtn.value = "Edit"
        inputbtn.style.backgroundColor = 'green'
        editTodo = e;
    }

}

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
         const li = document.createElement('li')
        const p = document.createElement('p');
        p.innerHTML = todo;
        li.appendChild(p)

        // editbtn 
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit', 'btn')
        editBtn.innerText = 'Edit';
        li.appendChild(editBtn);

        // delete btn 
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add('btn', 'delete')
        li.appendChild(deleteBtn);
        resultId.appendChild(li);
        });
    }
}

const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    // Array functions : slice / splice
    console.log(todoIndex);
};

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputTextEl.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}



document.addEventListener('DOMContentLoaded', getLocalTodos);
inputbtn.addEventListener('click', todolist);
resultId.addEventListener('click', updateToDo);