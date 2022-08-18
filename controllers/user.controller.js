const UserModel = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu");

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Id non reconnu");
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu");

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          picture:req.body.picture
          
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu");

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
