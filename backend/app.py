from flask import Flask
from extensions import db, jwt, ma
from config import AppConfig
from auth.routes import auth_bp
from decouple import config, Csv
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(AppConfig)
CORS(app, supports_credentials=True)
CORS(app, supports_credentials=True, origins=config("ALLOWED_CORS", cast=Csv()))

db.init_app(app)
jwt.init_app(app)
ma.init_app(app)

app.register_blueprint(auth_bp)

with app.app_context():
  db.create_all()

if __name__ == "__main__":

  app.run(host='0.0.0.0', port=5000, debug=config("DEBUG", default=False, cast=bool))