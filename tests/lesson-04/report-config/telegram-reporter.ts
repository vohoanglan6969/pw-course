import {IReporter } from "./reporter";

 class TelegramReporter implements IReporter {
    readonly telegramToken = process.env.TELEGRAM_TOKEN!;
    readonly telegramChatId = process.env.TELEGRAM_CHAT_ID!;
    readonly memberIds: string[] = ["bensamac"];

    async sendMessage(content: string[]){
        if(!this.telegramToken){
            console.error('Missing telegram token!');
            return;
        }

        if(!this.telegramChatId){
            console.error('Missing telegram chat id!');
            return;
        }

        if(!content || content.length === 0){
            console.error('No content for message!');
            return;
        }

        const mentions = this.memberIds.map(id => `@${id}`).join(' ');
        const webhookTelegram = `https://api.telegram.org/bot${this.telegramToken}/sendMessage`;
        try {
            await fetch(webhookTelegram, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: this.telegramChatId,
                text:`Please check my report ${mentions} \n\n ${content.join('\n')}`,
                parse_mode: "Markdown"
            })
        })
        } catch (error) {
            console.error('Error sending message to Telegram!');
        }  
    }
}

export default TelegramReporter;