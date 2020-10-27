from django.db import models

class Notice(models.Model):
    text = models.TextField(max_length=500)
    time_stamp = models.DateTimeField(auto_now_add=True)
    campaign = models.ForeignKey(
        'campaigns.Campaign',
        related_name='campaign_notices',
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='posted_notices',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'Notice {self.id} on Campaign: {self.campaign}'
