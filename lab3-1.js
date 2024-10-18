const {program} = require('commander')
const fs = require('node:fs')
function operation(filePath){
    data = JSON.parse(fs.readFileSync(filePath))
    let max = -1e9
    for(let i of data){
        if(i.rate > max){
            max = i.rate
        }
    }
    return max
}
program
    .command('readfile')
    .option('-i, --input <inputFilePath>')
    .option('-o, --output <outputFilePath>')
    .option('-d, --display')
    .action((options) =>{
        if(!options.input){
            console.error('Please, specify input file');
        }
        else if(!fs.existsSync(options.input)){
            console.error('Cannot find input file');
        }
        if(options.output){
            fs.writeFileSync(options.output, `Максимальний курс:${operation(options.input)}`)
        }
        if(options.display){
            console.log(`Максимальний курс:${operation(options.input)}`);
        }
    })
    program.parse(process.argv);
    