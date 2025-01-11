const Group = require("../model/group");

exports.getPc = (req, res) => {
  req.session.lId = req.params.lId;
  Group.findById(req.session.gId).then((data) =>
    res.render("pc/pc.ejs", {
      title: "PCs",
      data: data.labs[req.session.lId].pcs,
      isAuth: req.session.isAuthenticated,
      gId: req.session.gId,
    })
  );
};

exports.getAddPc = (req, res) => {
  if (req.session.isAuthenticated)
    res.render("pc/add-pc.ejs", {
      title: "Add PC",
      isAuth: req.session.isAuthenticated,
    });
  else res.redirect(`/pc/${req.session.lId}`);
};

exports.postAddPc = (req, res) => {
  Group.findById(req.session.gId).then((data) => {
    data.labs[req.session.lId].pcs.push({
      name: req.body.name,
      description: req.body.description,
    });
    data.save();
  });
  res.redirect(`/pc/${req.session.lId}`);
};

exports.getDeletePc = async (req, res) => {
  if (req.session.isAuthenticated) {
    const pcId = req.params.id;
    await Group.findById(req.session.gId).then((group) => {
      group.labs[req.session.lId].pcs.splice(pcId);
      group.save();
    });
  }
  res.redirect(`/pc/${req.session.lId}`);
};

exports.getEditPc = async (req, res) => {
  if (req.session.isAuthenticated) {
    const pcId = req.params.id;
    Group.findById(req.session.gId).then((group) =>
      res.render("pc/edit-pc.ejs", {
        title: "Edit PC",
        isAuth: req.session.isAuthenticated,
        pc: group.labs[req.session.lId].pcs[pcId],
      })
    );
  } else res.redirect(`/pc/${req.session.lId}`);
};

exports.postEditPc = async (req, res) => {
  const pcId = req.params.id;
  Group.findById(req.session.gId).then((group) => {
    pc = group.labs[req.session.lId].pcs[pcId];
    pc.name = req.body.name;
    pc.description = req.body.description;
    group.save();
    res.redirect(`/pc/${req.session.lId}`);
  });
};
