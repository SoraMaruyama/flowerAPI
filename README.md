# flowerAPI

“This was created during my time as a student at Code Chrysalis”

Service:
You can store your favorite flowers in database. The api will attach pretty giphy image for you.

API Methods:
Post >>
Input flower name and score (how much you like) in a web form. App generates request to get an image associated and save request with image in database.

Get >>
search for a flower name. If any match, respond with image from giphy.

Put >>
Input flower name and score, if any match, update its score.

Delete >>
Input flower name, if any match, app will set its score to null.

Database:
Stores input data in a sigle table "flower".

id
name
score
imageId
url
created_at
