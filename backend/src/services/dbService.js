const { MongoClient, ServerApiVersion } = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://cmdf2022:q7R2Gdm3kSM1JFXV@cluster0.8pqpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const addValueToMealPlan = async (value) => {
  const insert = async (value) => {
    try {
      await client.connect()
      const database = client.db('prepplate');
      const mealplan = database.collection('mealplan');

      //      const doc = { text: value, isCompleted: false }
      const result = await mealplan.insertOne(value)
      console.log(`A mealplan was inserted with the _id: ${result.insertedId}`);
      return result
    } finally {
      await client.close()
    }
  };
  const result = await insert(value)
  return result;
}

const addValueToRecipes = async (value) => {
  const insert = async (value) => {
    try {
      await client.connect()
      const database = client.db('prepplate');
      const mealplan = database.collection('recipes');

      //     const doc = { text: value, isCompleted: false }
      for (var i = 0; i < value.length; i++) {
        var obj = value[i];
        const result = await mealplan.insertOne(obj);
        console.log(`A mealplan was inserted with the _id: ${result.insertedId}`);
      }
    } finally {
      await client.close()
    }
  };
  const result = await insert(value)
  return result;
}

const addValueToIngredients = async (value) => {
  const insert = async (value) => {
    try {
      await client.connect()
      const database = client.db('prepplate');
      const mealplan = database.collection('ingredients');

      const doc = { text: value, isCompleted: false }
      const result = await mealplan.insertOne(doc)
      console.log(`A mealplan was inserted with the _id: ${result.insertedId}`);
      return result
    } finally {
      await client.close()
    }
  };
  const result = await insert(value)
  return result;
}

const updateValueInDb = async (id, value, isCompleted) => {
  const update = async (id, value, isCompleted) => {
    try {
      await client.connect()
      const database = client.db('mydb');
      const todos = database.collection('todos');
      console.log(id)

      const filter = { "_id": ObjectID(id) };
      const options = { upsert: false };
      const updateDoc = {
        $set: {
          "text": value,
          "isCompleted": isCompleted
        },
      };
      const result = await todos.updateOne(filter, updateDoc, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
      return result
    } finally {
      await client.close()
    }
  };
  const result = await update(id, value, isCompleted)
  return result;
}

const deleteValueFromDb = async (id) => {
  const deleteValue = async (id) => {
    try {
      await client.connect()
      const database = client.db('mydb');
      const todos = database.collection('todos');
      console.log(id)

      const query = { "_id": ObjectID(id) };

      const result = await todos.deleteOne(query);
      console.log(
        `${result.deletedCount} document(s) deleted`,
      );
      return result
    } finally {
      await client.close()
    }
  };
  const result = await deleteValue(id)
  return result;
}

const getAllValuesFromDb = async () => {
  const getAll = async () => {
    try {
      await client.connect()
      const database = client.db('mydb');
      const todos = database.collection('todos');

      const query = {}
      const options = { projection: { _id: 1, text: 1, isCompleted: 1 } }
      const cursor = todos.find(query, options);
      const result = []
      await cursor.forEach((entry) => { console.log(entry); result.push(entry) })
      return result
    } finally {
      await client.close()
    }
  }
  const result = await getAll()
  return result;
}

module.exports = { addValueToMealPlan, addValueToRecipes, getAllValuesFromDb, updateValueInDb, deleteValueFromDb }