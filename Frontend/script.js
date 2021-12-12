'use strict'

async function initialize() {
    const tasks = await getAllTasks();

    for (let task of tasks) {
        let item = 
        `<li class="mt-2" id="task${task.id}">
            <div class="block p-5 bg-white rounded shadow">
            <div class="flex justify-between">
                <p>${task.text}</p>
                <span class="material-icons text-gray-500">
                <a onclick="deleteItem(${task.id})" class="large material-icons icon-red cursor-pointer">delete</a>
                </span>
            </div>
            <div class="mt-5 flex justify-between">
                <p class="text-sm text-gray-600 ">${task.date}</p>
                <div>
                <span class="inline-flex items-center rounded px-2 py-1 ${task.bgstyle}">
                    <svg class="h-2 w-2 text-indigo-500" viewBow="0 0 8 8" fill="${task.color}">
                    <circle cx="4" cy="4" r="3" />
                    </svg>
                    <span class="ml-2 text-sm font-medium ${task.textstyle}">
                    ${task.tag}
                    </span>
                </span>
                </div>
            </div>
            </div>
        </li>`;

        document.getElementById(task.state).innerHTML += item;
    }
}

async function deleteItem(id) {
    const tasks = await getAllTasks();

    await fetch("http://localhost:8000/api/list/", {
        method: "DELETE",
        body: JSON.stringify({
            id : +id
        }),
    });

    document.getElementById("task"+id).remove();
    //location.reload()
    //initialize();
}

async function getAllTasks() {
    const response = await fetch("http://localhost:8000/api/list", {
        method: "GET"
    });
    return await response.json();
}

async function addTask() {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    let month = months[d.getMonth()];   
    let description = document.getElementById("descriptionInput").value;
    let tag = document.getElementById("tagInput").value;
    const id = await getUUID();
    await fetch("http://localhost:8000/api/list", {
        method: "POST",
        body: JSON.stringify({id: id, text: description, tag: tag, bgstyle:'bg-indigo-100',textstyle: 'text-indigo-90', color: '#312e81', date: Date.now(), state : 'todo'})
    });

    let item = 
    `<li class="mt-2" id="task${id}">
        <div class="block p-5 bg-white rounded shadow">
        <div class="flex justify-between">
            <p>${description}</p>
            <span class="material-icons text-gray-500">
            <a onclick="deleteItem(${id})" class="large material-icons icon-red cursor-pointer">delete</a>
            </span>
        </div>
        <div class="mt-5 flex justify-between">
            <p class="text-sm text-gray-600 ">${month +" "+d.getDate()}</p>
            <div>
            <span class="inline-flex items-center rounded px-2 py-1 bg-indigo-100">
                <svg class="h-2 w-2 text-indigo-500" viewBow="0 0 8 8" fill="#312e81">
                <circle cx="4" cy="4" r="3" />
                </svg>
                <span class="ml-2 text-sm font-medium text-indigo-90">
                ${tag}
                </span>
            </span>
            </div>
        </div>
        </div>
    </li>`;

    document.getElementById("todo").innerHTML += item;
}

async function getUUID() {
    return await fetch("http://localhost:8000/api/id", {
        method: "GET"
    });
}

initialize();

