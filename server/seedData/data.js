const selectMainCategory = (index) => {
    if(index < 100){
        return "maindish"
    }else if(index < 160){
        return "appetizer"
    }else{
        return "dessert"
    }
}

const randomDate = (date1, date2) => {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    if( date1>date2){
        return new Date(randomValueBetween(date2,date1)).toLocaleDateString()   
    } else{
        return new Date(randomValueBetween(date1, date2)).toLocaleDateString()  

    }
}

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8 + 3)];
    }
    return color;
}

const selectSubCategory = (index) => {
    //maindish:
    if(index < 20){
        return "pizza"
    }else if(index < 40){
        return "burger"
    }else if(index < 60){
        return "pork"
    }else if(index < 80){
        return "beef"
    }else if(index < 100){
        return "seafood"
    //appetizer:
    }else if(index < 120){
        return "soup"
    }else if(index < 140){
        return "salad"
    }else if(index < 160){
        return "sandwich"
    //dessert:
    }else if(index < 180){
        return "cake"
    }else if(index < 200){
        return "icecream"
    }else if(index < 220){
        return "pudding"
    }else if(index <= 240){
        return "pancakes"
    }
}

const randomInteger = (min, max) => {
    return Math.floor(((Math.random() * (max - min + 1)) + min)/100)*100;
}

module.exports = [
    "Margherita",
    "Marinara",
    "Quattro Stagioni",
    "Carbonara",
    "Frutti di Mare",
    "Quattro Formaggi",
    "Crudo",
    "Napoletana",
    "Pugliese",
    "Montanara",
    "Emiliana",
    "Romana",
    "Fattoria",
    "Schiacciata",
    "Prosciutto",
    "Americana",
    "Prosciutto e Funghi",
    "Braccio di Ferro",
    "Sarda",
    "Tonno",
    //pizza
    "50/50 burger",
    "Angus burger",
    "Aussie Burger/Kiwiburger",
    "Bacon cheeseburger",
    "Barbecue burger",
    "Bøfsandwich",
    "Butter burger",
    "Buffalo burger",
    "California burger",
    "Carolina burger",
    "Cheeseburger",
    "Chili burger",
    "Green chile burger",
    "Hamdog",
    "Hawaii burger",
    "Jucy Lucy",
    "Kimchi burger",
    "Luther Burger",
    "Pastrami burger",
    "Rice burger",
    //burger
    "Crispy pata",
    "Crubeens",
    "Fritada",
    "Goetta",
    "Geera pork",
    "Kushikatsu",
    "Kalakukko",
    "Machaca",
    "Moo shu pork",
    "Pig roast",
    "Pig fallopian tubes",
    "Pickle meat",
    "Pork and beans",
    "Pork ball",
    "Pig's organ soup",
    "Pork chop bun",
    "Pork knuckle",
    "Pork pie",
    "Pork ribs",
    "Pulled pork",
    //pork
    "Beef Manhattan",
    "Beef bun",
    "Beef Wellington",
    "Beefsteak",
    "Bulalo",
    "Boiled beef",
    "Filet mignon",
    "Cowboy beans",
    "Prime rib",
    "Rinderbraten",
    "Shredded beef",
    "Steak",
    "Sukiyaki",
    "Stovies",
    "Tongue toast",
    "Meatloaf",
    "Meatball",
    "Curry beef triangle",
    "Beef on weck",
    "Ginger beef",
    //beef
    "Chowder",
    "Cioppino",
    "Hoe",
    "Paella",
    "Seafood basket",
    "Seafood boil",
    "Clam cake",
    "Clam chowder",
    "Fried clams",
    "Stuffed clam",
    "Steamed clams",
    "New England clam bake",
    "Lobster bisque",
    "Lobster stew",
    "Hangtown fry",
    "Oysters Rockefeller",
    "Potted shrimps",
    "Prawn cracker",
    "Squid",
    "Cuttlefish",
    //seafood
    //eddig maindish
    "Avocado soup",
    "Bacon soup",
    "Beer soup",
    "Cazuela",
    "Chicken noodle soup",
    "Cream of potato",
    "Cream of crab",
    "Cream of mushroom",
    "Cucumber soup",
    "Egg drop soup",
    "Peanut soup",
    "Pork blood soup",
    "Ramen",
    "Sliced fish soup",
    "Solyanka",
    "Stone soup",
    "Cottage cheese soup",
    "Nacho cheese soup",
    "Parmesan cheese soup",
    "Cream of Onion",
    //soup
    "Ambrosia",
    "Arab salad",
    "Bean salad",
    "Cheese slaw",
    "Chicken salad",
    "Coleslaw",
    "Crab Louie",
    "Egg salad",
    "Fruit salad",
    "Greek salad",
    "Ham salad",
    "Matbucha",
    "Panzanella",
    "Taco salad",
    "Chinese chicken salad	",
    "Caesar salad",
    "Cobb salad",
    "Fiambre",
    "Garden salad",
    "Israeli salad",
    //salad
    "Bagel toast",
    "Barros Jarpa",
    "Beef on weck",
    "Bratwurst",
    "British Rail",
    "Butterbrot",
    "Cheese and pickle",
    "Churrasco",
    "Club sandwich",
    "Cuban sandwich",
    "Denver sandwich",
    "Egg sandwich",
    "Fish finger sandwich",
    "Gatsby sandwich",
    "Ham sandwich",
    "Hot dog",
    "Ice cream sandwich",
    "Jucy Lucy",
    "Leberkäse",
    "Monte Cristo",
    //sandwich
    //eddig appetizer
    "Angel cake",
    "Apple cake",
    "Applesauce cake",
    "Avocado cake",
    "Banana bread",
    "Basbousa",
    "Battenberg cake",
    "Beer cake",
    "Better than sex cake",
    "Butterfly cake",
    "Carrot cake",
    "Charlotte cake",
    "Chocolate cake",
    "Coffee cake",
    "Crystal cake",
    "Cupcake",
    "Devil's food cake",
    "Fig cake",
    "Fruitcake",
    "Ice cream cake",
    //cake
    "Black Sabbath",
    "Banana",
    "Bourbon",
    "Cardamom black pepper",
    "Chocolate",
    "Chocolate coffee",
    "Chocolate rum",
    "Chokecherry",
    "Coconut almond chip",
    "Coconut curry",
    "Cookies and cream",
    "Green tea",
    "Peppermint",
    "Strawberry",
    "Vanilla",
    "Watermelon",
    "Red velvet",
    "Horseradish",
    "Halva",
    "Firecracker",
    //icecream
    "Banana pudding",
    "Almond jelly",
    "Bread and butter pudding",
    "Christmas pudding",
    "Coconut pudding",
    "Haggis",
    "Spotted dick",
    "Summer pudding",
    "Yorkshire pudding",
    "Zerde",
    "Suet pudding",
    "Sticky date pudding",
    "Spoonbread",
    "Queen of Puddings",
    "Panna cotta",
    "Mango pudding",
    "Dutch baby pancake",
    "Figgy pudding",
    "Cottage Pudding",
    "Black pudding",
    //pudding
    "Buttermilk Pancakes",
    "Kaiserschmarrn",
    "Pikelets",
    "Scallion Pancakes",
    "Blini or Blintz",
    "Pancakes with Sugar and Lemon",
    "Pannukakku",
    "Crêpes pancake",
    "Tiganites",
    "Okonomiyaki",
    "Kimchi Pancakes",
    "Apam Balik pancake",
    "Hotcakes",
    "Pannenkoeken",
    "Olady",
    "Scottish Pancake",
    "Anjero",
    "Pannekoeke",
    "Raggmunk",
    "Cachapas",
    //pancakes
].map((item,index) => {
    const date = randomDate("01-01-2020", "01-01-2010");
    return {
        name: item,
        description: `This amazing food is: ${item}`,
        price: randomInteger(1000, 4000),
        mainCategory: selectMainCategory(index),
        subCategory: selectSubCategory(index),
        color: getRandomColor(),
        vegetarian: index % 5 === 0 ? true : false,
        spicy: index % 3 === 0 ? true : false,
        src: `/static/images/${selectSubCategory(index)}${Math.floor((Math.random()*7) + 1)}.jpg`,
        createdAt: date,
        updatedAt: date,
        availableDate: "to be done"
    }
});