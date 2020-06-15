const express = require("express")
const actions = require("./actionModel")

const router = express.Router()

router.get('/projects/:id/actions/actionId',(req, res) => {
  actions.get(req.params.id)
  .then((action) => {
    res.status(200).json(action)
  })
  .catch((error) => {
    res.status(500).json({
      message: "There was an error, please try again"
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete("/projects/:id/actions/actionId",(req, res, next) => {
	actions.remove(req.params.id)
		.then(() => {
			res.status(200).json({
				message: "The user has been nuked",
			})
		})
		.catch(next)
})

router.put("/projects/:id/actions/actionId", (req, res, next) => {
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

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}
module.exports = router;