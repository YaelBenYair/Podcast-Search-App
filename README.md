# Podcast Search App

**Author:** Yael Ben Yair

## How to Run Locally

### Clone Repository
Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/YaelBenYair/Podcast-Search-App.git
```

### Install dependencies
Install dependencies in both files `servr` and `client`
```cmd
# Inside Podcast-Search-App/server
cd Podcast-Search-App/server
npm install

# Inside Podcast-Search-App/client
cd ../client
npm install
```

### Files to add
Open the `.env` file located within the server directory and include the following configuration settings:
```bash
MONGO_URI=YOUR_MONGO_DB_ACCESS_KEY   # Access key to the MongoDB database for connecting.
JWT_SECRET=YOUR_PRIVATE_JWT_SECRET   # Private key for authentication encryption.
```

### Run
- To run the server, use the following command `npm start`.
- To run the application, use the following command `npm run dev`.










