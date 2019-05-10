

const loginHandler = (req, res) => {
                        
                        // Once the login is successful, redirect to the home page
                         res.redirect('/home');
                         
                        }


module.exports = loginHandler;