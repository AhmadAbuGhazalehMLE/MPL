const { render } = require("ejs");
const Group = require("../model/group");
exports.getGroup = (req, res) => {
  Group.find().then((data) =>
    res.render("group/group.ejs", {
      title: "Groups",
      data: data,
      isAuth: req.session.isAuthenticated,
    })
  );
};

exports.getAddGroup = (req, res) => {
  if (req.session.isAuthenticated)
    res.render("group/add-group.ejs", {
      title: "Add Group",
      isAuth: req.session.isAuthenticated,
    });
  else res.redirect("/group");
};

exports.postAddGroup = (req, res) => {
  const new_group = new Group({
    name: req.body.name,
    description: req.body.description,
  });
  new_group.save();
  res.redirect("/group");
};

exports.getDeleteGroup = async (req, res) => {
  if (req.session.isAuthenticated) {
    const group_id = req.params.id;
    await Group.findByIdAndDelete(group_id);
  }
  res.redirect("/group");
};

exports.getEditGroup = async (req, res) => {
  if (req.session.isAuthenticated) {
    const groupId = req.params.id;
    req.session.cGroupId = groupId;
    Group.findById(groupId).then((group) =>
      res.render("group/edit-group.ejs", {
        title: "Edit Group",
        isAuth: req.session.isAuthenticated,
        group: group,
      })
    );
  } else res.redirect("/group");
};

exports.postEditGroup = async (req, res) => {
  const group_id = req.params.id;
  Group.findById(group_id).then((group) => {
    group.name = req.body.name;
    group.description = req.body.description;
    group.save();
    res.redirect("/group");
  });
};
