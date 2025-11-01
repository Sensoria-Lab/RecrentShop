import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FiltersPanel from './FiltersPanel';
import type {
  SortOption,
  ColorFilterValue,
  SizeFilterValue,
  ClothingTypeFilterValue,
  CollectionFilterValue,
  CategoryFilter
} from '../types';

// Mock FilterSection component
jest.mock('./FilterSection', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid={`filter-section-${title}`}>
      <h3>{title}</h3>
    </div>
  ),
}));

describe('FiltersPanel', () => {
  const mockOnSortChange = jest.fn();
  const mockOnToggleFilter = jest.fn();
  const mockOnApplyFilters = jest.fn();
  const mockOnResetFilters = jest.fn();
  const mockHasPendingChanges = jest.fn();
  const mockGetFilterCounts = {
    getCountForFilter: jest.fn((filterType: string, value: string) => {
      if (filterType === 'collection' && value === 'Geoid') return 5;
      if (filterType === 'size' && value === 'L-pad') return 3;
      return 0;
    }),
  };

  const defaultProps = {
    sortBy: 'popularity' as SortOption,
    onSortChange: mockOnSortChange,
    categoryFilter: 'all' as 'all' | 'mousepads' | 'tshirt' | 'hoodie' | 'sleeve',
    pendingCollectionFilter: [] as CollectionFilterValue[],
    pendingSizeFilter: [] as SizeFilterValue[],
    pendingClothingTypeFilter: [] as ClothingTypeFilterValue[],
    priceRange: [0, 10000] as [number, number],
    onPriceRangeChange: jest.fn(),
    onToggleFilter: mockOnToggleFilter,
    onApplyFilters: mockOnApplyFilters,
    onResetFilters: mockOnResetFilters,
    hasPendingChanges: mockHasPendingChanges,
    getFilterCounts: mockGetFilterCounts,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockHasPendingChanges.mockReturnValue(false);
  });

  it('renders the filters panel with correct accessibility attributes', () => {
    render(<FiltersPanel {...defaultProps} />);

    const region = screen.getByRole('region', { name: /Панель фильтров товаров/ });
    expect(region).toBeInTheDocument();

    expect(screen.getByText('Фильтры')).toBeInTheDocument();
  });

  it('renders sort select with correct options', () => {
    render(<FiltersPanel {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('popularity');

    expect(screen.getByText('По популярности')).toBeInTheDocument();
    expect(screen.getByText('По рейтингу')).toBeInTheDocument();
    expect(screen.getByText('Цена: по возрастанию')).toBeInTheDocument();
    expect(screen.getByText('Цена: по убыванию')).toBeInTheDocument();
  });

  it('calls onSortChange when sort option is changed', async () => {
    const user = userEvent.setup();
    render(<FiltersPanel {...defaultProps} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'rating');

    expect(mockOnSortChange).toHaveBeenCalledWith('rating');
  });

  it('renders collection filter section', () => {
    render(<FiltersPanel {...defaultProps} />);

    expect(screen.getByTestId('filter-section-Коллекция')).toBeInTheDocument();
  });

  it('renders size filter section only for mousepads category', () => {
    const { rerender } = render(<FiltersPanel {...defaultProps} categoryFilter="all" />);

    expect(screen.getByTestId('filter-section-Размер')).toBeInTheDocument();

    rerender(<FiltersPanel {...defaultProps} categoryFilter="tshirt" />);

    expect(screen.queryByTestId('filter-section-Размер')).not.toBeInTheDocument();
  });

  it('renders clothing type filter section for clothing categories', () => {
    const { rerender } = render(<FiltersPanel {...defaultProps} categoryFilter="tshirt" />);

    expect(screen.getByTestId('filter-section-Тип одежды')).toBeInTheDocument();

    rerender(<FiltersPanel {...defaultProps} categoryFilter="mousepads" />);

    expect(screen.queryByTestId('filter-section-Тип одежды')).not.toBeInTheDocument();
  });

  it('renders price range input', () => {
    render(<FiltersPanel {...defaultProps} />);

    const priceLabel = screen.getByText(/Цена: 0 - 10000 р/);
    expect(priceLabel).toBeInTheDocument();

    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toHaveAttribute('min', '0');
    expect(rangeInput).toHaveAttribute('max', '10000');
  });

  it('shows apply filters button when there are pending changes', () => {
    mockHasPendingChanges.mockReturnValue(true);

    render(<FiltersPanel {...defaultProps} />);

    const applyButton = screen.getByRole('button', { name: /Применить фильтры/ });
    expect(applyButton).toBeInTheDocument();
  });

  it('hides apply filters button when there are no pending changes', () => {
    mockHasPendingChanges.mockReturnValue(false);

    render(<FiltersPanel {...defaultProps} />);

    const applyButton = screen.queryByRole('button', { name: /Применить фильтры/ });
    expect(applyButton).not.toBeInTheDocument();
  });

  it('renders reset filters button', () => {
    render(<FiltersPanel {...defaultProps} />);

    const resetButton = screen.getByRole('button', { name: /Сбросить всё/ });
    expect(resetButton).toBeInTheDocument();
  });

  it('calls onResetFilters when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<FiltersPanel {...defaultProps} />);

    const resetButton = screen.getByRole('button', { name: /Сбросить всё/ });
    await user.click(resetButton);

    expect(mockOnResetFilters).toHaveBeenCalledTimes(1);
  });

  it('calls onApplyFilters when apply button is clicked', async () => {
    mockHasPendingChanges.mockReturnValue(true);
    const user = userEvent.setup();
    render(<FiltersPanel {...defaultProps} />);

    const applyButton = screen.getByRole('button', { name: /Применить фильтры/ });
    await user.click(applyButton);

    expect(mockOnApplyFilters).toHaveBeenCalledTimes(1);
  });
});