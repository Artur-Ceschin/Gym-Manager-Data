
const fs = require('fs');
const data = require('./data.json');
//POST
exports.post = function(req, res){

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill this fild " + key)
        }
        
    }

    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err){
        if (err) {
            return res.send("An error has occurred: " + err.message)
        }
        return res.redirect("/instructors")
    })
    //return res.send(req.body)
}

