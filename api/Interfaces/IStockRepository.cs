using api.Dtos.Stock;
using api.Helpers;
using api.Models;

namespace api.Interfaces;

public interface IStockRepository
{
    Task<Stock> CreateAsync(Stock stockModel);
    Task<List<Stock>> GetAllAsync(QueryObject query);
    Task<Stock?> GetByIdAsync(int id);
    Task<Stock?> GetBySymbolAsync(string symbol);
    Task<bool> StockExists(int id);
    Task<Stock?> UpdateAsync(int id, UpdateStockRequestDTO stockDTO);
    Task<Stock?> DeleteAsync(int id);
}
