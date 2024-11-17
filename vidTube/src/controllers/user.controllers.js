import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js"
import { User } from "../Model/users.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import dotenv from "dotenv"

dotenv.config()

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body

    //validation
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "Full Name is required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new apiError(409, "User already exists");
    }
    // console.warn(req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar Is Missing ");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(coverLocalPath)

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new apiError(200, createdUser, "User registered Successfully")
    )
})


export { registerUser }