"use strict";

//https://www.statista.com/statistics/270861/life-expectancy-by-continent/
const lifeExpectancy = {
  OC: {
    name: "Oceania",
    females: 81,
    males: 76,
  },
  EU: {
    name: "Europe",
    females: 81,
    males: 75,
  },
  NA: {
    name: "Northern America",
    females: 80,
    males: 74,
  },
  AS: {
    name: "Asia",
    females: 76,
    males: 72,
  },
  LA: {
    name: "Latin America and Caribbean",
    females: 77,
    males: 71,
  },
  AF: {
    name: "Africa",
    females: 65,
    males: 61,
  },
  WW: {
    name: "World Wide",
    females: 75,
    males: 70,
  },
};

const UslifeExpectancy = 78;
const YEAR_WEEKS = 52;
const userDate = getOrSetBirthday();

const todayDate = new Date();
const weeksLived = getWeeksLived(userDate);
const weeksBody = document.querySelector("#weeks");

const dots = document.createElement("div");
dots.className = "dotsContainer";

const getUserLifeExpectancy = getLifeExpectancy();
let weeksCounter = 0;
for (let year = 1; year <= getUserLifeExpectancy.males; year++) {
  const yearRow = document.createElement("div");
  yearRow.className = "year";

  for (let week = 1; week <= YEAR_WEEKS; week++) {
    weeksCounter++;
    const weekDot = document.createElement("div");
    weekDot.className = "weekDot";
    if (week === 26) {
      weekDot.classList.add("w27");
    } else if (week === 27) {
      weekDot.classList.add("w28");
    }
    if (weeksCounter <= weeksLived) {
      weekDot.style.backgroundColor = "black";
    }
    yearRow.appendChild(weekDot);
  }

  if (year % 10 === 0) {
    yearRow.classList.add("decade");
  }

  dots.appendChild(yearRow);
}

weeksBody.appendChild(dots);

function getWeeksLived(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  const diffInMilliseconds = today - birth;
  let weeksLived = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));
  return weeksLived;
  // leap years
  //   https://date-fns.org/v4.1.0/docs/CDN
}

function getOrSetBirthday() {
  let birthday = localStorage.getItem("birthday");
  let userEntry = null;
  if (!birthday) {
    userEntry = prompt("Type your date of birth: YYYY-MM-DD");
    while (!isValidDate(userEntry)) {
      userEntry = prompt(
        "Wrong Format! Please type your date of birth again: YYYY-MM-DD"
      );
    }
    localStorage.setItem("birthday", userEntry);
    birthday = localStorage.getItem("birthday");
  }
  return birthday;
}

function isValidDate(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dateString)) {
    return false;
  }
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function getLifeExpectancy() {
  let userOption = localStorage.getItem("lifeExpectancy");
  if (!userOption) {
    localStorage.setItem("lifeExpectancy", JSON.stringify(lifeExpectancy.WW));
    userOption = localStorage.getItem("lifeExpectancy");
  }
  renderUserLifeExpectancy(JSON.parse(userOption));
  return JSON.parse(userOption);
}

function renderUserLifeExpectancy(lifeOption) {
  const options = document.getElementById("dropdown-content");
  for (const opt in lifeExpectancy) {
    const optParagraph = document.createElement("p");
    optParagraph.innerText = `${lifeExpectancy[opt].name} (${lifeExpectancy[opt].males})`;
    optParagraph.onclick = function () {
      localStorage.setItem(
        "lifeExpectancy",
        JSON.stringify(lifeExpectancy[opt])
      );
      window.location.reload();
    };
    options.appendChild(optParagraph);
  }
  const lifeExpectancySpan = document.getElementById("userLifeExpectancy");
  lifeExpectancySpan.innerText = `Life Expectancy: ${lifeOption.name} (${lifeOption.males})`;
}
