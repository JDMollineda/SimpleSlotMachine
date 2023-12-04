// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again


const screen = document.querySelector(".screen-pieces")
const text = document.querySelector(".main-text")

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOL_VALUES = {
    A: 10,
    B: 8,
    C: 6,
    D: 4
};

const deposit = () => {
    const depositAmount = localStorage.getItem("deposit");
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit Amount");
    } else {
        return numberDepositAmount;
    }
};

const getNUmberOfLines = () => {
    const lines = localStorage.getItem("lines");    
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        console.log("Invalid number of lines, try again.");
    } else {
        return numberOfLines;
    }
};

const getBet = (balance, lines) => {
    const bet = localStorage.getItem("bet");    
    const numberBet = parseFloat(bet);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)) {
        console.log("Invalid bet, try again. ");
        text.innerHTML = "Invalid bet, try again.";
        btnSpin.setAttribute("disabled", true);
        btnDeposit.removeAttribute('disabled');
        balanceInput1.removeAttribute('disabled');
    } else {
        return numberBet;
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    console.log(...rows);
    return rows;
};

const printRows = (rows) => {
    screen.innerHTML = "";
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        screen.innerHTML += "| " + rowString + "| <br>";
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {    
    let balance = deposit();
    text.innerHTML = "You are a WINNER! be patient";
    // text.innerHTML = "You have a balance of $" + balance;
    const numberOfLines = getNUmberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    localStorage.setItem("deposit", balance);
    setTimeout(() => {
        if (winnings > 0){
            text.innerHTML = "You Won, $" + winnings.toString();
        } else {
            text.innerHTML = "Almost There!";
        }
        htmlBalance.innerHTML = "$" + localStorage.getItem("deposit");        
    }, 2000);

};




