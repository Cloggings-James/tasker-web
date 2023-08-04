document.addEventListener("DOMContentLoaded", () => {
  // Sample categories data
  const categories = ["Backlog", "To Do", "In-Progress", "Completed"];

  // Get the tabs container element
  const tabsContainer = document.querySelector(".tabs");

  // Function to create a tab element
  const createTabElement = (category) => {
    const tab = document.createElement("button");
    tab.textContent = category;
    return tab;
  };

  // Dynamically create tabs for categories
  categories.forEach((category) => {
    const tab = createTabElement(category);
    tabsContainer.appendChild(tab);
  });

  // Add functionality to the "Add Category" button
  const addCategoryBtn = document.getElementById("add-category-btn");
  addCategoryBtn.addEventListener("click", () => {
    const newCategory = prompt("Enter the name of the new category:");
    if (newCategory) {
      const tab = createTabElement(newCategory);
      tabsContainer.insertBefore(tab, addCategoryBtn);
    }
  });

  // Sample tasks data for each category
  const tasksData = {
    backlog: [
      { title: "Buy Groceries", description: "Buy milk, eggs, and bread", date: "2023-08-10" },
      { title: "Finish Report", description: "Complete the monthly sales report", date: "2023-08-15" },
    ],
    todo: [
      // Sample tasks for the "To Do" category (empty for now)
    ],
    inprogress: [
      // Sample tasks for the "In-Progress" category (empty for now)
    ],
    completed: [
      // Sample tasks for the "Completed" category (empty for now)
    ],
  };

  // Function to open the modal with task details
  const openModal = (task) => {
    const modal = document.querySelector(".modal");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDescription = modal.querySelector(".modal-description");
    const modalDate = modal.querySelector(".modal-date");

    modalTitle.textContent = task.title;
    modalDescription.textContent = task.description;
    modalDate.textContent = "Date: " + task.date;

    const modalContainer = document.querySelector(".modal-container");
    modalContainer.style.display = "flex";
  };

  // Function to close the modal
  const closeModal = () => {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.style.display = "none";
  };

  // Function to create a task element with delete button
  const createTaskElement = (task) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.addEventListener("click", () => openModal(task)); // Open modal on task click

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      li.remove(); // Remove task from the list
    });

    li.appendChild(deleteBtn);
    return li;
  };

  // Function to create tasks for a category
  const createTasksForCategory = (category, tasks) => {
    const categorySection = document.createElement("div");
    categorySection.classList.add("category");
    const h2 = document.createElement("h2");
    h2.textContent = category;
    categorySection.appendChild(h2);

    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");
    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });

    categorySection.appendChild(taskList);

    return categorySection;
  };

  // Dynamically create category sections with tasks
  for (const category in tasksData) {
    const tasks = tasksData[category];
    const categorySection = createTasksForCategory(category, tasks);

    const tasksSection = document.querySelector(".tasks");
    tasksSection.appendChild(categorySection);
  }

  // Add functionality to close the modal on "Close" button click
  const modalCloseBtn = document.querySelector(".modal-close-btn");
  modalCloseBtn.addEventListener("click", closeModal);

  // Close the modal when clicking outside the modal
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      closeModal();
    }
  });
});

