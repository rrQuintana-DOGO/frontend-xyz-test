import { Coords } from "./TripInterface";

interface User {
  name: string;

}

interface Place {
  name: string;
  coords: Coords;
}

interface TripLog {
  id: string;
  user: User;
  created_at: number;
  comments: string;
  place: Coords
}

interface TripLogResponse {
  data: TripLog[],
  meta: {
    total_records: number,
    current_page: number, 
    total_pages: number,
  }
}

export type { User, Place, TripLog, TripLogResponse }