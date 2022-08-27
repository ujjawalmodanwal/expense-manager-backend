const {User} = require('../models/userModels');
const asyncHandler = require("express-async-handler");
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async(req, res) =>{
    const {name, email, password, mobile} = req.body;
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User Already Exist');
    }
    const user = await User.create({
        name,
        email, 
        password,
        mobile,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            mobile: user.mobile,
            token: generateToken(user._id),
        });
    }
    else{
        res.status(400)
        throw new Error("Error Occured !");
    }

});

const authUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            mobile: user.mobile,
            token: generateToken(user._id),
        });
    }
    else{
        res.status(400)
        throw new Error("Invalid Email or Password!");
    }
});


const updateUserInfo = asyncHandler(async (req, res) => {
  const { name, email, mobile } = req.body.updatedUserInfo;
  const user = await User.find({_id:req.params.id});
  if (user[0] && user[0]._id.toString() !== req.params.id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (user[0]) {
    user[0].name = name;
    user[0].email = email;
    user[0].mobile = mobile;
    const updatedUserInfo = await user[0].save();
    res.json(updatedUserInfo);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});


module.exports ={registerUser, authUser, updateUserInfo};
