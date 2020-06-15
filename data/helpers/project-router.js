const express = require("express")
const projects = require("./projectModel")

const router = express.Router()


router.post("/projects", checkUserData(), (req, res, next) => {
	projects.insert(req.body)
		.then((project) => {
			res.status(201).json(project)
		})
		.catch(next)
})

router.get('/projects', (req, res) => {
  projects.get()
    .then((project) => {
      res.status(200).json(project)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/projects/:id',(req, res) => {
  projects.get(req.params.id)
  .then((project) => {
    res.status(200).json(project)
  })
  .catch((error) => {
    res.status(500).json({
      message: "There was an error, please try again"
    })
  })
});

router.delete("/projects/:id",(req, res, next) => {
	projects.remove(req.params.id)
		.then(() => {
			res.status(200).json({
				message: "The user has been nuked",
			})
		})
		.catch(next)
})

router.put("/projects/:id", checkUserData(), (req, res, next) => {
	projects.update(req.params.id, req.body)
		.then((project) => {
			if (project) {
				res.status(200).json(project)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch(next)
})


function checkUserData() {
	return (req, res, next) => {
		if (!req.body.name || !req.body.description) {
			return res.status(400).json({
				message: "Missing user name or description",
			})
		}
		next()
	}
}

module.exports = router;