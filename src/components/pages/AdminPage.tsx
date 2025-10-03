import React, { useState } from 'react';
import PageLayout from '../shared/PageLayout';
import { ALL_PRODUCTS } from '../../data/products';
import { Product } from '../../types/product';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

/**
 * Admin Panel Page
 * Allows adding, editing, and deleting products
 */
const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  // Start editing a product
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsAdding(false);
  };

  // Start adding a new product
  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      id: Math.max(...products.map(p => p.id)) + 1,
      title: '',
      subtitle: '',
      price: '',
      priceNumeric: 0,
      rating: 5,
      reviewCount: 0,
      color: 'black',
      category: 'mousepads',
      image: '',
      images: []
    });
  };

  // Save product (add or update)
  const handleSave = () => {
    if (!formData.title || !formData.price) {
      alert('Заполните все обязательные поля');
      return;
    }

    if (isAdding) {
      setProducts([...products, formData as Product]);
    } else {
      setProducts(products.map(p => p.id === editingId ? formData as Product : p));
    }

    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
  };

  // Delete product
  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Update form field
  const handleFieldChange = (field: keyof Product, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              Админ-панель
            </h1>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus size={20} />
              Добавить товар
            </button>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId !== null) && (
            <div className="mb-8 p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">
                {isAdding ? 'Добавить товар' : 'Редактировать товар'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название *</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Подзаголовок</label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Цена *</label>
                  <input
                    type="text"
                    value={formData.price || ''}
                    onChange={(e) => {
                      handleFieldChange('price', e.target.value);
                      handleFieldChange('priceNumeric', parseInt(e.target.value.replace(/\D/g, '')) || 0);
                    }}
                    placeholder="3 000 р."
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Категория *</label>
                  <select
                    value={formData.category || 'mousepads'}
                    onChange={(e) => handleFieldChange('category', e.target.value as 'mousepads' | 'clothing')}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  >
                    <option value="mousepads">Коврики</option>
                    <option value="clothing">Одежда</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Цвет</label>
                  <select
                    value={formData.color || 'black'}
                    onChange={(e) => handleFieldChange('color', e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  >
                    <option value="black">Черный</option>
                    <option value="white">Белый</option>
                    <option value="red">Красный</option>
                  </select>
                </div>

                {formData.category === 'mousepads' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Размер</label>
                    <input
                      type="text"
                      value={formData.productSize || ''}
                      onChange={(e) => handleFieldChange('productSize', e.target.value)}
                      placeholder="L, XL"
                      className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                    />
                  </div>
                )}

                {formData.category === 'clothing' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Цвет (описание)</label>
                      <input
                        type="text"
                        value={formData.productColor || ''}
                        onChange={(e) => handleFieldChange('productColor', e.target.value)}
                        placeholder="Белый, Черный"
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Тип одежды</label>
                      <select
                        value={formData.clothingType || 'hoodie'}
                        onChange={(e) => handleFieldChange('clothingType', e.target.value as 'hoodie' | 'tshirt' | 'sleeve')}
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                      >
                        <option value="hoodie">Худи</option>
                        <option value="tshirt">Футболка</option>
                        <option value="sleeve">Рукав</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Рейтинг (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating || 5}
                    onChange={(e) => handleFieldChange('rating', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Количество отзывов</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviewCount || 0}
                    onChange={(e) => handleFieldChange('reviewCount', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">URL главного изображения</label>
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => handleFieldChange('image', e.target.value)}
                    placeholder="/images/products/..."
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">URLs дополнительных изображений (через запятую)</label>
                  <textarea
                    value={formData.images?.join(', ') || ''}
                    onChange={(e) => handleFieldChange('images', e.target.value.split(',').map(s => s.trim()))}
                    placeholder="/images/products/..., /images/products/..."
                    rows={3}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:opacity-90 transition-opacity"
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
          )}

          {/* Products Table */}
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Рейтинг</th>
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
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">{product.title}</div>
                        <div className="text-sm text-gray-400">{product.subtitle}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">{product.price}</td>
                      <td className="px-6 py-4 text-sm capitalize">{product.category}</td>
                      <td className="px-6 py-4 text-sm">
                        {product.rating} ⭐ ({product.reviewCount})
                      </td>
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

          {/* Stats */}
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
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminPage;
