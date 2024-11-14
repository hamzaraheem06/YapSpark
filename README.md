# How did I created this App?

I used Appwrite backend service to create all the backend handling of the blog app.

## **1. Created the Environment Variables**

#### **What are Env variable?**

When we create an app, we want application to communicate with database or api. For keeping all the information safe, we create env file so that nothing gets revealed to public users.

- create a .env file in root of your project. Root is not src folder.
- Write in uppercase for **create react app** ( REACT_APP_APPWRITE_URL and assign values to it. REACT_APP_YOUR_VARIABLE is the naming rule. To access the variable use **process.env.REACT_APP_APPWRITE_YOUR_VARIABLE** ), **for vite** (VITE_YOUR_VARIABLE for name convection, and to access use **import.meta.env.VITE_YOUR_VARIABLE**). Using this name convention, create all your env variables.

- create a duplicate .env.sample file for your convinence and use, and empty the env variables.
- Add the .env to gitignore so that it should not get public, unintentionally.
- goto Appwrite and create new project. and get the project url, and project id and paste the values in your .env file.
- create a new database in appwrite and paste its database id in .env file. Also, create a new collection (table) in database and paste it's id in .env file. After creating the collection goto its setting and set its permission settings. i.e. who can change the collection data, etc
- after creation and setting of collection, create attributes ( columns name), to set a basic layout of our collection
- also create indexes for status.
- after collection, go to storage to create bucket. and paste its id in .env file. also, set it permissions.

To efficiently use these env variables. create a config folder in src, file named config.js and export an object with key value pairs of these variables

## **2. Built the authentication service.**

This is create to make user account who will use the blog app. For this we will also use Appwrite Authentication Service. _Hamza Please go through appwrite authentication documentation after the project._

We will be using the Service approach, so that if in future we want to use another service ( class based approach ) for authentication, it doesn't disturb all of the code base.

- Create an appwrite folder in src folder to manage all the Appwrite Related Services.
- Create a auth.js folder for Authentication Service.
- Import all the necessary authentication objects i.e. Client, Account, ID from "appwrite"
- Create a class AuthService and Create an object using this class and export the object.
- **Why Create an object when you can directly export the class?**

If we export the class we would need to use it again and again at our register service for new user and expose our authentication service with the UI elements. However, when we use object export technique. We can just export the ojbect once and use every method directly.

```javascript
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId); // connecting the database for client registration
    this.account = new Account(this.client); // creating new account using the client
  }
}
```

- In the AuthService Class, create client using Client, and account Property. Dont copy paste the Appwrite code. Instead use the constructor, so whenever the a new user i.e. authService object is created then the client and account should be created and not when the class is created.

- Create new user using all the methods provided by account Appwrite Authentication Service.

- Create Async function for every operation like Sign up, login, etc

- **Why did we not created it directly like in appwrite documentation?**
  Suppose you are now a Full Stack Developer and created your own database. And you want to shift authentication to your database. You will just change the try catch block and made some modification in the constructor and you will be set to go. You are not dependent on appwrite.

- **Advantage of using this technique of Authentication Service?**
  This Code is now future proof. If there is any change in the authentication service channel, you can just come to src/appwrite/auth.js and make your changes, without making any changes to your frontend. Moreover, the code mentioned above is reusable, it is created in a sense that you can copy paste it any of your new project and use it. There will almost, if not minor, no changes in the code.

## **3. Built the Database Related services.**

This is very similar to the way we created the authentication service due to uniformity in the Appwrite services. These will include all the database storing, creating and access API calls.

- After creating a basic class-based approach to create a DatabaseService class, start creating all the required methods as we did in Authentication

```javascript
export class DatabaseService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId); // connecting the database for client registration
    this.database = new Databases(this.client);
    this.storage = new Storage(this.storage);
  }
}
```

- Create newPost, updatePost and all the database methods required like we did in auth.js using the try catch approach.
- Create file methods to upload and delete a file. This is done using the Storage object provided in the "appwrite"

## **4. Created a store using Redux Toolkit**

#### **What is a store Hamza?**

If I were to make it complicated I could. But it is not. It is just like a global file which has storage of most items. We need it to prevent props drilling. Now what is prop drilling Hamza? So in easy words, when we want to pass some variable to inner most element. We have to pass it to every outer element that include that element. This creates a lot of unnecessary props passing. So we use Redux Toolkit to create a global store that is accessable to all the elements, and use the variables directly when needed.

**The following steps show how to create a store.**

- Create a new folder Store anywhere you want.
- Create a new file store.js, import configureStore from "@reduxjs/toolkit", and create and export store using the imported method

```javascript
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({});

export default store;
```

- After store has been created, create a slice for every Service.
- Create slice and export reducers/actions using createSlice provided in "@reduxjs/toolkit"

  **Slice:** A slice is an object, that contains the name of store portion, initialState, and reducers (or actions, functions that allow us to make changes in store).

  **How to create reducers:**

  _Syntax:_

  reducerName: (state, action) => {body of reducer}

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const slice = createSlice({
  name: "slice name",
  initialState,
  reducers: {},
});

export const { reducers } = slice.actions;

export default slice.reducer;
```

- There are mainly two methods used after store creation

  - useDispatch to display something or add something
    useDispatch(reducer(data))
    useDispatch uses reducers to update store, so create a function use useDispatch it expects a reducer and pass your value to it

  - useSelector is used access to state of the store

    useSelector((state)=> state.values)

## **5. Created components (UI) for the application**

For Frontend UI components, I used an opensource React UI Library, daisyUI, for design consistency and as mentioned in daisyUI to make the UI look gooood.

**The following points are kept in mind while creating the components:**

- The components are more production based, meaning they are prop controlled. We can use a single component to perform a little different operation by changing the props value when using in Parent Component.
- I used only a single UI library instead of multiple to maintain the design consistency.
- Pretend this is a third reason, because a list with more than two items looks more accurate then a list with 2 items.
- Yes, I copied the third point from daisyUI documentation. So what, I copied the components too.
