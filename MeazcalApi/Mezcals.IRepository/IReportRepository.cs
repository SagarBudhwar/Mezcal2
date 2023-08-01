using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Mezcal.Models;
namespace Mezcal.IRepository
{
    public interface IReportRepository
    {
        Task<List<ScanLogList>> ScanLogReportByDate(CommonUtilsReport request);
        Task<IEnumerable<ProductAuth>> GetFeedbackReport(ReportRequest request);

    }
}
