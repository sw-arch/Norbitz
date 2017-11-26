import os
from pymongo import MongoClient, errors

DBCONN = None


def get_db():
    global DBCONN
    if DBCONN is None:
        uri = "mongodb://" + \
        os.environ["DB_USERNAME"] + ':' + \
        os.environ["DB_PASSWORD"] + \
        "@db.norbitz.jac.observer:27017"

        try:
            DBCONN = MongoClient(uri)
        except errors.OperationFailure as e:
            print(uri)
            raise e

    return DBCONN.norbitz
