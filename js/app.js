// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listerner
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click' , deleteCheck);
filterOption.addEventListener('click' , filterSelect);
document.addEventListener('DOMContentLoaded' , getTodos);
// functions

function addTodo(e){ 
    e.preventDefault();
    let todoDiv = document.createElement('Div');
    todoDiv.classList.add('todo');

    let newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    saveLocalTodos(todoInput.value);


    todoDiv.appendChild(newTodo);

    let completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;

    todoDiv.appendChild(completedButton);

    let trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML= `<i class="fas fa-trash"></i>`;

    todoDiv.appendChild( trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = null;
    
};

function deleteCheck(e) { 
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall')
        todo.addEventListener('transitionend' , () =>{ 
                todo.remove();
        });
    }else if(item.classList[0] === 'complete-btn'){ 
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

function filterSelect(e) {
    let todo = todoList.childNodes;
    todo.forEach(function (todo) {
        switch (e.target.value) {
         
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains("completed")){ 
                    todo.style.display = 'flex';
                }else{
                    todo.style.display ='none';
                }
                    break;

             case 'uncompleted':
                        if(!todo.classList.contains("completed")){ 
                            todo.style.display = 'flex';
                        }else{
                            todo.style.display ='none';
                        }
                            break;
                
        
            default:
                break;
        }
    });
};

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else{ 
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos))
}

function getTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else{ 
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        todoDiv.classList.add('todo');

        let newTodo = document.createElement('li');
      
        newTodo.classList.add('todo-item');
    
  
    
    
        todoDiv.appendChild(newTodo);
    
        let completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    
        todoDiv.appendChild(completedButton);
    
        let trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML= `<i class="fas fa-trash"></i>`;
    
        todoDiv.appendChild( trashButton);
    
        todoList.appendChild(todoDiv);
    });
}


