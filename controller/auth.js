const { log } = require("console");
const Admin = require("../model/admin");
exports.getLogin = (req, res) => {
  if (req.session.isAuthenticated) res.redirect("/group");
  else
    res.render("login.ejs", {
      title: "Login",
    });
};

exports.postLogin = (req, res) => {
  Admin.find({ name: req.body.name, password: req.body.password }).then(
    (admin) => {
      if (admin.length) {
        req.session.isAuthenticated = true;
        res.redirect("/group");
      } else res.redirect("/");
    }
  );
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};
