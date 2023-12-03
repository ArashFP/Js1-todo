const btn = document.getElementById('btn')
const input = document.getElementById('task')

// Display the API 
const getApi = async () => {
  const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=fdd62200-d1a9-44dd-b9e9-3430f7ccb0c1')
  const data = await res.json()

  api = data
  
  // Target the ul from html
  const ul = document.getElementById('output')
  // Clear ul
  ul.innerHTML = ''
  // Loop the array and create a <li> for each 
  api.forEach(task => {
    const li = document.createElement('li')
    // Content of li is the title of the task
    li.textContent = task.title

    // li gets a dataset.id and connects to the task._id
    li.dataset.id = task._id

    // Listen for clicks in <li> -> 
    li.addEventListener('click', () => {
      deleteTask(task._id)
    })
    //Connect the li to the ul
    ul.appendChild(li)
  })

  console.log(api)
}

getApi()

const addTask = async () => {
  const task = input.value

  //Validate inputfield
  if (!/^([a-zA-ZåäöÅÄÖ0-9\s]{3,10})$/.test(task)) {
    showErrorPopup('Task must be between three and 10 characters long and can only contain letters, numbers, and spaces')
    return
  }
  const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=fdd62200-d1a9-44dd-b9e9-3430f7ccb0c1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: task })
  })
  //If api(resolved) sucessfully, reset inputfield and display the (new) api
  if (res.ok) {
    input.value = ''
    getApi()
  } else {
    console.error('Failed to add task')
    showErrorPopup('Failed to add task')
  }
} 
// when btn is clicked, run addTask
btn.addEventListener('click', addTask)

const deleteTask = async (taskId) => {
  const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${taskId}?apikey=fdd62200-d1a9-44dd-b9e9-3430f7ccb0c1`, {
    method: 'DELETE'
  })

  if (res.ok) {
    // If the API call was successful, remove the li element from the ul
    const li = document.querySelector(`li[data-id="${taskId}"]`)
    li.remove()
  } else {
    console.error('Failed to delete Task')
  }
}

const showErrorPopup = (message) => {
  const errorPopup = document.getElementById('errorPopup')
  errorPopup.textContent = message
  errorPopup.style.display = 'block'

  setTimeout(() => {
    errorPopup.style.display = 'none'
  }, 5000)
}








