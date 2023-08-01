using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Dtos
{
    public class CommonMasterDto
    {
        public int? ID { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
        public string InActiveReason { get; set; }
        public int TotalRows { get; set; }
    }
    public class StateMaster : CommonMasterDto
    {
        public string StateName { get; set; }
    }
    public class BrandMaster:CommonMasterDto
    {
        public string BrandName { get; set; }
    }
    public class TypeMaster:CommonMasterDto
    {
        public string Type { get; set; }
    }
    public class SpeciesMaster : CommonMasterDto
    {
        public string SpeciesName { get; set; }
    }
    public class CategoryMaster : CommonMasterDto
    {
        public string ProductCategory { get; set; }
    }
}
