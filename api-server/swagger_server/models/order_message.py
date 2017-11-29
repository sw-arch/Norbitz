# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class OrderMessage(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(self, username: str=None, order: str=None):  # noqa: E501
        """OrderMessage - a model defined in Swagger

        :param username: The username of this OrderMessage.  # noqa: E501
        :type username: str
        :param order: The order of this OrderMessage.  # noqa: E501
        :type order: str
        """
        self.swagger_types = {
            'username': str,
            'order': str
        }

        self.attribute_map = {
            'username': 'username',
            'order': 'order'
        }

        self._username = username
        self._order = order

    @classmethod
    def from_dict(cls, dikt) -> 'OrderMessage':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The OrderMessage of this OrderMessage.  # noqa: E501
        :rtype: OrderMessage
        """
        return util.deserialize_model(dikt, cls)

    @property
    def username(self) -> str:
        """Gets the username of this OrderMessage.


        :return: The username of this OrderMessage.
        :rtype: str
        """
        return self._username

    @username.setter
    def username(self, username: str):
        """Sets the username of this OrderMessage.


        :param username: The username of this OrderMessage.
        :type username: str
        """
        if username is None:
            raise ValueError("Invalid value for `username`, must not be `None`")  # noqa: E501

        self._username = username

    @property
    def order(self) -> str:
        """Gets the order of this OrderMessage.


        :return: The order of this OrderMessage.
        :rtype: str
        """
        return self._order

    @order.setter
    def order(self, order: str):
        """Sets the order of this OrderMessage.


        :param order: The order of this OrderMessage.
        :type order: str
        """
        if order is None:
            raise ValueError("Invalid value for `order`, must not be `None`")  # noqa: E501

        self._order = order
