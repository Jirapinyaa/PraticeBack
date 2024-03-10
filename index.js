require("dotenv").config();
const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const port = process.env.PORT || 3000;

const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/Order.sqlite",
});

const catagory = sequelize.define("catagory", {
    catagory_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    catagory_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

/*"product_id": "P001",
    "product_name": "Widget A",
    "product_amount": 100,
    "product_price": 24.99,
    "category_id": "C001*/
const product = sequelize.define("product", {
    product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    product_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    product_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    catagory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

catagory.hasMany(product, {
    foreignKey: "catagory_id",
});

product.belongsTo(catagory, {
    foreignKey: "catagory_id",
});

sequelize.sync();

app.use(express.json());



app.get("/",(req,res) => {
    res.status(200).json("Hello World");
});

app.get("/catagory/:catagory_id", (req,res) => {
    catagory.findOne({
        where: {
            catagory_id: req.params.catagory_id,

            
        },
    })
    
    .then((row) => {
        res.status(200).json(row);

    })
    .catch((err) => {
        console.log(err);

    })
    
});

app.get("/catagory", (req,res) => {
    catagory.findAll()
    .then((rows) => {
        res.status(200).json(rows);

    })
    .catch((err) => {
        console.log(err);

    })
})

app.put("/catagory/:catagory_id", (req,res) => {
    catagory.findByPk(req.params.catagory_id)
    .then((catagory) => {
        catagory
        .update(req.body)
        .then((row) => {
            res.status(200).json(row);
        })
        

    })
    .catch((err) => {
        console.log(err);

    });
    
    res.status(200).json(req.body);
});

app.delete("/catagory/:catagory_id", (req,res) => {
    //res.status(200).json("DELETE");
    //req.status(200).json(req.query.catagory_id);
    catagory.findByPk(req.params.catagory_id)
    .then((catagory) => {
        catagory
        .destroy()
        .then((row) => { 
        res.status(200).json(row);
    })
    .catch((err) => {
        console.log(err);

    });
    
});
});

app.post("/catagory", (req,res) => {
    catagory.create(req.body)
    .then((rows) => {
        res.status(200).json(rows);

    })
    .catch((err) => {
        console.log(err);

    })
});

app.get("/product", (req,res) => {
    product.findAll({
        include:[
            {
                model: catagory,
                attributes: ["catagory_name"],
            },
        ],
    })
    .then((rows) => {
        res.status(200).json(rows);

    })
    .catch((err) => {
        console.log(err);

    })
})

app.get("/product", (req,res) => {
    product.findOne({
        include:[
            {
                model: catagory,
                attributes: ["catagory_name"],
            },
        ],
        where3: {
            product_id: req.params.product_id,
        },
    })
    .then((rows) => {
        res.status(200).json(rows);

    })
    .catch((err) => {
        console.log(err);

    })
})

app.post("/product", (req,res) => {
    product.create(req.body)
    .then((rows) => {
        res.status(200).json(rows);

    })
    .catch((err) => {
        console.log(err);

    })
    //res.status(200).json("hello");
});

app.put("/product/:product_id", (req,res) => {
    product.findByPk(req.params.product_id)
    .then((product) => {
        product
        .update(req.body)
        .then((row) => {
            res.status(200).json(row);
        })
        

    })
    .catch((err) => {
        console.log(err);

    });
    
    res.status(200).json(req.body);
});

app.delete("/product/:product_id", (req,res) => {
    //res.status(200).json("DELETE");
    //req.status(200).json(req.query.catagory_id);
    product.findByPk(req.params.product_id)
    .then((product) => {
        product
        .destroy()
        .then((row) => { 
        res.status(200).json(row);
    })
    .catch((err) => {
        console.log(err);

    });
    
});
});



app.listen(port,function(){
    console.log(`server run on port ${port}`);
});