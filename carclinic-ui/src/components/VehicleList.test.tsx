import { render, screen } from '@testing-library/react';
import VehicleList from './VehicleList';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: [], isLoading: false, isError: false, isSuccess: true }),
  useMutation: () => ({ mutate: vi.fn() }),
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));

describe('VehicleList', () => {
  it('renders Add Vehicle button', () => {
    render(<VehicleList />);
    expect(screen.getByText(/Add Vehicle/i)).toBeInTheDocument();
  });
});
