const monkeymap = initMap();
const verb = defineVerbs();
const button = document.getElementById("do");
const screen = document.getElementById("description")
button.onclick = verbValidation

let player = {position:[0,3]}
let currentPosition = monkeymap[player.position[0]][player.position[1]];


function initMap(){
    const monkey =[
        [0 ,1 ,2 ,3],
        [0 ,1 ,2 ,3],
        [0 ,1 ,2 ,3],
        [0 ,1 ,2 ,3],
    ];
   monkey[0][0] = {description:"Ves un lago , necesitarias un barca para cruzarlo", 
                   exits :["s","e"]},
                 
   
   monkey[0][1] = {description:" Al cruzar el lago ves un inmenso campo enfrente de tí con lo que parece un bosque al fondo " ,
                   exits :["e","w"]},
                  
   
   monkey[0][2] = {description:"Entras en un bosque de Eucalipto a tu alrededor sientes un extraño silecio" , 
                   exits :["w"]} , 
                 
   monkey[0][3] = {description:"Estas en una carcel antigua , el aspecto de la propia carcel te parece deteriorado , a tu lado estan los restos de varios hombres uno de los cuales tiene una carta en sus manos.",
                   exits: ["s"] },
                  

   monkey[1][0] = {description:"Delante de tí tienes un pequeño embarcadero y una tienda a su lado ",
                   exits:["n","e"]} ;


   monkey[1][1] = {description:" Estas en la tienda de Stan , llegar hasta aqui no ha debido de ser nada facíl", 
                   exits:["w","s"]};


   monkey[1][2] = {description:" Has llegado al cuartel , a tu izq ves la puerta de salida del mismo ", 
                   exits:["s","e"]};


   monkey[1][3] = {description:"Ves un pasillo largo donde esta la entrada de la carcel , ves dos puertas una de ellas a la entrada de la carcel y la otra a un pasillo oscuro.", 
                   exits:["n","w","s"]} ;


   monkey[2][0] = {description:"Has llegado al acceso de una playa paradisiaca a lo lejos puedes ver un barco , te sera dificil pasar un guardia custodia el puerto.", 
                   exits:["s","e"]};


   monkey[2][1] = {description:"Estas en una plaza , parece que todo el pueblo esta desierto", 
                   exits:["n","s","e","w"]};
                   
                   
   monkey[2][2] = {description:"Te encuentras en la entrada de la biblioteca hacia el sur tienes una puerta que te lleva a la biblioteca.", 
                   exits:["n","w"]};
                   
                   
   monkey[2][3] = {description:"Te adentras en un pasillo oscuro , necesitarias algo de luz para ver lo que hay en este pasillo.",
                   exits:["n","s"]} ;
                   
                   
   monkey[3][0] = {description:"Has conseguido escapar de la Isla , por fín puedes convertirte en un pirata", 
                   exits:["n","w"]};
                   
                   
   monkey[3][1] = {description:"Estas en la biblioteca tienes delante de tí un sillon con una mesita y varias estanterias estan a tu alrededor.",
                   exits:["n","e"]};
                   
                   
   monkey[3][2] = {description:" Si estas aqui , !Eureka! ya tienes todo lo necesario para salir de la isla ,",
                   exits:["w"]};


   monkey[3][3] = {description:"Llegas a un comedor con una larga mesa en el centro , a tu alrededor ves esculturas y cuadros , la comida que esta encima de la mesa lleva mucho tiempo podrida.",
                   exits:["n"]};
                   
                   
  
  return monkey ;
}

function defineVerbs(){
    
    const verbMap = new Map();
    
    verbMap.set("coger", true);
    verbMap.set("mirar" ,true);
    verbMap.set("ir", {do:movePlayer});
    verbMap.set("usar", true);
    verbMap.set("hablar" , true);

    return verbMap;
    function movePlayer(direction){
        const validDirections = ["n","s","w","e"];
            if (!validDirections.includes(direction) ){
                return appendToOutput("Esa dirección no es idonea")
            }else{ 
                moveValidation(direction)
                  
            } 
    }  

}

function verbValidation(){
    let command = document.getElementById("commands").value;
    let firstWord = command.toLowerCase().split(" ");
    let action = firstWord[0];
    let itemOrDirections = firstWord[1]; 
    
    if (verb.has(action)){
       verb.get(action).do(itemOrDirections);
       console.log("estamos aqui")
    } else {
        console.log("error");
    }
    
} 
    
function moveValidation(command){
            
    if(currentPosition.exits.includes(command)){
        if(command == "n"){
            player.position[0]--
            currentPosition = monkeymap[player.position[0]][player.position[1]]
            showDescription();  
            return 
        }
        if(command == "s"){
            player.position[0]++
            currentPosition = monkeymap[player.position[0]][player.position[1]]
            showDescription();  
            return
        }
        if(command == "w"){
            player.position[1]--
            currentPosition = monkeymap[player.position[0]][player.position[1]]
            showDescription();  
            return
        }
        if(command == "e"){
            player.position[1]++
            currentPosition = monkeymap[player.position[0]][player.position[1]]
            showDescription();  
            return
        } 
        //showDescription();     
    }
     
}
function showDescription(){
    appendToOutput(currentPosition.description);

}
function appendToOutput(text){
    const newElement = document.createElement("p");
    const newText = document.createTextNode(text);
    newElement.appendChild(newText);
    screen.appendChild(newElement);

}
