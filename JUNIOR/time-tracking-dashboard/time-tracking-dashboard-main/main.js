const dailyMode = document.getElementById("dailyMode");
const weeklyMode = document.getElementById("weeklyMode");
const monthlyMode = document.getElementById("monthlyMode");
const gridContainer = document.getElementById("Container");

let selectedMode = "weekly";

makeNewCards(selectedMode);

// Changing Modes
dailyMode.addEventListener("click", e => {
  if (selectedMode != "daily") {
    selectedMode = "daily";
    dailyMode.classList.add("selected-mode");
    weeklyMode.classList.remove("selected-mode");
    monthlyMode.classList.remove("selected-mode");

    removeExistingCards();
    makeNewCards(selectedMode);
  }
});

weeklyMode.addEventListener("click", e => {
  if (selectedMode != "weekly") {
    selectedMode = "weekly";
    dailyMode.classList.remove("selected-mode");
    weeklyMode.classList.add("selected-mode");
    monthlyMode.classList.remove("selected-mode");

    removeExistingCards();
    makeNewCards(selectedMode);
  }
});

monthlyMode.addEventListener("click", e => {
  if (selectedMode != "monthly") {
    selectedMode = "monthly";
    dailyMode.classList.remove("selected-mode");
    weeklyMode.classList.remove("selected-mode");
    monthlyMode.classList.add("selected-mode");

    removeExistingCards();
    makeNewCards(selectedMode);
  }
});

function makeNewCards(mode) {
  fetch("./data.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("An unknown error occured!");
      }
      return res.json();
    })
    .then(data => {
      data.forEach(element => {
        let cardSVG = "";
        let cardTitle = element.title;
        let cardHours = 0;
        let cardHoursPrevious = 0;
        let modeText = "";

        switch (mode) {
          case "daily":
            cardHours = element.timeframes.daily.current;
            cardHoursPrevious = element.timeframes.daily.previous;
            modeText = "Yesterday";
            break;
          case "weekly":
            cardHours = element.timeframes.weekly.current;
            cardHoursPrevious = element.timeframes.weekly.previous;
            modeText = "Last Week";
            break;
          case "monthly":
            cardHours = element.timeframes.monthly.current;
            cardHoursPrevious = element.timeframes.monthly.previous;
            modeText = "Last Month";
            break;
        }

        switch (cardTitle) {
          case "Work":
            cardSVG = "images/icon-work.svg";
            break;
          case "Play":
            cardSVG = "images/icon-play.svg";
            break;
          case "Study":
            cardSVG = "images/icon-study.svg";
            break;
          case "Exercise":
            cardSVG = "images/icon-exercise.svg";
            break;
          case "Social":
            cardSVG = "images/icon-social.svg";
            break;
          case "Self Care":
            cardSVG = "images/icon-self-care.svg";
            cardTitle = "Self-care";
            break;
        }

        const card = document.createElement("div");
        card.innerHTML = `
            <div class="card card-${cardTitle.toLowerCase()}">
            <div class="card-top card-top-${cardTitle.toLowerCase()}">
              <img src="${cardSVG}" alt="" class="category-svg">
            </div>
            <div class="card-bottom">
              <div class="heading">
                <h3>${cardTitle}</h3>
                <img src="images/icon-ellipsis.svg" alt="">
              </div>
              <div class="card-bottom-row">
                <h1 id="hours">${cardHours}hrs</h1>
                <p id="previousHours">${modeText} - ${cardHoursPrevious}hrs</p>
              </div> 
            </div>
          </div>
          `;

        Container.appendChild(card);
      });
    })
    .catch(error => console.error(error));
}

function removeExistingCards() {
  for (let index = 0; index < 6; index++) {
    Container.removeChild(Container.lastElementChild);
  }
}
