 
 //Appel à la fonction générale
main()

//Déclaration de la fonction générale
function main(){
 
 
 //Appel à la fonction getQueryParam
 getQueryParam();

 //Déclaration de la fonction getQueryParam
 function getQueryParam() {
   //definition des query params pour manipuler les données de l'element au click
   const urlSearchParam = new URLSearchParams(window.location.search);
   const params = Object.fromEntries(urlSearchParam.entries());
   console.log(params);


   
          //appelle à la fonction getApiElement qui définie les query strings et recupere un teddy par son id avec le .id qui fait reference au parametre dans l'url
          getApiElement(params.id);


           //Déclaration de la fonction permettant l'appel à l'api pour l'afichage des données d'un teddy en particulier
            function getApiElement(id) {

                //appelle a l'api
                fetch(`http://localhost:5600/api/${id}`)

                //Gestion de la promesse envoyé par l'api
                .then((resp) => resp.json())

                .then((data) => {
                    //Affichage des éléments du Dom
                    console.log(data)

                    const box = document.getElementById('box')

                    
                    const domItemImg = document.createElement('img')
                    const domItemName = document.createElement('h1')

                    domItemImg.src = data.imageURL
                    domItemImg.classList.add('img')
                    domItemImg.width = 300 
                    domItemImg.height = 300
                    domItemImg.setAttribute('alt', 'Teddy\'s picture')


                    domItemName.textContent = data.name
                    domItemName.classList.add('name')


                    box.appendChild(domItemImg)
                    box.appendChild(domItemName)
                  
                });
            }
 }
}





