const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()


router.get('/users/me',auth,async (req, res) => { 
    
        res.send(req.user)
   
})






  

router.post('/users', async (req, res) => {
    const user = new User(req.body)
   
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }
    catch (e) {
        res.status(400).send(e)
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    }
    catch (e) {
        res.status(400).send()
    }
})
router.post('/users/logout',auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
          return token.token != req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
       res.status(500).send()
  }
    
})
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
     }
    catch (e) {
        res.status(500).send()
    }
})

router.patch('users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
       return res.status(400).send({error:'invalid updates'})
   }
   
    try {
        
        updates.forEach((update) => user[update] = req.body[update])

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id) 
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
       res.status(500).send( ) 
    }
})
module.exports = router