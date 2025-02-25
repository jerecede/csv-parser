const fs = require('fs');

//TASK-1

function readCsvFromFile(filePath) {
    try {
        const csvData = fs.readFileSync(filePath, 'utf8');
        return csvData;
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
    }
}

//TASK-2

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

//TASK-3

function writeJsonToFile(filePath, fileJson){
    fs.writeFile(filePath, fileJson, err => {
        if (err) {
            console.error(err);
        } else {
            console.log("file json creato con successo");
        }
    })
}

function main() {

    const csv = readCsvFromFile("./data/test1.csv"); //leggo
    console.log(csv);

    const json = fromCsvToJson(csv); //trasformo
    console.log(json);
    

    writeJsonToFile("./output/students.json", json); //scrivo
}

main();

// (function main() {
// }) ();