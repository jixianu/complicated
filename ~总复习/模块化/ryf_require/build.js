{
    baseUrl: "./js",
    dir: "./dist",
    optimize: "uglify",
    optimizeCss: "standard.keepLines",
    mainConfigFile: "./js/main.js",
    removeCombined: true,
    fileExclusionRegExp: /^\./,
    modules: [
        {
            name: "main"
        }
    ]
}