const loginHandler = (req, res) => 
                        //res.json({message: `Hey ${req.user.username}, you're successfully logged in`});
                         res.redirect('/home')
module.exports = loginHandler;