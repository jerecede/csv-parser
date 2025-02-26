const fs = require('fs');

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
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return jsonData;
    } catch (err) {
        console.error(`errore nel cercare il file: ${err}`);
    }
}

//SCRIVE

function writeFile(filePath, fileCSV){
    fs.writeFile(filePath, fileCSV, err => {
        if (err) {
            console.error(err);
        } else {
            console.log("file json creato con successo");
        }
    })
}

//CONVERSIONE

function fromJsonToCsv(csvData){
    
    //converto json in array di oggetti
    const objects = convertJsonToObjects(json); //const jsonArray = JSON.parse(jsonStr);

    const keys = getKeysFromObject(objects);
    //ricavo le keys e li metto in un array
    // Object.keys(objects[]);

    const values = getValuesFromObject(objects);
    //per ogni object ricavo le sue values e li metto in un array, e gli array totali li metto in un altro array
    // Object.values(objects[1,2,3...]);

    //aggiungo array di keys al array di array di values
    // [
    // ["name","surname","yob","gender"]
    // ["lorenzo","puppo",1995,"m"]
    // ["hugo","martinez",1994,"m"]
    // ["sara","de prà",1989,"f"]
    // ]

    //ricavo un array di sole stringhe per row
    // ["name,surname,yob,gender"]
    // ["lorenzo,puppo,1995,m"]
    // ["hugo,martinez,1994,m"]
    // ["sara,de prà,1989,f"]


    const csv = createCsv(keys, values);
    //ricavo poi un stringa unica che contiene il conenuto cvs
    // name,surname,yob,gender
    // lorenzo,puppo,1995,m
    // hugo,martinez,1994,m
    // sara,de prà,1989,f

    return csv;
}

function main() {

    const originPath = getOriginPath(); //leggo
    const json = readFile(originPath);

    const csv = fromJsonToCsv(json); //trasformo

    const destinationPath = getDestinationPath(); //scrivo
    writeFile(destinationPath, csv);
}

main();