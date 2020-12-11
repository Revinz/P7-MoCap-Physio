# P7 Project - PhysioCHIT

This project can be tried out until the exam has been completed, where afterwards the server will be taken down.

Access the Controller page at p7controller.surge.sh.

Download the APK at: https://drive.google.com/file/d/1s4c7g9QIX2NkGo6xxdac9WZSdHpva4JW/view?usp=sharing

Note: this project is only tested on Android 8+.

## Dev Setup

1. Run 'yarn' in the 'MobileApp' folder

2. Run "npm install" in the 'NotificationServer' folder

3. Create a Firebase admin SDK config json.

4. Create a firebase real-time database, and note the URL.

5. Add the json to "./NotificationServer"

6. Create a .env file in the same folder

7. Insert the following into the file:

   FIREBASE_CONFIG=<PATH_TO_FIREBASE_ADMIN_CONFIG>
   DATABASE_URL = <FIREBASE_DATABASE_URL>
   port=<PORT>

8. Download your firebase Google Services account json.

9. Place it in the folder "./MobileApp/android"

10. Start the NotificationServer using node server.js in the NotificationServer folder

11.
