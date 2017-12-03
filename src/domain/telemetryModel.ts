import { ITelemetryTarget, TelemetryTargetTypes } from "./itelemetryTarget";

export default class TelemetryModel {
    public readonly page: string;
    public readonly target: ITelemetryTarget;
    public readonly type: string;
    public readonly originalEvent: Event;

    constructor(event: Event) {
        this.originalEvent = event;
        this.page = window.location.href;
        this.type = event.type;
        this.target = this.getTarget();
    }

    private getTarget(): ITelemetryTarget {
        const elementTarget = this.originalEvent.target as Element;
        if (elementTarget) {
            const target: ITelemetryTarget = {
                type: TelemetryTargetTypes.element,
                tagName: elementTarget.tagName,
                attributeString: this.getAttributeString(elementTarget.attributes)
            }
            return target;
        }

        const windowTarget = this.originalEvent.target as Window;
        if (windowTarget) {
            const target: ITelemetryTarget = {
                type: TelemetryTargetTypes.window,
                tagName: "window",
                attributeString: "",
            }
            return target;
        }

        const documentTarget = this.originalEvent.target as Document;
        if (documentTarget) {
            const target: ITelemetryTarget = {
                type: TelemetryTargetTypes.document,
                tagName: "document",
                attributeString: "",
            }
            return target;
        }

        return {
            type: TelemetryTargetTypes.unknown,
            tagName: "",
            attributeString: ""
        } as ITelemetryTarget
    }

    private getAttributeString(attributes: NamedNodeMap): string {
        let stringify: string[] = [];
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes.item(i);
            stringify.push(attr.nodeName + ": " + attr.nodeValue);
        }
        return stringify.join(",");
    }
}
