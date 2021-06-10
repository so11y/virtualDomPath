module.exports = ({ types: t }) => {
    const switchType = (node, t) => {
      return  [
            t.isExpression,
            t.isStringLiteral,
            t.isNumericLiteral
        ].some(v => v(node))
    }
    const createText = (v, t) => {
        switch (typeof v.value) {
            case "number":
                return t.numericLiteral(v.value);
            default:
                return t.StringLiteral(v.value);
        }
    }
    const createCallExpression = (t, arg) => {
        return t.callExpression(
            t.identifier("h")
            , arg)
    }
    const transformToChildre = (t, children) => {
        const child = children.map(v => {
            if (t.isJSXText(v)) {
                return createCallExpression(t, [
                    t.StringLiteral("span"),
                    t.objectExpression([]),
                    createText(v, t)
                ])
            } else {
                if (t.isJSXExpressionContainer(v)) {
                    return createCallExpression(t, [
                        t.StringLiteral("span"),
                        t.objectExpression([]),
                        v.expression
                    ])
                }
                return v;
            }
        })
        if (child.length == 1 && switchType(child[0].arguments[2],t)) {
            return child[0].arguments[2];
        }
        return t.arrayExpression(child);
    }
    return {
        visitor: {
            JSXElement(path) {
                path.replaceWith(
                    t.callExpression(
                        t.identifier("h")
                        , [
                            t.StringLiteral(path.node.openingElement.name.name),
                            t.objectExpression([]),
                            transformToChildre(t, path.node.children)
                        ])
                )
            }
        }
    };
};
