const fs = require('fs')

async function generateDartFile(svgJson, destination_file, file_name) {

    fs.writeFile(destination_file + `/${file_name}.dart`, await createPainter(svgJson, file_name), function (err) {
        if (err) {
            return console.log(err);
        }
    });

}

async function createPainter(svgJson, file_name) {

    console.log(file_name)

    var painter_class = "import 'auto_painter.dart' \n\n"

    painter_class += "class " + file_name.charAt(0).toUpperCase() + file_name.substring(1, file_name.length) + " extends CustomPainter { \n\n"

    painter_class += "  final viewPortWidth = " + svgJson.viewBox[0].split('d').splice(0, 2)[0] + "; \n" +
        "  final viewPortHeight = " + svgJson.viewBox[0].split('d').splice(0, 2)[0] + "; \n\n"

    var i = 0;
    svgJson.paths.forEach(function (it) {
        painter_class += "  String path" + i + " = '" + it.path + "';\n";
        i++;
    })

    painter_class += "\n  @override\n" +
        "   void paint(Canvas canvas, Size size) {\n" +
        "    canvas.drawRect(Rect.fromLTRB(0, 0, size.width, size.height),\n" +
        "        Paint()..color = Color(0xFFffffff)); \n\n"

    var j = 0;
    svgJson.paths.forEach(function (it) {
        painter_class += "  canvas.drawPath(drawPath(path" + j + ", viewPortWidth, viewPortHeight, size), Paint()..color = Color(0xFF" + it.color.split('#').splice(1, 6) + ")); \n"
        j++;
    })

    painter_class += " }\n" +
        "\n" +
        "  @override\n" +
        "  bool shouldRepaint(CustomPainter oldDelegate) => false; \n\n"

    painter_class += "} \n\n"

    return painter_class
}

module.exports = generateDartFile