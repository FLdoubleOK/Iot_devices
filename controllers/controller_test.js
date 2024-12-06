async function getNid(req, res) {
    res.redirect("/test/render")
}

async function render(req, res) {
    console.log("OK")
    res.render('test')
}

module.exports = {
    getNid, render
}