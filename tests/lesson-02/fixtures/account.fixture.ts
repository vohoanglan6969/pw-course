import {test as base, WorkerInfo} from "@playwright/test"

type MyFixture = {
    account: string;
}

export const test = base.extend<MyFixture>({
  account: [
    async ({}, use, workerInfo: WorkerInfo) => {
      const account = `customer-${workerInfo.workerIndex}`;
      await use(account);
    },
    // @ts-ignore
    { scope: "worker" },
  ],
});