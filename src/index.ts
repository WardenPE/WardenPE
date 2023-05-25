import Server from "./Server"

new Server().startServer().then(() => {
    console.log('Server started!')
})