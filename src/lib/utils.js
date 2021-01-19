module.exports = {
     age(timestamp) {
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getFullYear() - birth.getFullYear()
        const month = today.getMonth() - birth.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birth.getDate()) {
            age = age - 1
        }

        return age
    },

     date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}` ,
            birthDay: `${day}/${month}`
        }
    },

    blood(blood) {

        switch (blood) {
            case "A1":
                return "A+";
                break;
            case "A0":
                return "A-";
                break;
            case "AB1":
                return "AB+";
                break;
            case "AB0":
                return "A-";
                break;

            case "B1":
                return "B+";
                break;

            case "B0":
                return "B-";
                break;
            case "O1":
                return "O+";
                break;
            case "O0":
                return "O-";
                break;

            default:
                console.log("Sorry something went wrong")
        }
    }
}