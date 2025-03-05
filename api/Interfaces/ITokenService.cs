using System.Security.Claims;
using api.Models;

namespace api.Interfaces;

public interface ITokenService
{
    void CreateToken(AppUser user);
    void SetAuthTokenCookie(string token);
    void RemoveAuthTokenCookie();
    bool IsValidAuthToken(out ClaimsPrincipal claimsPrincipal);

}
