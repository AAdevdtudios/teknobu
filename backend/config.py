from decouple import config


class AppConfig:
  SECRET_KEY = config('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = True
  SQLALCHEMY_DATABASE_URI = config("DATABASE_URL")
  JWT_SECRET_KEY = config("JWT_SECRET_KEY")