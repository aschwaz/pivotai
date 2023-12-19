from mongoengine import connect
from mongoengine import Document, StringField, DictField, DateTimeField
from datetime import datetime



class CareerPath(Document):
    prompt = StringField(required=True)
    response = StringField(required=True)
    pillar = StringField()  # Add a new field to store the pillar
    assessment = DictField()
    created_at = DateTimeField(default=datetime.utcnow)