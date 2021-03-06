var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');
var guardian = require('../security/guardian');
// const { ROL_ADMIN } = require('../const')

/*
 * GET
 */
router.get('/with_address', guardian({}), usuarioController.with_address);
router.get('/', guardian({}), usuarioController.list);
// router.get('/', guardian({}), usuarioController.list)

router.get('/c_ac', guardian({ activationToken: true }), usuarioController.c_ac);

router.get('/:id/simple_data', guardian({}), usuarioController.simple_data);

router.get('/:id', guardian({}), usuarioController.show);

/*
 * POST
 */
router.post('/mail_pass_check', usuarioController.mail_pass_check);
/*
  Verifica que exista un usuario con el mail indicado, si existe, envía un email directamente al email del usuario con un token especial (especial dado que no sirve para realizar un login) para realizar la recuperación
*/
router.post('/login', usuarioController.login);
router.post('/', usuarioController.create);

/*
 * PUT
 */
router.put('/ch_pass', guardian({ mailToken: true }), usuarioController.ch_pass);

router.put('/set_address', guardian({}), usuarioController.set_address);
router.put('/', guardian({}), usuarioController.update);
// router.put('/set_avatar', guardian({}), usuarioController.set_avatar);

/*
  El guardian valida la existencia de un usuario con _id igual al uid del token especial, de ser así pasa la petición al controlador, este, setea la nueva contraseña de usuario
*/

/*
 * DELETE
 */
router.delete('/:id', guardian({}), usuarioController.remove);

module.exports = router;
