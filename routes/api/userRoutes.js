const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// prep GET all and POST /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(newUser)

// prep GET, PUT, and DELETE by ID /api/users/:id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// prep POST and DELETE (add/remove friends)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;
