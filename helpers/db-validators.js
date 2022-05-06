const Role = require('../models/role')
const usuario = require('../models/usuario')
const User = require('../models/usuario')

const esRolValido = async(role='') => {
    const existeRol = await Role.findOne({role})
    if(!existeRol){
        throw new Error(`El rol ${role} no esta registrado en la BD`)
    }
}

const emailExiste = async(email = '') => {
    const existeEmail = await User.findOne({email})
    if(existeEmail){
        throw new Error(`El email ${email} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUser = await User.findById(id)

    if(!existeUser){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}