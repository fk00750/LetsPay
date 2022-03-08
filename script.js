"use strict";

//////////////////////////////////////////////////
//////////////////////////////////////////////////

// ! DATA

const account1 = {
  owner: "Alex Wright",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
};

const account2 = {
  owner: "Emma Rogers",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
};

const account3 = {
  owner: "Ethan Keegan",
  movements: [430, 1000, 700, 50, 90],
  pin: 3333,
};

const account4 = {
  owner: "Steve Borris Jackson",
  movements: [200, 300, -200, 700, -500, 300, 200, -600],
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// ! Elements

// total balance
const labelBalance = document.querySelector(".statement_value");
// main section
const containerApp = document.querySelector(".main");
// loginContainer
const logIN_container = document.querySelector(".container");
// statements
const containerStatements = document.querySelector(".statements");

const inputLoginUsername = document.querySelector(".username");
const inputLoginPassword = document.querySelector(".password");
const inputTransferTo = document.querySelector(".input_transfer--to");
const inputTransferAmount = document.querySelector(".input_transfer--amount");

// buttons
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form_btn-transfer");
const btnLogOut = document.querySelector(".logOut_btn");

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const statements = [200, 300, -200, 700, -500, 300, 200, -600]; // 400

containerStatements.innerHTML = "";

// ! Displaying statements

const displayStatements = function (statements) {
  statements.forEach((mov, i) => {
    ///////////////////////////

    const type = mov > 0 ? "Received" : "Paid";
    const color = mov > 0 ? "bg-green-400" : "bg-red-400";
    // console.log(type);

    const html = `<div class="statements_row flex p-4 justify-between">
    <div
      class="statement_type statement_type_paid ${color} px-2 rounded-md text-white font-medium"
    >
    ${i + 1} ${type}
    </div>
    <div class="statement_value">${mov}$</div>
  </div>
  <hr />`;

    containerStatements.insertAdjacentHTML("afterbegin", html);
    // console.log(`mov : ${mov} and index : ${i}`);
  });
};

// ! Calculate total balance
// // * with reduce meth
// labelBalance.textContent = `${statements.reduce((accu, curr) => accu + curr,0)}$` // 400

const calculateBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, curr) => accu + curr, 0);

  labelBalance.textContent = `${acc.balance}$`;
};

const createUserNames = function (accs) {
  // console.log(accs);
  accs.forEach((acc) => {
    // console.log(acc);
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => {
        return name[0];
      })
      .join("");
  });
};

const createPassword = function (accs) {
  accs.forEach((acc) => {
    const pin = acc.pin;
    const today = new Date().getDate() + new Date().getHours();
    const logIn_passwd = today * pin;
    acc.password = logIn_passwd;
    // console.log(acc);
  });
};

const UpdateUi = function (acc) {
  // * display statements
  displayStatements(acc.movements);

  // * display balance
  calculateBalance(acc);
};

// creating username
createUserNames(accounts);

// creating password
createPassword(accounts);

const removeLog = function () {
  // console.log('hello');
  logIN_container.parentNode.removeChild(logIN_container);
  // document.querySelector('.container').style.opacity = 0;
};

const appendLog = function () {
  document.body.prepend(logIN_container);
};

// ! login user
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  // console.log('hello');

  // * find account
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    ///////////////////////
    console.log("yes");
    // logIN_container.parentNode.removeChild(logIN_container);
    // containerApp.parentNode.appendChild(containerApp);
    removeLog();
    containerApp.style.opacity = 100;

    // * clear input fields
    inputLoginUsername.value = inputLoginPassword.value = "";
    inputLoginPassword.blur();

    // * update the ui
    UpdateUi(currentAccount);
  }
});

// ! logOut User
btnLogOut.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("---logOut---");

  // find index of logging out account
  const index = accounts.findIndex((acc) => {
    acc.username === currentAccount.username;
  });

  console.log(index);

  accounts.splice(index, 1);
  console.log(accounts);

  // containerApp.parentNode.appendChild(containerApp);
  appendLog();
  containerApp.style.opacity = 0;
});

// ! Transfering money
btnTransfer.addEventListener("click", function (e) {
  ////////////////////////
  e.preventDefault();

  // inputTransferTo.value;
  // inputTransferAmount.value;

  // console.log(inputTransferTo.value, inputTransferAmount.value);

  // * finding username to send money
  const recieverName = inputTransferTo.value;

  const recieverAcc = accounts.find((acc) => acc.username === recieverName);

  // * transfering amount
  const amount = Number(inputTransferAmount.value);

  console.log(recieverName);
  console.log(recieverAcc, amount);

  inputTransferAmount.value = inputTransferTo.value = "";

  // * logic
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // * show paid money to current account
    console.log("---Transfer---");
    currentAccount.movements.push(-amount);
    // * show or send money to reciverAccount
    recieverAcc.movements.push(amount);

    // update ui
    UpdateUi(currentAccount);
  }
});

console.log(accounts);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

// function removefun() {
//   down.style.opacity = 100;
// }
