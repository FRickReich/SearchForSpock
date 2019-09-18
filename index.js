'use strict';

const Interpreter = require('./src/Interpreter');
const Translator = require('./src/Translator');

const testString = `captainId: pikedypikepike@starfleet.com and ( starshipId: 1701 or planetID: TalosIV )`;

const interpreter = new Interpreter(testString).start();
const translator = new Translator(interpreter).cycleTokens();

console.log(JSON.stringify(interpreter));
//console.log(translator);
