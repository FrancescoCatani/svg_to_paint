const xmlParser = require('xml-js')
const fs = require('fs')

/***
 *    Get information from XML file
 * */
async function parseXml(sourceFile) {

    let translations, viewBox, paths;

    return new Promise((resolve, reject) => {
        fs.readFile(sourceFile, 'utf8', (error, data) => {

            if (error) return reject(error);

            const svg = xmlParser.xml2js(data, {compact: true, spaces: 2})

            if (svg.vector.hasOwnProperty('group')) {
                translations = [svg.vector.group._attributes['android:translateX'],svg.vector.group._attributes['android:translateY']]
                paths = svg.vector.group.path
            } else {
                paths = svg.vector.path
            }

            viewBox = [svg.vector._attributes['android:width'], svg.vector._attributes['android:height']]

            resolve({
                translations: translations,
                viewBox: viewBox,
                paths: paths
            })


        })
    })
}

module.exports = parseXml

