import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { useToast } from '@/hooks/useToast';
import { sampleModels, sampleBrands, sampleAssetCategories } from '@/data/sampleData';
import './AssetModelForm.css';
import { Toast } from 'primereact/toast';
import { ModelFormData } from '@/types/models';

interface AssetModelFormProps {
  modelId: string;
  mode?: 'add' | 'edit';
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetModelForm: React.FC<AssetModelFormProps> = ({ modelId, mode, toastRef }) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<ModelFormData>({
    id: '',
    name: '',
    code: '',
    description: '',
    brandId: '',
    categoryId: '',
    year: null,
    specifications: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = modelId !== 'new';
  const isAddMode = mode === 'add' || modelId === 'new';

  useEffect(() => {
    if (isEditMode && modelId) {
      // Load existing model data
      const existingModel = sampleModels.find((model) => model.id === modelId);
      if (existingModel) {
        setFormData({
          id: existingModel.id,
          name: existingModel.name,
          code: existingModel.code,
          description: existingModel.description,
          brandId: existingModel.brandId,
          categoryId: existingModel.categoryId,
          year: existingModel.year,
          specifications: existingModel.specifications,
          isActive: existingModel.isActive
        });
      }
    }
  }, [modelId, isEditMode]);

  const handleInputChange = (field: keyof ModelFormData, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => {
        // Simulate network delay
        const delay = 1000;
        const start = Date.now();
        while (Date.now() - start < delay) {
          // Busy wait
        }
        resolve(undefined);
      });

      if (isEditMode) {
        showSuccess('Model updated successfully');
      } else {
        showSuccess('Model created successfully');
      }

      navigate({ to: '/master/models' });
    } catch {
      showError('Failed to save model');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/master/models' });
  };

  const brandOptions = sampleBrands.map((brand) => ({
    label: brand.name,
    value: brand.id
  }));

  const categoryOptions = sampleAssetCategories.map((category) => ({
    label: category.name,
    value: category.id
  }));

  return (
    <div className="asset-model-form">
      <Card>
        <div className="form-header">
          <h2>{isAddMode ? 'Add Model' : 'Edit Model'}</h2>
          <div className="form-actions">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={handleCancel}
            />
            <Button
              label={isAddMode ? 'Create' : 'Update'}
              icon="pi pi-check"
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="model-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Model Name *</label>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter model name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="code">Model Code *</label>
              <InputText
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Enter model code"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="brandId">Brand *</label>
              <Dropdown
                id="brandId"
                value={formData.brandId}
                options={brandOptions}
                onChange={(e) => handleInputChange('brandId', e.value)}
                placeholder="Select brand"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="categoryId">Category *</label>
              <Dropdown
                id="categoryId"
                value={formData.categoryId}
                options={categoryOptions}
                onChange={(e) => handleInputChange('categoryId', e.value)}
                placeholder="Select category"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="year">Year</label>
              <InputNumber
                id="year"
                value={formData.year}
                onValueChange={(e) => handleInputChange('year', e.value)}
                placeholder="Enter year"
                min={1900}
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="specifications">Specifications</label>
              <InputTextarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) => handleInputChange('specifications', e.target.value)}
                placeholder="Enter model specifications"
                rows={3}
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter model description"
                rows={4}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
