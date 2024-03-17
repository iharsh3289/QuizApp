reset_Password_subject_mail = "OTP: For Reset Password"
account_registeration_subject_mail = "OTP: For Account Registration"

def message(otp):
    return f"Dear User,\n\n" \
           f"OTP is :\n\n" \
           f"{otp}\n\n" \
           f"This is an auto-generated email. Please do not reply to this email.\n\n" \
           f"Regards\n" \
           f"InstaQuiz Team \n\n"

# Exporting the variables and function
__all__ = ['reset_Password_subject_mail', 'account_registeration_subject_mail','message']
