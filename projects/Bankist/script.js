'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

alert('Please try USER: tk, PIN 5555 or USER: jd, PIN: 2222');

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Tarik Kurtanovic',
  movements: [4300, -222, 102, 70, 23, 90],
  interestRate: 1.1,
  pin: 5555,
};
const account6 = {
  owner: 'Sara Kucevic',
  movements: [15500, -222, 12, 270, 723, 90],
  interestRate: 1.1,
  pin: 6666,
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, reversed = false, sort = false) {
  const mContainer = document.getElementById('movements-container');
  mContainer.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    i = reversed ? movements.length - i : i + 1; // sort deposits or withrawal number with reversed argument
    console.log(i);
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const drow = document.createElement('div');
    drow.classList.add('movements__row');

    const dick = document.createElement('div');
    dick.classList.add('movements__type');
    dick.classList.add(`movements__type--${type}`);
    dick.innerHTML = `${i} ${type}`;

    const value1 = document.createElement('div');
    value1.classList.add('movements__value');
    value1.innerHTML = `${mov}\u20AC`;

    drow.appendChild(dick);
    drow.appendChild(value1);

    mContainer.appendChild(drow);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}\u20AC`; //
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}\u20AC`; // \u20AC  ---- is the EURO sign

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}\u20AC`;

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${intrest}\u20AC`;
};

//function for all objects
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join(''); // tarik kurtanovic ==> tk
  });
};
createUserName(accounts);
console.log(accounts);

const updateUI = function (acc, reversed = false) {
  //display movements
  displayMovements(acc.movements, reversed);
  //display balance
  calcDisplayBalance(currentAccount);
  //display summary
  calcDisplaySummary(acc);
};
// EVENT HANDLERS FOR LOGIN
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent from submitting
  e.preventDefault();
  console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(' ')
      .at(0)}`;
    containerApp.style.opacity = 100;

    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  } else {
    alert('Username or password was entered incorrectly');
  }
  //UPDATE UI
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAccount);
  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    //DOING THE TRANSFER
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movement

    currentAccount.movements.push(amount);
    //udate UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log('DELETED');

    //Delete account
    accounts.splice(index, 1);
    //HIDE UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
  labelWelcome.textContent = `Dear ${currentAccount.owner
    .split(' ')
    .at(0)}, your account has been deleted!`;
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, false, !sorted);
  sorted = !sorted;
});
