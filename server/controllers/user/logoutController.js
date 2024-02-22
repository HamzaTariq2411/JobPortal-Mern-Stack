const logoutController = (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      msg: "LogOut Succesfully",
    });
};

export default logoutController;
