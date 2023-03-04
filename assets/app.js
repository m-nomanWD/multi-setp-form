const data = [
  {
    title: "Personal info",
    subHeading: "Please provide your name, email address, and phone number.",
  },
  {
    title: "Select your plan",
    subHeading: "You have the option of monthly or yearly billing.",
  },
  {
    title: "Pick add-ons",
    subHeading: "Add-ons help enhance your gaming experience.",
  },
  {
    title: "Finishing up",
    subHeading: "Double-check everything looks OK before confirming.",
  },
  { tittle: "", subHeading: "" },
];
const backBtn = document.querySelector(".go-back");
const form1Btn = document.querySelector(".form1-btn");
const form2Btn = document.querySelector(".form2-btn");
const form3Btn = document.querySelector(".form3-btn");
const formNumbers = document.querySelectorAll(".number");
const formHeader = document.querySelector(".form-header");
const tittle = formHeader.querySelector("h1");
const subHeading = formHeader.querySelector("p");
const centerPart = document.querySelectorAll(".center");
const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const number = document.querySelector("#number");
const planBoxesContainer = document.querySelector(".plan-boxs");
const planBoxs = planBoxesContainer.querySelectorAll(".plan-box");

const priceToggleBtn = document.querySelector(".toggle-btn");
const DurationTags = document.querySelectorAll(".dauration");
const priceTags = document.querySelectorAll(".price");
const form4Duration = document.querySelector(".time-duration");
const validity = document.querySelector(".validity");
const changeDuration = document.querySelector(".change");
const totalAmount = document.querySelector(".total-price");
const extraOffers = document.querySelector(".extra-offers");
const finishBtn = document.querySelector(".finish-btn");
const finishCard = document.querySelector(".finish");
var planValues = { textContent: "Arcade", price: 5, duaration: "mo" };

let i = 1;
let emailFlag = false;
let nameFlag = false;
let numberFlag = false;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

form1Btn.addEventListener("click", () => {
  if (emailFlag === false || nameFlag === false || numberFlag === false) {
    nameCheck();
    emailCheck();
    checkNumber();
    console.log(i);
  } else {
    console.log(i);
    i += 1;
    console.log(i);

    numbersStateCheck();
    changeHeaderText();
    showControls();
    backBtn.classList.add("show");
  }
});
form2Btn.addEventListener("click", () => {
  i += 1;
  numbersStateCheck();
  changeHeaderText();
  showControls();
});
const checkMarkImgs = document.querySelectorAll(".check-markimg");

checkMarkImgs.forEach((checkMarkImg) => {
  checkMarkImg.addEventListener("click", () => {
    checkMarkImg.classList.toggle("show-checkImg");
    checkMarkImg.parentElement.parentElement.classList.toggle(
      "border-color-add"
    );
  });
});

form3Btn.addEventListener("click", () => {
  const cheked = [...checkMarkImgs].filter((checkimg) => {
    return checkimg.classList.contains("show-checkImg");
  });

  i += 1;
  const billHead = document.querySelector(".bill-head");
  const offerName = billHead.querySelector(".offer-name");
  const price = billHead.querySelector(".price");

  const duaration = billHead.querySelector(".dauration");

  totalBill = parseInt(totalAmount.textContent);
  offerName.textContent = planValues.textContent;
  price.textContent = planValues.price;
  duaration.textContent = planValues.duaration;
  console.log(offerName);
  var extra = 0;
  var selectOffers = cheked
    .map((element) => {
      const price = parseInt(
        element.parentElement.parentElement.children[1].children[0].children[0]
          .textContent
      );
      const duration =
        element.parentElement.parentElement.children[1].children[0].children[1]
          .textContent;
      const title = element.parentElement.children[1].children[0].textContent;

      extra += price;
      return `<div class="show-flex">
                <p>${title}</p>
                <h5>
                $<span class="price">${price}</span>/<span class="dauration">${duration}</span>
              </h5>
              </div>`;
    })
    .join("");
  extraOffers.innerHTML = selectOffers;
  totalAmount.textContent = extra + parseInt(planValues.price);

  numbersStateCheck();
  changeHeaderText();

  showControls();
});
changeDuration.addEventListener("click", () => {
  const extraOffer = extraOffers.querySelectorAll(".show-flex");

  const price = priceToggleBtn.classList.toggle("toggle-btn-move");

  yearMonthToggle();
  if (priceToggleBtn.classList.contains("toggle-btn-move")) {
    totalAmount.textContent *= 10;
    extraOffer.forEach((offer) => {
      offer.children[1].children[0].textContent *= 10;
    });
  }
  if (!priceToggleBtn.classList.contains("toggle-btn-move")) {
    extraOffer.forEach((offer) => {
      offer.children[1].children[0].textContent /= 10;
    });
    totalAmount.textContent /= 10;
  }
});
finishBtn.addEventListener("click", () => {
  i += 1;
  changeHeaderText();
  finishCard.classList.add("show-flex");
  centerPart.forEach((center) => {
    center.classList.remove("show");
  });
  backBtn.style.display = "none";
});

backBtn.addEventListener("click", () => {
  i -= 1;
  numbersStateCheck();
  changeHeaderText();
  showControls();
  if (i === 1) {
    backBtn.classList.remove("show");
  }
  emailFlag = false;
  nameFlag = false;
  numberFlag = false;
});

planBoxs.forEach((planBox) => {
  planBox.addEventListener("click", () => {
    const target = planBox;
    const price = planBox.querySelector(".price");
    const duration = planBox.querySelector(".dauration");
    planBoxs.forEach((planBox) => {
      if (target !== planBox) {
        planBox.classList.remove("plan-box-select");
      }
    });

    const textContent = planBox.children[1].children[0].textContent;
    planValues = {
      price: parseInt(price.textContent),
      textContent: textContent,
      duaration: duration.textContent,
    };
    target.classList.toggle("plan-box-select");
  });
});

priceToggleBtn.addEventListener("click", () => {
  priceToggleBtn.classList.toggle("toggle-btn-move");
  yearMonthToggle();
});

// %%%%%%%%%%%%%%% functions %%%%%%%%%%%%%%%%%%
function yearMonthToggle() {
  const yearly = document.querySelector(".yearly");
  const monthly = document.querySelector(".monthly");
  if (priceToggleBtn.classList.contains("toggle-btn-move")) {
    priceTags.forEach((p) => {
      p.textContent = parseInt(p.textContent) * 10;
    });
    DurationTags.forEach((d) => {
      d.textContent = "yr";
    });
    planBoxs.forEach((planB) => {
      planB.classList.add("planbox-full-show");
    });
    yearly.classList.add("active");
    monthly.classList.remove("active");
    planValues.price *= 10;
    planValues.duaration = "yr";

    validity.textContent = "(Yearly)";
    form4Duration.textContent = "(Per Year)";
  }
  if (!priceToggleBtn.classList.contains("toggle-btn-move")) {
    priceTags.forEach((p) => {
      p.textContent = parseInt(p.textContent) / 10;
    });
    DurationTags.forEach((d) => {
      d.textContent = "mo";
    });
    planBoxs.forEach((planB) => {
      planB.classList.remove("planbox-full-show");
    });

    validity.textContent = "(Monthly)";
    form4Duration.textContent = "(Per Month)";

    planValues.price /= 10;
    planValues.duaration = "mo";
    monthly.classList.add("active");
    yearly.classList.remove("active");
  }
}

function numbersStateCheck() {
  formNumbers.forEach((number) => {
    if (number.textContent == i) {
      number.classList.add("active-number");
    } else {
      number.classList.remove("active-number");
    }
  });
}
function showControls() {
  centerPart.forEach((center) => {
    const id = center.dataset.id;
    if (id == i) {
      center.classList.add("show");
    } else {
      center.classList.remove("show");
    }
  });
}

function nameCheck() {
  const errorBg = document.querySelector(".name-span");
  if (userName.value === "") {
    showMag(errorBg, userName, "This feild is required");
    nameFlag = false;
  } else {
    nameFlag = true;
  }
  console.log(nameFlag);
}
function emailCheck() {
  const errorBg = document.querySelector(".email-span");
  if (email.value === "") {
    showMag(errorBg, email, "This feild is required");
    emailFlag = false;
  } else if (!validMail(email.value)) {
    showMag(errorBg, email, "Make sure it's an Email");
    emailFlag = false;
  } else {
    emailFlag = true;
  }
  console.log(emailFlag);
}
function checkNumber() {
  var phoneno =
    /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/;
  const errorBg = document.querySelector(".number-span");
  if (number.value === "") {
    showMag(errorBg, number, "This feild is required");
    numberFlag = false;
  } else if (number.value !== "" && !number.value.match(phoneno)) {
    showMag(errorBg, number, "make sure it's a valid number");
  } else {
    numberFlag = true;
  }
  console.log(numberFlag);
}

function showMag(errorBg, input, msg) {
  errorBg.classList.add("show-error");
  input.classList.add("active-border");
  errorBg.textContent = msg;

  setTimeout(() => {
    errorBg.classList.remove("show-error");
    input.classList.remove("active-border");
  }, 3000);
}
function changeHeaderText() {
  tittle.textContent = data[i - 1].title;
  subHeading.textContent = data[i - 1].subHeading;
}
function validMail(mail) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    mail
  );
}
