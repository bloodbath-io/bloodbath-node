declare class httpAdapter {
    apiKey: string;
    constructor(apiKey: string);
    get(endPath: string): Promise<unknown>;
    post(endPath: string, params: object): Promise<unknown>;
    delete(endPath: string): Promise<unknown>;
    processHttp(endPath: string, method: string, params?: string | null): Promise<unknown>;
    options(endPath: string, method: string, params: string | null): {
        hostname: string;
        port: number;
        method: string;
        path: string;
        headers: {
            authorization: string;
        };
    };
}
export declare const instance: (apiKey: string) => httpAdapter;
export {};
