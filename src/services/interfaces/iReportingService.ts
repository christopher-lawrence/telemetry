import { IElementListener } from "../../common/interfaces/ielementListener";

export interface IReportingService {
    report: (event: Event) => void;
}
