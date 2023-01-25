const Ajv = require('ajv');
const ajv = new Ajv();
// const PermissionsModel = require('../models/permissionsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user')
const axios = require('axios');
const recipeSchema = require('../schema/recipes');
const Recipe = require('../schema/recipes');

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


    // console.log('res data', a.data);
    let b = []

    // let a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=thai');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }


    // // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=american');
    // // a = a.data.meals

    // // for (let i = 0; i < a.length; i++) {
    // //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    // //     console.log('This is the id', a[i].idMeal);
    // //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    // //     // console.log(data);
    // //     // b.push(data)
    // //     data = data.data.meals

    // //     const receipe = new Recipe(...data);
    // //     await receipe.save()
    // // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=british');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=french');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=italian');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=japanese');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=chinese');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=spanish');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=malaysian');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=indian');
    // a = a.data.meals

    // for (let i = 0; i < a.length; i++) {
    //     let data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     console.log('This is the id', a[i].idMeal);
    //     console.log('url asdfasdf', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     // console.log(data);
    //     // b.push(data)
    //     data = data.data.meals

    //     const receipe = new Recipe(...data);
    //     await receipe.save()
    // }

    // let a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Croatian');
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


    //     const newRecipe = new Recipe({
    //         idMeal: data[0].idMeal,
    //         strCategory: data[0].strCategory,
    //         strMeal: data[0].strMeal,
    //         strInstructions: data[0].strInstructions,
    //         strArea: data[0].strArea,
    //         strIngredient: [...ingredientArray],
    //         strMealThumb: data[0].strMealThumb,
    //         strMeasure: [...strMeasureArray]
    //     });

    //     newRecipe.save()



    //     // const d = {
    //     //     strCategory,
    //     //     strMeal,
    //     //     strInstructions,
    //     //     strArea,
    //     //     strMealThumb
    //     // } = data

    //     // console.log('this is data', ...data);
    //     // const receipe = new Recipe(...data);
    //     // await receipe.save()
    //     // console.log('data.data', data.data.meals);
    //     // for (let i = 0; i < a.length; i++) {
    //     //     b = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     //     for (let prop in b) {
    //     //         if (prop.substring(0, 9) === 'strMeasure') {
    //     //             console.log(prop + ': ' + obj[prop]);
    //     //             b.strMeasure.push()
    //     //         }
    //     //     }
    //     // }
    // }




    // a = axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canada');
    // for (let i = 0; i < a.length; i++) {
    //     b = axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a[i].idMeal}`);
    //     for (let prop in b) {
    //         if (prop.substring(0, 9) === 'strMeasure') {
    //             console.log(prop + ': ' + obj[prop]);
    //             b.strMeasure.push()
    //         }
    //     }
    // }

    // let a = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
    // console.log('this is the response', a.data.meals);

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