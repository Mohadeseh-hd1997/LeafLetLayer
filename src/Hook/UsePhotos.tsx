import axios from "axios";

export const UsePhotos = async () =>
  await axios
    .get("https://fakestoreapi.com/products")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return console.log(error);
    });


 export const sendData=()=>{
  fetch('https://fakestoreapi.com/users',{
    method:"POST",
    body:JSON.stringify(
        {
            email:'John@gmail.com',
            username:'johnd',
            password:'m38rmF$',
            name:{
                firstname:'John',
                lastname:'Doe'
            },
            address:{
                city:'kilcoole',
                street:'7835 new road',
                number:3,
                zipcode:'12926-3874',
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            phone:'1-570-236-7033'
        }
    )
})
    .then(res=>res.json())
    .then(json=>console.log(json))
 }
  