export interface ITelemetryTarget {
    attributeString: string;
    tagName: string;
    type: string;
}

export class TelemetryTargetTypes {
    public static document: string = 'document';
    public static element: string = 'element';
    public static window: string = 'window';
    public static unknown: string = 'unknown';
}
