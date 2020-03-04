function isConstant(path) {
  return path.isLiteral();
}

function isContainer(path) {
  return (
    path.isJSXExpressionContainer() ||
    path.isObjectExpression() ||
    path.isArrayExpression()
  );
}

function isPropertyIdentifier(path) {
  return (
    path.isIdentifier() &&
    path.parentPath.isObjectProperty() &&
    path.key === "key"
  );
}

const constantVisitor = {
  enter(path, state) {
    const stop = () => {
      state.isConstant = false;
      path.stop();
    };

    if (path.isObjectProperty()) {
      if (path.node.computed) {
        return stop();
      }
      return;
    }

    if (isPropertyIdentifier(path)) {
      return;
    }

    if (path.isJSXIdentifier()) {
      return;
    }

    if (isContainer(path)) {
      return;
    }

    if (!isConstant(path)) {
      stop();
    }
  }
};

function plugin({ types: t }) {
  return {
    name: "escape-constant-props",
    visitor: {
      JSXAttribute(path) {
        const state = { isConstant: true };
        const container = path.node;

        if (
          !(
            t.isJSXExpressionContainer(container.value) &&
            (t.isObjectExpression(container.value.expression) ||
              t.isArrayExpression(container.value.expression))
          )
        ) {
          return;
        }

        path.traverse(constantVisitor, state);

        if (!state.isConstant) {
          return;
        }

        const program = path.findParent(path => path.isProgram());

        const identifier = program.scope.generateUidIdentifier("ref");

        program.node.body.unshift(
          t.variableDeclaration("const", [
            t.variableDeclarator(identifier, container.value.expression)
          ])
        );

        container.value = identifier;
      }
    }
  };
}

module.exports = plugin;
