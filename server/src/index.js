const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const sequelize = require('./config/db');
const schema = require('./schema/UserSchema');

require("dotenv").config();


const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));
  

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  });