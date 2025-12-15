/* eslint-disable react-hooks/purity */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Statistic, Tabs, Select, DatePicker, Button, Tag } from 'antd';
import { 
  LineChartOutlined, 
  DollarOutlined,
  RiseOutlined,
  HistoryOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import CandleStickChart from '../components/CandleStickChart';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const StockAnalysisPage = () => {
  const { symbol } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1D');
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStockData({
        symbol: symbol,
        currentPrice: 168.42,
        change: 2.15,
        changePercent: 1.29,
        volume: '45.2M',
        marketCap: '2.6T',
        peRatio: 28.5,
        dividendYield: '0.54%',
        high52w: 198.23,
        low52w: 124.17,
      });
      setLoading(false);
    }, 1000);
  }, [symbol]);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {symbol} Analysis
            </h1>
            <p className="text-gray-600">Real-time technical analysis and market insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select
              value={timeframe}
              onChange={setTimeframe}
              className="w-32"
            >
              <Option value="1D">1 Day</Option>
              <Option value="1W">1 Week</Option>
              <Option value="1M">1 Month</Option>
              <Option value="3M">3 Months</Option>
              <Option value="1Y">1 Year</Option>
            </Select>
            <RangePicker />
            <Button type="primary">Refresh Data</Button>
          </div>
        </div>

        {/* Stock Overview */}
        {stockData && (
          <Card className="mb-6 shadow-lg border-0">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={4}>
                <Statistic
                  title="Current Price"
                  value={stockData.currentPrice}
                  prefix="$"
                  valueStyle={{ fontSize: '28px', fontWeight: 'bold' }}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Statistic
                  title="Change"
                  value={stockData.change}
                  prefix={stockData.change >= 0 ? '+' : ''}
                  valueStyle={{ 
                    color: stockData.change >= 0 ? '#10b981' : '#ef4444',
                    fontSize: '24px'
                  }}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Statistic
                  title="Change %"
                  value={stockData.changePercent}
                  suffix="%"
                  valueStyle={{ 
                    color: stockData.changePercent >= 0 ? '#10b981' : '#ef4444',
                    fontSize: '24px'
                  }}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Statistic
                  title="Volume"
                  value={stockData.volume}
                  valueStyle={{ fontSize: '24px' }}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Statistic
                  title="Market Cap"
                  value={stockData.marketCap}
                  valueStyle={{ fontSize: '24px' }}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Statistic
                  title="P/E Ratio"
                  value={stockData.peRatio}
                  valueStyle={{ fontSize: '24px' }}
                />
              </Col>
            </Row>
          </Card>
        )}
      </div>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Chart Section */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <LineChartOutlined className="text-blue-600" />
                <span>Price Chart</span>
                <Tag color="blue" className="ml-2">{timeframe}</Tag>
              </div>
            }
            className="shadow-lg border-0 h-full"
          >
            <CandleStickChart symbol={symbol} timeframe={timeframe} />
          </Card>
        </Col>

        {/* Technical Indicators */}
        <Col xs={24} lg={8}>
          <Card 
            title="Technical Indicators"
            className="shadow-lg border-0"
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Trend" key="1">
                <div className="space-y-4">
                  {['RSI', 'MACD', 'Moving Average', 'Bollinger Bands'].map(indicator => (
                    <div key={indicator} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{indicator}</span>
                        <Tag color={
                          Math.random() > 0.5 ? 'success' : 
                          Math.random() > 0.5 ? 'error' : 'warning'
                        }>
                          {Math.random() > 0.5 ? 'Bullish' : 'Bearish'}
                        </Tag>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {Math.random() > 0.5 ? 'Strong buy signal' : 'Neutral signal detected'}
                      </div>
                    </div>
                  ))}
                </div>
              </TabPane>
              <TabPane tab="Volume" key="2">
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <DollarOutlined className="text-4xl text-gray-300 mb-4" />
                    <p className="text-gray-500">Volume analysis data loading...</p>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>

          {/* Key Levels */}
          <Card 
            title="Key Price Levels"
            className="shadow-lg border-0 mt-6"
          >
            <div className="space-y-3">
              {[
                { level: 'Strong Resistance', price: 172.50, type: 'resistance' },
                { level: 'Resistance', price: 170.25, type: 'resistance' },
                { level: 'Current', price: 168.42, type: 'current' },
                { level: 'Support', price: 166.80, type: 'support' },
                { level: 'Strong Support', price: 165.00, type: 'support' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'resistance' ? 'bg-red-500' :
                      item.type === 'support' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <span>{item.level}</span>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Additional Info */}
      <Card 
        title={
          <div className="flex items-center space-x-2">
            <InfoCircleOutlined />
            <span>About {symbol}</span>
          </div>
        }
        className="shadow-lg border-0 mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Company Info</h4>
            <p className="text-gray-600">
              Leading technology company specializing in consumer electronics, 
              software, and online services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recent News</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <RiseOutlined className="text-green-500 mr-2 mt-1" />
                <span>Q4 earnings beat expectations</span>
              </li>
              <li className="flex items-start">
                <HistoryOutlined className="text-blue-500 mr-2 mt-1" />
                <span>New product launch scheduled</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Analyst Consensus</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Strong Buy</span>
                <span className="font-semibold">65%</span>
              </div>
              <div className="flex justify-between">
                <span>Hold</span>
                <span className="font-semibold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>Sell</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockAnalysisPage;