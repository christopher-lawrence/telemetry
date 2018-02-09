import { IGlobalConfig } from '../domain/models/IGlobalConfig';

export class ConfigService {
    /** Settings */
    public webServer: string;

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public static initialize(configFilePath?: string): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService(configFilePath);
        }
        return ConfigService.instance;
    }

    private static instance: ConfigService;
    private constructor(configFilePath?: string) {
        this.webServer = process.env.__WEB_SERVER__ as string;
    }
}
