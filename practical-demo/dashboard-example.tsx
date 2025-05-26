import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data generation
const generateMockData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  const revenueData = months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 30000,
    profit: Math.floor(Math.random() * 20000) + 10000,
  }));

  const userGrowthData = months.map(month => ({
    month,
    users: Math.floor(Math.random() * 5000) + 10000,
    activeUsers: Math.floor(Math.random() * 3000) + 7000,
  }));

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Clothing', value: 25, color: '#8b5cf6' },
    { name: 'Home', value: 20, color: '#10b981' },
    { name: 'Sports', value: 12, color: '#f59e0b' },
    { name: 'Other', value: 8, color: '#ef4444' },
  ];

  return { revenueData, userGrowthData, categoryData };
};

// KPI Card Component
const KPICard = ({ title, value, change, icon, color }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(prev => {
        const increment = Math.ceil((value - prev) / 10);
        return prev + increment > value ? value : prev + increment;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
          <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
            {typeof value === 'number' ? displayValue.toLocaleString() : value}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: change > 0 ? '#10b981' : '#ef4444', fontSize: '14px', fontWeight: '500' }}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>vs last month</span>
          </div>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: color + '20',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState('6M');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setData(generateMockData());
  }, []);

  if (!data) return <div>Loading...</div>;

  const kpiData = [
    { title: 'Total Revenue', value: 248500, change: 12.5, icon: '💰', color: '#3b82f6' },
    { title: 'Active Users', value: 45231, change: 8.2, icon: '👥', color: '#8b5cf6' },
    { title: 'Conversion Rate', value: '3.48%', change: -2.1, icon: '📊', color: '#10b981' },
    { title: 'Avg Order Value', value: 85.50, change: 5.7, icon: '🛒', color: '#f59e0b' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '20px 0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
              Analytics Dashboard
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          
          {/* Date Range Selector */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['1M', '3M', '6M', '1Y'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: dateRange === range ? '#3b82f6' : '#f1f5f9',
                  color: dateRange === range ? 'white' : '#64748b',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '24px' }}>
          {/* Revenue Chart */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1e293b' }}>
              Revenue & Profit Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth Chart */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1e293b' }}>
              User Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="users" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="activeUsers" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', marginTop: '24px' }}>
          {/* Data Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1e293b' }}>
              Recent Transactions
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontSize: '14px' }}>ID</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontSize: '14px' }}>Customer</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontSize: '14px' }}>Product</th>
                    <th style={{ textAlign: 'right', padding: '12px', color: '#64748b', fontSize: '14px' }}>Amount</th>
                    <th style={{ textAlign: 'center', padding: '12px', color: '#64748b', fontSize: '14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#3241', customer: 'John Doe', product: 'Premium Plan', amount: 299, status: 'completed' },
                    { id: '#3240', customer: 'Jane Smith', product: 'Basic Plan', amount: 99, status: 'pending' },
                    { id: '#3239', customer: 'Bob Johnson', product: 'Pro Plan', amount: 199, status: 'completed' },
                    { id: '#3238', customer: 'Alice Brown', product: 'Premium Plan', amount: 299, status: 'completed' },
                    { id: '#3237', customer: 'Charlie Wilson', product: 'Basic Plan', amount: 99, status: 'failed' },
                  ].map(transaction => (
                    <tr key={transaction.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 12px', fontSize: '14px', fontWeight: '500' }}>{transaction.id}</td>
                      <td style={{ padding: '16px 12px', fontSize: '14px' }}>{transaction.customer}</td>
                      <td style={{ padding: '16px 12px', fontSize: '14px' }}>{transaction.product}</td>
                      <td style={{ padding: '16px 12px', fontSize: '14px', textAlign: 'right' }}>${transaction.amount}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: 
                            transaction.status === 'completed' ? '#10b98120' :
                            transaction.status === 'pending' ? '#f59e0b20' : '#ef444420',
                          color: 
                            transaction.status === 'completed' ? '#10b981' :
                            transaction.status === 'pending' ? '#f59e0b' : '#ef4444'
                        }}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Distribution */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1e293b' }}>
              Sales by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div style={{ marginTop: '20px' }}>
              {data.categoryData.map((category, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: category.color, borderRadius: '2px' }} />
                    <span style={{ fontSize: '14px', color: '#64748b' }}>{category.name}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;