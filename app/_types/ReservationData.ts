export interface ReservationData {
    cabin_id: string;
    start_date: Date | undefined;
    end_date: Date | undefined;
    cabin_price: number;
    num_nights: number;
}