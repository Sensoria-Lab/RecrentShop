import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../shared/PageContainer';
import { Product } from '../../types/product';
import { Pencil, Trash2, Plus, Save, X, LogOut, Eye } from 'lucide-react';
import { isAuthenticated, logout, getAuthToken, getCurrentUser } from '../../utils/auth';
import { API_CONFIG } from '../../config/constants';

/**
 * Admin Panel Page
 * Allows adding, editing, and deleting products with live preview
 */
const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = getCurrentUser();

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadProducts();
  }, [navigate]);

  // Load products from API
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Ошибка загрузки товаров');
      console.error('Load products error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Start editing a product
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({ ...product });
    setIsAdding(false);
  };

  // Start adding a new product
  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setFormData({
      id: newId,
      title: '',
      subtitle: '',
      price: '',
      priceNumeric: 0,
      color: 'black',
      category: 'mousepads',
      image: '',
      images: []
    });
  };

  // Save product (add or update)
  const handleSave = async () => {
    if (!formData.title || !formData.price) {
      alert('Заполните все обязательные поля');
      return;
    }

    try {
      const token = getAuthToken();
      const url = isAdding ? `${API_CONFIG.BASE_URL}/products` : `${API_CONFIG.BASE_URL}/products/${editingId}`;
      const method = isAdding ? 'POST' : 'PUT';

      console.log('Saving product:', formData);
      console.log('URL:', url);
      console.log('Method:', method);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Ошибка сохранения товара');
      }

      await loadProducts();
      setEditingId(null);
      setIsAdding(false);
      setFormData({});
      alert(isAdding ? 'Товар добавлен!' : 'Товар обновлен!');

    } catch (err: any) {
      alert(err.message || 'Ошибка сохранения');
      console.error('Save error:', err);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  // Delete product
  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }

    try {
      const token = getAuthToken();
      const response = await fetch(`${API_CONFIG.BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления товара');
      }

      await loadProducts();
      alert('Товар удален!');

    } catch (err: any) {
      alert(err.message || 'Ошибка удаления');
      console.error('Delete error:', err);
    }
  };

  // Update form field
  const updateField = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle price change with automatic " р." formatting
  const handlePriceChange = (value: string) => {
    // Extract only numbers
    const numeric = parseInt(value.replace(/\D/g, '')) || 0;

    // Format with spaces for thousands and add " р."
    const formatted = numeric > 0
      ? `${numeric.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} р.`
      : '';

    updateField('price', formatted);
    updateField('priceNumeric', numeric);
  };

  return (
    <PageContainer>
      <div className="min-h-screen text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                Админ-панель
              </h1>
              {currentUser && (
                <p className="text-gray-400 mt-2">Вы вошли как: {currentUser.username}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus size={20} />
                Добавить товар
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <LogOut size={20} />
                Выйти
              </button>
            </div>
          </div>

          {/* Loading & Error States */}
          {loading && !isAdding && !editingId && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4">Загрузка товаров...</p>
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && !isAdding && !editingId && (
            <div className="text-center py-12 border border-gray-800 rounded-lg bg-gray-900/30">
              <p className="text-gray-400 text-lg mb-4">База данных пуста</p>
              <p className="text-gray-500 text-sm">Нажмите "Добавить товар" чтобы создать первый товар</p>
            </div>
          )}

          {/* Add/Edit Form with Preview */}
          {(isAdding || editingId !== null) && (
            <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    {isAdding ? (
                      <>
                        <Plus size={24} className="text-green-500" />
                        Добавить товар
                      </>
                    ) : (
                      <>
                        <Pencil size={24} className="text-blue-500" />
                        Редактировать товар
                      </>
                    )}
                  </h2>

                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Название <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => updateField('title', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                        placeholder="Коврик для мыши"
                      />
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Подзаголовок
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => updateField('subtitle', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                        placeholder='"geoid-black"'
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Цена <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.price || ''}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                        placeholder="Введите цифры: 3000"
                      />
                      <p className="text-xs text-gray-500 mt-1">Просто введите число, " р." добавится автоматически</p>
                    </div>

                    {/* Category & Color */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Категория <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.category || 'mousepads'}
                          onChange={(e) => updateField('category', e.target.value as 'mousepads' | 'clothing')}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                        >
                          <option value="mousepads">Коврики</option>
                          <option value="clothing">Одежда</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Цвет
                        </label>
                        <select
                          value={formData.color || 'black'}
                          onChange={(e) => updateField('color', e.target.value)}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                        >
                          <option value="black">Черный</option>
                          <option value="white">Белый</option>
                          <option value="red">Красный</option>
                        </select>
                      </div>
                    </div>

                    {/* Conditional fields based on category */}
                    {formData.category === 'mousepads' && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Размер
                        </label>
                        <input
                          type="text"
                          value={formData.productSize || ''}
                          onChange={(e) => updateField('productSize', e.target.value)}
                          placeholder="L, XL, M"
                          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                        />
                      </div>
                    )}

                    {formData.category === 'clothing' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Цвет (описание)
                          </label>
                          <input
                            type="text"
                            value={formData.productColor || ''}
                            onChange={(e) => updateField('productColor', e.target.value)}
                            placeholder="Белый, Черный"
                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">
                            Тип одежды
                          </label>
                          <select
                            value={formData.clothingType || 'hoodie'}
                            onChange={(e) => updateField('clothingType', e.target.value as 'hoodie' | 'tshirt' | 'sleeve')}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                          >
                            <option value="hoodie">Худи</option>
                            <option value="tshirt">Футболка</option>
                            <option value="sleeve">Рукав</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        URL главного изображения
                      </label>
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => updateField('image', e.target.value)}
                        placeholder="/images/products/..."
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>

                    {/* Additional Images */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        URLs дополнительных изображений
                      </label>
                      <textarea
                        value={formData.images?.join(', ') || ''}
                        onChange={(e) => updateField('images', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="/images/products/..., /images/products/..."
                        rows={3}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Разделяйте URL запятыми</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                      >
                        <Save size={20} />
                        Сохранить
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X size={20} />
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Eye size={20} className="text-purple-500" />
                    Превью
                  </h3>

                  <div className="space-y-4">
                    {/* Product Image */}
                    {formData.image ? (
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                        <img
                          src={formData.image}
                          alt={formData.title || 'Preview'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EИзображение не найдено%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="aspect-square rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Нет изображения</p>
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">
                        {formData.title || 'Название товара'}
                      </h4>
                      {formData.subtitle && (
                        <p className="text-sm text-gray-400">{formData.subtitle}</p>
                      )}

                      {/* Price */}
                      <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                        {formData.price || '0 р.'}
                      </p>

                      {/* Category Badge */}
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">
                          {formData.category === 'mousepads' ? 'Коврики' : 'Одежда'}
                        </span>
                        {formData.productSize && (
                          <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">
                            {formData.productSize}
                          </span>
                        )}
                        {formData.clothingType && (
                          <span className="px-3 py-1 bg-gray-800 rounded-full text-xs capitalize">
                            {formData.clothingType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Table */}
          {!loading && products.length > 0 && (
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/50 backdrop-blur-sm">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Изображение</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Название</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Цена</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Категория</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-900/30 transition-colors">
                        <td className="px-6 py-4 text-sm">{product.id}</td>
                        <td className="px-6 py-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium">{product.title}</div>
                          <div className="text-sm text-gray-400">{product.subtitle}</div>
                        </td>
                        <td className="px-6 py-4 text-sm">{product.price}</td>
                        <td className="px-6 py-4 text-sm capitalize">{product.category}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                              title="Редактировать"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                              title="Удалить"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats */}
          {!loading && products.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-1">Всего товаров</div>
                <div className="text-3xl font-bold">{products.length}</div>
              </div>
              <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-1">Коврики</div>
                <div className="text-3xl font-bold">{products.filter(p => p.category === 'mousepads').length}</div>
              </div>
              <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-1">Одежда</div>
                <div className="text-3xl font-bold">{products.filter(p => p.category === 'clothing').length}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminPage;
