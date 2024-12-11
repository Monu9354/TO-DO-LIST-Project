const checkboxes = document.querySelectorAll(".checkbox");
const goalInputs = document.querySelectorAll(".goal-input");
const errorMsg = document.querySelector(".error-msg");
const progressBar = document.querySelector(".progress-bar-filler");

const userGoals = JSON.parse(localStorage.getItem('userGoals')) || {}

let completedGoalsCount = Object.values(userGoals).filter((goal) => goal.completed ) 
progressBar.style.width = `${completedGoalsCount.length / 3 *100 } %`;



checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click" , () => {
     const goalInputFilled = [...goalInputs].every((goalInput) => {
            return goalInput.value ;
        })
     if(goalInputFilled){
        checkbox.parentElement.classList.toggle("completed");
        userGoals[checkbox.nextElementSibling.id].completed = !userGoals[checkbox.nextElementSibling.id].completed ;
        completedGoalsCount = Object.values(userGoals).filter((goal) => goal.completed ) ;
        localStorage.setItem("userGoals" , JSON.stringify(userGoals));
        progressBar.style.width = `${completedGoalsCount.length / 3 *100 } %`;

        
     }
     else{
       errorMsg.classList.remove("show-error");
     }
    })
})


goalInputs.forEach((goalInput) => {
    if(userGoals[goalInput.id]){
     goalInput.value = userGoals[goalInput.id].name ;
    }
    
     goalInput.addEventListener("focus" , () =>{
        errorMsg.classList.add("show-error");
     })

     goalInput.addEventListener("input" , (e) => {
        userGoals[goalInput.id] = {
              name:goalInput.value,
              completed:false,
        }
        localStorage.setItem("userGoals" , JSON.stringify(userGoals));
     })
})





