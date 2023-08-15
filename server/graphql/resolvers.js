const Recipe = require('../models/Recipe');

module.exports = {
    Query: {
        async recipe(_, { ID }) { // first parameter is "parent", which we don't need in this case
            return await Recipe.findById(ID); // .findById is given to us by mongoose
        },
        async getRecipes(_, { amount }) {
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount); // -1 gives most recent. 1 would give us the oldest
        },
        async getAllRecipes(_) {
            return await Recipe.find().sort({ createdAt: -1 }) // -1 gives most recent. 1 would give us the oldest
        }
    },
    Mutation: {
        async createRecipe(_, { recipeInput: {name, description} }) {
            const createdRecipe = new Recipe({ // Mongoose model setup. Giving random numbers for thumbsUp and thumbsDown as mock data
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: Math.floor(Math.random() * 100),
                thumbsDown: Math.floor(Math.random() * 30)
            });

            const res = await createdRecipe.save(); // MongoDB saving

            return {
                id: res.id,
                ...res._doc // Shows what all the properties of our recipe are. Weird syntax but it is what it is. (name, description, createdAt, etc. console.log(...res._doc) for more details)
            }
        },

        async deleteRecipe(_, { ID }) {
            const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount // deleteOne is from mongodb. _id is mongodb given id and ID is what we're passing in.
            return wasDeleted; // .deletedCount: returns 1 if something was deleted, 0 if nothing was deleted. We're returning a boolean based off our mutation typeDef
        },

        async editRecipe(_, { ID, recipeInput: {name, description} }) {
            const wasEdited = (await Recipe.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
            return wasEdited; // .modifiedCount: returns 1 if something was edited, 0 if nothing was edited. We're returning a boolean based off our mutation typeDef
        }
    }
}