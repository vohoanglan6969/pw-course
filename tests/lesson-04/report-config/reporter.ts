export interface IReporter {
    sendMessage(content: string[]): Promise<void>;
}