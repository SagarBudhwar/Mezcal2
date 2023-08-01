
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mezcal.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Remarks { get; set; }
        public int? TotalRows { get; set; }
        public bool IsActive { get; set; }
        public long UpdatedBy { get; set; }
    }
    public class RoleForUsers
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }


    public class RoleRequest
    {
        public int RoleId { get; set; }

        public string RoleName { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
        public long UpdatedBy { get; set; }
    }


    public class Page
    {
        [Required]
        public long PageId { get; set; }
        public bool ViewRight { get; set; }
    }


    public class MapRolePageRequest
    {
        public IEnumerable<Page> Pages { get; set; }
        [Required(ErrorMessage = "Role id is required.")]
        public double RoleId { get; set; }
        public double UpdatedBy { get; set; }

    }

    public class RolePage
    {
        public long RoleId { get; set; }
        public long PageId { get; set; }
        public string PageName { get; set; }
        public string Menu { get; set; }
        public string Icon { get; set; }
        public string SubMenu { get; set; }
        public long ParentId { get; set; }
        public long SerialNo { get; set; }
        public long RolePageId { get; set; }
        public bool ViewRight { get; set; }

    }


    //public class RoleAccess
    //{
    //    public long RoleId { get; set; }
    //    public long PageId { get; set; }
    //    public string PageName { get; set; }
    //    public string Menu { get; set; }
    //    public string Icon { get; set; }
    //    public string SubMenu { get; set; }
    //    public long ParentId { get; set; }
    //    public long SerialNo { get; set; }
    //    public long RolePageId { get; set; }
    //    public bool ViewRight { get; set; }

    //}

    public class RolePageChildrenAccess
    {
        private RolePage _data; // field
        public RolePage Data   // property
        {
            get { return _data; }   // get method
            set { _data = value; }  // set method
        }


        private List<RoleAccess> _children; // field
        public List<RoleAccess> Children   // property
        {
            get { return _children; }   // get method
            set { _children = value; }  // set method
        }

         //  public RolePageChildren Data { get; set; }
        //public List<RolePageChildren> Children = new List<RolePageChildren>();
    }

    public class RoleAccess
    {
        private RolePage _data; // field
        public RolePage Data   // property
        {
            get { return _data; }   // get method
            set { _data = value; }  // set method
        }

        private List<RolePageChildrenAccess> _children; // field
        public List<RolePageChildrenAccess> Children   // property
        {
            get { return _children; }   // get method
            set { _children = value; }  // set method
        }
        //public RolePage Data { get; set; }
        //public List<RoleAccess> Children = new List<RolePageChildren>();
    }

    public class PageByRoleId
    {
        private string _name { get; set; }
        public string Name { get { return _name; } set { _name = value; } }

        private string _icon { get; set; }
        public string Icon { get { return _icon; } set { _icon = value; } }

        private int? _parentId { get; set; }
        public int? ParentId { get { return _parentId; } set { _parentId = value; } }

        private int _pageId { get; set; }
        public int PageId { get { return _pageId; } set { _pageId = value; } }

        private string _url { get; set; }
        public string Url { get { return _url; } set { _url = value; } }

        private List<ChildPageByRoleId> _children; // field
        public List<ChildPageByRoleId> Children   // property
        {
            get { return _children; }   // get method
            set { _children = value; }  // set method
        }


        //  public List<PageByRoleId> children = new List<PageByRoleId>();

    }

    public class ChildPageByRoleId
    {
        //public string Name { get; set; }
        //public string Icon { get; set; }
        //public int? ParentId { get; set; }
        //public int PageId { get; set; }
        //public string Url { get; set; }
        private string _name { get; set; }
        public string Name { get { return _name; } set { _name = value; } }

        private string _icon { get; set; }
        public string Icon { get { return _icon; } set { _icon = value; } }

        private int? _parentId { get; set; }
        public int? ParentId { get { return _parentId; } set { _parentId = value; } }

        private int _pageId { get; set; }
        public int PageId { get { return _pageId; } set { _pageId = value; } }

        private string _url { get; set; }
        public string Url { get { return _url; } set { _url = value; } }

        private List<PageByRoleId> _children; // field
        public List<PageByRoleId> Children   // property
        {
            get { return _children; }   // get method
            set { _children = value; }  // set method
        }

        // public List<PageByRoleId> children = new List<PageByRoleId>();

    }

    public class UserRoleResponse
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
