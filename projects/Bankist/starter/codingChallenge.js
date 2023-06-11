//---------------------CODING CHALLENGE ARRAYS #1----------------------

// test DATA 1: Julia's data [3,5,2,12,7], kate's data [4,1,15,8,3]
// test DATA 2 : julia's data [9,16,6,8,3], late's data [10,5,6,1,4]

/* const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  console.log(dogsJuliaCorrected);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dogs, i) {
    if (dogs >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dogs} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]); */
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//------------------------------------------------CODING CHALLENGE #2-------------------------------------------------------

/* const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAge);
  const filterHumanAge = humanAge.filter(age => age > 18);
  console.log(filterHumanAge);
  const average = filterHumanAge.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 1, 5, 6, 1, 4]); */

//---------------------------------------CODING CHALLENGE 3--------------------------
/* const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 1, 5, 6, 1, 4]));
 */

// -------------------------------------------CODING CHALLENGE #4 ---------------FINAL-----------------------

//TEST DATA

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// // 1st task
// dogs.forEach(dog => {
//   dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
// });
// console.log(dogs);
// // 2nd task
// dogs.forEach(d => {
//   if (d.owners.includes('Sarah')) {
//     if (d.curFood > d.recommendedFood * 1.1) {
//       console.log('Eating too much');
//     } else if (d.curFood < d.recommendedFood * 0.9) {
//       console.log('Eating too little');
//     }
//   }
// });

// //3rd task

// let ownersEatTooMuch = [];
// let ownersEatTooLittle = [];

// dogs.forEach(dogs2 => {
//   if (dogs2.curFood > dogs2.recommendedFood * 1.1) {
//     ownersEatTooMuch = ownersEatTooMuch.concat(dogs2.owners);
//   } else if (dogs2.curFood < dogs2.recommendedFood * 0.9) {
//     ownersEatTooLittle = ownersEatTooLittle.concat(dogs2.owners);
//   }
// });
// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

// //4th task
// const tooMuchStr = ownersEatTooMuch.join(' and ') + "'s dogs eat too much.";
// console.log(tooMuchStr);
// const tooLittleStr =
//   ownersEatTooLittle.join(' and ') + "'s dogs eat too little.";
// console.log(tooLittleStr);

// // 5th task
// dogs.forEach(d => {
//   if (d.curFood === d.recommendedFood) {
//     console.log('True');
//   } else {
//     console.log('False');
//   }
// });
// console.log('//////////////////////////////////');

// // 6th task

// dogs.forEach(amount => {
//   if (
//     amount.curFood < amount.recommendedFood * 1.1 &&
//     amount.curFood > amount.recommendedFood * 0.9
//   ) {
//     console.log('True');
//   } else {
//     console.log('False');
//   }
//   // if (amount.curFood < amount.recommendedFood * 1.1) {
//   //   console.log('Eat okay');
//   // } else if (amount.curFood > amount.recommendedFood * 0.9) {
//   //   console.log('Eat okay');
//   // } else {
//   //   console.log('Problem wiht eating');
//   // }
// });

// // 7th task

// let amountFood = [];

// dogs.forEach(amount2 => {
//   if (
//     amount2.curFood < amount2.recommendedFood * 1.1 &&
//     amount2.curFood > amount2.recommendedFood * 0.9
//   ) {
//     amountFood.push(amount2);
//   }
// });
// console.log(amountFood);

// //8th task

// const dogsCopy = dogs
//   .slice()
//   .sort((a, b) => a.recommendedFood - b.recommendedFood);

// console.log(dogsCopy);
