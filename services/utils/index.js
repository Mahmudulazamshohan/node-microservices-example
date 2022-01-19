exports.default = {
    name: "utils",
    dependencies: [],
    providers: [],
    controllers: [],
    middlewares: [
        {
            name: "auth",
            handler: function (request, response, nextFunc) {
                return nextFunc();
            },
        },
    ],
};
