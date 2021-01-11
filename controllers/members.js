const fs = require('fs');
const data = require('../data.json');
const {
    age,
    date,
    blood
} = require('../utils');


//INDEX
exports.index = function (req, res) {


    // let members = data.members.map(function(member){
    //     const newMember = {
    //         ...member,
    //         services: member.services.split(",")
    //     }
    //     return newMember;
    // });

    return res.render("members/index", {
        members: data.members
    });
};

//CREATE 
exports.create = function (req, res) {
    return res.render('members/create')
}

//POST
exports.post = function (req, res) {

    const keys = Object.keys(req.body)



    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill this fild " + key)
        }

    }


    birth = Date.parse(req.body.birth)


    // So vai acontecer a primeira vez 

    let id = 1

    const lastMember = data.members[data.members.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }


    data.members.push({
        id,
        ...req.body,
        birth,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("An error has occurred: " + err.message)
        }
        return res.redirect("/members/" + id)
    })
    //return res.send(req.body)
}


//SHOW
exports.show = function (req, res) {
    const {
        id
    } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })
    if (!foundMember) return res.send("Member not found")


    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: blood(foundMember.blood),
    }

    return res.render('members/show', {
        member
    })
}


//EDIT
exports.edit = function (req, res) {

    const {
        id
    } = req.params

    const foundMember = data.members.find(function (member) {
        return member.id == id
    })
    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
    }


    return res.render('members/edit', {
        member
    })

}


//PUT 
exports.put = function (req, res) {

    const {
        id
    } = req.body

    let index = 0

    const foundMember = data.members.find(function (member, foundIndex) {

        if (id == member.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
    }


    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send(err + " Error")
        }

        return res.redirect(`/members/${id}`)
    })


}

//DELETE 
exports.delete = function (req, res) {
    const {
        id
    } = req.body

    const filteredMembers = data.members.filter(function (member) {

        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send('Found an error' + err)
        }

        return res.redirect('/members')
    })
}