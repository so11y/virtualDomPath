


const babel = require('@babel/core');
const path = require("path");
const loaderUtils = require('loader-utils')

const parse = (code) => {
    return {
        script: "",
        style: ""
    }
}

module.exports = function (code) {
    const options = loaderUtils.getOptions(this);
    const parseCode = parse(code);
    if (type == "script") {
        return babel.transformSync(parseCode.script, {
            plugins: [
                '@babel/plugin-syntax-jsx',
                path.join(process.cwd(), "jsx/jsx.js")
            ]
        }).code;
    } else if (type == "style") {
        //return `export default '${parseCode.style}'`;
    }
    //  ${parseCode.style ? 'import "./app.sorry?type=style;' : ""}
    return `

        export * from "./app.sorry?type=script!./sorryLoader.js";
    `
}


