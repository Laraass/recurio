import fastify from "fastify";
const server = fastify();
server.get("/", function (request, reply) {
    reply.send({ hello: "world" });
});
server.listen({ port: 3000 }, function (err, PORT) {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    console.log(`Server is now listerning on ${PORT}`);
});
//# sourceMappingURL=index.js.map