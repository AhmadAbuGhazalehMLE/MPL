const group = require("../model/group");
const Group = require("../model/group");

exports.getLab = (req, res) => {
  req.session.gId = req.params.gId;
  Group.findById(req.session.gId).then((data) =>
    res.render("lab/lab.ejs", {
      title: "Labs",
      data: data.labs,
      isAuth: req.session.isAuthenticated,
      
    })
  );
};

exports.getAddLab = (req, res) => {
  if (req.session.isAuthenticated)
    res.render("lab/add-lab.ejs", {
      title: "Add Lab",
      isAuth: req.session.isAuthenticated,
    });
  else res.redirect(`/lab/${req.session.gId}`);
};

exports.postAddLab = (req, res) => {
  Group.findById(req.session.gId).then((data) => {
    data.labs.push({ name: req.body.name, description: req.body.description });
    data.save();
  });
  res.redirect(`/lab/${req.session.gId}`);
};

exports.getDeleteLab = async (req, res) => {
  if (req.session.isAuthenticated) {
    const labId = req.params.id;
    await Group.findById(req.session.gId).then((group) => {
      group.labs.splice(labId);
      group.save();
    });
  }
  res.redirect(`/lab/${req.session.gId}`);
};

exports.getEditLab = async (req, res) => {
  if (req.session.isAuthenticated) {
    const labId = req.params.id;
    Group.findById(req.session.gId).then((group) =>
      res.render("lab/edit-lab.ejs", {
        title: "Edit Lab",
        isAuth: req.session.isAuthenticated,
        lab: group.labs[labId],
      })
    );
  } else res.redirect(`/lab/${req.session.gId}`);
};

exports.postEditLab = async (req, res) => {
  const labId = req.params.id;
  Group.findById(req.session.gId).then((group) => {
    lab = group.labs[labId];
    lab.name = req.body.name;
    lab.description = req.body.description;
    group.save();
    res.redirect(`/lab/${req.session.gId}`);
  });
};
