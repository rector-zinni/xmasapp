from routes import goods
from flask import Flask,jsonify
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
def main():
    print('welcome to server')
    @app.route('/products')
    def serveProduct():
        print('initialising product routes')
        return jsonify(goods.getProducts())
    if __name__=='__main__':
        app.run(debug=True)
    
main()