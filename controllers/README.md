User Controller

This file documents the logic and purpose behind the functions defined in the userController.js file. It handles user creation, retrieval, updating, and deletion in a Node.js/Express backend using MongoDB via Mongoose.

⸻

1. createUser

Purpose:

Create and save a new user document to MongoDB.

Logic:
• Destructures uid, username, and email from req.body.
• Checks if any field is missing; if so, responds with 400.
• Looks for existing user with the same email. If found, returns 400.
• Creates a new User instance and saves it.
• Responds with 201 and the newly created user object on success.
• Responds with 500 on error.

⸻

2. getUserByUid

Purpose:

Retrieve a user document by their Firebase UID.

Logic:
• Extracts uid from the URL params.
• Searches for a user by UID.
• Returns 404 if not found.
• Returns the user object if found.
• Responds with 500 on server error.

⸻

3. updateUser

Purpose:

Update a user with the provided fields.

Logic:
• Uses req.user.uid (assuming middleware sets req.user).
• Accepts dynamic updates from req.body.
• Runs validators to ensure updated fields are valid.
• Returns the updated user or 404 if user is not found.
• Handles errors with a 500 response.

⸻

4. updateUsername

Purpose:

Specifically update a user’s username.

Logic:
• Uses uid from URL params.
• Destructures username from req.body.
• Updates only the username field.
• Returns the updated user or 404 if not found.
• Returns 500 on error.

⸻

5. deleteUser

Purpose:

Deletes a user by UID.

Logic:
• Uses req.user.uid for UID lookup.
• Deletes the user document if found.
• Returns 404 if user not found.
• Returns 200 with deleted user object on success.
• Returns 500 on error.

⸻

Exported Functions
• createUser
• getUserByUid
• updateUser
• updateUsername
• deleteUser

These exports are used to connect the controller to your route definitions.

---

Recipe Controller

This document explains the logic behind the recipeController.js file, which is responsible for handling recipe creation, retrieval, and filtering operations in a Node.js/Express backend using MongoDB.

⸻

1. createRecipe

Purpose:

Create and store a new recipe document including an image and structured data.

Logic:
• Validates that an image file was uploaded.
• Extracts and parses structured fields from req.body: ingredientsList, instructions, tags.
• Converts the uploaded image into a Base64 string.
• Saves the new recipe document to MongoDB.
• Responds with 201 on success or 500 on failure.

Notes:
• image.buffer.toString("base64") is used to store the image directly in the DB.
• tags is optional and defaults to an empty array.

⸻

2. getAllRecipes

Purpose:

Retrieve all recipes from the database.

Logic:
• Performs a simple .find() on the Recipe model.
• Responds with 200 and all recipes or 500 on error.

⸻

3. getRecipesByCourseType

Purpose:

Filter recipes based on courseType (e.g., Appetizer, Main, Dessert).

Logic:
• Extracts courseType from the URL.
• Uses .find({ courseType }) to fetch matching recipes.
• Returns 400 if no results are found.

⸻

4. getRecipesByCuisineType

Purpose:

Filter recipes based on cuisineType (e.g., Italian, Mexican).

Logic:
• Extracts cuisineType from the URL.
• Searches using .find({ cuisineType }).
• Returns 400 if no recipes found.

⸻

5. getRecipeByDifficultyLevel

Purpose:

Filter recipes based on difficultyLevel (e.g., Easy, Medium, Hard).

Logic:
• Extracts difficultyLevel from the URL.
• Searches for matching recipes.
• Returns 400 if no recipes are found.

⸻

6. getRecipeByTags

Purpose:

Filter recipes based on a tag string.

Logic:
• Extracts tags from the URL.
• Uses .find({ tags: tags }) — works if tags is a string in the tags array.
• Returns 400 if none found.

⸻

7. getRecipeById

Purpose:

Retrieve a specific recipe by its MongoDB \_id.

Logic:
• Extracts id from req.params.
• Uses .findById(id) to fetch the recipe.
• Logs the ID for debugging.
• Returns 404 if not found, or the recipe if found.

⸻

Exported Functions
• createRecipe
• getAllRecipes
• getRecipesByCourseType
• getRecipesByCuisineType
• getRecipeByDifficultyLevel
• getRecipeByTags
• getRecipeById

These functions are intended to be connected to route definitions and form the main interface for working with recipes in the app.

⸻

Recommendations
• You may eventually want to paginate getAllRecipes.
• Tag and course/cuisine type filters could support regex or fuzzy matching.
• Storing images in the database is fine for MVP but consider using cloud storage (like Firebase or Cloudinary) for better scalability.
