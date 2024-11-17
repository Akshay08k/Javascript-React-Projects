import { ApiResponce } from "../utils/apiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
    return res.
        status(200).
        json(new ApiResponce(200, "Healthy!", "success"));
});

export { healthcheck };