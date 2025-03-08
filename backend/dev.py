# app.py
from flask import Flask
from config import AppConfig
from extensions import db, jwt, ma
from auth.routes import auth_bp

def create_app():
  app = Flask(__name__)
  app.config.from_object(AppConfig)

  # Initialize extensions
  db.init_app(app)
  jwt.init_app(app)
  ma.init_app(app)

  # Register blueprints
  app.register_blueprint(auth_bp)

  @app.route('/products', methods=['GET'])
  def get_products():
    from models import Product
    from validations import ProductSchema
    products = Product.query.all()
    product_schema = ProductSchema(many=True)
    return {"products": product_schema.dump(products)}

  return app

if __name__ == '__main__':
  app = create_app()
  with app.app_context():
    db.create_all()  # Ensure you're in an app context when creating tables
  app.run(host='0.0.0.0', port=5000, debug=True)
