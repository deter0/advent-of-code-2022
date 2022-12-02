const { assert } = require('console');
const { exit } = require('process');
const fs = require('fs');

function getInput(file_name) {
  try {
    const input = fs.readFileSync(file_name, 'utf-8');
    return input;
  } catch (err) {
    console.error(err);
    exit(-1);
  }
}

const input = getInput("input.txt");
const lines = input.split('\n');

if (lines[lines.length - 1] != '') {
  lines.push('');
}

// Part I
const shapeToNumber = (shape) => {
  switch (shape) {
    case 'A':
    case 'X':
      return 0;  // Rock

    case 'B':
    case 'Y':
      return 1;  // Paper

    case 'C':
    case 'Z':
      return 2;  // Scissors

    default:
      return -1; // Invalid
  }
}

const winLogic = [[0, 1], [1, 2], [2, 0]]
const getGameResult = (A, B) => {
  for (const logic of winLogic) {
    if (logic[0] == A && logic[1] == B)
      return 1;
    if (logic[0] == B && logic[1] == A)
      return -1;
  }
  return 0;
}

function PartOne() {
  let totalPoints = 0;
  for (const line of lines) {
    if (line != '') {
      const moves = line.split(' ');
      const opMoveS = moves[0];
      const selfMoveS = moves[1];

      const opMove = shapeToNumber(opMoveS);
      const selfMove = shapeToNumber(selfMoveS);

      assert(opMove != -1 && selfMove != -1);
      const gameResult = getGameResult(opMove, selfMove);

      let selfPoints = 0;
      selfPoints += selfMove + 1; // 1 for Rock, 2 for Paper, 3 for Scissors

      console.log(opMove, selfMove, gameResult);

      switch (gameResult) {
        case -1: // Lose
          break;
        case 0:  // Tie
          selfPoints += 3;
          break;
        case 1:
          selfPoints += 6;
          break;
      }

      totalPoints += selfPoints;
    }
  }

  console.log("Part I, Total Points:", totalPoints);
}

function PartTwo() {
  let totalPoints = 0;
  for (const line of lines) {
    if (line != '') {
      const moves = line.split(' ');

      const opMoveS = moves[0];
      const desiredOutcomeS = moves[1];
      let desiredOutcome = null;
      switch (desiredOutcomeS) {
        case 'X':
          desiredOutcome = -1;
          break;
        case 'Y':
          desiredOutcome = 0;
          break;
        case 'Z':
          desiredOutcome = 1;
          break;
      }

      const opMove = shapeToNumber(opMoveS);
      assert(opMove != -1);

      let move = 0;
      for (let i = 0; i < 3; i++) { // Brute force hehe
        const gameResult = getGameResult(opMove, i);
        if (gameResult == desiredOutcome) {
          move = i;
          break;
        }
      }

      let selfPoints = 0;
      selfPoints += move + 1; // 1 for Rock, 2 for Paper, 3 for Scissors

      switch (desiredOutcome) {
        case -1: // Lose
          break;
        case 0:  // Tie
          selfPoints += 3;
          break;
        case 1:
          selfPoints += 6;
          break;
      }

      totalPoints += selfPoints;
    }
  }

  console.log("Part II, Total Points:", totalPoints);
}

PartOne();
PartTwo();
