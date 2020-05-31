export interface IAnalysisResult {
    analysisResultId: number;
    url: string;
    accuracyScore: number
    confusionMatrix: string
    userId: number;
    user: object
}

export class AnalysisResult implements IAnalysisResult {
    analysisResultId: number;
    url: string;
    accuracyScore: number
    confusionMatrix: string
    userId: number;
    user: object

    constructor() {
        this.analysisResultId = 0;
        this.url = "";
        this.accuracyScore = 0;
        this.confusionMatrix = "";
        this.userId = 0;
        this.user = {};
    }
}