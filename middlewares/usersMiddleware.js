const Ajv = require('ajv');
const ajv = new Ajv();
// const PermissionsModel = require('../models/permissionsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user')
const axios = require('axios');
const recipeSchema = require('../schema/recipes');
const Recipe = require('../schema/recipes');
const { findOneAndUpdate } = require('../schema/user');

require('dotenv').config();
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

function passwordsMatch(req, res, next) {
    if (req.body.password !== req.body.repassword) {
        res.status(400).send("Passwords dont match");
        return;
    }
    delete req.body.repassword;
    // const {repasword, ...rest} = req.body
    // req.body = rest
    next();
}

async function hashPwd(req, res, next) {
    const saltRounds = 10;
    console.log('saltRounds', saltRounds, 'req.body.password', req.body.password);
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        req.body.password = hash;
        // console.log(hash);
        next();
    });
}

const isValidId = async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findOne({ userId })
    // console.log(user);
    if (!user) {
        res.status(400).send('There is no existing user selected');
        return;
    }
    next();
}

const isNewUser = async (req, res, next) => {
    const { userId } = req.params;
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        res.status(400).send('User already exists');
        return;
    }
    next();
};

const getData = async (req, res, next) => {
    const allUsers = await User.find();

    const allReceipes = await Recipe.find();

    //this is updating users

    // reviewDishes: [{
    //     dish: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Recipe',
    //     },
    //     reviewed: {
    //       type: Boolean,
    //       default: false
    //     },
    //     review: {
    //       type: Number,
    //       default: 3
    //     }
    //   }],

    // console.log('allUsers', allUsers);
    try {
        for (let i = 0; i < allUsers.length; i++) {
            allUsers[i].reviewDishes = []
            for (let j = 0; i < allReceipes.length; j++) {
                if (!allUsers[i].reviewDishes[j]) allUsers[i].reviewDishes[j] = {}
                if (!allUsers[i].reviewDishes[j].dish) allUsers[i].reviewDishes[j].dish = {}
                allUsers[i].reviewDishes[j].dish = allReceipes[j]
                const updatedUser = await findOneAndUpdate(allUsers[i]._id, allUsers[i])

                updatedUser.save();
            }
        }
    } catch (err) {
        console.log('thi is the error', err);
    }
    //this is updating users

    //this is inserting into receipes
    // let b = []

    // let a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Vietnamese');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals


    //     let ingredientArray = [];

    //     for (let i = 1; i <= 20; i++) {
    //         let ingredient = data[0][`strIngredient${i}`];
    //         if (ingredient) {
    //             ingredientArray.push(ingredient);
    //         }
    //     }

    //     data.strIngredient = ingredientArray;

    //     let strMeasureArray = [];

    //     for (let i = 1; i <= 20; i++) {
    //         let strmeasure = data[0][`strMeasure${i}`];
    //         if (strmeasure) {
    //             strMeasureArray.push(strmeasure);
    //         }
    //     }

    //     data.strMeasure = strMeasureArray;



    //     console.log('data[0]', data[0]);

    //     data[0].reviews = [{}]

    //     for (let i = 0; i < allUsers.length; i++) {
    //         if (!data[0].reviews[i]) data[0].reviews[i] = {}
    //         data[0].reviews[i].user = {}
    //         data[0].reviews[i].user = allUsers[i];
    //         // data.reviews[i].reviewed = false;
    //     }

    //     console.log('data[0].reviews', data[0].reviews);

    //     const newRecipe = new Recipe({
    //         idMeal: data[0].idMeal,
    //         strCategory: data[0].strCategory,
    //         strMeal: data[0].strMeal,
    //         strInstructions: data[0].strInstructions,
    //         strArea: data[0].strArea,
    //         strIngredient: [...ingredientArray],
    //         strMealThumb: data[0].strMealThumb,
    //         strMeasure: [...strMeasureArray],
    //         reviews: data[0].reviews
    //     });

    //     newRecipe.save()

    // }

    //this is inserting into receipes




    next()
    //           case 'US':
    // return 'United States';
    //           case 'CA':
    // return 'Canada';
    //           case 'GB':
    // return 'Great Britain';
    //           case 'IT':
    // return 'Italy';
    //           case 'FR':
    // return 'France';
    //           case 'CN':
    // return 'China';
    //           case 'HR':
    // return 'Croatia';
    //           case 'NL':
    // return 'Netherlands';
    //           case 'EG':
    // return 'Egypt';
    //           case 'GR':
    // return 'Greece';
    //           case 'IN':
    // return 'India';
    //           case 'IE':
    // return 'Ireland';
    //           case 'JM':
    // return 'Jamaica';
    //           case 'JP':
    // return 'Japan';
    //           case 'MY':
    // return 'Malaysia';
    //           case 'MX':
    // return 'Mexico';
    //           case 'MA':
    // return 'Morocco';
    //           case 'PL':
    // return 'Poland';
    //           case 'PT':
    // return 'Portugal';
    //           case 'RU':
    // return 'Russia';
    //           case 'ES':
    // return 'Spain';
    //           case 'TH':
    // return 'Thailand';
    //           case 'TN':
    // return 'Tunisia';
    //           case 'TR':
    // return 'Turkey';
    //           case 'VN':
    // return 'Vietnam';
    //           default:
    // return;
    //         }
    //   }
}


const checkIfUserExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).send('User with this email does not exist');
            return;
        }
        req.body.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
}

const passwordCompare = async (req, res, next) => {

    const user = req.body.user
    const password = req.body.password

    console.log('user', user, 'password', password);
    try {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(404).send("Incorrect password!")
        }
        next()
    } catch (err) {
        return res.status(404).send("Incorrect password!")
    }
}

const genrateToken = async (req, res, next) => {
    const user = req.body.user
    const token = user.generateAuthToken()
    req.body.token = token;
    // res.cookie("token", token, { httpOnly: true })
    // res.send({ user, token })
    next()
}



module.exports = {
    passwordsMatch,
    hashPwd,
    checkIfUserExists,
    isValidId,
    isNewUser,
    passwordCompare,
    genrateToken,
    getData
};