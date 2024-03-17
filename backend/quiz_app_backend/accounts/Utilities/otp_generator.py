# otp_generator.py

import random


def generate_otp():
    # Generate a 6-digit OTP
    otp = ''.join([str(random.randint(0, 9)) for _ in range(4)])
    return otp
