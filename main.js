"use strict";

const UslifeExpectancy = 78;
const YEAR_WEEKS = 52;
const userDate = prompt("Type your date of birth: MM/DD/YYYY");

const todayDate = new Date();
const weeksLived = getWeeksLived(userDate);
const weeksBody = document.querySelector("#weeks");

//prompt("Type your date of birth: MM/DD/YYYY");

const dots = document.createElement("div");
dots.className = "dotsContainer";

let weeksCounter = 0;
for (let year = 1; year <= UslifeExpectancy; year++) {
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
