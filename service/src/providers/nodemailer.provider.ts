import nodemailer from 'nodemailer'

export default function SendEmail(from: string, to: string, subject: string, html: string) {
    return new Promise((resolve, _) => { 
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b7d12a73a45c77",
              pass: "6469509ec0ece8"
            }
          });
        
        const mailOptions = {
            from, 
            to,
            subject, 
            html
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) {
                console.error(err)
                resolve(false)
                throw err
            }    
            else {
                console.info(info);
                resolve(true)
            }
        });
    })
}

/*
 const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b7d12a73a45c77",
          pass: "6469509ec0ece8"
        }
      });
    
    const mailOptions = {
        from, 
        to,
        subject, 
        html
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.error(err)
            throw err
        }    
        else {
            console.info(info);
            return info
        }
    });
*/