'use strict'

async function initialize() {
    const tasks = await getAllTasks();

    for (let task of tasks) {
        let item = 
        `<li class="mt-2" id="c1">
            <div class="block p-5 bg-white rounded shadow">
            <div class="flex justify-between">
                <p>${task.text}</p>
                <span class="material-icons text-gray-500">
                <a onclick="deleteItem()" class="large material-icons icon-red cursor-pointer">delete</a>
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
        document.getElementById("col1").innerHTML += item;
    }
}

async function deleteItem() {
    window.alert("test");
}

async function getAllTasks() {
    const response = await fetch("http://localhost:8000/api/list", {
        method: "GET"
    });
    return await response.json();
}

async function addTask() {
    const id = await getUUID();
    await fetch("http://localhost:8000/api/list", {
        method: "POST",
        body: JSON.stringify({ id: id, text: "test create task", tag: "Feature", status: "todo", date: "Dez 12" })
    });
    console.log(id);
}

async function getUUID() {
    return await fetch("http://localhost:8000/api/id", {
        method: "GET"
    });
}

initialize()