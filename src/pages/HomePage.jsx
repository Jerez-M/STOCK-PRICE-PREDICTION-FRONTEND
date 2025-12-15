import { useState, useEffect } from 'react';
import { Card, Row, Col, List, Tag, Button, Statistic, Tooltip, Select, Typography, Progress, Divider } from 'antd';
import { 
  LineChartOutlined, 
  FireOutlined, 
  RiseOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  DashboardOutlined,
  StockOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  BulbOutlined,
  RocketOutlined,
  DollarOutlined,
  CalendarOutlined,
  TeamOutlined,
  ShoppingFilled,
  BarChartOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  FundOutlined,
  TransactionOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie,
  Sector,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Candlestick Chart Component
const CandlestickChart = ({ data, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { open, high, low, close } = payload[0].payload;
      const change = close - open;
      const percentChange = ((change / open) * 100).toFixed(2);
      
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm p-4 rounded-xl border border-gray-700 shadow-2xl">
          <p className="font-bold text-white mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Open:</span>
              <span className="font-semibold text-white">${open}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Close:</span>
              <span className={`font-semibold ${close >= open ? 'text-green-400' : 'text-red-400'}`}>
                ${close}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">High:</span>
              <span className="font-semibold text-white">${high}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Low:</span>
              <span className="font-semibold text-white">${low}</span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-gray-700">
              <span className="text-gray-400">Change:</span>
              <span className={`font-bold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change >= 0 ? '+' : ''}${change.toFixed(2)} ({percentChange}%)
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
        <XAxis 
          dataKey="date" 
          axisLine={{ stroke: '#4B5563' }}
          tick={{ fill: '#9CA3AF' }}
          tickLine={{ stroke: '#4B5563' }}
        />
        <YAxis 
          axisLine={{ stroke: '#4B5563' }}
          tick={{ fill: '#9CA3AF' }}
          tickLine={{ stroke: '#4B5563' }}
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        <RechartsTooltip content={<CustomTooltip />} />
        
        {/* High-Low lines */}
        <ScatterChart>
          <Scatter
            data={data}
            fill="#8884d8"
            shape={(props) => {
              const { x, y, index } = props;
              const item = data[index];
              const xPos = x + 10; // Adjust for bar width
              const yHigh = y - ((item.high - item.close) / (item.high - item.low)) * 40;
              const yLow = y - ((item.low - item.close) / (item.high - item.low)) * 40 + 40;
              
              return (
                <line
                  x1={xPos}
                  y1={yHigh}
                  x2={xPos}
                  y2={yLow}
                  stroke={item.close >= item.open ? '#10b981' : '#ef4444'}
                  strokeWidth={2}
                />
              );
            }}
          />
        </ScatterChart>
        
        {/* Candlestick bodies */}
        <Bar
          dataKey={(data) => data.close - data.open}
          shape={(props) => {
            const { x, y, width, value, index } = props;
            const item = data[index];
            const isPositive = value >= 0;
            const height = Math.abs(value) * 10; // Scale for visualization
            
            return (
              <rect
                x={x}
                y={isPositive ? y - height : y}
                width={width}
                height={height}
                fill={isPositive ? '#10b981' : '#ef4444'}
                fillOpacity={0.8}
                rx={2}
                stroke={isPositive ? '#059669' : '#dc2626'}
                strokeWidth={1}
              />
            );
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const HomePage = () => {
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [timeframe, setTimeframe] = useState('1D');

  // Generate realistic candlestick data
  const generateCandlestickData = (days = 20) => {
    const data = [];
    let basePrice = 165;
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      const open = basePrice;
      const volatility = 1.5 + Math.random() * 3;
      const change = (Math.random() - 0.5) * volatility;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
      const volume = Math.floor(Math.random() * 5000000) + 3000000;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        open: parseFloat(open.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        volume: volume,
        change: parseFloat((close - open).toFixed(2)),
        changePercent: parseFloat(((close - open) / open * 100).toFixed(2)),
        color: close >= open ? '#10b981' : '#ef4444'
      });
      
      basePrice = close;
    }
    
    return data;
  };

  const candlestickData = generateCandlestickData(15);
  const recentCandlestickData = candlestickData.slice(-5);

  const newsItems = [
    {
      title: 'Tech Stocks Rally Amid AI Boom',
      source: 'Financial Times',
      time: '2 hours ago',
      sentiment: 'positive',
      symbol: 'NVDA',
      change: '+5.2%',
      color: '#10b981',
      trend: 'up'
    },
    {
      title: 'Federal Reserve Holds Interest Rates Steady',
      source: 'Bloomberg',
      time: '4 hours ago',
      sentiment: 'neutral',
      symbol: null,
      change: null,
      color: '#6b7280',
      trend: 'neutral'
    },
    {
      title: 'Apple Announces Record Quarterly Earnings',
      source: 'CNBC',
      time: '6 hours ago',
      sentiment: 'positive',
      symbol: 'AAPL',
      change: '+3.8%',
      color: '#10b981',
      trend: 'up'
    },
    {
      title: 'Energy Sector Faces Pressure Amid Oil Price Drop',
      source: 'Reuters',
      time: '8 hours ago',
      sentiment: 'negative',
      symbol: 'XOM',
      change: '-2.1%',
      color: '#ef4444',
      trend: 'down'
    },
  ];

  const marketIndices = [
    { 
      name: 'S&P 500', 
      value: '4,532.51', 
      change: '+0.82%', 
      color: 'green', 
      trend: 'up',
      symbol: 'SPX',
      points: '+37.15'
    },
    { 
      name: 'NASDAQ', 
      value: '14,122.28', 
      change: '+1.12%', 
      color: 'green', 
      trend: 'up',
      symbol: 'NDX',
      points: '+156.42'
    },
    { 
      name: 'DOW JONES', 
      value: '34,912.34', 
      change: '+0.45%', 
      color: 'green', 
      trend: 'up',
      symbol: 'DJI',
      points: '+157.23'
    },
    { 
      name: 'VIX', 
      value: '15.23', 
      change: '-2.34%', 
      color: 'red', 
      trend: 'down',
      symbol: 'VIX',
      points: '-0.37'
    },
  ];

  const topPerformers = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', change: '+5.8%', price: '465.23', trend: 'up', volume: '45.2M' },
    { symbol: 'AMD', name: 'Advanced Micro', change: '+4.2%', price: '112.45', trend: 'up', volume: '32.1M' },
    { symbol: 'TSLA', name: 'Tesla Inc', change: '+3.9%', price: '245.67', trend: 'up', volume: '28.5M' },
  ];

  const features = [
    {
      icon: <RocketOutlined />,
      title: 'AI Predictions',
      description: '92% accuracy with real-time ML models',
      gradient: 'from-purple-500 to-pink-500',
      link: '/predict',
      stats: '24.7% avg return'
    },
    {
      icon: <LineChartOutlined />,
      title: 'Live Charts',
      description: 'Interactive candlestick & technical charts',
      gradient: 'from-blue-500 to-cyan-500',
      link: '/stock/AAPL',
      stats: 'Real-time data'
    },
    {
      icon: <DatabaseOutlined />,
      title: 'Market Data',
      description: '5,000+ stocks with historical analysis',
      gradient: 'from-green-500 to-emerald-500',
      link: '/stocks',
      stats: '10+ years history'
    },
    {
      icon: <SafetyOutlined />,
      title: 'Risk Analysis',
      description: 'Intelligent portfolio protection',
      gradient: 'from-orange-500 to-red-500',
      link: '/risk',
      stats: '95% protection'
    },
  ];

  const onPieEnter = (_, index) => {
    setActivePieIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-purple-900/5">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-4 lg:py-8">
          <div className="text-center">
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-full text-blue-600 text-sm font-semibold backdrop-blur-sm">
              <FireOutlined className="mr-2" />
              AI-POWERED TRADING INTELLIGENCE
            </div>
            
            <Title level={1} className="!text-5xl lg:!text-7xl !font-bold !mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Smarter Trading
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </Title>
            
            <Paragraph className="!text-lg my-6 py-2 lg:!text-xl !text-gray-600 max-w-3xl mx-auto mb-10">
              Harness cutting-edge artificial intelligence for precise stock predictions, 
              real-time market analysis, and intelligent investment insights.
            </Paragraph>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                type="primary" 
                size="large"
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/predict'}
                icon={<ThunderboltOutlined />}
              >
                <span className="text-lg font-semibold">Try AI Predictor</span>
              </Button>
              
              <Button 
                size="large"
                className="h-14 px-8 rounded-xl border-2 border-blue-200 bg-white/80 backdrop-blur-sm hover:border-blue-300 hover:bg-white transition-all duration-300"
                onClick={() => window.location.href = '/stock/AAPL'}
                icon={<EyeOutlined />}
              >
                <span className="text-lg font-semibold">View Live Analysis</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mt-3 mx-auto px-4 pb-12">
        {/* Market Overview Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <TransactionOutlined className="text-2xl text-white" />
              </div>
              <div>
                <Title level={2} className="!mb-0 !text-gray-900">Market Overview</Title>
                <Text type="secondary">Real-time market insights and analytics</Text>
              </div>
            </div>
            
            <Select
              value={timeframe}
              onChange={setTimeframe}
              className="w-40"
              size="large"
              suffixIcon={<CalendarOutlined />}
            >
              <Option value="1D">Today</Option>
              <Option value="1W">This Week</Option>
              <Option value="1M">This Month</Option>
              <Option value="3M">3 Months</Option>
              <Option value="1Y">1 Year</Option>
            </Select>
          </div>

          {/* Market Indices Cards */}
          <Row gutter={[16, 16]} className="mb-8">
            {marketIndices.map((index, idx) => (
              <Col xs={24} sm={12} lg={6} key={idx}>
                <Card 
                  className={`rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full ${
                    index.color === 'green' 
                      ? 'bg-gradient-to-br from-green-50/80 to-emerald-50/60 border border-green-100' 
                      : 'bg-gradient-to-br from-red-50/80 to-pink-50/60 border border-red-100'
                  }`}
                  hoverable
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${index.color === 'green' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <Text strong className="text-gray-900">{index.name}</Text>
                    </div>
                    <Tag 
                      color={index.color === 'green' ? 'success' : 'error'} 
                      className="font-mono text-xs"
                    >
                      {index.symbol}
                    </Tag>
                  </div>
                  
                  <div className="mb-2">
                    <Text className="text-2xl lg:text-3xl font-bold text-gray-900">{index.value}</Text>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-lg font-bold ${index.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                        {index.change}
                      </div>
                      <Text type="secondary" className="text-sm">{index.points}</Text>
                    </div>
                    {index.trend === 'up' ? (
                      <ArrowUpOutlined className="text-green-500 text-xl" />
                    ) : (
                      <ArrowDownOutlined className="text-red-500 text-xl" />
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Main Chart Section - Balanced Layout */}
          <Row gutter={[24, 24]}>
            {/* Left Column - Main Candlestick Chart */}
            <Col xs={24} lg={16}>
              <Row gutter={[24, 24]}>
                {/* Main Candlestick Chart */}
                <Col span={24}>
                  <Card 
                    className="rounded-xl border-0 shadow-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white h-full my-4"
                    title={
                      <div className="flex items-center space-x-3">
                        <BarChartOutlined className="text-blue-600" />
                        <div>
                          <Title level={4} className="!mb-1">AAPL - Apple Inc. Candlestick Chart</Title>
                          <Text type="secondary">Last 15 trading days</Text>
                        </div>
                      </div>
                    }
                    extra={
                      <div className="flex items-center space-x-2">
                        <Tag color="blue" icon={<FireOutlined />}>Live</Tag>
                        <Button type="text" icon={<LineChartOutlined />} size="small">Compare</Button>
                      </div>
                    }
                  >
                    <div className="h-full">
                      <CandlestickChart data={candlestickData} height={400} />
                    </div>
                  </Card>
                </Col>
                
                {/* Quick Stats Row */}
                <Col span={24}>
                  <Row gutter={[16, 16]}>
                    {[
                      {
                        title: 'Current Price',
                        value: `$${candlestickData[candlestickData.length - 1].close}`,
                        change: `${candlestickData[candlestickData.length - 1].changePercent}%`,
                        isPositive: candlestickData[candlestickData.length - 1].change >= 0,
                        icon: <DollarOutlined />,
                        bgColor: 'from-green-50 to-emerald-50',
                        borderColor: 'border-green-100'
                      },
                      {
                        title: 'Daily Volume',
                        value: `${(candlestickData[candlestickData.length - 1].volume / 1000000).toFixed(1)}M`,
                        change: '+12.5%',
                        isPositive: true,
                        icon: <FundOutlined />,
                        bgColor: 'from-blue-50 to-cyan-50',
                        borderColor: 'border-blue-100'
                      },
                      {
                        title: 'Market Cap',
                        value: '$2.98T',
                        change: '+3.2%',
                        isPositive: true,
                        icon: <GlobalOutlined />,
                        bgColor: 'from-purple-50 to-pink-50',
                        borderColor: 'border-purple-100'
                      },
                      {
                        title: '52W High',
                        value: '$198.23',
                        change: '+15.7%',
                        isPositive: true,
                        icon: <RiseOutlined />,
                        bgColor: 'from-orange-50 to-red-50',
                        borderColor: 'border-orange-100'
                      },
                    ].map((stat, idx) => (
                      <Col xs={24} sm={12} lg={6} key={idx}>
                        <Card className={`rounded-xl border-0 shadow-lg bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} h-full`}>
                          <div className="flex items-start justify-between py-2">
                            <div>
                              <Text type="secondary" className="text-sm mb-1">{stat.title}</Text>
                              <Text strong className="text-2xl text-gray-900">{stat.value}</Text>
                            </div>
                            <div className={`p-2 rounded-lg ${stat.isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                              <div className={`${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.icon}
                              </div>
                            </div>
                          </div>
                          <div className={`mt-3 text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>

            {/* Right Column - Side Panels */}
            <Col xs={24} lg={8}>
              <Row gutter={[0, 24]} className="h-full">
                {/* Market Summary Card */}
                <Col span={24}>
                  <Card className="rounded-xl border-0 shadow-xl h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                    <Title level={4} className="!mb-6 flex items-center">
                      <DashboardOutlined className="mr-2 text-blue-600" />
                      Market Summary
                    </Title>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Text type="secondary">Bullish Sentiment</Text>
                          <Text strong className="text-green-600">78%</Text>
                        </div>
                        <Progress 
                          percent={78} 
                          strokeColor="#10b981" 
                          size="small" 
                          showInfo={false}
                          className="!mb-3"
                        />
                        
                        <div className="flex justify-between mb-1">
                          <Text type="secondary">Market Volatility</Text>
                          <Text strong className="text-orange-600">Medium</Text>
                        </div>
                        <Progress 
                          percent={45} 
                          strokeColor="#f59e0b" 
                          size="small" 
                          showInfo={false}
                          className="!mb-3"
                        />
                        
                        <div className="flex justify-between mb-1">
                          <Text type="secondary">Trading Volume</Text>
                          <Text strong className="text-blue-600">+12%</Text>
                        </div>
                        <Progress 
                          percent={65} 
                          strokeColor="#3b82f6" 
                          size="small" 
                          showInfo={false}
                        />
                      </div>
                      
                      <Divider className="my-3" />
                      
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <Text strong className="block text-green-600 text-lg">2,145</Text>
                          <Text type="secondary" className="text-xs">Advancers</Text>
                        </div>
                        <div>
                          <Text strong className="block text-red-600 text-lg">1,023</Text>
                          <Text type="secondary" className="text-xs">Decliners</Text>
                        </div>
                        <div>
                          <Text strong className="block text-gray-600 text-lg">312</Text>
                          <Text type="secondary" className="text-xs">Unchanged</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>

                {/* Top Movers Card */}
                <Col span={24} style={{height: "335px"}}>
                  <Card className="rounded-xl border-0 shadow-xl h-full">
                    <div className="flex items-center justify-between mb-0">
                      <div className="flex items-center space-x-3">
                        <div className="p-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow">
                          <TrophyOutlined className="text-xl text-white" />
                        </div>
                        <div>
                          <Title level={4} className="!mb-1">Top Movers Today</Title>
                          <Text type="secondary" className="text-xs">Real-time updates</Text>
                        </div>
                      </div>
                      <Tag color="blue">Live</Tag>
                    </div>
                    
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {topPerformers.map((stock, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group border border-gray-100"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              stock.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <Text strong className={stock.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                                {stock.symbol.charAt(0)}
                              </Text>
                            </div>
                            <div>
                              <Text strong className="text-gray-900">{stock.symbol}</Text>
                              <Text type="secondary" className="text-xs">{stock.name}</Text>
                            </div>
                          </div>
                          <div className="text-right">
                            <Text strong className="text-gray-900">${stock.price}</Text>
                            <div className={`flex items-center justify-end space-x-1 ${stock.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                              {stock.trend === 'up' ? (
                                <ArrowUpOutlined className="text-xs" />
                              ) : (
                                <ArrowDownOutlined className="text-xs" />
                              )}
                              <Text strong className="text-sm">{stock.change}</Text>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-2 pt-1 border-t border-gray-100">
                      <Button type="link" size="small" className="w-full text-blue-600 hover:text-blue-700">
                        View All Top Performers →
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* Features Section */}
        <div className="my-12">
          <div className="text-center mb-10">
            <Title level={2} className="!mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Why Choose StockPredict.AI?
              </span>
            </Title>
            <Text type="secondary" className="text-lg max-w-2xl mx-auto">
              Cutting-edge technology designed for modern traders and investors
            </Text>
          </div>
          
          <Row gutter={[24, 24]}>
            {features.map((feature, idx) => (
              <Col xs={24} sm={12} lg={6} key={idx}>
                <Link to={feature.link}>
                  <Card
                    className={`rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 h-full backdrop-blur-sm bg-white/80`}
                    hoverable
                    bodyStyle={{ padding: '24px' }}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <div className="text-2xl text-white">{feature.icon}</div>
                    </div>
                    <Title level={4} className="!mb-3 text-gray-900">{feature.title}</Title>
                    <Text type="secondary" className="mb-4">{feature.description}</Text>
                    <div className="mt-4">
                      <Text strong className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.stats}
                      </Text>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>

        {/* Bottom Section - Balanced Grid */}
        <Row gutter={[24, 24]}>
          {/* Market News */}
          <Col xs={24} lg={12}>
            <Card 
              className="rounded-xl border-0 shadow-xl h-full"
              title={
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow">
                    <FireOutlined className="text-xl text-white" />
                  </div>
                  <Title level={3} className="!mb-0">Latest Market News</Title>
                </div>
              }
              extra={
                <Button type="link" className="text-blue-600 hover:text-blue-700">
                  View All <ArrowUpOutlined rotate={45} className="ml-1" />
                </Button>
              }
            >
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {newsItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group border border-gray-100"
                  >
                    <div className={`w-3 h-3 rounded-full mt-2 ${item.trend === 'up' ? 'bg-green-500' : item.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'}`} />
                    <div className="flex-1 min-w-0">
                      <Text strong className="text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </Text>
                      <div className="flex items-center space-x-3 mt-1">
                        <Text type="secondary" className="text-sm">{item.source}</Text>
                        <Text type="secondary" className="text-sm">•</Text>
                        <Text type="secondary" className="text-sm">{item.time}</Text>
                      </div>
                    </div>
                    {item.symbol && (
                      <div className="text-right flex-shrink-0">
                        <Text strong className="text-lg">{item.symbol}</Text>
                        <Text strong className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {item.change}
                        </Text>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Quick Market Preview */}
          <Col xs={24} lg={12}>
            <Card className="rounded-xl border-0 shadow-xl h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow">
                    <StockOutlined className="text-xl text-white" />
                  </div>
                  <div>
                    <Title level={3} className="!mb-0">Recent Market Activity</Title>
                    <Text type="secondary">Last 5 trading days</Text>
                  </div>
                </div>
                <Select defaultValue="AAPL" size="small">
                  <Option value="AAPL">AAPL</Option>
                  <Option value="MSFT">MSFT</Option>
                  <Option value="GOOGL">GOOGL</Option>
                  <Option value="TSLA">TSLA</Option>
                </Select>
              </div>
              
              <div className="h-64 mb-6">
                <CandlestickChart data={recentCandlestickData} height={250} />
              </div>
              
              {/* Quick Stats Grid */}
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <Text type="secondary" className="text-xs">Best Performer</Text>
                    <Text strong className="text-lg text-green-600">NVDA</Text>
                    <Text strong className="text-green-600">+5.8%</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                    <Text type="secondary" className="text-xs">Biggest Loser</Text>
                    <Text strong className="text-lg text-red-600">XOM</Text>
                    <Text strong className="text-red-600">-2.1%</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                    <Text type="secondary" className="text-xs">Most Volume</Text>
                    <Text strong className="text-lg text-blue-600">AAPL</Text>
                    <Text strong className="text-blue-600">52.7M</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <Text type="secondary" className="text-xs">Market Trend</Text>
                    <Text strong className="text-lg text-purple-600">Bullish</Text>
                    <Text strong className="text-purple-600">78%</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Stats Banner */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 p-8 text-white shadow-2xl">
          <Row gutter={[24, 24]} className="text-center">
            <Col xs={12} md={6}>
              <Statistic
                value={92.4}
                suffix="%"
                valueStyle={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}
                prefix={<BulbOutlined className="mr-2 text-blue-300" />}
              />
              <Text className="text-blue-200 mt-2">Prediction Accuracy</Text>
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                value={50}
                suffix="K+"
                valueStyle={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}
                prefix={<TeamOutlined className="mr-2 text-green-300" />}
              />
              <Text className="text-blue-200 mt-2">Active Traders</Text>
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                value={5000}
                suffix="+"
                valueStyle={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}
                prefix={<GlobalOutlined className="mr-2 text-purple-300" />}
              />
              <Text className="text-blue-200 mt-2">Stocks Covered</Text>
            </Col>
            <Col xs={12} md={6}>
              <Statistic
                value={24.7}
                suffix="%"
                valueStyle={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}
                prefix={<DollarOutlined className="mr-2 text-yellow-300" />}
              />
              <Text className="text-blue-200 mt-2">Avg Annual Return</Text>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomePage;