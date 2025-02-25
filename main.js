const fs = require('fs');

function readCsvFromFile(filePath) {
    try {
        const csvData = fs.readFileSync(filePath, 'utf8');
        return csvData;
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
    }
}

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

    const ObjectFromEntries = createObjectOfEntries(keys,values);
    console.log(ObjectFromEntries);
    
    const json = convertObjectToJson(ObjectFromEntries);
    return json;
}

function splitCsvInRows(csvData) {
    const arrayData = csvData.split(/\r?\n/);
    return arrayData;
}

function splitRows(arrayData){
    let newArrayData = [];

    for (let i = 0; i < arrayData.length; i++) {
        const stringRow = arrayData[i];

        const arrayStringRow = stringRow.split(',');
        newArrayData.push(arrayStringRow);
    }

    return newArrayData;
}

function getKeysFromFirstLine(arrayData){
    const arrayKeys = [...arrayData[0]];
    return arrayKeys;
}

function getValues(arrayData){
    let arrayOfValues = [];
    for (let i = 1; i < arrayData.length; i++) {
        const array = arrayData[i];
        arrayOfValues.push(array);
    }
    //oppure arrayOfValues = arrayData.slice(1);

    return arrayOfValues;
}

function createObjectOfEntries(keys, values){
    const arrayOfEntries = [];

    for (let i = 0; i < values.length; i++) {
        const valueArray = values[i];
        
        const entry = createEntry(keys, valueArray)

        arrayOfEntries.push(entry);
    }

    return arrayOfEntries;
}

function createEntry(keys, valueArray){
    const obj = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = valueArray[i];
        obj[key] = value;
    }

    return obj;
}

function convertObjectToJson(object) {
    return JSON.stringify(object);
}

function main() {

    const csv = readCsvFromFile("./data/test1.csv"); //leggo
    console.log(csv);

    const json = fromCsvToJson(csv); //trasformo
    console.log(json);
    

    // writeJsonToFile(filePath); //scrivo
}

main();

// (function main() {
// }) ();