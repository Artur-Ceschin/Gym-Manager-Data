const {
    age,
    date
} = require('../lib/utils');

module.exports = {
    index(req, res) {
        let instructors = data.instructors.map(function (instructor) {
            const newInstructor = {
                ...instructor,
                services: instructor.services.split(",")
            }
            return newInstructor;
        });

        return res.render("instructors/index", {
            instructors
        });
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)



        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }

        return
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }
        return
    },
    delete(req, res) {
        return
    },
}