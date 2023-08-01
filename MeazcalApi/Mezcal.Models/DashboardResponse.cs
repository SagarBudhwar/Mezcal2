using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Models
{
    public class DashboardResponse
    {
        public DateTime CreatedDate { get; set; }
        public int TotalCount { get; set; }
        public string MonthName { get; set; }
    }
    public class DashboardCount
    {
        public double TotalUser { get; set; }
        public double TotalMapping { get; set; }
        public double TotalDeMapping { get; set; }
        public double TotalDamage { get; set; }
        public double TotalHologramStock { get; set; }
        public double TotalHologramStolen { get; set; }
    }
    public class BarChartResponse
    {
        public string[] labels { get; set; }
        public List<BarChartData> datasets { get; set; } = new List<BarChartData>();
    }
    public class BarChartData
    {
        public string label { get; set; }
        public string backgroundColor { get; set; }
        public List<int> data { get; set; } = new List<int>();
    }
}
