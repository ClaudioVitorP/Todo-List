
//DOM
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector( '.filter-todo')

//Eventos
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', verificar)
todoList.addEventListener('click', checktrash)
filterOption.addEventListener('click', filterTodo)

//Array
let array = JSON.parse(localStorage.getItem("array")) || []
let item =''
let arraycheck = JSON.parse(localStorage.getItem("arraycheck")) || []
//Funções

//Função de verificação 
function verificar (Eventos){
    Eventos.preventDefault()
    let verificaçao = document.getElementById ('value').value
    let duplicado = array.indexOf(verificaçao)
    if(duplicado != -1) {
        alert("Tarefa já cadastrada")
    }else{  
        array.push(verificaçao)
        localStorage.setItem("array", JSON.stringify(array))
        item = verificaçao
        addTodo()
    }
}

//Função de adicionar
function addTodo (event) {
    
    saveList()

    const todoDiv = document.createElement('div')
    todoDiv.classList.add ('todo')

    const todoli = document.createElement('li')
    todoDiv.classList.add ('todo-list')
    todoli.innerText = todoInput.value
    todoInput.value = ''

    todoDiv.appendChild(todoli)

    const completedbutton = document.createElement('button')
    completedbutton.innerHTML = '<i class="fas fa-check"></i>'
    completedbutton.classList.add('check-btn')
    todoDiv.appendChild(completedbutton)


    const trashbutton = document.createElement('button')
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>'
    trashbutton.classList.add('trash-btn')
    todoDiv.appendChild(trashbutton)

    todoList.appendChild(todoDiv)

}

//Funções dos botões
function checktrash (e) {

    let item = e.target
    let item2 = e.target.parentElement.firstChild.innerText
    let indice = array.indexOf(item2)
    const todo = item.parentElement
    

    if(item.classList[0] === 'trash-btn'){
        removeLS(todo)
        todo.remove()
        array.splice(indice,1)
        localStorage.setItem("array", JSON.stringify(array))
        arraycheck.splice(indice, 1)
        localStorage.setItem("arraycheck", JSON.stringify(arraycheck))
    }

    if(item.classList[0] === 'check-btn'){
        if(todo.classList.contains("completed")){
            arraycheck.splice(indice, 1)
        }else{
            arraycheck.push(item2)
        }
        todo.classList.toggle('completed')
        localStorage.setItem("arraycheck", JSON.stringify(arraycheck))
    }
}

//Função do select
function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach(todo => {

        switch (e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break;
        
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none'
                }
                break;

            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none'
                }
                break;
        }
    })
}

//Local Storage
function saveList () {

    let todos;
    
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(item)
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Salvar elementos
function getTodos(){

    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo){

    const todoDiv = document.createElement('div')
    todoDiv.classList.add ('todo')

    const todoli = document.createElement('li')
    todoDiv.classList.add ('todo-list')
    todoli.innerText = todo
    todoInput.value = ''

    let checkstore = arraycheck.find(Element => Element == todo)
    if(checkstore){
        todoDiv.classList.toggle('completed')
    }

    todoDiv.appendChild(todoli)

    const completedbutton = document.createElement('button')
    completedbutton.innerHTML = '<i class="fas fa-check"></i>'
    completedbutton.classList.add('check-btn')
    todoDiv.appendChild(completedbutton)


    const trashbutton = document.createElement('button')
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>'
    trashbutton.classList.add('trash-btn')
    todoDiv.appendChild(trashbutton)

    todoList.appendChild(todoDiv)

})
}

//Salvar o remover 
function removeLS(todo) {

    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}