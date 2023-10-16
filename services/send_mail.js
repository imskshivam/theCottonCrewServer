const nodemailer = require("nodemailer");

const sendMail = async (req,res) =>{
    let testAccount = await nodemailer.createTestAccount();

    
    const transport = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "maymie97@ethereal.email",
          pass: "pvepnUFMhSurzQdRtE",
        },
      });

      const info = await transport.sendMail({
        from: '"Fred Foo 👻"<sk9965160@gmail.com>', // sender address
        to: "shivamkaroria995@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent : ", info.messageId);
      
}

module.exports = sendMail;