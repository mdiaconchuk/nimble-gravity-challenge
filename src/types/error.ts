type ErrorType = string | null;

export interface ErrorState {
    candidate: ErrorType;
    positions: ErrorType;
}