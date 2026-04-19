import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Line Chart Component
export const RevenueChart = ({ data, title }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title || 'Revenue Overview'}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Area Chart Component
export const SalesChart = ({ data, title }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title || 'Sales Overview'}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Bar Chart Component
export const OrdersChart = ({ data, title }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title || 'Orders Overview'}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Pie Chart Component
export const CategoryChart = ({ data, title, colors }) => {
  const DEFAULT_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#6b7280'];
  const chartColors = colors || DEFAULT_COLORS;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title || 'Category Distribution'}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Dual Axis Chart Component
export const DualAxisChart = ({ data, title, leftKey, rightKey, leftColor, rightColor }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title || 'Sales & Orders'}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" stroke={leftColor || '#3b82f6'} />
            <YAxis yAxisId="right" orientation="right" stroke={rightColor || '#8b5cf6'} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey={leftKey} fill={leftColor || '#3b82f6'} radius={[8, 8, 0, 0]} />
            <Bar yAxisId="right" dataKey={rightKey} fill={rightColor || '#8b5cf6'} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};