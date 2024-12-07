import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders


def send_email_with_smtplib(receiver_email,subject,body):
    try:
        sender_email = 'lambertmiranda909@gmail.com'
        password = 'mqjpmzagmaznqjly'

        # Set up the MIME
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = subject

        body = body
        print(body)
        msg.attach(MIMEText(body, 'plain'))

        # Connect to Gmail's SMTP server and send the email
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()

        print("Test email sent successfully!")

    except Exception as e:
        print(f"Error sending email via smtplib: {str(e)}")


