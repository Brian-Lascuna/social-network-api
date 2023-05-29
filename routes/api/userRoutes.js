const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    addUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// api/users
router.route('/').get(getUsers).post(addUser);

// api/users/:userid
router.route('/:userid').get(getSingleUser).delete(deleteUser);

// api/users/:userid/friends
router.route('/:userid/friends').post(addFriend);

// api/users/:userid/friends/:friendid
router.route('/:userid/friends/:friendid').delete(deleteFriend);

module.exports = router;