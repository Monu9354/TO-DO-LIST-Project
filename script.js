const checkboxes = document.querySelectorAll(".checkbox");
const goalInputs = document.querySelectorAll(".goal-input");
const errorMsg = document.querySelector(".error-msg");
const progressBar = document.querySelector(".progress-bar-filler");
const progressLabel = document.querySelector(".progress-label");
const progressValue = document.querySelector(".progress-value");
const allQuotes = [
   'Raise the bar by completing your goals!',
   'Well begun is half done!',
   'Just a step away, keep going!',
   "Amazing work! You're unstoppable!",
   "Mission accomplished! You're a true go-getter!",
   "Bravo! Another goal bites the dust!",
   "Goals cleared, now it's time to celebrate!",
   "You're on fire! Keep that momentum alive!",
   "Outstanding! You're one step closer to greatness!",
   "What a champ! Keep reaching for the stars!",
   "Boom! Another goal smashed to perfection!",
   "You did it! Now, let the good vibes roll!",
   "Victory is yours! Keep making magic happen!",
   "Fantastic! The world better watch out for you!",
   "Goals complete, and the future looks even brighter!",
   "You're the definition of success right now!",
   "Congrats! Your hard work just paid off big time!",
   "Way to go! You crushed it like a pro!",
   "Whoa! You just completed all the goals, time for chill :D",
]
const userGoals = JSON.parse(localStorage.getItem('userGoals')) || {}


let completedGoals = Object.values(userGoals).filter((goal) => goal.completed)
progressBar.style.width = `${completedGoals.length / goalInputs.length * 100}%`;
progressLabel.innerText = allQuotes[completedGoals.length];
progressValue.innerText = `${completedGoals.length} / ${goalInputs.length} completed`;

checkboxes.forEach((checkbox) => {
   checkbox.addEventListener("click", () => {
      const goalInputFilled = [...goalInputs].every((goalInput) => {
         return goalInput.value;
      })
      if (goalInputFilled) {
         checkbox.parentElement.classList.toggle("completed");
         userGoals[checkbox.nextElementSibling.id].completed = !userGoals[checkbox.nextElementSibling.id].completed;
         completedGoals = Object.values(userGoals).filter((goal) => goal.completed);
         progressBar.style.width = `${completedGoals.length / goalInputs.length * 100}%`;
         progressLabel.innerText = allQuotes[completedGoals.length];
         progressValue.innerText = `${completedGoals.length} / ${goalInputs.length} completed`;
         localStorage.setItem("userGoals", JSON.stringify(userGoals));
      }
      else {
         errorMsg.classList.remove("show-error");
      }
   })
})


goalInputs.forEach((goalInput) => {
   if (userGoals[goalInput.id]) {
      goalInput.value = userGoals[goalInput.id].name;
      if (userGoals[goalInput.id].completed) {
         goalInput.parentElement.classList.add("completed");
      }
   }
   goalInput.addEventListener("focus" , () => {
      errorMsg.classList.add("show-error");
   })

   goalInput.addEventListener("input", (e) => {
      if (userGoals[goalInput.id] && userGoals[goalInput.id].completed) {
         goalInput.value = userGoals[goalInput.id].name ;
         return ;
      }
      userGoals[goalInput.id] = {
         name: goalInput.value,
         completed: false,
      }
      localStorage.setItem("userGoals", JSON.stringify(userGoals));
   })
})





