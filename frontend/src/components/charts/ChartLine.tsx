import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartLine = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 21400 },
    { name: "Page C", uv: 250, pv: 2400, amt: 12400 },
    { name: "Page D", uv: 200, pv: 2400, amt: 42400 },
    { name: "Page E", uv: 320, pv: 2400, amt: 52400 },
  ];

  const renderLineChart = (
    <LineChart
      width={600}
      title="Performance"
      height={350}
      className="text-[.7rem]"
      data={data}
      margin={{
        top: 30,
        left: -25,
      }}
    >
      <Line type="monotone" dataKey="uv" stroke="#333" />
      <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
      <XAxis
        strokeWidth={1}
        stroke="#aaa"
        dataKey="name"
        padding={{ left: 35, right: 35 }}
      />
      <YAxis strokeWidth={1} stroke="#aaa" padding={{ bottom: 35, top: 35 }} />
      <Tooltip />
    </LineChart>
  );
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <ResponsiveContainer width={"100%"} height={350}>
        <LineChart
          width={600}
          title="Performance"
          height={350}
          className="text-[.7rem]"
          data={data}
          margin={{
            top: 30,
            left: -25,
          }}
        >
          <Line type="monotone" dataKey="uv" stroke="#333" />
          <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
          <XAxis
            strokeWidth={1}
            stroke="#aaa"
            dataKey="name"
            padding={{ left: 35, right: 35 }}
          />
          <YAxis
            strokeWidth={1}
            stroke="#aaa"
            padding={{ bottom: 35, top: 35 }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartLine;
