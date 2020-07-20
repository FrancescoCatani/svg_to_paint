const fs = require('fs')

async function generateAutomaticPainterDartFile(destination_file) {

    fs.writeFile(destination_file+`/auto_painter.dart`, await createAutomaticPainter(), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

async function createAutomaticPainter() {

    var automatic_painter = "";

    automatic_painter += "class PointMap {\n" +
        "  String key;\n" +
        "  List<double> values = [];\n" +
        "\n" +
        "  PointMap({this.key, this.values});\n" +
        "} \n\n"

    automatic_painter += "/// Create a list of PointMap\n" +
        "/// this method \"filters\" the svg given and clean its\n" +
        "///\n" +
        "///\n" +
        "/// ```dart\n" +
        "List<PointMap> createPathMap(String absoluteSvg) {\n" +
        "  var splittedInputPath = absoluteSvg.split(',');\n" +
        "\n" +
        "  List<PointMap> result = [];\n" +
        "\n" +
        "  const checkValue = ['M', 'm', 'L', 'l', 'H', 'h', 'V', 'v', 'C', 'c', 'Z', 'z'];\n" +
        "  \n" +
        "  splittedInputPath.forEach((element) {\n" +
        "    if(checkValue.contains(element)) {\n" +
        "      result.add(PointMap(key: element, values: []));\n" +
        "    } else{\n" +
        "      result.last.values.add(double.parse(element));\n" +
        "    }\n" +
        "  });\n" +
        "\n" +
        " return result;\n" +
        "} \n\n"

    automatic_painter += "/// Draw the svg from the list of PointMap\n" +
        "///\n" +
        "///\n" +
        "/// ```dart\n" +
        "Path drawPath(String absoluteSvg, viewPortWidth, viewPortHeight, Size size) {\n" +
        "  List<PointMap> map = createPathMap(absoluteSvg);\n" +
        "  Path path = Path();\n" +
        "  int prev_element = 0;\n" +
        "  map.forEach((element) {\n" +
        "    switch (element.key) {\n" +
        "      case \"M\":\n" +
        "        path\n" +
        "          ..moveTo((element.values[0] / viewPortWidth) * size.width,\n" +
        "              (element.values[1] / viewPortHeight) * size.height);\n" +
        "        break;\n" +
        "      case \"V\":\n" +
        "        path\n" +
        "          ..lineTo(\n" +
        "              (previousElement(map, map[prev_element - 1], element.key) /\n" +
        "                      viewPortWidth) *\n" +
        "                  size.width,\n" +
        "              (element.values[0] / viewPortHeight) * size.height);\n" +
        "        break;\n" +
        "      case \"H\":\n" +
        "        path\n" +
        "          ..lineTo(\n" +
        "              (element.values[0] / viewPortWidth) * size.width,\n" +
        "              (previousElement(map, map[prev_element - 1], element.key) /\n" +
        "                      viewPortHeight) *\n" +
        "                  size.height);\n" +
        "        break;\n" +
        "      case \"C\":\n" +
        "        path\n" +
        "          ..cubicTo(\n" +
        "              (element.values[0] / viewPortWidth) * size.width,\n" +
        "              (element.values[1] / viewPortHeight) * size.height,\n" +
        "              (element.values[2] / viewPortWidth) * size.width,\n" +
        "              (element.values[3] / viewPortHeight) * size.height,\n" +
        "              (element.values[4] / viewPortWidth) * size.width,\n" +
        "              (element.values[5] / viewPortHeight) * size.height);\n" +
        "        break;\n" +
        "      case \"S\":\n" +
        "        path\n" +
        "          ..lineTo((element.values[0] / viewPortWidth) * size.width,\n" +
        "              (element.values[1] / viewPortHeight) * size.height);\n" +
        "        path\n" +
        "          ..lineTo((element.values[2] / viewPortWidth) * size.width,\n" +
        "              (element.values[3] / viewPortHeight) * size.height);\n" +
        "\n" +
        "        break;\n" +
        "      case \"L\":\n" +
        "        path\n" +
        "          ..lineTo((element.values[0] / viewPortWidth) * size.width,\n" +
        "              (element.values[1] / viewPortHeight) * size.height);\n" +
        "                break;\n" +
        "    }\n" +
        "\n" +
        "    prev_element++;\n" +
        "  });\n" +
        "  path..close();\n" +
        "  return path;\n" +
        "}\n" +
        "\n" +
        "/// Return the previous element of a list\n" +
        "///\n" +
        "///\n" +
        "/// ```dart\n" +
        "double previousElement(List<PointMap> map, PointMap point, String key) {\n" +
        "  //Check the need of a x or a y\n" +
        "  double value = 0;\n" +
        "  if (key == \"V\") {\n" +
        "    switch (point.key) {\n" +
        "      case \"M\":\n" +
        "        value = point.values[0];\n" +
        "        break;\n" +
        "      case \"C\":\n" +
        "        value = point.values[4];\n" +
        "        break;\n" +
        "      case \"S\":\n" +
        "        value = point.values[2];\n" +
        "        break;\n" +
        "      case \"V\":\n" +
        "        value = point.values[0];\n" +
        "        break;\n" +
        "      case \"H\":\n" +
        "        value = point.values[0];\n" +
        "        break;\n" +
        "      case \"L\":\n" +
        "        value = point.values[0];\n" +
        "        break;\n" +
        "      default:\n" +
        "        value = 0;\n" +
        "        break;\n" +
        "    }\n" +
        "  } else if (key == \"H\") {\n" +
        "    switch (point.key) {\n" +
        "      case \"M\":\n" +
        "        value = point.values[1];\n" +
        "        break;\n" +
        "      case \"C\":\n" +
        "        value = point.values[5];\n" +
        "        break;\n" +
        "      case \"S\":\n" +
        "        value = point.values[3];\n" +
        "        break;\n" +
        "      case \"V\":\n" +
        "        value = point.values[0];\n" +
        "        break;\n" +
        "      case \"H\":\n" +
        "        value = point.values[0];\n" +
        "        break;\n" +
        "      case \"L\":\n" +
        "        value = point.values[1];\n" +
        "        break;\n" +
        "      default:\n" +
        "        value = 0;\n" +
        "        break;\n" +
        "    }\n" +
        "  }\n" +
        "  return value;\n" +
        "}"

    return automatic_painter;
}

module.exports = generateAutomaticPainterDartFile

