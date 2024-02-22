const getUserController = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(`Error in get user controller ${error}`);
  }
};

export default getUserController;
