const express = require('express');
const router = express.Router();
const adminSchema = require('../models/adminSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create Admin


router.post('/register',async (req, res) => {
    const admin = await adminSchema.create(req.body);
    //Encriptar password
    req.body.password = bcrypt.hashSync(req.body.password, 10); //10 veces se
    res.json(admin);
    admin.save();
    /*
    admin.save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({ message: err });
        });
        */
});

router.post('/login',async (req, res) => {
    const {username,password} = req.body;
    const admin = await adminSchema.findOne({username:username});
    if(!admin){
        return res.json({error: 'Contraseña o usuario incorrecto'})
    }
    if(password!=admin.password){
        return res.json({error: 'Contraseña o usuario incorrecto'})
    }
    console.log('success');
    return res.json({response:createToken(admin)});
});



router.post('/admins', async (req, res) => {
    try {
        const admin = await adminSchema.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});


// Get all admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await adminSchema.find({});
        res.status(200)
            .json(admins);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});

// Get admin by ID
router.get('/admins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await adminSchema.findById(id);
        if (admin) {
            res.status(200)
                .json(admin);
        } else {
            res.status(404)
                .json({ message: `Cannot find any admin with ID '${id}'` });
        }
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});


// Update admin by ID
router.put('/admins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, proposals } = req.body;
        const admin = await adminSchema.findByIdAndUpdate(id, { username, password, proposals }, { new: true });
        if (!admin) {
            return res.status(404)
                .json({ message: `Cannot find any admin with ID '${id}'` });
        }
        const updatedAdmin= await adminSchema.findById(id);
        res.status(200)
            .json(updatedAdmin);
    } catch (error) {
        res.status(500)
            .json({ message: 'Internal Server Error', details: error.message });
    }
});



// Delete admin by ID
router.delete('/admins/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await adminSchema.findByIdAndDelete({ _id: id });
        if (!admin) {
            res.status(404)
                .json({ success: false, message: `Cannot find any admin with ID '${id}'` });
        }
        res.status(200)
            .json({ success: true })
    } catch (error) {
        res.status(500)
            .json({ success: false, message: 'Internal Server Error', details: error.message });
    }
});


function createToken(admin){
    const payload = {
        admin_token: admin.token
    }
    return jwt.sign(payload, 'token')
}

module.exports = router;