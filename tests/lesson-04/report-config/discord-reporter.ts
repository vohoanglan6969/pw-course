import { IReporter } from "./reporter";

class DiscordReporter implements IReporter {
    readonly discordWebhook = process.env.DISCORD_WEBHOOK!;
    readonly memberIds: string[] = ["674190736589062154","875078633209856040"];
    
    async sendMessage(content: string[]){
        if(!this.discordWebhook){
            console.error('Missing discord webhook!');
            return;
        }

        if(!content || content.length === 0){
            console.error('No content for message!');
            return;
        }

        const mentions = this.memberIds.map(id => `<@${id}>`).join(' ');
        const bodyDiscord = {
            "content": `Please check my report ${mentions}\n\n${content.join("\n")}`,
        }
        const bodyStrDiscord = JSON.stringify(bodyDiscord);

        try {
            await fetch(this.discordWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyStrDiscord
        });
        } catch (error) {
            console.error('Error sending message to Discord!');
        }
        
    }
}

export default DiscordReporter;

