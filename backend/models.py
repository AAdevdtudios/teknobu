from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from extensions import db
from datetime import datetime


def get_uuid():
  return uuid4().hex

class User(db.Model):
  __tablename__ = "users"
  id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
  email = db.Column(db.String(345), unique=True)
  password = db.Column(db.Text, nullable=False)
  fullname = db.Column(db.String(44))
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Product(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), unique=True, nullable=False)
  description = db.Column(db.String(255))
  price = db.Column(db.Float)