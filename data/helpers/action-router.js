const express = require("express")
const actions = require("./actionModel")

const router = express.Router()

router.get('/projects/:id/actions',(req, res) => {
  actions.get()
  .then((action) => {
    res.status(200).json(action)
  })
  .catch((error) => {
    res.status(500).json({
      message: "There was an error, please try again"
    })
  })
});

router.post("/projects/:id/actions", checkActionData(), (req, res, next) => {
	actions.insert(req.body)
		.then((action) => {
			res.status(201).json(action)
		})
		.catch(next)
})


router.delete("/projects/:id/actions/:actionId",(req, res, next) => {
	actions.remove(req.params.id)
		.then(() => {
			res.status(200).json({
				message: "The user has been nuked",
			})
		})
		.catch(next)
})

router.put("/projects/:id/actions/:actionId", checkActionData(), (req, res, next) => {
	actions.update(req.params.id, req.body)
		.then((action) => {
			if (action) {
				res.status(200).json(action)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch(next)
})

function checkActionData() {
	return (req, res, next) => {
		if (!req.body.project_id || !req.body.description || !req.body.notes) {
			return res.status(400).json({
				message: "Missing user name , notes or description",
			})
		}
		next()
	}
}

module.exports = router;