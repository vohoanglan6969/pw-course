import { IReporter } from "./reporter";

 class SlackReporter implements IReporter{
    readonly slackWebhook = process.env.SLACK_WEBHOOK!;
    readonly memberIds: string[] = ["U09LRD0QKFW", "U09N8RKFZ16"];
    
    async sendMessage(content: string[]){
        if(!this.slackWebhook){
            console.error('Missing slack webhook!');
            return;
        }

        if(!content || content.length === 0){
            console.error('No content for message!');
            return;
        }

        const mentions = this.memberIds.map(id => `<@${id}>`).join(' ');
        const bodySlack = {
            text: `Please check my report ${mentions}\n\n${content.join("\n")}`,
        };
        const bodyStrSlack = JSON.stringify(bodySlack);

        try {
            await fetch(this.slackWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyStrSlack
        });       
        } catch (error) {
            console.error('Error sending message to Slack!');
        }
    }
}

export default SlackReporter;

