import {expect, test} from '@playwright/test';
import { faker} from '@faker-js/faker';
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import TodoApi from '../APIs/TodoApi';
import AddTodoApi from '../APIs/TodoApi';
import NewTodoPage from '../pages/NewTodoPage';
import TodoPage from '../pages/TodoPage';

test("should be able to add todo item",async({page,request,context})=>{
   //Creat a User
    const password = faker.internet.password();
    const user = new User();


    //Registeration  using API

const registerPage = new RegisterPage(page,request,context);
await registerPage.RegisterUsingApi(user);
//add new todo item using UI steps
    const newTodoPage = new NewTodoPage(page);
    await newTodoPage.load();
    await newTodoPage.addTask("homework");
//assertion
const todopage = new TodoPage(page);
const todotext = await  todopage.getTodotextByIndex(0); 
await expect(todotext).toEqual("homework");
});




test("should be able to delete to do item from list",async({page,context,request})=>{
    const password = faker.internet.password();
    const user = new User();

      //registration using APi
        const registerPage = new RegisterPage(page,request,context);
        await registerPage.RegisterUsingApi(user);

    // add todo Using the API
    
    const newtodopage = new NewTodoPage(page,request);
    await newtodopage.addNewTaskUsingApi(user);

    const todopage = new TodoPage(page);
    await todopage.load();

    await todopage.deleteTaskByIndex(0);
    const noTodosmessage = todopage.getNOTodoMessage();
    await expect(noTodosmessage).toBeVisible();
})