const fs = require('fs')
const generateClassTemplate = require('../templates/generated_class_template')

async function generateDartFile(svgJson, destination_file, file_name) {

    fs.writeFile(destination_file + `/${file_name}.dart`, await createPainter(svgJson, file_name), function (err) {
        if (err) {
            return console.log(err);
        }
    });

}

async function createPainter(svgJson, file_name) {

    var output = await generateClassTemplate(svgJson,file_name)

    return `import 'painter.txt' \n\nclass ${output.className} extends CustomPainter { \n\nfinal viewPortWidth = ${output.viewPortWidth}; \nfinal viewPortHeight = ${output.viewPortHeight}; \n\n${output.paths.reduce(function(a, b){return `${a}\n${b}`})}\n@override\nvoid paint(Canvas canvas, Size size) {\ncanvas.drawRect(Rect.fromLTRB(0, 0, size.width, size.height);\nPaint()..color = Color(0xFFffffff));\n\n${output.drawPaths.reduce(function(a, b){return `${a}\n${b}`})}}\n\n@override\nbool shouldRepaint(CustomPainter oldDelegate) => false;\n\n}\n\nreturn painter_class;\n}`

}

module.exports = generateDartFile