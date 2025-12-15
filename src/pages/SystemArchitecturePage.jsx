import { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Steps, 
  Divider, 
  Alert, 
  Tag, 
  Button, 
  List, 
  Collapse, 
  Tabs, 
  Table,
  Progress,
  Tooltip,
  Timeline,
  Space
} from 'antd';
import {
  CloudServerOutlined,
  DatabaseOutlined,
  RobotOutlined,
  LineChartOutlined,
  DeploymentUnitOutlined,
  ApiOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  SafetyOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CodeOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  PercentageOutlined,
  BookOutlined
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
  ScatterChart,
  Scatter,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const SystemArchitecturePage = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  // Architecture Data
  const systemComponents = [
    {
      name: 'Frontend',
      description: 'React application with real-time UI',
      tech: ['React', 'Vite', 'Ant Design', 'Recharts', 'Tailwind CSS'],
      deployment: 'Vercel',
      icon: <DeploymentUnitOutlined />,
      color: '#3b82f6'
    },
    {
      name: 'Backend API',
      description: 'Django WSGI server handling predictions',
      tech: ['DjangoRestFramework', 'Python', 'Scikit-learn', 'XGBoost'],
      deployment: 'Render',
      icon: <CloudServerOutlined />,
      color: '#10b981'
    },
    {
      name: 'ML Model',
      description: 'News-Augmented Stock Prediction Model',
      tech: ['Logistic Regression', 'Random Forest', 'XGBoost', 'Ensemble'],
      deployment: 'Integrated',
      icon: <RobotOutlined />,
      color: '#8b5cf6'
    }
  ];

  // Dataset Description
  const datasetDetails = [
    {
      resource: 'Financial Data',
      type: 'Stock Prices',
      source: 'Yahoo Finance (via yfinance)',
      dateRange: '2008-01-02 to 2025-11-25',
      records: '4,456 records',
      format: 'CSV/DataFrame',
      keyFields: 'Date, Open, High, Low, Close, Volume'
    },
    {
      resource: 'News Data',
      type: 'Market News',
      source: 'Benzinga (Web Scraping)',
      dateRange: '2009-02-14 to 2024-06-11',
      records: '~1.05M records',
      format: 'Excel/CSV',
      keyFields: 'Date, Headline, Ticker'
    }
  ];

  // Technical Indicators
  const technicalIndicators = [
    {
      category: 'Trend Indicators',
      indicators: [
        { name: 'SMA_5', description: '5-day Simple Moving Average' },
        { name: 'SMA_10', description: '10-day Simple Moving Average' },
        { name: 'SMA_20', description: '20-day Simple Moving Average' },
        { name: 'SMA_50', description: '50-day Simple Moving Average' },
        { name: 'EMA_12', description: '12-day Exponential Moving Average' },
        { name: 'EMA_26', description: '26-day Exponential Moving Average' }
      ]
    },
    {
      category: 'Momentum Indicators',
      indicators: [
        { name: 'RSI', description: 'Relative Strength Index' },
        { name: 'MACD', description: 'Moving Average Convergence Divergence' },
        { name: 'MACD_Signal', description: 'MACD Signal Line' },
        { name: 'MACD_Histogram', description: 'MACD Histogram' }
      ]
    },
    {
      category: 'Volatility Indicators',
      indicators: [
        { name: 'Price_Range', description: 'Daily High-Low Range' },
        { name: 'BB_Width', description: 'Bollinger Band Width' },
        { name: 'BB_Position', description: 'Price Position in Bollinger Bands' }
      ]
    },
    {
      category: 'Volume Indicators',
      indicators: [
        { name: 'Volume_Change', description: 'Daily Volume Change' },
        { name: 'Volume_Ratio', description: 'Volume Ratio to Average' },
        { name: 'Volume_SMA_5', description: '5-day Volume Moving Average' }
      ]
    }
  ];

  // Model Performance Data
  const modelPerformance = [
    {
      model: 'Logistic Regression',
      baselineAccuracy: 51.20,
      newsAccuracy: 52.35,
      accuracyDelta: 1.15,
      baselineF1: 52.41,
      newsF1: 53.62,
      f1Delta: 1.21
    },
    {
      model: 'Random Forest',
      baselineAccuracy: 51.85,
      newsAccuracy: 53.01,
      accuracyDelta: 1.16,
      baselineF1: 53.04,
      newsF1: 54.20,
      f1Delta: 1.16
    },
    {
      model: 'Gradient Boosting',
      baselineAccuracy: 52.01,
      newsAccuracy: 52.89,
      accuracyDelta: 0.88,
      baselineF1: 53.18,
      newsF1: 54.08,
      f1Delta: 0.90
    },
    {
      model: 'Support Vector Machine',
      baselineAccuracy: 50.83,
      newsAccuracy: 51.57,
      accuracyDelta: 0.74,
      baselineF1: 51.96,
      newsF1: 52.75,
      f1Delta: 0.79
    },
    {
      model: 'XGBoost',
      baselineAccuracy: 52.10,
      newsAccuracy: 53.20,
      accuracyDelta: 1.10,
      baselineF1: 53.29,
      newsF1: 54.41,
      f1Delta: 1.12
    },
    {
      model: 'Ensemble (Avg. Proba)',
      baselineAccuracy: null,
      newsAccuracy: 53.15,
      accuracyDelta: null,
      baselineF1: null,
      newsF1: 54.35,
      f1Delta: null
    }
  ];

  // Chart data for model comparison
  const modelChartData = modelPerformance.filter(m => m.model !== 'Ensemble (Avg. Proba)').map(m => ({
    name: m.model,
    Baseline: m.baselineAccuracy,
    'News-Augmented': m.newsAccuracy,
    delta: m.accuracyDelta
  }));

  // Training Timeline
  const timelineItems = [
    {
      time: 'Phase 1',
      title: 'Data Collection',
      description: 'Gathered 4,456 financial records and 1.05M news articles',
      status: 'completed',
      color: 'green'
    },
    {
      time: 'Phase 2',
      title: 'Data Preprocessing',
      description: 'Cleaned, merged datasets, and calculated 18 technical indicators',
      status: 'completed',
      color: 'green'
    },
    {
      time: 'Phase 3',
      title: 'Sentiment Analysis',
      description: 'Applied VADER sentiment scoring to news headlines',
      status: 'completed',
      color: 'green'
    },
    {
      time: 'Phase 4',
      title: 'Feature Engineering',
      description: 'Created baseline and news-augmented feature sets',
      status: 'completed',
      color: 'green'
    },
    {
      time: 'Phase 5',
      title: 'Model Training',
      description: 'Trained 5 ML models with cross-validation',
      status: 'completed',
      color: 'green'
    },
    {
      time: 'Phase 6',
      title: 'Evaluation & Deployment',
      description: 'Tested models and deployed best-performing ensemble',
      status: 'completed',
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-6 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-full text-blue-600 text-sm font-semibold backdrop-blur-sm">
            <DeploymentUnitOutlined className="mr-2" />
            SYSTEM ARCHITECTURE & MODEL DETAILS
          </div>
          
          <Title level={1} className="!text-4xl lg:!text-5xl !font-bold !mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Behind the AI Predictions
            </span>
          </Title>
          
          <Paragraph className="!text-lg !text-gray-600 max-w-3xl mx-auto">
            Discover how we built a three-tier system with a news-augmented machine learning model
            that achieves 53.2% accuracy in stock price direction prediction.
          </Paragraph>
        </div>

        {/* Tabs for Different Sections */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="mb-8"
          items={[
            {
              key: 'architecture',
              label: (
                <span className="flex items-center">
                  <DeploymentUnitOutlined className="mr-2" />
                  System Architecture
                </span>
              )
            },
            {
              key: 'data',
              label: (
                <span className="flex items-center">
                  <DatabaseOutlined className="mr-2" />
                  Data & Processing
                </span>
              )
            },
            {
              key: 'model',
              label: (
                <span className="flex items-center">
                  <RobotOutlined className="mr-2" />
                  Model Training
                </span>
              )
            },
            {
              key: 'results',
              label: (
                <span className="flex items-center">
                  <BarChartOutlined className="mr-2" />
                  Results & Validation
                </span>
              )
            }
          ]}
        />

        {/* Architecture Section */}
        {activeTab === 'architecture' && (
          <>
            <Card className="rounded-2xl border-0 shadow-xl mb-8 bg-gradient-to-br from-white to-blue-50/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow">
                  <DeploymentUnitOutlined className="text-2xl text-white" />
                </div>
                <div>
                  <Title level={2} className="!mb-0">Three-Tier System Architecture</Title>
                  <Text type="secondary">Modern deployment with microservices architecture</Text>
                </div>
              </div>

              {/* System Diagram Visualization */}
              <div className="relative mb-8 p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <Row gutter={[24, 24]} className="text-center">
                  {/* Frontend */}
                  <Col xs={24} md={8}>
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <DeploymentUnitOutlined className="text-3xl text-white" />
                      </div>
                      <Title level={3} className="!mb-2">Frontend</Title>
                      <Tag color="blue" className="mb-2">Vercel</Tag>
                      <Text type="secondary">React-based user interface</Text>
                      <div className="mt-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {['React', 'Vite', 'AntD'].map(tech => (
                            <Tag key={tech} className="text-xs">{tech}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Connection Arrow */}
                  <Col xs={24} md={4} className="flex items-center justify-center">
                    <div className="hidden md:block">
                      <ApiOutlined className="text-4xl text-gray-400" />
                    </div>
                  </Col>

                  {/* Backend */}
                  <Col xs={24} md={8}>
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <CloudServerOutlined className="text-3xl text-white" />
                      </div>
                      <Title level={3} className="!mb-2">Backend API</Title>
                      <Tag color="green" className="mb-2">Render</Tag>
                      <Text type="secondary">Django</Text>
                      <div className="mt-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {['DjangoRestFramework', 'Python', 'Scikit-learn'].map(tech => (
                            <Tag key={tech} className="text-xs">{tech}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Connection Arrow */}
                  <Col xs={24} md={4} className="flex items-center justify-center">
                    <div className="hidden md:block">
                      <ApiOutlined className="text-4xl text-gray-400" />
                    </div>
                  </Col>

                  {/* ML Model */}
                  <Col xs={24} md={8}>
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                        <RobotOutlined className="text-3xl text-white" />
                      </div>
                      <Title level={3} className="!mb-2">ML Model</Title>
                      <Tag color="purple" className="mb-2">Integrated</Tag>
                      <Text type="secondary">News-augmented predictions</Text>
                      <div className="mt-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {['XGBoost', 'Ensemble', 'VADER'].map(tech => (
                            <Tag key={tech} className="text-xs">{tech}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Data Flow Visualization */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Title level={4} className="!mb-4 text-center">Data Flow</Title>
                  <div className="relative h-32">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 text-center">
                      <DatabaseOutlined className="text-3xl text-blue-500 mb-2" />
                      <Text strong>Data Sources</Text>
                      <Text type="secondary" className="text-xs">Yahoo Finance & Benzinga</Text>
                    </div>
                    <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-1/3 text-center">
                      <ExperimentOutlined className="text-3xl text-green-500 mb-2" />
                      <Text strong>Processing Pipeline</Text>
                      <Text type="secondary" className="text-xs">Feature Engineering</Text>
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 text-center">
                      <RobotOutlined className="text-3xl text-purple-500 mb-2" />
                      <Text strong>Predictions</Text>
                      <Text type="secondary" className="text-xs">Real-time AI Insights</Text>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* System Components Details */}
              <div className="mt-8">
                <Title level={3} className="!mb-6">System Components</Title>
                <Row gutter={[24, 24]}>
                  {systemComponents.map((component, index) => (
                    <Col xs={24} md={8} key={index}>
                      <Card 
                        className="rounded-xl border-0 shadow-lg hover:shadow-xl transition-shadow h-full"
                        style={{ borderLeft: `4px solid ${component.color}` }}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${component.color}15` }}>
                            <div style={{ color: component.color }}>{component.icon}</div>
                          </div>
                          <Title level={4} className="!mb-0">{component.name}</Title>
                        </div>
                        <Paragraph className="!text-gray-700 !mb-4">
                          {component.description}
                        </Paragraph>
                        <div className="mb-3">
                          <Text strong className="text-sm">Deployment:</Text>
                          <Tag color={index === 0 ? 'blue' : index === 1 ? 'green' : 'purple'} className="ml-2">
                            {component.deployment}
                          </Tag>
                        </div>
                        <div>
                          <Text strong className="text-sm mb-2 block">Technologies:</Text>
                          <div className="flex flex-wrap gap-1">
                            {component.tech.map(tech => (
                              <Tag key={tech} className="text-xs">{tech}</Tag>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </>
        )}

        {/* Data & Processing Section */}
        {activeTab === 'data' && (
          <>
            <Card className="rounded-2xl border-0 shadow-xl mb-8 bg-gradient-to-br from-white to-blue-50/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow">
                  <DatabaseOutlined className="text-2xl text-white" />
                </div>
                <div>
                  <Title level={2} className="!mb-0">Data Collection & Preprocessing</Title>
                  <Text type="secondary">Comprehensive dataset with 18 engineered features</Text>
                </div>
              </div>

              {/* Dataset Overview */}
              <div className="mb-8">
                <Title level={3} className="!mb-4">Dataset Description</Title>
                <Row gutter={[24, 24]}>
                  {datasetDetails.map((dataset, index) => (
                    <Col xs={24} lg={12} key={index}>
                      <Card className="rounded-xl border-0 shadow-sm h-full">
                        <div className="flex items-center space-x-3 mb-4">
                          <FileTextOutlined className="text-blue-500 text-xl" />
                          <Title level={4} className="!mb-0">{dataset.resource}</Title>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <Text strong>Type:</Text>
                            <Text>{dataset.type}</Text>
                          </div>
                          <div className="flex justify-between">
                            <Text strong>Source:</Text>
                            <Text>{dataset.source}</Text>
                          </div>
                          <div className="flex justify-between">
                            <Text strong>Date Range:</Text>
                            <Text>{dataset.dateRange}</Text>
                          </div>
                          <div className="flex justify-between">
                            <Text strong>Records:</Text>
                            <Tag color="blue">{dataset.records}</Tag>
                          </div>
                          <div className="flex justify-between">
                            <Text strong>Key Fields:</Text>
                            <Text className="text-right">{dataset.keyFields}</Text>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Technical Indicators */}
              <div className="mb-8">
                <Title level={3} className="!mb-6">Engineered Technical Indicators (18 Total)</Title>
                <Row gutter={[24, 24]}>
                  {technicalIndicators.map((category, index) => (
                    <Col xs={24} md={12} lg={6} key={index}>
                      <Card className="rounded-xl border-0 shadow-sm h-full">
                        <Title level={4} className="!mb-4">{category.category}</Title>
                        <List
                          size="small"
                          dataSource={category.indicators}
                          renderItem={item => (
                            <List.Item className="!px-0 !py-2 border-0">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <div>
                                  <Text strong className="text-sm">{item.name}</Text>
                                  <Text type="secondary" className="text-xs block">{item.description}</Text>
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Preprocessing Pipeline */}
              <div className="mb-8">
                <Title level={3} className="!mb-4">Preprocessing Pipeline</Title>
                <Timeline mode="left" className="ml-4">
                  {[
                    {
                      title: 'Data Cleaning',
                      description: 'Removed missing values and standardized date formats'
                    },
                    {
                      title: 'Feature Engineering',
                      description: 'Calculated 18 technical indicators from price data'
                    },
                    {
                      title: 'Sentiment Analysis',
                      description: 'Applied VADER sentiment scoring to 1.05M news headlines'
                    },
                    {
                      title: 'Keyword Filtering',
                      description: 'Filtered news using 100+ market-related keywords'
                    },
                    {
                      title: 'Aggregation',
                      description: 'Computed daily sentiment averages and article counts'
                    },
                    {
                      title: 'Target Variable Creation',
                      description: 'Target = 1 if Close_{t+1} > Close_t else 0'
                    }
                  ].map((step, index) => (
                    <Timeline.Item 
                      key={index}
                      color="blue"
                      dot={<CheckCircleOutlined className="text-blue-500" />}
                    >
                      <Text strong>{step.title}</Text>
                      <br />
                      <Text type="secondary">{step.description}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>

              {/* Train-Test Split */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <Title level={3} className="!mb-4">Train-Test Split Strategy</Title>
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">80%</div>
                      <Text strong>Training Set</Text>
                      <Text type="secondary" className="block">First 3,364 days (Chronological)</Text>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">20%</div>
                      <Text strong>Testing Set</Text>
                      <Text type="secondary" className="block">Last 841 days (No look-ahead bias)</Text>
                    </div>
                  </Col>
                </Row>
                <Alert
                  message="Important"
                  description="Chronological split prevents look-ahead bias and simulates real-world trading scenarios"
                  type="info"
                  showIcon
                  className="mt-6"
                />
              </div>
            </Card>
          </>
        )}

        {/* Model Training Section */}
        {activeTab === 'model' && (
          <>
            <Card className="rounded-2xl border-0 shadow-xl mb-8 bg-gradient-to-br from-white to-blue-50/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow">
                  <RobotOutlined className="text-2xl text-white" />
                </div>
                <div>
                  <Title level={2} className="!mb-0">Machine Learning Models</Title>
                  <Text type="secondary">Five models with news-augmented features</Text>
                </div>
              </div>

              {/* Model Comparison */}
              <div className="mb-8">
                <Title level={3} className="!mb-4">Model Performance</Title>
                <Table
                  dataSource={modelPerformance}
                  columns={[
                    {
                      title: 'Model',
                      dataIndex: 'model',
                      key: 'model',
                      render: (text) => <Text strong>{text}</Text>
                    },
                    {
                      title: 'Baseline Accuracy',
                      dataIndex: 'baselineAccuracy',
                      key: 'baselineAccuracy',
                      render: (value) => value ? `${value.toFixed(2)}%` : '-',
                      align: 'center'
                    },
                    {
                      title: 'News Accuracy',
                      dataIndex: 'newsAccuracy',
                      key: 'newsAccuracy',
                      render: (value) => `${value.toFixed(2)}%`,
                      align: 'center'
                    },
                    {
                      title: 'Accuracy Δ',
                      dataIndex: 'accuracyDelta',
                      key: 'accuracyDelta',
                      render: (value) => value ? (
                        <Tag color={value > 0 ? 'green' : 'red'}>
                          +{value.toFixed(2)}%
                        </Tag>
                      ) : '-',
                      align: 'center'
                    },
                    {
                      title: 'F1 Score Δ',
                      dataIndex: 'f1Delta',
                      key: 'f1Delta',
                      render: (value) => value ? (
                        <Tag color={value > 0 ? 'green' : 'red'}>
                          +{value.toFixed(2)}%
                        </Tag>
                      ) : '-',
                      align: 'center'
                    }
                  ]}
                  pagination={false}
                  className="rounded-lg"
                />
              </div>

              {/* Performance Visualization */}
              <div className="mb-8">
                <Title level={3} className="!mb-4">Accuracy Improvement Visualization</Title>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft' }} />
                      <RechartsTooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                      <Legend />
                      <Bar dataKey="Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="News-Augmented" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Findings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="text-center">
                    <PercentageOutlined className="text-4xl text-green-500 mb-3" />
                    <Title level={3} className="!mb-2">53.2%</Title>
                    <Text strong>Best Accuracy</Text>
                    <Text type="secondary" className="block text-sm">XGBoost with News</Text>
                  </div>
                </Card>
                <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="text-center">
                    <TeamOutlined className="text-4xl text-blue-500 mb-3" />
                    <Title level={3} className="!mb-2">+1.16%</Title>
                    <Text strong>Max Improvement</Text>
                    <Text type="secondary" className="block text-sm">Random Forest</Text>
                  </div>
                </Card>
                <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center">
                    <CalendarOutlined className="text-4xl text-purple-500 mb-3" />
                    <Title level={3} className="!mb-2">17 Years</Title>
                    <Text strong>Data Coverage</Text>
                    <Text type="secondary" className="block text-sm">2008-2025</Text>
                  </div>
                </Card>
              </div>

              {/* Model Training Timeline */}
              <div>
                <Title level={3} className="!mb-6">Model Training Timeline</Title>
                <Timeline mode="alternate">
                  {timelineItems.map((item, index) => (
                    <Timeline.Item 
                      key={index}
                      color={item.color}
                      label={<Text strong>{item.time}</Text>}
                    >
                      <Card className="rounded-lg border-0 shadow-sm">
                        <Title level={4} className="!mb-2">{item.title}</Title>
                        <Paragraph className="!mb-0 !text-gray-700">{item.description}</Paragraph>
                      </Card>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Card>
          </>
        )}

        {/* Results & Validation Section */}
        {activeTab === 'results' && (
          <>
            <Card className="rounded-2xl border-0 shadow-xl mb-8 bg-gradient-to-br from-white to-blue-50/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow">
                  <BarChartOutlined className="text-2xl text-white" />
                </div>
                <div>
                  <Title level={2} className="!mb-0">Results & Validation</Title>
                  <Text type="secondary">Comprehensive model evaluation and insights</Text>
                </div>
              </div>

              {/* Key Insights */}
              <div className="mb-8">
                <Title level={3} className="!mb-4">Key Findings</Title>
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={8}>
                    <Card className="rounded-xl border-0 shadow-sm h-full">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircleOutlined className="text-green-500 text-xl" />
                        <Title level={4} className="!mb-0">Consistent Improvement</Title>
                      </div>
                      <Paragraph className="!text-gray-700">
                        Every single model demonstrated positive improvement when news features were added, 
                        supporting our alternative hypothesis.
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Card className="rounded-xl border-0 shadow-sm h-full">
                      <div className="flex items-center space-x-3 mb-4">
                        <RocketOutlined className="text-blue-500 text-xl" />
                        <Title level={4} className="!mb-0">Economic Significance</Title>
                      </div>
                      <Paragraph className="!text-gray-700">
                        While improvements seem small (0.74% to 1.16%), in high-frequency trading 
                        with large portfolios, even a 1% edge can be economically significant.
                      </Paragraph>
                    </Card>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Card className="rounded-xl border-0 shadow-sm h-full">
                      <div className="flex items-center space-x-3 mb-4">
                        <SafetyOutlined className="text-purple-500 text-xl" />
                        <Title level={4} className="!mb-0">Best Performers</Title>
                      </div>
                      <Paragraph className="!text-gray-700">
                        Random Forest and XGBoost achieved the highest news-augmented accuracy 
                        at 53.01% and 53.20% respectively, making them our production choices.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              </div>

              {/* Performance Chart */}
              <div className="mb-8">
                <Title level={3} className="!mb-4">Model Performance Comparison</Title>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={modelChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[50, 54]} />
                      <RechartsTooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Baseline" 
                        stroke="#94a3b8" 
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="News-Augmented" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Delta Improvements */}
              <div className="mb-8">
                <Title level={3} className="!mb-4">Improvement Analysis</Title>
                <Row gutter={[24, 24]}>
                  {modelPerformance
                    .filter(m => m.model !== 'Ensemble (Avg. Proba)')
                    .map((model, index) => (
                      <Col xs={24} md={12} lg={8} key={index}>
                        <Card className="rounded-xl border-0 shadow-sm">
                          <div className="flex justify-between items-center mb-3">
                            <Text strong>{model.model}</Text>
                            <Tag color={model.accuracyDelta > 0 ? 'green' : 'red'}>
                              +{model.accuracyDelta.toFixed(2)}%
                            </Tag>
                          </div>
                          <Progress 
                            percent={model.newsAccuracy} 
                            success={{ percent: model.baselineAccuracy }}
                            strokeColor="#3b82f6"
                            trailColor="#e5e7eb"
                            size="small"
                            format={percent => `${percent}%`}
                          />
                          <div className="flex justify-between mt-2 text-sm">
                            <Text type="secondary">Baseline: {model.baselineAccuracy.toFixed(2)}%</Text>
                            <Text strong>News: {model.newsAccuracy.toFixed(2)}%</Text>
                          </div>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </div>

              {/* Technical Validation */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <Title level={3} className="!mb-4">Technical Validation</Title>
                <List
                  dataSource={[
                    'Chronological train-test split prevents look-ahead bias',
                    'Cross-validation ensures model robustness',
                    'Feature importance analysis validates engineered features',
                    'Confusion matrix analysis for each model',
                    'Statistical significance testing of improvements',
                    'Real-time backtesting simulation'
                  ]}
                  renderItem={(item, index) => (
                    <List.Item className="!px-0 !py-2 border-0">
                      <div className="flex items-center space-x-3">
                        <CheckCircleOutlined className="text-green-500" />
                        <Text>{item}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </div>

              {/* Production Readiness */}
              <div className="mt-8">
                <Title level={3} className="!mb-4">Production Deployment</Title>
                <Alert
                  message="Production-Ready System"
                  description="The system is deployed with the ensemble model (53.15% accuracy) as the primary predictor, 
                  backed by XGBoost and Random Forest models for validation. Real-time predictions are served through 
                  the FastAPI backend with response times under 100ms."
                  type="success"
                  showIcon
                  className="rounded-xl"
                />
              </div>
            </Card>
          </>
        )}

        {/* Call to Action */}
        <div className="rounded-xl bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 p-8 text-white shadow-2xl">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={16}>
              <Title level={2} className="!mb-4 !text-white">
                Experience the AI Predictions
              </Title>
              <Paragraph className="!text-blue-100 !mb-0">
                Now that you understand the sophisticated architecture behind our predictions, 
                try the AI predictor with real stock data or explore detailed technical analysis.
              </Paragraph>
            </Col>
            <Col xs={24} lg={8}>
              <div className="flex flex-col space-y-3">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-none font-semibold"
                  onClick={() => window.location.href = '/predict'}
                  icon={<RobotOutlined />}
                >
                  Try AI Predictor
                </Button>
                <Button 
                  size="large"
                  className="bg-transparent text-white hover:bg-white/10 border border-white/50 font-semibold"
                  onClick={() => window.location.href = '/documentation'}
                  icon={<BookOutlined />}
                >
                  Read Documentation
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Footer Note */}
        <div className="mt-8">
          <Alert
            message="Research & Development"
            description="This system represents cutting-edge research in financial machine learning. 
            The models are continuously improved with new data and techniques. For academic 
            collaboration or commercial inquiries, please contact our research team."
            type="info"
            showIcon
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecturePage;