import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Input, Button, Menu, Dropdown, Tooltip } from 'antd';
import { 
  SearchOutlined, 
  HomeOutlined, 
  BulbOutlined,
  StockOutlined,
  MenuOutlined,
  RocketOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const TopNav = () => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (searchSymbol.trim()) {
      navigate(`/stock/${searchSymbol.toUpperCase()}`);
      setSearchSymbol('');
    }
  };

  const navItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      tooltip: 'Home Dashboard'
    },
    {
      key: '/predict',
      icon: <BulbOutlined />,
      label: 'AI Predictor',
      tooltip: 'Stock Price Predictions'
    },
    {
      key: '/stock/AAPL',
      icon: <LineChartOutlined />,
      label: 'Analysis',
      tooltip: 'Stock Analysis'
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setMenuVisible(false);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={navItems.map(item => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        className: location.pathname === item.key ? 'ant-menu-item-selected' : ''
      }))}
    />
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl backdrop-blur-sm bg-opacity-95 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <RocketOutlined className="text-white text-lg" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  StockPredict<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">.AI</span>
                </span>
                <span className="text-xs text-gray-400">Intelligent Trading</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Tooltip title={item.tooltip} key={item.key}>
                  <Button
                    type="text"
                    icon={item.icon}
                    className={`h-10 px-4 rounded-lg transition-all duration-300 ${
                      location.pathname === item.key
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    onClick={() => navigate(item.key)}
                  >
                    <span className="ml-2 font-medium">{item.label}</span>
                  </Button>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block relative group">
              <Input
                placeholder="Search stocks (AAPL, TSLA, GOOGL)..."
                value={searchSymbol}
                onChange={(e) => setSearchSymbol(e.target.value)}
                onPressEnter={handleSearch}
                className="w-64 rounded-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                prefix={<SearchOutlined className="text-gray-400" />}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="text"
                  icon={<SearchOutlined className="text-blue-400" />}
                  onClick={handleSearch}
                  className="hover:bg-transparent"
                />
              </div>
            </div>

            {/* AI Predictor Button */}
            <Tooltip title="Try AI Predictor">
              <Button
                type="primary"
                icon={<BulbOutlined />}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 hidden md:inline-flex items-center"
                onClick={() => navigate('/predict')}
              >
                <span className="font-semibold">AI Predictor</span>
              </Button>
            </Tooltip>

            {/* Mobile Menu Button */}
            <Dropdown
              overlay={menu}
              trigger={['click']}
              visible={menuVisible}
              onVisibleChange={setMenuVisible}
              className="md:hidden"
            >
              <Button
                type="text"
                icon={<MenuOutlined className="text-gray-300 text-xl" />}
                className="hover:bg-gray-800"
              />
            </Dropdown>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-3 border-t border-gray-800">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for stocks..."
              value={searchSymbol}
              onChange={(e) => setSearchSymbol(e.target.value)}
              onPressEnter={handleSearch}
              className="flex-1 rounded-lg bg-gray-800 border-gray-700 text-white"
              prefix={<SearchOutlined className="text-gray-400" />}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none"
            >
              Go
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Indicator for Active Route */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 animate-pulse">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ 
            width: location.pathname === '/' ? '33%' :
                   location.pathname === '/predict' ? '66%' :
                   location.pathname.startsWith('/stock/') ? '100%' : '0%'
          }}
        />
      </div>
    </nav>
  );
};

export default TopNav;