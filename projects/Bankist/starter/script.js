'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

    // JONASOV KOD
    //   const html = `<div class="movements__row">
    //   <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    //   <div class="movements__value">4 ${mov}</div>
    // </div>`;
  });
  // balance print and calc
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}\u20AC`; // \u20AC  ---- is the EURO sign
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

// computing usernames
// za 1 object, primer
/* const user = 'Steven Thomas Williams';
const username = user
  .toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('');

console.log(username);
 */

//funckija za sve objcete
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

/* const userNames = function () {
  const user = accounts.owner;
  const username = user
    .toLowerCase()
    .split(' ')
    .map(function (name) {
      return name[0];
    });
}; */
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
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// SIMPLE ARRAY METHODS
// SLICE
/* let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
 */
// SPLICE

// console.log(arr.splice(2));
/* arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr); */

// REVERSE
/* arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); */

//CONCAT

/* const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); */

// JOIN -- SPAJA INDEKSE I RETURNA U STRING
// console.log(letters.join(' - '));

// the new AT method

/* const arr = [23, 35, 64];

console.log(arr[2]);
console.log(arr.at(2)); // this is a method. It does the same thing as a arr[2];
console.log(arr.at(-1));

// works also for strings
console.log('tarik'.at(0)); */

// -------------------------FOREACH METHOD-----------------------------------

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withrew ${Math.abs(movement)}`);
  }
} */

/* console.log('---FOREACH---');

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withrew ${Math.abs(mov)}`);
  }
   */
// FOREACH METHOD FOR MAPS
/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, Map) {
  console.log(`${key}: ${value}`);
});

// FOREACH METHOD FOR SETS
const currenciesUnique = new Set(['USD', ' GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
 */

//---------------------------------------MAP METHOD IN ARRAYS----------------------------------

// map method returns allways new array

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
// const movementstoUsd = movements.map(function (mov) {
//   return mov * eurToUsd;

const movementstoUsd = movements.map(movements => movements * eurToUsd);
console.log(movementstoUsd);
console.log(movements);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
 */

//------------------------FILTER METHOD ------------------------------------------
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(dick => dick < 0);
console.log(withdrawals);
 */
// -------------------------- REDUCE METHOD---------------

/* const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);
 */
// maximum value from array with reduce method

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// console.log(max);

// minimum value from array with reduce method

/* const max = movements.reduce((acc, mov) => {
  if (acc < mov) return acc;
  else return mov;
}, movements[0]);

console.log(max); */

//------------------------- THe magic of chainings methods-------------------------------

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD); */

//---------------------------THE FIND METHOD--------------------------
/* const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); */

//----------------------------------SOME AND EVERY METHODS--------------------------
// if some element in array satisfy codition
// some methods returns boolean
//equality
/* console.log(movements.includes(-130)); // true

//condition
console.log(movements.some(mov => mov === -130)); // true

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // true

//EVERY METHOD only returns true if all the element in arrys satisfy conditions
console.log(movements.every(mov => mov > 0)); //false

console.log(account4.movements.every(mov => mov > 0)); //true

const sameThing = mov => mov > 0;
console.log(movements.filter(sameThing));
console.log(movements.some(sameThing));
console.log(movements.every(sameThing));
 */

// ----THE FLAT METHOD

/* const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // flat(koliko duboko idemo u gnezdo, number je type)

const allArr = [
  ...account1.movements,
  ...account2.movements,
  ...account3.movements,
  ...account4.movements,
  ...account5.movements,
  ...account6.movements,
];
console.log(allArr);

const allBalance = allArr.reduce((acc, mov) => acc + mov, 0);
console.log(allBalance);

//flat MAP
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance2);
 */

//----------------------------SORTING ARRAYS-------------------------

// for strings
/* const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // it will be sorted from A-Z ..Adam, jonas, martha, zach
console.log(owners); */

//for numbers
/* console.log(movements); */

//return < 0, then will A before B
// return > 0, then will B before A

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
/* movements.sort((a, b) => a - b);
console.log(movements);
 */
//descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
/* movements.sort((a, b) => b - a);
console.log(movements);
 */

// -------------------------------------------empty arrays + fill methods----------------------------
/* const arr = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7);

console.log(x);

x.fill(1, 3, 5);

console.log(x);

arr.fill(23, 2, 6);
console.log(arr);
 */
// Array.from

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
// console.log(z); // array will sorted from 1 to 7, 1,2,3,4,5,6,7

// 100 random dice rolls array -- HOMEWORK... WE SHOULD USE ARRAY.FROM METHOD

// VEZBA movements sa UI premestiti u novi array na klik na UI

/* labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('\u20AC', ''))
  );
  console.log(movementsUI);

  //drugi primer za ovo isto
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
 */

// --------------------------------------MORE PRACTICE WITH ARRAY METHODS------------------------------------------------
// pratice with array methods..
// 1.
// const bankDepositSum = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(acc => acc > 0)
//   .reduce((acc, sum) => acc + sum, 0);
// console.log(bankDepositSum);

// moj nacin
// const depositSum = [
//   ...account1.movements,
//   ...account2.movements,
//   ...account3.movements,
//   ...account4.movements,
//   ...account5.movements,
//   ...account6.movements,
// ]
//   .filter(acc => acc > 0)
//   .reduce((acc, sum) => acc + sum, 0);
// console.log(depositSum);

//2. COUNT HOW MANY DEPOSITS THERE HAVE BEEN IN THE BANK WITH AT LEAST 1000$

// 1. nacin
// const deposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(acc => acc >= 1000).length;

// console.log(deposits1000);

//2. nacin // reduce metoda
// const deposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(deposits1000);

// Prefixed ++ operator

// let a = 10;
// console.log(++a);
// console.log(a);

// 3. vezba

// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(sums);

//4.
// this is a nice title -> This Is A Nice Title
/* const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');

  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
 */
