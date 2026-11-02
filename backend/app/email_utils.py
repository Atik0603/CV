import os
import smtplib
from email.message import EmailMessage


def send_email(to: str, subject: str, body: str) -> None:
    msg = EmailMessage()
    msg["From"] = os.environ["SMTP_USER"]
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP(os.environ["SMTP_HOST"], int(os.environ["SMTP_PORT"])) as server:
        server.starttls()
        server.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
        server.send_message(msg)