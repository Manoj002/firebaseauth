const admin = require('firebase-admin');

module.exports = function(req, res) {

    if(!req.body.phone || !req.body.code) {
        return res.status(422).send({ error: 'Phone and code must be provided '})
    }

    const phone = String(req.body.phone);
        //  .replace(/[^\d]/g, "+");

    const code = String(req.body.code);

    admin.auth().getUser(phone)
        .then(() => {
            const ref = admin.database().ref('users/' + phone);

            ref.on('value', snapshot => {
                ref.off();

                const user = snapshot.val();

                if(JSON.stringify(user.code) === code) {
                    return res.status(422).send({ error: 'code not valid'})
                }

                if(!user.codeValid) {
                    return res.status(422).send({ error: 'codeValid is not valid'})
                }

                ref.update({ codeValid: false })

                admin.auth().createCustomToken(phone)
                    .then( token =>  res.send({ token: token }))
            })
        })
        .catch( err => {
            res.status(422).send({ error: err })
        })
}