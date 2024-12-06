const path = require('path');
const db = require('../database/db_login');
const dbUserInfo = require('../database/dbUserInfo');

async function login(req, res) {
  console.log("OK TEST ")
  res.render('login')
}
// async function getNid(req, res) {
//     const { nid } = req.params;

//     if (nid){
//         console.log(nid)
//         req.session.nid = nid;
//         req.session.isLoggedIn = true;
//         res.redirect("/devices/login")
//     }else{
//         console.log('NG')
//         res.redirect("/devices/accessdenied")
//     }
//     // console.log(NID);
//     // req.session.NID = NID;
//     // res.redirect("/devices/request")
// }

async function Showlogin(req, res) {
  // console.log('ok')
  // console.log(req.session.NID);
  res.render('login', { userInfo: req.session.nid })
}

// async function User(req, res) {
//     const { NID } = req.body
//     console.log(NID);
//     return
//     const result = await db.User(NID);

//     res.send(result)
// }

async function getNid(req, res) {
  try {
    const { nid } = req.params;
    // console.log(nid);
    const result = await db.SelectUserInfoByNID(nid);
    const resultRoleID = await dbUserInfo.SelectUserInforByNID(nid);
    // console.log(result);
    // const result = await dbHome.selectUserInfoByNID(NID);
    // return;
    if (result.success) {
      // Update session data based on successful retrieval
      req.session.isLoggedIn = true;
      req.session.nid = nid;
      // console.log(result.data[0].First_LastName2);
      // return;
      if (result.data.length > 0) {
        req.session.Name = result.data[0].First_LastName2;
        req.session.Dept = 'Nikon Thailand';
        req.session.RoleID = resultRoleID[0].RoleID;
      } else {
        req.session.Name = nid;
        req.session.Dept = 'Nikon';
        req.session.RoleID = 4;
      }

      res.redirect('/devices/login');
    } else {
      // Consider using more specific status codes based on the error type
      res.status(500).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error in getNid:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function renderLoginPage(req, res) {
  if (!req.session.isLoggedIn) {
    res.redirect('/devices/accessdenied');
  } else {
    res.render('login', {
      NID: req.session.nid,
      Name: req.session.Name,
      Dept: req.session.Dept,
    });
  }
}

module.exports = {
  getNid,
  renderLoginPage,
  Showlogin
};

