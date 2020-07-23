const fs = require('fs')
const path = require('path');

async function generateAutomaticPainterDartFile(destination_file) {

    await fs.readFile(path.resolve('painter.txt') ,'utf-8', async function(err,data){
        if (!err) {
            await fs.writeFile(destination_file + `/auto_painter.dart`, data, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
}

module.exports = generateAutomaticPainterDartFile

