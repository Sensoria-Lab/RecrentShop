import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductGrid from './ProductGrid';
import type { Product } from '../types';

// Mock ProductCard component
jest.mock('./ProductCard', () => ({
  __esModule: true,
  default: (props: any) => {
    const handleClick = () => {
      if (props.onProductClick) {
        props.onProductClick({
          id: props.id,
          image: props.image,
          images: props.images,
          title: props.title,
          subtitle: props.subtitle,
          productSize: props.productSize,
          productColor: props.productColor,
          price: props.price,
          priceNumeric: props.priceNumeric,
          rating: props.rating,
          reviewCount: props.reviewCount,
          color: props.color,
          category: props.category,
          clothingType: props.clothingType,
          size: props.size
        });
      }
    };

    return (
      <div
        data-testid={`product-card-${props.id}`}
        onClick={handleClick}
      >
        <img src={props.image} alt={props.title} />
        <h3>{props.title}</h3>
        <p>{props.price}</p>
      </div>
    );
  },
}));

// Mock IntersectionObserver
window.IntersectionObserver = undefined as any;

describe('ProductGrid', () => {
  const mockOnProductClick = jest.fn();

  const mockProducts: Product[] = [
    {
      id: 1,
      image: '/images/product1.jpg',
      images: ['/images/product1.jpg'],
      title: 'Product 1',
      subtitle: 'Subtitle 1',
      productSize: 'L',
      productColor: 'Black',
      price: '1000 р.',
      priceNumeric: 1000,
      rating: 4.5,
      reviewCount: 10,
      color: 'black',
      category: 'mousepads',
      clothingType: undefined,
      collection: 'Geoid',
      addedDate: '2024-01-01',
    },
    {
      id: 2,
      image: '/images/product2.jpg',
      images: ['/images/product2.jpg'],
      title: 'Product 2',
      subtitle: 'Subtitle 2',
      productSize: 'XL',
      productColor: 'White',
      price: '2000 р.',
      priceNumeric: 2000,
      rating: 4.8,
      reviewCount: 15,
      color: 'white',
      category: 'clothing',
      clothingType: 'hoodie',
      collection: 'Pro Speed',
      addedDate: '2024-01-02',
    },
  ];

  const defaultProps = {
    products: mockProducts,
    loading: false,
    onProductClick: mockOnProductClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product grid with correct accessibility attributes', () => {
    render(<ProductGrid {...defaultProps} />);

    const grid = screen.getByRole('grid', { name: /Сетка товаров/ });
    expect(grid).toBeInTheDocument();
  });

  it('renders all products when not loading', () => {
    render(<ProductGrid {...defaultProps} />);

    expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
  });

  it('renders loading skeleton when loading is true', () => {
    render(<ProductGrid {...defaultProps} loading={true} />);

    const loadingRegion = screen.getByRole('region', { name: /Загрузка товаров/ });
    expect(loadingRegion).toBeInTheDocument();

    // Should render skeleton cards
    expect(screen.getAllByText('', { selector: '.skeleton-shimmer' })).toHaveLength(9);
  });

  it('renders empty state when no products found', () => {
    render(<ProductGrid {...defaultProps} products={[]} />);

    const emptyRegion = screen.getByRole('region', { name: /Результаты поиска товаров/ });
    expect(emptyRegion).toBeInTheDocument();

    expect(screen.getByText(/Товары не найдены/)).toBeInTheDocument();
  });

  it('shows load more button when there are more products to show', () => {
    const manyProducts: Product[] = Array.from({ length: 25 }, (_, i) => ({
      ...mockProducts[0],
      id: i + 1,
      title: `Product ${i + 1}`,
    }));

    render(<ProductGrid {...defaultProps} products={manyProducts} />);

    const loadMoreButton = screen.getByRole('button', { name: /Загрузить больше товаров/ });
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('loads more items when load more button is clicked', async () => {
    const user = userEvent.setup();
    const manyProducts: Product[] = Array.from({ length: 25 }, (_, i) => ({
      ...mockProducts[0],
      id: i + 1,
      title: `Product ${i + 1}`,
    }));

    render(<ProductGrid {...defaultProps} products={manyProducts} />);

    // Initially shows 12 items
    expect(screen.getByTestId('product-card-12')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-13')).not.toBeInTheDocument();

    const loadMoreButton = screen.getByRole('button', { name: /Загрузить больше товаров/ });
    await user.click(loadMoreButton);

    // After clicking, should show more items
    expect(screen.getByTestId('product-card-24')).toBeInTheDocument();
  });

  it('calls onProductClick when a product is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductGrid {...defaultProps} />);

    const productCard = screen.getByTestId('product-card-1');
    await user.click(productCard);

    expect(mockOnProductClick).toHaveBeenCalledWith({
      id: 1,
      image: '/images/product1.jpg',
      images: ['/images/product1.jpg'],
      title: 'Product 1',
      subtitle: 'Subtitle 1',
      productSize: 'L',
      productColor: 'Black',
      price: '1000 р.',
      priceNumeric: 1000,
      rating: 4.5,
      reviewCount: 10,
      color: 'black',
      category: 'mousepads',
      clothingType: undefined,
      size: 'medium'
    });
  });
});