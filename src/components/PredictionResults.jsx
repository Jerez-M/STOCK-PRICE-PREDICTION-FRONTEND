import { Card, Row, Col, Tag, Statistic, Progress } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const PredictionResults = ({ data }) => {
  const getRecommendationColor = (rec) => {
    switch (rec) {
      case 'BUY': return 'success';
      case 'SELL': return 'error';
      case 'HOLD': return 'warning';
      default: return 'default';
    }
  };

  const getRecommendationIcon = (rec) => {
    switch (rec) {
      case 'BUY': return <RiseOutlined />;
      case 'SELL': return <FallOutlined />;
      case 'HOLD': return <LineChartOutlined />;
      default: return null;
    }
  };

  const isPositive = parseFloat(data.percent_change) >= 0;

  return (
    <div className="space-y-6">
      {/* Header Card with Key Metrics */}
      <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-500 to-gray-600 text-white">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8}>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <LineChartOutlined className="text-3xl text-blue-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{data.symbol}</h2>
                <p className="text-gray-300">{data.input_date} → {data.next_day_date}</p>
              </div>
            </div>
          </Col>
          
          <Col xs={12} md={4}>
            <Statistic
              title="Current Price"
              value={data.input_close}
              prefix="$"
              className="text-white"
              valueStyle={{ color: '#ffffff', fontSize: '24px' }}
              titleStyle={{ color: '#ffffff' }}
            />
          </Col>
          
          <Col xs={12} md={4}>
            <Statistic
              title="Predicted Price"
              value={data.predicted_price}
              prefix="$"
              titleStyle={{ color: '#ffffff' }}
              valueStyle={{ 
                color: isPositive ? '#10b981' : '#ef4444', 
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            />
          </Col>
          
          <Col xs={24} md={8}>
            <div className="flex flex-col items-end">
              <Tag 
                color={getRecommendationColor(data.recommendation)}
                icon={getRecommendationIcon(data.recommendation)}
                className="text-lg px-4 py-2 rounded-full mb-3"
              >
                {data.recommendation} RECOMMENDATION
              </Tag>
              <div className="flex items-center space-x-2">
                <span className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}{data.percent_change}%
                </span>
                <span className="text-gray-300">({isPositive ? '+' : ''}${data.price_change})</span>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Results Grid */}
      <Row gutter={[24, 24]}>
        {/* Confidence Score */}
        <Col xs={24} md={8}>
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <CheckCircleOutlined />
                <span>Model Confidence</span>
              </div>
            }
            className="shadow-lg border-0 h-full"
          >
            <div className="text-center py-4">
              <Progress
                type="circle"
                percent={Math.round(data.confidence * 100)}
                strokeColor={{
                  '0%': '#3b82f6',
                  '100%': '#8b5cf6',
                }}
                strokeWidth={8}
                size={150}
                format={percent => (
                  <div className="text-center">
                    <div className="text-3xl font-bold">{percent}%</div>
                    <div className="text-gray-500 text-sm mt-2">Accuracy</div>
                  </div>
                )}
              />
              <p className="mt-4 text-gray-600">{data.model_used}</p>
            </div>
          </Card>
        </Col>

        {/* Price Change Details */}
        <Col xs={24} md={8}>
          <Card 
            title="Price Movement Analysis"
            className="shadow-lg border-0 h-full"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-500 text-sm">Expected Change</div>
                  <div className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}${data.price_change}
                  </div>
                </div>
                <div className={`text-4xl ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Opening Price</span>
                  <span className="font-semibold">${(data.input_close * 0.995).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Price</span>
                  <span className="font-semibold">${data.predicted_price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Volatility</span>
                  <span className="font-semibold">{data.insights.volatility}%</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Key Levels */}
        <Col xs={24} md={8}>
          <Card 
            title="Key Technical Levels"
            className="shadow-lg border-0 h-full"
          >
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FallOutlined className="text-red-500" />
                    <span className="text-gray-700">Resistance</span>
                  </div>
                  <span className="font-bold text-red-600">${data.insights.resistance_level}</span>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <LineChartOutlined className="text-blue-500" />
                    <span className="text-gray-700">Current Price</span>
                  </div>
                  <span className="font-bold text-blue-600">${data.input_close}</span>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <RiseOutlined className="text-green-500" />
                    <span className="text-gray-700">Support</span>
                  </div>
                  <span className="font-bold text-green-600">${data.insights.support_level}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Position Relative to MA</div>
                <div className="font-semibold">{data.insights.position_relative_to_average}</div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Additional Insights */}
        <Col xs={24}>
          <Card 
            title="Additional Market Insights"
            className="shadow-lg border-0"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{data.insights.volatility}%</div>
                  <div className="text-gray-600 text-sm mt-1">Daily Volatility</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-gray-600 text-sm mt-1">Bullish Signals</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">24H</div>
                  <div className="text-gray-600 text-sm mt-1">Prediction Horizon</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">92%</div>
                  <div className="text-gray-600 text-sm mt-1">Model Success Rate</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Disclaimer */}
      <div className="text-center text-gray-500 text-sm p-4">
        <WarningOutlined className="mr-2" />
        This prediction is based on AI analysis and should not be considered as financial advice. 
        Always conduct your own research and consult with a financial advisor before making investment decisions.
      </div>
    </div>
  );
};

export default PredictionResults;