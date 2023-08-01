using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Models
{
    public class Product
    {
        public int? ID { get; set; }
    }
    public class Brand: Product
    {
        public string BrandName { get; set; }
    }
    public class Category: Product
    {
        public string ProductCategory { get; set; }
    }
    public class TypeData: Product
    {
        public string Type { get; set; }
    }
    public class SpeciesData : Product
    {
       public string SpeciesName { get; set; }
    }
    public class StateData: Product
    {
        public string StateName { get; set; }
    }
    public class ProductList
    {
       public int ProductID { get; set; }
       public string ProductCode { get; set; }
       public string ProductName { get; set; }
       public string ProductDescription { get; set; }
       public string BatchNumber { get; set; }
       public int CategoryId { get; set; }
       public int BrandID { get; set; }
       public int SpeciesID { get; set; }
       public int TypeID { get; set; }
       public int StateID { get; set; }
       public string BrandName { get; set; }
       public string SpeciesName { get; set; }
       public string ImagePath { get; set; }
       public string StateName { get; set; }
       public string ProductCategory { get; set; }
       public string Type { get; set; }
       public string Ingredients { get; set; }
       public string Presentation { get; set; }
       public string CertificationNo { get; set; }
       public string BottledLot { get; set; }
       public string Attributes { get; set; }
       public string CompanyName { get; set; }
       public string ProductionState { get; set; }
       public bool IsActive { get; set; }
       public string Base64 { get; set; } 
       public int TotalRows { get; set; }
    }

}
