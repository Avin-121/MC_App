export interface Geofence {
  id: string;
  name: string;
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
  peopleCount: number;
  createdAt: Date;
}