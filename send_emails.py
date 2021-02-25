import os
import json
import requests

TO_MAIL_LIST = os.environ.get('MAILING_LIST')  # <mailing_list_name>@<DOMAIN>
API_KEY = os.environ.get('API_KEY')
TEMPLATE_NAME = os.environ.get('TEMPLATE_NAME')


def send_email(title, data):
    x = {"from": "Newsletter",
         "to": TO_MAIL_LIST,  # <mailing_list_name>@<DOMAIN>
         "subject": title,
         "template": TEMPLATE_NAME,
         "h:X-Mailgun-Variables": json.dumps(data)}
    return requests.post(
        "https://api.mailgun.net/v3/mg.ruddra.com/messages",
        auth=("api", f"{API_KEY}"),
        data=x)


if __name__ == '__main__':
    data = {}  # variables used in template
    subject = "My subject for emails"
    send_email(subject, data)
