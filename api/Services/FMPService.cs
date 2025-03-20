using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Services;

public class FMPService : IFMPService
{
    private HttpClient _httpClient;
    private IConfiguration _config;
    public FMPService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<Stock> FindStockBySymbolAsync(string symbol)
    {
        try 
        {
            var fmpKey = Environment.GetEnvironmentVariable("REACT_APP_FMPKey");
            var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={fmpKey}");

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();
                var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                var stock = tasks[0];

                if (stock != null) 
                {
                    return stock.ToStockFromFMP();
                }
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return null;
        }
    }
}
