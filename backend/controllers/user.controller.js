const  UserModel = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;

exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu ");

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID inconnu " + err);
  }).select("-password");
};

exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu ");

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {


        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).json({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu " );

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Utilisateur supprimé " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
