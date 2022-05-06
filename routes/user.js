
const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user')
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')
const {validarCampos} = require('../middlewares/validar-campos')



const router = Router()


router.get('/', usuariosGet)

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRolValido),
    validarCampos
] ,usuariosPut)

router.post('/',[
    check('email','El correo no es valido').isEmail(),
    check('email').custom((email) => emailExiste(email)),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y de mas de 6 caracteres').isLength({min:6}),
    //check('role','El rol no es valido').isIn(['ADMIN','USER']),
    check('role').custom((rol) => esRolValido(rol)),
    validarCampos
] ,usuariosPost)

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
 ] ,usuariosDelete)




module.exports = router
