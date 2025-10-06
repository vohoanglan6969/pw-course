
export function getEnvironmentFileName(envName: string): string{
    if(envName === 'dev') return 'dev.json';
    if(envName === 'staging') return 'staging.json';
    if(envName === 'production') return 'production.json';
    throw new Error('Environment name invalid!');
}