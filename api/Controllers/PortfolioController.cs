using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api.Controllers;

[ApiController]
[Route("api/portfolio")]
[Authorize]
public class PortfolioController : ControllerBase
{
    private readonly IStockRepository _stockRepo;
    private readonly IPortfolioRepository _portfolioRepo;
    private readonly IFMPService _fmpService;

    public PortfolioController(
        IStockRepository stockRepo, 
        IPortfolioRepository portfolioRepo,
        IFMPService fmpService
    )
    {
        _stockRepo = stockRepo;
        _portfolioRepo = portfolioRepo;
        _fmpService = fmpService;
    }

    private string GetUserId()
    {
        return User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException("User ID not found.");
    }

    [HttpGet]
    public async Task<IActionResult> GetUserPortfolio()
    {
        var userId = GetUserId();
        var userPortfolio = await _portfolioRepo.GetUserPortfolio(userId);
        return Ok(userPortfolio);
    }

    [HttpPost]
    public async Task<IActionResult> AddPortfolio(string symbol)
    {
        var userId = GetUserId();
        var stock = await _stockRepo.GetBySymbolAsync(symbol);

        if (stock == null)
        {
            stock = await _fmpService.FindStockBySymbolAsync(symbol);
            if (stock == null)
            {
                return BadRequest("Stock does not exist");
            }
            await _stockRepo.CreateAsync(stock);
        }

        var userPortfolio = await _portfolioRepo.GetUserPortfolio(userId);

        if (userPortfolio.Any(e => e.Symbol.ToLower() == symbol.ToLower()))
        {
            return BadRequest("Cannot add the same stock to portfolio");
        }

        var portfolioModel = new Portfolio
        {
            StockId = stock.Id,
            AppUserId = userId
        };

        await _portfolioRepo.CreateAsync(portfolioModel);
        return Created($"/api/portfolio", portfolioModel);
    }

    [HttpDelete]
    public async Task<IActionResult> DeletePortfolio(string symbol)
    {
        var userId = GetUserId();
        var userPortfolio = await _portfolioRepo.GetUserPortfolio(userId);

        var filteredStock = userPortfolio.FirstOrDefault(s => s.Symbol.ToLower() == symbol.ToLower());
        if (filteredStock == null)
        {
            return BadRequest("Stock not in your portfolio");
        }

        await _portfolioRepo.DeletePortfolio(userId, symbol);
        return Ok();
    }
}
