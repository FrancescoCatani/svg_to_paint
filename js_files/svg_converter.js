const svgpath = require('svgpath');

/***
 *    Create the svg json from the command selected ("absolute" or "relative")
 * */
async function convertSvg(command, svgJson) {

    let converted_paths = [];

    svgJson.paths.forEach(
        function (item) {
            if (command === 'absolute') {
                if(svgJson.translations != null){
                    if (svgJson.translations[0] && svgJson.translations[1] != NaN)
                        converted_paths.push({
                            path: svgpath(item._attributes['android:pathData']).abs().translate(svgJson.translations[0], svgJson.translations[1]).segments,
                            color: item._attributes['android:fillColor']
                        });
                }
                else
                    converted_paths.push({
                        path: svgpath(item._attributes['android:pathData']).abs().segments,
                        color: item._attributes['android:fillColor']
                    });
            } else if (command === 'relative') {
                if(svgJson.translations != null) {
                    if (svgJson.translations[0] && svgJson.translations[1] != NaN)
                        converted_paths.push({
                            path: svgpath(item._attributes['android:pathData']).rel().translate(svgJson.translations[0], svgJson.translations[1]).segments,
                            color: item._attributes['android:fillColor']
                        });
                }
                else
                    converted_paths.push({
                        path: svgpath(item._attributes['android:pathData']).rel().segments,
                        color: item._attributes['android:fillColor']
                    });
            }
        }
    )
    return {
        viewBox: svgJson.viewBox,
        paths: converted_paths
    }
}

module.exports = convertSvg