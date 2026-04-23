export type VehicleResponse = {
  id: number;
  vin: string;
  make: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  lastServiceDate: string;
  nextServiceDate: string;
}

export type Vehicle = {
  vin: string;
  make: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  lastServiceDate: string;
  nextServiceDate: string;
}

export type VehicleEntry = {
  vehicle: Vehicle;
  url: string;
}
