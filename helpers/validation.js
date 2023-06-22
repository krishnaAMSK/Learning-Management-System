const {check}= require('express-validator');

exports.signUpValidation=[
    check('name','Name is required').not().isEmpty(),
    check('email','please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password','password is required').isLength({min:6})
]