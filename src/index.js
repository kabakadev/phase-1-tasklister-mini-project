let form = document.querySelector("#create-task-form");
let submitButton = document.querySelector("#submit");
let tasks = document.getElementById("tasks");

let sortTasks = document.querySelector("#sort");

let highPrioritytasks = [];
let mediumPrioritytasks = [];
let lowPrioritytasks = [];
let sortedTasks = [];

const createNewTodos = () => {
  let description = form.querySelector("#new-task-description").value;
  let duration = form.querySelector("#duration").value;

  let dropDown = document.querySelector("#priority");

  let sortTasks = document.querySelector("#sort");

  function sortTasksByPriority(selectedSort) {
    if (selectedSort === "lowToHigh") {
      sortedTasks = lowPrioritytasks.concat(
        mediumPrioritytasks,
        highPrioritytasks
      );
    } else if (selectedSort === "highToLow") {
      sortedTasks = highPrioritytasks.concat(
        mediumPrioritytasks,
        lowPrioritytasks
      );
    }

    return sortedTasks;
  }

  sortTasks.addEventListener("change", function () {
    let sortValue = sortTasks.value;
    let sortedTasks = sortTasksByPriority(sortValue);

    sortedTasks.forEach((task) => tasks.appendChild(task));
    return sortedTasks;
  });
  let li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  li.textContent += description + " " + duration;

  if (dropDown.value === "high") {
    li.style.color = "red";
    highPrioritytasks.push(li);
  } else if (dropDown.value === "medium") {
    li.style.color = "orange";
    mediumPrioritytasks.push(li);
  } else if (dropDown.value === "low") {
    li.style.color = "teal";
    lowPrioritytasks.push(li);
  }

  function getTasks() {
    highPrioritytasks.forEach((task) => tasks.appendChild(task));
    mediumPrioritytasks.forEach((task) => tasks.appendChild(task));
    lowPrioritytasks.forEach((task) => tasks.appendChild(task));
  }
  getTasks();
  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  });

  deleteBtn.innerText = "X";
  li.appendChild(deleteBtn);
  li.appendChild(checkbox);

  function removeArrayList(lists) {
    const mappedColors = {
      red: highPrioritytasks,
      orange: mediumPrioritytasks,
      teal: lowPrioritytasks,
    };

    let correctTask = mappedColors[lists.style.color];

    let index = correctTask.indexOf(lists);

    if (index > -1) {
      correctTask.splice(index, 1);
    }
  }

  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeArrayList(li);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewTodos();

  e.target.reset();
});
