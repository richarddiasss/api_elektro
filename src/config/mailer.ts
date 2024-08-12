import nodemailer from 'nodemailer'

const mailSender = process.env.MAIL_SENDER
const mailPass = process.env.MAIL_PASS
const mailToken = process.env.MAIL_TOKEN

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailSender,
      pass : mailToken,
    },
  });


function createMessageObject(emailToBeSendedTo:string,subject:string,messageText:string){
    const messageObject = {
        from: mailPass,
        to:emailToBeSendedTo,
        subject:subject,
        text:messageText
    }

    return messageObject
}

function sendEmail(emailToBeSendedTo:string,subject:string,messageText:string){
    const messageObject = createMessageObject(emailToBeSendedTo,subject,messageText)

    transport.sendMail(messageObject, (error) => {
        throw error
    })
}

export {
    createMessageObject,
    sendEmail
}