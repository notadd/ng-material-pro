const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './projects/schematics/src/ng-add/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/notadd/ng-material2/schematics/ng-add'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    mode: 'production',
    target: 'node',
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: 'projects/schematics/src/collection.json',
                    to: '../collection.json',
                    toType: 'file'
                },
                {
                    from: 'README.md',
                    to: '../../README.md',
                    toType: 'file'
                }
            ],
            {}
        )
    ]
};
