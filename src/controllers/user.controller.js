import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import User from '../models/user.mdoel.js'
import { ApiResponse } from "../utils/APIResponse.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const registerUser = asyncHandler(async (req,res)=>{

   const {fullName, email, password, username } = req.body;

   if(
    [fullName, email, username, password].some( (fields) => fields?.trim() === "")
   ){
        throw new ApiError(400, "All fields are required")
   }

   const existedUser = await User.findOne({
    $or: [{ username },{ email }]
   })

   if (existedUser) {
    throw new ApiError(409, "User with same email or username already exists")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

//    let coverImageLocalPath;
//    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
//        coverImageLocalPath = req.files.coverImage[0].path
//    }

   if (!avatarLocalPath) {
     throw new ApiError(400, "Avatar file is required")
 }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

   if(!avatar){
    throw new ApiError(400,"Avatar file is required");
   }

   const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url,
        email,
        password,
        username: username.toLowerCase()

   })

   const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
   )

   if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user");
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User created Successfully")
   )
   
})

export {registerUser}