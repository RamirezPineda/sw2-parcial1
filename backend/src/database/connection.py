from sqlalchemy import create_engine

from src.config.settings import DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD

# Database connection
# https://docs.sqlalchemy.org/en/14/core/engines.html#mysql

host = DB_HOST
dbname = DB_NAME
username = DB_USERNAME
password = DB_PASSWORD

conection = "mysql+pymysql://{username}:{password}@{host}/{dbname}"

engine = create_engine(conection.format(
    username=username,
    password=password,
    host=host,
    dbname=dbname
))

