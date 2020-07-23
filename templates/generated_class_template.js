
async function generateClassTemplate(svgJson, file_name) {

    var paths = []
    var i = 0;
    svgJson.paths.forEach(function (it) {
         paths.push("  String path" + i + " = '" + it.path + "';\n");
        i++;
    })

    var drawPaths = []
    var j = 0;
    svgJson.paths.forEach(function (it) {
         drawPaths.push("  canvas.drawPath(drawPath(path" + j + ", viewPortWidth, viewPortHeight, size), Paint()..color = Color(0xFF" + it.color.split('#').splice(1, 6) + ")); \n")
        j++;
    })

    return classTemplate = {
        className: file_name.charAt(0).toUpperCase() + file_name.substring(1, file_name.length) ,
        viewPortWidth: svgJson.viewBox[0].split('d').splice(0, 2)[0],
        viewPortHeight: svgJson.viewBox[0].split('d').splice(0, 2)[0],
        paths: paths,
        drawPaths: drawPaths,
    }

}
module.exports = generateClassTemplate
