using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Models
{
    public class ScanLogList
    {
        public int VerificationId { get; set; }
        public string Name { get; set; }
        public decimal Mobile { get; set; }
        public string ProductName { get; set; }
        public string HologramNo { get; set; }
        public long SeqNo { get; set; }
        public string Status { get; set; }
        public string ScanMode { get; set; }
        public string Remarks { get; set; }
        public string CreatedDate { get; set; }
        public string Usrlatitude { get; set; }
        public string Usrlongitude { get; set; }
        public int RowNum { get; set; }
        public int? TotalRows { get; set; }

    }
}
