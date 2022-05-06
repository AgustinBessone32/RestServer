const { response } = require("express");
const User = require('../models/usuario')
const bcrypt = require('bcryptjs');
const usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");


const login = async(req, res = response) => {

    const { email, password } = req.body


    try {

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - correo'
            })
        }

        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - estado: false'
            })
        }

        const validPass = bcrypt.compareSync(password, user.password)

        if(!validPass){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos - contraseña'
            })
        }

        //Generar JWT
        const token = await generarJWT(user.id)

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



}

module.exports = {
    login
}