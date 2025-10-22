import { test as base } from "@playwright/test";

type MyFixture = {
  autoMockServer: void;
  userCredentials: { username: string; password: string };
  loggedInPage: void;
  autoLogApi: void;
};

export const test = base.extend<MyFixture>({
  autoMockServer: [
    async ({}, use, workerInfo) => {
      console.log(`Starting mock server: ${workerInfo.workerIndex}`);
      await use();
      console.log(`Stop mock server: ${workerInfo.workerIndex}`);
    },
    { scope: "worker", auto: true },
  ],

  userCredentials: [
    async ({ browser }, use, workerInfo) => {
      console.log(`Creating user credentials: ${workerInfo.workerIndex}`);

      const credentials = {
        username: `admin-${workerInfo.workerIndex}`,
        password: `password-${workerInfo.workerIndex}`,
      };

      await use(credentials);
      console.log(`Deleting user credentials: ${workerInfo.workerIndex}`);
    },
    { scope: "worker" },
  ],

  loggedInPage: [
    async ({ userCredentials }, use, workerInfo) => {
      console.log(
        `Logging in as admin with username: ${userCredentials.username}`
      );
      await use();
      console.log(`Logging out for username: ${userCredentials.username}`);
    },
    { scope: "test" },
  ],

  autoLogApi: [
    async ({}, use, workerInfo) => {
      console.log(`Starting logging API: ${workerInfo.workerIndex}`);
      await use();
      console.log(`Stopping logging API: ${workerInfo.workerIndex}`);
    },
    { scope: "test", auto: true },
  ],
});
