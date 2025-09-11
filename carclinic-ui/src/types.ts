export type VehicleResponse = {
  vin: string;
  make: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  lastServiceDate: string;
  nextServiceDate: string;
  _links: {
    self: {
      href: string;
    },
    vehicle: {
      href: string;
    },
    owner: {
      href: string;
    }
  };
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
