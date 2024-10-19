const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      return res.status(400).json({ msg: "Invalid Authentication." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
    if (!token) {
      return res.status(400).json({ msg: "Token not found." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication." });

      req.user = user.UserInfo;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

