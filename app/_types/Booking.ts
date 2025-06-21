export interface Booking {
  id: string;
  guest_id: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  total_price: number;
  num_guests: number;
  status: string;
  created_at: string;
  observation: string;
  cabins: {
    name: string;
    image: string;
    max_capacity: number;
  };
}
