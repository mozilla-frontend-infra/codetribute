/**
 * Insert code to load a module when JSX is detected.
 * This is supposed to load a module corresponding to the `pragma` option of
 * the JSX transform.
 */

module.exports = function jsxPragmatic (babel) {
  var
    t = babel.types,
    visitor = {};

  function getPragmaImport (state) {
    return t.importDeclaration(
      [t.importSpecifier(
        t.identifier(state.opts.import),
        t.identifier(state.opts.export || "default")
      )],
      t.stringLiteral(state.opts.module)
    );
  }
  // getPragmaImport

  visitor = {
    Program: {
      exit: function (path, state) {
        if (! state.get('jsxDetected')) return;

        // Apparently it's now safe to do this even if Program begins with
        // directives.
        path.unshiftContainer('body', getPragmaImport(state));
      },
      // exit
    },
    // Program

    // It seems pretty hokey that this'll work even if JSX has already been
    // transformed, but apparently that's the basis for the whole plugin
    // architecture for babel@6, so I'm rolling with it and maybe it'll make
    // more sense to me once I understand it better.
    JSXElement: function (path, state) {
      state.set('jsxDetected', true);
    },
    // JSXElement
  };

  return {
    pre: function () {
      if (! (this.opts.module && this.opts.import)) {
        throw new Error("babel-plugin-jsx-pragmatic: You must specify `module` and `import`");
      }
    },
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: visitor,
  };
};
// jsxPragmatic
