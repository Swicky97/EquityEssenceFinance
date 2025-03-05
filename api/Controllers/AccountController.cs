using System.Security.Claims;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;
    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if the email already exists
            var existingUserByEmail = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingUserByEmail != null)
            {
                return BadRequest("Email is already in use.");
            }

            // Check if the username already exists
            var existingUserByUsername = await _userManager.FindByNameAsync(registerDto.Username);
            if (existingUserByUsername != null)
            {
                return BadRequest("Username is already in use.");
            }

            var appUser = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password!);

            if (createdUser.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                if (roleResult.Succeeded)
                {
                    _tokenService.CreateToken(appUser);

                    return Ok(
                        new NewUserDTO
                        {
                            UserName = appUser.UserName,
                            Email = appUser.Email,
                        }
                    );
                }
                else
                {
                    return StatusCode(500, roleResult.Errors);
                }
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO loginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Invalid username");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized("Username not found or password incorrect");

        _tokenService.CreateToken(user);

        return Ok(
            new NewUserDTO
            {
                UserName = user.UserName,
                Email = user.Email,
            }
        );
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("authToken");
        return Ok(new { message = "Logged out successfully" });
    }

    [HttpGet("refresh")]
    public IActionResult RefreshAuth()
    {
        if (_tokenService.IsValidAuthToken(out var claimsPrincipal))
        {
            var userId = claimsPrincipal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = claimsPrincipal?.FindFirst(ClaimTypes.Email)?.Value;
            var username = claimsPrincipal?.FindFirst(ClaimTypes.GivenName)?.Value;

            return Ok(new
            {
                message = "User authenticated",
                userId,
                email,
                username
            });
        }

        return Unauthorized(new { message = "Invalid or expired token" });
    }
}
