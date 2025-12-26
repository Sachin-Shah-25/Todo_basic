const todo_input = document.getElementById("todo_input");
const todo_btn = document.getElementsByClassName("todo_btn")[0]
const todo_ti = document.getElementById("todo_ti")


const todos_todos = document.getElementsByClassName("todo_todos")[0]


const todoarr = []
let updateIndex = null


todo_btn.addEventListener("click", (e) => {

   
    const getLocalStorage = localStorage.getItem("todo")

    if (e.target.innerText == "Update") {
        if (getLocalStorage != null && getLocalStorage != undefined && getLocalStorage.length > 0) {
            const getPrevTodo = JSON.parse(getLocalStorage)
            const convertIntoArray = Array.from(getPrevTodo)
            localStorage.setItem("todo", JSON.stringify(convertIntoArray.map((elem, i) => {
                if (i == updateIndex) {
                    return { ...elem, title: document.getElementById("todo_ti").value, dis: document.getElementById("todo_input").value }
                }
                return elem
            })))


        }
        document.getElementById("add").innerText = "Add"
        document.getElementById("edit").innerText = "Edit"
        updateIndex = null
        console.log("yes hobo ")
          window.location.reload()
    }
    else {
        const getTextByUser = todo_input.value
        const getTitleByUser = todo_ti.value

        // =================== For Practice Only ================= //
        // Create Todo Element
        // const todo = document.createElement("div")
        // todo.className = "todo";

        // const todo_div_title = document.createElement("div")
        // todo_div_title.className = "todo_title"
        // const todo_title = document.createElement("h3")
        // todo_title.innerText = getTitleByUser
        // todo_div_title.appendChild(todo_title)


        // const todo_dis = document.createElement("div")
        // todo_dis.className = "todo_dis"
        // const para = document.createElement("p")
        // para.innerText = getTextByUser

        // const todo_update = document.createElement("div")
        // todo_update.className = "todo_update"

        // const todo_delete = document.createElement("div")
        // todo_delete.className = "todo_delete"
        // const todo_delete_btn = document.createElement("button")
        // todo_delete_btn.innerText = "Delete"

        // const todo_edit = document.createElement("div")
        // todo_edit.className = "todo_edit"
        // const todo_edit_btn = document.createElement("button")
        // todo_edit_btn.innerText = "Edit"


        // todo_delete.appendChild(todo_delete_btn)
        // todo_edit.appendChild(todo_edit_btn)
        // todo_update.appendChild(todo_delete);
        // todo_update.appendChild(todo_edit)


        const obj = { "title": getTitleByUser, "dis": getTextByUser }
        if (getLocalStorage != null && getLocalStorage != undefined && getLocalStorage.length > 0) {
            const getPrevTodo = JSON.parse(getLocalStorage)
            const convertIntoArray = Array.from(getPrevTodo)
            convertIntoArray.push(obj)
            localStorage.setItem("todo", JSON.stringify(convertIntoArray))
        }
        else {
            todoarr.push(obj)
            localStorage.setItem("todo", JSON.stringify(todoarr))
        }
        addTodoFun(getTitleByUser, getTextByUser, null, null)

        // todo_dis.appendChild(para)

        // todo.appendChild(todo_div_title)
        // todo.appendChild(todo_dis);
        // todo.appendChild(todo_update)

        // todos_todos.appendChild(todo)

        todo_input.value = "";
        todo_ti.value = ""
          window.location.reload()
    }
  
})




document.addEventListener("DOMContentLoaded", () => {
    const getLocalStorage = localStorage.getItem("todo")
    if (getLocalStorage != null && getLocalStorage != undefined && getLocalStorage.length > 0) {
        const getPrevTodo = JSON.parse(getLocalStorage)
        console.log(getPrevTodo)

        Array.from(getPrevTodo).forEach((elem, index) => {
            addTodoFun(undefined, undefined, elem, index)
        })
    }

})


function addTodoFun(title, dis, elem, index) {
    const getLocalStorage = localStorage.getItem("todo")
    const todo = document.createElement("div")
    todo.className = "todo";
    todo.style.transitionDelay = `${index * 1}s`
    todo.style.opacity = 1

    const todo_div_title = document.createElement("div")
    todo_div_title.className = "todo_title"
    const todo_title = document.createElement("h3")
    todo_title.innerText = title || elem.title || "No Title"
    todo_div_title.appendChild(todo_title)


    const todo_dis = document.createElement("div")
    todo_dis.className = "todo_dis"
    const para = document.createElement("p")
    para.innerText = dis || elem.dis || "No Work Pending...."

    const todo_update = document.createElement("div")
    todo_update.className = "todo_update"

    const todo_delete = document.createElement("div")
    todo_delete.className = "todo_delete"
    const todo_delete_btn = document.createElement("button")
    todo_delete_btn.innerText = "Delete"

    const todo_edit = document.createElement("div")
    todo_edit.className = "todo_edit"
    const todo_edit_btn = document.createElement("button")
    todo_edit_btn.innerText = "Edit"
    todo_edit_btn.id="edit"

    todo_delete.appendChild(todo_delete_btn)
    todo_edit.appendChild(todo_edit_btn)
    todo_update.appendChild(todo_delete);
    todo_update.appendChild(todo_edit)

    todo_delete_btn.addEventListener("click", () => {
        todos_todos.removeChild(todo)
        removeFromLocalStorage(index)
    })

    todo_edit_btn.addEventListener("click", () => {
        todo_input.value = para.innerText
        todo_ti.value = todo_title.innerText
        document.getElementById("add").innerText = "Update"
        todo_edit_btn.innerText = "Update"
        todo_edit_btn.style.display = "none"
        updateIndex = index
    })


    todo_dis.appendChild(para)

    todo.appendChild(todo_div_title)
    todo.appendChild(todo_dis);
    todo.appendChild(todo_update)

    todos_todos.appendChild(todo)

    window.scrollTo(todos_todos.scrollIntoView(true))
}



function removeFromLocalStorage(index) {
    const getLocalStorage = localStorage.getItem("todo")
    if (getLocalStorage != null && getLocalStorage != undefined && getLocalStorage.length > 0) {
        const getPrevTodo = JSON.parse(getLocalStorage)
        const convertIntoArray = Array.from(getPrevTodo)
        localStorage.setItem("todo", JSON.stringify(convertIntoArray.filter((_, i) => i != index)))
        window.location.reload()


    }

}