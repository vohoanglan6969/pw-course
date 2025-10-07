import { mergeTests } from "@playwright/test";
import {test as userTest} from "./user.fixture";
import {test as adminTest} from "./admin.fixture"

export const test = mergeTests(userTest, adminTest);

export { expect } from '@playwright/test';