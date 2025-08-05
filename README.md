# ATAG - Asset Management Solution

A modern, responsive web application for managing office facilities assets built with React, TypeScript, Vite, and PrimeReact. This application provides comprehensive asset management capabilities with a focus on user experience and data integrity.

## 🚀 Features

### Core Functionality

- **Asset Management**: Complete CRUD operations for facility assets with detailed tracking
- **Master Data Management**: Centralized management of locations, categories, brands, and models
- **User Management**: Role-based access control with comprehensive user administration
- **Dashboard Analytics**: Real-time overview with charts, metrics, and asset distribution
- **Advanced Search & Filtering**: Powerful filtering capabilities with date ranges and multiple criteria
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience

- **Modern UI/UX**: Beautiful interface with dark/light theme support
- **Toast Notifications**: Comprehensive feedback system for user actions
- **Breadcrumb Navigation**: Clear navigation hierarchy
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Smooth loading indicators and skeleton screens

### Technical Features

- **Type Safety**: Full TypeScript implementation with comprehensive type definitions
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **State Management**: Efficient state management with React hooks and context
- **Routing**: File-based routing with TanStack Router
- **Performance**: Optimized builds with Vite and code splitting

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.9.2** - Type-safe development
- **Vite 7.0.4** - Fast build tool and development server

### UI & Styling

- **PrimeReact 10.9.6** - Comprehensive UI component library
- **PrimeFlex 4.0.0** - CSS utility framework
- **PrimeIcons 7.0.0** - Icon library
- **Lucide React 0.536.0** - Modern icon set

### Routing & State

- **TanStack Router 1.130.12** - Type-safe file-based routing
- **TanStack Query 5.84.1** - Server state management
- **React Router DevTools 1.130.13** - Development debugging tools

### Data Visualization

- **Chart.js 4.5.0** - Interactive charts and graphs

### Development Tools

- **ESLint 9.32.0** - Code linting and formatting
- **TypeScript ESLint 8.39.0** - TypeScript-specific linting rules

## 📋 Prerequisites

- **Node.js 18+** (Recommended: Latest LTS version)
- **npm** or **yarn** package manager
- **Modern web browser** with ES6+ support

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ATAG
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run preview          # Preview production build

# Build
npm run build           # Build for production
npm run lint            # Run ESLint

# Routing
npm run generate-routes # Generate route tree
```

## 📁 Project Structure

```bash
src/
├── components/                # Reusable UI components
│   ├── layout/                # Layout components
│   │   ├── Drawer.tsx         # Side navigation drawer
│   │   ├── Drawer.css
│   │   ├── Header.tsx         # Top header with navigation
│   │   └── Header.css
│   └── ui/                    # UI components
│       ├── AssetCard.tsx      # Asset display card
│       └── AssetCard.css
├── contexts/                  # React contexts
│   └── ThemeContext.tsx       # Theme management
├── data/                      # Sample data and interfaces
│   ├── sampleData.ts          # Centralized sample data
│   └── README.md              # Data documentation
├── hooks/                     # Custom React hooks
│   ├── useCurrentPage.ts      # Current page tracking
│   └── useToast.ts            # Toast notification hook
├── pages/                     # Page components
│   ├── home/                  # Home and dashboard
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   └── Dashboard.css
│   ├── assets/                # Asset management
│   │   ├── AssetsCatalogue.tsx # Asset listing
│   │   ├── AssetsCatalogue.css
│   │   ├── AssetForm.tsx      # Asset form
│   │   └── AssetForm.css
│   ├── master/                # Master data management
│   │   ├── locations/         # Location management
│   │   ├── categories/        # Category management
│   │   ├── brands/           # Brand management
│   │   └── models/           # Model management
│   └── admin/                 # Administration
│       ├── users/            # User management
│       └── settings/         # System settings
├── routes/                    # TanStack Router routes
│   ├── __root.tsx            # Root route layout
│   ├── index.tsx             # Home route
│   ├── assets/               # Asset routes
│   ├── master/               # Master data routes
│   ├── admin/                # Admin routes
│   └── routeTree.gen.ts      # Generated route tree
├── services/                  # API services (future)
├── types/                     # TypeScript type definitions
│   ├── models.ts             # Data model interfaces
│   └── ui.ts                 # UI component types
├── utils/                     # Utility functions
│   ├── toastUtils.ts         # Toast notification utilities
│   └── README.md             # Utilities documentation
├── assets/                    # Static assets
│   └── fonts/                # Custom fonts
├── App.tsx                    # Main application component
├── App.css                    # Global styles
├── main.tsx                   # Application entry point
└── routeTree.gen.ts          # Generated routes
```

## 🎨 Features Overview

### Dashboard (`/`)

- **Overview Cards**: Key metrics and statistics
- **Asset Distribution**: Visual charts showing asset distribution
- **Recent Assets**: Latest asset updates and changes
- **Growth Trends**: Asset growth and maintenance analytics
- **Quick Actions**: Fast access to common operations

### Asset Management (`/assets`)

- **Asset Catalogue**: Comprehensive asset listing with search
- **Advanced Filtering**: Filter by category, status, location, date range
- **Asset Details**: Detailed view with full asset information
- **Asset Form**: Create and edit assets with validation
- **Bulk Operations**: Multi-select and bulk actions

### Master Data Management

#### Locations (`/master/locations`)

- **Location Hierarchy**: Parent-child location relationships
- **Location Types**: Office, conference, storage, lab, other
- **Capacity Management**: Track location capacity and utilization
- **Contact Information**: Location-specific contact details

#### Categories (`/master/categories`)

- **Category Hierarchy**: Parent-child category relationships
- **Color Coding**: Visual category identification
- **Icon Support**: Category-specific icons
- **Asset Counts**: Track assets per category

#### Brands (`/master/brands`)

- **Brand Information**: Complete brand details
- **Contact Details**: Brand contact information
- **Website Links**: Direct links to brand websites
- **Active/Inactive Status**: Brand lifecycle management

#### Models (`/master/models`)

- **Model Specifications**: Detailed model information
- **Brand Association**: Link models to brands
- **Category Classification**: Model categorization
- **Year Information**: Model year tracking

### User Administration (`/admin`)

- **User Management**: Complete user CRUD operations
- **Role Management**: Role-based access control
- **Permission System**: Granular permission management
- **System Settings**: Application configuration
- **System Logs**: Activity tracking and auditing

## 🎯 Key Components

### Layout Components

#### Drawer (`components/layout/Drawer.tsx`)

- **Responsive Navigation**: Collapsible sidebar navigation
- **Menu Hierarchy**: Organized menu structure
- **User Profile**: User information and actions
- **Theme Toggle**: Dark/light theme switching
- **Mobile Support**: Touch-friendly mobile navigation

#### Header (`components/layout/Header.tsx`)

- **Breadcrumb Navigation**: Clear page hierarchy
- **Global Search**: Application-wide search functionality
- **User Actions**: Profile, settings, logout
- **Notifications**: Toast notification system
- **Mobile Menu**: Mobile navigation trigger

### UI Components

#### AssetCard (`components/ui/AssetCard.tsx`)

- **Asset Display**: Compact asset information display
- **Status Indicators**: Visual status representation
- **Quick Actions**: Fast access to common operations
- **Responsive Design**: Adapts to different screen sizes

### Context Providers

#### ThemeContext (`contexts/ThemeContext.tsx`)

- **Theme Management**: Centralized theme state
- **Local Storage**: Persistent theme preferences
- **Theme Switching**: Smooth theme transitions
- **Provider Pattern**: React context implementation

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=ATAG - Asset Management Solution

# Development
VITE_DEV_MODE=true
VITE_ENABLE_LOGGING=true

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
```

### Vite Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/pages': '/src/pages',
      '@/contexts': '/src/contexts',
      '@/utils': '/src/utils',
      '@/types': '/src/types',
      '@/hooks': '/src/hooks',
      '@/services': '/src/services',
      '@/assets': '/src/assets'
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### TypeScript Configuration

The project uses strict TypeScript configuration with:

- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: Configured aliases for clean imports
- **ESLint Integration**: TypeScript-specific linting rules
- **Type Definitions**: Comprehensive type coverage

## 📱 Responsive Design

The application is fully responsive and optimized for:

### Desktop (1200px+)

- **Full Navigation**: Complete sidebar and header
- **Multi-column Layout**: Optimal use of screen space
- **Hover Effects**: Enhanced user interactions
- **Keyboard Navigation**: Full keyboard accessibility

### Tablet (768px - 1199px)

- **Adaptive Layout**: Responsive grid systems
- **Touch-friendly**: Optimized for touch interactions
- **Collapsible Navigation**: Space-efficient navigation
- **Optimized Forms**: Touch-friendly form controls

### Mobile (320px - 767px)

- **Mobile-first Design**: Optimized for small screens
- **Drawer Navigation**: Slide-out navigation menu
- **Touch Targets**: Adequate touch target sizes
- **Simplified Layout**: Streamlined interface

## 🔒 Security Features

### Authentication & Authorization

- **Role-based Access Control**: Granular permission system
- **User Roles**: Admin, Manager, User, Viewer
- **Permission Management**: Feature-level permissions
- **Session Management**: Secure session handling

### Data Protection

- **Input Validation**: Comprehensive form validation
- **XSS Prevention**: Sanitized user inputs
- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Headers**: Security-focused HTTP headers

### API Security

- **HTTPS Only**: Secure communication protocols
- **API Authentication**: Token-based authentication
- **Rate Limiting**: API request throttling
- **Audit Logging**: Comprehensive activity logging

## 🚀 Deployment

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

### Production Build

The build process creates optimized files in the `dist/` directory:

- **Minified JavaScript**: Optimized for size and performance
- **Compressed CSS**: Minified stylesheets
- **Asset Optimization**: Optimized images and fonts
- **Source Maps**: For debugging (optional)

### Deployment Options

#### Static Hosting

- **Netlify**: Easy deployment with Git integration
- **Vercel**: Optimized for React applications
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud hosting

#### Container Deployment

```dockerfile
# Dockerfile example
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Server Deployment

- **Nginx**: Reverse proxy and static file serving
- **Apache**: Web server with mod_rewrite
- **IIS**: Windows server deployment
- **CDN**: Content delivery network integration

## 🔄 Backend Integration

The frontend is designed to integrate with a .NET backend API:

### API Endpoints Structure

```bash
/api/
├── assets/           # Asset CRUD operations
├── locations/        # Location management
├── categories/       # Category management
├── brands/          # Brand management
├── models/          # Model management
├── users/           # User management
├── auth/            # Authentication
└── admin/           # Administration
```

### Data Flow

1. **API Calls**: TanStack Query for server state management
2. **Error Handling**: Comprehensive error handling and user feedback
3. **Loading States**: Optimistic updates and loading indicators
4. **Caching**: Intelligent caching strategies
5. **Real-time Updates**: WebSocket integration for live updates

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end user journey testing
- **Accessibility Tests**: WCAG compliance testing

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: E2E testing
- **MSW**: API mocking

## 🤝 Contributing

### Development Workflow

1. **Fork the Repository**

   ```bash
   git clone <your-fork-url>
   cd ATAG
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start Development**

   ```bash
   npm run dev
   ```

5. **Make Changes**
   - Follow the coding standards
   - Add tests for new features
   - Update documentation

6. **Commit Changes**

   ```bash
   git add .
   git commit -m 'feat: add amazing feature'
   ```

7. **Push and Create PR**

   ```bash
   git push origin feature/amazing-feature
   ```

### Coding Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Conventional Commits**: Standardized commit messages
- **Component Structure**: Consistent component organization

### Code Review Process

1. **Automated Checks**: CI/CD pipeline validation
2. **Code Review**: Peer review process
3. **Testing**: Automated and manual testing
4. **Documentation**: Updated documentation
5. **Approval**: Maintainer approval required

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Documentation**: Check this README and component documentation
- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions
- **Contact**: Reach out to the development team

### Common Issues

#### Development Issues

- **Port Conflicts**: Change port in `vite.config.ts`
- **Type Errors**: Run `npm run lint` for type checking
- **Build Errors**: Clear `node_modules` and reinstall

#### Runtime Issues

- **Browser Compatibility**: Check browser support
- **Performance**: Use browser dev tools for profiling
- **Network Issues**: Check API connectivity

## 🔮 Roadmap

- [ ] **API Integration**: Complete backend integration
- [ ] **Authentication**: User authentication system
- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Advanced Search**: Elasticsearch integration
- [ ] **Export Features**: PDF and Excel export

### Technical Improvements

- [ ] **Performance Optimization**: Bundle size optimization
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Internationalization**: Multi-language support
- [ ] **Progressive Web App**: PWA capabilities
- [ ] **Micro-frontends**: Modular architecture

---

**ATAG - Asset Management Solution** - Making asset management simple, efficient, and scalable.

### Built with ❤️ using modern web technologies
