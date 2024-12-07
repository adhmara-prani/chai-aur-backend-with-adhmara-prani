import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => 
{
    // get user details from frontend
    // validation - not empty
    // check if user is already registered or not
    // check for images and avatar
    // upload them to cloudinary and create user object
    // remove password
    // make refresh and access token
    // check for user creation
    // return res
    
    const {fullName, email, username, password} = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() === " ")) {
        throw new ApiError(400, "All fields are required!");
    }

    const userExists = User.find({
        $or: [{username}, {email}]
    })

    if (userExists) {
        throw new ApiError(409, "User already exists!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImgLocalPath = req.files?.coverImg[0]?.path;

    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required!");

    const avatarDetails = await uploadOnCloudinary(avatarLocalPath);
    const coverImgDetails = await uploadOnCloudinary(coverImgLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar is required!")
    }

    const user = await User.create({fullName, avatar: avatar.url, coverImg: coverImg?.url || "", email, password, username: username.toLowerCase()});
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ) //removing the password

    if (!createdUser) {
        throw new ApiError(500, "Internal Server Error, User couldn't be registered!")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User has been created successfully!")
    )
}
)

export {registerUser}