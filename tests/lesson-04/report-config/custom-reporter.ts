import type {
  FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';
import DiscordReporter from './discord-reporter';
import SlackReporter from './slack-reporter';
import TelegramReporter from './telegram-reporter';
import { IReporter } from './reporter';

 class CustomReport implements Reporter {

    totalTest: number = 0; 
    totalPassed: number = 0;
    totalFailed: number = 0;
    totalSkipped: number = 0;
    totalTimeOut: number = 0;
    totalInterrupt: number = 0;

    passedCase: string[] = [];
    failedCase: string[] = [];
    skippedCase: string[] = [];
    timeOutCase: string[] = [];
    interruptCase: string[] = [];

    reporters: IReporter[] = [];
    content: string[] = []; 

    constructor() {
    const channels = process.env.REPORT_CHANNELS?.split(",").map(c => c.trim().toLowerCase()) || [];
    if (channels.includes("slack")) this.reporters.push(new SlackReporter());
    if (channels.includes("discord")) this.reporters.push(new DiscordReporter());
    if (channels.includes("telegram")) this.reporters.push(new TelegramReporter());
    }

    async onBegin(config: FullConfig, suite: Suite): Promise<void> {
        this.totalTest = suite.allTests().length;
    }

    onTestBegin(test: TestCase, result: TestResult): void {
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        switch (result.status) {
            case "passed":
                this.totalPassed++;
                this.passedCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "failed":
                this.totalFailed++;
                this.failedCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "timedOut":
                this.totalTimeOut++;
                this.timeOutCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "skipped":
                this.totalSkipped++;
                this.skippedCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            case "interrupted":
                this.totalInterrupt++;
                this.interruptCase.push(`${test.title} (${result.duration / 1000})`);
                break;
            default:
                throw new Error('Status invalid!');
        }
    }

    async onEnd(result: FullResult): Promise<void | { status?: FullResult["status"] } | undefined> {
        const reportingTime = new Date(Date.now()).toLocaleString();
        this.content.push(`Reporting time: ${reportingTime}`);
        this.content.push(`- Total tests: ${this.totalTest}`);
        this.content.push(`- Passed tests ${this.totalPassed}/${this.totalTest} (${((this.totalPassed / this.totalTest) * 100).toFixed(2)} %)`);
        this.content.push(`- Failed tests ${this.totalFailed}/${this.totalTest} (${((this.totalFailed / this.totalTest) * 100).toFixed(2)} %)`);
        for (let i = 0; i < this.failedCase.length; i++) {
            this.content.push(`   - ${this.failedCase[i]}`);
        }

        this.content.push(`- Timeout tests: ${this.totalTimeOut}/${this.totalTest} (${((this.totalTimeOut / this.totalTest) * 100).toFixed(2)} %)`);
        for (let i = 0; i < this.timeOutCase.length; i++) {
            this.content.push(`   - ${this.timeOutCase[i]}`);
        }

        for (const reporter of this.reporters) {
        await reporter.sendMessage(this.content);
        }

    }
}

export default CustomReport;

