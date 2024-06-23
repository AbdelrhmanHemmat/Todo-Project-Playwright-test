import {expect, test} from '@playwright/test';
import {faker} from '@faker-js/faker';
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';

test("should be able to register to the todo website",async({page})=>{
 
    const password = faker.internet.password();
const user = new User();

const registerpage = new RegisterPage(page);
await registerpage.load();
await registerpage.register(user);

const todopage =new TodoPage(page);
const WelcomeMessage = todopage.getWelcomeMessage();
   await expect (WelcomeMessage).toBeVisible();
})