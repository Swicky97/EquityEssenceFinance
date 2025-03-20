using api.Models;

namespace api.Interfaces;

public interface IPortfolioRepository
{
    Task<Portfolio> CreateAsync(Portfolio portfolio);
    Task<List<Stock>> GetUserPortfolio(string appUserId);
    Task<Portfolio> DeletePortfolio(string appUserId, string symbol);
}
