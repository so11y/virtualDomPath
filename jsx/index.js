


const babel = require('@babel/core')
const express = require("express");
const app = express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/babel', (req, res) => {
    const code = babel.transformSync(req.query.code, {
        plugins: [
            '@babel/plugin-syntax-jsx',
            './jsx.js'
        ]
    }).code;

    res.send({
        code: `(()=>{
            ${code};
          return render;
        })()`
    });
})
app.listen(8080, () => { console.log("vite如何配置babel?,先这样玩"); })

