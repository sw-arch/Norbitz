import connexion
import six

from swagger_server.models.order_message import OrderMessage  # noqa: E501
from swagger_server.models.user import User  # noqa: E501
from swagger_server import util, mongo_controls


def delete(username):  # noqa: E501
    """Delete user&#39;s order history

     # noqa: E501

    :param username: Username
    :type username: str

    :rtype: None
    """
    ret = mongo_controls.get_db().users.find_one({
        'username': username
    })

    if ret is None:
        return "Invalid username", 400

    mongo_controls.get_db().users.update_one(
        {
            'username': username
        },
        {
            "$set": {
                "orders": []
            }
        }
    )

    return "Success"


def load(username):  # noqa: E501
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
        return User(ret['username'], ret['orders'])
    else:
        return "Invalid username", 400


def save(orderMessage):  # noqa: E501
    """Save order data

    Save an order data entry with this endpoint. # noqa: E501

    :param orderMessage: Order information
    :type orderMessage: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        orderMessage = OrderMessage.from_dict(connexion.request.get_json())  # noqa: E501

    ret = mongo_controls.get_db().users.find_one({
        'username': orderMessage.username
    })

    if ret is None:
        return "Invalid username", 400

    mongo_controls.get_db().users.update_one(
        {
            'username': orderMessage.username
        },
        {
            '$push': {
                'orders': orderMessage.order
            }
        }
    )

    return "Success"
