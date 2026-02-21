export interface Position {
    id: number,
    title: string,
}

export interface PositionItemProps extends Omit<Position, "id"> {
    uuid: string,
    jobId: number,
    candidateId: string,
    applicationId: string,
}