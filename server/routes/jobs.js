const express = require('express')
const{
    createJob,
    getJob,
    singleJob,
    deleteJob,
    updateJob
} = require('../controllers/jobController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
//makes sure user in authenticated before being able to view data
router.use(requireAuth)


//GET all jobs
router.get('/', getJob)
//GET single jobs
router.get('/:id', singleJob)

//POST new job
router.post('/', createJob)
//DELETE job
router.delete('/:id', deleteJob)
//UPDATE job
router.patch('/:id', updateJob)

module.exports = router;