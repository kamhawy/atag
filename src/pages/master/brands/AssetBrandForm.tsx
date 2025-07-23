import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import { useToast } from '@/hooks/useToast';
import { sampleBrands } from '@/data/sampleData';
import './AssetBrandForm.css';
import { Toast } from 'primereact/toast';
import { BrandFormData } from '@/types/models';

interface AssetBrandFormProps {
  brandId: string;
  mode?: 'add' | 'edit';
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetBrandForm: React.FC<AssetBrandFormProps> = ({ brandId, mode, toastRef }) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<BrandFormData>({
    id: '',
    name: '',
    code: '',
    description: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = brandId !== 'new';
  const isAddMode = mode === 'add' || brandId === 'new';

  useEffect(() => {
    if (isEditMode && brandId) {
      // Load existing brand data
      const existingBrand = sampleBrands.find((brand) => brand.id === brandId);
      if (existingBrand) {
        setFormData({
          id: existingBrand.id,
          name: existingBrand.name,
          code: existingBrand.code,
          description: existingBrand.description,
          website: existingBrand.website,
          contactEmail: existingBrand.contactEmail,
          contactPhone: existingBrand.contactPhone,
          isActive: existingBrand.isActive
        });
      }
    }
  }, [brandId, isEditMode]);

  const handleInputChange = (field: keyof BrandFormData, value: unknown) => {
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isEditMode) {
        showSuccess('Brand updated successfully');
      } else {
        showSuccess('Brand created successfully');
      }

      navigate({ to: '/master/brands' });
    } catch {
      showError('Failed to save brand');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/master/brands' });
  };

  return (
    <div className="asset-brand-form">
      <Card>
        <div className="form-header">
          <h2>{isAddMode ? 'Add Brand' : 'Edit Brand'}</h2>
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

        <form onSubmit={handleSubmit} className="brand-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Brand Name *</label>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter brand name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="code">Brand Code *</label>
              <InputText
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Enter brand code"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="website">Website</label>
              <InputText
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="Enter website URL"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contactEmail">Contact Email</label>
              <InputText
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="Enter contact email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contactPhone">Contact Phone</label>
              <InputText
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="Enter contact phone"
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter brand description"
                rows={4}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
