export class CustomError_Class extends Error {
    response?: {
        data: any;
        status: number;
        headers: string;
    };
}
