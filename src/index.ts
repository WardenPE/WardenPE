import Server from "./Server";

new Server().startServer().then(r => {
    console.log('Server started!')
});