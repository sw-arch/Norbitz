import connexion
import six

from swagger_server.models.user import User  # noqa: E501
from swagger_server import util, mongo_controls


def load(username=None):  # noqa: E501
    """Load user data

    Load your data with this endpoint. # noqa: E501

    :param username: Username
    :type username: str

    :rtype: User
    """
    ret = mongo_controls.get_db().users.find_one({
        'username': username
    })

    if ret is not None:
        return User(ret['username'], ret['userdata'])
    else:
        return "Invalid username", 400


def save(user=None):  # noqa: E501
    """Save user data

    Save your data with this endpoint. # noqa: E501

    :param user: User
    :type user: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        user = User.from_dict(connexion.request.get_json())  # noqa: E501

    ret = mongo_controls.get_db().users.find_one({
        'username': user.username
    })

    if ret is None:
        return "Invalid username", 400

    mongo_controls.get_db().users.update(
        {
            'username': user.username
        },
        {
            'userdata': user.userdata
        }
    )
