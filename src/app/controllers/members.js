const {
    age,
    date,
    blood,
} = require('../../lib/utils');

const Member = require('../model/Member')

module.exports = {
    index(req, res) {

        Member.all(function(members){
            return res.render('members/index', {members})
        })

    },
    create(req, res) {

        Member.instructorsSelectOptions(function(options){
            return res.render('members/create', {instructorOptions:options})
        })

        
    },
    post(req, res) {
        const keys = Object.keys(req.body)



        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }

        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })

   
    },
    show(req, res) {
        Member.find(req.params.id, function(member){
            if(!member){
                return res.send('Member not found')
            }

            member.birth = date(member.birth).birthDay
            member.blood = blood(member.blood)

            return res.render('members/show', {member})
        })
    },
    edit(req, res) {
        Member.find(req.params.id, function(member){
            if(!member){
                return res.send('Member not found')
            }

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options){
                return res.render('members/edit', {member, instructorOptions:options})
            })

            
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }
        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res) {
        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })
    },
}