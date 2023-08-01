using System;
using System.Collections.Generic;
using System.Text;

namespace Mezcal.Dtos
{
    public class CommonDto
    {
        public int PageNo { get; set; }	
        public int PageSize { get; set; }	 
        public string SearchValue { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
    }
}
