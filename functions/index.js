const functions = require('firebase-functions');

const sendgrid = require ('sendrid')
const client = sendgrid ("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")

function parseBody(body){
    var helper = sendgrid.mail;
    var fromEmail = new helper.Email(body.from);
    var toEmail = new helper.Email(body.to);
    var subject = body.subject;
    var content = new helper.Content('text/html', body.content);
    var mail =  new helper.Mail(fromEmail, subject, toEmail, content);
    return mail.toJSON();
}


exports.httpEmail = functions.https.onRequest((req, res)=>{
    return Promise.resolve()
    .then(()=>{
        if(req.method !== 'POST'){
            const error = new Error('Only POST requests are accepted');
            error.code = 405;
            throw error;
        } 

        const request = client.empyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: parseBody(req.body)
        });

        return client.API(request)
    })
    .then((response)=>{
        if (response.body) {
            res.send(response.body);
        } else {
            res.end();
        }
        return response
        
    }) .catch((err)=>{
        console.error(err);
        return promise.reject(err);
    });
})