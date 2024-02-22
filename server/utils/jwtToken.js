export const sendToken = async (user, statuscode, res, msg) => {
  const token =await user.generateToken();
  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    user,
    msg,
    token,
  });
};
