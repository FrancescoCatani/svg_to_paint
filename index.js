const parseXml = require('./js_files/xml_parser')
const convertSvg = require('./js_files/svg_converter')
const generateDartFiles = require('./js_files/dart_file_generator')
const generateAutomaticPainterDartFile = require('./js_files/dart_file_automatic_painter')

/**
 *
 *    Usage: generateDartFile('/Users/user/Desktop/file.xml','/Users/user/Desktop','svg_icon','absolute')
 *
 *    source_file: IS THE PATH OF YOUR XML FILE, FOR EXAMPLE (/Users/user/Desktop/file.xml)
 *
 *    destination_file: IS THE DESTINATION PATH OF YOUR GENERATED DART FILE, FOR EXAMPLE (/Users/user/Desktop)
 *
 *    file_name: IS THE NAME OF YOUR FILE, FOR EXAMPLE (svg_icon)
 *
 *    command: THE command REPRESENTS THE SVG COORDINATES WHICH COULD BE 'absolute' or 'relative'.
 *    YOU CAN CHOOSE THEM TYPING:
 *    absolute IF YOU WANT ABSOLUTE COORDINATES
 *    relative IF YOU WANT RELATIVE COORDINATES
 *
 * */

async function generateDartCode(XmlSvg_source_path, destination_path, file_name, command) {

    let svgParsed = await parseXml(XmlSvg_source_path)
    let svgJson
    if (command === 'absolute')
        svgJson = await convertSvg('absolute', svgParsed)
    else if (command === 'relative')
        svgJson = await convertSvg('relative', svgParsed)

    await generateAutomaticPainterDartFile(destination_path)
    await generateDartFiles(svgJson, destination_path, file_name)

}

module.exports.generateDartCode = generateDartCode;
