import { ITelemetryTarget, TelemetryTargetTypes } from './itelemetryTarget';
import { IElementListener } from './ielementListener';

export default class TelemetryEventModel {
    public readonly page: string;
    public readonly target: ITelemetryTarget;
    public readonly type: string;
    public readonly originalEvent: Event;
    public readonly telemetryElement: IElementListener;

    constructor(event: Event, telemetryElement: IElementListener) {
        this.originalEvent = event;
        this.page = window.location.href;
        this.type = event.type;
        this.target = this.getTarget();
        this.telemetryElement = telemetryElement;
    }

    private getTarget(): ITelemetryTarget {
        const elementTarget = this.originalEvent.target as Element;
        if (elementTarget) {
            const target: ITelemetryTarget = {
                attributeString: this.getAttributeString(elementTarget.attributes),
                tagName: elementTarget.tagName,
                type: TelemetryTargetTypes.element,
            };
            return target;
        }

        const windowTarget = this.originalEvent.target as Window;
        if (windowTarget) {
            const target: ITelemetryTarget = {
                attributeString: '',
                tagName: 'window',
                type: TelemetryTargetTypes.window,
            };
            return target;
        }

        const documentTarget = this.originalEvent.target as Document;
        if (documentTarget) {
            const target: ITelemetryTarget = {
                attributeString: '',
                tagName: 'document',
                type: TelemetryTargetTypes.document,
            };
            return target;
        }

        return {
            attributeString: '',
            tagName: '',
            type: TelemetryTargetTypes.unknown,
        } as ITelemetryTarget;
    }

    private getAttributeString(attributes: NamedNodeMap): string {
        const stringify: string[] = [];
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes.item(i);
            stringify.push(`${attr.nodeName}: ${attr.value}`);
        }
        return stringify.join(',');
    }
}
