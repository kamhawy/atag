import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { useToast } from '@/hooks/useToast';
import { sampleLocations } from '@/data/sampleData';
import './AssetLocationForm.css';
import { Toast } from 'primereact/toast';
import { LocationFormData } from '@/types/models';

interface AssetLocationFormProps {
  locationId: string;
  mode?: 'add' | 'edit';
  toastRef?: React.RefObject<Toast | null>;
}

export const AssetLocationForm: React.FC<AssetLocationFormProps> = ({ locationId, mode, toastRef }) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast(toastRef || { current: null });

  const [formData, setFormData] = useState<LocationFormData>({
    id: '',
    name: '',
    code: '',
    description: '',
    parentLocation: null,
    address: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = locationId !== 'new';
  const isAddMode = mode === 'add' || locationId === 'new';

  useEffect(() => {
    if (isEditMode && locationId) {
      // Load existing location data
      const existingLocation = sampleLocations.find((loc) => loc.id === locationId);
      if (existingLocation) {
        setFormData({
          id: existingLocation.id,
          name: existingLocation.name,
          code: existingLocation.code || '',
          description: existingLocation.description,
          parentLocation: existingLocation.parentLocation || null,
          address: existingLocation.address || '',
          contactPerson: existingLocation.contactPerson || '',
          contactEmail: existingLocation.contactEmail || '',
          contactPhone: existingLocation.contactPhone || '',
          isActive: existingLocation.isActive ?? true
        });
      }
    }
  }, [locationId, isEditMode]);

  const handleInputChange = (field: keyof LocationFormData, value: unknown) => {
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
        showSuccess('Location updated successfully');
      } else {
        showSuccess('Location created successfully');
      }

      navigate({ to: '/master/locations' });
    } catch {
      showError('Failed to save location');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: '/master/locations' });
  };

  const parentLocationOptions = sampleLocations
    .filter((loc) => loc.id !== locationId)
    .map((loc) => ({ label: loc.name, value: loc.id }));

  return (
    <div className="asset-location-form">
      <Card>
        <div className="form-header">
          <h2>{isAddMode ? 'Add Location' : 'Edit Location'}</h2>
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

        <form onSubmit={handleSubmit} className="location-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Location Name *</label>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter location name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="code">Location Code *</label>
              <InputText
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Enter location code"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="parentLocation">Parent Location</label>
              <Dropdown
                id="parentLocation"
                value={formData.parentLocation}
                options={parentLocationOptions}
                onChange={(e) => handleInputChange('parentLocation', e.value)}
                placeholder="Select parent location"
                showClear
              />
            </div>

            <div className="form-field">
              <label htmlFor="contactPerson">Contact Person</label>
              <InputText
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Enter contact person name"
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
              <label htmlFor="address">Address</label>
              <InputTextarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter full address"
                rows={3}
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter location description"
                rows={4}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
