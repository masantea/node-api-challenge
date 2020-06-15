const express = require("express")
const projectRouter = require("./data/helpers/project-router")
const actionRouter = require("./data/helpers/action-router")

const server = express()
const port = 4000

server.use(express.json()) 
server.use(projectRouter)
server.use(actionRouter)


server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong, please try again later",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
