import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategorySelector from './CategorySelector';
import type { CategoryFilter } from '../types';

describe('CategorySelector', () => {
  const mockOnCategoryChange = jest.fn();

  const defaultProps = {
    categoryFilter: 'all' as CategoryFilter,
    onCategoryChange: mockOnCategoryChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all category buttons', () => {
    render(<CategorySelector {...defaultProps} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByText('Все товары')).toBeInTheDocument();
    expect(screen.getByText('Коврики')).toBeInTheDocument();
    expect(screen.getByText('Футболки')).toBeInTheDocument();
    expect(screen.getByText('Худи')).toBeInTheDocument();
    expect(screen.getByText('Рукава')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<CategorySelector {...defaultProps} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Выбор категории товаров');

    const allButton = screen.getByRole('tab', { name: /Все товары/ });
    expect(allButton).toHaveAttribute('aria-selected', 'true');

    const mousepadsButton = screen.getByRole('tab', { name: /Коврики/ });
    expect(mousepadsButton).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onCategoryChange when a category is clicked', async () => {
    const user = userEvent.setup();
    render(<CategorySelector {...defaultProps} />);

    const mousepadsButton = screen.getByRole('tab', { name: /Коврики/ });
    await user.click(mousepadsButton);

    expect(mockOnCategoryChange).toHaveBeenCalledWith('mousepads');
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1);
  });

  it('updates selected state when categoryFilter changes', () => {
    const { rerender } = render(<CategorySelector {...defaultProps} />);

    expect(screen.getByRole('tab', { name: /Все товары/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /Коврики/ })).toHaveAttribute('aria-selected', 'false');

    rerender(<CategorySelector {...defaultProps} categoryFilter="mousepads" />);

    expect(screen.getByRole('tab', { name: /Все товары/ })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: /Коврики/ })).toHaveAttribute('aria-selected', 'true');
  });
});