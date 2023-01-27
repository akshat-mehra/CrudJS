const express = require('express')
const { route } = require('express/lib/application.js')
const router = express.Router()
const Alien = require('../models/alien')

router.get('/', async(req,res) => {
    try{
           const aliens = await Alien.find()
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const aliens = await Alien.findById(req.params.id)
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        const a1 =  await alien.save() 
        res.json(a1)
    }catch(err){
        console.log(err)
        res.send('Error')
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)
    }catch(err){
        res.send('Error');
    }
})

router.delete('/:id', async(req, res) => {
    try{
        await Alien.findByIdAndDelete(req.params.id)
        console.log('remove successful')
    }catch(err){
        res.send('Error');
        console.log(err);
    }
})

module.exports = router