using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Dtos
{
    public class ProductDto
    {
        public int? ID { get; set; }
        public string ProductName { get; set; }
        public int CategoryID { get; set; }
        public int BrandID { get; set; }
        public int SpeciesID { get; set; }
        public int TypeID { get; set; }
        public int StateID { get; set; }
        public string Ingredients { get; set; }
        public string IngredientsString { get; set; }
        public string Presentation { get; set; }
        public string CertificationNo { get; set; }
        public string BottledLot { get; set; }
        public string CompanyName { get; set; }
        public bool IsActive { get; set; }
        public string ImageBase64 { get; set; }
        public string PreviousImagePath { get; set; }
        public string ImagePath { get; set; }
        public string ProductionState { get; set; }
        public int CreatedBy { get; set; }
        public string Attributes { get; set; }
    }
}
