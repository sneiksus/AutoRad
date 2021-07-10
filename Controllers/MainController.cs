using AutoRad.Helpers;
using AutoRad.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AutoRad.Controllers
{
    public class MainController : Controller
    {
        private EFContext db;

        public MainController(EFContext context)
        {
            db = context;
        }
        [Authorize]
        public IActionResult GetLogin()
        {
            return Ok();
        }

        public IActionResult GetMarks()
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://developers.ria.com/auto/categories/1/marks?api_key=Z2rc4dPy83eWGIsXmym6Yiuf50ELJNXkshGrH811");
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return Content(reader.ReadToEnd());
            }
        }
        public IActionResult GetModels(string idModel)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://developers.ria.com/auto/categories/1/marks/"+idModel+"/models?api_key=Z2rc4dPy83eWGIsXmym6Yiuf50ELJNXkshGrH811");
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return Content(reader.ReadToEnd());
            }
        }
        private ClaimsIdentity GetIdentity(string k)
        {
            User person = db.Users.FirstOrDefault(x => x.key == k);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.key),
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
        public IActionResult Auth(string key)
        {
            var identity = GetIdentity(key);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
            };

            return Json(response);

        }
    }
}
