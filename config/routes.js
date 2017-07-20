var usersController = require('../controllers/users');

router.route('/editBio')
.get(usersController.getEditBio)
.post(usersController.postEditBio)


module.exports = router
