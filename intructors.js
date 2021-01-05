
const fs = require('fs');
const data = require('./data.json');

exports.show = function(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })
    if (!foundInstructor) return res.send("Instructor not found")

    const instructor = {
        ...foundInstructor,
        age:"",
        gender:"",
        services:"",
        created_at:"",
    }
    
    return res.render('instructors/show', { instructor})
}



//POST
exports.post = function(req, res){

    const keys = Object.keys(req.body)

    

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill this fild " + key)
        }
        
    }

    let {avatar_url, name, birth, gender, services} = req.body

    birth = Date.parse(req.body.birth)
    created_at = Date.now()
    id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err){
        if (err) {
            return res.send("An error has occurred: " + err.message)
        }
        return res.redirect("/instructors")
    })
    //return res.send(req.body)
}

