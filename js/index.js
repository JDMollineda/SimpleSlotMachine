const htmlBalance = document.querySelector('.balance');
htmlBalance.innerHTML = "$00.00";
const htmlLines = document.querySelector('.lines');
htmlLines.innerHTML = "Lines";
const htmlBet = document.querySelector('.bet-lines');
htmlBet.innerHTML = "$$$ Per Line";

const btnDeposit = document.querySelector('#btn-deposit');
const balanceInput1 = document.querySelector('#balance-input1');

const btnLines = document.querySelector('#btn-lines');
const balanceInput2 = document.querySelector('#balance-input2');

const btnBet = document.querySelector('#btn-bet');
const balanceInput3 = document.querySelector('#balance-input3');

const btnSpin = document.querySelector('#spin');
const btnCash = document.querySelector('#cash');

const body = document.querySelector('body')


btnDeposit.addEventListener('click', () => {
    if (balanceInput1.value == NaN || balanceInput1.value <= 0) {
        alert('must be a valid amount!');
    } else {
        localStorage.setItem("deposit", balanceInput1.value);
        htmlBalance.innerHTML = "$" + balanceInput1.value;
        btnDeposit.setAttribute('disabled', true);
        balanceInput1.setAttribute('disabled', true);
        balanceInput2.removeAttribute("disabled");
        btnLines.removeAttribute("disabled");
    }
});

btnLines.addEventListener('click', () => {
    if (balanceInput2.value > 3) {
        alert('must be less than 3!');
    } else {
        localStorage.setItem("lines", balanceInput2.value);
        htmlLines.innerHTML = balanceInput2.value + " Lines";
        btnLines.setAttribute('disabled', true);
        balanceInput2.setAttribute('disabled', true);
        balanceInput3.removeAttribute("disabled");
        btnBet.removeAttribute("disabled");
    }
});

btnBet.addEventListener('click', () => {
    if (balanceInput3.value <= 0 || balanceInput3.value >= (balanceInput1.value / balanceInput2.value)) {
        alert("Unauthorized Bet")
    } else {
        localStorage.setItem("bet", balanceInput3.value);
        htmlBet.innerHTML = "$" + balanceInput3.value + " per Line";
        btnBet.setAttribute('disabled', true);
        balanceInput3.setAttribute('disabled', true);
        btnSpin.removeAttribute("disabled");
    }

});

btnSpin.addEventListener('click', () => {

    if (localStorage.getItem("deposit") == NaN) {
        htmlBalance.innerHTML = "$00.00";
        text.innerHTML = "You ran out of Money!"
        btnSpin.setAttribute("disabled", true);
        btnDeposit.removeAttribute('disabled');
        balanceInput1.removeAttribute('disabled');
    } else if (localStorage.getItem("deposit") <= 0) {
        localStorage.setItem("deposit", 0)
        text.innerHTML = "You ran out of money!"
        btnSpin.setAttribute("disabled", true);
        btnDeposit.removeAttribute('disabled');
        balanceInput1.removeAttribute('disabled');
    } else if (localStorage.getItem("bet") <= 0 || localStorage.getItem("bet") > (localStorage.getItem("deposit") / localStorage.getItem("lines"))) {
        // console.log("Invalid bet, try again. ");
        text.innerHTML = "Invalid bet, try again.";
        btnSpin.setAttribute("disabled", true);
        btnLines.removeAttribute('disabled');
        balanceInput2.removeAttribute('disabled');
    } else {
        btnLines.removeAttribute('disabled');
        balanceInput2.removeAttribute('disabled');
        game()
        screen.classList.toggle("screen-animation")
        btnSpin.setAttribute("disabled", true);
        setTimeout(() => {
            screen.classList.toggle("screen-animation")
            btnSpin.removeAttribute("disabled");
            // screen.classList.toggle("text-light")
        }, 2000);
    }
})

btnCash.addEventListener('click', () => {
    btnLines.setAttribute("disabled", true);
    balanceInput2.setAttribute("disabled", true);
    localStorage.setItem("deposit", "")
    btnBet.setAttribute("disabled", true);
    balanceInput3.setAttribute("disabled", true);
    localStorage.setItem("lines", "")
    btnDeposit.removeAttribute('disabled');
    balanceInput1.removeAttribute('disabled');
    localStorage.setItem("bet", "")
    htmlBalance.innerHTML = "$00.00";
    htmlLines.innerHTML = "Lines";
    htmlBet.innerHTML = "$$$ Per Line";
    text.innerHTML = "Try your Luck Again!";
})

setInterval(() => {
    gradient.classList.toggle("text-dark");
    btnSpin.classList.toggle("text-light");
    // body.classList.toggle("body-flash");
}, 300);