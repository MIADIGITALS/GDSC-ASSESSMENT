const express = require("express");
const bcrypt = require("bcrypt")
const app = express();

const auth = require("./authorized/auth");
 


const host = "localhost"
const port = 3000

// const connect = require("./db/connect");
const {Food, Poultry, Drinks, Cakes} = require("./menu/menus")
menus = [Food, Poultry, Drinks, Cakes]
  

// app.use(authorize) 


app.listen(`${port}`)
console.log(`server listening to https://${host}:${port}`)


// GET
app.get('/', (req, res) => {
    res.redirect("/menus")
})

app.get('/menus', (req,res) => {
    res.status(200).json(menus)
    console.log(menus)
})

app.get("/menus/foods",(req, res) => {
    res.status(200).json(Food)
    console.log("All Foods Available")
})
app.get("/menus/foods/:foodid",(req, res) => {
    const {foodid} = req.params

    const singlefood = Food.find(
        (food) => food.id === Number(foodid)
    )
    if (singlefood) {
        console.log(singlefood)
        res.json(singlefood)
    }
    else {
        res.status(404).send('<h1>Food does not exist</h1>')
    }
})

app.get("/menus/poultry",(req, res) => {
    res.status(200).json(Drinks)
    console.log("All Poultrys Available")
})
app.get("/menus/poultry/:poultryid",(req, res) => {
    const {poultryid} = req.params

    const singlepoultry = Poultry.find(
        (poultry) => poultry.id === Number(poultryid)
    )
    if (singlepoultry) {
        console.log(singlepoultry)
        res.json(singlepoultry)
    }

    else {
        res.status(404).send('<h1>Poultry does not exist</h1>')
    }
})

app.get("/menus/drinks",(req, res) => {
    res.status(200).json(Drinks)
    console.log("All Drinks Available")
})
app.get("/menus/drinks/:drinkid",(req, res) => {
    const {drinkid} = req.params

    const singledrink = Drinks.find(
        (drink) => drink.id === Number(drinkid)
    )
    if (singledrink) {
        console.log(singledrink)
        res.json(singledrink)
    }
    else {
        res.status(404).send('<h1>Drink does not exist</h1>')
    }
})

app.get("/menus/cakes",(req, res) => {
    res.status(200).json(Drinks)
    console.log("All Cakes Available")
})
app.get("/menus/cakes/:cakeid",(req, res) => {
    const {cakeid} = req.params

    const singlecake = Cakes.find(
        (cake) => cake.id === Number(cakeid)
    )
    if (singlecake) {
        console.log(singlecake);
        res.json(singlecake);
    }
    else {
        res.status(404).send('<h1>Cake does not exist</h1>');
    }
})
app.get("/orders", (req, res) => {
    const getfood = (food => {
        return food
    })
    const foodorders = Food.find(food => getfood(food));

    const getPoultry = (Poultry => {
        return Poultry
    })
    const Poultryorders = Poultry.find(poultry => getPoultry(poultry));

    const getdrink = (drink => {
        return drink
    })
    const drinkorders = Drinks.find(drink => getdrink(drink));

    const getcake = (cake => {
        return cake 
    })
    const cakeorders = Cakes.find(cake => getcake(cake));

    const foodprice = Food.map((food) => {
        const {price} = food 
        return price
    })
    const totalprice = foodprice.reduce((a, b) => a + b, 0)
    
    const orders = [foodorders, drinkorders, Poultryorders, cakeorders, `TOTAL PRICE - ${totalprice}` ]
    res.json(orders)

})

// POST
app.post('/register',(req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword =  bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
});

app.post('/login', (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
        res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = User.findOne({ email });

        if (user && (bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
})


// PUT
app.put("/orders", (req, res) => {
    res.json(orders)
     
})
app.put("/menus", auth, (req, res) => {
    res.json();
})
 
// DELETE
app.delete("/menus", (req, res) => {

})