// We see 2 ways of handling asnyc function: one is by promises and the other is by try and catch
const asyncHandler = (myFunction) => {
    return (req, res, next) => {
        Promise.resolve(myFunction(req, res, next)).catch((err) => console.log(err))
    }
}

export {asyncHandler}


// const asyncHandler = (myFunction) => async (req, res, next) => {
//     try {
//         await myFunction(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }