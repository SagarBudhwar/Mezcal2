using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Dtos
{
    public class StockDto
    {
        public int? Id { get; set; }
        public int ProductId { get; set; }
        public string Prefix { get; set; }
        public long FromNumber { get; set; }
        public long ToNumber { get; set; }
        public long Quantity { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string Remarks { get; set; }
    }
}
