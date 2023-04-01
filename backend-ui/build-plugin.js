exports.default = {
    pre: function () {
    },
    config: function (cfg) {
      // Override Angular's internal configuration for minifier to preserve class names.
      // See https://github.com/just-jeb/angular-builders/issues/144#issuecomment-576424615
      cfg.optimization.minimizer.forEach(function (it) {
        it.options.keepNames = true;
      });
      return cfg;
    },
    post: function () {
    }
};