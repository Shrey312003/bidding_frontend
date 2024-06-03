# Bidding Frontend

This is the frontend of web application bidding system where users can register, create items for auction, place bids on items, and view notifications.
It is made in React.

## Table of Contents

- [Bidding Frontend](#bidding-frontend)
  - [Table of Contents](#table-of-contents)
  - [Functionalities](#functionalities)
  - [Routes](#routes)
    - [Public Routes](#public-routes)
    - [Protected Routes](#protected-routes)
  - [Project Structure](#project-structure)
  - [Server URLs](#server-urls)
  - [How to Use the Project](#how-to-use-the-project)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)

## Functionalities

1. **User Authentication**
   - Register new users
   - Login existing users
2. **Item Management**
   - Create new items for auction
   - View list of items
   - View individual item details
3. **Bidding**
   - Place bids on items
   - View bidding history
4. **User Profile**
   - View and edit user profile
5. **Notifications**
   - View notifications related to bids and items

## Routes

### Public Routes

1. **/register**
   - **Description**: User registration page.
   - **Component**: `register.js`
   - **Styles**: `Register.css`

2. **/login**
   - **Description**: User login page.
   - **Component**: `login.js`
   - **Styles**: `Login.css`

3. **/items**
   - **Description**: List of all items available for bidding.
   - **Component**: `items.js`
   - **Styles**: `Items.css`

4. **/item/:id**
   - **Description**: Detailed view of a specific item.
   - **Component**: `item.js`
   - **Styles**: `Item.css`

### Protected Routes

1. **/profile**
   - **Description**: User profile page.
   - **Component**: `profile.js`
   - **Styles**: `Profile.css`

2. **/create-item**
   - **Description**: Page to create a new item for auction.
   - **Component**: `create_item.js`
   - **Styles**: `CreateItem.css`

3. **/bidding/:id**
   - **Description**: Page to place bids on a specific item.
   - **Component**: `bidding.js`
   - **Styles**: `Bidding.css`

4. **/notifications**
   - **Description**: Notifications related to user activities.
   - **Component**: `notfications.js`
   - **Styles**: `Notify.css`

## Project Structure

```
bidding_frontend/
├── public/
│ ├── favicon.ico
│ ├── index.html
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ ├── robots.txt
│ └── uploads/
│ └── pxfuel.jpg
├── src/
│ ├── hooks/
│ │ └── useFetch.js
│ ├── pages/
│ │ ├── bidding.js
│ │ ├── create_item.js
│ │ ├── item.js
│ │ ├── items.js
│ │ ├── login.js
│ │ ├── notfications.js
│ │ ├── profile.js
│ │ └── register.js
│ ├── store/
│ │ ├── authSlice.js
│ │ └── index.js
│ ├── styles/
│ │ ├── Bidding.css
│ │ ├── CreateItem.css
│ │ ├── Item.css
│ │ ├── Items.css
│ │ ├── Login.css
│ │ ├── Notify.css
│ │ ├── Profile.css
│ │ └── Register.css
│ ├── App.css
│ ├── App.js
│ ├── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```


## Server URLs

- **Authentication**
  - Register: `POST /api/auth/register`
  - Login: `POST /api/auth/login`
  
- **Items**
  - Create Item: `POST /api/items`
  - Get All Items: `GET /api/items`
  - Get Item by ID: `GET /api/items/:id`
  
- **Bidding**
  - Place Bid: `POST /api/bids`
  - Get Bids for Item: `GET /api/items/:id/bids`
  
- **Notifications**
  - Get Notifications: `GET /api/notifications`

## How to Use the Project

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the project:
    ```sh
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

### Usage

1. **Register and Login**
   - Navigate to `/register` to create a new account.
   - Navigate to `/login` to log into your account.

2. **Create Item**
   - After logging in, navigate to `/create-item` to create a new auction item.

3. **View and Bid on Items**
   - Navigate to `/items` to view all available items.
   - Click on any item to view details and place bids.

4. **User Profile**
   - Navigate to `/profile` to view and edit your profile information.

5. **Notifications**
   - Navigate to `/notifications` to view your notifications.
