
const dbUser = require("../db/user");

const homeController = (req, res) => {
      

                        dbUser.findOne({username:req.user.username}).lean().exec()
                              .then(user=>{

                                    // to show the uploaded videos list by the user
                                    let uploads = user.uploaded_videos

                                    res.render('home',{username:req.user.username,
                                        uploads:uploads})
                                })

                };

module.exports = homeController;