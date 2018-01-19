### App to organize storage of stuff (household items, etc)

![App to organize storage of stuff](../master/public/images/app-screen.jpg)

Based on wonderful course <a href="https://github.com/codedojo/redux-basics">Redux-basics</a> written by Oleg Polyakov.

#### How it works
* In this app you could add an item with status "wanted" by default. That means you've lost this item (as a reminder). In edit mode you could just change item name.
* In case you'd like remember position of useful, but rarely used item, you could mark it's status as "known" using a checkbox. For "known" items in edit mode you could change item name, add location, comment and photo.
* There are filters by status and by name.
* All data stored in a local json file (just in case).

#### Getting started

Clone the repository:

```sh
git clone git@github.com:SW999/storage-service.git
```

Install dependencies: 

```sh
cd storage-service
npm i
```
Start local server: run <i>start.bat</i> file or

```sh
node server
npm start
```

Browser will be started automatically at http://localhost:3000
