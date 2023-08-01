using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Models
{
    public class ProductCategoryResponse
    {
        public int ID { get; set; }
        public string ProductCategory { get; set; }
        public string CategoryDescription { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string InActiveReason { get; set; }
        public int TotalRows { get; set; }
    }
}
