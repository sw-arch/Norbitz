import connexion
import six

from swagger_server.models.credential import Credential  # noqa: E501
from swagger_server.models.user import User  # noqa: E501
from swagger_server import util, mongo_controls


def login(credentials=None):  # noqa: E501
    """Login

    Use this endpoint to login to Norbitz. # noqa: E501

    :param credentials: User to login as
    :type credentials: dict | bytes

    :rtype: User
    """
    if connexion.request.is_json:
        credentials = Credential.from_dict(connexion.request.get_json())  # noqa: E501

    ret = mongo_controls.get_db().users.find_one({
        'username': credentials.username,
        'password': credentials.password
    })

    if ret is not None:
        return User(ret['username'], ret['orders'])
    else:
        return "Incorrect username or password", 401


def register(credentials=None):  # noqa: E501
    """Register

    Use this endpoint to register a new user # noqa: E501

    :param credentials: username and password
    :type credentials: dict | bytes

    :rtype: User
    """
    if connexion.request.is_json:
        credentials = Credential.from_dict(connexion.request.get_json())  # noqa: E501
    user = User(credentials.username, [])

    ret = mongo_controls.get_db().users.find_one({
        'username': credentials.username
    })

    if ret is not None:
        return "Username already exists", 401

    mongo_controls.get_db().users.insert_one(
        {
            'username': credentials.username,
            'password': credentials.password,
            'orders': user.orders
        }
    )

    return user
