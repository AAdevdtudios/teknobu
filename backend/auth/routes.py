from flask import Blueprint, request, jsonify
from extensions import db
from models import User
from auth.utils import hash_password, verify_password
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')
  fullname = data.get('fullname')

  if not email or not password:
      return jsonify({"message": "Missing email or password"}), 400

  if User.query.filter_by(email=email).first():
      return jsonify({"message": "User already exists"}), 400

  new_user = User(email=email, password=hash_password(password), fullname= fullname)
  db.session.add(new_user)
  db.session.commit()
  return jsonify({"message": "User created successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')

  if not email or not password:
      return jsonify({"message": "Missing email or password"}), 400

  user = User.query.filter_by(email=email).first()
  if not user or not verify_password(password, user.password):
      return jsonify({"message": "Invalid credentials"}), 401

  access_token = create_access_token(identity=user.id)
  print(access_token)
  return jsonify({"access_token": access_token}), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
  user_id = get_jwt_identity()
  user = User.query.get(user_id)
  if not user:
      return jsonify({"message": "User not found"}), 404

  return jsonify({
      "fullname": user.fullname,
      "email": user.email,
      "created_at": user.created_at.isoformat()
  }), 200
