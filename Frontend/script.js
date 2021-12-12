
async function deleteItem(){
    window.alert("test");
    
}

async function getAllTasks() {
    const response = await fetch("http://localhost:8000/api/list", {
        method: "GET"
    });
    return await response.json();
}

async function addTask() {
    const id = await getId();
    await fetch("http://localhost:8000/api/list", {
        method: "POST",
        body: JSON.stringify({id: id, text: "test create task", tag: "Feature", status: "todo", date: "Dez 12"})
    });
    console.log(id);
}

async function getId() {
    const response = await fetch("http://localhost:8000/api/id", {
        method: "GET"
    });
    return response;
}
