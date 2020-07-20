# svg_to_paint

svg_to_paint is a node module to generate dart code files from a svg file.

## Installation

This is a Node.js module available through the npm registry.

Before installing, download and install Node.js. Node.js 0.10 or higher is required.

Installation is done using the npm install command:

```bash
$ npm install svg_to_paint
```

## Usage

```node-js
const svg_to_paint = require('svg_to_paint')
 
svg_to_paint.generateDartFile('/Users/user/Desktop/file.xml','/Users/user/Desktop','svg_icon','absolute')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)