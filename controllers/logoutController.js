async function userLogout(req, res) {
    try {
        req.session.destroy();
        res.redirect("/");
    }
    catch (error) {
        console.log(error.message);
    }
}
module.exports=userLogout;
