const fs = require('fs');

// The process.argv, argumentvalue, contains an array where
// the 0th index contains the node executable path,
// 1st index contains the path to your current file
// and then the rest index contains the passed arguments.

//PRENDE E CONTROLLA ARGUMENTS della CONSOLE

function getOriginPath(){
    const arguments = process.argv;

    const firstArg = arguments[2];
    const secondArg = arguments[3];

    if(!firstArg){
        console.log("inserire due argomenti, origine e destinazione!");
    }
    if(!secondArg){
        console.log("inserire il secondo argomento, destinazione!")
    }
    return arguments[2];
}

function getDestinationPath(){
    const arguments = process.argv;
    return arguments[3];
}

//LEGGE

function readFile(filePath) {
    try {
        const csvData = fs.readFileSync(filePath, 'utf8');
        return csvData;
    } catch (err) {
        console.error(`errore nel cercare il file: ${err}`);
    }
}

//CONVERSIONE

function fromCsvToJson(csvData){
    // name,surname,yob,gender
    // lorenzo,puppo,1995,m
    // hugo,martinez,1994,m
    // sara,de prà,1989,f

    const arrayOfStringRows = splitCsvInRows(csvData);
    console.log(arrayOfStringRows);
    // ["name,surname,yob,gender"]
    // ["lorenzo,puppo,1995,m"]
    // ["hugo,martinez,1994,m"]
    // ["sara,de prà,1989,f"]

    const arrayOfSplittedRows = splitRows(arrayOfStringRows);
    console.log(arrayOfSplittedRows);
    // [
    // ["name","surname","yob","gender"]
    // ["lorenzo","puppo",1995,"m"]
    // ["hugo","martinez",1994,"m"]
    // ["sara","de prà",1989,"f"]
    // ]

    const keys = getKeysFromFirstLine(arrayOfSplittedRows);
    console.log(keys);
    // ["name","surname","yob","gender"]

    const values = getValues(arrayOfSplittedRows);
    console.log(values);
    // [
    // ["lorenzo","puppo",1995,"m"]
    // ["hugo","martinez",1994,"m"]
    // ["sara","de prà",1989,"f"]
    // ]

    //creo oggetti per ogni row, e li metto in un array
    const ObjectFromEntries = createObjectOfEntries(keys,values);
    console.log(ObjectFromEntries);
    
    //converto l'array degli oggetti in json
    const json = convertObjectToJson(ObjectFromEntries);
    return json;
}

//TASK-2-1

function splitCsvInRows(csvData) {
    const arrayData = csvData.split(/\r?\n/);
    return arrayData;
}

//TASK-2-2

function splitRows(arrayData){
    let newArrayData = [];

    for (let i = 0; i < arrayData.length; i++) {
        const stringRow = arrayData[i];

        const arrayStringRow = stringRow.split(',');
        newArrayData.push(arrayStringRow);
    }

    return newArrayData;
}

//TASK-2-3

function getKeysFromFirstLine(arrayData){
    const arrayKeys = [...arrayData[0]];
    return arrayKeys;
}

//TASK-2-4

function getValues(arrayData){
    let arrayOfValues = [];
    for (let i = 1; i < arrayData.length; i++) {
        const array = arrayData[i];
        arrayOfValues.push(array);
    }
    //oppure arrayOfValues = arrayData.slice(1);

    return arrayOfValues;
}

//TASK-2-5

function createObjectOfEntries(keys, values){
    const arrayOfEntries = [];

    for (let i = 0; i < values.length; i++) {
        const valueArray = values[i];
        
        const entry = createEntry(keys, valueArray)

        arrayOfEntries.push(entry);
    }

    return arrayOfEntries;
}

//TASK-2-5-1

function createEntry(keys, valueArray){
    const obj = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = valueArray[i];
        obj[key] = value;
    }

    return obj;
}

//TASK-2-6

function convertObjectToJson(object) {
    const json = JSON.stringify(object);
    return json;
}

//SCRIVE

function writeFile(filePath, fileJson){
    fs.writeFile(filePath, fileJson, err => {
        if (err) {
            console.error(err);
        } else {
            console.log("file json creato con successo");
        }
    })
}

function main() {

    const originPath = getOriginPath(); //leggo
    const csv = readFile(originPath);

    // const csv = readFile("./data/test1.csv");

    const json = fromCsvToJson(csv); //trasformo

    const destinationPath = getDestinationPath(); //scrivo
    writeFile(destinationPath, json);   

    // writeFile("./output/test1.json", json);
}

main();

// (function main() {
// }) ();