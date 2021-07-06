using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoRad.Controllers
{
    public class MainController : Controller
    {
        public IActionResult Auth()
        {
            return Content("Hi there!");

        }
    }
}
