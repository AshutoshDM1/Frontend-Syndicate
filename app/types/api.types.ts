export type APIResponse<T> = {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
};