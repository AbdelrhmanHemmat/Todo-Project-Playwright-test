import { faker } from "@faker-js/faker";

export default class User{


//variables
    private firstName: string ;
    private lastName : string ;
    private email    : string ; 
    private password : string ;
    private access_token :string ;

   
    
    
//constructor
    constructor(){
        const password = faker.internet.password();
        
        this.firstName =  faker.person.firstName();
        this.lastName =faker.person.lastName();
        this.password = password ;
        this.email = faker.internet.email();
    }


//Methods
getFirstName(){
    return this.firstName;
}
getLastName(){
    return this.lastName;
}
getPassword(){
    return this.password;
}
getEmail(){
    return this.email;
}
getAccessToken(){
return this.access_token;
}
setAccessToken(access_token:string){
    this.access_token = access_token;
}

}