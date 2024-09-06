let curRegisterStep = 0;
const registerSteps = document.querySelectorAll(".register-content-step");
const nextButtonOne = document.querySelector(".next-btn-1");
const nextButtonTwo = document.querySelector(".next-btn-2");
const registerSubmit = document.querySelector(".register-submit");
const prevButton = document.querySelectorAll(".prev-btn");
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirmPassword");
const stepProgress = document.querySelectorAll(".step-progress");
const rangeProgress = document.querySelector(".progress-bar span");
const container = document.querySelectorAll(".container");
const startExam = document.querySelector(".start-btn");
const logOut = document.querySelector(".btn-logout");
const tryAgain = document.querySelectorAll(".new-game");
const userInfoContainer = document.querySelector(".user-info");
const users = JSON.parse(localStorage.getItem("users")) || [];
const imageInput = document.querySelector("#image");
const overlayRegister = document.querySelectorAll(".overlay-register");
const isUser = localStorage.getItem("isUser");

let timerRange, timer;

let curIndex = 0,
  myAnswers = [],
  qflag = [],
  totalScore = 0,
  timeFlage = false;

if (isUser == "true") {
  container.forEach((el) => {
    if (!el.classList.contains("hidden")) {
      el.classList.add("hidden");
    }
  });
  container[1].classList.remove("hidden");
  userInfoContainer.classList.remove("hidden");
  clearInterval(timerRange);
  clearInterval(timer);
}

logOut.addEventListener("click", () => {
  localStorage.removeItem("isUser");
  userInfoContainer.classList.remove("side-user-info");
  userInfoContainer.classList.remove("left-100");
  container.forEach((el) => {
    if (!el.classList.contains("hidden")) {
      el.classList.add("hidden");
    }
  });
  userInfoContainer.classList.add("hidden");
  container[0].classList.remove("hidden");
});

nextButtonOne.addEventListener("click", function () {
  if (firstName.value.length < 3) {
    alert("First name must be at least 3 characters");
    firstName.parentElement.style.outline = "2px solid red";
  } else if (lastName.value.length < 3) {
    alert("Last name must be at least 3 characters");
    lastName.parentElement.style.outline = "2px solid red";
  } else {
    registerSteps[curRegisterStep].classList.add("hidden");
    registerSteps[++curRegisterStep].classList.remove("hidden");
    firstName.parentElement.style.outline = "transparent";
    lastName.parentElement.style.outline = "transparent";
    stepProgress[curRegisterStep].classList.add("step-active");
    rangeProgress.style.width = "50%";
  }
});
nextButtonTwo.addEventListener("click", function () {
  if (
    !email.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    alert("invalid email");
    email.parentElement.style.outline = "2px solid red";
  } else {
    registerSteps[curRegisterStep].classList.add("hidden");
    registerSteps[++curRegisterStep].classList.remove("hidden");
    email.parentElement.style.outline = "transparent";
    stepProgress[curRegisterStep].classList.add("step-active");
    rangeProgress.style.width = "100%";
  }
});

let image = "../images/user-png-33842.png";

function stroreUsers() {
  let user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    image,
    highScore: 0,
  };
  const userExists = users.some(
    (existingUser) => existingUser.email === user.email
  );
  if (!userExists) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  } else {
    alert("User with this email already exists");
    return false;
  }
}

registerSubmit.addEventListener("click", () => {
  if (password.value.length < 6) {
    alert("Password must be at least 6 numbers");
    email.parentElement.style.outline = "2px solid red";
  } else if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
  } else {
    if (stroreUsers()) {
      convertRegisterToLogin();
      password.value =
        confirmPassword.value =
        firstName.value =
        lastName.value =
        email.value =
          "";
    }
  }
});

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

prevButton.forEach(function (btn) {
  btn.addEventListener("click", () => {
    stepProgress[curRegisterStep].classList.remove("step-active");
    registerSteps[curRegisterStep--].classList.add("hidden");
    registerSteps[curRegisterStep].classList.remove("hidden");
    if (rangeProgress.style.width == "100%") {
      rangeProgress.style.width = "50%";
    } else {
      rangeProgress.style.width = "0%";
    }
  });
});

function convertRegisterToLogin() {
  document.querySelector(".register-container").classList.add("hidden");
  document.querySelector(".login-container").classList.remove("hidden");
  document.querySelector(".login-container").style.left = "100%";
  document.querySelector(".overlay").style.left = 0;
  overlayRegister[0].classList.add("hidden");
  overlayRegister[1].classList.remove("hidden");
}

document.querySelector(".login-overlay").addEventListener("click", () => {
  convertRegisterToLogin();
});

document.querySelector(".sign-up").addEventListener("click", () => {
  document.querySelector(".login-container").classList.add("hidden");
  document.querySelector(".register-container").classList.remove("hidden");
  document.querySelector(".overlay").style.left = "50%";
  overlayRegister[1].classList.add("hidden");
  overlayRegister[0].classList.remove("hidden");
});

function Login() {
  const emailInput = document.querySelector("#email-login");
  const passwordInput = document.querySelector("#password-login");
  const user = users.find(
    (user) =>
      user.email === emailInput.value && user.password === passwordInput.value
  );
  if (user) {
    container[0].classList.add("hidden");
    container[1].classList.remove("hidden");
    showUserDetails(user);
    localStorage.setItem("isUser", true);
    localStorage.setItem("user", JSON.stringify(user));
    emailInput.value = passwordInput.value = "";
    userInfoContainer.classList.remove("hidden");
    document.querySelector(".login-error").classList.add("hidden");
  } else {
    document.querySelector(".login-error").classList.remove("hidden");
  }
}

const loginBtn = document.querySelector(".btn-login");
loginBtn.addEventListener("click", () => {
  Login();
});

const userImage = document.querySelector(".user-image");
const userName = document.querySelector(".user-name-box");
const emailBox = document.querySelector(".email-box");
const highScoreBox = document.querySelector(".high-score");

let user = JSON.parse(localStorage.getItem("user"));
console.log(user);
showUserDetails(user);

function showUserDetails(user) {
  userImage.src = user.image || image;
  userName.innerHTML = `${user.firstName} ${user.lastName}`;
  emailBox.innerHTML = user.email;
  highScoreBox.innerHTML = user.highScore || 0;
}

function stopSupmit(event) {
  event.preventDefault();
  return false;
}

tryAgain.forEach((el) => {
  el.addEventListener("click", () => {
    startGame();
  });
});

startExam.addEventListener("click", () => {
  startGame();
});

function startGame() {
  container[1].classList.add("hidden");
  container[2].classList.remove("hidden");
  userInfoContainer.classList.add("side-user-info");
  clearInterval(timerRange);
  clearInterval(timer);
  curIndex = 0;
  myAnswers = [];
  qflag = [];
  totalScore = 0;
  timeFlage = false;
  countDown();
  getQuestions();
}

document.querySelector(".arrow-btn").addEventListener("click", () => {
  userInfoContainer.classList.toggle("left-100");
  const classArrow = document.querySelector(".arrow-btn i");
  if (classArrow.className.includes("left")) {
    classArrow.className = classArrow.className.replace("left", "right");
  } else {
    classArrow.className = classArrow.className.replace("right", "left");
  }
});

// exam section

const countSpan = document.querySelector(".count span");
const bulletsSpanContainer = document.querySelector(".bullets .spans");
const quizArea = document.querySelector(".quiz-area");
const answerArea = document.querySelector(".answers-area");
const nextAnswer = document.querySelector(".next-answer");
const prevAnswer = document.querySelector(".prev-answer");
const submitAnswer = document.querySelector(".submit");
const flagBtn = document.querySelector(".flag-btn");
const answers = document.getElementsByName("question");

async function getQuestions() {
  try {
    const response = await fetch("../equstions.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    data = data.sort(() => Math.random() - 0.5).slice(0, 10);
    console.log(data);
    const qCount = data.length;
    quizArea.innerHTML = "";
    answerArea.innerHTML = "";
    submitAnswer.classList.add("hidden");
    nextAnswer.classList.remove("hidden");
    createBullets(qCount);
    addQuestionData(data[curIndex]);
    nextAnswer.onclick = function () {
      storeAnswers();
      curIndex++;
      quizArea.innerHTML = "";
      answerArea.innerHTML = "";
      addQuestionData(data[curIndex]);
      markAnswers();
      prevAnswer.classList.remove("hidden");
      if (curIndex >= 9) {
        submitAnswer.classList.remove("hidden");
        nextAnswer.classList.add("hidden");
      }
      handleBullets();
    };
    prevAnswer.onclick = function () {
      storeAnswers();
      curIndex--;
      if (curIndex <= 0) {
        curIndex = 0;
        this.classList.add("hidden");
      }
      if (curIndex < 10) {
        submitAnswer.classList.add("hidden");
        nextAnswer.classList.remove("hidden");
      }
      quizArea.innerHTML = "";
      answerArea.innerHTML = "";
      addQuestionData(data[curIndex]);
      handleBullets();
      markAnswers();
    };
    const flags = document.querySelector(".flags");
    flagBtn.onclick = () => {
      flags.classList.remove("hidden");
      if (!qflag.includes(curIndex)) {
        let flag = document.createElement("div");
        flag.classList.add("flag");
        flag.dataset.index = curIndex;
        flag.innerHTML = `<i class="fa-regular fa-flag"></i> Question ${
          curIndex + 1
        }
        <i class="fa-regular fa-trash-can delete-flag"></i>`;
        flags.appendChild(flag);
        qflag.push(curIndex);
      }
      deleteFlags();
      showFlags(data);
    };
    submitAnswer.addEventListener("click", () => {
      clearInterval(timerRange);
      clearInterval(timer);
      const flag = document.querySelectorAll(".flags .flag");
      flag.forEach((el) => el.remove());
      flags.classList.add("hidden");
      storeAnswers();
      checkAnswer(data);
      const displayName = document.querySelectorAll(".display-name");
      const displayScore = document.querySelectorAll(".display-score");
      userInfoContainer.classList.remove("side-user-info");
      userInfoContainer.classList.remove("left-100");
      if (timeFlage) {
        container[5].classList.remove("hidden");
        container[2].classList.add("hidden");
        TimeEnd();
      } else if (totalScore < 10) {
        container[3].classList.remove("hidden");
        container[2].classList.add("hidden");
        displayName[0].innerHTML = `${user.firstName} ${user.lastName}`;
        displayScore[0].innerHTML = `${totalScore}`;
      } else if (totalScore === 10) {
        container[4].classList.remove("hidden");
        container[2].classList.add("hidden");
        displayName[1].innerHTML = `${user.firstName} ${user.lastName}`;
        displayScore[1].innerHTML = `${totalScore}`;
      }

      if (user.highScore < totalScore) {
        let curUser;
        users.map((el) => {
          if (el.email == user.email) {
            el.highScore = totalScore;
            curUser = el;
          }
        });
        showUserDetails(curUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(curUser));
      }
    });
  } catch (err) {
    console.error("Error fetching questions:", err);
  }
}

function showFlags(data) {
  const showFlagBtn = document.querySelectorAll(".flag");
  showFlagBtn.forEach((el) => {
    el.addEventListener("click", function () {
      quizArea.innerHTML = "";
      answerArea.innerHTML = "";
      curIndex = parseInt(this.dataset.index);
      if (curIndex < 9) {
        submitAnswer.classList.add("hidden");
        nextAnswer.classList.remove("hidden");
      } else {
        submitAnswer.classList.remove("hidden");
        nextAnswer.classList.add("hidden");
      }
      addQuestionData(data[curIndex]);
      markAnswers();
      handleBullets();
    });
  });
}

function handleBullets() {
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  bulletsSpan.forEach((span) => span.classList.remove("span-active"));
  for (let i = 0; i <= curIndex; i++) {
    bulletsSpan[i].classList.add("span-active");
  }
}

function deleteFlags() {
  const deleteFlag = document.querySelectorAll(".delete-flag");
  deleteFlag.forEach((flag) => {
    flag.addEventListener("click", function (event) {
      const index = parseInt(this.parentElement.dataset.index);
      qflag = qflag.filter((item) => item !== index);
      event.target.parentElement.remove();
    });
  });
}

function createBullets(num) {
  countSpan.innerHTML = num;
  let bulletsSpan = document.querySelectorAll(".bullets .spans span");
  bulletsSpan.forEach((span) => span.remove());
  for (let i = 0; i < 10; i++) {
    let theBullet = document.createElement("span");
    if (i === 0) {
      theBullet.classList.add("span-active");
    }
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj) {
  let questionTitle = document.createElement("h2");
  let questionText = document.createTextNode(obj.question);
  questionTitle.appendChild(questionText);
  quizArea.appendChild(questionTitle);

  for (let i = 0; i < obj.options.length; i++) {
    let mainDiv = document.createElement("div");
    mainDiv.className = "answer";
    let radioInput = document.createElement("input");
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id = `answer-${i + 1}`;
    radioInput.dataset.answer = obj.options[i];
    let radioLabel = document.createElement("label");
    radioLabel.htmlFor = `answer-${i + 1}`;
    let labelText = document.createTextNode(obj.options[i]);
    radioLabel.appendChild(labelText);
    mainDiv.appendChild(radioInput);
    mainDiv.appendChild(radioLabel);
    answerArea.appendChild(mainDiv);
  }
}

function storeAnswers() {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      myAnswers[curIndex] = answers[i].dataset.answer;
    }
  }
}

function markAnswers() {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].dataset.answer == myAnswers[curIndex]) {
      answers[i].checked = true;
    }
  }
}

function checkAnswer(data) {
  totalScore = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].answer === myAnswers[i]) totalScore++;
  }
}

function countDown() {
  const countdown = document.querySelector(".countdown");
  const timeRange = document.querySelector(".time-range");
  const timeRangeCounter = document.querySelector(".time-range span");
  let duration = 60,
    startDuration = 0;
  timerRange = setInterval(() => {
    duration--;
    startDuration++;
    timeRange.style.setProperty(
      "--progress-width",
      `${(startDuration / 60) * 100}%`
    );
    timeRangeCounter.innerHTML = `${parseInt((startDuration / 60) * 100)}%`;
    countdown.textContent = duration;
    if (duration === 0) {
      timeFlage = true;
      submitAnswer.click();
      clearInterval(timerRange);
    }
  }, 1000);
}

function TimeEnd() {
  const timeCounter = document.querySelector(".time-down");
  let duration = 60;
  timer = setInterval(() => {
    duration--;
    if (duration < 10) {
      timeCounter.innerHTML = "0" + duration;
    } else {
      timeCounter.innerHTML = duration;
    }
    if (duration === 0) {
      timeCounter.innerHTML = "00";
      clearInterval(timer);
    }
  }, 50);
}
