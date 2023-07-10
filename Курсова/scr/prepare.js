function prepare(){
    let startArray = [
        {name: "Coffe cup", volume: 150, material: "Porcelain", pictname: "coffe_cup.jpg"},
        {name: "Class coffe cup", volume: 225, material: "Glass", pictname: "coffee-cup-glass.jpg"},
        {name: "Cartons of coffeemakers", volume: 250, material: "Paper", pictname: "kartonnen-koffiebeker-250ml.jpg"},
        {name: "Metal mug", volume: 270, material: "Metal", pictname: "metal-mug-enamel.jpg"},
        {name: "Silicone cup", volume: 300, material: "Silicone", pictname: "silicone-cup-violet.jpg"},
    ]
    
    localStorage.clear()
    
    for (let i=0; i<startArray.length; i++) {   
        let row = startArray[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(`${i}`, rowSt)
    }

    location.reload();
}