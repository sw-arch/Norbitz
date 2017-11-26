# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.user import User  # noqa: E501
from swagger_server.test import BaseTestCase


class TestPrivateController(BaseTestCase):
    """PrivateController integration test stubs"""

    def test_load(self):
        """Test case for load

        Load user data
        """
        query_string = [('username', 'username_example')]
        response = self.client.open(
            '/user',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_save(self):
        """Test case for save

        Save user data
        """
        user = User()
        response = self.client.open(
            '/user',
            method='POST',
            data=json.dumps(user),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
