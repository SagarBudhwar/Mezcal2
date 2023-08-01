using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Models
{
    public class MappingList
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Prefix { get; set; }
        public long FromNumber { get; set; }
        public long ToNumber { get; set; }
        public long Quantity { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public int RowNum { get; set; }
        public string Ingredients { get; set; }
        public string Presentation { get; set; }
        public string CertificationNo { get; set; }
        public string BottledLot { get; set; }
        public string CompanyName { get; set; }
        public string Attributes { get; set; }
        public string StateName { get; set; }
        public string ProductCategory { get; set; }
        public string SpeciesName { get; set; }
        public string BrandName { get; set; }
        public string Type { get; set; }
        public int TotalRecord { get; set; }
    }
    public class HologramStcokList
    {
        public int Id { get; set; }
        public string Prefix { get; set; }
        public long FromNumber { get; set; }
        public long ToNumber { get; set; }
        public long Quantity { get; set; }
        public long AQuantity { get; set; }
        public long BQuantity { get; set; }
        public int TotalRows { get; set; }
        public int RowNum { get; set; }
    }
    public class CheckHologramMapping
    {
        public Nullable<int> ProductID { get; set; }
        public long FromNumber { get; set; }
        public long ToNumber { get; set; }
        public long Quantity { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
    }

    public class ProductsListForDdl
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
    }

    public class ProductListForMapping
    {

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Ingredients { get; set; }
        public string Presentation { get; set; }
        public string CertificationNo { get; set; }
        public string BottledLot { get; set; }
        public string CompanyName { get; set; }
        public string Attributes { get; set; }
        public string StateName { get; set; }
        public string ProductCategory { get; set; }
        public string SpeciesName { get; set; }
        public string BrandName { get; set; }
        public string Type { get; set; }
        public string ProductCode { get; set; }
        public string BatchNumber { get; set; }
        public string ProductDescription { get; set; }
        public int TotalRows { get; set; }
    }

    public class DeMappingList
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Prefix { get; set; }
        public long FromNumber { get; set; }
        public long ToNumber { get; set; }
        public long Quantity { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public int RowNum { get; set; }
        public int TotalRecord { get; set; }
    }


}
