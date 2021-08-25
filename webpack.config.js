const path = require('path');
const {merge} = require('webpack-merge');

const dist = path.join(__dirname, 'dist');

const common = {
    entry: './index.js',
    output: {
        path: dist,
        globalObject: 'this',
        libraryTarget: 'umd'
    },
    mode: 'development'
}

const node = {
    name: 'node',
    target: 'node',
    output: { filename: 'test-node.js' }
};

const browser = {
    name: 'web',
    target: 'web',
    output: { filename: 'test-web.js' }
}

module.exports = [merge(common, node), merge(common, browser)];