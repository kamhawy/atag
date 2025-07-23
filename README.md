# FAM - Facilities Asset Management

A modern, responsive web application for managing office facilities assets built with React, TypeScript, Vite, and PrimeReact.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive interface with dark/light theme support
- **Asset Management**: Complete CRUD operations for facility assets
- **Advanced Search**: Powerful filtering and search capabilities
- **Dashboard**: Comprehensive overview with charts and analytics
- **Master Data Management**: Locations, categories, brands, and models
- **User Management**: Role-based access control
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: PrimeReact 11.0.0-alpha.1
- **Routing**: TanStack Router
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Styling**: CSS with PrimeFlex utilities

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fam
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```bash
src/
├── components/
│   └── layout/
│       ├── Sidebar.tsx          # Main navigation sidebar
│       ├── Sidebar.css
│       ├── Header.tsx           # Top header with breadcrumbs
│       └── Header.css
├── contexts/
│   └── ThemeContext.tsx         # Theme management
├── pages/
│   ├── Dashboard.tsx            # Main dashboard
│   ├── Dashboard.css
│   ├── AssetSearch.tsx          # Asset search and management
│   └── AssetSearch.css
├── App.tsx                      # Main app component
├── App.css                      # Global styles
├── main.tsx                     # Application entry point
└── routeTree.gen.ts             # Generated routes
```

## 🎨 Features Overview

### Dashboard

- Overview cards with key metrics
- Asset distribution charts
- Recent assets table
- Growth trend analysis

### Asset Search

- Advanced filtering by category, status, location
- Date range filtering
- Real-time search
- Export functionality
- Detailed asset view dialog

### Navigation

- Responsive sidebar with collapsible sections
- Breadcrumb navigation
- Global search
- Theme toggle (dark/light)

## 🎯 Key Components

### Sidebar

- Application logo and branding
- Hierarchical navigation menu
- User profile section
- Theme toggle

### Header

- Dynamic breadcrumbs
- Global search functionality
- Notification center
- User actions

### Asset Management

- Comprehensive asset listing
- Advanced filtering options
- Bulk operations
- Detailed asset information

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=FAM - Facilities Asset Management
```

### Theme Configuration

The application supports both light and dark themes. Theme preference is stored in localStorage and automatically applied.

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security

- Windows Domain Single Sign-On integration
- Role-based access control
- Secure API communication
- Input validation and sanitization

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Production

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🔄 Backend Integration

The frontend is designed to work with a .NET backend API that provides:

- Asset CRUD operations
- User authentication and authorization
- Master data management
- File upload/download
- Reporting and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

- [ ] Asset maintenance scheduling
- [ ] Barcode/QR code integration
- [ ] Mobile app companion
- [ ] Advanced reporting
- [ ] Integration with procurement systems
- [ ] Asset lifecycle tracking
- [ ] Maintenance history
- [ ] Cost tracking and budgeting

---

**FAM - Facilities Asset Management** - Making asset management simple and efficient. 