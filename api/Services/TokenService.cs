using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Interfaces;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly SymmetricSecurityKey _key;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public TokenService(IConfiguration config, IHttpContextAccessor httpContextAccessor)
    {
        _config = config;
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
        _httpContextAccessor = httpContextAccessor;
    }

    public void CreateToken(AppUser user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.GivenName, user.UserName)
        };

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor 
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds,
            Issuer = _config["JWT:Issuer"],
            Audience = _config["JWT:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        SetAuthTokenCookie(tokenString);
    }

    public void SetAuthTokenCookie(string token)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true, 
            Secure = true, 
            SameSite = SameSiteMode.Strict, 
            Expires = DateTime.UtcNow.AddDays(7)
        };

        _httpContextAccessor.HttpContext?.Response.Cookies.Append("AuthToken", token, cookieOptions);
    }

    public void RemoveAuthTokenCookie()
    {
        _httpContextAccessor.HttpContext?.Response.Cookies.Delete("AuthToken");
    }

    public bool IsValidAuthToken(out ClaimsPrincipal claimsPrincipal)
    {
        claimsPrincipal = new ClaimsPrincipal();

        var token = _httpContextAccessor.HttpContext?.Request.Cookies["AuthToken"];
        if (string.IsNullOrEmpty(token))
        {
            return false;
        }

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _config["JWT:Issuer"],
                ValidateAudience = true,
                ValidAudience = _config["JWT:Audience"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"])),
                ValidateLifetime = true, 
                ClockSkew = TimeSpan.Zero
            };

            claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
