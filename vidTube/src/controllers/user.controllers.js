import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js"
import { User } from "../Model/users.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import e from "express";

dotenv.config()

const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID)
        if (!user) {
            throw new apiError(404, "User Not Found")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (err) {
        throw new apiError(500, "Something went wrong while generating token")
    }
}


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
        new ApiResponce(200, createdUser, "User registered Successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, username, password } = req.body
    console.log(email);

    if (!username && !email) {
        throw new apiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new apiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new apiError(401, "Refresh Token Not Found")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new apiError(404, "Invalid refresh token")

        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new apiError(401, "Invalid refresh token")
        }
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponce(200, {
                accessToken,
                refreshToken: newRefreshToken
            }, "Access Token Refreshed Successfully"));

    }
    catch (err) {
        throw new apiError(401, "Something went wrong while refreshing access token")
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined,
        }
    },
        { new: true })
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res.status(200).clear("accessToken", options).clear("refreshToken", options).json(new ApiResponce(200, {}, "User Logged Out Successfully"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordValid = await user.isPasswordCorrect(currentPassword)

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid User Password");
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponce(200, {}, "Password Changed Successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponce(200, req.user, "Current User Details"));
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;
    if (!fullName && !email) {
        throw new apiError(400, "Full Name or Email is required")
    }

    const user = await user.findByIdAndUpdate(req.user._id, {
        $set: {
            fullName,
            email: email
        }
    }, {
        new: true
    }).select("-password -refreshToken")

    return res.status(200).json(new ApiResponce(200, user, "Account Details Updated Successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new apiError(500, "Something went wrong while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            avatar: avatar.url
        }
    }, {
        new: true
    }).select("-password -refreshToken")

    return res.status(200).json(new ApiResponce(200, user, "Avatar Updated Successfully"))
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path
    if (!coverImageLocalPath) {
        throw new apiError(400, "Cover Image is required")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new apiError(500, "Something went wrong while uploading cover image")
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            coverImage: coverImage.url
        }
    }, {
        new: true
    }).select("-password -refreshToken")

    return res.status(200).json(new ApiResponce(200, user, "Cover Image Updated Successfully"))
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params
    if (!username?.trim()) {
        throw new apiError(400, "Username is required IN URL")
    }

    const channel = await User.aggregate(
        [{
            $match: {
                username: username?.toLowerCase()
            }
        }, {
            $lookup: {
                from: "subscription"
                , localField: "_id"
                , foreignField: "channel"
                , as: "subscribers"
            }
        }, {
            $lookup: {
                from: "subscription"
                , localField: "_id"
                , foreignField: "subscriber"
                , as: "subscriberedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelSubscribedTo: {
                    $size: "$subscriberedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {
                            $in: [req.user?._id, "$subscribers.subscriber"]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        }, {
            //project only required fields
            $project: {
                username: 1,
                fullName: 1,
                email: 1,
                avatar: 1,
                subscribersCount: 1,
                channelSubscribedTo: 1,
                isSubscribed: 1,
                coverImage: 1

            }
        }
        ]
    )

    if (!channel?.length) {
        throw new apiError(404, "Channel Not Found")
    }

    return res.status(200).json(new ApiResponce(
        200,
        channel[0],
        "Channel Profile"))
})

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        }, {
            $lookup: {
                from: "video",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory"
            },
            pipeline: [
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner",
                        pipeline: [
                            {
                                $project: {
                                    username: 1,
                                    fullName: 1,
                                    avatar: 1
                                }
                            }
                        ]
                    }
                }, {
                    $addFields: {
                        owner: {
                            $first: "$owner"
                        }
                    }
                }
            ]
        }
    ])
    return res.status(200).json(new ApiResponce(200, user[0]?.watchHistory, "Watch History Fetched Successfully"))
})

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
};