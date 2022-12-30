const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.get('/task',async (req, res) => {
    try {
       await req.user.populate('task').execPopulate()
         res.send(req.user.task) 
  }
    catch (e) {
        res.status(500).send(e)
    }

})

router.get('/task/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send('no task by this id')
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send()

    }
})
router.post('/task',auth, async (req, res) => {
    
   // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
  }) 
    try {
         await task.save()
        res.send(task)
    } catch(e){res.status(400).send(e)}
   
})

router.patch('/task/:id', async (req, res) => {
const updates = object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid updates!'})
    }
    try {
       
        const task = await task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        if (!task) {
         return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }

})
router.delete('/task/:id', async (req, res) => {
    try {
const task = await Task.findByIdAndDeleete(req.params.id)
     if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
       res.status(500).send('people who show you new music are important') 
    }
})
module.exports = router