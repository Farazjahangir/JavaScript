/*****************Developed by Izaan jahangir *******************/


var listEl = document.getElementById('task-list');
var userInput = document.getElementById('user-input');
var todos;
var todosArray=[];
var todoNum = 0;


// Call function addTask on Enter
userInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
    }
});


// Save Todos in local storage
function saveTodos(){
    if(localStorage.getItem('todos') !== null){
        todosArray = JSON.parse(localStorage.getItem('todos'));
    }else{
        todosArray= [];
    }
    todosArray.push(userInput.value);
    localStorage.setItem('todos',JSON.stringify(todosArray));
}

// Get Todos from local storage
function getTodos(){
    if(localStorage.getItem('todos') !== null){
        // get task and convert it in array 
        todos = JSON.parse(localStorage.getItem('todos'));

        //Render task on DOM
        for(var i=0; i<todos.length; i++){
            var newLi = addNode('li',todos[i],'list-group-item');
            var newSpan = addNode('span','','float-right');
            var delBtn = addInputNode('input','Delete','button','btn btn-danger mx-1');
            var editBtn = addInputNode('input','Edit','button','btn btn-info');
            var targetEl = listEl.childNodes[0];
            userInput.value = '';
            listEl.insertBefore(newLi,targetEl);
            newSpan.appendChild(editBtn);
            newSpan.appendChild(delBtn);
            newLi.appendChild(newSpan);
        
            delBtn.addEventListener('click',deleteNode);
            editBtn.addEventListener('click',editNode);    
        }    
    }
}

function addTask(){
    if(userInput.value !== ''){
        saveTodos();
        var newLi = addNode('li',userInput.value,'list-group-item');
        var newSpan = addNode('span','','float-right');
        var delBtn = addInputNode('input','Delete','button','btn btn-danger mx-1');
        var editBtn = addInputNode('input','Edit','button','btn btn-info');
        var targetEl = listEl.childNodes[0];
        userInput.value = '';
        listEl.insertBefore(newLi,targetEl);
        newSpan.appendChild(editBtn);
        newSpan.appendChild(delBtn);
        newLi.appendChild(newSpan);
    
        delBtn.addEventListener('click',deleteNode);
        editBtn.addEventListener('click',editNode);
        
        todoNum++; 
    }else{
        var newLi = addNode('li','Please enter something in the field','list-group-item text-danger');
        var targetEl = listEl.firstChild.nextSibling;
        var closeBtn = addInputNode('input','Close','button','btn btn-danger');
        var newSpan = addNode('span','','float-right');
        newSpan.appendChild(closeBtn);
        newLi.appendChild(newSpan);
        listEl.insertBefore(newLi,targetEl);

        closeBtn.addEventListener('click',deleteNode);

    }
}

function addNode(elName,text,classNm){
    var el = document.createElement(elName);

    if(text !== ''){
        var textNode = document.createTextNode(text);
        el.appendChild(textNode);    
    }

    el.className = classNm;
    return el;
}
function addInputNode(elName,text,type,classNm,num){
    var el = document.createElement(elName);
    if(text !== ''){
        el.setAttribute('value',text);
    }
    el.setAttribute('type',type);
    el.className = classNm;
    return el;  
}

function deleteAllNodes(){
    var listElNodes = listEl.childNodes;
    for(var i=0; i<listElNodes.length;){
        listEl.removeChild(listElNodes[i]);
    }
    localStorage.removeItem('todos');
}
function deleteNode(){
    nodeTodel = this.parentNode.parentNode;
    var arrayTodos = JSON.parse(localStorage.getItem('todos'));
    var indexNo = arrayTodos.indexOf(nodeTodel.innerText);
    arrayTodos.splice(indexNo,1);
    localStorage.setItem('todos',JSON.stringify(arrayTodos));
    listEl.removeChild(nodeTodel);

}

function editNode(){
    var liEl = this.parentNode.parentNode;
    var prevText = liEl.innerText;
    var newDiv = addNode('div','','input-group');
    var newInput = addInputNode('input',prevText,'text','form-control');
    var newbtn = addInputNode('input','Done','button','btn btn-info');
    liEl.innerText='';

    newDiv.appendChild(newInput);
    newDiv.appendChild(newbtn);
    liEl.appendChild(newDiv);

    newbtn.addEventListener('click',function(){        
        var delBtn = addInputNode('input','Delete','button','btn btn-danger mx-1');
        var editBtn = addInputNode('input','Edit','button','btn btn-info');
        var newSpan = addNode('span','','float-right');

        if(newInput.value !== ''){
            todosArray =  editLocalData(prevText,newInput.value);
            liEl.innerText = newInput.value;
        }else{
            liEl.innerText = prevText;
        }

        newSpan.appendChild(editBtn);
        newSpan.appendChild(delBtn);
        liEl.appendChild(newSpan);
        delBtn.addEventListener('click',deleteNode);
        editBtn.addEventListener('click',editNode);    
    });


}

// Take data from local storage changes it and then save it to local storage
function editLocalData(prevTask,newTask){
    var arrayTodos = JSON.parse(localStorage.getItem('todos'));
    var indexNo = arrayTodos.indexOf(prevTask);
    arrayTodos.splice(indexNo,1,newTask);
    console.log(arrayTodos);
    localStorage.setItem('todos',JSON.stringify(arrayTodos));
}



if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../service-worker.js')
        .then(function() { console.log('Service Worker Registered'); });
}