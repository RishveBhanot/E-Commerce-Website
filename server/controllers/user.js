const handleNewUserToDb = (req, res) => {
    userDataModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
};

const handleLoginUser = (req, res) => {
    const {email, password} = req.body;
    userDataModel.findOne({email: email})
    .then( user => {
        if(user){
            if(user.password = password){
                res.json('Success');
            } else {
                res.json('Password is incorrect');
            }
        } else{
            res.json('No Record Existed');
        }
    })
}

module.exports = {
    handleNewUserToDb,
    handleLoginUser
};