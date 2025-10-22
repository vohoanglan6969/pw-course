import {test} from "./fixtures/fixtures-execution"

    test.beforeAll('', async() => {
        console.log('Before all');
    })

    test.afterAll('', async() => {
        console.log('After all');
    })

    test.beforeEach('', async() => {
        console.log('Before each');
    })

    test.afterEach('', async() => {
        console.log('After each');
    })

    test('First test', async({page}) => {

    })

    test('Second test', async({loggedInPage}) => {

    })