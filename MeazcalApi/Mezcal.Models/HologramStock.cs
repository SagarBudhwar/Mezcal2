using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Models
{
    public class HologramStock
    {
       public int Id { get; set; }
       public int HologramID { get; set; }
       public string Prefix { get; set; }
       public long FromNumber { get; set; }
       public long ToNumber { get; set; }
       public long Quantity { get; set; }
      public string Organisation { get; set; }
      public int IsActive { get; set; }
      public int CreatedBy { get; set; }
      public string CreatedDate { get; set; }
      public string Remarks { get; set; }
      public int? TotalRows { get; set; }

    }
}
