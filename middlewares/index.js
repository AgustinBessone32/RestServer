const validarCampos = require('../middlewares/validar-campos')
const validarjwt  = require('../middlewares/validar-jwt')
const validarRoles = require('../middlewares/validar-rol')

module.exports = {
    ...validarCampos,
    ...validarjwt,
    ...validarRoles
}