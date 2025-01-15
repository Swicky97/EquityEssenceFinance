using System.CodeDom;
using System.Security.Claims;

namespace api.Extensions;

public static class ClaimsExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        return user.Claims.SingleOrDefault(x => x.Type.Equals("https://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")).Value
    }
}
