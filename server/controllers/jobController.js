const Job = require('../models/jobsModel')
const mongoose = require('mongoose')
//get all job
const getJob = async(req,res) => {
    const user_id = req.user._id

    const job = await Job.find({user_id}).sort({createdAt:-1})

    res.status(200).json(job)
}


//get a single job
const singleJob = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Job'})
    }
    const job = await Job.findById(id)
    if(!job){
        return res.status(404).json({error: 'No such Job'})
    }

    res.status(200).json(job)
}


//create a new job
const createJob = async(req,res) => {
    const {title, company, date, link} = req.body
    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!company) {
        emptyFields.push('company')
    }
    if(!date) {
        emptyFields.push('date')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    //add doc to database
    try{
        const user_id = req.user._id
        const job = await Job.create({title, company, date,link, user_id})
        res.status(200).json(job)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete a job
const deleteJob = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Job'})
    }

    const job = await Job.findOneAndDelete({_id: id})

    if(!job){
        return res.status(404).json({error: 'No such Job'})
    }

    res.status(200).json(job)
}

//update a job
const updateJob = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Job'})
    }

    const job = await Job.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!job){
        return res.status(404).json({error: 'No such Job'})
    }
    res.status(200).json(job)

}

module.exports = {
    createJob,
    getJob,
    singleJob,
    deleteJob,
    updateJob
}
