from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    migrate = Migrate(app, db)
    login_manager.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.ticket_routes import ticket_bp
    from app.routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(ticket_bp, url_prefix='/tickets')
    app.register_blueprint(admin_bp, url_prefix='/admin')

    return app
