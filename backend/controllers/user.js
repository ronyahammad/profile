const User = require('../Models/User');

//updating the profile

exports.updateController = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    await User.findOneAndUpdate({ _id: req.user.id }, { name, bio, avatar });
    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


exports.readController = async(req, res) => {
  try {
    const user=await User.findById(req.user.id).select('-password')
    
    res.json( user ) 
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
  
};

exports.deleteUserController = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


exports.getAllUsersController = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password for security reasons
    res.json(users);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

